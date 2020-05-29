import React from 'react'
import { Table, Button } from 'antd'
import {
  LoadingOutlined,
} from '@ant-design/icons'
import '../../css/index.css'
import {
  animateScroll as scroll,
  scroller
} from 'react-scroll'


// not-uploaded-content


export default () => {

  return (
    <div className='not-uploaded-content'>
      <LoadingOutlined />
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <Button type="primary"
              shape="circle"
              onClick={scroll.scrollToTop}
              id="myBtn"
              title="Наверх!"
            />
    </div>
  )
}

// export default () => {

//   return (
//     <div>
//       <Table
//         size="large"
//       >
//       </Table>
//     </div>
//   )
// }
