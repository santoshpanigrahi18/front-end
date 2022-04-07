import React, { Fragment } from "react";
import { createBrowserHistory } from 'history'
import DarkModeToggle from "react-dark-mode-toggle";
import PerfectScrollbar from "react-perfect-scrollbar";
// import {createHashHistory}  from"history";
import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";
import Switch from "react-switch";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'react-toastify/dist/ReactToastify.css';

import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import { connect } from "react-redux";
import { setColorScheme } from "../../../reducers/ThemeOptions";
import { clearUserDetails } from "../../../reducers/UserDatails";

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

 

  notify2 = () =>
  (this.toastId = toast(
    "You don't have any new items in your calendar for today! Go out and play!",
    {
      transition: Bounce,
      closeButton: true,
      autoClose: 5000,
      position: "bottom-center",
      type: "success",
    }
  ));

  logoutCall=()=>{
    // let history=createBrowserHistory();
    this.props.clearUserDetails("clear");
    this.props.props.props.history.replace("/");
  }

  render() {
    let {
      setColorScheme,
      colorScheme,userDetails,
      
    } = this.props;
    return (
      <Fragment>
        <div className="pe-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-0">
                  <i class={`pe-7s-user dhl-icon-color-${colorScheme}`} style={{fontSize:'33px',marginLeft:'5px'}}> </i>
                    {/* <img width={42} className="rounded-circle" src={avatar1} alt="" /> */}
                    <FontAwesomeIcon
                      className={`ms-2 opacity-8 mb-2 dhl-icon-color-${colorScheme}`}
                      icon={faAngleDown}
                    />
                  </DropdownToggle>
                  <DropdownMenu end className="rm-pointers dropdown-menu-lg">
                    <div className="dropdown-menu-header">
                      <div className="dropdown-menu-header-inner bg-info">
                        <div className="menu-header-image opacity-2"
                          style={{
                            backgroundImage: "url(" + city3 + ")",
                          }} />
                        <div className="menu-header-content text-start">
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left me-3">
                                <img width={42} className="rounded-circle" src={avatar1} alt="" />
                              </div>
                              <div className="widget-content-left">
                                <div className="widget-heading">
                                  {`${userDetails.firstName!=undefined&& (userDetails.firstName).charAt(0).toUpperCase() + (userDetails.firstName).substr(1).toLowerCase()} ${userDetails.lastName!=undefined&&(userDetails.lastName).charAt(0).toUpperCase() + (userDetails.lastName).substr(1).toLowerCase()}` }
                                </div>
                                {/* <div className="widget-subheading opacity-8">
                                  Software Developer
                                </div> */}
                              </div>
                              <div className="widget-content-right me-2">
                                <Button className="btn-pill btn-shadow btn-shine" color="focus"
                                  onClick={()=>this.logoutCall()}
                                >
                                  Logout
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="scroll-area-xs"
                      style={{
                        height: "60px",
                      }}>
                      <PerfectScrollbar>
                        <Nav vertical>
                        
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <NavItem style={{paddingLeft:'5px'}}>
                             {`Change to ${colorScheme} theme`}
                            </NavItem>
                          </div>
                          
                          <div className="widget-content-right me-3">
                              {/* <Switch checked={colorScheme=='white'?true:false}
   onChange={()=>setColorScheme(colorScheme=='white'?'gray':'white')}
                         onColor="#666666"
                          onHandleColor="#000000"
                           handleDiameter={25}
                            uncheckedIcon={false} 
                            checkedIcon={false}
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" 
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                          height={20} width={45}
                           className="me-2 mb-2" id="material-switch"/> */}
                            <DarkModeToggle
                              onChange={() => setColorScheme(colorScheme == 'light' ? 'dark' : 'light')}
                              checked={colorScheme == 'light' ? true : false} //isDarkMode
                              size={50}
                            />
                          </div>
                          </div>

                          {/* <NavItem>
                            <NavLink href="#">
                              Setting

                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href="#">
                              Help

                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href="#">Recover Password</NavLink>
                          </NavItem> */}

                        </Nav>
                      </PerfectScrollbar>
                    </div>


                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>

              {/* 
              <div className="widget-content-right header-user-info ms-3">
                <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info" id="Tooltip-1">
                  <IoIosCalendar color="#ffffff" fontSize="20px" />
                </Button>
                <UncontrolledTooltip placement="bottom" target={"Tooltip-1"}>
                  Click for Toastify Notifications!
                </UncontrolledTooltip>
              </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme,
  userDetails: state.UserDatails.userDetails
});

const mapDispatchToProps = (dispatch) => (
  console.log("passed data have used"),{
  setColorScheme: color => dispatch(setColorScheme(color)),
  clearUserDetails:(data)=>  dispatch(clearUserDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
