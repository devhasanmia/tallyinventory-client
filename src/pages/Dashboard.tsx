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

const Dashboard = () => {
  const data = [
    { day: "Sat", income: 500 },
    { day: "Sun", income: 750 },
    { day: "Mon", income: 1200 },
    { day: "Tue", income: 900 },
    { day: "Wed", income: 1600 },
    { day: "Thu", income: 1400 },
    { day: "Fri", income: 2000 },
  ];
  const { t } = useTranslation();
  return (
    <div className="p-6 space-y-8  min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm opacity-80">{t("dashboard.todayIncame")}</h2>
          <p className="text-3xl font-bold">৳2,000</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm opacity-80">{t("dashboard.totalCustomer")}</h2>
          <p className="text-3xl font-bold">120</p>
        </div>
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm opacity-80">{t("dashboard.totalDue")}</h2>
          <p className="text-3xl font-bold">120</p>
        </div>
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm opacity-80">{t("dashboard.totalSels")}</h2>
          <p className="text-3xl font-bold">৳25,000</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">এই সপ্তাহের ইনকাম</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} barSize={45}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: '#4B5563' }} />
            <YAxis tick={{ fill: '#4B5563' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
              labelStyle={{ color: '#6b7280' }}
              itemStyle={{ color: '#10B981' }}
            />
            <Legend />
            <Bar
              dataKey="income"
              fill="url(#colorIncome)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
