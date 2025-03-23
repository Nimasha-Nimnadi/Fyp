import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import './Profile.css';

export default function Profile() {
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="profile-avatar"
        />
        <input
          type="text"
          placeholder="firstname"
          id="firstname"
          defaultValue={currentUser.firstname}
          className="profile-input"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="lastname"
          id="lastname"
          defaultValue={currentUser.lastname}
          className="profile-input"
          onChange={handleChange}
        />
        <select
          className="profile-select"
          id="role"
          onChange={handleChange}
        >
          <option>{currentUser.role}</option>
          <option value="Doctor">Doctor</option>
          <option value="Student">Student</option>
        </select>
        <input
          type="text"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="profile-input"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="profile-input"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="profile-button"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="profile-action-text"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="profile-action-text">
          Sign out
        </span>
      </div>
      <p className="profile-error">{error ? error : ""}</p>
      <p className="profile-success">
        {updateSuccess ? "User updated successfully!" : ""}
      </p>
    </div>
  );
}
