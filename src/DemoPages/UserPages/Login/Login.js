import React, { Fragment, Component } from "react";
// import { app } from './firebase-config';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
import { connect } from "react-redux";
import Loader from "react-loaders";
import { Combobox } from "react-widgets";

import { toast, Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {browserHistory} from 'react-router'
import Slider from "react-slick";
import bg1 from "../../../assets/utils/images/dhl/dpdhl_1.jpeg";
import bg2 from "../../../assets/utils/images/dhl/dpdhl_2.jpeg";
import bg3 from "../../../assets/utils/images/dhl/dpdhl_3.jpeg";

import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from "reactstrap";

import { setUserDetails } from "../../../reducers/UserDatails";
import { httpRequest } from "../../../config/api";
import { COMPANYDETAILS, LOGIN, POST } from "../../../config/constant";
import ReactSelect from "react-select";

// const firebaseConfig = {
//   apiKey: "AIzaSyDP9YGYpeKkhArBVNMNZbFdJ0orXwV4SzE",
//   authDomain: "totemic-atrium-342709.firebaseapp.com",
//   projectId: "totemic-atrium-342709",
//   storageBucket: "totemic-atrium-342709.appspot.com",
//   messagingSenderId: "1005063335326",
//   appId: "1:1005063335326:web:c05cab498518c6bde3fa8f"
// };

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loadingState: false,
      companyIdList: [],
      loginApiData: {},
      selectedId:{},
      keepMeSign:false
    }
    // firebase.initializeApp(firebaseConfig);
  }

  onLoginClick = () => {
    const { email, password } = this.state;
    this.setState({ loadingState: true });

    httpRequest(LOGIN, POST, { email: email, password: password })
      .then((res) => {
        const { response } = res;
        const uniqCompanys = response.company.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i).map(({
          name: label,id:value,
           }) => ({ label, value }));
           console.log("print login response", response,uniqCompanys)
         
          uniqCompanys.length <= 1 ? this.storeDataAndNav(response,uniqCompanys[0]) :
          this.setState({ loginApiData: response, loadingState: false, companyIdList: uniqCompanys })
      })
      .catch((error) => {
        this.setState({ loadingState: false })

        console.log("api error login", error)
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

  storeDataAndNav = (loginData,companyId) => {
    const { keepMeSign } = this.state;
    this.setState({ loadingState: true })
  
    httpRequest(COMPANYDETAILS, POST, { userId: loginData.user_id, companyId: companyId.value },loginData.token)
      .then((res) => {
        const { response } = res;


        console.log("print company response", res)
        
        let userDetails = {
          email: response.email_id,
          firstName: response.first_name,
          lastName: response.last_name,
          userName: response.user_name,
          userId: response.user_id,
          user_role:loginData.user_role,
          access_scope:response.access_scope
        }
        this.props.setUserDetails({
          userDetails: userDetails,
          filterList: response.filter,
          accessToken: loginData.token,
          reportAccess:  response.reportAccess.sort((a,b)=>a.analysis_id-b.analysis_id)
        })
       if(keepMeSign){
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('company', companyId);
       }else{
        localStorage.setItem('accessToken', '');
        localStorage.setItem('company','');
       }

        this.setState({ loadingState: false })
        this.props.history.push("/dashboards");
      })
      .catch((error) => {
        this.setState({ loadingState: false })

        console.log("api error login", error)
        toast(
          error,
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


  onChangeCall = (label, value) => {
    console.log('print console all',value)
    this.setState({
      [label]: label=='selectedId'?value: value.target.value
    })
  }

  // firebase.firestore().collection('users').doc('bhagwat.ghuge@dhl.com')
  // .get()
  //   .then(snapshot => {
  //     console.log("Logged In user", snapshot.data());
  //     firebase.firestore().collection('report_access').
  //     where('company_name', '==', snapshot.data().company)
  //     .get()
  //       .then(querySnapshot => {
  //         const matchedDocs = querySnapshot.size
  //         if (matchedDocs) {
  //           querySnapshot.docs.forEach(doc => {
  //             console.log("=>", doc.data())
  //           })
  //         } else {
  //           console.log("0 documents matched the query")
  //         }
  //       })
  //       .catch(err => {
  //         console.log('Error getting report access data', err);
  //       });
  //   })
  //   .catch(err => {
  //     console.log('Error getting users data', err);
  //   });







  // const authentication = getAuth();
  // signInWithEmailAndPassword(authentication, 'bhagwat.ghuge@dhl.com', '12345')
  // .then((response) => {
  //    console.log("Logged In user",response);
  //   // navigate('/home')
  //   // sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
  // }).catch((err)=>{
  //   console.log("Login error comes",err);
  // })



  render() {
    const { email, password, loadingState, companyIdList,selectedId,loginApiData
    ,keepMeSign } = this.state;
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };
    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 g-0">
            <Col lg="4" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg1 + ")",
                      }} />
                    <div className="slider-content">
                      <h1>Actionable Insights</h1>
                      <h4>
                      Empower your team to identify risks and opportunities in realtime so they can take action when it’s less costly and easier to control
                      </h4>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg3 + ")",
                      }} />
                    <div className="slider-content">
                      <h1>Scalable, Modular, Consistent</h1>
                      <p>
                        
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                    <div className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: "url(" + bg2 + ")",
                      }} />
                    <div className="slider-content">
                      <h1>Complex, but lightweight</h1>
                      <p>
                        
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg="8" md="12" className="h-100 d-flex justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div style={{ backgroundColor: '#fc0', padding: '18px', marginBottom: '18px' }}>
                  <div style={{ padding: '0px', margin: 0 }}
                    className="app-logo" />
                </div>

                <h4 className="mb-0">
                  Welcome back,

                </h4>
                <h4 className="mb-0">

                  <span>Please sign in to your account.</span>
                </h4>
                {/* <h6 className="mt-3">
                  No account?{" "}
                  <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()} className="text-primary">
                    Sign up now
                  </a>
                </h6> */}
                <Row className="divider" />
                <div>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input
                            disabled={companyIdList.length>0}
                            value={email}
                            type="email" name="email"
                            id="exampleEmail"
                            placeholder="Email here..."
                            onChange={(e) => this.onChangeCall("email", e)} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">Password</Label>
                          <Input
                            disabled={companyIdList.length>0}
                            value={password}
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="Password here..."
                            onChange={(e) => this.onChangeCall("password", e)} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup check>
                      <Input type="checkbox" name="check" id="exampleCheck" checked={keepMeSign} onClick={()=>this.setState({keepMeSign:!keepMeSign})} />
                      <Label for="exampleCheck" check>
                        Keep me logged in
                      </Label>
                    </FormGroup>
                    <Row className="divider" />

                    <div className="d-flex" style={{ alignItems: "center" }}>
                      {companyIdList.length > 0 && <div className="me-auto">
                        <Label >{'Please Select Company Id :'}</Label>
                      </div>}
                      {companyIdList.length > 0 && <div className="me-auto w-25">
                      <ReactSelect placeholder={'Select here...'} 
                      onChange={(obj) => this.onChangeCall("selectedId", obj)} 
                      options={companyIdList} />

                        {/* <Combobox
                          value={selectedId}
                          data={companyIdList}
                          defaultValue={"Select here..."}
                          onSelect={(value) =>this.onChangeCall("selectedId", value)} /> */}

                      </div>}
                      <div className="ms-auto">
                        <Button
                         className="dhl-btn"
                          disabled={loadingState}
                         
                          color="primary" size="lg"
                          onClick={() => companyIdList.length <= 0? 
                          this.onLoginClick()
                          :this.storeDataAndNav(loginApiData,selectedId)}>
                          {loadingState && <Loader type="ball-pulse"
                            style={{}}
                            active={loadingState}
                            color="#fff" />}
                          {!loadingState ? companyIdList.length > 0 ? 'Go to Dashboard' : 'Login to Dashboard' : ''}

                        </Button>
                        <ToastContainer />
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment >
    );
  }
}
const mapStateToProps = (state) => ({

});


const mapDispatchToProps = (dispatch) => ({
  setUserDetails: (data) => {
    console.log("data passed in function", data)
    dispatch(setUserDetails(data))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

