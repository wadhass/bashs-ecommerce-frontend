import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: 'include',
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: '/post-review',
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Reviews', id: productId }]
    }),
    getReviewsByUserId: builder.query({
      query: (userId) => `/user-reviews/${userId}`,
      transformResponse: (response) => response?.reviews || [],
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map((review) => ({ type: 'Reviews', id: review._id })),
              { type: 'Reviews', id: 'LIST' }
            ]
          : [{ type: 'Reviews', id: 'LIST' }]
    }),
  })
});

export const { usePostReviewMutation, useGetReviewsByUserIdQuery } = reviewApi;
export default reviewApi;
