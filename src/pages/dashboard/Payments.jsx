import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersByUserQuery } from '../../redux/features/orders/ordersApi';

const Payments = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: orders = [], isLoading } = useGetOrdersByUserQuery(user?._id, { skip: !user?._id });

  if (!user) {
    return <div className="text-center py-24">Please login to view payment history.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-2">Payments</h1>
        <p className="text-gray-600">Review your recent payment history and checkout totals.</p>
      </div>
      {isLoading ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">Loading payment details…</div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">No payments found yet.</div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">Order #{order._id.slice(-6)}</h2>
                  <p className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="text-primary font-semibold">${order.grandTotal.toFixed(2)}</span>
              </div>
              <p className="mt-3 text-gray-700">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payments;
