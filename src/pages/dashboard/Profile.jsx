import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEditProfileMutation } from '../../redux/features/auth/authApi';
import { setUser } from '../../redux/features/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formState, setFormState] = useState({
    username: '',
    bio: '',
    profession: '',
    profileImage: '',
  });
  const [editProfile, { isLoading }] = useEditProfileMutation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormState({
        username: user.username || '',
        bio: user.bio || '',
        profession: user.profession || '',
        profileImage: user.profileImage || '',
      });
    }
  }, [user]);

  if (!user) {
    return <div className="text-center py-24">Please login to update your profile.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editProfile({ userId: user._id, ...formState }).unwrap();
      dispatch(setUser(response.user));
      setMessage('Profile updated successfully.');
    } catch (error) {
      console.error('Profile update failed', error);
      setMessage('Unable to update profile.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      {message && <div className="mb-4 text-sm text-green-700">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            name="username"
            value={formState.username}
            onChange={handleChange}
            className="mt-1 w-full rounded border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formState.bio}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full rounded border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profession</label>
          <input
            name="profession"
            value={formState.profession}
            onChange={handleChange}
            className="mt-1 w-full rounded border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
          <input
            name="profileImage"
            value={formState.profileImage}
            onChange={handleChange}
            className="mt-1 w-full rounded border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-white py-3 px-6 rounded"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
