import React, {Component} from 'react'
import {Layout, Menu, Spin, Input, DatePicker} from 'antd'
import MapChart from '../LaunchCatalog/component/MapChart'
import { SmileOutlined } from '@ant-design/icons'
import LaunchTable from "../LaunchCatalog/component/Table"
import LaunchOldTable from "../LaunchCatalog/component/TableOld"
import { ButtonStyledWrapper, TableOldStyledWrapper, FlexContainer, ContentWrapper } from '../LaunchCatalog/styled'
import { isNormalInteger } from '../LaunchCatalog/component/utils'
import './index.css'
import moment from 'moment';

const { Search } = Input
const { Header, Content, Footer } = Layout;
const antIcon = <SmileOutlined style={{ fontSize: 240 }} spin/>;
const url = 'https://launchlibrary.net/1.4/launch/next/'
const { RangePicker } = DatePicker;

const limit = 100
const launchCount = 3

const startDate = moment('2001-1-1').format('YYYY-MM-DD')
const endDate = moment().format('YYYY-MM-DD')


let oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+startDate+'&enddate='+endDate+'&limit='+limit+'&fields=name,net,location,status'

function disabledDate(current) {
    // Can not select days before today and today
    return ((current && current > moment().endOf('day')) || (current && current < moment('1961-01-01').endOf('day')))
  }


class LayoutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          launchData: null,
          launchOldData: null,
          launchButtonIsDisabled: false,
          launchButtonInputValue: null,
          launchDateInputValue: null, 
        }

        this.launchButtonOnChange = this.launchButtonOnChange.bind(this)
        this.launchDateButtonOnChange = this.launchDateButtonOnChange.bind(this)
    }
    
    fetchLaunches (url, launchCount) {
        fetch(url+launchCount)
            .then(response => response.json())
            .then(data => this.setState({launchData: data}) )
    }

    fetchOldLaunches (oldurl) {
        fetch(oldurl)
            .then(response => response.json())
            .then(data => this.setState({launchOldData: data}) )
    }

    componentDidMount() {
        this.fetchLaunches(url, launchCount)
        this.fetchOldLaunches(oldurl)
    }

    launchButtonOnChange(e) {
        let {value} = e.target
        value = value.trim()
        let buttonStatus = true

        if (isNormalInteger(value)) {
            buttonStatus = false
        }

        this.setState({launchButtonIsDisabled: buttonStatus})
    }

    launchDateButtonOnChange(date, dateString){
        oldurl = 'https://launchlibrary.net/1.4/launch?startdate='+dateString[0]+'&enddate='+dateString[1]+'&limit='+limit+'&fields=name,net,location,status'
        this.fetchOldLaunches(oldurl)
        // console.log(oldurl);
        
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">menu 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu> */}
                </Header>
                <Content className="content">
                    {/* <ButtonStyledWrapper>
                        <Search
                            placeholder="number of launches(default 3)"
                            enterButton="Загрузить"
                            size="large"
                            onSearch={launchCount => this.fetchLaunches(url, launchCount)}
                            onChange={this.launchButtonOnChange}
                            loading={this.state.launchButtonIsDisabled}
                            allowClear={true}
                        />  
                    </ButtonStyledWrapper> */}
                    <TableOldStyledWrapper>
                        {/* { !this.state.launchData
                            ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                            : <LaunchTable launches={this.state.launchData.launches} />
                        } */}
                    <RangePicker className="datePicker"
                        //  defaultValue={[moment('2014-1-1').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]}
                        // disabled={[false, true]}
                           onChange={this.launchDateButtonOnChange}
                           disabledDate={disabledDate}
                        
                    />
                        { !this.state.launchOldData
                            ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                            : <LaunchOldTable launches={this.state.launchOldData.launches} />
                        }
                    </TableOldStyledWrapper>
                        
                    { !this.state.launchOldData
                        ? <Spin tip="Подождите!" indicator={antIcon} className="spin"/>
                        : <MapChart launches={this.state.launchOldData.launches} />
                    }
                </Content>
                <Footer>Design © 2020</Footer>
            </Layout>
        )
    }
}

export default LayoutContainer