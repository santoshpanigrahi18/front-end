import React from "react";
// import { Doughnut } from "react-chartjs-2";
import Highcharts from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.js";
import PieChart from "highcharts-react-official";
import { connect } from "react-redux";

// const options = {
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//         display: true,
//         position:'bottom'
//     },
// }
// };



class DoughnutExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        credits: { enabled: false },
        chart: {
          type: "pie",
          renderTo: "container",
          type: 'pie',
          height: "260px",
          showInLegend: true,
          borderRadius: 10,

        },
        title: false,
        tooltip: true,
        //  {
        //   headerFormat: '',
        //   pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        //     'Condition: <b>{point.y}</b><br/>' +
        //     '%: <b>{point.z}</b><br/>'
        // },

        legend: {
          itemStyle: {
            fontFamily: 'Delivery Bold',
          }
        },
        series: [
          {
            borderWidth: 0,
            showInLegend: true,
            showFirstLabel: false,
            dataLabels: {
              formatter: function () {
                return this.point.y == '0' ? null : '<b>' + this.point.y + '</b> (' + Highcharts.numberFormat(this.point.percentage, 1) + ') %';
              }
            },
            name: 'Returned Condition',
            data: [
             
            ]
          }
        ]
      }
    }
  }

  render() {
    const { option } = this.state;
    const { colorScheme } = this.props;
    console.log("print data value of donut", this.props,
    )

    let filterFalse= [
      this.props.goodSum !== 0 && {
        name: 'GOOD',
        z: 0.21,
        color: 'rgba(0, 124, 57,0.8)',
        y: this.props.goodSum
      },
      this.props.defectiveSum !== 0 && {
        name: 'DEFECTIVE',

        z: 73.32,
        color: 'rgba(212, 5, 17,0.8)',
        y: this.props.defectiveSum,
      },
      this.props.repairSum !== 0 && {
        name: 'REPAIR',

        z: 26.47,
        color: '#FFCC00',
        y: this.props.repairSum
      },
      this.props.scrapSum !== 0 && {
        name: 'SCRAP',

        z: 0,
        color: '#FFA500',
        y: this.props.scrapSum,
      },
      this.props.refurbSum !== 0 && {
        name: 'REFURB',

        z: 0,
        color: '#000000',
        y: this.props.refurbSum
      }
    ].filter(Boolean)

    return (
      <div>
        <PieChart highcharts={Highcharts}
          options=
          // {option}
          {{
            ...option,
            chart: {
              ...option.chart,
              backgroundColor: colorScheme == 'dark' ? '#232526' : "white",
            },
            plotOptions: {
              pie: {
                innerSize: "60%",
                dataLabels: {
                  style: {
                    fontSize: "15px",
                    color: colorScheme == 'dark' ? '#fff' : "#000000",
                    fontFamily: 'Delivery Bold',
                  }
                }
              }
            },
            legend: {
              itemStyle: {
                fontFamily: 'Delivery Bold',
                color: colorScheme == 'dark' ? '#fff' : "#000000",
              }
            },
            series:
              [{
                ...option.series[0],
                data:filterFalse
              }]

          }}
        />

        {/* <Doughnut 
        data={{
           labels: ["GOOD", "DEFECTIVE", "REPAIR","SCRAP","REFURB"],
           datasets: [
             {
               data: [this.props.goodSum, this.props.defectiveSum, this.props.repairSum,this.props.scrapSum,this.props.refurbSum],
               backgroundColor: ['rgba(0, 124, 57,0.8)', 'rgba(212, 5, 17,0.8)','rgba(255, 204, 0,0.8)','rgba(255, 165, 0,0.8)','rgba(0, 0, 0,0.8)'],
               hoverBackgroundColor: ['#007c39', '#d40511', '#FFCC00','#FFA500','#000000'],
               
             },
            ] 
        }} 
         width={367} height={'260px'} 
        options={options} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DoughnutExample);
