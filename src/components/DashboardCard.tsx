import React, { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-lg p-4">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default DashboardCard;
