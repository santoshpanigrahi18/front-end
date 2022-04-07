import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
// USER PAGES

import Login from "./Login/Login";
import Admin from "../Admin";
import ReturnReport from "../RetrunReport";
import { PrivateRoute } from "./PrivateRoute";
import Dashboards from "../Dashboards";

const PrivateRoute1 = ({ component: Component,details, ...rest }) => 
(  
  <Route {...rest} render={props => 
  (
    details.hasOwnProperty('firstName') ? <Component {...props} /> : <Redirect to={{pathname: '/login'}}/>
  )}/>
);
const UserPages = ({ userDetails }) => (
  
  <Fragment>
    <div className="app-container">
      {/* User Pages */}
      <PrivateRoute exact path="/" details={userDetails} />
      <Route path="/login" component={Login} />
        <PrivateRoute1  path="/dashboards" details={userDetails}  component={Dashboards}/>
         <PrivateRoute1  path="/returnReport" details={userDetails}  component={ReturnReport}/>
         <PrivateRoute1  path="/admin" details={userDetails}  component={Admin}/>

      
    </div>
  </Fragment>
);

export default UserPages;

