import React from "react";
import { Doughnut } from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
        display: true,
        position:'bottom'
    },
}
};

class DoughnutExample extends React.Component {
  render() {
    return (
      <div>
        <Doughnut 
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
         width={367} height={300} 
        options={options} />
      </div>
    );
  }
}

export default DoughnutExample;
