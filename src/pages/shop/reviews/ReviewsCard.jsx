import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import commentorIcon from '../../../assets/avatar.png';
import { formatDate } from '../../../utils/formatDate'
import RatingStars from '../../../components/RatingStars';
import PostAReview from './PostAReview';

const ReviewsCard = ({ productReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = productReviews || [];
  const displayReviews = [...reviews, ...localReviews];
  const { id } = useParams();
  const isMongoId = (value) => typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value);
  const [localReviews, setLocalReviews] = useState([]);

  useEffect(() => {
    // load local reviews for this product if any
    try {
      const key = `localReviews:${id}`;
      const lst = JSON.parse(localStorage.getItem(key) || '[]');
      setLocalReviews(lst || []);
    } catch (err) {
      setLocalReviews([]);
    }
  }, [id]);

  const handleLocalSubmit = (review) => {
    try {
      const key = `localReviews:${id}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.unshift(review);
      localStorage.setItem(key, JSON.stringify(existing));
      setLocalReviews(existing);
    } catch (err) {
      console.error('Saving local review failed:', err);
    }
  };

  const handleOpenAddReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseAddReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='my-6 bg-white p-8'>
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className='text-lg font-medium'>All comments...</h3>
            <div>
              {displayReviews.map((review) => (
                <div key={review._id} className='mt-4'> {/* Use unique id for key */}
                  <div className='flex gap-4 items-center'>
                    <img src={commentorIcon} alt="" className='w-14 h-14 rounded-full' /> {/* Consistent avatar size */}
                    <div className='space-y-1'>
                      <p className='text-lg font-medium underline capitalize
                        underline-offset-4 text-blue-400'>
                        {review?.userId?.username}
                      </p>
                      <p className='text-[12px] italic'>
                        Updated: {formatDate(review?.updateAt || review?.createdAt)} {/* Added "Updated" for clarity */}
                      </p>
                      <RatingStars rating={review?.rating} />
                    </div>
                  </div>

                  <div className='text-gray-700 mt-5 border p-8'>
                    <p className='md:w-4/5'>{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet! Be the first to review this product.</p> // Friendly message
        )}
      </div>

      {/* Add review button */}
      <div>
        <button
          onClick={handleOpenAddReviewModal}
          className='px-6 py-3 bg-primary text-white rounded-md'>
          Add A Review
        </button>
      </div>

      {/* Reviews modal */}
      <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseAddReviewModal} onLocalSubmit={handleLocalSubmit} />
    </div>
  );
};

export default ReviewsCard;

