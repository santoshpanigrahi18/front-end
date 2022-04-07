import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import moment from 'moment';
import { Card, CardBody, CardTitle, Col, Label, Row } from "reactstrap";

const columns = [
  {
    name: "Region",
    selector: 'analysis_level',
    sortable: true,
  },
  {
    name: "Country",
    selector: 'level_attribute',
    sortable: true,
  },
  {
    name: "Warehouse",
    selector: 'warehouse_name',
    sortable: true,
    width: "120px",                    // added line here
    headerStyle: (selector, id) => {
      return { textAlign: "center",
        };   // removed partial line here
    },
  },
  {
    name: "SKU",
    selector: 'sku_number',
    sortable: true,
  },
  {
    name: "Description",
    selector: 'description',
    sortable: true,
    width: "120px",                    // added line here
    headerStyle: (selector, id) => {
      return { textAlign: "center",
        };   // removed partial line here
    },
  },
  {
    name: "LPN",
    selector: 'lpn',
    sortable: true,
  },
  {
    name: "Bin Location ",
    selector: 'stor_location',
    sortable: true,
    width: "130px",                    // added line here
    headerStyle: (selector, id) => {
      return { textAlign: "center",
        };   // removed partial line here
    },
  },
  {
    name: "Product Class",
    selector: 'product_class',
    sortable: true,
    width: "130px",                    // added line here
    headerStyle: (selector, id) => {
      return { textAlign: "center",
        };   // removed partial line here
    },
  },
  {
    name: "First Arrival Date",
    selector: 'first_arrival_datetime',
    sortable: true,
    width: "160px",                    // added line here
    headerStyle: (selector, id) => {
      return { textAlign: "center",
        };   // removed partial line here
    },
  },
  {
    name: "Age (Days)",
    selector: 'age',
    sortable: true,
  },

  {
    name: "Quantity",
    selector: 'order_qty',
    sortable: true,
  },
  {
    name: "Volume (m3)",
    selector: 'total_volume',
    sortable: true,
    width: "120px",                    // added line here
    headerStyle: (selector, id) => {
      return { textAlign: "center",
        };   // removed partial line here
    },
  },
  {
    name: "No. of Warehouse",
    selector: 'warehouse_count',
    sortable: true,
    width: "155px",                    // added line here
    headerStyle: (selector, id) => {
      return { textAlign: "center",
        };   // removed partial line here
    },
  },

];

class SKUTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orignalData: [],
    }
  }

  componentDidMount() {
    this.filterDataValue(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.data !== this.props.data) {
      this.filterDataValue(nextProps.data);
    }
  }

  filterDataValue = (data)=>{
    let uniqueSku_number = [...new Map(data.map(item => [item['sku_number'], item])).values()];
     let finalData = uniqueSku_number.map((item,index)=>{
       return{
         ...item,
         id:index,
       }
     })
     this.setState({
       orignalData:finalData
     })
    //  console.log("print data orinal for table",finalData)
  }

  render() {
    const {data,colorScheme}= this.props;
    const{orignalData} =this.state;
    console.log("selected months props props", this.props)
    return (
      <Card className="main-card mb-3">
        <CardBody>
          <CardTitle>{`SKU Storage Locations(s)`}</CardTitle>
          <DataTable
          // style={{width:'100%'}}
            data={orignalData}
            columns={columns}
            conditionalRowStyles={[
                          
              {
                when: (row,index) =>{console.log("print row value value",row)
                return row.id%2==0},
                style: {
                  backgroundColor: colorScheme=='dark'?'#2B2B2B':'#ffffff',
                  color: colorScheme=='dark'?"#fff":'#000', 
                  // '&:hover': {
                  //   cursor: 'pointer',
                  // },
                },
              },
              // You can also pass a callback to style for additional customization
              {
                when: row => row.id%2!=0,
                style: row => ({
                  backgroundColor:colorScheme=='dark'?"#666666":'#F7F7F7', 
                  color: colorScheme=='dark'?"#fff":'#000', 
                }),
              },
            ]}
            customStyles={{
             
              rows: {
                style: {
                  minHeight: '32px',
                  border:0,
                  color:'white'
                  // override the row height
                }
              },
              headCells:{
                style:{
                  color:colorScheme=="dark"?"#eeeeee": "rgb(84, 92, 216)",
                
                }
              },
              pagination:{
                style: {
                  color:colorScheme=="dark"?"white": "black",
                  backgroundColor:colorScheme=="dark"?"black": "white",
                },
                pageButtonsStyle:{
                  color:colorScheme=="dark"?"white": "black",
                  backgroundColor:colorScheme=="dark"?"white": "white",
                }
              },
              
              table:{
                style:{
                  backgroundColor:colorScheme=="dark"?"#232526": "white",
                }
              },
              headRow: {
                style: {
                  minHeight: '32px',
                  borderTop: '2px solid #F7F7F7',
                  borderBottom: '1px solid #F7F7F7',
                  marginTop:'-1px',
                  backgroundColor:colorScheme=="dark"?"black": "white",
                  
                },
               
              },
            }}
            pagination
            paginationPerPage={25}
            fixedHeader
            paginationRowsPerPageOptions={[25, 50, 75, 100]}
            fixedHeaderScrollHeight="350px"
          />

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

export default connect(mapStateToProps, mapDispatchToProps)(SKUTable);
