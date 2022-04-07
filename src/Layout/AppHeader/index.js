import React, { Fragment } from "react";
import cx from "classnames";



import { CSSTransition, TransitionGroup } from 'react-transition-group';

import HeaderLogo from "../AppLogo";

import SearchBox from "./Components/SearchBox";
import MegaMenu from "./Components/MegaMenu";
import UserBox from "./Components/UserBox";

import HeaderDots from "./Components/HeaderDots";
import HeaderChat from "./Components/HeaderChat";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    let {
      headerBackgroundColor,
      enableMobileMenuSmall,
      enableHeaderShadow,
      colorScheme
    } = this.props;
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div"
          
            className={cx(`app-header dhl-bg-${colorScheme}`, headerBackgroundColor, {
              "header-shadow": enableHeaderShadow,
            })}
            appear={true} timeout={1500} enter={false} exit={false}>
            <div>
              <HeaderLogo />
              <div className={cx("app-header__content", {
                "header-mobile-open": enableMobileMenuSmall,
              })}>
                <div className="app-header-left">
                  {/* <HeaderChat/> */}
                  {/* <SearchBox /> */}
                  {/* <MegaMenu /> */}
                </div>
                <div className="app-header-right">
                  <HeaderDots />
                 
                  <UserBox props={this.props}/>
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
  colorScheme: state.ThemeOptions.colorScheme
});

const mapDispatchToProps = (dispatch) => ({
 
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
