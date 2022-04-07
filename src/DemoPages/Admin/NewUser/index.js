import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PageTitle from "../../../Layout/AppMain/PageTitle";

import AddUser from "./AddUserForm";

export default class NewUser extends React.Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <div>  
              <PageTitle heading="Add New User"
                subheading="Please provide the details of the New User to be added"
                icon="pe-7s-add-user icon-gradient bg-tempting-azure" />
              <AddUser/>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
