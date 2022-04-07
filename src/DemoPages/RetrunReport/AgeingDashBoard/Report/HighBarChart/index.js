import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import { Card, CardBody, CardTitle } from "reactstrap";
import { connect } from "react-redux";



class HighBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: '250px',
      options: {
        credits: { enabled: false },
        chart: {
          type: 'column'
        },
        // title: {
        //   text: 'Browser market shares. January, 2018'
        // },
        // subtitle: {
        //   text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        // },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category',
          title: {
            text: 'Age Band (Days)'
          }
        },
        yAxis: {
          gridLineDashStyle: 'dash',
          title: {
            text: 'Total Quantity'
          }

        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            pointWidth: 50,
            dataLabels: {
              style: {
                fontSize: "14px",
                color: this.props.colorScheme == 'dark' ? '#fff' : "#000000",
                fontFamily: 'Delivery Bold',
              },
              enabled: true,
              formatter: function () {
                return  new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                .format(this.y)    
                  //Highcharts.numberFormat(this.y,2);
            }
             // format: `{point.y} k`

            }
          },
          style: {
            fontSize: '5px'
          }
        },
        tooltip:{
            formatter:function(){
                return '<span style="color:' + this.series.color + '">' + '</span>' + ' ' 
                + this.point.name + 'Days : ' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" })
                .format(this.y) 
            }
        
        },
        // tooltip: {
        
        //   headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        //   pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>`,
        //   // pointFormatter: function () {
        //   //   return `<span style="color:${this.point.color}">${this.name}</span>: <b>${this.y}</b> of total<br/>`
        //   //   },
        // },

        series: [
          {
            name: "",
            colorByPoint: true,
            data: [
              {
                name: "0-30",
                y: 1338906,
                // drilldown: "Chrome",
                color: 'rgba(255, 204, 0,0.5)',
              },
              {
                name: "30-60",
                y: 3254075,
                // drilldown: "Firefox",
                color: 'rgba(255, 204, 0,0.5)',

              },
              {
                name: "60-90",
                y: 3589466,
                // drilldown: "Internet Explorer",
                color: 'rgba(255, 204, 0,0.5)',

              },
              {
                name: "90-120",
                y: 4482342,
                // drilldown: "Safari",
                color: 'rgba(255, 204, 0,0.5)',

              },
              {
                name: "> 120",
                y: 10487976,
                // drilldown: "Edge",
                color: '#DD0F31',//#D40511

              },

              {
                name: "Dead Stock",
                y: 214078,
                color: 'rgba(255, 204, 0,0.5)',

                // drilldown: null
              }
            ]
          }
        ],

        title: {
          text: '',
          style: {
            color: "#CCCCCC",
          }
        },


      }

    }
  }

  componentDidMount() {

  }

  // componentWillReceiveProps(nextProps) {
  //   // You don't have to do this check first, but it can help prevent an unneeded render
  //   if (nextProps.burggerTag !== this.props.burggerTag) {
  //     this.setState({ updated: nextProps.burggerTag ? "270px" : "271px" });
  //   }
  // }

  render() {
    const { options, updated } = this.state;
    const {ageBand,colorScheme}=this.props;
    console.log("selected ageband props props",ageBand)
   
    return (
      <Card className="main-card mb-3">
        <CardBody style={{ padding: 0 }}>
          <CardTitle style={{ paddingLeft: '10px', paddingTop: '10px' }}>Inventory Age Overview</CardTitle>
          <HighchartsReact
            allowChartUpdate={true}
            className={'containerChart'} highcharts={Highcharts}
            options={
              {
                ...options,
                chart: {
                  ...options.chart,
                  height: updated,
                  backgroundColor:colorScheme=='dark'?'#232526':"white"
                },
                series: [
                  {
                    ...options.series[0],
                    data: ageBand.length>0 ? ageBand.map((item,index)=>{
                      return{
                        color:  ageBand[index].age_band=='>120 Days' ?'#DD0531' :ageBand[index].age_band=='Dead Stock'?'#666666':'rgba(255, 204, 0,0.5)',
                        name: ageBand[index].age_band.replace("Days",""),
                        y:
                        ageBand[index].y
                      }
                    }):options.series[0].data
                  }
                ]
              }
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(HighBarChart);
