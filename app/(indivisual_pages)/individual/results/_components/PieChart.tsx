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
      toolbox: {
        show: true,
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
        itemWidth: 3,
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [30, 100],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: data,
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



// import React, { useCallback, useState } from "react";
// import {PieChart as Chart, Pie, Sector, Legend } from "recharts";

// // const data = [
// //   { name: "Group A", value: 400, fill: "#8884d8"},
// //   { name: "Group B", value: 300, fill: "#83a6ed"},
// //   { name: "Group C", value: 300, fill: "#a4de6c"},
// //   { name: "Group D", value: 200, fill: "#ffc658"}
// // ];

// const style = {
//   top: 180,
//   left: 350,
//   lineHeight: "24px"
// };

// const renderActiveShape = (props: any) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//         {payload.letter}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={fill}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         textAnchor={textAnchor}
//         fill="#333"
//       >{`PV ${value}`}</text>
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         dy={18}
//         textAnchor={textAnchor}
//         fill="#999"
//       >
//         {`(Rate ${(percent * 100).toFixed(2)}%)`}
//       </text>
//     </g>
//   );
// };

// export default function PieChart({ data }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const onPieEnter = useCallback(
//     (_, index) => {
//       setActiveIndex(index);
//     },
//     [setActiveIndex]
//   );

//   return (
//     <Chart width={400} height={400}>
//       <Pie
//         activeIndex={activeIndex}
//         activeShape={renderActiveShape}
//         data={data}
//         cx={200}
//         cy={200}
//         innerRadius={60}
//         outerRadius={80}
//         fill="#8884d8"
//         dataKey="value"
//         onMouseEnter={onPieEnter}
//       />
//       <Legend
//         iconSize={10}
//         width={320}
//         height={140}
//         layout="vertical"
//         verticalAlign="middle"
//         wrapperStyle={style}
//       />
//     </Chart>
//   );
// }
