import React, { Component, Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PageTitle from "../../../Layout/AppMain/PageTitle";
import Report from "./Report";

export default class AgeingDashBoard extends Component {
    render() {
        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition component="div" classNames="TabsAnimation" 
                    appear={true}
                        timeout={1500} enter={false} exit={false}>
                        <div style={{marginTop:"-25px"}} >
                           <Report/>
                        </div>
                      
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
}
