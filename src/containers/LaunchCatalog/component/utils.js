export function countTimeTill (deadline) {
    let now = new Date().getTime();
    let totalTime = deadline - now;
    let days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((totalTime % (1000 * 60)) / 1000);
    if (totalTime > 0) {
        return ({days, minutes, hours, seconds})
    }
    else if (totalTime < 0) {
        clearInterval(this.x);
        return { days: 0, minutes: 0, hours: 0, seconds: 0, time_up: "Время вышло!" }
    } else {
        return null
    }
}
