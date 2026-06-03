import React from 'react';
import { useGetAllOrdersQuery } from '../../redux/features/orders/ordersApi';

const ManageOrders = () => {
  const { data: orders = [], isLoading, error } = useGetAllOrdersQuery();

  if (isLoading) return <div>Loading orders…</div>;
  if (error) return <div>Unable to load orders.</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold">Manage Orders</h1>
        <p className="text-gray-600 mt-2">View all orders placed by customers.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">No orders have been placed yet.</div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <h2 className="font-semibold">Order #{order._id.slice(-6)}</h2>
                  <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-semibold">${order.grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <p className="mt-3 text-gray-700">User ID: {order.userId}</p>
              <p className="mt-2 text-gray-700">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
