// components/dashboard/MemoryAllocationChart.tsx
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

interface MemoryDataPoint {
  timestamp: string;
  "metrics.ram_percent": number;
}

interface MemoryAllocationChartProps {
  memoryData: MemoryDataPoint[];
}

export function MemoryAllocationChart({ memoryData }: MemoryAllocationChartProps) {
  // 1. Traitement des données pour les 2 dernières heures
  const processMemoryData = () => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    
    // Filtrer et trier les données
    const filteredData = memoryData
      .filter(item => new Date(item.timestamp) >= twoHoursAgo)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // Créer des intervalles de 10 minutes
    const intervals = Array.from({ length: 12 }, (_, i) => {
      const time = new Date(now.getTime() - (12 - i - 1) * 10 * 60 * 1000);
      return {
        time,
        label: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        values: [] as number[]
      };
    });

    // Remplir les intervalles avec les données
    filteredData.forEach(item => {
      const itemTime = new Date(item.timestamp);
      for (let i = 0; i < intervals.length; i++) {
        const start = i === 0 ? twoHoursAgo : intervals[i-1].time;
        const end = intervals[i].time;
        
        if (itemTime >= start && itemTime < end) {
          intervals[i].values.push(item["metrics.ram_percent"]);
          break;
        }
      }
    });

    // Calculer la moyenne pour chaque intervalle
    const labels = intervals.map(interval => interval.label);
    const data = intervals.map(interval => {
      if (interval.values.length === 0) return null;
      const sum = interval.values.reduce((a, b) => a + b, 0);
      return Math.round(sum / interval.values.length);
    });

    return { labels, data };
  };

  const { labels, data } = processMemoryData();

  // 2. Configuration du graphique
  const chartData = {
    labels,
    datasets: [
      {
        label: "RAM Usage (%)",
        data,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(234, 88, 12, 0.2)");
          gradient.addColorStop(1, "rgba(234, 88, 12, 0.0)");
          return gradient;
        },
        borderColor: "rgb(234, 88, 12)",
        pointBackgroundColor: "rgb(234, 88, 12)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(234, 88, 12)",
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        title: { display: true, text: 'Time (last 2 hours)' }
      },
      y: {
        min: 0,
        max: 100,
        ticks: { callback: (value) => `${value}%` },
        title: { display: true, text: 'Memory Usage (%)' }
      }
    },
  };

  // 3. Rendu du composant
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Memory Allocation (Last 2 Hours)</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        {memoryData.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading memory data...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}