import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfoStatus,
  selectUserOrders,
} from '../userSlice';
import { cancelOrderAsync } from '../../order/orderSlice';
import { Grid } from 'react-loader-spinner';

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrderAsync(orderId));
  };

  return (
    <div className="bg-gray-50 py-8">
      <h1 className='text-center text-3xl font-semibold font-premium '>My Orders</h1>
      {orders && orders.map((order) => (
        <div key={order.id} className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
          
            <div className="px-4 py-6 sm:px-6">

              <h1 className="text-4xl font-bold text-gray-900">
                Order # {order.id}
              </h1>
              <h3 className="text-xl font-bold text-red-900 mt-5">
                Order Purchased Date: {order.createdAt.split('T')[0]}
              </h3>
              <h3 className="text-xl font-bold text-red-900 mt-5">
                Order Status: {order.status}
                {order.status === 'pending' && (
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
              </h3>
            </div>

            <div className="flow-root px-4">
              <ul className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">₹{item.product.discountPrice}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>₹ {order.totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{order.totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping Address:</p>
              <div className="flex justify-between gap-x-6 px-5 py-5 border border-gray-200 rounded-md shadow-md mt-3">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold text-gray-900">{order.selectedAddress.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{order.selectedAddress.street}</p>
                    <p className="mt-1 text-xs text-gray-500">{order.selectedAddress.pinCode}</p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm text-gray-900">Phone: {order.selectedAddress.phone}</p>
                  <p className="text-sm text-gray-500">{order.selectedAddress.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {status === 'loading' && (
        <div className="flex justify-center mt-10">
          <Grid
            height="80"
            width="80"
            color="#f1c44b"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
}
