import React, { Component, useState, useEffect } from 'react'
import moment from 'moment'
import { Button, Divider } from 'antd'

import MapLaunches from '../../../Launches/index'
import Tabless from '../TestTable/Table'
import LaunchTable from '../Table/Table'

// следующие запуски с временем и датой
const URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'

// следующие запуски с датой(без времени)
const NEXT_URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

const LIMIT = 10000
const THIS_YEAR = moment().format('YYYY')

// старые запуски
let oldUrl = `https://launchlibrary.net/1.4/launch?startdate=${moment(THIS_YEAR).format('YYYY-MM-DD')}&enddate=${moment().format('YYYY-MM-DD')}&limit=${LIMIT}&fields=name,net,location,status,rocket,mapURL,countryCode`

// announcedLaunches: null,
// scheduledLaunches: null,
// finishedLaunches: null,

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}

export function announcedLaunchesFetch(url, data) {
  
}

// export class announcedLaunchesFetch extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       announcedLaunches: null,
//     }
//   }
//   fetchLaunches(url) {
//     fetch(url)
//       .then(response => response.json())
//       .then(data => this.setState({ announcedLaunches: data }))
//   }
//   render (){
//     return (
//       <div>asdqweewq</div>
//     )
//   }

// }

// class FetchLaunchApi extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       announcedLaunches: null,
//       scheduledLaunches: null,
//       finishedLaunches: null,
//       loading: false,
//     }
//     this.func = this.func.bind(this)
//   }

  // fetchLaunches(url) {
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => this.setState({ announcedLaunches: data }))
  // }

//   fetchOldLaunches(url) {
//     this.setState({ loading: true })
//     fetch(url)
//       .then(response => response.json())
//       .then(data => this.setState({ finishedLaunches: data, loading: false, }))
//   }

//   fetchNextLaunches(url) {
//     fetch(url)
//       .then(response => response.json())
//       .then(data => this.setState({ scheduledLaunches: data }))
//   }

//   componentDidMount() {
//     this.fetchLaunches(URL)
//     this.fetchOldLaunches(oldUrl)
//     this.fetchNextLaunches(NEXT_URL)
//   }


//   async validationOfDate(url) {
//     this.setState({ loading: true })
//     let response = await fetch(url)
//     if (response.ok) { // если HTTP-статус в диапазоне 200-299 получаем тело ответа иначе Notification
//       this.fetchLaunches(url)
//     } else {
//       this.setState({ loading: false })
//     }
//   }

//   // launchDateButtonOnChange(date, dateString) {
//   //   oldUrl = 'https://launchlibrary.net/1.4/launch?startdate=' + dateString[0] + '&enddate=' + dateString[1] + '&limit=' + LIMIT + '&fields=name,net,location,status,rocket,mapURL,countryCode'
//   //   this.validationOfDate(oldUrl)
//   // }

//   func() {
//     console.log(this.state.announcedLaunches)
//     console.log(this.state.scheduledLaunches)
//     console.log(this.state.finishedLaunches)
//   }

//   render() {
//     const { announcedLaunches, scheduledLaunches, finishedLaunches, loading } = this.state
//     return (
//       <div>
//         <Tabless laucnhes={finishedLaunches} />
//         }
//       </div>
//     )
//   }
// }

// export default FetchLaunchApi
