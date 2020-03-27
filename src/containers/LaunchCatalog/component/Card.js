import React from 'react'
import { Card } from 'antd';

export default ({launchTitle, net}) => (
  <div className="site-card-border-less-wrapper">
    <Card title={launchTitle} bordered={false} style={{ width: 500 }}>
      <p>Time: {net}</p>
    </Card>
  </div>
)
