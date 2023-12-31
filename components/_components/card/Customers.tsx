'use client'

import dynamic from 'next/dynamic';
import React from 'react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Stack, Typography } from '@mui/material';
import { Props } from 'react-apexcharts';
import DashboardCard from './DashboardCard';

type StatusChartProps = {
  data: any;
  title: string;
  color: string;
  subtitle: string | undefined;
  isSub: boolean;
  Icon?: any;
  percentage?: number;
}
const Customers = ({ color, data, title, Icon, subtitle, percentage, isSub }: StatusChartProps) => {

  // chart
  const options: Props = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 80,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  };
  const series = [
    {
      name: '',
      color: color,
      data: data,
    },
  ];

  return (
    <DashboardCard
      title={title}
      subtitle='individual results'
      action={
        
        <Stack direction="row" spacing={1} mt={1} alignItems="center">
          {!isSub && (
            <>
              <div className={`bg-[#86B6F6] h-10 w-10 rounded-full flex items-center justify-center`}>
                <Icon width={45} color="white" />
              </div>
              <Typography variant="subtitle2" fontWeight="600">
                {percentage}%
              </Typography>
            </>
          )}
        </Stack>
      }
      footer={
        <Chart type="area" options={options} series={series} width={'100%'} height={60}/>
      }
    >
      <>
        <Typography variant="h5">{subtitle}</Typography>
      </>
    </DashboardCard>
  );
};

export default Customers;
