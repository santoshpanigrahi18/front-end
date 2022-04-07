import React, { Fragment } from "react";
import bg4 from "../../../assets/utils/images/dropdown-header/city5.jpg";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faComments,
} from '@fortawesome/free-solid-svg-icons'

import {

  Button,

  Col,

  DropdownMenu,

  DropdownToggle,

  UncontrolledDropdown,

  UncontrolledTooltip,
} from "reactstrap";

import { connect } from "react-redux";
import Row from "../../../DemoPages/Components/GuidedTours/Examples/Row";

class HeaderChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <Fragment>
        <div className="header-dots">

        <UncontrolledDropdown  id="TooltipDemo" >
            <DropdownToggle className="p-0 me-2" color="link">
              <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                <div className="icon-wrapper-bg bg-primary" />
                <FontAwesomeIcon icon={faComments}   color="#3f6ad8" //"#D40511" 
                    fixedWidth={false} size="2x"/>
              
              </div>
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-xl rm-pointers">
            <div className="dropdown-menu-header">
              <div className="dropdown-menu-header-inner bg-tempting-azure">
                <div className="menu-header-image opacity-1"
                  style={{
                    backgroundImage: "url(" + bg4 + ")",
                  }}/>
                <div className="menu-header-content text-dark">
                  <h5 className="menu-header-title">Two Column Grid</h5>
                  <h6 className="menu-header-subtitle">
                    Easy grid navigation inside popovers
                  </h6>
                </div>
              </div>
            </div>
            <div className="grid-menu grid-menu-2col">
              <Row className="g-0">
                <Col sm="6">
                  <Button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                    outline color="dark">
                    <i className="lnr-lighter text-dark opacity-7 btn-icon-wrapper mb-2"> {" "} </i>
                    Automation
                  </Button>
                </Col>
                <Col sm="6">
                  <Button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                    outline color="danger">
                    <i className="lnr-construction text-danger opacity-7 btn-icon-wrapper mb-2"> {" "} </i>
                    Reports
                  </Button>
                </Col>
                <Col sm="6">
                  <Button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                    outline color="success">
                    <i className="lnr-bus text-success opacity-7 btn-icon-wrapper mb-2"> {" "} </i>
                    Activity
                  </Button>
                </Col>
                <Col sm="6">
                  <Button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                    outline color="focus">
                    <i className="lnr-gift text-focus opacity-7 btn-icon-wrapper mb-2"> {" "} </i>
                    Settings
                  </Button>
                </Col>
              </Row>
            </div>
            
            </DropdownMenu>
          </UncontrolledDropdown>

          {/* <UncontrolledTooltip placement="left" target={'TooltipDemo'}>
                    Open Chat
                </UncontrolledTooltip> */}
          </div>

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  lastDate: state.UserDatails.lastDate,
});

const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(HeaderChat);

