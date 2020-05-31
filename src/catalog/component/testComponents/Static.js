import React from 'react'
import {LoadingOutlined,  } from '@ant-design/icons'

export default () => {
  return (
    <div style={{ backgroundColor: '#253237', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingOutlined style={{ fontSize: '100px' }} />
    </div>
  )
}