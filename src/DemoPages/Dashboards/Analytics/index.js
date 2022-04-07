import React, { Component, Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PageTitle from "../../../Layout/AppMain/PageTitle";
import bg1 from "../../../assets/utils/images/homePage.png";
import bg2 from "../../../assets/utils/images/progress.png";



export default class AnalyticsDashboard extends Component {
  render() {
    return (
      <Fragment >
        <TransitionGroup >
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>

            {/* <PageTitle heading="Overview Dashboard"
                // subheading="This is an example dashboard created using build-in elements and components."
                icon="pe-7s-home icon-gradient bg-mean-fruit"/> */}
            <div >
              <img
                src={bg1}
                className="home-img"
                style={{
                  height: 'auto',
                  width: '100%',
                  opacity: 0.3,

                }}
              />

              <div style={{
                position: 'absolute',
                top: "50%",
                left: '50%',
             
              }}>
                <img
                  src={bg2}

                  style={{
                    height: 'auto',
                    width: '40%',
                  }}
                />
              </div>

            </div>



          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
