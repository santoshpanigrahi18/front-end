import React, { Component } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_continentsLow from "@amcharts/amcharts5-geodata/continentsLow";
import { connect } from 'react-redux';

var root = null;
class AmMapcharts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orignalData: [],
    }
  }

  componentDidMount() {
    this.filterDataQuantity(this.props.tableData);
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.tableData !== this.props.tableData) {
      root.dispose();
      this.filterDataQuantity(nextProps.tableData);
    }
  }

  filterDataQuantity = (tableData) => {
    // let uniqueObjArray = [...new Map(tableData.map((item) => [item["LATITUDE"],item["LONGITUDE"], item])).values()];
    // let uniqueObjArray = tableData.map((item)=>item.LATITUDE)
    let uniqueObjArray = [...new Map(tableData.map((item) => [item["latitude", "longitude"], item])).values()];


    const orignalData = uniqueObjArray.map((item) => {
      let datafilter = tableData.reduce((accumulator, { latitude, longitude, sum_ib_qty }) =>
        accumulator + parseInt(latitude == item.latitude && longitude == item.longitude ? sum_ib_qty == null ? 0 : sum_ib_qty : 0)
        , 0)

      return {
        title: item.warehouse,
        latitude: item.latitude,
        longitude: item.longitude,
        value: datafilter
      }
    })
    let filterZeroQuA = orignalData.filter((item) => item.value !== 0)


    this.setState({ orignalData: filterZeroQuA }, () => {
      this.graphDataCall(filterZeroQuA)
    });
  }


  graphDataCall = (graphPassedValue) => {

    am5.ready(function () {

      // Create root and chart
      root = am5.Root.new("chartdiv", {
        "hideCredits": true,
      });

      // Set themes
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
      // root.logo = true;
      // ====================================
      // Create map
      // ====================================

      var map = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "none",
          projection: am5map.geoNaturalEarth1(),
          homeZoomLevel: 4.5,
          homeGeoPoint: 
          { longitude: graphPassedValue[0].longitude, latitude: graphPassedValue[0].latitude }
        })
      );

      // map.logo.disabled = true;
      // map.set("zoomControl", am5map.ZoomControl.new(root, {}));

      // Set clicking on "water" to zoom out
      // map.chartContainer.get("background").events.on("click", function () {
      //     map.goHome();
      // })
      //     // Add zoom control
      // // https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
      // map.set("zoomControl", am5map.ZoomControl.new(root, {}));


      // Create polygon series
      var polygonSeries = map.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_continentsLow,
          exclude: ["antarctica"],
          fill: am5.color(0xbbbbbb)
        })
      );
     

      var pointSeries = map.series.push(
        am5map.MapPointSeries.new(root, {})
      );

      var colorSet = am5.ColorSet.new(root, { step: 2 });
      // pointSeries.tooltip.autoTextColor = false;
      // pointSeries.tooltip.label.fill = am5.color("#000000");
      // pointSeries.tooltipText = "tip";
      pointSeries.bullets.push(function (root, series, dataItem) {
        var value = dataItem.dataContext.value;
        var title = dataItem.dataContext.title;
        // var warehouse_address = dataItem.dataContext.warehouse_address;
        // console.log("dataItem",dataItem)



        var container = am5.Container.new(root, {});
        var color = colorSet.next();
        console.log("print colour set in data", color)
        var radius = 15 + value / 200;
        var circle = container.children.push(am5.Circle.new(root, {
          radius: radius,
          fill: 'rgba(255, 204, 0,0.7)',
          stroke: am5.color(0x000000),
          strokeWidth: 0.2,
          dy: -radius * 2,
          tooltipText: "Quantity : {value}\nWarehouse: {title}",
        }))

        return am5.Bullet.new(root, {
          sprite: container
        });
      });

      for (var i = 0; i < graphPassedValue.length; i++) {
        var d = graphPassedValue[i];
        pointSeries.data.push({
          geometry: { type: "Point", coordinates: [d.longitude, d.latitude] },
          title: d.title,
          value: d.value,
          // warehouse_address:d.warehouse_address
        });
      }
      polygonSeries.events.on("datavalidated", function () {
        map.goHome();
        // map.geoCentroid()
      });
    });
  }

  render() {
    const {colorScheme}=this.props;
    return (
      <div>
        <div id="chartdiv" style={{ width: "100%", height: "260px" }}>
        </div>
        <div style={{
          height: '22px', width: '60px', 
          backgroundColor:colorScheme =='dark'?"#232526":"white",
           position:
            'absolute', bottom: 0, marginBottom: '18px'
        }}></div>
      </div>
    )
  }
}

// export default AmMapcharts
const mapStateToProps = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AmMapcharts);
