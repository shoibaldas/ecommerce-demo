import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/AuthProvider/AuthProvider";
import { MdSpeakerNotes } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(UserContext); // Get the user data from the UserContext
  const [orders, setOrders] = useState([]);
  const [categoryExpenses, setCategoryExpenses] = useState({});

  useEffect(() => {
    const userEmail = user.email; // Get the user email from the user context
    const existingOrders = localStorage.getItem("myOrder");
    if (existingOrders) {
      const parsedOrders = JSON.parse(existingOrders);
      const filteredOrders = parsedOrders.filter(
        (order) => order.userEmail === userEmail
      );
      console.log(filteredOrders);
      setOrders(filteredOrders);
    }
  }, [user]);

  useEffect(() => {
    // Calculate category-wise expenses
    const expenses = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.category in expenses) {
          expenses[item.category] += item.subtotal;
        } else {
          expenses[item.category] = item.subtotal;
        }
      });
    });
    setCategoryExpenses(expenses);
  }, [orders]);

  const handleItemClick = (orderId) => {
    const selected = orders.find((order) => order.order_id === orderId);
    setSelectedOrder(selected);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl text-gray-800 font-bold mb-4">My Orders:</h1>
      <div className="grid grid-cols-1 gap-4 w-3/12">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.order_id}
              onClick={() => handleItemClick(order.order_id)}
              className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200 flex items-center"
            >
              <h2 className="text-sm font-semibold text-sky-700">
                {order.order_id}
              </h2>
              <MdSpeakerNotes className="mx-4 text-blue-600"></MdSpeakerNotes>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Category wise expenses:</h3>
        {Object.keys(categoryExpenses).length > 0 ? (
          <ul>
            {Object.entries(categoryExpenses).map(([category, expense]) => (
              <li key={category} className="flex items-center">
                <FaCheckCircle className="text-green-600"></FaCheckCircle>
                <p className="mx-2" style={{"text-transform":"capitalize"}}>
                  {category}: ${expense.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No category-wise expenses yet.</p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-3">
          <div className="bg-white p-6 rounded shadow-md h-96 overflow-x-scroll">
            {selectedOrder && (
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Order ID: {selectedOrder.order_id}
                </h2>
                <p className="text-gray-600 mb-2">
                  Email: {selectedOrder.userEmail}
                </p>
                <ul className="my-6">
                  {selectedOrder.items.map((item, index) => (
                    <li key={index} className="border border-gray-400 p-2 mb-1">
                      <p>Item Name: {item.title}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Subtotal: ${item.subtotal}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
