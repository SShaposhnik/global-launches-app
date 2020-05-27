import React, { Component } from 'react'
import { Table, Button } from 'antd'
import FetchLaunchApi from '../LoadLaunchData/index'




export default () => {

  return (
    <div>
      <Table
        size="large"
      >
      </Table>
    </div>
  )
}

// class Tabless extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       test: this.props.testim,
//     }
//   }
//   render() {
//     console.log('announcedLaunches', this.props.announcedLaunches);
//     console.log('test', this.state.testim);
    
//     return (
//       <div>
//         <Table />
//         <Button >Tabless</Button>
//       </div>
//     )
//   }
// }

// export default Tabless