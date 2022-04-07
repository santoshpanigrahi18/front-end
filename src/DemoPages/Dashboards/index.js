import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// DASHBOARDS

import AnalyticsDashboard from "./Analytics/";

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";
import CRMDashboard from "../RetrunReport/CRM";
import ThemeOptions from "../../Layout/ThemeOptions";

const Dashboards = (props) => (
  <Fragment>
      {/* <ThemeOptions /> */}
    <AppHeader props={props} />
    <div className="app-main" >
      <AppSidebar />
      <div className="app-main__outer" >
        <div className="app-main__inner">
          <Route exact path={`${props.match.url}`} component={AnalyticsDashboard}/>           
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Dashboards;
