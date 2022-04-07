import React from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Card, CardBody, CardTitle, Col, Label, Row } from "reactstrap";
import Progress_bar from "./component/Progress_bar";

const TableRow = ({ item,index }) => {

  return (
    <div>
      <Row style={{}}>
        <Col md={2} style={{ padding: 0, }}>
        <div style={{
              height: 25,
              width: '100%',
              display: 'row',
              color: 'black',
              fontSize: "12px",
              backgroundColor:(index%2==0)?'#fff':'rgb(224, 221, 221)'
          }}>
            <span style={{paddingLeft:'5px'}}>{`${item.age_band}`}</span>
          </div>
          {/* <Progress_bar bgcolor="orange" progress={0} data={item.age} height={20} /> */}

        </Col>
        <Col md={3} style={{ textAlign: "right", padding: 0 }}>
        <div style={{
              height: 25,
              width: '100%',
              display: 'row',
              color: 'black',
              fontSize: "12px",
              backgroundColor:`rgb(212, 5, 17,${item.perOpacity})`
          }}>
            <span style={{paddingRight:'5px'}}>{`${parseFloat(item.Age==null?0:item.Age).toFixed(1)}`}</span>
          </div>
          {/* {item.days} */}
        </Col>
        {/* { item.valume } */}
        <Col md={2} style={{ textAlign: "center", padding: 0 }}>
          <div style={{
              height: 25,
              width: '100%',
              display: 'row',
              color: 'black',
              fontSize: "12px",
              backgroundColor:(index%2==0)?'#fff':'rgb(224, 221, 221)'
          }}>
            <span style={{}}>{`${item.total_volume}`}</span>
          </div>
          {/* <Progress_bar bgcolor="orange" progress={0} data={item.valume}  height={20} /> */}
        </Col>
        <Col md={2} style={{ textAlign: "center", padding: 0 }}>
          <div style={{
              height: 25,
              width: '100%',
              display: 'row',
              color: 'black',
              fontSize: "12px",
              backgroundColor:(index%2==0)?'#fff':'rgb(224, 221, 221)'
          }}>
            <span style={{}}>{`${item.total_value}`}</span>
          </div>
          {/* <Progress_bar bgcolor="orange" progress={0} data={item.valume}  height={20} /> */}
        </Col>
        <Col md={3} style={{ padding: 0, textAlign: "right" }}>
        
          <Progress_bar bgcolor="orange" progress={item.progressValue} data={item.order_qty} height={20} />

          {/* { item.quantity } */}
        </Col>

      </Row>

    </div>
  )
}



class HighTableChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: '220px',
      sortObj:{
       name:'quantity',
       form:'ascending'
      },
      listData:[{ },{ },{ },{},{}]
    }
  }

  componentDidMount(){
     const {costData} = this.props;
     this.calcualteData(costData)
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.costData !== this.props.costData) {
      // this.setState({ updated: nextProps.burggerTag ? "270px" : "271px" });
      this.calcualteData(nextProps.costData)
    }
  }


  calcualteData=(data)=>{
    const {listData} = this.state;
    

    // let totalAvg = ageBand.map((item)=>{
    //   let sum=0;
    //   let totalAvg= 0;
    //   let total_volume=0;
    //   let total_value=0;
    //   let order_qty=0;
    //   data.map((item2)=>{
    //       if(item.age_id == item2.age_id){
    //         totalAvg= totalAvg+1;
    //        sum=sum+ item2.age;
    //        total_volume=total_volume+(item2.total_volume==null?0:item2.total_volume)
    //        total_value=total_value+(item2.total_value==null?0:item2.total_value)
    //        order_qty=order_qty+(item2.order_qty==null?0:item2.order_qty)
          
    //       }
    //   })
    //   console.log("print data from avg age",data,sum,totalAvg,data.length, parseFloat(sum/data.length).toFixed(1))
    //   return{
    //       ...item,
    //       average_age: parseFloat(sum/data.length).toFixed(1),
    //       total_volume,
    //       total_value,
    //       order_qty,
    //   }
    // })
    let totalProgress=Math.max(...data.map((item)=>item.order_qty))
  
    let sortOpacity = data.map((item)=>item.Age).sort(function(a, b){return b - a});
    let opecityData=[1,0.7,0.6,0.5,0.4,0.2]


    let completeObj=data.map((item)=>{
      return{
        ...item,
        progressValue:parseInt((item.order_qty/totalProgress)*100),
        perOpacity: sortOpacity.map((value,index)=>value==item.Age&&opecityData[index]).filter(Boolean)[0]//  (parseInt((item.average_age/totalDaysOpacity)*100)/100)
      }
    })
     let mergeData= completeObj.sort((a,b)=>a.age_id - b .age_id).map((item,index)=>{
      return{
          ...item,
          ...listData[index]
      }
    })

    this.setState({
      listData:mergeData
    })
    console.log("final result of calculation",mergeData,this.props.costData)
     
  }

  sortingCall = (name)=>{  
    const {sortObj} = this.state;
   if(sortObj.name==name){
    sortObj.form == 'ascending'?  console.log("Print value and name 1",name):
    console.log("Print value and name 2",name)
     sortObj.form == 'ascending'?
     this.setState({
       sortObj:{
         name:name,
         form:'descending'
       },
      listData : this.state.listData.sort((a,b)=>parseInt(a[name]) - parseInt(b[name]))
    }) : this.setState({
      sortObj:{
        name:name,
        form:'ascending'
      },
      listData : this.state.listData.sort((a,b)=>parseInt(b[name]) - parseInt(a[name]))
    })
   }else{
    console.log("Print value and name 3",name)
    this.setState({
      sortObj:{
        name:name,
        form:'descending'
      },
     listData : this.state.listData.sort((a,b)=>parseInt(a[name]) - parseInt(b[name]))
    
   }) 
   }
   
  }

  render() {
    const {colorScheme}= this.props;
    console.log("selected months props props", this.props)
    return (
      <Card className="main-card mb-3" style={{ height: '285px', }}>
        <CardBody>
          {/* <CardTitle>{`Aging & Dead Stock Associated Costs`}</CardTitle> */}
          <div className="parallel-text" md={6}
          style={{marginBottom:'7px'}}
           >
              <div  className={`card-title-n-${colorScheme}`}>{`Aging & Dead Stock Associated Cost`}</div>
              <div
               className={`card-title-caps-${colorScheme}`}>
                {`s`}</div>
            </div>
          <table style={{ width: '95%', marginLeft: '2.5%', border: 0 }}>
            <thead>
              <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                <Col onClick={()=>this.sortingCall('age_id')} md={2} style={{ padding: 0, fontWeight: 900 }}>
                  <Label style={{
                    fontSize: '10px', textAlign: 'center',color:'#0000EE'
                  }}>Age Band
                  </Label>
                </Col>
                <Col onClick={()=>this.sortingCall('Age')} md={3} style={{ padding: 0, textAlign: 'center', fontWeight: 900 }}>
                  <Label style={{ fontSize: '10px',color:'#0000EE' }}>Avg. Inventory Age (Days)
                  </Label>
                </Col>

                <Col onClick={()=>this.sortingCall('total_volume')}
                md={2} style={{ padding: 0, textAlign: 'center', fontWeight: 900 }}>
                  <Label style={{ fontSize: '10px',color:'#0000EE' }}>Total Volume (m3)
                  </Label>
                </Col>
                <Col onClick={()=>this.sortingCall('total_value')}
                md={2} style={{ padding: 0, textAlign: 'center', fontWeight: 900 }}>
                  <Label style={{ fontSize: '10px',color:'#0000EE' }}>Value($)
                  </Label>
                </Col>

                <Col onClick={()=>this.sortingCall('order_qty')} md={3} style={{ padding: 0, textAlign: 'center', fontWeight: 900 }}>
                  <Label style={{ fontSize: '10px' ,color:'#0000EE'}}>Quantity
                  </Label>
                </Col>

              </Row>
              {/* </tr> */}
            </thead>
            <tbody>
              {this.state.listData.map((item,index) => {
                return <TableRow item={item} index={index} />;
              })}
            </tbody>
          </table>
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
export default connect(mapStateToProps, mapDispatchToProps)(HighTableChart);

