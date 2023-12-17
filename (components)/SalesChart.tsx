import React from "react";
import DashboardCard from "./DashboardCard";
import { Bar } from "react-chartjs-2";

interface SalesChartProps {
  data: {
    labels: string[];
    data: number[];
  };
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const { labels, data: chartData } = data;

  const chartConfig = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: chartData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardCard title="Sales Chart">
      <Bar data={chartConfig} />
    </DashboardCard>
  );
};

export default SalesChart;
