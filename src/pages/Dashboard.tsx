import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  FaUserFriends, 
  FaMoneyBillWave, 
  FaHandHoldingUsd, 
  FaChartLine,
  FaShoppingCart,
  FaBoxes,
  FaBell,
  FaSearch,
  FaCog,
  FaUserCircle
} from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const Dashboard = () => {
  const { t } = useTranslation();

  // Weekly income data
  const weeklyData = [
    { day: "Sat", income: 500, expenses: 200 },
    { day: "Sun", income: 750, expenses: 300 },
    { day: "Mon", income: 1200, expenses: 450 },
    { day: "Tue", income: 900, expenses: 350 },
    { day: "Wed", income: 1600, expenses: 500 },
    { day: "Thu", income: 1400, expenses: 400 },
    { day: "Fri", income: 2000, expenses: 600 },
  ];

  // Product category data
  const categoryData = [
    { name: "Electronics", value: 35 },
    { name: "Clothing", value: 25 },
    { name: "Groceries", value: 20 },
    { name: "Home Goods", value: 15 },
    { name: "Other", value: 5 }
  ];

  // Recent transactions
  const transactions = [
    { id: 1, customer: "John Doe", amount: 1200, status: "completed", time: "10:30 AM" },
    { id: 2, customer: "Sarah Smith", amount: 800, status: "pending", time: "11:45 AM" },
    { id: 3, customer: "Mike Johnson", amount: 1500, status: "completed", time: "1:15 PM" },
    { id: 4, customer: "Emily Davis", amount: 600, status: "failed", time: "2:30 PM" },
    { id: 5, customer: "David Wilson", amount: 950, status: "completed", time: "3:45 PM" },
  ];

  // Performance metrics
  const performanceMetrics = [
    { name: "Conversion Rate", value: "3.2%", change: "+0.5%", positive: true },
    { name: "Avg. Order Value", value: "৳1,250", change: "+৳120", positive: true },
    { name: "Customer Retention", value: "42%", change: "-2%", positive: false },
    { name: "Inventory Turnover", value: "5.8", change: "+0.3", positive: true },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const cards = [
    {
      label: t("dashboard.todayIncome"),
      value: "৳2,000",
      change: "+12% from yesterday",
      icon: <FaMoneyBillWave className="text-4xl text-green-300" />,
      bg: "from-green-400 to-green-600",
    },
    {
      label: t("dashboard.totalCustomer"),
      value: "1,240",
      change: "+24 this week",
      icon: <FaUserFriends className="text-4xl text-blue-300" />,
      bg: "from-blue-400 to-blue-600",
    },
    {
      label: t("dashboard.totalDue"),
      value: "৳5,420",
      change: "৳1,200 overdue",
      icon: <FaHandHoldingUsd className="text-4xl text-red-300" />,
      bg: "from-red-400 to-red-600",
    },
    {
      label: t("dashboard.totalSales"),
      value: "৳125,000",
      change: "+18% from last month",
      icon: <FaChartLine className="text-4xl text-purple-300" />,
      bg: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t("dashboard.title")}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={t("dashboard.search")} 
              className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <FaBell />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-sm">
            <FaUserCircle className="text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium">Admin</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${card.bg} text-white p-6 rounded-2xl shadow-xl relative overflow-hidden hover:shadow-2xl transition-shadow duration-300`}
          >
            <div className="absolute -top-5 -right-5 opacity-20 text-8xl">{card.icon}</div>
            <div className="relative z-10">
              <h2 className="text-sm opacity-80">{card.label}</h2>
              <p className="text-3xl font-bold mb-1">{card.value}</p>
              <p className="text-xs opacity-80">{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly Income/Expenses Chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              {t("dashboard.weeklyPerformance")}
            </h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
                Income
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
                Expenses
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: '#e5e7eb', 
                  fontSize: '14px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: '#6b7280' }}
              />
              <Legend />
              <Bar
                dataKey="income"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
              />
              <Bar
                dataKey="expenses"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Categories Pie Chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
            {t("dashboard.productCategories")}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e5e7eb',
                  fontSize: '14px',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              {t("dashboard.recentTransactions")}
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {t("dashboard.viewAll")}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t("dashboard.customer")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t("dashboard.amount")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t("dashboard.status")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t("dashboard.time")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.customer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      ৳{transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {transaction.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
            {t("dashboard.performanceMetrics")}
          </h2>
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.name}</h3>
                    <p className="text-xl font-semibold mt-1">{metric.value}</p>
                  </div>
                  <div className={`flex items-center ${metric.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {metric.positive ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={weeklyData}>
                      <Line 
                        type="monotone" 
                        dataKey={index % 2 === 0 ? "income" : "expenses"} 
                        stroke={metric.positive ? "#10B981" : "#EF4444"} 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;