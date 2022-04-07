import React, { Component, Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PageTitle from "../../../Layout/AppMain/PageTitle";
import bg1 from "../../../assets/utils/images/inprogress.png";


export default class InventoryProfiling extends Component {
    render() {
        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition component="div" classNames="TabsAnimation" appear={true}
                        timeout={1500} enter={false} exit={false}>
                        <div>
                            {/* <PageTitle heading="Inventory Profiling Overview"
                                // subheading="This is an example dashboard created using build-in elements and components." */}
                                {/* icon="pe-7s-car icon-gradient bg-mean-fruit" /> */}
                                <div >
                   <img 
                   src={bg1}
                   className="home-img"
                      style={{
                        height: 'auto',
                         width: '100%', 
                        }} 
                        />
                </div>
                                {/* <div className="in-progress-img"
                      style={{
                          height:'300px',
                          width:"60%",
                          marginLeft:"20%",
                        //   backgroundColor:'red',
                        backgroundImage: "url(" + bg1 + ")",
                        
                      }} />
                        */}
                         </div>

                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
}
