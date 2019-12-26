import React from 'react'
import ReactApexChart from 'react-apexcharts'
import ApexCharts from 'apexcharts'
import { data150 } from '../data/Data150'

var lastDate = 0
var data = []
var TICKINTERVAL = 86400000
let XAXISRANGE = 777600000
function getDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0
  while (i < count) {
    var x = baseval
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    data.push({
      x,
      y,
    })
    lastDate = baseval
    baseval += TICKINTERVAL
    i++
  }
}

getDayWiseTimeSeries(new Date('20 Nov 2019 GMT').getTime(), 10, {
  min: 10,
  max: 90,
})

function getNewSeries(baseval, yrange) {
  var newDate = baseval + TICKINTERVAL
  lastDate = newDate

  for (var i = 0; i < data.length - 10; i++) {
    // IMPORTANT
    // we reset the x and y of the data which is out of drawing area
    // to prevent memory leaks
    data[i].x = newDate - XAXISRANGE - TICKINTERVAL
    data[i].y = 0
  }

  data.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
  })
}

class Simulasi extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          id: 'realtime',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },

        title: {
          text: 'Dynamic Updating Chart',
          align: 'left',
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          range: XAXISRANGE,
        },
        yaxis: {
          max: 100,
        },
        legend: {
          show: false,
        },
      },
      series: [
        {
          data: data.slice(),
        },
      ],
    }
  }

  componentDidMount() {
    this.intervals()
  }

  intervals() {
    window.setInterval(() => {
      getNewSeries(lastDate, {
        min: 10,
        max: 90,
      })

      ApexCharts.exec('realtime', 'updateSeries', [
        {
          data: data,
        },
      ])
    }, 1000)
  }

  render() {
    return (
      <div id='chart'>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type='line'
          height='350'
        />
      </div>
    )
  }
}

export default Simulasi
