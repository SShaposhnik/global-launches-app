import React, {Component} from 'react'
import {Card} from 'antd';
import CountDown from "./timer/timerFunction";


class LaunchCard extends  Component {
    constructor(props) {
        super(props);
        this.count = this.count.bind(this)
        this.state = {
            days: 0,
            minutes: 0,
            hours: 0,
            seconds: 0,
            time_up: "",
            deadline: null,
        }
    }

    count () {
        let now = new Date().getTime();
        let t = this.state.deadline - now;
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((t % (1000 * 60)) / 1000);
        this.setState({days, minutes, hours, seconds})
        if (t < 0) {
            clearInterval(this.x);
            this.setState({ days: 0, minutes: 0, hours: 0, seconds: 0, time_up: "Время вышло!" })
        }
        console.log('FUCK')
    }

    componentDidMount() {
        const deadline = new Date(this.props.net).getTime();
        setInterval(this.count, 1000)
        this.setState({...this.state, deadline: deadline})
    }

    render() {
        const { launchTitle, net } = this.props
        const { days, seconds, hours, minutes, time_up } = this.state
        return (
            <div className="site-card-border-less-wrapper">
                <Card title={launchTitle} style={{width: '100%', margin: 'center'}}>
                    <p>Time:: {net}</p>
                    <p>{days}d : {hours}h : {minutes}m : {seconds}s</p>
                    <strong>{time_up}</strong>
                </Card>
            </div>
        )
    }
}

export default LaunchCard