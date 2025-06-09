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
} from "recharts";
import { FaUserFriends, FaMoneyBillWave, FaHandHoldingUsd, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  const { t } = useTranslation();

  const data = [
    { day: "Sat", income: 500 },
    { day: "Sun", income: 750 },
    { day: "Mon", income: 1200 },
    { day: "Tue", income: 900 },
    { day: "Wed", income: 1600 },
    { day: "Thu", income: 1400 },
    { day: "Fri", income: 2000 },
  ];

  const cards = [
    {
      label: t("dashboard.todayIncame"),
      value: "৳2,000",
      icon: <FaMoneyBillWave className="text-4xl text-green-300" />,
      bg: "from-green-400 to-green-600",
    },
    {
      label: t("dashboard.totalCustomer"),
      value: "120",
      icon: <FaUserFriends className="text-4xl text-blue-300" />,
      bg: "from-blue-400 to-blue-600",
    },
    {
      label: t("dashboard.totalDue"),
      value: "৳120",
      icon: <FaHandHoldingUsd className="text-4xl text-red-300" />,
      bg: "from-red-400 to-red-600",
    },
    {
      label: t("dashboard.totalSels"),
      value: "৳25,000",
      icon: <FaChartLine className="text-4xl text-purple-300" />,
      bg: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${card.bg} text-white p-6 rounded-2xl shadow-xl relative overflow-hidden`}
          >
            <div className="absolute -top-5 -right-5 opacity-20 text-8xl">{card.icon}</div>
            <div className="relative z-10">
              <h2 className="text-sm opacity-80">{card.label}</h2>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
          {t("এই সপ্তাহের ইনকাম")}
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} barSize={45}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 12 }} />
            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', fontSize: '14px' }}
              labelStyle={{ color: '#6b7280' }}
              itemStyle={{ color: '#10B981' }}
            />
            <Legend />
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <Bar
              dataKey="income"
              fill="url(#colorIncome)"
              radius={[10, 10, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
