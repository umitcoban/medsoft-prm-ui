// components/AccountChart.tsx
"use client"

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    TimeScale,
    Title,
    Tooltip
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

interface AccountChartProps {
    data: AccountAnalytic | null;
    chartType: 'pie' | 'bar';
    chartDataKey: 'date' | 'role';
}

const AccountChart: FC<AccountChartProps> = ({ data, chartType, chartDataKey }) => {

    if (!data) return <p>No Data</p>;

    let chartData;
    if (chartDataKey === 'date') {
        const labels = data.accountsCountWithDate.map(item => item.second ? dayjs(item.second).format("DD/MM/YYYY") : "");
        const counts = data.accountsCountWithDate.map(item => item.first || 0);

        chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'User Count Over Time',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }
            ],
        };
    } else if (chartDataKey === 'role') {
        const labels = ['Users', 'Admins', 'Doctors'];
        const counts = [data.accountsCount.user_count, data.accountsCount.admin_count, data.accountsCount.doctor_count];

        chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Role Based Counts',
                    data: counts,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                }
            ],
        };
    }

    const options = chartDataKey === 'date' ? {
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'month' as const,
                },
            },
            y: {
                beginAtZero: true,
            }
        },
    } : {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    if (!chartData) return <p>No Chart Data</p>;

    return (
        <>
            {chartType === 'pie' ? (
                <Pie data={chartData} />
            ) : (
                <Bar data={chartData} options={options} style={{height: "100%"}} />
            )}
        </>
    );
};

export default AccountChart;
