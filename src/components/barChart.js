// importing dependencies
import React from 'react'
import { Bar } from 'react-chartjs-2'
/* eslint-disable no-unused-vars */
import { Chart } from 'chart.js/auto'
/* eslint-enable no-unused-vars */

export default function BarChart(props) {
  return (
    <Bar
      height={props.length > 4 ? (props.length * 40) + 70 : 225}
      data={props.data}
      options={{
        maintainAspectRatio: false,
        indexAxis: 'y',
        skipNull: true,
        color: 'white',
        borderColor: '#d2dce7',
        scales: {
          y: {
            grid: {
              drawBorder: true,
              color: (context) => {
                if (context.index === undefined) {
                  return '#d2dce7'
                }
                return 'transparent'
              },
            },
          },
          x: {
            grid: {
              color: (context) => {
                if (context.index === 0) {
                  return '#d2dce7'
                }
                return 'transparent'
              },
            },
          },
        },
      }}
    />
  )
}
