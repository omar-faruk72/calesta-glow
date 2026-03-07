import React from 'react';

const OrderHistory = () => {
  // আপতত ডামি ডাটা দিয়ে ডিজাইনটি করছি, পরে আপনি এপিআই কানেক্ট করতে পারবেন
  const orders = [
    {
      id: "ORD-12345",
      date: "May 15, 2023",
      status: "Delivered",
      total: 152.97,
      items: [
        { name: "Hydrating Essence", qty: 1, price: 48.00 },
        { name: "Nourishing Cream", qty: 2, price: 104.00 }
      ]
    },
    {
      id: "ORD-12346",
      date: "May 15, 2023",
      status: "Delivered",
      total: 152.97,
      items: [
        { name: "Hydrating Essence", qty: 1, price: 48.00 },
        { name: "Nourishing Cream", qty: 2, price: 104.00 }
      ]
    }
    // আরও অর্ডার এখানে যোগ করতে পারেন
  ];

  return (
    <div className="space-y-6">
      {orders.map((order, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          
          {/* টপ সেকশন: অর্ডার আইডি এবং স্ট্যাটাস */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Order {order.id}</h3>
              <p className="text-gray-500 mt-1">{order.date}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">{order.status}</span>
              <p className="text-lg font-bold text-gray-900 mt-1">${order.total.toFixed(2)}</p>
            </div>
          </div>

          {/* মিডল সেকশন: প্রোডাক্ট লিস্ট */}
          <div className="space-y-3 mb-8">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <p className="text-gray-600 font-medium">
                  {item.name} <span className="text-gray-400 ml-1">x {item.qty}</span>
                </p>
                <p className="text-gray-900 font-bold">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* বটম সেকশন: ভিউ ডিটেইলস বাটন */}
          <button className="w-full py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-all text-sm">
            View Order Details
          </button>
          
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;