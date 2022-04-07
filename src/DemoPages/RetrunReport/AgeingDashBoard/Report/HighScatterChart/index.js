import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import { Button, ButtonGroup, Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import ReactSelect from "react-select";
import { connect } from "react-redux";



class HighScatterChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: '225px',
      ageBandValue:[{ label: 'ALL', value: 0}],
      selectedButton: 6,
      ageBandDropDownVisiblity: false,
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
      options: {
        credits: { enabled: false },
        title: false,
        chart: {
          type: 'scatter',
          zoomType: 'xy'
        },
        xAxis: {
          gridLineDashStyle: 'dash',
          gridLineWidth: 1,
          title: {
            enabled: true,
            text: 'Total Quantity'
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
        },
        yAxis: {
          gridLineDashStyle: 'dash',
          title: {
            text: 'Total Volume'
          },
        },
        legend: false,
        plotOptions: {
          scatter: {
            marker: {
              radius: 5,
              states: {
                hover: {
                  enabled: true,
                  lineColor: 'rgb(100,100,100)'
                }
              }
            },
            states: {
              hover: {
                marker: {
                  enabled: false
                }
              }
            },
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              // pointFormat: '{point.x} cm, {point.y} kg',
              pointFormatter: function () {
                console.log("console log data print", this)
                return '<span>' + "SKU :" + this.options.name + '</span>' + '</br>' + 'Total Quantity :'
                  + this.x + '</br> ' + 'Total Volume :' + this.y + '</br>' +
                  'Age Band :' + this.options.age_band + '</br>' +
                  "Warehouse :" + this.options.warehouse;
              },
            }
          }
        },
        series: [{
          name: '',
          color: '#118709',
          data: [[161.2, 51.6, 'SKU1', '', '']],
          keys: ['x', 'y', 'name', 'age_band', 'warehouse'],
        },
        {
          name: '',
          color: 'rgba(212, 5, 17,0.8)',
          data: [[161.2, 51.6, 'SKU1', '', '']],
          keys: ['x', 'y', 'name', 'age_band', 'warehouse'],
        },
        {
          name: '',
          color: 'rgba(0, 124, 57,0.8)',
          data: [[161.2, 51.6, 'SKU1', '', '']],
          keys: ['x', 'y', 'name', 'age_band', 'warehouse'],
        },
        {
          name: '',
          color: 'black',
          data: [[161.2, 51.6, 'SKU1', '', '']],
          keys: ['x', 'y', 'name', 'age_band', 'warehouse'],
        },
        {
          name: '',
          color: 'blue',
          data: [[161.2, 51.6, 'SKU1', '', '']],
          keys: ['x', 'y', 'name', 'age_band', 'warehouse'],
        },
        {
          name: '',
          color: 'gray',
          data: [[161.2, 51.6, 'SKU1', '', '']],
          keys: ['x', 'y', 'name', 'age_band', 'warehouse'],
        }
        ]
      }
    }
  }

  componentDidMount() {
    this.callFilterFun(this.props.data,[0]);
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.data !== this.props.data) {
      this.callFilterFun(nextProps.data, [0]);

      // this.setState({ updated: nextProps.burggerTag ? "270px" : "271px" });
    }
  }

  callFilterFun = (dataValue, value) => {
 
    let filterAgeBand =
    value.find((item)=>item==0)==0?[dataValue]:
    value.map((item_data)=>
     dataValue.map((item) => item.age_id == item_data && item).filter(Boolean)
    )
    let finalData =filterAgeBand.map((dataArray) => dataArray.map((item) => [item.total_quantity, parseInt(item.total_volume == null ? 0 : item.total_volume), item.sku_number, item.age_band, item.warehouse_name]))
    this.setState({
      selectedButton:this.state.selectedButton,
      options: {
        ...this.state.options,
        series: finalData.map((item,index)=>{
          return  {
            ...this.state.options.series[index],
            name: item!=undefined &&item.length!==0 ?item[0][3]:"",
            data:item,
            color:item!=undefined&&item.length!==0? item[0][3] =="0-30 Days" ?"#118dff":item[0][3] =="30-60 Days"?"#12239e"
            :item[0][3] =="60-90 Days"?"#e1c233":item[0][3] =="90-120 Days"?'#118dff':
            item[0][3] ==">120 Days"?"#dd0f31":"#666666":"black" ,
            keys: ['x', 'y', 'name', 'age_band', 'warehouse'],
          }
        })
       }

    })
  }

  callSelectedFun =(value)=>{
    console.log("print selected data",value.map((item)=>item.value) )
    //  this.setState({ageBandValue:selectData})
     if (value.find((item) => item.value == 0 && value.length <= 2)) {
      this.setState({
       
          ageBandValue: value[1].value==0?value.filter((item) => item.value == 0): value.filter((item) => item.value !== 0)
        
      }, () => {
        this.callFilterFun(this.props.data,value[1].value==0?value.filter((item) => item.value == 0).map((item)=>item.value): value.filter((item) => item.value !== 0).map((item)=>item.value))
        // label !== 'SKU' ? this.callFilterApi(label, value[1].value=='ALL'?value.filter((item) => item.value == 'ALL'): value.filter((item) => item.value !== 'ALL')) : this.skuFilterCall(value);
      })

    } else if (value.find((item) => item.value == 0 && value.length >= 1)) {
      this.setState({
        ageBandValue: value.filter((item) => item.value == 0)
        
      }, () => {
        this.callFilterFun(this.props.data,value.filter((item) => item.value == 0).map((item)=>item.value))
      })
    }
    else {
      this.setState({
        ageBandValue: value
        
      }, () => {
        this.callFilterFun(this.props.data,value.map((item)=>item.value))
      })
    }

    //  this.callFilterFun(this.props.data,selectData.map((item)=>item.value))
  }


  render() {
    const { selectedButton, ageBandDropDownVisiblity,ageBandValue,
      colourStyles } = this.state;
    const { colorScheme } = this.props;
    console.log("selected months props props", this.props)
    return (
      <Card className="main-card mb-3">
        <CardBody>
          <Row style={{ justifyContent: 'center', alignItems: "center",marginTop:'-7px' }}>
            <div className="parallel-text" md={6}
             style={{ width: '49%' }}>
              <div  className={`card-title-n-${colorScheme}`}>{`Aging & Dead Stock SKU`}</div>
              <div
               className={`card-title-caps-${colorScheme}`}>
                {`s`}</div>
            </div>
            <Col md={6}>
              <Row style={{ justifyContent: 'center', alignItems: "center" }}>
                <div className="text-center">
                  {/* {!ageBandDropDownVisiblity
                    && <Button color="warning" className="btn-pill" outline style={{ marginRight: "5px" }}
                      onClick={() => this.setState({ ageBandDropDownVisiblity: true,
                        selectedButton:3 })} active={selectedButton === 3}>
                      All
                    </Button>} */}
                  {/* {ageBandDropDownVisiblity && */}
                    <div className="btn-pill" style={{ marginRight: "5px", }}>
                      <ReactSelect
                        value={ageBandValue}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        isMulti
                        styles={colourStyles} 
                        onChange={(data)=>this.callSelectedFun(data)}
                        options={[
                          { label: 'ALL', value: 0},
                          { label: '0-30 Days', value: 1},
                        { label: '30-60 Days', value: 2},
                        { label: '60-90 Days', value: 3},
                        { label: '90-120 Days', value: 4},
                        { label: 'Aging Stock', value: 5},
                        { label: 'Dead Stock', value: 6}]} />
                    </div>
                  {/* } */}

                  {/* <ButtonGroup >

                    <Button className="btn-stock" outline color="warning"
                      // style={{backgroundColor:"#fc0"}}
                      onClick={() => this.callFilterFun(data, [selectedButton])}
                      active={selectedButton === 5}>
                      Ageing Stock
                    </Button>
                    <Button className="btn-stock" outline color="warning"
                      //  style={{backgroundColor:"#fc0"}}
                      onClick={() => this.callFilterFun(data, [selectedButton])}
                      active={selectedButton === 6}>
                      Dead Stock
                    </Button>

                  </ButtonGroup> */}
                </div> </Row>
            </Col>
          </Row>

          <HighchartsReact
            allowChartUpdate={true}
            className={'containerChart'} highcharts={Highcharts}
            options={{
              ...this.state.options,
              chart: {
                ...this.state.options.chart,
                height: this.state.updated,
              },
            }}
            redraw={true} />
        </CardBody >
      </Card >



    );
  }
}

const mapStateToProps = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme

});

const mapDispatchToProps = (dispatch) => ({
 
});
export default connect(mapStateToProps, mapDispatchToProps)(HighScatterChart);

