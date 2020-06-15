import React, { useState, useEffect } from 'react'
import { notification } from 'antd'
import moment from 'moment'

const THIS_YEAR = moment().format('YYYY')
const LIMIT = 10000

export const URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=1,2'
export const URLS = 'https://launchlibrary.net/1.4/launch?startdate=2020-05-28&enddate=2020-05-28&limit=10000&fields=name,net,location,status,rocket,mapURL,countryCode'

// следующие запуски с датой(без времени)
const NEXT_URL = 'https://launchlibrary.net/1.4/launch/next/1000?status=2'

// старые запуски
let oldUrl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment(THIS_YEAR).format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=' + LIMIT + '&fields=name,net,location,status,rocket,mapURL,countryCode'

// export function YesOrNoPreloader() {
//   let preloader = true
//   let a = 1
//   let b = 2
//   let c = 3

//   async function fetchData1() {
//     const res = await fetch(URLS)
//     if (!res.ok) {
//       preloader = true
//     }
//   }
//   async function fetchData2() {
//     const res = await fetch(NEXT_URL)
//     if (!res.ok) {
//       preloader = true
//     }
//   }
//   async function fetchData3() {
//     const res = await fetch(oldUrl)
//     if (!res.ok) {
//       preloader = true
//     }
//   }

//   fetchData1()
//   fetchData2()
//   fetchData3()
//   return [a, b, c]
// }


function YesOrNoPreloader () {
  const [announcedLaunches, setAnnouncedLaunches] = useState(null)
  const [scheduledLaunches, setScheduledLaunches] = useState(null)
  const [finishedLaunches,  setFinishedLaunches]  = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchLaunches(URL)
    fetchNextLaunches(NEXT_URL)
    fetchOldLaunches(oldUrl)
  }, [])

  function fetchLaunches(url) {
    fetch(url)
      .then(function(res){
        if (res.ok) {
          fetch(url)
          .then(res => res.json())
          .then(res => setAnnouncedLaunches(res))
        }
      })
  }

  function fetchNextLaunches(url) {
    fetch(url)
      .then(function(res){
        if (res.ok) {
          fetch(url)
          .then(res => res.json())
          .then(res => setScheduledLaunches(res))
        }
      })
  }

  function fetchOldLaunches(url) {
    fetch(url)
    .then(function(res){
      if (res.ok) {
        fetch(url)
          .then(res => res.json())
          .then(res => {setFinishedLaunches(res)})
      }
    })
  }

  return ([announcedLaunches, scheduledLaunches, finishedLaunches])
}



export default YesOrNoPreloader


// const YesOrNoPreloader = (loading) => {
//   const [load, setLoading] = useState(loading)
//   const [hasError, setErrors] = useState(false)

//   useEffect(() => {
//     async function fetchData1() {
//       const res = await fetch(URL)
//       if (!res.ok) {
//         setErrors(true)
//       }
//     }
//     async function fetchData2() {
//       const res = await fetch(NEXT_URL)
//       if (!res.ok) {
//         setErrors(true)
//       }
//     }
//     async function fetchData3() {
//       const res = await fetch(oldUrl)
//       if (!res.ok) {
//         setErrors(true)
//       }
//     }
//     fetchData1()
//     fetchData2()
//     fetchData3()
//   }, [])

//   if (hasError) {
//     return false
//   } else { return true }
// }
// export default YesOrNoPreloader