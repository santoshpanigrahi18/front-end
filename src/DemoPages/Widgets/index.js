import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// CHART BOXES

// CONTENT BOXES

// PROFILE BOXES

// Dashboard Widgets

import WidgetsProfileBoxes from "./ProfileBoxes/";
import DemandReportBoxes from "./DemandReport/";
import DemandDashboardBoxes from "./DemandDashboard/";


import WidgetsChartBoxes from "./ChartBoxes/";
import WidgetsChartBoxes2 from "./ChartBoxes2/";
import WidgetsChartBoxes3 from "./ChartBoxes3/";

import WidgetsContentBoxes from "./ContentBoxes/";

// Layout
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions/";

const Widgets = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          {/* Dashboard Widgets */}

          <Route path={`${match.url}/overview`} component={WidgetsChartBoxes}/>
          <Route path={`${match.url}/report`} component={WidgetsChartBoxes2}/>
          <Route path={`${match.url}/deadstockdashboard`} component={WidgetsChartBoxes3}/>
          <Route path={`${match.url}/iprofilingreport`} component={WidgetsProfileBoxes}/>
          <Route path={`${match.url}/iprofilingdashboard`} component={WidgetsContentBoxes}/>
          <Route path={`${match.url}/idemandreport`} component={DemandReportBoxes}/>
          <Route path={`${match.url}/idemanddashboard`} component={DemandDashboardBoxes}/>
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Widgets;
