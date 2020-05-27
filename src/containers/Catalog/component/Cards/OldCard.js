import React, { Component } from 'react'
import { Card, Avatar } from 'antd'
import './Card.css'
import moment from 'moment'
import 'moment/locale/ru'
import Timer from '../Timer/Timer'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;

class LaunchCard extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  func() {
    console.log('Привет!')
  }

  render() {
    const { launches } = this.props
    return (
      <div className="card-layout">
        {launches.map(el => (
          <Card
            hoverable
            className="card-grid"
            onClick={this.func}
            cover={
              <img
                alt="example"
                src="https://images.pexels.com/photos/23769/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              />
            }
          >
            <Meta
              avatar={<Avatar src="https://image.flaticon.com/icons/svg/2929/2929073.svg" />}
              title={el.rocket.name}
              description={el.name.split('|')[1]}
            /><br />
              Дата запуска: {moment(el.net).utc(0).locale('ru').format('LLL z')}<br /><br />
              <Timer timeTillLaunch={el.net} />
          </Card>
        ))}
      </div>
    )
  }
}

export default LaunchCard