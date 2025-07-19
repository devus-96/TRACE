// components/dashboard/DiskUsageChart.tsx
import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DiskUsageChart() {
  const data = {
    labels: ["Used Disk", "Free Disk"],
    datasets: [
      {
        data: [80, 20], // 80% used, 20% free
        backgroundColor: ["rgb(59, 130, 246)", "rgb(34, 197, 94)"], // blue-500, green-500
        borderColor: ["rgb(59, 130, 246)", "rgb(34, 197, 94)"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%', // Makes it a donut chart
    plugins: {
      legend: {
        display: false, // Hide default legend as we have custom text below
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="relative w-full h-[150px] flex items-center justify-center"> {/* Adjust size as needed */}
      <Doughnut data={data} options={options} />
      {/* Percentage text in the middle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-800">
        80%
      </div>
      <div className="absolute bottom-4 right-4 text-sm text-gray-500">
        Today
      </div>
    </div>
  );
}