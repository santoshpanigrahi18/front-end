import React from "react";
import { makeData, } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import { Card, CardBody, CardTitle } from "reactstrap";
import { connect } from "react-redux";
// import "react-table/react-table.css";

class WarehouseTable extends React.Component {
  constructor() {
    super();
    this.state = {
      dataTable: [],
      columns: [
        {
          // Header:()=><small style={
          //   {color:this.props.colorScheme=="dark"?"#eeeeee": "rgb(84, 92, 216)",}}>Age Band</small>,
          Header: "Age Band",
          columns: [
            {
              Header:()=><small style={
                {color:this.props.colorScheme=="dark"?"#eeeeee": "rgb(84, 92, 216)",}}>Warehouse</small>,
             
              id: 'warehouse',
              accessor: "warehouse"
            },
          ]
        }
      ]
    };
  }

  componentDidMount() {
    const { data, ageBand } = this.props;
    this.calculateData(data, ageBand);
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.data !== this.props.data) {
      // this.setState({ updated: nextProps.burggerTag ? "270px" : "271px" });
      this.calculateData(nextProps.data, nextProps.ageBand)
    }
  }
  calculateData = (data, ageBand) => {
    const { columns } = this.state;
    let allAgeBand = ageBand.map((item) => {
      return {
        Header: item.age_band,
        columns: [
          {
            Header:()=><small style={
              {color:this.props.colorScheme=="dark"?"#eeeeee": "rgb(84, 92, 216)",}}>Quantity</small>,
          
            accessor: `quantity_${item.age_band}`
          },
          {
            Header:()=><small  style={
              {color:this.props.colorScheme=="dark"?"#eeeeee": "rgb(84, 92, 216)",}}>
                Volume</small>,
          
            accessor: `volume_${item.age_band}`
          }
        ]
      }
    })

    let warehouse = [...new Map(data.map(item => [item['warehouse_name'], item])).values()].sort(function (a, b) {
      if (a.warehouse_name < b.warehouse_name) { return -1; }
      if (a.warehouse_name > b.warehouse_name) { return 1; }
      return 0;
    });

    let age_bandValue = [...new Map(data.map(item => [item['age_band'], item])).values()];
    let finalDataTable = warehouse.map((item) => {
      let datapassed = age_bandValue.map((item2) => {
        let totalQunatity = 0;
        let totalVoulme = 0;
        data.map((item3) => {
          if (item3.age_band == item2.age_band && item3.warehouse_name == item.warehouse_name) {
            totalQunatity = totalQunatity + item3.total_quantity
            totalVoulme = totalVoulme + parseInt(item3.total_volume == null ? 0 : item3.total_volume)
          }
        })
        return {
          warehouse: item.warehouse_name,
          [`quantity_${item2.age_band}`]: totalQunatity,
          [`volume_${item2.age_band}`]: totalVoulme
        }
      })
      return datapassed;
    })

    let filterdatatable = finalDataTable.map((dataArray) => {
      return dataArray.reduce((acc, { warehouse, ...rest }) => {
        acc.warehouse = warehouse;
        let merged = { ...acc, ...rest };
        acc = merged;
        return acc;
      }, {})
    })

    console.log("passed age band value", filterdatatable)

    this.setState({
      columns: [
        ...[columns[0]],
        ...allAgeBand
      ],
      dataTable: filterdatatable
    })
  }

  render() {
    const { columns, dataTable } = this.state;
    const {colorScheme}= this.props;
    let length = dataTable.length;
    console.log("print sub header data table data", dataTable.length)
    return (
      <Card className="main-card mb-3">
        <CardBody>
          <CardTitle>{`Warehouse Age Band Breakdown`}</CardTitle>
          {dataTable.length > 0 &&
            <ReactTable
              data={dataTable}
              customStyles={{
                rows: {
                  style: {
                    minHeight: '32px',
                    border:0
                    // override the row height
                  }
                },
                headCells:{
                  style:{
                    color:colorScheme=="dark"?"#eeeeee": "rgb(84, 92, 216)",
                  
                  }
                },
                headRow: {
                  style: {
                    minHeight: '32px',
                    // backgroundColor:'#fc0'
                  },
                },
              }}
              minRows = {0}
              columns={columns}
              defaultPageSize={dataTable.length <= 5 ? dataTable.length : 5}
              className="-striped -highlight"
            />
          }

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

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTable);
