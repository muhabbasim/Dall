'use client'

import dynamic from 'next/dynamic';
import { Props } from 'react-apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const ColumnChart = () => {

  const options:Props = {
   
      chart: {
        height: 350,
        type: 'rangeBar',
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          isDumbbell: true,
          columnWidth: 3,
          dumbbellColors: [['#008FFB', '#00E396']]
        }
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'top',
        horizontalAlign: 'left',
        customLegendItems: ['Product A', 'Product B']
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          gradientToColors: ['#00E396'],
          inverseColors: true,
          stops: [0, 100]
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        tickPlacement: 'on'
      }
  };
  const series = [
    {
      data: [
        {
          x: '2008',
          y: [2800, 4500]
        },
        {
          x: '2009',
          y: [3200, 4100]
        },
        {
          x: '2010',
          y: [2950, 7800]
        },
        {
          x: '2011',
          y: [3000, 4600]
        },
        {
          x: '2013',
          y: [4500, 6500]
        },
        {
          x: '2014',
          y: [4100, 5600]
        }
      ]
    }
  ]


  return (
    <div>
      <Chart type="rangeBar" options={options} series={series} height={200} width={'100%'} />
    </div>
  );
};

export default ColumnChart;


// const ColumnChart = () => {

//   const optionsareachart:Props = {
   
//       chart: {
//         height: 350,
//         type: 'rangeBar',
//         zoom: {
//           enabled: false
//         }
//       },
//       plotOptions: {
//         bar: {
//           isDumbbell: true,
//           columnWidth: 3,
//           dumbbellColors: [['#008FFB', '#00E396']]
//         }
//       },
//       legend: {
//         show: true,
//         showForSingleSeries: true,
//         position: 'top',
//         horizontalAlign: 'left',
//         customLegendItems: ['Product A', 'Product B']
//       },
//       fill: {
//         type: 'gradient',
//         gradient: {
//           type: 'vertical',
//           gradientToColors: ['#00E396'],
//           inverseColors: true,
//           stops: [0, 100]
//         }
//       },
//       grid: {
//         xaxis: {
//           lines: {
//             show: true
//           }
//         },
//         yaxis: {
//           lines: {
//             show: false
//           }
//         }
//       },
//       xaxis: {
//         tickPlacement: 'on'
//       }
//   };
//   const series = [
//     {
//       data: [
//         {
//           x: '2008',
//           y: [2800, 4500]
//         },
//         {
//           x: '2009',
//           y: [3200, 4100]
//         },
//         {
//           x: '2010',
//           y: [2950, 7800]
//         },
//         {
//           x: '2011',
//           y: [3000, 4600]
//         },
//         {
//           x: '2013',
//           y: [4500, 6500]
//         },
//         {
//           x: '2014',
//           y: [4100, 5600]
//         }
//       ]
//     }
//   ]


//   return (
  
//     <div>
//         <ReactApexChart options={optionsareachart} series={series} type="rangeBar" height={200} />
//     </div>
    
//   );
// };

// export default ColumnChart;
