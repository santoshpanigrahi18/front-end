import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';



import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import ButtonsStandardOutline2x from "../../Elements/Button/Standard/Examples/Outline2x";
import AddCompany from "./AddCompanyForm";



export default class NewComapny extends React.Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <div>  
              <PageTitle heading="Add New Company"
                subheading="Please fill up the form below to add your Company"
                icon="pe-7s-notebook icon-gradient bg-tempting-azure" />
              <AddCompany/>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
