import React, { Fragment } from "react";
import {
  IoIosGrid,
  IoIosAnalytics,
  IoIosInformationCircleOutline,
  IoIosDownload
} from "react-icons/io";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DataTableExtensions from "../../../../customComponent/react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import CsvCreator from 'react-csv-creator';
import { Row, Col, Card, CardBody, CardTitle, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";

import DataTable from 'react-data-table-component';
import { connect } from "react-redux";

class DataTableFixedHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      orignalData: [],
      totalQuantity: 0
    };
  }
  componentDidMount() {
    this.filterDataQuantity(this.props.tableData);
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.tableData !== this.props.tableData) {
      this.filterDataQuantity(nextProps.tableData);
    }
  }

  filterDataQuantity = (tableData) => {
    let uniqueObjArray = [...new Map(tableData.map((item) => [item["sku_number"], item])).values()];

    console.log("print passed data", uniqueObjArray)

    const orignalData = uniqueObjArray.map((item) => {
      let datafilter = tableData.reduce((accumulator, { sku_number, sum_ib_qty }) =>
        accumulator + parseInt(sku_number == item.sku_number ? sum_ib_qty == null ? 0 : sum_ib_qty : 0)
        , 0)
      return {
        description: item.description, sku_number: item.sku_number,
        sum_ib_qty: datafilter
      }
    })

    const totalQuantity = orignalData.reduce((accumulator, { sum_ib_qty }) =>
      accumulator + parseInt(sum_ib_qty == null ? 0 : sum_ib_qty)
      , 0)

    const orignalValue = orignalData.map((item) => { return { ...item, sum_ib_qty: `${parseFloat((item.sum_ib_qty / totalQuantity) * 100)}` } })
      .filter((item) => item.sum_ib_qty !== "0")



    const totalQuantityPer = orignalValue.reduce((accumulator, { sum_ib_qty }) =>
      parseFloat(parseFloat(accumulator) + parseFloat(sum_ib_qty))
      , 0)

      let finaltableData= orignalValue.map((item) => {
        return { ...item, sum_ib_qty: `${parseFloat(item.sum_ib_qty).toFixed(1)}%` }
      }).sort((a, b) => parseFloat(b.sum_ib_qty) - parseFloat(a.sum_ib_qty))


    this.setState({
      orignalData: finaltableData.map((item,index) => {return{...item,id:index}})
        , totalQuantity: totalQuantityPer
    });
  }
  render() {
    const { totalQuantity, orignalData } = this.state;
    console.log("print passed data", orignalData,)
    const columns = [
      {
        name: "SKU Numbers",
        display: "SKU Numbers",
        selector: 'sku_number',
        id: "sku_number",
        sortable: true,
      },
      {
        name: "Description",
        display: "Description",
        id: "description",
        selector: 'description',
        sortable: true,
      },

      {
        name: "Quantity",
        display: "Quantity",
        selector: 'sum_ib_qty',
        id: 'sum_ib_qty',
        sortable: true,
      },

    ];
    // const footer = {
    //   sku_number: "TOTAL",
    //   sum_ib_qty: `${parseFloat(totalQuantity).toFixed(1)}%`
    // };

    const {colorScheme} = this.props;

    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <div>
              <Row>
                <Col md="12">
                  <Card className="main-card mb-3">
                    <CardBody>
                    <CardTitle>Returned Items</CardTitle>
                      <Row style={{marginTop:'-40px'}}>
                        
                        <Col style={{textAlign:'right'}}>
                          <UncontrolledDropdown>
                            <DropdownToggle className="p-0" color="link">
                              <div style={{ marginBottom: '10px' }}>
                                <IoIosDownload color={colorScheme=="dark"?"white": "#3f6ad8"} fontSize="27px" />
                              </div>
                            </DropdownToggle>
                            <DropdownMenu
                              className="rm-pointers"
                              style={{
                                minWidth: "100px",
                                padding: '5px',
                                height:"30px"
                              }}>
                              <CsvCreator
                                filename='return_report'
                                headers={columns}
                                rows={orignalData}
                              >
                                <p style={{ color: '#3f6ad8' }}>Export CSV</p>
                              </CsvCreator>
                              {/* <CsvCreator
                                filename='my_cool_csv'
                                headers={columns}
                                rows={orignalData.sort((a, b) => parseFloat(b.sum_ib_qty) - parseFloat(a.sum_ib_qty))}
                              >
                                <p style={{ color: '#3f6ad8' }}>Export Excel</p>
                              </CsvCreator> */}
                            </DropdownMenu>

                          </UncontrolledDropdown>

                        </Col>
                      </Row>

                      {/* <DataTableExtensions
                      // export={false}
                        print={false}
                        exportHeaders={true}
                        {...
                        {
                          columns: columns,
                          data: orignalData.sort((a, b) => parseFloat(b.sum_ib_qty) - parseFloat(a.sum_ib_qty)),
                          filter: false,

                        }}> */}

                      <DataTable
                     
                        data={orignalData}
                        columns={columns}
                        pagination
                        defaultSortField="sum_ib_qty"
                        defaultSortAsc={false}
                        paginationPerPage={25}
                        fixedHeader
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
                              backgroundColor:colorScheme=="dark"?"black": "white",
                            },
                           
                          },
                        }}
                        paginationRowsPerPageOptions={[25, 50, 75, 100]}
                        // fixedFooter
                        // footerBold={true}
                        // footer={footer}
                        fixedHeaderScrollHeight="400px"
                      />

                      {/* </DataTableExtensions> */}
                      <Row className="stickyFooter"
                        style={{
                          backgroundColor: colorScheme=='dark'? 'black':'white',
                          zIndex: 999,
                          height: "40px",
                          position: "relative",
                          width: '100%',
                          paddingTop: '8px',
                          marginLeft: '1px',
                          marginTop: '-96.5px'
                        }}
                      >
                       
                        <Col md="8" style={{ paddingLeft: '14px',
                          }}>
                          <CardTitle style={{ 
                          color: colorScheme=='dark'? 'white':'black',
                          }}> TOTAL</CardTitle>
                        </Col>
                        <Col md="4">
                          <CardTitle style={{ marginLeft: '3px',
                        color:colorScheme=='dark'? 'white':'black', }}>{parseFloat(totalQuantity).toFixed(1)}%</CardTitle>
                        </Col>
                       
                      </Row>

                      <div style={{ height: "50px" }}></div>

                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DataTableFixedHeader);
