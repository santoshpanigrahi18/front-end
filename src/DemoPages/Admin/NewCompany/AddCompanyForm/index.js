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
import { httpRequest } from "../../../../config/api";
import { ADD_COMPANY, POST } from "../../../../config/constant";
import { connect } from "react-redux";
import Loader from "react-loaders";
import { toast, Bounce, ToastContainer } from "react-toastify";


class AddCompany extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addCompanyStatus: false,
            companyName: '',
            loadingState: false,
        }
    }

    addCompanyCall = () => {
        if (this.state.companyName !== '') {
            this.setState({ loadingState: true });
            //  console.log("company data print", 
            //  {
            //         companyName: this.state.companyName
            //     },this.props.accessToken,ADD_COMPANY, POST)
            httpRequest(ADD_COMPANY, POST, {
                companyName: this.state.companyName
            }, this.props.accessToken)
                .then((res) => {
                    console.log("print company added reposne", res)
                    this.setState({ addCompanyStatus: true, loadingState: false })
                })
                .catch((error) => {
                    console.log("print company added err", error)
                    this.setState({ loadingState: false });
                    toast(
                        error.response !== undefined ? error.response.data.message : error,
                        {
                            transition: Bounce,
                            closeButton: true,
                            autoClose: 5000,
                            position: "bottom-right",
                            type: "error",
                        }
                    )
                })

        }

    }

    render() {
        const { addCompanyStatus, loadingState, companyName } = this.state;
        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition component="div" classNames="TabsAnimation" appear={true}
                        timeout={0} enter={false} exit={false}>
                        <Container fluid>
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <ToastContainer />

                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup >
                                                    <Label for="exampleEmail11">Enter Company Name <span className="text-danger">*</span></Label>
                                                    <Input
                                                        disabled={addCompanyStatus}
                                                        value={companyName}
                                                        type="text" name="companyName" id="companyName"
                                                        placeholder="Enter Company Name"
                                                        onChange={(event) => {

                                                            this.setState({ companyName: event.target.value })
                                                        }} />
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <FormGroup>
                                            <Row>
                                                <Col md={6}>
                                                    <Label for="exampleAddress">Select Company Sector</Label>
                                                    <Select
                                                        disabled={addCompanyStatus} value={''} onChange={() => { }} options={[]} />
                                                </Col>
                                                <Col md={6}>
                                                    <Label for="exampleAddress2">Select Company Type</Label>
                                                    <Select
                                                        disabled={addCompanyStatus} value={''} onChange={() => { }} options={[]} />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                        {!addCompanyStatus && <Row>
                                            <Col md={2}>
                                                <Button
                                                    className="mt-2 dhl-btn"
                                                    onClick={() => this.addCompanyCall()}>
                                                    {loadingState && <Loader type="ball-pulse"
                                                        style={{}}
                                                        active={loadingState}
                                                        color="#fff" />}
                                                    {!loadingState ? 'Add Company' : ''}


                                                </Button>
                                            </Col >
                                            <Col md={2}>
                                                <Button
                                                    onClick={() => this.setState({ companyName: ''})}
                                                    className="mt-2 dhl-btn">
                                                    Cancel
                                                </Button>
                                            </Col>
                                        </Row>}
                                        {addCompanyStatus && <div>
                                            <hr></hr>
                                            <FormGroup>
                                                <Row>
                                                    <FormText>
                                                        Company sucessfully added...
                                                    </FormText>
                                                    <FormText>
                                                        Please proceed to associated Warehouse for the Company below
                                                    </FormText>

                                                </Row>
                                            </FormGroup>
                                            <hr></hr>

                                            <FormGroup>
                                                <Row>
                                                    <Col md={6}>
                                                        <Label for="exampleAddress">Select Region</Label>
                                                        <Select value={''} onChange={() => { }} options={[]} />
                                                    </Col>
                                                    {/* <Col md={6}>
                                                        <Label for="exampleAddress">Select Warehouse By Address</Label>
                                                        <Typeahead id="typeID2" labelKey="name" multiple={false} options={options} placeholder="Enter State, Country, pincode to serach...." />
                                                    </Col> */}
                                                </Row>
                                            </FormGroup>
                                            <FormGroup>
                                                <Row>
                                                    <Col md={6}>
                                                        <Label for="exampleAddress">Select Country</Label>
                                                        <Select value={''} onChange={() => { }} options={[]} />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <FormGroup>
                                                <Row>
                                                    <Col md={6}>
                                                        <Label for="exampleAddress">Select Warehouse Name</Label>
                                                        <Input
                                                        // disabled={}
                                                        // value={companyName}
                                                        type="text" name="warehouseName" id="warehouseName"
                                                        placeholder="Enter Warehouse Name"
                                                        onChange={(event) => {
                                                            // this.setState({ companyName: event.target.value })
                                                        }} />
                                                        {/* <Select value={''} onChange={() => { }} options={[]} /> */}
                                                    </Col>
                                                </Row>


                                            </FormGroup>

                                            <Row>
                                                <Col md={2}>
                                                    <Button
                                                        onClick={() => { }}
                                                        className="mt-2 dhl-btn">
                                                        Submit
                                                    </Button>
                                                </Col >
                                                <Col md={2}>
                                                    <Button 
                                                      onClick={() => { }}
                                                      className="mt-2 dhl-btn">
                                                      
                                                        Cancel
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        }
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
const mapStateToProps = (state) => ({
    accessToken: state.UserDatails.accessToken,
});

const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);
