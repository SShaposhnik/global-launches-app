<Content style={{ padding: '0 50px' }} >
<div className="site-layout-content" >

  <Divider><h1 style={{ textAlign: 'center' }}>Обьявленные запуски</h1></Divider>
  <LaunchTable launches={launchData.launches} />

  <Divider className="next-launch-table"><h1 style={{ textAlign: 'center' }}>Запланированные запуски</h1></Divider>
  <NextLaunchTable launches={NextlaunchData.launches} />

  <RangePicker className="RangePicker"
    defaultValue={[moment(THIS_YEAR), moment()]}
    showToday={false, true}
    onChange={this.launchDateButtonOnChange}
    disabledDate={disabledDate}
    allowClear={false}
    style={{ margin: 10 }}
  />
  <Divider><h1 style={{ textAlign: 'center' }}>Состоявшиеся запуски</h1></Divider>
  <OldTable2 launches={launchOldData.launches} loading={loading} />

  <Button onClick={this.timeBeforeToShowMarkers} > ТЫК </Button>
  <Tooltip title={<p > Здесь можно настроить период запусков </p>}
    mouseEnterDelay={0.2}
    mouseLeaveDelay={0.5}
    placement="top" >
    <InfoCircleOutlined />
  </Tooltip>
  <MapChart launches={this.state.test} />
</div>

</Content>