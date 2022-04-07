import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import ReactSelect from "react-select";
import { connect } from "react-redux";


 class HighLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: '230px',
      ageBandValue:[{ label: 'Dead Stock', value: 6}],
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
        chart:{
           
        },
        credits: { enabled: false },
        title: false,
        yAxis: {
          gridLineDashStyle: 'dash',
          title: {
            text: 'Total Quantity'
          },
          labels: {
            formatter: function() {
                return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                .format(this.value) ; 
            }
          }
        },
       

        xAxis: {
          lineColor: '#666666',
          title: {
            text: 'Inventory Snapshot Date'
          },

          categories: ["2020-11-09"]
        },
        tooltip:{
          formatter:function(){
            console.log("print log of data to grapgh",this)
              return '<span>' 
              + this.point.category + ' : ' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
              .format(this.y) 
          }
      
       },
        legend: false,
        series: [{
          lineColor: '#000',
          color: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1
            },
            stops: [
              [0, '#000'],
            ]
          },
          name: '',
          data: [123454]
        },],

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: false
            }
          }]
        }

      }

    }
  }

  componentDidMount(){
    const { trendData} = this.props;
    this.calculateData(trendData,[6])
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.trendData !== this.props.trendData) {
      // this.setState({ updated: nextProps.burggerTag ? "270px" : "271px" });
       this.calculateData(nextProps.trendData,[6])
    }
  }
  calculateData = (data,value)=>{
    const {options}=this.state;
    // let filterDataAgeBnad=  data.filter((item)=>item.age_id==6)
    let filterAgeBand =
    value.find((item)=>item==0)==0?data:
    value.map((item_data)=>data.map((item) => item.age_id == item_data && item).filter(Boolean)) 
    let finalAgeTrend = [].concat.apply([], filterAgeBand)
  
     let finalDateValue= [...new Set(finalAgeTrend.map((item)=>moment(item.snapshot_datetime.value).format('YYYY-MM-DD')))]
    
     let totalQunatity = finalDateValue.map((date)=>{
       let totalCount = 0;
        finalAgeTrend.map((item)=>{
        if(moment(item.snapshot_datetime.value).format('YYYY-MM-DD')==date){
          totalCount=totalCount+item.order_qty
        }
      })
      console.log("print age band filtervalue totalCount",totalCount);
      return totalCount;
      // finalAgeTrend.reduce((idSum, item) =>moment(item.snapshot_datetime.value).format('YYYY-MM-DD')==date&& 
      // idSum + item.order_qty, 0)
     })
     
    console.log("print age band filtervalue",
    totalQunatity,finalDateValue,finalAgeTrend)
    this.setState({
      options:{
        ...options,
        xAxis:{
          ...options.xAxis,
          categories:finalDateValue
        },
        series:[
          {...options.series[0],
            data:totalQunatity
          }
        ]
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
        this.calculateData(this.props.trendData,value[1].value==0?value.filter((item) => item.value == 0).map((item)=>item.value): value.filter((item) => item.value !== 0).map((item)=>item.value))
        // label !== 'SKU' ? this.callFilterApi(label, value[1].value=='ALL'?value.filter((item) => item.value == 'ALL'): value.filter((item) => item.value !== 'ALL')) : this.skuFilterCall(value);
      })

    } else if (value.find((item) => item.value == 0 && value.length >= 1)) {
      console.log("asdfasdfsdasdf")
      this.setState({
        ageBandValue: value.filter((item) => item.value == 0)
        
      }, () => {
        this.calculateData(this.props.trendData,value.filter((item) => item.value == 0).map((item)=>item.value))
      })
    }
    else {
      this.setState({
        ageBandValue: value
        
      }, () => {
        this.calculateData(this.props.trendData,value.map((item)=>item.value))
      })
    }

    //  this.callFilterFun(this.props.data,selectData.map((item)=>item.value))
  }



  render() {
    const {colorScheme}=this.props;
    const {ageBandValue,colourStyles}=this.state;
    console.log("selected months props props", this.props)
    return (
      <Card className="main-card ">
        <CardBody>
          <Row style={{
            marginTop:"-5px"
           }}>
            <Col md={6}style={{width:'45%'}}>
            <CardTitle className={`card-title-n-${colorScheme}`}>Aging Trend</CardTitle>
            </Col>
            <Col>
            <Row style={{justifyContent:'center',alignItems:"center"}}>
              <Col className={`text-${colorScheme=="dark"?"light":"dark"}`} md={3}
              style={{width:'27%',padding:0}}> Age Band</Col>
              <Col md={3}style={{width:'73%',padding:0,paddingRight:'5%'}}>
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
              </Col>

            </Row>
           
            </Col>
          </Row>
          
          <HighchartsReact
            allowChartUpdate={true}
            className={'containerChart'} highcharts={Highcharts}
            options={{
              ...this.state.options,
              // xAxis: [{
              //   ...this.state.options.xAxis[0],
              //   // labels: {
              //   //   style: {
              //   //     color: colorScheme=='dark'?'#fff':"#000000",
              //   //     //  color: Highcharts.getOptions().colors[0]
              //   //   }
              //   // },
              // }],
              chart: {
                ...this.state.options.chart,
                height: this.state.updated,
                backgroundColor:colorScheme=='dark'?'#232526':"white"
              },
            }}
            redraw={true} />
        </CardBody>
      </Card>



    );
  }
}
const mapStateToProps = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme

});

const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(HighLineChart);
