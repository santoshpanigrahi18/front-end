import React, { Component, Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PageTitleAlt2 from "../../../Layout/AppMain/PageTitleAlt2";
// Examples
import CRMDashboard1 from "./Examples/Variation1";

export default class CRMDashboard extends Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <div style={{marginTop:'-25px'}}>
              <CRMDashboard1/>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
