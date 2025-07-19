// components/EventChart.tsx
import { useEffect, useRef } from 'react';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';

interface EventChartProps {
  data: {
    timestamp: Date;
    count: number;
  }[];
}

const EventChart = ({ data }: EventChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<keyof ChartTypeRegistry, number[], string> | null>(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Détruire l'instance précédente si elle existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Formater les labels pour l'axe X
      const labels = data.map(item => 
        item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre d\'événements par minute',
            data: data.map(item => item.count),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: false,
                text: 'Nombre d\'événements'
              }
            },
            x: {
              title: {
                display: false,
                text: 'Heure'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context) => {
                  const dataItem = data[context[0].dataIndex];
                  return dataItem.timestamp.toLocaleString();
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default EventChart;