import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartComponentProps = {
  growthData: number[];
  currentAge: string;
};

const ChartComponent = ({ growthData, currentAge }: ChartComponentProps) => {
  const baseAge = Number(currentAge) || 0;
  return (
    <Line
      data={{
        labels: Array.from({ length: growthData.length }, (_, i) => `${baseAge + i + 1}`),
        datasets: [
          {
            label: 'Projected Balance',
            data: growthData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.2,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Retirement Savings Growth Over Time' },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return 'R' + Number(value).toLocaleString();
              }
            }
          },
          x: {
            title: { display: true, text: 'Age' }
          }
        }
      }}
    />
  );
};

export default ChartComponent;
