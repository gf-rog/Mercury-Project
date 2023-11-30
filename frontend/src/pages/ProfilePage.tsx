import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import User from "../models/User";
import { useUser } from "../helpers/UserProvider";
import ProfilePageForm from "../components/ProfilePageForm";
import dataService from "../services/data";
import meetingService from "../services/meeting";
function ProfilePage() {
  const navigate = useNavigate();
  const { user, userId, setUser, updateUser, deleteUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [friends, setFriends] = useState([]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    updateUser().then((updated) => {
      if (updated) console.log("Updated");
      else throw new Error("Error while updating user");
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value } as User);
  };

  useEffect(() => {
    if (userId === null) navigate("/login");
  }, [userId]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friendsResponse = await dataService.fetchData(
        `/users/${userId}/friends`,
        "GET",
        {},
      );
      setFriends(friendsResponse.friends);
    };
    fetchFriends();
  }, []);
  const launchMeeting = async (ownerId: string, guestId: string) => {
    const token = await meetingService.createMeetingWithToken(ownerId, guestId);
    navigate(`/host-meeting?token=${token}`);
  }
  const viewMeetingDashboard = async () => {
    const token = await meetingService.getGuestToken(userId!);
    navigate(`/dashboard/?token=${token}`)
  }
  return (
    <>
      <Navbar />
      {user && friends ? (
        <ProfilePageForm
          user={user}
          friends={friends}
          isEditing={isEditing}
          handleEditClick={handleEditClick}
          handleSaveClick={handleSaveClick}
          handleChange={handleChange}
          deleteUser={deleteUser}
          launchMeeting={launchMeeting}
          viewMeetingDashboard={viewMeetingDashboard}
        />
      ) : (
        <div className="text-lg">Loading...</div>
      )}
      <Footer />
    </>
  );
}

export default ProfilePage;
