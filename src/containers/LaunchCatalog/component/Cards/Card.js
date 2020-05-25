import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Card.css'
import { Card } from 'antd';
import Column from 'antd/lib/table/Column'

const { Meta } = Card;
const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

class CardLaunches extends Component {

  state = {
    key: 'tab0',
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  }

  render() {
    let count = 0
    let content =[]

    const contentList = {
      tab0: this.props.launches[0].name,
      tab1: this.props.launches[1].name,
      tab2: this.props.launches[2].name,
      tab3: this.props.launches[3].name,
      tab4: this.props.launches[4].name,
    }


    let tabList1 = []
    let tabCount = 0
    while (tabCount < this.props.launches.length) {
      tabList1.push({key: `tab${tabCount}`, tab: `tab${tabCount}`})
      tabCount++
    }

    let contentCount = 0
    let contentList1 = []
    while (contentCount < this.props.launches.length) {
      contentList1.push({tab: '1'})
      contentCount++
    }
    console.log('tabList1 tab', tabList1[0].tab);
    

    while (count < this.props.launches.length) {
      content.push(this.props.launches[count])
      count++
    }

    return (
      <div>
        <Card
          hoverable
          style={{ width: '30%' }}
          title="Ближайшие запуски"
          extra={<a href="#">More</a>}
          tabList={tabList1}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        ><Meta title="Europe Street beat" description="www.instagram.com" />
          {contentList[this.state.key]}
        </Card>
      </div>
    )
  }
}

export default CardLaunches