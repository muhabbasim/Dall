'use client'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Props } from 'react-apexcharts';


const AreaChart = () => {

  const option:Props = {

    chart: {
      id: 'area-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: '3',
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
        show: true,
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },

    // chart: {
    //         id: 'area-chart',
    //         fontFamily: "'Plus Jakarta Sans', sans-serif",
    //         foreColor: '#adb0bb',
    //         zoom: {
    //           enabled: true,
    //         },
    //         toolbar: {
    //           show: false,
    //         },
    //       },
    //       dataLabels: {
    //         enabled: false,
    //       },
    //       stroke: {
    //         width: '3',
    //         curve: 'smooth',
    //       },
    //       xaxis: {
    //         type: 'datetime',
    //         categories: [
    //           '2018-09-19T00:00:00',
    //           '2018-09-19T01:30:00',
    //           '2018-09-19T02:30:00',
    //           '2018-09-19T03:30:00',
    //           '2018-09-19T04:30:00',
    //           '2018-09-19T05:30:00',
    //           '2018-09-19T06:30:00',
    //         ],
    //       },
    //       yaxis: {
    //         opposite: false,
    //         labels: {
    //           show: true,
    //         },
    //       },
    //       legend: {
    //         show: true,
    //         position: 'bottom',
    //         width: '50px',
    //       },
    //       grid: {
    //         show: false,
    //       },
    //       tooltip: {
    //         theme: 'dark',
    //         fillSeriesColor: false,
    //       },
  }

  const series = [
    {
      name: 'Sales Summery 1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Sales Summery 2',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
]

return(
  <>
      <Chart type="area" options={option} series={series} height={300} width={'100%'} />
  </>
)
};

export default AreaChart;
