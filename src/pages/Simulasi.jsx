/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import Ring from 'ringjs'

import {
  TimeSeries,
  TimeRange,
  TimeEvent,
  Pipeline as pipeline,
  Stream,
  EventOut,
  percentile,
} from 'pondjs'

import {
  ChartRow,
  Charts,
  YAxis,
  ScatterChart,
  Resizable,
  Legend,
  styler,
  ChartContainer,
  LineChart,
} from 'react-timeseries-charts'

const sec = 1000
const minute = 60 * sec
const hours = 60 * minute
const rate = 80

class Realtime extends React.Component {
  static displayName = 'AggregatorDemo'

  state = {
    time: new Date(2019, 0, 1),
    events: new Ring(200),
    percentile90Out: new Ring(0),
  }

  getNewEvent = t => {
    const base = Math.sin(t.getTime() / 1) * 7 + 2
    return new TimeEvent(t, parseInt(base + Math.random() * 90, 30))
  }

  componentDidMount() {
    //
    // Setup our aggregation pipelines
    //

    this.stream = new Stream()

    pipeline()
      .from(this.stream)
      .windowBy('5m')
      .emitOn('discard')
      .aggregate({
        value: { value: percentile(9) },
      })
      .to(EventOut, event => {
        const events = this.state.percentile90Out
        events.push(event)
        this.setState({ percentile90Out: events })
      })

    //
    // Setup our interval to advance the time and generate raw events
    //

    const increment = minute
    this.interval = setInterval(() => {
      const t = new Date(this.state.time.getTime() + increment)
      const event = this.getNewEvent(t)

      // Raw events
      const newEvents = this.state.events
      newEvents.push(event)
      this.setState({ time: t, events: newEvents })

      // Let our aggregators process the event
      this.stream.addEvent(event)
    }, rate)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const latestTime = `${this.state.time}`

    const fiveMinuteStyle = {
      value: {
        normal: { fill: '#619F3A', opacity: 0.2 },
        highlight: { fill: '619F3A', opacity: 0.5 },
        selected: { fill: '619F3A', opacity: 0.5 },
      },
    }

    const scatterStyle = {
      value: {
        normal: {
          fill: 'steelblue',
          opacity: 0.5,
        },
      },
    }

    //
    // Create a TimeSeries for our raw, 5min and hourly events
    //

    const eventSeries = new TimeSeries({
      name: 'raw',
      events: this.state.events.toArray(),
    })

    const perc90Series = new TimeSeries({
      name: '15 minute Per Mobil',
      events: this.state.percentile90Out.toArray(),
    })

    // Timerange for the chart axis
    const initialBeginTime = new Date(2019, 0, 1)
    const timeWindow = 3 * hours

    let beginTime
    const endTime = new Date(this.state.time.getTime() + minute)
    if (endTime.getTime() - timeWindow < initialBeginTime.getTime()) {
      beginTime = initialBeginTime
    } else {
      beginTime = new Date(endTime.getTime() - timeWindow)
    }
    const timeRange = new TimeRange(beginTime, endTime)

    // Charts (after a certain amount of time, just show hourly rollup)
    const charts = (
      <Charts>
        <LineChart
          axis='y'
          series={perc90Series}
          style={fiveMinuteStyle}
          columns={['value']}
        />
        <ScatterChart axis='y' series={eventSeries} style={scatterStyle} />
      </Charts>
    )

    const dateStyle = {
      fontSize: 12,
      color: '#AAA',
      borderWidth: 1,
      borderColor: '#F4F4F4',
    }

    const style = styler([
      { key: 'perc50', color: '#C5DCB7', width: 1, dashed: true },
      { key: 'perc90', color: '#DFECD7', width: 2 },
    ])

    return (
      <div>
        <div className='row'>
          <div className='col-md-4'>
            <Legend
              type='swatch'
              style={style}
              categories={[
                {
                  key: 'perc90',
                  label: 'Occupancy RealTime',
                  style: { fill: '#DFECD7' },
                },
              ]}
            />
          </div>
          <div className='col-md-8'>
            <span style={dateStyle}>{latestTime}</span>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-12'>
            <Resizable>
              <ChartContainer timeRange={timeRange}>
                <ChartRow height='150'>
                  <YAxis
                    id='y'
                    label='Occupancy'
                    min={0}
                    max={200}
                    width='70'
                    type='linear'
                  />
                  {charts}
                </ChartRow>
              </ChartContainer>
            </Resizable>
          </div>
        </div>
      </div>
    )
  }
}

// Export example
export default Realtime
