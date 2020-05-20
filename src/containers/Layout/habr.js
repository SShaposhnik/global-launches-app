import React, { Component } from 'react'
import { Layout, Menu, DatePicker } from 'antd'
import OldTable2 from '../LaunchCatalog/component/TableOld2/TableOld2'
import moment from 'moment'

const { Header, Content, Footer } = Layout
const { RangePicker } = DatePicker
let oldurl = 'https://launchlibrary.net/1.4/launch?startdate=' + moment('2020').format('YYYY-MM-DD') + '&enddate=' + moment().format('YYYY-MM-DD') + '&limit=10000&fields=name,net,location,status,rocket,mapURL,countryCode'

class LayoutContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            launchOldData: null,
        }
        this.launchDateButtonOnChange = this.launchDateButtonOnChange.bind(this)
    }

    fetchOldLaunches(oldurl) {
        fetch(oldurl)
            .then(response => response.json())
            .then(data => this.setState({ launchOldData: data }))
    }

    componentDidMount() {
        fetch(oldurl)
            .then(response => response.json())
            .then((data) => { this.setState({ launchOldData: data }) })
    }

    launchDateButtonOnChange(date, dateString) {
        oldurl = 'https://launchlibrary.net/1.4/launch?startdate=' + dateString[0] + '&enddate=' + dateString[1] + '&limit=10000&fields=name,net,location,status,rocket,mapURL,countryCode'
        this.fetchOldLaunches(oldurl)
    }
    render() {
        console.log(this.state.launchOldData)
        
        return (
            <Layout id="layout">
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ textAlign: 'right' }}>
                        <Menu.Item key="1">Статистика</Menu.Item>
                        <Menu.Item key="2">Запуски</Menu.Item>
                    </Menu>
                </Header>

                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <RangePicker
                            onChange={this.launchDateButtonOnChange}
                        />

                        <h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1>
                        {this.state.launchOldData
                            ? <OldTable2 launches={this.state.launchOldData.launches} />
                            : <div>Загрузка ... </div>

                        }
                    </div>
                </Content>
                <Footer className="footer">
                    Design © 2020
                        </Footer>
            </Layout>
        )
    }
}

export default LayoutContainer


// Добрый день! 
// Краткая суть проекта: получаем от сервера список космических запусков и выводим в таблицу <b>OldTable2</b>. Дату запусков можно изменять с помощью <b>RangePicker</b>
// Почему то, при использовании <b>componentDidMount</b> ответ приходит 2 раза. 
// Можно было бы и так оставить, но если вызвать любую функцию(к примеру нужно показать модальное окно если нет запусков за выбранное время, то она сработает 2 раза. 
// Я пробовал при вызове фукнции <b>launchDateButtonOnChange</b> не вызывать <b>fetchOldLaunches</b>, а сразу <b>componentDidMount</b>, но ответ так же приходит 2 раза. Проверил и другие запросы, так же по 2 ответа. 

// <a href="https://launchlibrary.net/1.4/launch?startdate=2020-01-01&enddate=2020-05-20&limit=10000&fields=name,net,location,status,rocket,mapURL,countryCode">Тут можно посмотреть ответ от сервера</a>
// <code lang="javascript">

// import React, { Component } from 'react'
// import { Layout, Menu, DatePicker, Button, Tooltip, Modal , Alert} 
// </code>