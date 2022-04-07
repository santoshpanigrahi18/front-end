import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Layout
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions";

import CRMDashboard from "./CRM";
import AgeingDashBoard from "./AgeingDashBoard";
import InventoryProfiling from "./InventoryProfiling";

const ReturnReport = (props) => (
  <Fragment>
    {/* <ThemeOptions /> */}
  <AppHeader props={props}/>
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${props.match.url}/returnsanalysis`} component={CRMDashboard} />
          <Route path={`${props.match.url}/inventoryprofiling`} component={InventoryProfiling} />
          <Route path={`${props.match.url}/inventoryaging`} component={AgeingDashBoard} />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default ReturnReport;
