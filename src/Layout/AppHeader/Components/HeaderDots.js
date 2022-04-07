import React, { Fragment } from "react";

import {
  IoIosGrid,
  IoIosAnalytics,
  IoIosInformationCircleOutline
} from "react-icons/io";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  DropdownItem,
} from "reactstrap";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

import { faArrowLeft, faCog } from "@fortawesome/free-solid-svg-icons";

import CountUp from "react-countup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import bg4 from "../../../assets/utils/images/dropdown-header/abstract4.jpg";
import city2 from "../../../assets/utils/images/dropdown-header/city2.jpg";

import Flag from "react-flagkit";
import { connect } from "react-redux";
import Moment from "moment";

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

class HeaderDots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  render() {
    const {pageName,colorScheme} = this.props;
    return (
      <Fragment>
        <div className={`header-dots ${colorScheme=='dark'&&'text-white'}`}>
        {pageName=="#/returnReport/returnsanalysis"&&this.props.lastDate !== '' && <div className="refreshText" style={{}}>
             <Col >
               Last Refresh
             </Col>
             <Col style={{fontWeight:'bold'}}>
              ({Moment(this.props.lastDate).format('YYYY-MM-DD')})
             </Col>
          
         </div>}
          <UncontrolledDropdown>
            <DropdownToggle className="p-0" color="link">
              <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                {/* <div className="icon-wrapper-bg bg-primary" /> */}
                <IoIosInformationCircleOutline color={colorScheme=='dark'?"white":"#d40511"} fontSize="33px" />
              </div>
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-xl rm-pointers">
              <div className="dropdown-menu-header" style={{marginBottom:-9.8}}>
                <div className="dropdown-menu-header-inner ">
                  <div className="menu-header-image"
                    style={{
                      backgroundColor:'white'
                      // backgroundImage: "url(" + bg4 + ")",
                    }}/>
                 { pageName=="#/returnReport/returnsanalysis"&&<div 
                 className="menu-header-content text-white"
                 style={{
                  overflow:'auto',height:'50vh'
                }}>
                    <h5 className="menu-header-title" style={{color:'#000'}}>How to use the Returns Overview dashboard</h5> 
                    <h6 className="menu-header-subtitle" style={{color:'#000'}}>
                   
                      
                      The Returns dashboard provides an overview of a company's returned orders in order to understand more about the source and impact of these orders.<br></br><br></br>
                      An order is classified as a return order if the inbound order source is tagged as "Field Return" or "Advanced Swap.<br></br><br></br>
                      The return trend chart defaults to the past 12-months of Returns quantity received and the % relative to the overall outbound orders.<br></br>
                      The geo map scatterplot allows users to identify where their returns are coming from, along with the quantity of returns as indicated by the size of the bubbles.<br></br>
                      The pie chart shows the returned conditions.<br></br>
                      The table shows the SKU and quantity of returns, sorted in descending order, with the SKU with the highest returns at the top.

                    </h6>
                  </div>}
                  { pageName=="#/returnReport/inventoryageing"&&
                  <div className="menu-header-content text-white"
                  style={{
                    overflow:'auto',height:'50vh'
                  }}>
                    <h5 className="menu-header-title" style={{color:'#000'}}>How to use this Inventory Ageing Report</h5> 
                    <h6 className="menu-header-subtitle" style={{color:'#000'}}>
                   
<p>The Inventory Ageing dashboard provides an overview of a company's inventory health, with a focus on ageing and dead stock inventory. It aims to optimize inventory health to reduce ageing / dead stocks and thus play a pivotal role in inventory planning.</p>

<p>It helps companies achieve the following goals:</p>

<ul>
    <li>identify slow / non-moving SKUs</li>
    <li>track inventory age and movement across time</li>
    <li>determine warehouse maintenance / storage costs</li>
    <li>plan warehouse stocking and management</li>
</ul>

<p>
    Key Terms:
    <ul>
        <li>Age (per SKU) = dashboard refresh date - max ( first introduced date, latest outbound date, 
            goods received date)</li>
        <li>{`Active Stock = SKUs with Age <= 120 days`}</li>
        <li>{`Ageing Stock = SKUs with Age >120 days and < X days, where X is defined by the dead stock slider`}</li>
        <li>{` Dead Stock = SKUs with Age >= X days (hence are not expected to sell), where X is 
            defined by the dead stock slider`}</li>
    </ul>

    Users have the flexibility to define how they want their Dead Stock to be classified using the slider.

 <br/><b>E.g.</b> {`if 12 is selected, then SKUs with Age > 12 months will be classified as Dead Stock.`}
 
</p> 


<p>
    Chart Breakdown:
    <ul>
        <li>Age of Inventory Summary bar chart - displays the quantity of stocks (y-axis) 
            for each age band (x-axis)</li>
        <li>{`Trend of Ageing & Dead Stock line chart - aggregates quantity (y-axis) 
            of ageing & dead stocks over each month (x-axis). Users can also view the trend 
            for other age bands by selecting from the drop-down list.`}</li>
        <li>{`Ageing & Dead Stock Associated Costs table - displays the associated 
            costs to hold inventory by looking at Average Inventory Age, Volume, Value, and Quantity.`}</li>
        <li>{`Ageing & Dead Stock SKUs scatterplot - displays the percentage of quantity 
            (x-axis) and value (y-axis) each ageing / dead stock SKU occupies in the warehouses. 
            Each dot represents an SKU and the color of the dot represents the respective warehouse.`}</li>
    </ul>
</p>


                    </h6>
                  </div>}
                </div>
              </div>
              {/* <div className="grid-menu grid-menu-xl grid-menu-3col">
                <Row className="g-0s">
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">  {" "} </i>
                      Automation
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-piggy icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">
                        {" "}
                      </i>
                      Reports
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-config icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> {" "} </i>
                      Settings
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-browser icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> {" "} </i>
                      Content
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-hourglass icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> {" "} </i>
                      Activity
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> {" "} </i>
                      Contacts
                    </Button>
                  </Col>
                </Row>
              </div> */}
              {/* <Nav vertical>
                <NavItem className="nav-item-divider" />
                <NavItem className="nav-item-btn text-center">
                  <Button size="sm" className="btn-shadow" color="primary">
                    Follow-ups
                  </Button>
                </NavItem>
              </Nav> */}
            </DropdownMenu>
          </UncontrolledDropdown>
          
          <UncontrolledDropdown>
            <DropdownToggle className="p-0" color="link">
              <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                {/* <div className="icon-wrapper-bg bg-success" /> */}
                {/* <IoIosAnalytics color="#3ac47d" fontSize="23px" />
                 */}
                 <i style={{fontSize:'30px'}} class={`dot-btn-icon lnr-bullhorn   dhl-icon-color-${colorScheme}`}></i>
              </div>
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-xl rm-pointers">
              {/* <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-premium-dark">
                  <div className="menu-header-image"
                    style={{
                      backgroundImage: "url(" + bg4 + ")",
                    }}/>
                  <div className="menu-header-content text-white">
                    <h5 className="menu-header-title">Users Online</h5>
                    <h6 className="menu-header-subtitle">
                      Recent Account Activity Overview
                    </h6>
                  </div>
                </div>
              </div> */}
              {/* <div className="widget-chart">
                <div className="widget-chart-content">
                  <div className="icon-wrapper rounded-circle">
                    <div className="icon-wrapper-bg opacity-9 bg-focus" />
                    <i className="lnr-users text-white" />
                  </div>
                  <div className="widget-numbers">
                    <CountUp start={0} end={344} separator="" decimals={0} decimal=","
                      prefix="" useEasing={false} suffix= "k" duration="15"/>
                  </div>
                  <div className="widget-subheading pt-2">
                    Profile views since last login
                  </div>
                  <div className="widget-description text-danger">
                    <span className="pe-1">
                      <CountUp start={0} end={176} separator="," delay={2} decimals={0} decimal=","
                        useEasing={false} prefix="" suffix="%" duration="10"/>
                    </span>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>
                </div>
                <div className="widget-chart-wrapper">
                  <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <Area type="monotoneX" dataKey="uv" stroke="#f7b924" fill="#f7b924" fillOpacity=".5"/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div> */}
              {/* <Nav vertical>
                <NavItem className="nav-item-divider mt-0"> </NavItem>
                <NavItem className="nav-item-btn text-center">
                  <Button size="sm" className="btn-shine btn-wide btn-pill" color="warning">
                    <FontAwesomeIcon className="me-2" icon={faCog} spin fixedWidth={false}/>
                    Refresh List
                  </Button>
                </NavItem>
              </Nav> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  lastDate: state.UserDatails.lastDate,
  pageName: state.UserDatails.pageName,
  colorScheme: state.ThemeOptions.colorScheme

});

const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(HeaderDots);

