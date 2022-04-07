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
import './adduser.css'
import { Combobox } from "react-widgets";

const ScopeData = [
    {
      label:'Network',
      value:'Network'
    },
    {
        label:'Region',
        value:'Region'
      },
      {
        label:'Country',
        value:'Country'
      },
      {
        label:'Warehouse',
        value:'Warehouse'
      },
    ]
    const UserRole = [
        {
            label:'Administrator',
            value:'Administrator'
        },
        {
            label:'Report Viewer',
            value:'Report Viewer'
        }
    ]
export default class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedScopeName: '',
            userCreate:false
        }
    }

    createUserCall = () => {
        this.setState({ userCreate: true })
    }
    
    onSelectScopeCall = (Obj) => {
     
        this.setState({ selectedScopeName: Obj.value })
    }

    render() {
        const { selectedScopeName,userCreate } = this.state;
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
                                            <Row>
                                                <Col md={6}>

                                                    <Label for="exampleEmail11">1. Enter Email ID </Label>
                                                    <Input type="email" name="email" id="exampleEmail11" placeholder="Enter Company Name" />

                                                </Col>

                                            </Row>
                                        </FormGroup>
                                        <FormGroup>
                                            <Row>
                                                <Col md={6}>
                                                    <Label for="exampleAddress">2. First Name</Label>
                                                    <Input type="text" name="fname" id="fname" placeholder="Enter First Name" />

                                                </Col>
                                                <Col md={6}>
                                                    <Label for="exampleAddress2">Last Name</Label>
                                                    <Input type="text" name="lname" id="lname" placeholder="Enter Last Name" />

                                                </Col>
                                            </Row>
                                        </FormGroup>
                                        <FormGroup>
                                            <Row>
                                                <Col md={6}>

                                                    <Label for="exampleEmail11">3. Select Company</Label>
                                                    <Select value={''} onChange={() => { }} options={[]} />


                                                </Col>

                                            </Row>
                                        </FormGroup>
                                        <FormGroup>
                                            <Row>
                                                <Col md={6}>
                                                    <Label for="exampleEmail11">4. Select Access Scope </Label>
                                                    {/* <Combobox
                                                        // value={}
                                                        data={[]}
                                                        defaultValue={"Select here..."}
                                                        onSelect={(value) => this.onChangeCall("selectedId", value)} /> */}

                                                    <Select 
                                                    //  value={selectedScopeName}
                                                     onChange={(value) =>this.onSelectScopeCall(value)}
                                                     options={ScopeData} />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                        <FormGroup>
                                            <Row>
                                                <Col md={6}>
                                                    <Label for="exampleEmail11">5. Select Access Report </Label>
                                                    {/* <Combobox
                                                        // value={}
                                                        data={[]}
                                                        defaultValue={"Select here..."}
                                                        onSelect={(value) => this.onChangeCall("selectedId", value)} /> */}

                                                    <Select 
                                                    //  value={selectedScopeName}
                                                     onChange={(value) =>this.onSelectScopeCall(value)}
                                                     options={ScopeData} />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                      {selectedScopeName=='Network' &&  <FormGroup>
                                            <Row>
                                                <Col md={6}>

                                                    <Label for="exampleEmail11">6. Select Value(s) </Label>
                                                    <Input type="text" name="values" id="nameValue"
                                                        value={'Global'} disabled />

                                                </Col>

                                            </Row>
                                        </FormGroup>}
                                        <FormGroup>
                                            <Row>
                                                <Col md={6}>
                                                    <Label for="exampleEmail11">6. Select User Role </Label>
                   
                                                    <Select 
                                                    //  value={selectedScopeName}
                                                     onChange={(value) =>this.onSelectScopeCall(value)}
                                                     options={UserRole} />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                      {selectedScopeName=='Region' &&  <FormGroup>
                                            <Row>
                                                <Col md={6}>

                                                    <Label for="exampleEmail11">6. Select Region(s) </Label>
                                                    <Select value={''} onChange={() => { }} options={[]} />

                                                </Col>

                                            </Row>
                                        </FormGroup>}
                                       {selectedScopeName=='Country' && <FormGroup>
                                            <Label for="exampleEmail11">6. Select Countries </Label>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Col md={11} >
                                                    <Row >
                                                        <Col md={6}>

                                                            <Label for="exampleEmail11">Select Region </Label>
                                                            <Select value={''} onChange={() => { }} options={[{ label: 'Network', value: '' }]} />

                                                        </Col>
                                                        <Col md={6}>

                                                            <Label for="exampleEmail11">Select Countries </Label>
                                                            <Select value={''} onChange={() => { }} options={[{ label: 'Network', value: '' }]} />

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        </FormGroup>}
                                       {selectedScopeName=='Warehouse' && <FormGroup>
                                            <Label for="exampleEmail11">6. Select Warehouse(s) </Label>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Col md={11} >
                                                    <Row >
                                                        <Col md={4}>

                                                            <Label for="exampleEmail11">Select Region </Label>
                                                            <Select value={''} onChange={() => { }} options={[{ label: 'Network', value: '' }]} />

                                                        </Col>
                                                        <Col md={4}>

                                                            <Label for="exampleEmail11">Select Countries </Label>
                                                            <Select value={''} onChange={() => { }} options={[{ label: 'Network', value: '' }]} />

                                                        </Col>
                                                        <Col md={4}>

                                                            <Label for="exampleEmail11">Select Warehouses </Label>
                                                            <Select value={''} onChange={() => { }} options={[{ label: 'Network', value: '' }]} />

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        </FormGroup>}
                                        <Row>
                                            <Col md={2}>
                                                <Button
                                                    className="mt-2 dhl-btn"
                                                    onClick={() => this.createUserCall()}>
                                                    Create User
                                                </Button>
                                            </Col >
                                            <Col md={2}>
                                                <Button className="mt-2 dhl-btn">
                                                    Cancel
                                                </Button>
                                            </Col>
                                        </Row>
                                        {userCreate &&<div>
                                              <hr></hr>
                                       <FormGroup>
                                            <Row>
                                                <FormText>
                                                User Created… 
                                                </FormText>
                                                <FormText>
                                                Please proceed to provide access below
                                                </FormText>

                                            </Row>
                                        </FormGroup>
                                        <hr></hr>
                                        <FormGroup>
                                            <Label for="exampleEmail11">6. Select Modules / Analyses </Label>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Col md={11} >
                                                    <Row >
                                                        <Col md={4}>

                                                            <Label for="exampleEmail11">Select Module </Label>
                                                            <Select value={''} onChange={() => { }} options={[{ label: 'Network', value: '' }]} />

                                                        </Col>
                                                        <Col md={4}>

                                                            <Label for="exampleEmail11">Select Analysis </Label>
                                                            <Select value={''} onChange={() => { }} options={[{ label: 'Network', value: '' }]} />

                                                        </Col>
                                                        <Col md={4}>

                                                            <Label for="exampleEmail11">Select Page </Label>
                                                            <Select value={''} onChange={() => { }} options={[{ label: 'Network', value: '' }]} />

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
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
                                        </div>}
                                      
                                       

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
