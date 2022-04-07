import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MetisMenu from "react-metismenu";
import { setEnableMobileMenu } from "../../reducers/ThemeOptions";
import {
  MainNav,
  // ReturnANav,
  // InventoryANav,
  AdminitrationNav,
} from "./NavItems";
import { sideMenuDataSet } from "./Util/Util";
import { setPageDetails, setRefreshDetails } from "../../reducers/UserDatails";

class Nav extends Component {
  constructor(props) {
    super(props);

    console.log("check the value of path",sideMenuDataSet(this.props.reportAccess, "Returns Analytics"))
    this.state = {
      ReturnANav: sideMenuDataSet(this.props.reportAccess, "Returns Analytics"),
      // InventoryANav: sideMenuDataSet(this.props.reportAccess, "Inventory Analytics")
    };
  }


  toggleMobileSidebar = (event) => {
    const { setPageDetails } = this.props;
    console.log("item.name item.name", event.target, (event.target.href),
    )
    this.props.setRefreshDetails('')
    if (event.target.href.indexOf('#/dashboard') > -1) {
      setPageDetails('#/dashboard')
    }
    if (event.target.href.indexOf('#/returnReport/returnsanalysis') > -1) {
      setPageDetails('#/returnReport/returnsanalysis')
    }
    if (event.target.href.indexOf('#/returnReport/inventoryprofiling') > -1) {
      setPageDetails('#/returnReport/inventoryprofiling')
    }
    if (event.target.href.indexOf('#/returnReport/inventoryageing') > -1) {
      setPageDetails('#/returnReport/inventoryageing')
    }

    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  render() {
    const { userDetails, colorScheme } = this.props;
    const { ReturnANav, InventoryANav } = this.state;
    console.log("rerender class not working", colorScheme)
    return (
      <Fragment>
        <div>
          <h5 className="app-sidebar__heading">Menu</h5>
          <MetisMenu content={MainNav} onSelected={(e) => this.toggleMobileSidebar(e)}
            activeLinkFromLocation
            className={`vertical-nav-menu`}
            classNameLink={`${this.props.colorScheme == 'dark' ? 'text-white' : 'text-dark'}`}
            classNameItemActive={`${this.props.colorScheme != 'dark' ? 'text-white' : 'text-dark'}`}

            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />

          {ReturnANav.length > 0 &&
            <div>
              <h5 className="app-sidebar__heading">Inventory Analytics</h5>
              <MetisMenu content={ReturnANav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation
                className={`vertical-nav-menu`}
                classNameLink={`${this.props.colorScheme == 'dark' ? 'text-white' : 'text-dark'}`}
                classNameItemActive={`${this.props.colorScheme != 'dark' ? 'text-white' : 'text-dark'}`}

                // classNameLinkActive={`${this.props.colorScheme != 'dark' && 'text-white'}`}

                iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
            </div>}

          {/* {InventoryANav.length > 0 &&
            <div>
              <h5 className="app-sidebar__heading">Inventory Analytics</h5>
              
                  <MetisMenu content={ReturnANav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation
                className={`vertical-nav-menu`}
                classNameLink={`${this.props.colorScheme == 'dark' ? 'text-white' : 'text-dark'}`}
                classNameItemActive={`${this.props.colorScheme != 'dark' ? 'text-white' : 'text-dark'}`}
                iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />

            </div>} */}

          {userDetails.user_role == "Administrator" && <div>
            <h5 className="app-sidebar__heading">Administration</h5>
            <MetisMenu content={AdminitrationNav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation
              className={`vertical-nav-menu`}
              classNameLink={`${this.props.colorScheme == 'dark' ? 'text-white' : 'text-dark'}`}
              classNameItemActive={`${this.props.colorScheme != 'dark' ? 'text-white' : 'text-dark'}`}

              // classNameLinkActive={`${'text-dark'}`}

              // classNameItemActive={`metismenu-container-${colorScheme}`}
              // classNameItemHasActiveChild={`metismenu-container-${colorScheme}`}
              // classNameLinkHasActiveChild={`metismenu-container-${colorScheme}`}
              // classNameLinkActive={`metismenu-container-${colorScheme}`}
              // classNameLink={`metismenu-container-${colorScheme}`}
              iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
          </div>}
        </div>
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}
const mapStateToProps = (state) => ({
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  reportAccess: state.UserDatails.reportAccess,
  userDetails: state.UserDatails.userDetails,
  colorScheme: state.ThemeOptions.colorScheme
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
  setPageDetails: (data) => dispatch(setPageDetails(data)),
  setRefreshDetails: (data) => dispatch(setRefreshDetails(data)),

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
