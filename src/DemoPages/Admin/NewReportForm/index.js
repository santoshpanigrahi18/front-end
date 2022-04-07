import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PageTitle from "../../../Layout/AppMain/PageTitle";

import AddReport from "./AddReportForm";

export default class NewReport extends React.Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <div>  
              <PageTitle heading="Add New Report Form"
                subheading="Please provide details of the Module and Analysis to be added in the form below"
                icon="pe-7s-display1 icon-gradient bg-tempting-azure" />
              <AddReport/>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
