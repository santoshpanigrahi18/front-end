import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Layout
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions/";
import NewComapny from "./NewCompany";
import NewReport from "./NewReportForm";
import NewUser from "./NewUser";

const Admin = (props) => (
  <Fragment>
    {/* <ThemeOptions /> */}
    <AppHeader props={props}/>
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          {/* Buttons */}
          <Route path={`${props.match.url}/addnewcompany`} component={NewComapny}/>
          <Route path={`${props.match.url}/addnewreport`} component={NewReport}/>
          <Route path={`${props.match.url}/addnewuser`} component={NewUser}/>
          
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Admin;
