// import React ,{ useState, useEffect } from 'react';
// // import { URL, NEXT_URL, oldUrl } from '../../../Launches/index';

// // AnnouncedLaunches: null,
// // ScheduledLaunches: null,
// // FinishedLaunches: null,

// const Planets = () => {
//   const [hasError, setErrors] = useState(false);
//   const [announcedLaunches, setAnnouncedLaunches] = useState({});
//   const [scheduledLaunches, setScheduledLaunches] = useState({});
//   const [finishedLaunches,  setFinishedLaunches]  = useState({});

//   useEffect(() => {
//     async function fetchData1() {
//       const res = await fetch(URL)
//       res
//         .json()
//         .then(res => setAnnouncedLaunches(res))
//     }
//     async function fetchData2() {
//       // const res = await fetch(NEXT_URL)
//       res
//         .json()
//         .then(res => setScheduledLaunches(res))
//     }
//     async function fetchData3() {
//       const res = await fetch(oldUrl)
//       res
//         .json()
//         .then(res => setFinishedLaunches(res))
//     }
//     fetchData1()
//     fetchData2()
//     fetchData3()
//   }, [])
//   return (announcedLaunches)
// }
// export default Planets