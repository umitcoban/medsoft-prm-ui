"use client"
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import dayjs from 'dayjs';
import React from 'react';

interface AccountChartProps {
    data: AccountAnalytic | null;
    chartType: 'pie' | 'bar';
    chartDataKey: 'date' | 'role';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AccountChart: React.FC<AccountChartProps> = ({ data, chartType = 'bar', chartDataKey = 'date' }) => {
    if (!data) return <p>No Data</p>;

    let chartData: any[] = [];

    if (chartDataKey === 'date') {
        chartData = data.accountsCountWithDate.map(item => ({
            date: item.second ? dayjs(item.second).format("DD/MM/YYYY") : "",
            count: item.first || 0
        }));
    } else if (chartDataKey === 'role') {
        chartData = [
            { id: 'Users', label: 'Users', value: data.accountsCount.user_count || 0 },
            { id: 'Admins', label: 'Admins', value: data.accountsCount.admin_count || 0 },
            { id: 'Doctors', label: 'Doctors', value: data.accountsCount.doctor_count || 0 }
        ];
    }

    if (!chartData.length) return <p>No Chart Data</p>;

    return (
        <div style={{ height: 400 }}>
            {chartType === 'pie' ? (
                <ResponsivePie
                    data={chartData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'nivo' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor="#333333"
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                />
            ) : (
                <ResponsiveBar
                    data={chartData}
                    keys={['count']}
                    indexBy="date"
                    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Date',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Count',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    animate={true}
                    motionConfig="wobbly"
                />
            )}
        </div>
    );
};

export default AccountChart;
