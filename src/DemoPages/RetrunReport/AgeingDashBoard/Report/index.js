import React, { Component, Fragment } from "react";

import {
    Row,
    Col,
    Container,
} from "reactstrap";

import { connect } from "react-redux";
import Loader from "react-loaders";
import HighBarChart from './HighBarChart';
import HighLineChart from './HighLineChart';
import HighScatterChart from './HighScatterChart';
import HighTableChart from './HighTableChart';
import SKUTable from './SKUTable';
import { setFilterDetails, setRefreshDetails } from "../../../../reducers/UserDatails";
import ComboBox from "./ComboBox";
import WarehouseTable from "./WarehouseTable";
import { INVENTORY_AGEING, INVENTORY_AGEING_ASSOCIATE_COST, INVENTORY_AGEING_AVG, INVENTORY_AGEING_AVG_AGE, INVENTORY_AGEING_TREND, INVENTORY_FILTER, POST } from "../../../../config/constant";
import { httpRequest, useHttpAuto } from "../../../../config/api";
var searchCounter = 1
class Report extends Component {
    constructor(props) {
        super(props);
        const { filterList } = this.props;
    
        this.state = {
            loadingState: true,
            locations: this.props.filterList[this.props.userDetails.access_scope.toLowerCase()],
            inventoryAgeDay: 0,

            activeStock: {
                value: 0,
                m3: 0
            },
            ageingStock: {
                value: 0,
                m3: 0
            },
            deadStock: {
                value: 0,
                m3: 0
            },
            deadStockMonth:12,
            skuNumbers: [],
            inventory_ageing: [],
            inventory_ageing_avg: [],
            inventory_ageing_avg_cost: [],
            inventory_ageing_trend: [],
            filter_inventory_ageing: [],
            filter_inventory_ageing_avg: [],
            ageBand: [],
            ageBand_1: [],
            selectedFilter: {
                Scope: [...[this.props.filterList.scope[0]],],
                Location: [{
                    label: 'ALL',
                    value: 'ALL'
                }],
                SKU: [{
                    label: 'ALL',
                    value: 'ALL'
                }]
            }

        };
    }
    componentDidMount() {
        this.fetchAsyncData();
    }
    fetchAsyncData = async () => {
        const countBefore = ++searchCounter
        const { selectedFilter,deadStockMonth } = this.state;
        this.setState({ loadingState: true });
        let body = {
            companyid: this.props.filterList.companyId,
            useremail: this.props.userDetails.email,
        }
        body.scope = selectedFilter.Scope.map((item) => item.value)
        body.deadStockDefination = deadStockMonth
        try {
            const res = await Promise.all([
                httpRequest(INVENTORY_AGEING, POST, body, this.props.accessToken),
                httpRequest(INVENTORY_AGEING_AVG, POST, {...body,...{is_latest_snapshot:1}}, this.props.accessToken),
                httpRequest(INVENTORY_AGEING_AVG_AGE, POST, body, this.props.accessToken),
                httpRequest(INVENTORY_AGEING_ASSOCIATE_COST, POST, body, this.props.accessToken),
                httpRequest(INVENTORY_AGEING_TREND, POST, body, this.props.accessToken),
             ]);
            // const data = await Promise.all(res.map(r => r.json()))
            if (countBefore !== searchCounter) {
                return
              }
            this.setState({
                    inventory_ageing: res[0].response,
                    inventory_ageing_avg:res[1].response,
                    loadingState: false
                }, () => {
                    this.calculateFilterData(res[0].response,res[1].response,res[2].response,res[3].response,res[4].response);
                })
            console.log("print response value",res,body, {...body,...{is_latest_snapshot:1}});
          }
           catch {
            // throw Error("Promise failed");
            this.setState({ loadingState: false });
            console.log("print try failed error");
          }
      };

    // callReturnsApi = () => {
    //     const { selectedFilter } = this.state;
    //     this.setState({ loadingState: true });
    //     let body = {
    //         companyid: this.props.filterList.companyId,
    //         useremail: this.props.userDetails.email,
    //     }
    //     body.scope = selectedFilter.Scope.map((item) => item.value)
    //     body.deadStockDefination = 12

    //     useHttpAuto(INVENTORY_AGEING, POST, body, this.props.accessToken)
    //         .then(res => {
    //             // console.log('print body to be passed in api', res.response, body,
    //             //     selectedFilter.Scope);
    //             // this.setState({
    //             //     inventory_ageing: res.response,
    //             //     loadingState: false
    //             // }, () => {
    //             //     this.calculateFilterData(res.response);
    //             // })
    //         })
    //         .catch((error) => {
    //             this.setState({ loadingState: false });
    //             console.log('print body to be passed in api error', INVENTORY_AGEING, error,
    //                 body)
    //         })
    // }
    // callReturnsApiAvg = () => {
    //     const { selectedFilter } = this.state;
    //     this.setState({ loadingState: true });
    //     let body = {
    //         companyid: this.props.filterList.companyId,
    //         useremail: this.props.userDetails.email,
    //     }
    //     body.scope = selectedFilter.Scope.map((item) => item.value)
    //     body.deadStockDefination = 12

    //     useHttpAuto(INVENTORY_AGEING_AVG, POST, body, this.props.accessToken)
    //         .then(res => {
    //             // console.log('print body to be passed in api', res.response, body,
    //             //     selectedFilter.Scope);
    //             // this.setState({
    //             //     inventory_ageing_avg: res.response,
    //             //     loadingState: false
    //             // }, () => {
    //             //     // this.calculateFilterData(res.response);
    //             // })
    //         })
    //         .catch((error) => {
    //             this.setState({ loadingState: false });
    //             console.log('print body to be passed in api error', INVENTORY_AGEING, error,
    //                 body)
    //         })
    // }

    calculateFilterData = (data,dataAvg,dataAvgAge,dataCost,dataTrend) => {

        let data120 = data.filter((item) => item.age_band == '>120 Days');
        let dataLess120 = data.filter((item) => item.age_id <= 4);
        let dataDeadStock = data.filter((item) => item.age_band == "Dead Stock");
        let avaAge = parseFloat(dataAvgAge[0].Age).toFixed(1)
        let activeStock = {
            value: dataLess120.reduce((idSum, item) => idSum + item.total_quantity, 0),
            m3: dataLess120.reduce((idSum, item) => idSum + parseFloat(item.total_volume == null ? 0 : item.total_volume), 0),
        }
        let ageingStock =
        {
            value: data120.reduce((idSum, item) => idSum + item.total_quantity, 0),
            m3: data120.reduce((idSum, item) => idSum + parseFloat(item.total_volume == null ? 0 : item.total_volume), 0),
        }
        let deadStock =
        {
            value: dataDeadStock.reduce((idSum, item) => idSum + item.total_quantity, 0),
            m3: dataDeadStock.reduce((idSum, item) => idSum + parseFloat(item.total_volume == null ? 0 : item.total_volume), 0),
        }

        let ageBand = [...new Map(dataAvg.map(item => [item['age_id'], item])).values()];
        let ageBand1 = [...new Map(data.map(item => [item['age_id'], item])).values()];
   
        let totalQunatity = ageBand.map((item) => {
            let sum = 0;
            dataAvg.map((item2) => {
                if (item.age_id == item2.age_id) {
                    sum = sum + item2.order_qty;
                }
            })
            return {
                ...item,
                y: sum
            }
        })
        let totalQunatity1 = ageBand1.map((item) => {
            let sum = 0;
            data.map((item2) => {
                if (item.age_id == item2.age_id) {
                    sum = sum + item2.total_quantity;
                }
            })
            return {
                ...item,
                y: sum
            }
        })

        console.log("total quantity value of bar", totalQunatity);

        this.setState({
            inventoryAgeDay: avaAge,
            inventory_ageing_avg_cost:dataCost,
            inventory_ageing_trend:dataTrend,
            filter_inventory_ageing_avg:dataAvg,
            filter_inventory_ageing: data,
            activeStock,
            ageingStock,
            deadStock,
            ageBand: totalQunatity.sort((a, b) => a.age_id - b.age_id),
            ageBand_1:totalQunatity1.sort((a, b) => a.age_id - b.age_id)
        })

    }

    callFilterApi = (label, value) => {
        const { selectedFilter } = this.state;
        this.setState({ loadingState: true })
        let body = {
            companyid: this.props.filterList.companyId,
            useremail: this.props.userDetails.email,
            searchparameter: label.toLowerCase(),
            [label.toLowerCase()]: label == 'Scope' ? value : value.map((item) => item.value)
        }
        label == 'Location' && (body.scope = selectedFilter.Scope)
        useHttpAuto(INVENTORY_FILTER, POST, body, this.props.accessToken)
            .then(res => {
                console.log('print filter api respose', res, body)
                label == 'Scope' && this.setState({
                    locations: res.response,
                    selectedFilter: {
                        ...selectedFilter,
                        Location: [{
                            label: 'ALL',
                            value: 'ALL'
                        }],
                        SKU: [{
                            label: 'ALL',
                            value: 'ALL'
                        }]
                    }
                }, () => {
                    // this.callReturnsApi()
                })
                label == 'Location' && this.setState({
                    skuNumbers: res.response,
                    selectedFilter: {
                        ...selectedFilter,
                        SKU: [{
                            label: 'ALL',
                            value: 'ALL'
                        }]
                    }
                }, () => {
                    // this.callReturnsApi()
                })
                this.setState({ loadingState: false });


            })
            .catch((error) => {
                this.setState({ loadingState: false });
                console.log('print body to be passed in api error',
                    INVENTORY_FILTER, error,
                    body)
            })
    }
    skuFilterCall = (value) => {

    }

    callDeadStockFun = (value) =>{
        this.setState({deadStockMonth:value},()=>{
            this.fetchAsyncData();
        })
    }

    callFilterFun = (label, value) => {
        const { selectedFilter } = this.state;
        console.log("print clicked function", label, value);
        if (label == 'Scope') {
            this.setState({
                selectedFilter: {
                    ...selectedFilter,
                    [label]: value
                }
            }, () => {
                this.callFilterApi(label, value.value);
            })
        } else {
            if (value.find((item) => item.value == 'ALL' && value.length <= 2)) {
                this.setState({
                    selectedFilter: {
                        ...selectedFilter,
                        [label]: value[1].value == 'ALL' ? value.filter((item) => item.value == 'ALL') : value.filter((item) => item.value !== 'ALL')
                    }
                }, () => {

                    label !== 'SKU' ?
                        this.callFilterApi(label, value[1].value == 'ALL' ? value.filter((item) => item.value == 'ALL') : value.filter((item) => item.value !== 'ALL')) :
                        this.skuFilterCall(value);
                })

            } else if (value.find((item) => item.value == 'ALL' && value.length >= 1)) {

                this.setState({
                    selectedFilter: {
                        ...selectedFilter,
                        [label]: value.filter((item) => item.value == 'ALL')
                    }
                }, () => {
                    label !== 'SKU' ? this.callFilterApi(label, value.filter((item) => item.value == 'ALL')) : this.skuFilterCall(value);

                })
            }
            else {
                this.setState({
                    selectedFilter: {
                        ...selectedFilter,
                        [label]: value
                    }
                }, () => {
                    label !== 'SKU' ? this.callFilterApi(label, value) : this.skuFilterCall(value);
                })
            }
        }

    }

    render() {
        const { inventory_ageing_trend, inventory_ageing_avg_cost, ageBand,filter_inventory_ageing_avg,
            region, deadStockMonth, warehouse, inventoryAgeDay, filter_inventory_ageing,
            selected_months, loadingState, activeStock, ageingStock, deadStock,
            filterObj, skuNumbers, locations, selectedFilter,ageBand_1 } = this.state;
        const { filterList, colorScheme } = this.props;
        console.log("print filter data", selectedFilter, filterList, locations);
        return (
            <Fragment>
                <Container fluid>
                    <Row>
                        <ComboBox
                            scope={filterList.scope}
                            location={locations}
                            skuNumbers={skuNumbers}
                            selectedFilter={selectedFilter}
                            deadStockMonth={deadStockMonth}
                            callDeadStockFun={(value)=>this.callDeadStockFun(value)}
                            selectedLocation={[]}
                            selected_months={[]}
                            order_month={[]}
                            refreshFilterCall={() => { }}
                            monthChange={(months) => { }}
                            selectedCall={(label, value) => this.callFilterFun(label, value)}
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
                                <Col md="3">
                                    <div className="card mb-3 widget-chart dhl-card cardGrow">
                                        <div className="widget-chart-content">
                                            <Row style={{
                                                alignItems: "center",
                                                justifyContent: 'center'
                                            }}>
                                                 <div class={`title_box title_box-${colorScheme}`}>
                                                    <h1 className="widget-numbers" >{inventoryAgeDay} 
                                                      <span style={{fontSize:'14px',fontWeight:'300'}}>Days</span></h1>
                                                </div>
                                            </Row>

                                            <div className={`widget-subheading ${colorScheme=='dark'?'text-light':'ztext-dark'}`}>Avg. Inventory Age</div>
                                            <div className="widget-description text-warning">

                                            </div>
                                        </div>

                                    </div>
                                </Col>
                                <Col md="3">
                                    <div className="card mb-3 widget-chart dhl-card cardGrow">
                                        <div className="widget-chart-content">

                                            <Row style={{
                                                alignItems: "center",
                                                justifyContent: 'center'
                                            }}>
                                                 <div class={`title_box title_box-${colorScheme}`}>
                                                    <h1  className="widget-numbers" >{new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                                                        .format(activeStock.value)} <span style={{fontSize:'14px',fontWeight:'300'}}>{`(${parseFloat(activeStock.m3).toFixed(1)} m3)`}</span></h1>
                                                </div>
                                                {/* <Col style={{
                                                    textAlign: 'right'
                                                }}>
                                                    <div className="widget-numbers">{new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                                                        .format(activeStock.value)}</div></Col>
                                                <Col style={{
                                                    textAlign: 'left', padding: 0
                                                }} className="mt-3"
                                                >
                                                    <div className="widget-subheading"
                                                    >{`(${parseFloat(activeStock.m3).toFixed(1)} m3)`}</div>
                                                </Col> */}
                                            </Row>



                                            <div className={`widget-subheading ${colorScheme=='dark'?'text-light':'ztext-dark'}`}>Active Stock</div>
                                            <div className="widget-description text-warning">

                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="3">
                                    <div className="card mb-3 widget-chart dhl-card cardGrow">
                                        <div className="widget-chart-content">
                                            <Row style={{
                                                alignItems: "center",
                                                justifyContent: 'center'
                                            }}>
                                                 <div class={`title_box title_box-${colorScheme}`}>
                                                    <h1  className="widget-numbers" >{new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                                                        .format(ageingStock.value)} <span style={{fontSize:'14px',fontWeight:'300'}}>{`(${parseFloat(ageingStock.m3).toFixed(1)} m3)`}</span></h1>
                                                </div>
                                                {/* <Col style={{
                                                    textAlign: 'right'
                                                }}>
                                                    <div className="widget-numbers">{new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                                                        .format(ageingStock.value)}</div></Col>
                                                <Col style={{
                                                    textAlign: 'left', padding: 0
                                                }} className="mt-3"
                                                >
                                                    <div className="widget-subheading"
                                                    >{`(${parseFloat(ageingStock.m3).toFixed(1)} m3)`}</div>
                                                </Col> */}
                                            </Row>

                                            <div className={`widget-subheading ${colorScheme=='dark'?'text-light':'ztext-dark'}`}>Aging Stock</div>
                                            <div className="widget-description text-warning">

                                            </div>
                                        </div>

                                    </div>
                                </Col>
                                <Col md="3">
                                    <div className="card mb-3 widget-chart dhl-card cardGrow">
                                        <div className="widget-chart-content">
                                            <Row style={{
                                                alignItems: "center",
                                                justifyContent: 'center'
                                            }}>
                                                  <div class={`title_box title_box-${colorScheme}`}>
                                                    <h1  className="widget-numbers" >{new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                                                        .format(deadStock.value)} <span style={{fontSize:'14px',fontWeight:'300'}}>{`(${parseFloat(deadStock.m3).toFixed(1)} m3)`}</span></h1>
                                                </div>
                                                
                                                 
                                                {/* <Col style={{
                                                    textAlign: 'right'
                                                }}>
                                                    <div className="widget-numbers">{new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                                                        .format(deadStock.value)}</div></Col>
                                                <Col style={{
                                                    textAlign: 'left', padding: 0
                                                }} className="mt-3"
                                                >
                                                    <div className="widget-subheading"
                                                    >{`(${parseFloat(deadStock.m3).toFixed(1)} m3)`}</div>
                                                </Col> */}
                                            </Row>

                                            <div className={`widget-subheading ${colorScheme=='dark'?'text-light':'ztext-dark'}`}>Dead Stock</div>
                                            <div className="widget-description text-warning">

                                            </div>
                                        </div>

                                    </div>
                                </Col>

                            </Row>
                            <Row>
                                <Col md="6">
                                    <HighBarChart
                                        data={filter_inventory_ageing}
                                        ageBand={ageBand_1}
                                    />
                                </Col>
                                <Col md="6">
                                    <HighLineChart
                                        data={filter_inventory_ageing}
                                        trendData={inventory_ageing_trend} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <HighTableChart
                                        
                                        costData={inventory_ageing_avg_cost}
                                       
                                         />

                                </Col>
                                <Col md="6">
                                    <HighScatterChart
                                        data={filter_inventory_ageing}
                                    />

                                </Col>
                            </Row>
                            <WarehouseTable
                                data={filter_inventory_ageing}
                                ageBand={ageBand} />
                            <SKUTable
                            data={filter_inventory_ageing_avg}
                            />
                        </div>}


                </Container>
            </Fragment >
        );
    }
}
const mapStateToProps = (state) => ({
    filterList: state.UserDatails.filterList,
    accessToken: state.UserDatails.accessToken,
    userDetails: state.UserDatails.userDetails,
    colorScheme: state.ThemeOptions.colorScheme

});

const mapDispatchToProps = (dispatch) => ({
    setFilterDetails: (data) => dispatch(setFilterDetails(data)),
    setRefreshDetails: (data) => dispatch(setRefreshDetails(data)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Report);
