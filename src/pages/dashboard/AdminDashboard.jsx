import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import { useGetAllOrdersQuery } from '../../redux/features/orders/ordersApi';

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: productsData = {}, isLoading: productsLoading } = useFetchAllProductsQuery({ category: '', color: '', minPrice: 0, maxPrice: '', page: 1, limit: 100 });
  const { data: ordersData = [], isLoading: ordersLoading } = useGetAllOrdersQuery();

  if (!user || user.role !== 'admin') {
    return <div className="text-red-600">Unauthorized: Admin access only.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage products, orders, and site content from this panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-light p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="mt-3 text-4xl font-bold">{productsLoading ? '...' : productsData.totalProducts ?? 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="mt-3 text-4xl font-bold">{ordersLoading ? '...' : ordersData.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="mt-3 text-4xl font-bold">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
