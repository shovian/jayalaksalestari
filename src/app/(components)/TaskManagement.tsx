import React from "react";
import DashboardCard from "./DashboardCard";

interface TaskManagementProps {
  tasks: string[];
}

const TaskManagement: React.FC<TaskManagementProps> = ({ tasks }) => (
  <DashboardCard title="Task Management">
    {tasks.map((task, index) => (
      <div key={index}>
        <h3>{task}</h3>
        <p>Incomplete</p>
      </div>
    ))}
  </DashboardCard>
);

export default TaskManagement;
