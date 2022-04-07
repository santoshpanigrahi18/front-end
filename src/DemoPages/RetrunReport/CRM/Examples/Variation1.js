import React, { Component, Fragment } from "react";

import {
  Row,
  Col,
  Button,
  Nav,
  Container,
  NavItem,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  ButtonGroup,
  CardFooter,
  Table,
  Popover,
  PopoverBody,
} from "reactstrap";
import {
  faAngleUp,
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import {
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";
import FormComboBoxBasic from "./ComboBox";
import axios from "axios";
import HighLineBarCharts from "./LineBarChart";
import { connect } from "react-redux";
import { GET, POST, RETURN_ANLYSIS, RETURN_FILTER } from "../../../../config/constant";
import { httpRequest, useHttpAuto } from "../../../../config/api";
import PageTitleAlt2 from "../../../../Layout/AppMain/PageTitleAlt2";
import FormDateRangePicker from "../../../Forms/Components/DatePicker/Examples/DateRangePicker";
import FormDatePicker6 from "../../../Forms/Components/DatePicker/Examples/example6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormMultiSelectBasic from "../../../Forms/Components/MultiSelect/Examples/ReactSelect";
import Loader from "react-loaders";
import DataTableFixedHeader from "../../../Tables/DataTables/Examples/FixedHeader";
import DoughnutExample from "./DonutChart/doughnut";
import DynamicDoughnutExample from "../../../Charts/ChartJs/Examples/dynamicDoughnut";
import AmMapcharts from "./AmMapcharts/AmMapcharts";
import { setFilterDetails, setRefreshDetails } from "../../../../reducers/UserDatails";


// const data = [
//   { name: "Page A", uv: 4000, pv: 2400, },
//   { name: "Page B", uv: 3000, pv: 1398, },
//   { name: "Page C", uv: 2000, pv: 9800, },
//   { name: "Page D", uv: 2780, pv: 3908, },
//   { name: "Page E", uv: 1890, pv: 4800, },
//   { name: "Page F", uv: 2390, pv: 3800, },
//   { name: "Page G", uv: 3490, pv: 4300, },
// ];

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];
class CRMDashboard1 extends Component {
  constructor(props) {
    super(props);
    const { filterList } = this.props;
    this.state = {
      loadingState: true,
      sum_ib_qty: '0',
      sum_ob_qty: '0',
      returnedRate: '0',
      returns_analysis: [],
      filter_returns_analysis: [],
      selected_months: [],
      region:filterList.region,
      country:filterList.country,
      warehouse:filterList.warehouse,
      sku_number: [],
      filterObj: {
        Region: [
          {
            label: 'ALL',
            value: 'ALL'
          },
         

        ],
        Country: [
          {
            label: 'ALL',
            value: 'ALL'
          }
         
        ],
        Warehouse: [
         {
            label: 'ALL',
            value: 'ALL'
          },
         
        ],
        SKU: [
          {
            label: 'ALL',
            value: 'ALL'
          }
        ]
      },

      sum_ob_qty_bar: [],
      sum_ib_qty_bar: [],
      linePerData: [],
      graphData: [],
      goodSum: 0,
      scrapSum: 0,
      refurbSum: 0,
      defectiveSum: 0,
      repairSum: 0,
      order_month: []
    };
  }
  componentDidMount() {
    this.callReturnsApi();
  }

  callReturnsApi = () => {
    const { filterObj } = this.state;
    let body = { companyid: this.props.filterList.companyId,
      useremail:this.props.userDetails.email, }
    filterObj.SKU.find((item) => item.value != 'ALL') && (body.sku = filterObj.SKU.map((item) => item.value))
    filterObj.Warehouse.find((item) => item.value != 'ALL') && (body.warehouse = filterObj.Warehouse.map((item) => item.value))
    filterObj.Region.find((item) => item.value != 'ALL') && (body.region = filterObj.Region.map((item) => item.value))
    filterObj.Country.find((item) => item.value != 'ALL') && (body.country = filterObj.Country.map((item) => item.value));

    useHttpAuto(RETURN_ANLYSIS, POST, body,this.props.accessToken)
      .then(res => {
        let filterDateData = res.response.sort(function (a, b) {
          return new Date(b.order_month) - new Date(a.order_month);
        }).reverse();
        console.log('print body to be passed in api', this.state.filterObj.SKU.find((item) => item.value != 'ALL'), res.response, body, filterDateData);
        this.props.setRefreshDetails(filterDateData.length>=1 ?filterDateData[0].last_modified_datetime.value:"");
        this.setState({
          returns_analysis: filterDateData,
        }, () => {
          this.calculateFilterData(filterDateData);
        })
      })
      .catch((error) => {
        this.setState({ loadingState: false });
        console.log('print body to be passed in api error', RETURN_ANLYSIS, error,
          body)
      })
  }

  calculateFilterData = (createNewData, notUpdated, skuUpdated) => {
    let monthData = createNewData.map((item) => { return { value: item.order_month, label: item.order_month } })
      .filter((v, i, a) => a.findIndex(t => (t.value === v.value)) === i)

    // coment bellow 3 line and change createNewData to data and remove slice function from everywhere
    // to remove default filter of last 12 months should be selected.

    let defaultMonthPar = notUpdated ? monthData : monthData.length > 8 ? monthData.slice(Math.max(monthData.length - 6, 1)) : monthData;

    let data = createNewData.filter((item1) =>
      defaultMonthPar.find((item) => item.value ==
        item1.order_month)
    );

    let sum_ib_qty = data.map((item) => item.sum_ib_qty).reduce((idSum, item) => idSum + item, 0)
    let sum_ob_qty = data.map((item) => item.sum_ob_qty).reduce((idSum, item) => idSum + item, 0)

    let Sun_Value_ob = defaultMonthPar.map((item) => data.filter((item2) =>
      item2.order_month == item.value)).map((item) => {
        return (item.map((item2) => item2.sum_ob_qty).reduce((idSum, item) => idSum + item, 0))
      })

    let Sun_Value_ib = defaultMonthPar.map((item) => data.filter((item2) =>
      item2.order_month == item.value)).map((item) => {
        return (item.map((item2) => item2.sum_ib_qty).reduce((idSum, item) => idSum + item, 0))
      })

    let linePerData = Sun_Value_ib.map((item, index) => parseFloat((item / Sun_Value_ob[index]) * 100).toFixed(1))

    let goodSum = data.reduce((idSum, item) => idSum + item.GOOD, 0)
    let scrapSum = data.reduce((idSum, item) => idSum + item.SCRAP, 0)
    let refurbSum = data.reduce((idSum, item) => idSum + item.REFURB, 0)
    let defectiveSum = data.reduce((idSum, item) => idSum + item.DEFECTIVE, 0)
    let repairSum = data.reduce((idSum, item) => idSum + item.REPAIR, 0)

    let graphData = data.map((item) => {
      return ({
        title: item.warehouse,
        latitude: item.latitude,
        longitude: item.longitude,
        value: item.sum_ib_qty
      })
    })
    let sku_object = '';
    let sku_number = '';

    if (!skuUpdated) {
      sku_object = data.map((item) => { return { label: item.sku_number, value: item.sku_number } })
      sku_number = [...new Map(sku_object.map(item => [item['label'], item])).values()];
    }

    this.setState({
      filter_returns_analysis: data,
      sku_number: skuUpdated ? this.state.sku_number : sku_number,
      order_month: notUpdated == 'months' ? this.state.order_month : monthData,
      selected_months: defaultMonthPar,
      returnedRate: parseFloat((sum_ib_qty / sum_ob_qty) * 100).toFixed(1),
      sum_ib_qty: sum_ib_qty,
      sum_ob_qty: sum_ob_qty,
      sum_ob_qty_bar: Sun_Value_ob,
      sum_ib_qty_bar:Sun_Value_ib,
      linePerData: linePerData,
      graphData: graphData,
      goodSum,
      scrapSum,
      refurbSum,
      defectiveSum,
      repairSum,
      loadingState: false
    },
    )
  }

  callFilterApi = (label, value) => {
    const {filterObj} = this.state;
    this.setState({loadingState:true})
    if (value.find((item) => item.value != 'ALL')) {
      let body = {
        companyid: this.props.filterList.companyId,
        useremail:this.props.userDetails.email,
        searchparameter: label.toLowerCase(),
        [label.toLowerCase()]: value.map((item) => item.value)
      }
      useHttpAuto(RETURN_FILTER, POST, body,this.props.accessToken)
        .then(res => {
          console.log('print filter api respose',res)
          // label =='SKU'&& this.callReturnsApi()
          label =='Region'&& this.setState({
            country:res.response,
            warehouse:[],
            filterObj:{
              ...filterObj,
              Country:[{
                label: 'ALL',
                value: 'ALL'
              }],
              Warehouse:[{
                label: 'ALL',
                value: 'ALL'
              }],
              SKU: [
                {
                  label: 'ALL',
                  value: 'ALL'
                }
              ]
            }
          },()=>{
            this.callReturnsApi()
          })
          label =='Country'&& this.setState({
            warehouse:res.response,
            filterObj:{
              ...filterObj,
              Warehouse:[{
                label: 'ALL',
                value: 'ALL'
              }],
              SKU: [
                {
                  label: 'ALL',
                  value: 'ALL'
                }
              ]
            }
          },()=>{
            this.callReturnsApi()
          })
          label =='Warehouse'&& this.setState({
            // warehouse:res.response,
            filterObj:{
              ...filterObj,
              SKU: [
                {
                  label: 'ALL',
                  value: 'ALL'
                }
              ]
            }
          },()=>{
            this.callReturnsApi()
          })
        })
        .catch((error) => {
          this.setState({ loadingState: false });
          console.log('print body to be passed in api error', RETURN_FILTER, error,
            body)
        })
    }else{
      this.callReturnsApi();
    }
  }

  selectedCall = (label, value) => {
    console.log("print lable value", label)
    const { filterObj } = this.state;
    if (value.find((item) => item.value == 'ALL' && value.length <= 2)) {
      this.setState({
        filterObj: {
          ...filterObj,
          [label]: value[1].value=='ALL'?value.filter((item) => item.value == 'ALL'): value.filter((item) => item.value !== 'ALL')
        }
      }, () => {
      console.log("asdfasdfsdasdf click",value)
        label !== 'SKU' ? this.callFilterApi(label, value[1].value=='ALL'?value.filter((item) => item.value == 'ALL'): value.filter((item) => item.value !== 'ALL')) : this.skuFilterCall(value);
      })

    } else if (value.find((item) => item.value == 'ALL' && value.length >= 1)) {
      console.log("asdfasdfsdasdf")
      this.setState({
        filterObj: {
          ...filterObj,
          [label]: value.filter((item) => item.value == 'ALL')
        }
      }, () => {
        label !== 'SKU' ? this.callFilterApi(label, value.filter((item) => item.value == 'ALL')) : this.skuFilterCall(value);

      })
    }
    else {
      this.setState({
        filterObj: {
          ...filterObj,
          [label]: value
        }
      }, () => {
        label !== 'SKU' ? this.callFilterApi(label, value) : this.skuFilterCall(value);
      })
    }


  }

  monthFilterCall = (months) => {
    const { returns_analysis
    } = this.state;
    this.setState({
      selected_months: months,
    }, () => {
      let filterDataMonths = returns_analysis.filter((item1) =>
        months.find((item) => item.value ==
          item1.order_month)
      )
      console.log("print filter data months selected", filterDataMonths)

      this.calculateFilterData(filterDataMonths, 'months')
    })
  }

  skuFilterCall = (value) => {
    const { returns_analysis
    } = this.state;

    console.log("print filter data sku selected", value)

    let filterDataSku = returns_analysis.filter((item1) =>
      value.find((item) => item.value ==
        item1.sku_number)
    )
    console.log("print filter data sku selected", value, filterDataSku)

    this.calculateFilterData(filterDataSku, 'months', 'sku')

  }

  refreshFilterCall =()=>{
    const {filterList}=this.props;
    this.setState({
      loadingState:true,
      region:filterList.region,
      country:filterList.country,
      warehouse:filterList.warehouse,
      sku_number: [],
      filterObj: {
        Region: [
          {
            label: 'ALL',
            value: 'ALL'
          },
         

        ],
        Country: [
          {
            label: 'ALL',
            value: 'ALL'
          }
         
        ],
        Warehouse: [
         {
            label: 'ALL',
            value: 'ALL'
          },
         
        ],
        SKU: [
          {
            label: 'ALL',
            value: 'ALL'
          }
        ]
      },

    },()=>{
       this.callReturnsApi()
    })
  }

 


  render() {
    const { sku_number, order_month, selectedRegion, filter_returns_analysis,
      region,country,warehouse,
      refurbSum, goodSum, repairSum, defectiveSum, scrapSum, selected_months, loadingState,
      sum_ob_qty_bar,sum_ib_qty_bar, filterObj, linePerData, sum_ob_qty, sum_ib_qty, returnedRate } = this.state;
    const { colorScheme } = this.props;
    console.log("print filter data", returnedRate);
    return (
      <Fragment>
        {/* <PageTitleAlt2 heading="Returns Analysis Dashboard"
         subheading="Yet another dashboard built using only the included Architech elements and components."
         icon="pe-7s-graph icon-gradient bg-ripe-malin"
         date={'16-03-2022'}/> */}
        <Container fluid>
          <Row>
            {/* <FormMultiSelectBasic/> */}
            <FormComboBoxBasic
              region={region}
              country={country}
              warehouse={warehouse}
              // selectedNetwork={filterList.SKU}
              sku_number={sku_number}
              filterObj={filterObj}
              selected_months={selected_months}
              order_month={order_month}
              refreshFilterCall={()=>this.refreshFilterCall()}
              monthChange={(months) => this.monthFilterCall(months)}
              selectedCall={(label, value) => this.selectedCall(label, value)}
            />
          </Row>
          {loadingState ?
            <Col md={12}>
              <div className=" mb-3 widget-chart" style={{
                display: 'flex', justifyContent: 'center'
                , alignItems: 'center'
              }}>
                <div className="widget-chart-content">
                  <Loader type="line-scale-pulse-out" />
                </div> </div>
            </Col>



            : <div>
              <Row>
                <Col md="4" >
                  <div className="card mb-3 widget-chart dhl-card cardGrow">
                    <div className="widget-chart-content">
                      {/* <CountUp className="widget-numbers" start={0} end={(parseFloat(parseInt(returnedRate)).toFixed(1))} 
                       prefix="" 
                      suffix="%"/> */}
                      <div className={`widget-numbers ${colorScheme=='dark' && 'text-light'}`}>{(parseFloat(returnedRate).toFixed(1))}%</div>

                      <div className={`widget-subheading ${colorScheme=='dark' && 'text-light'}`}>Returned Rate</div>
                      <div className="widget-description text-warning">
                        {/* <span className="pe-1">175.5%</span> */}
                        {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
                      </div>
                    </div>
                    {/* <div className="widget-chart-wrapper">
                      <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                          <Area type="monotoneX" dataKey="uv" stroke="#fd7e14" fill="#ffb87d"/>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div> */}
                  </div>
                </Col>
                <Col md="4">
                  <div className="card mb-3 widget-chart dhl-card cardGrow">
                    <div className="widget-chart-content">

                      {/* <CountUp className="widget-numbers"start={0} end={} separator="" decimals={0}
                        decimal="," suffix="K"/> */}
                      <div className={`widget-numbers ${colorScheme=='dark' && 'text-light'}`}>{
                        new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                          .format(sum_ib_qty)}
                        {/* // parseFloat(sum_ib_qty / 1000).toFixed(1)}
                      // K */}
                      </div>


                      <div className={`widget-subheading ${colorScheme=='dark' && 'text-light'}`}>Returned Units</div>
                      <div className="widget-description text-warning">
                        {/* <span className="pe-1">175.5%</span> */}
                        {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
                      </div>
                    </div>
                    {/* <div className="widget-chart-wrapper">
                      <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                          <Area type="monotoneX" dataKey="uv" stroke="#fd7e14" fill="#ffb87d"/>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div> */}
                  </div>
                </Col>
                <Col md="4">
                  <div className="card mb-3 widget-chart dhl-card cardGrow">
                    <div className="widget-chart-content">

                      {/* <CountUp className="widget-numbers" start={0}
                       end={(sum_ob_qty > 1000 ?
                        `${parseFloat(sum_ob_qty / 1000).toFixed(1)}`
                        : sum_ob_qty)
                      } separator="" decimals={0}
                        decimal="," prefix="" suffix="K"  /> */}
                      <div className={`widget-numbers ${colorScheme=='dark' && 'text-light'}`}>{
                        new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                          .format(sum_ob_qty)
                      }
                        {/* // (sum_ob_qty > 1000 ?
                      //   `${parseFloat(sum_ob_qty / 1000).toFixed(1)}`
                      //   : sum_ob_qty)}
                      //   K */}
                      </div>

                      <div className={`widget-subheading ${colorScheme=='dark' && 'text-light'}`}>Total Units</div>
                      <div className="widget-description text-warning">
                        {/* <span className="pe-1">175.5%</span> */}
                        {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
                      </div>
                    </div>
                    {/* <div className="widget-chart-wrapper">
                      <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                          <Area type="monotoneX" dataKey="uv" stroke="#fd7e14" fill="#ffb87d"/>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div> */}
                  </div>
                </Col>
                {/* <Col md="6" xl="4">
              <div style={{backgroundColor:'#ffcc00'}} className="card mb-3 widget-content bg-night-fade">
                <div className="widget-content-wrapper ">
                  <div className="widget-content-left" >
                    <div className="widget-heading">RETURNED RATE</div>
                    
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers ">
                      <CountUp end={returnedRate} duration="10"  prefix="" suffix="%"/>
                    </div>
                  </div>
                </div>
              </div>
            </Col> */}
                {/* <Col md="6" xl="4">
              <div  style={{backgroundColor:'#ffcc00'}} className="card mb-3 widget-content bg-night-fade">
                <div className="widget-content-wrapper ">
                  <div className="widget-content-left">
                    <div className="widget-heading">RETURNED UNITS</div>
                   
                   
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers ">
                      <CountUp start={0} end={parseFloat(sum_ib_qty / 1000).toFixed(1)} separator="" decimals={0}
                        decimal="," suffix="K" duration="20" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" xl="4">
              <div style={{backgroundColor:"#fc0"}} className="card mb-3 widget-content bg-night-fade">
                <div className="widget-content-wrapper ">
                  <div className="widget-content-left">
                    <div className="widget-heading">Total Units</div>
                   
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers ">
                      <CountUp start={0} end={(sum_ob_qty > 1000 ?
                        `${parseFloat(sum_ob_qty / 1000).toFixed(1)}`
                        : sum_ob_qty)
                      } separator="" decimals={0}
                        decimal="," prefix="" suffix="K" duration="15" />
                    </div>
                  </div>
                </div>
              </div>
            </Col> */}
              </Row>
              <Row>
                {/* <Col lg="4">
              <Card className="main-card mb-3">
                <CardBody>
                 
                  <CardTitle>{returnedRate}%</CardTitle>
                    <CardTitle>Returned Rate</CardTitle>
                    <CardTitle>{parseFloat(sum_ib_qty / 1000).toFixed(1)}K</CardTitle>
                    <CardTitle>Returned Units</CardTitle>
                    <CardTitle> {(sum_ob_qty > 1000 ?
                        `${parseFloat(sum_ob_qty / 1000).toFixed(1)}K`
                        : sum_ob_qty)
                      }</CardTitle>
                    <CardTitle>Total Units</CardTitle> 
                   
                </CardBody>
              </Card>
            </Col> */}

                <Col lg="12">
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle
                      style={{paddingBottom:'10px'}}
                      >Trend of Returned Items</CardTitle>
                      {/* <ResponsiveContainer width="100%" aspect={5.0 / 3.0}> */}
                        <HighLineBarCharts
                          sumOfIbQuantity={sum_ib_qty_bar}
                          order_month={selected_months}
                          sumOfObQuantity={sum_ob_qty_bar}
                          linePerData={linePerData}
                        />
                      {/* </ResponsiveContainer> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Return Destinations</CardTitle>
                      {/* <ResponsiveContainer width="100%" aspect={5.0 / 3.0}> */}
                        <AmMapcharts
                          tableData={filter_returns_analysis}
                          graphData={this.state.graphData}
                        />
                      {/* </ResponsiveContainer> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6">
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Returned Conditions</CardTitle>
                      {/* <ResponsiveContainer width="100%" aspect={5.0 / 3.0}> */}
                        <DoughnutExample
                          goodSum={goodSum}
                          repairSum={repairSum}
                          defectiveSum={defectiveSum}
                          scrapSum={scrapSum}
                          refurbSum={refurbSum}
                        />
                      {/* </ResponsiveContainer> */}

                      {/* <HighPei
                goodSum={goodSum}
                repairSum={repairSum}
                defectiveSum={defectiveSum}
                scrapSum={scrapSum}
                refurbSum={refurbSum} /> */}
                      {/* <ResponsiveContainer width="100%" aspect={5.0 / 3.0}>
                  </ResponsiveContainer> */}
                    </CardBody>
                  </Card>
                </Col>

              </Row>
              <DataTableFixedHeader
                tableData={filter_returns_analysis}
              />
            </div>}

          {/* <Row>
            <Col lg="4">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Composed Charts</CardTitle>
                  <ResponsiveContainer width="100%" aspect={2.7 / 3.0}>
                    <ComposedChart data={data}>
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />

                      <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                      <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </Col>
            <Col lg="8">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Composed Charts</CardTitle>
                  <ResponsiveContainer width="100%" aspect={6.0 / 3.0}>
                    <ComposedChart data={data}>
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="100%"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="rgb(252, 186, 3)" />
                          <stop offset=".5" stopColor="yellow"
                            style={{ stopColor: "rgb(252, 186, 3)", stopOpacity: 0.2 }} />
                          <stop offset="1" stopColor="black" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="pv"
                        barSize={25}
                        fill="url(#colorUv)"
                        stackId="1"
                      />
                      <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </Col>
          </Row> */}


        </Container>
      </Fragment >
    );
  }
}
const mapStateToProps = (state) => ({
  filterList: state.UserDatails.filterList,
  accessToken:state.UserDatails.accessToken,
  userDetails: state.UserDatails.userDetails,
  colorScheme: state.ThemeOptions.colorScheme


});

const mapDispatchToProps = (dispatch) => ({
  setFilterDetails: (data) => dispatch(setFilterDetails(data)),
  setRefreshDetails: (data) => dispatch(setRefreshDetails(data)),
  
});
export default connect(mapStateToProps, mapDispatchToProps)(CRMDashboard1);
