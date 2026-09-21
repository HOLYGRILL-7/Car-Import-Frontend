/* eslint-disable no-unused-vars */

const SpecCard = ({ icon: Icon, iconColor, label, value }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="flex flex-col items-start gap-2 p-3 bg-gray-50 rounded-xl sm:flex-row sm:items-center sm:gap-3 sm:p-4">
      <div className={`p-2 ${colorClasses[iconColor]} rounded-lg shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default SpecCard;
