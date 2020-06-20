import React, { Component } from 'react'
import '../../css/index.css'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: 0,
      minutes: 0,
      hours: 0,
      seconds: 0,
      time_up: "",
      deadline: null,
    }
    this.count = this.count.bind(this)
  }

  count() {
    let now = new Date().getTime();
    let t = this.state.deadline - now;
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((t % (1000 * 60)) / 1000);
    this.setState({ days, minutes, hours, seconds })
    if (t < 0) {
      clearInterval(this.x);
      this.setState({ days: 0, minutes: 0, hours: 0, seconds: 0, time_up: "Запуск состоялся!" })
    }
  }

  componentDidMount() {
    const deadline = new Date(this.props.timeTillLaunch).getTime();
    setInterval(this.count, 1000)
    this.setState({ ...this.state, deadline: deadline })
  }

  render() {
    const { days, seconds, hours, minutes, time_up } = this.state
    if (time_up) {
      return <strong>{time_up}</strong>
    } else {
            return (
              <div>
              {(seconds < 10)
                ? <p>{days}д: {hours}ч: {minutes}м: 0{seconds}с</p>
                : <p>{days}д: {hours}ч: {minutes}м: {seconds}с</p>
              }
            </div>
            )
    }
  }
}

export default Timer

{/* <div>
  {(seconds < 10)
    ? <p>{days}д: {hours}ч: {minutes}м: 0{seconds}с</p>
    : <p>{days}д: {hours}ч: {minutes}м: {seconds}с</p>
  }
</div> */}