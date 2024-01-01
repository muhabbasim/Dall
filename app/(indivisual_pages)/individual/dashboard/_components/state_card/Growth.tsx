
import React from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Props } from 'react-apexcharts';
import Image from 'next/image';


const Growth = ({ Icon, color }) => {

  const option:Props = {

    chart: {
      id: 'area-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      height: 25,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',

    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    stroke: {
      width: '2',
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00',
        '2018-09-19T01:30:00',
        '2018-09-19T02:30:00',
        '2018-09-19T03:30:00',
        '2018-09-19T04:30:00',
        '2018-09-19T05:30:00',
        '2018-09-19T06:30:00',
      ],
    },
    yaxis: {
      opposite: false,
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
      position: 'bottom',
      width: '50px',
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      x: {
        show: false,
      }
    },

  }

  const series = [
    {
      name: '',
      data: [0, 10, 10, 30, 25, 45,43],
    },
    // {
    //   name: 'Sales Summery 2',
    //   data: [11, 32, 45, 32, 34, 52, 41],
    // },
  ]

  return (
      <div className=''>
        <Box
          width={38}
          height={38}
          bgcolor={color}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={1}
        >
          <Image src={Icon} alt="img" />
        </Box>

        <Box>
          <Chart type="area" options={option} series={series} height='42px' width={'120px'} />
        </Box>
      </div>
  );
};

export default Growth;
