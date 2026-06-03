import React from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsByUserIdQuery } from '../../redux/features/reviews/Reviews.Api';

const Reviews = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: reviews = [], isLoading } = useGetReviewsByUserIdQuery(user?._id, { skip: !user?._id });

  if (!user) {
    return <div className="text-center py-24">Please login to view your reviews.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold">Your Reviews</h1>
        <p className="text-gray-600">All reviews posted by your account.</p>
      </div>
      {isLoading ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">Loading reviews…</div>
      ) : reviews.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          You have not posted any reviews yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <strong>{review.title || 'Product Review'}</strong>
                <span className="text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
