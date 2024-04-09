import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";

function CreateChart(props: { chartData: any }) {

  const chartData = props.chartData;

  if(Object.keys(props).length === 0 || Object.keys(chartData).length === 0){
    return (
    <><div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-2" role="alert">
    <strong className="font-bold">Invalid parameter!</strong>
  </div></>);
  }
  let color = Highcharts.getOptions().colors?.[0];
  if (color === undefined) {
    color = "#0F0";
  }
  let options = {
    chart: {
      zoomType: "x",
    },

    title: {
      text: "Hourly Weather",
      align: "left",
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in",
      align: "left",
    },
    xAxis: {
      type: "DateTime",
      labels: {
        style: {
          color: "#ccc",
          fontSize: "0.6em",
        },
        enabled: true,
      },
    },
    yAxis: {
      title: {
        text: "Temperature",
      },
      labels: {
        style: {
          color: "#ccc",
          fontSize: "0.7em",
        },
      },
    },
    rangeSelector: {
      enabled: true,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).setOpacity(0).get("rgba")],
          ],
        },

        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
      },
    },

    series: [
      {
        type: "area",
        name: "Hourly Weather",
        data: chartData,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default CreateChart;
