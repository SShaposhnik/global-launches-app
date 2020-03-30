import React, { Component } from 'react'
import './timerCSS.css'

let deadline = "April 9, 2020 08:05:06 UTC"

class CountDown extends Component {
    constructor(props) {
        super(props)
        this.count = this.count.bind(this)
        this.state = {
            days: 0,
            minutes: 0,
            hours: 0,
            secounds: 0,
            time_up:""
        }
        this.x = null
    }
    count () {
        let now = new Date().getTime();
        let t = this.deadline - now;
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((t % (1000 * 60)) / 1000);
        this.setState({days, minutes, hours, seconds})
        if (t < 0) {
            clearInterval(this.x);
            this.setState({ days: 0, minutes: 0, hours: 0, seconds: 0, time_up: "время вышло!" })
        }
    }
    componentDidMount() {
        this.deadline = new Date(deadline).getTime();
        this.x = setInterval(this.count, 1000);
    }

    render() {
        const { days, seconds, hours, minutes, time_up } = this.state
        return (
            <div>
                <div id="clockdiv">
                    <div>
                        <span className="days" id="day">{days}</span>
                        <div>дней</div>

                    </div>
                    <div>
                        <span className="hours" id="hour">{hours}</span>
                        <div>часов</div>

                    </div>
                    <div>
                        <span className="minutes" id="minute">{minutes}</span>
                        <div>минут</div>

                    </div>
                    <div>
                        <span className="seconds" id="second">{seconds}</span>
                        <div>секунд</div>

                    </div>
                </div>

                <p id="demo">{time_up}</p>
            </div>
        )
    }
}
export default CountDown