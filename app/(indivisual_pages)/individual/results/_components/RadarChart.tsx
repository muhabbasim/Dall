import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const RadialChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
        itemWidth: 3,
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          // radius: '50%',
          radius: [30, 100],
          data: data,
          itemStyle: {
            borderRadius: 5
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []); 

  return <div ref={chartRef} style={{ width: "500px", height: '400px' }} />;
};

export default RadialChart;