import React, { Component, Fragment } from "react";

import {

    Container,
} from "reactstrap";

import { connect } from "react-redux";

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
                  };
    }


    render() {
      
        return (
            <Fragment>
                <Container fluid>
                   


                </Container>
            </Fragment >
        );
    }
}
const mapStateToProps = (state) => ({
  


});

const mapDispatchToProps = (dispatch) => ({
  

});
export default connect(mapStateToProps, mapDispatchToProps)(Report);
