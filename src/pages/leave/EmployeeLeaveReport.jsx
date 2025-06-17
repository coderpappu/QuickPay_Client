import { motion } from "framer-motion";
import { BarChart2, CalendarCheck, Clock } from "lucide-react";

const getUsageLevel = (percentage) => {
  if (percentage < 50) return { label: "Healthy", color: "bg-green-500" };
  if (percentage < 80) return { label: "Moderate", color: "bg-yellow-500" };
  return { label: "Critical", color: "bg-red-500" };
};

{
  !isReportLoading && !isReportError && reportLeave?.data && (
    <div className="grid grid-cols-1 gap-6 px-6 py-4 md:grid-cols-2 xl:grid-cols-3">
      {reportLeave.data.map((report, i) => {
        const { color, label } = getUsageLevel(report.percentageUsed);
        return (
          <motion.div
            key={report.leaveTypeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-2xl border border-gray-300 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-dark-card"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {report.leaveTypeName}
              </h3>
              <span
                className={`text-xs font-medium ${color} rounded-full px-3 py-1 text-white`}
              >
                {label}
              </span>
            </div>

            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
              <div
                className={`h-2 ${color} rounded-full transition-all`}
                style={{ width: `${report.percentageUsed}%` }}
                title={`${report.percentageUsed}% used`}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <CalendarCheck size={16} /> {report.totalDays}{" "}
                <span className="hidden sm:inline">Total</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} /> {report.usedDays}{" "}
                <span className="hidden sm:inline">Used</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart2 size={16} /> {report.remainingDays}{" "}
                <span className="hidden sm:inline">Remaining</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
