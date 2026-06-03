import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/create-order',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrdersByUser: builder.query({
      query: (userId) => `/user/${userId}`,
      providesTags: (result, error, userId) => result ? [{ type: 'Orders', id: userId }] : [],
    }),
    getAllOrders: builder.query({
      query: () => '/all',
      providesTags: ['Orders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersByUserQuery,
  useGetAllOrdersQuery,
} = ordersApi;

export default ordersApi;
