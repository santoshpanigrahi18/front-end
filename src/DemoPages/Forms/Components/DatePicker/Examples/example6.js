import React, { Fragment } from "react";

import {
  InputGroup,
  FormGroup,
  Label,
  Form,
  Col,
  Row,
} from "reactstrap";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DatePicker from "react-datepicker";

class FormDatePicker6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate.isAfter(endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
  };

  handleChangeStart = (startDate) => this.handleChange({ startDate });

  handleChangeEnd = (endDate) => this.handleChange({ endDate });

  render() {
    return (
      <Fragment >
        <Form>
          <Row style={{height:'60px'}}> 
            <Col md={6} >
              <FormGroup>
                <Label for="exampleEmail" 
                style={{fontSize:'12px',marginTop:'6px',marginBottom:'-3px'}}
                >
                  Start Date
                </Label>
                <InputGroup>
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>
                  <DatePicker selected={this.state.startDate} selectsStart className="form-control"
                    startDate={this.state.startDate} endDate={this.state.endDate} onChange={this.handleChangeStart}/>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword" className="me-sm-2"
                   style={{fontSize:'12px',marginTop:'6px',marginBottom:'-3px'}}
                   >
                  End Date
                </Label>
                <DatePicker selected={this.state.endDate} selectsEnd className="form-control"
                  startDate={this.state.startDate} endDate={this.state.endDate} onChange={this.handleChangeEnd}/>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}

export default FormDatePicker6;
