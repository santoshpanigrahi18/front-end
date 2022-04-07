import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    FormText,
} from "reactstrap";
import Select from "react-select";
import { Typeahead } from "react-bootstrap-typeahead";
import options from "../../../Forms/Components/Typeahead/Examples/DummyData";
import './addcompany.css'
import TextareaAutosize from "react-textarea-autosize";

export default class AddReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addCompanyStatus: false
        }
    }

    addCompanyCall = () => {
        this.setState({ addCompanyStatus: true })
    }

    render() {
        const { addCompanyStatus } = this.state;
        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition component="div" classNames="TabsAnimation" appear={true}
                        timeout={0} enter={false} exit={false}>
                        <Container fluid>
                            <Card className="main-card mb-3">
                                <CardBody>

                                    <Form>
                                        
                                                <FormGroup>
                                                    <Label for="exampleEmail11">1. Enter Module Name <span className="text-danger">*</span></Label>
                                                    <Input type="email" name="email" id="exampleEmail11" placeholder="Enter Company Name" />
                                                </FormGroup>
                                           
                                        <FormGroup>
                                        <Label for="exampleEmail11">2. Enter Module Description <span className="text-danger">*</span></Label>
                                        <TextareaAutosize className="form-control" minRows={3} maxRows={6} defaultValue="..."/>
                                          
                                        </FormGroup>
                                        <FormGroup>
                                                    <Label for="exampleEmail11">3. Enter Analysis Name <span className="text-danger">*</span></Label>
                                                    <Input type="email" name="email" id="exampleEmail11" placeholder="Enter Company Name" />
                                                </FormGroup>
                                           
                                        <FormGroup>
                                        <Label for="exampleEmail11">4. Select Analysis Description <span className="text-danger">*</span></Label>
                                        <TextareaAutosize className="form-control" minRows={3} maxRows={6} defaultValue="..."/>
                                          
                                        </FormGroup>
                                        <FormGroup>
                                                    <Label for="exampleEmail11">5. Enter Page Name</Label>
                                                    <Input type="email" name="email" id="exampleEmail11" placeholder="Enter Company Name" />
                                                </FormGroup>
                                           
                                        <FormGroup>
                                        <Label for="exampleEmail11">6. Enter Report Embed URL  <span style={{fontSize:'12px',}}><i>(Use this option if embedding reports from other platforms)</i></span></Label>
                                        <TextareaAutosize className="form-control" minRows={3} maxRows={6} defaultValue="https://"/>
                                          
                                        </FormGroup>
                                        
                                        <Row>
                                            <Col md={2}>
                                                <Button
                                                    className="mt-2 dhl-btn"
                                                    onClick={() => this.addCompanyCall()}>
                                                    Submit
                                                </Button>
                                            </Col >
                                            <Col md={2}>
                                                <Button className="mt-2 dhl-btn">
                                                    Cancel
                                                </Button>
                                            </Col>
                                        </Row>
                                      
                                    </Form>
                                </CardBody>
                            </Card>
                        </Container>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
}
