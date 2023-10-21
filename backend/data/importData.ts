import neo4j from "neo4j-driver";
import { readFileSync } from "fs";

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);

const jsonFilePath = "data/users.json";

async function isDatabaseEmpty() {
  const session = driver.session();
  try {
    const result = await session.run(
      "MATCH (u:User) RETURN count(u) as userCount"
    );
    const userCount = result.records[0].get("userCount").toNumber();
    return userCount === 0;
  } catch (error) {
    console.error("Error while loading database:", error);
    return false;
  } finally {
    session.close();
  }
}

async function importInitialData() {
  const isEmpty = await isDatabaseEmpty();
  if (!isEmpty) {
    return;
  }

  const session = driver.session();
  try {
    const jsonData = JSON.parse(readFileSync(jsonFilePath, "utf-8"));
    for (const user of jsonData) {
      const query = `
        CREATE (u:User {
          id: $id,
          nick: $nick,
          first_name: $first_name,
          last_name: $last_name,
          country: $country,
          profile_picture: $profile_picture,
          mail: $mail,
          friend_ids: $friend_ids,
          chats: $chats
        })
        RETURN u.id AS userId
      `;
      await session.run(query, user);
    }
    console.log("Initial data has been imported into database.");
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    session.close();
  }
}

export default importInitialData;