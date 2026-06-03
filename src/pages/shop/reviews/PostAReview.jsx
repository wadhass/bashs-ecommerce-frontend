import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/Reviews.Api';
import { toast } from 'react-hot-toast';

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  // Adjust selector to grab the actual user object from auth slice
  const authUserState = useSelector((state) => state.auth.user);
  // Handle nested shape: some slices wrap user inside { user: {...} }
  const user = authUserState && authUserState.user ? authUserState.user : authUserState;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (value) => setRating(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Ensure user is valid
    if (!user || !user._id) {
      toast.error('You must be logged in to post a review.');
      return;
    }
    if (!comment.trim() || !rating) {
      toast.error('Please provide a comment and rating.');
      return;
    }

    const newComment = { comment: comment.trim(), rating, userId: user._id, productId: id };

    setIsSubmitting(true);
    try {
      await postReview(newComment).unwrap();
      toast.success('Comment posted successfully');
      setComment('');
      setRating(0);
      refetch();
      handleClose();
    } catch (error) {
      console.error('Error posting review:', error);
      toast.error(error?.data?.message || 'Failed to post review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${isModalOpen ? 'block' : 'hidden'}`}>
      <div className='bg-white p-6 rounded-md shadow-lg w-96 z-50'>
        <h2 className='text-lg font-medium mb-4'>Post A Review</h2>

        <div className='flex items-center mb-4'>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className='text-yellow-500 cursor-pointer text-lg'
            >
              {rating >= star ? <i className='ri-star-fill'></i> : <i className='ri-star-line'></i>}
            </span>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows='4'
          placeholder='Write your review here...'
          className='w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none'
        ></textarea>

        <div className='flex justify-end gap-2'>
          <button onClick={handleClose} className='px-4 py-2 bg-gray-300 rounded-md'>Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !comment.trim() || rating === 0}
            className={`px-4 py-2 text-white rounded-md ${
              isSubmitting || !comment.trim() || rating === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;


