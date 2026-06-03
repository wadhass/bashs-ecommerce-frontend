import React from 'react';
import { useFetchAllProductsQuery, useDeleteProductMutation } from '../../redux/features/products/productsApi';

const ManageProducts = () => {
  const { data = {}, isLoading, error } = useFetchAllProductsQuery({ category: '', color: '', minPrice: 0, maxPrice: '', page: 1, limit: 100 });
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  if (isLoading) return <div>Loading products…</div>;
  if (error) return <div>Unable to load products.</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
        <p className="text-gray-600 mt-2">Create, edit, or remove products from your store.</p>
      </div>

      <div className="grid gap-4">
        {data.products?.length ? (
          data.products.map((product) => (
            <div key={product._id} className="bg-white p-5 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.category} · ${product.price}</p>
              </div>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm">No products found yet.</div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
