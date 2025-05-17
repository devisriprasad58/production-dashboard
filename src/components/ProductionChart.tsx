// components/ProductionChart.tsx
import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Paper, Title, Loader, Text } from '@mantine/core';
import { useFetchData } from '../Hooks/useFetchData';

const ProductionChart: React.FC<{ filterValues: any }> = ({ filterValues }) => {
  const { data = [], isLoading, error } = useFetchData();

  if (isLoading) return <Loader />;
  if (error) return <Text color="red">Failed to load chart data</Text>;

const filteredData = data.filter((item: any) => {
  if (!item) return false;

  // Filter by machineName if given
  const matchesMachineName =
    !filterValues?.machineName ||
    (item.machineName &&
      filterValues.machineName &&
      item.machineName.toLowerCase() === filterValues.machineName.toLowerCase());

  // Filter by status if given
  const matchesStatus =
    !filterValues?.status ||
    (item.status &&
      filterValues.status &&
      item.status.toLowerCase() === filterValues.status.toLowerCase());

  // Filter by output if given (number)
  const matchesOutput =
    !filterValues?.output ||
    (item.output !== undefined && Number(item.output) === Number(filterValues.output));

  // Filter by date range
  const matchesDateRange = (() => {
    const [start, end] = filterValues?.dateRange || [null, null];
    if (!start && !end) return true;

    const itemDate = item.lastUpdated ? new Date(item.lastUpdated) : null;
    if (!itemDate) return false;

    if (start && new Date(start) > itemDate) return false;
    if (end && new Date(end) < itemDate) return false;

    return true;
  })();

  return matchesMachineName && matchesStatus && matchesOutput && matchesDateRange;
});


  const chartOptions: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    xaxis: {
      categories: filteredData.map((item: any) => item.machineName),
      title: { text: 'Machines' },
    },
    yaxis: { title: { text: 'Output' } },
    dataLabels: { enabled: true },
    plotOptions: { bar: { borderRadius: 4, horizontal: false } },
    colors: ['#228be6'],
  };

  const chartSeries = [
    {
      name: 'Output',
      data: filteredData.map((item: any) => item.output),
    },
  ];

  return (
    <Paper p="md" radius="md" shadow="sm" withBorder>
      <Title order={5} mb="sm">Machine Output Chart</Title>
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </Paper>
  );
};

export default ProductionChart;
