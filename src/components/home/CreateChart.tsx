import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import React from "react";

export interface CreateChartProps {
  chartData: Array<Number>;
}

export function CreateChart({ chartData }: CreateChartProps) {
  let color = Highcharts.getOptions().colors?.[0];
  if (color === undefined) {
    color = "#00f";
  }
  const chartOptions = {
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

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
