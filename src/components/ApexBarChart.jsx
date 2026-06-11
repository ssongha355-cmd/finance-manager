import React, { useRef, useEffect } from 'react';
import { formatCurrency } from '../utils/formatters';

export const ApexBarChart = ({ categories, incomeData, expenseData, isLoading }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!window.ApexCharts && !isLoading) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
            script.async = true;
            script.onload = renderChart;
            document.head.appendChild(script);
        } else if (window.ApexCharts && !isLoading) {
            renderChart();
        }

        function renderChart() {
            if (!chartRef.current) return;

            const options = {
                series: [
                    { name: 'ចំណូល', data: incomeData },
                    { name: 'ចំណាយ', data: expenseData }
                ],
                chart: { type: 'bar', height: 260, toolbar: { show: false }, foreColor: '#94a3b8' },
                colors: ['#10b981', '#ef4444'], 
                plotOptions: {
                    bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded', borderRadius: 4 }
                },
                dataLabels: { enabled: false },
                stroke: { show: true, width: 2, colors: ['transparent'] },
                xaxis: {
                    categories: categories,
                    labels: { style: { fontFamily: 'Kantumruy Pro', fontSize: '11px' } }
                },
                yaxis: {
                    labels: { formatter: (val) => `$${val.toFixed(0)}`, style: { fontFamily: 'Kantumruy Pro' } }
                },
                fill: { opacity: 1 },
                legend: { fontFamily: 'Kantumruy Pro', fontSize: '12px', position: 'top' },
                tooltip: {
                    theme: 'dark',
                    y: { formatter: (val) => formatCurrency(val) }
                }
            };

            try {
                if (chartInstance.current) chartInstance.current.destroy();
                chartInstance.current = new ApexCharts(chartRef.current, options);
                chartInstance.current.render();
            } catch (error) {
                console.error('Bar chart render error:', error);
            }
        }

        return () => { 
            if (chartInstance.current) {
                try {
                    chartInstance.current.destroy();
                } catch (e) {
                    console.error('Bar chart cleanup error:', e);
                }
            }
        };
    }, [categories, incomeData, expenseData, isLoading]);

    return <div ref={chartRef}></div>;
};
