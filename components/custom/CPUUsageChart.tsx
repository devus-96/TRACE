// components/dashboard/CPUUsageChart.tsx
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CPUUsageChartProps {
  cpuData: {
    timestamp: string;
    "metrics.cpu_percent": number;
  }[];
}

export function CPUUsageChart({ cpuData }: CPUUsageChartProps) {
  // Fonction pour générer les labels des 2 dernières heures
  const generateTimeLabels = () => {
    const now = new Date();
    const labels = [];
    for (let i = 120; i >= 0; i -= 30) { // 2 heures = 120 minutes, par pas de 30 minutes
      const time = new Date(now.getTime() - i * 60000);
      labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    return labels;
  };

  // Fonction pour formater les données
  const formatChartData = () => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 150 * 60000);
    
    // Filtrer les données des 2 dernières heures
    const filteredData = cpuData.filter(item => {
      const itemTime = new Date(item.timestamp);
      return itemTime >= twoHoursAgo && itemTime <= now;
    });

    // Grouper par intervalle de 30 minutes
    const timeSlots = generateTimeLabels();
    const slotValues = Array(timeSlots.length).fill(null);
    
    filteredData.forEach(item => {
      const itemTime = new Date(item.timestamp);
      const minutesAgo = (now.getTime() - itemTime.getTime()) / 60000;
      const slotIndex = Math.floor(minutesAgo / 30);
      
      if (slotIndex >= 0 && slotIndex < timeSlots.length) {
        // Prendre la valeur max pour chaque intervalle
        const currentValue = item["metrics.cpu_percent"];
        if (slotValues[slotIndex] === null || currentValue > slotValues[slotIndex]) {
          slotValues[slotIndex] = currentValue;
        }
      }
    });

    return slotValues;
  };

  const data = {
    labels: generateTimeLabels(),
    datasets: [
      {
        label: "CPU Usage (%)",
        data: formatChartData(),
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)");
          return gradient;
        },
        borderColor: "rgb(59, 130, 246)",
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(59, 130, 246)",
        tension: 0.4,
        borderWidth: 2,
      }
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Time (last 2 hours)'
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + "%";
          },
        },
        title: {
          display: true,
          text: 'CPU Usage (%)'
        }
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">CPU Usage (Last 2 Hours)</CardTitle>
      </CardHeader>
      <CardContent className="h-[200px] md:h-[250px]">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}