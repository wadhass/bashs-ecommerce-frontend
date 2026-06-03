import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/ReviewsCard';
import productsData from '../../../data/products.json';

const isMongoId = (value) => typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value);

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const localProduct = productsData.find(
    (product) => String(product.id) === String(id) || String(product._id) === String(id)
  );

  const shouldFetchBackend = id && isMongoId(id) && !localProduct;
  const { data, error, isLoading } = useFetchProductByIdQuery(id, { skip: !shouldFetchBackend });

  const singleProduct = localProduct || data?.product || data || {};
  const productReviews = localProduct ? [] : data?.reviews || [];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (!id) return <p>Loading details...</p>;
  if (shouldFetchBackend && isLoading) return <p>Loading...</p>;
  if (!localProduct && error) return <p>Error loading details: {error?.data?.message || error?.error || 'Unknown error'}</p>;
  if (!singleProduct || Object.keys(singleProduct).length === 0) {
    return <p>Product not found.</p>;
  }

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Single Product Page</h2>
        <div className='section__subheader spce-x-2'>
          <span className='hover:text-primary'>
            <Link to='/'>home</Link>
          </span>
          <i className='ri-arrow-right-s-line'></i>
          <span className='hover:text-primary'>
            <Link to='/shop'>shop</Link>
          </span>
          <i className='ri-arrow-right-s-line'></i>
          <span className='hover:text-primary'>{singleProduct.name}</span>
        </div>
      </section>
      <section className='section__container mt-8'>
        <div className='flex flex-col items-center md:flex-row gap-8'>
          <div className='md:w-1/2 w-full'>
            <img
              src={singleProduct?.image}
              alt={singleProduct?.name || 'Product'}
              className='rounded-md w-full h-auto'
            />
          </div>
          <div className='md:w-1/2 w-full'>
            <h3 className='text-2xl font-semibold mb-4'>{singleProduct?.name}</h3>
            <p className='text-xl text-primary mb-4'>
              ${singleProduct?.price}
              {singleProduct?.oldPrice && (
                <s className='ml-1'>${singleProduct?.oldPrice}</s>
              )}
            </p>
            <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

            <div className='flex flex-col space-y-2'>
              <p>
                <strong>Category:</strong> {singleProduct?.category}
              </p>
              <p>
                <strong>Color:</strong> {singleProduct?.color}
              </p>
              <div className='flex gap-1 items-center'>
                <strong>Rating:</strong>
                <RatingStars rating={singleProduct?.rating} />
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(singleProduct);
              }}
              className='mt-6 px-6 py-3 bg-primary text-white rounded-md'
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>

      <section className='section__container mt-8'>
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;





