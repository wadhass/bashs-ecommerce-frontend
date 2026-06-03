import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersByUserQuery } from '../../redux/features/orders/ordersApi';
import { useGetReviewsByUserIdQuery } from '../../redux/features/reviews/Reviews.Api';

const Overview = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: orders = [], isLoading: ordersLoading } = useGetOrdersByUserQuery(user?._id, { skip: !user?._id });
  const { data: reviews = [], isLoading: reviewsLoading } = useGetReviewsByUserIdQuery(user?._id, { skip: !user?._id });

  if (!user) {
    return <div className="text-center py-24">Please login to view your dashboard.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold">Welcome back, {user.username}</h1>
        <p className="mt-2 text-gray-600">This is your dashboard overview. You can review your orders, manage your profile, and track your activity from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-primary-light rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">User Role</h2>
          <p className="mt-2 text-gray-700">{user.role || 'user'}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="mt-2 text-gray-700">{ordersLoading ? 'Loading…' : orders.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <p className="mt-2 text-gray-700">{reviewsLoading ? 'Loading…' : reviews.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-medium text-gray-600">Username</dt>
            <dd className="mt-1 text-gray-900">{user.username}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">Email</dt>
            <dd className="mt-1 text-gray-900">{user.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">Bio</dt>
            <dd className="mt-1 text-gray-900">{user.bio || 'No bio yet'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">Profession</dt>
            <dd className="mt-1 text-gray-900">{user.profession || 'Not specified'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Overview;
