import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Row, Col, Card, CardBody, CardTitle, Input } from "reactstrap";
import {
  IoIosRefresh,
} from "react-icons/io";
import { components } from "react-select";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import './combo.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormDatePicker6 from "../../../../Forms/Components/DatePicker/Examples/example6";
import ReactSelect from "react-select";
import { connect } from "react-redux";

library.add(faSpinner);

const Option = (props) => {
  return (
    <div>
      <components.Option  {...props}
      >
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label className="searchLabel" >{props.label}</label>
      </components.Option>
    </div>
  );
};
// const colourStyles = {
//   valueContainer: (provided, state) => (
//     {
//       WebkitOverflowScrolling: "touch",
//       alignItems: "center",
//       boxSizing: "border-box",
//       display: "flex",
//       // flex: 1,
//       flexWrap: "wrap",
//       overflow: "hidden",
//       padding: "1px 3px",

//       // position: "relative",
//       fontSize: 12,
//       // ...provided,
//       maxWidth: "60%",
//       // backgroundColor:'red',
//       // textOverflow: "ellipsis",
//       // whiteSpace: "nowrap",
//       height: 30,
//       maxHight: 30,
//       // overflow: "hidden",
//       // display: "initial"
//     }),
//   // menuPortal: base => ({ ...base, zIndex: 0 }),
//   // container: (base, state) => 
//   // (  console.log("console log container",base),{
//   //   ...base,
//   //   height:20,
//   //   position: "absolute"
//   // }),
//   menuPortal: base => ({ ...base, zIndex: 9999 }),
//   menu: base => (
//     console.log("console log menu", base), {
//       ...base,
//       // override border radius to match the box
//       borderRadius: 0,
//       // kill the gap
//       marginTop: 0,
//       padding: 0,
//       zIndex: 9999

//     }),
//   menuList: base => (
//     console.log("console log menulist", base), {
//       ...base,
//       // kill the white space on first and last option
//       padding: 0,
//       zIndex: 9999
//       // backgroundColor: '#292929'


//     }),
//   dropdownIndicator: (styles) => (
//     console.log("console log dropdownIndicator", styles), {
//       ...styles,
//       padding: 0,
//       paddingRight: 2,
//       maxHight: 20
//     }),
//   clearIndicator: (styles) => ({
//     ...styles,
//     padding: 0,
//     paddingRight: 2
//   }),
//   control: (base, state) => (
//     {
//       ...base,
//       // flexDirection: "row-reverse",
//       // border: 0,
//       // This line disable the blue border
//       height: 30,
//       minHeight: 35,
//       maxHeight: 50,
//       // width:100,
//       // minHeight:25,
//       borderColor: state.isFocused ? "white" : "#8b8b8b",
//       // boxShadow: state.isFocused ? null : 'none',
//       "&:hover": {
//         // Overwrittes the different states of border
//         // borderColor: state.isFocused ? "white" : "white"
//       },
//       // '&:hover': {borderColor: 'white'},
//       // shadowColor:"red",
//       // backgroundColor: '#292929'
//     }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     // const color = chroma(data.color);
//     // console.log("print style",{
//     //   ...styles,
//     //   backgroundColor: isFocused ? "#2f2f2f" :"#292929",
//     //   color: "#333333",

//     //   fontSize:'0.8rem',
//     //   ':active': {backgroundColor: '#fc0'},
//     // });
//     return {
//       ...styles,
//       // backgroundColor: isFocused ? "#2f2f2f" : "#292929",
//       fontSize: '0.8rem',
//       // ':active': { backgroundColor: '#fc0' },
//       maxHeight: 30
//     };
//   }
// };
class FormComboBoxBasic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colourStyles : {
        valueContainer: (provided, state) => (
          {
            WebkitOverflowScrolling: "touch",
            alignItems: "center",
            boxSizing: "border-box",
            display: "flex",
            // flex: 1,
            flexWrap: "wrap",
            overflow: "hidden",
            padding: "1px 3px",
           
            // position: "relative",
            fontSize:12,
            // ...provided,
            maxWidth: "60%",
            // backgroundColor:'red',
            // textOverflow: "ellipsis",
            // whiteSpace: "nowrap",
            height: 30,
            maxHight: 30,
            // overflow: "hidden",
            // display: "initial"
          }),
        
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        menu: base => (
          console.log("console log menu", base), {
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0,
            padding: 0,
            zIndex: 9999,
           
            // "&:hover": {
            //   backgroundColor: this.props.colorScheme=='dark'?'black':'white',
                
            //   },
      
          }),
        menuList: base => (
          console.log("console log menulist", base), {
            ...base,
            // kill the white space on first and last option
            padding: 0,
            zIndex: 9999,
            backgroundColor: this.props.colorScheme=='dark'?'black':'white',
           

            // backgroundColor: '#292929'
            
            
          }),
        dropdownIndicator: (styles) => (
          console.log("console log dropdownIndicator", styles), {
            ...styles,
            padding:0,
            paddingRight:2,
            maxHight: 20
          }),
        clearIndicator: (styles) => ({
          ...styles,
          padding:0,
          paddingRight:2
        }),
        multiValue : (styles)=>({
          ...styles,
          backgroundColor:'transparent',
          // border: `1px solid ${this.props.colorScheme=='dark'?'white':'#8b8b8b'}`,
          // borderColor:this.props.colorScheme=='dark'?'white':'#8b8b8b',
        }),
        control: (base, state) => (
          {
            ...base,
            // flexDirection: "row-reverse",
            // border: 0,
            // This line disable the blue border
            height: 30,
            minHeight: 35,
            maxHeight: 50,
            // width:100,
            // minHeight:25,
            borderColor: state.isFocused ? "white" :
            this.props.colorScheme=='dark'?"#8b8b8b": "#e3e3e3",
            backgroundColor: this.props.colorScheme=='dark'?'#8b8b8b':'white',
            // boxShadow: state.isFocused ? null : 'none',
            "&:hover": {
              // Overwrittes the different states of border
              // borderColor: state.isFocused ? "white" : "white"
            },
            // '&:hover': {borderColor: 'white'},
            // shadowColor:"red",
            // backgroundColor: '#292929'
          }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          // const color = chroma(data.color);
          // console.log("print style",{
          //   ...styles,
          //   backgroundColor: isFocused ? "#2f2f2f" :"#292929",
          //   color: "#333333",
      
          //   fontSize:'0.8rem',
          //   ':active': {backgroundColor: '#fc0'},
          // });
          return {
            ...styles,
            // backgroundColor: isFocused ? "#2f2f2f" : "#292929",
            fontSize: '0.8rem',
          
            // ':active': { backgroundColor: '#fc0' },
            maxHeight: 30
          };
        }
      },
      order_month: [],
    };
  }

  // handleChange = (selected) => {
  //   this.props.monthChange(selected)
  //   console.log("passed months value", selected)
  //   // this.setState({
  //   //   selected_months: selected
  //   // });
  // };
  // componentDidMount(){
  // //  let dataFilter=  Object.keys(this.props.filterList).map((item) => {
  // //   return item !== "companyId" &&item !== "network"&& {
  // //     label: item,
  // //     value: [...['ALL'], ...this.props.filterList[item]],
  // //     disabled:item=="network"
  // //   }
  // // }).filter(Boolean)


  //   console.log('All value print',dataFilter);
  // }

  render() {
    const { callDeadStockFun, deadStockMonth,skuNumbers,colorScheme,
      refreshFilterCall, selectedCall, scope,selectedFilter,location} = this.props;
      const {colourStyles} = this.state;
      console.log("selected va;lue",[...[{ label: 'ALL', value: 'ALL' }],
      ...location
   ] );
    // console.log("print filter passed data awfsdfd",sku_number,[...[{label:'ALL',value:'ALL'}], ...sku_number] )
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <Row>
              {[
                { label: 'Scope', value: [...scope],isMulti:false },
                { label: 'Location', value: [...[{ label: 'ALL', value: 'ALL' }],
                 ...location
              ],isMulti:true },
                { label: 'SKU', value: [...[{ label: 'ALL', value: 'ALL' }],...skuNumbers],isMulti:true },

              ].map((selectvalue, i) =>
                <Col>
                  {/* <Card className="main-card mb-3"> */}
                    <CardBody style={{paddingBottom:'10px'}}>
                      <div className={`card-title-caps-${colorScheme}`}
                      style={{marginBottom:'10px'}}
                      >{selectvalue.label}</div>
                      <Row>
                        <Col md={12}>

                          <ReactSelect
                            value={selectedFilter[selectvalue.label]}
                            options={selectvalue.value}
                            isMulti={selectvalue.isMulti}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{
                              Option,
                            }}
                            styles={colourStyles}
                            onChange={(data) => selectedCall(selectvalue.label, data)}
                            allowSelectAll={true}
                          />
                          {/* <Combobox
                            value={filterObj[selectvalue.label]}
                            data={selectvalue.value}
                            defaultValue={"ALL"}
                            onSelect={(value)=>selectedCall(selectvalue.label, value)}/> */}
                        </Col>
                      </Row>
                    </CardBody>
                  {/* </Card> */}
                </Col>)}

              <Col md="3" >
                {/* <Card className="main-card mb-3"> */}
                  <CardBody style={{paddingBottom:0}}>
                  <div className={`card-title-caps-${colorScheme}`}
                      style={{marginBottom:'10px',marginTop:'-5px'}}
                      >Dead Stock Definition</div>
                    {/* <CardTitle >Dead Stock Definition</CardTitle> */}
                    <Row style={{ alignItems: 'center',marginBottom:'6px' }}>
                      <Col md={5} >
                        <Input
                          disabled={true}
                          style={{ height: '25px' }}
                          value={deadStockMonth}
                          type="text"
                       
                        />
                      </Col>
                      <Col md={5}>Months</Col>
                    </Row>
                    <input type="range"
                    min={4}
                    max={50}
                    value={deadStockMonth}
                    onChange={(e) => callDeadStockFun(e.target.value) }
                    style={{ height: '25px',width:'100%' }} 
                    />
                   
                  </CardBody>
                {/* </Card> */}
              </Col>
              <Col xs="2" md="4" lg="1" style={{display:'flex', alignItems:'end',height:'90px'}}>
                      {/* <div className="font-icon-wrapper"> */}
                        <IoIosRefresh 
                        onClick={()=>refreshFilterCall()}
                        fontSize="30px" color={`${colorScheme=='dark'?'#b5b5b5':'#000000'} `} />
                        {/* <p>rotate=true</p> */}
                      {/* </div> */}
                    </Col>
            </Row>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  filterList: state.UserDatails.filterList,
  colorScheme: state.ThemeOptions.colorScheme

});

const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(FormComboBoxBasic);
