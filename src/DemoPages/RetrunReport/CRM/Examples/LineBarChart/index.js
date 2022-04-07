import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import { connect } from "react-redux";

class HighLineBarCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: '290px',
      options: {
        chart: {
         
          zoomType: 'xy',
          backgroundColor: '#ffffff',
          display: 'table-cell',
          position: 'absolute',
          gridLineDashStyle: 'longdash',
        },
        title: {
          text: '',
          // style: {
          //   color: "#CCCCCC",
          // }
        },
        xAxis: [{

          lineColor: '#666666',

          categories: this.props.order_month.map((item) => item.value),
          crosshair: true,
          labels: {
            style: {
              color: '#000'
              //  color: Highcharts.getOptions().colors[0]
            }
          },
        }],
        yAxis: [
          { // Primary Axis
            gridLineDashStyle: 'dash',

            title: {
              text: '% Returns',
              style: {
                color: '#000'
                //Highcharts.getOptions().colors[0]
              }
            },
            labels: {
              style: {
                color: '#000'
                //  color: Highcharts.getOptions().colors[0]
              }
            },
            opposite: true
          },
          { // Secondary yAxis
            gridLineDashStyle: 'dash',
            gridLineColor: "#d3d3d3",
            labels: {
              format: '{value}',
              style: {
                color: '#000'
                // Highcharts.getOptions().colors[1]
              }
            },
            title: {
              text: 'Order Quantity',
              style: {
                color: "#000"
                // color: Highcharts.getOptions().colors[1]
              }
            }
          }
        ],
        tooltip: {
          shared: true
        },
        legend: {

          itemStyle: {
            color: '#000'
          }
          // backgroundColor:
          //   Highcharts.defaultOptions.legend.backgroundColor || // theme
          //   'rgba(255,255,255,0.25)'
        },
        series: [{
          // events: {
          //   click: function (event) {
          //     alert('clicked');
          //   }
          // },
          borderWidth: 2,
          borderColor:`#fc0`,
          pointWidth: 30,
          name: 'Order Quantity',
          type: 'column',
          color: 'rgba(255, 204, 0,0.5)',//"#10FFEB",
          yAxis: 1,
          // data: [371, 250, 276, 293, 332, 444, 387, 376, 506, 409, 401, 6],

        }, {
          name: '% Returns',
          type: 'spline',
          lineColor: '#000',
          lineWidth: 2,
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
          // data: ["8.4", "37.5", "10.0", 16.9, 4.7, 8.2, 8.3, 10, 8.4, 11.6, 9.1, 4.7],
        }]

      }

    }
  }

  // componentWillReceiveProps(nextProps) {
  //   // You don't have to do this check first, but it can help prevent an unneeded render
  //   if (nextProps.burggerTag !== this.props.burggerTag) {
  //     this.setState({ updated: nextProps.burggerTag ? "270px" : "271px" });
  //   }
  // }



  render() {
    const {colorScheme}= this.props;
    console.log("selected months props props", this.props)
    return (
          <HighchartsReact
            allowChartUpdate={true}
            className={'containerChart'} highcharts={Highcharts}
            options={{
              ...this.state.options,
              tooltip: {
                shared: true,
                pointFormatter: function () {
                  console.log("console log data print",this.series.name=="% Returns"&&this)
                  if(this.series.name=="% Returns"){
                      return '<span style="color:' + this.series.color + '">' + '</span>' + ' ' 
 + this.series.name + ': ' + this.y+'%'+
  '<br>Return Quantity: ' + this.returnData+'<br/>'
                  ;
                  }else{
                    return '<span style="color:' + this.series.color + '">' + '</span>' + ' ' 
                    + this.series.name + ': ' + this.y+'<br>';
                  }
                
                },
                 
                
                useHTML: true
              },

              credits: { enabled: false },
              chart: {
                ...this.state.options.chart,
                height: this.state.updated,
                backgroundColor:colorScheme=='dark'?'#232526':"white"

              },
              
              xAxis: [{
                ...this.state.options.xAxis[0],
                labels: {
                  style: {
                    color: colorScheme=='dark'?'#fff':"#000000",
                    //  color: Highcharts.getOptions().colors[0]
                  }
                },
                
                categories: this.props.order_month.map((item) => item.value),
              }],
              yAxis: [
                { // Primary Axis
                  gridLineDashStyle: 'dash',
      
                  title: {
                    text: '% Returns',
                    style: {
                      color:colorScheme=='dark'?'#fff':"#000000",
                      //Highcharts.getOptions().colors[0]
                    }
                  },
                  labels: {
                    style: {
                      color: colorScheme=='dark'?'#fff':"#000000",
                      //  color: Highcharts.getOptions().colors[0]
                    }
                  },
                  opposite: true
                },
                { // Secondary yAxis
                  gridLineDashStyle: 'dash',
                  gridLineColor: "#d3d3d3",
                  labels: {
                    format: '{value}',
                    style: {
                      color:colorScheme=='dark'?'#fff':"#000000",
                      // Highcharts.getOptions().colors[1]
                    }
                  },
                  title: {
                    text: 'Order Quantity',
                    style: {
                      color: colorScheme=='dark'?'#fff':"#000000",
                      // color: Highcharts.getOptions().colors[1]
                    }
                  }
                }
              ],
              legend: {

                itemStyle: {
                  fontFamily:`Delivery Bold, Delivery Regular, Delivery, sans-serif `,
                  color: colorScheme=='dark'?'#fff':"#000000",
                }
                // backgroundColor:
                //   Highcharts.defaultOptions.legend.backgroundColor || // theme
                //   'rgba(255,255,255,0.25)'
              },
              series: [
                {
                  ...this.state.options.series[0],
                  data: this.props.sumOfObQuantity
                  // returnQunatity:this.props.sumOfIbQuantity

                },
                {
                  ...this.state.options.series[1],
                  data: this.props.linePerData.map(Number).map((item,index)=>{return{y:item,returnData:this.props.sumOfIbQuantity[index]}}),
                  returnQunatity:this.props.sumOfIbQuantity,
                  lineColor:  colorScheme=='dark'?'#1acaee':"#000000",
                  color: { 
                    linearGradient: {
                      x1: 0,
                      x2: 0,
                      y1: 0,
                      y2: 1
                    },
                    stops: [
                      [0, colorScheme=='dark'?'#1acaee':"#000000",],
                    ]
                  },

                },
               
              ]
            }}
            // callback={(event)=>{
            //   alert('clicked');
            // }}
            redraw={true} />
    );
  }
}
const mapStateToProps = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HighLineBarCharts);
