import React, { useContext, useState } from "react";
import { UserContext } from "../../hooks/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);
  const [updatedPassword, setUpdatedPassword] = useState(user.password);
  const [updatedFirstName, setUpdatedFirstName] = useState(user.firstName);
  const [updatedLastName, setUpdatedLastName] = useState(user.lastName);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChangePasswordClick = () => {
    setIsChangePasswordModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save updated user information
    localStorage.setItem(
      "user",
      JSON.stringify({
        firstName: updatedFirstName,
        lastName: updatedLastName,
        email: updatedEmail,
        password: updatedPassword,
      })
    );
    Swal.fire({
      icon: "success",
      title: "Saved Successfully!",
    });
  };

  const handlePasswordChange = () => {
    const storedCredentials = JSON.parse(localStorage.getItem("user"));
    const storedPassword = storedCredentials.password;

    if (oldPassword === storedPassword) {
      // Update the password

      localStorage.setItem(
        "user",
        JSON.stringify({
          password: newPassword,
          firstName: updatedFirstName,
          lastName: updatedLastName,
          email: updatedEmail,
        })
      );
      Swal.fire({
        icon: "success",
        title: "Saved Successfully!",
      });
      setOldPassword("");
      setNewPassword("");
      setIsChangePasswordModalOpen(false);
    } else {
      setErrorMessage("Incorrect old password");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Personal Information</h1>
      <div className="grid grid-cols-2 gap-4">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="border p-2"
          value={updatedEmail}
          disabled={!isEditing}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="border p-2"
          value={updatedPassword}
          disabled={!isEditing}
          onChange={(e) => setUpdatedPassword(e.target.value)}
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="border p-2"
          value={updatedFirstName}
          disabled={!isEditing}
          onChange={(e) => setUpdatedFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="border p-2"
          value={updatedLastName}
          disabled={!isEditing}
          onChange={(e) => setUpdatedLastName(e.target.value)}
        />
      </div>
      {isEditing ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
          onClick={handleSaveClick}
        >
          Save
        </button>
      ) : (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 ml-4"
            onClick={handleChangePasswordClick}
          >
            Change Password
          </button>
        </>
      )}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-3">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Change Password</h2>
            <div className="mb-4">
              <label htmlFor="oldPassword">Old Password:</label>
              <input
                type="password"
                className="border mx-2 p-2"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                className="border mx-2 p-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handlePasswordChange}
              >
                Change
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
