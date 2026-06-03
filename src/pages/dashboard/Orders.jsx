import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersByUserQuery } from '../../redux/features/orders/ordersApi';

const Orders = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: orders = [], isLoading, error } = useGetOrdersByUserQuery(user?._id, { skip: !user?._id });

  if (!user) {
    return <div className="text-center py-24">Please login to view your orders.</div>;
  }

  if (isLoading) return <div>Loading orders…</div>;
  if (error) return <div>Unable to load orders.</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold">Your Orders</h1>
        <p className="text-gray-600 mt-2">Below are the most recent orders made with your account.</p>
      </div>
      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">No orders found yet.</div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <h2 className="font-semibold">Order #{order._id.slice(-6)}</h2>
                  <p className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="font-semibold">${order.grandTotal.toFixed(2)}</span>
              </div>
              <p className="mt-2 text-gray-700">Status: {order.status}</p>
              <div className="mt-3 grid gap-2">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between border-t pt-2 text-sm text-gray-700">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
