const orders = [
  { id: '#25426', date: 'Nov 8th, 2023', customer: 'Kavin', status: 'Delivered', amount: '200.00' },
  { id: '#25425', date: 'Nov 7th, 2023', customer: 'Komael', status: 'Canceled', amount: '200.00' },
  { id: '#25424', date: 'Nov 6th, 2023', customer: 'Nikhil', status: 'Delivered', amount: '200.00' },
  { id: '#25423', date: 'Nov 5th, 2023', customer: 'Shivam', status: 'Canceled', amount: '200.00' },
  { id: '#25422', date: 'Nov 4th, 2023', customer: 'Shadab', status: 'Delivered', amount: '200.00' },
  { id: '#25421', date: 'Nov 2nd, 2023', customer: 'Yogesh', status: 'Delivered', amount: '200.00' },
]

export default function OrderTable() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Orders</h3>
      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th>Product</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
  {orders.map((order, idx) => (
    <tr
      key={idx}
      className="border-t border-gray-200 hover:bg-gray-50 transition"
    >
      <td className="py-4 text-gray-800">Lorem Ipsum</td>
      <td className="py-4 text-gray-600">{order.id}</td>
      <td className="py-4 text-gray-600">{order.date}</td>
      <td className="py-4 text-gray-700">{order.customer}</td>
      <td
        className={`py-4 font-medium ${
          order.status === 'Delivered'
            ? 'text-green-600'
            : 'text-orange-500'
        }`}
      >
        {order.status}
      </td>
      <td className="py-4 text-gray-800">{order.amount}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  )
}
