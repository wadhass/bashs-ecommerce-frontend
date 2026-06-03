import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart, removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { products, selectedItems, totalPrice, tax, grandTotal } = useSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!products.length) return;

    try {
      const items = products.map((item, index) => {
        const productId = item._id ?? item.id ?? item.productId;
        if (!productId) {
          console.error(`Invalid cart item at index ${index}:`, item);
          throw new Error(`Invalid cart item at index ${index}: missing product ID`);
        }

        return {
          productId: String(productId),
          name: item.name,
          price: Number(item.price),
          quantity: item.quantity,
          image: item.image,
        };
      });

      await createOrder({
        userId: user._id,
        items,
        totalPrice,
        tax,
        grandTotal,
      }).unwrap();

      dispatch(clearCart());
      navigate('/dashboard/orders');
    } catch (error) {
      console.error('Checkout failed', error);
    }
  };

  return (
    <section className="section__container py-16">
      <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Your Cart</h2>
                <p className="text-sm text-gray-600">Review items before checkout.</p>
              </div>
              <Link to="/shop" className="text-primary hover:underline">
                Continue Shopping
              </Link>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-24 text-gray-600">
                Your cart is empty. <Link to="/shop" className="text-primary underline">Browse products</Link> to add items.
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product, index) => {
                  const productId = product._id ?? product.id ?? `cart-item-${index}`;

                  return (
                    <div key={productId} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-gray-600">${Number(product.price).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantity('decrement', productId)}
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() => handleQuantity('increment', productId)}
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemove(productId)}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="w-full md:w-96 bg-gray-50 rounded-lg p-5 border">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-semibold">Order Summary</h3>
                <p>Items: {selectedItems}</p>
                <p>Total: ${totalPrice.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p className="font-semibold">Grand Total: ${grandTotal.toFixed(2)}</p>
              </div>
              <button
                disabled={isLoading || products.length === 0}
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-3 rounded disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
              <button
                onClick={() => dispatch(clearCart())}
                disabled={products.length === 0}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded"
              >
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
