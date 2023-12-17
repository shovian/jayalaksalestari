import React from "react";
import DashboardCard from "./DashboardCard";

interface Notification {
  message: string;
  timestamp: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => (
  <DashboardCard title="Notifications">
    <ul>
      {notifications.map((notification, index) => (
        <li key={index}>
          {notification.message} - {notification.timestamp}
        </li>
      ))}
    </ul>
  </DashboardCard>
);

export default Notifications;
