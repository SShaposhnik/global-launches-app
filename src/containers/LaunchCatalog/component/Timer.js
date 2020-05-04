import React, {Component} from 'react'


class Timer extends Component {
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
    }

    componentDidMount() {
        const deadline = new Date(this.props.timeTillLaunch).getTime();
        setInterval(this.count, 1000)
        this.setState({...this.state, deadline: deadline})
        
    }

    render() {
        const { days, seconds, hours, minutes, time_up } = this.state
        return (
            <div className="site-card-border-less-wrapper">
                    <p>{days}d : {hours}h : {minutes}m : {seconds}s</p>
                    <strong>{time_up}</strong>
            </div>
        )
    }
}

export default Timer