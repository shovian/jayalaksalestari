import React from "react";
import DashboardCard from "./DashboardCard";

interface Activity {
  action: string;
  item: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  data: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ data }) => (
  <DashboardCard title="Recent Activities">
    <ul>
      {data.map((activity, index) => (
        <li key={index}>
          {activity.action} - {activity.item} ({activity.timestamp})
        </li>
      ))}
    </ul>
  </DashboardCard>
);

export default RecentActivities;
