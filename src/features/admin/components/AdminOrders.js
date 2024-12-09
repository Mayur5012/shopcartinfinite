import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [sort, setSort] = useState({});
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };



  // fetch orders with pagination and sorting
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  // handle page change
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  // Dashboard function for revenue calc, getting products, and other info
  const getRevenue = () =>
    orders.reduce((acc, order) => acc + order.totalAmount, 0);

  const getTopProducts = () => {
    if (!orders || orders.length === 0) return []; // when there is no order
    // count quatity sold for each prod
    const productCount = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        productCount[item.product.title] =
          (productCount[item.product.title] || 0) + item.quantity;
      });
    });

    //convert prodcount obj into array of [product, count]
    const productArray = Object.entries(productCount);
    //sort based on count, asc order
    const sortedProducts = productArray.sort((a, b) => b[1] - a[1]);
    const topProducts = sortedProducts.slice(0, 4); //change here for number of products
  
    return topProducts.map(([product, count]) => ({
      product,
      count,
    }));
  };
  
  

  const getCategoryData = () => {
    const categoryCount = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const category = item.product.category || "Other";
        categoryCount[category] =
          (categoryCount[category] || 0) + item.quantity;
      });
    });

    const labels = Object.keys(categoryCount);
    const data = Object.values(categoryCount);
    return {
      labels,
      datasets: [
        {
          label: "% of Products Sold by Category",
          data,
          backgroundColor: ["#1A5276", "#D98880", "#A9DFBF", "#F7DC6F"], // Premium colors
          hoverBackgroundColor: ["#154360", "#C0392B", "#28B463", "#F4D03F"],
          hoverBorderColor: "rgba(0, 0, 0, 0.6)",
          hoverBorderWidth: 2,
        },
      ],
    };
  };

  const getPaymentMethodData = () => {
    const paymentCount = { cash: 0, card: 0 };
    orders.forEach((order) => {
      if (order.paymentMethod === "cash") paymentCount.cash++;
      else paymentCount.card++;
    });
    const totalPayments = paymentCount.cash + paymentCount.card;
    return {
      cashPercentage: (paymentCount.cash / totalPayments) * 100,
      cardPercentage: (paymentCount.card / totalPayments) * 100,
    };
  };
  const topProducts = getTopProducts();
  // console.log("Top Products:", topProducts); 
  return (
    <div className="overflow-x-auto">
      {/* dashboard */}
      <div className="bg-white shadow-lg rounded-2xl p-8 mb-8 flex justify-between items-center space-x-6">
        <div className="w-1/3 flex justify-center items-center">
          {" "}
          <Pie
            data={getCategoryData()}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.label || "";
                      const value = context.raw || 0;
                      return `${label}: ${value}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
        <div className="w-2/3 flex flex-col justify-center items-center space-y-6">
          {" "}
          <div className="text-lg font-semibold text-gray-700 text-center">
            <span className="block text-xl font-bold">Total Revenue</span>₹
            {getRevenue()}
          </div>
          <div className="text-lg font-semibold text-gray-700 text-center">
            <span className="block text-xl font-bold">Top Products Sold</span>
            {topProducts.length > 0 ? (
              <ul>
                {topProducts.map((product, index) => (
                  <li key={index} className="mt-2">
                    {product.product} - {product.count} sold
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products available</p>
            )}
          </div>
          <div className="text-lg font-semibold text-gray-700 text-center">
            <span className="block text-xl font-bold">Payment Methods</span>
            Cash: {getPaymentMethodData().cashPercentage.toFixed(2)}%, Card:{" "}
            {getPaymentMethodData().cardPercentage.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order#{" "}
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-left">Items</th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Shipping Address</th>
                  <th className="py-3 px-0 text-center">Order Status</th>
                  <th className="py-3 px-0 text-center">Payment Method</th>
                  <th className="py-3 px-0 text-center">Payment Status</th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "createdAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order Time{" "}
                    {sort._sort === "createdAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "updatedAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Last Updated{" "}
                    {sort._sort === "updatedAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-0 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-0 text-left">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                          </div>
                          <span>
                            {item.product.title} - #{item.quantity} - ₹
                            {item.product.discountPrice
                              ? item.product.discountPrice
                              : null}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        ₹{order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city}, </div>
                        <div>{order.selectedAddress.state}, </div>
                        <div>{order.selectedAddress.pinCode}, </div>
                        <div>{order.selectedAddress.phone}, </div>
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleOrderStatus(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                        className={`font-medium py-1 px-2 rounded-full text-xs ${chooseColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      )}
                    </td>

                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>

                    <td className="py-3 px-0 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          onChange={(e) => handleOrderPaymentStatus(e, order)}
                        >
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.paymentStatus
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>


                    
                    {/* <td className="py-3 px-0 text-center">
                      <span
                        className={`bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-0 text-center">
                      {order.paymentMethod}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                        {order.paymentStatus}
                      </span>
                    </td> */}
                    <td className="py-3 px-0 text-center">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-0 text-center">
                      {new Date(order.updatedAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex item-center justify-center">
                        <PencilIcon onClick={(e) => handleEdit(order)} className="w-6 h-6 cursor-pointer text-yellow-600"></PencilIcon>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </div>
  );
}

export default AdminOrders;
