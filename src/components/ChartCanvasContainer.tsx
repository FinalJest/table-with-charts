import React from "react";
import "./ChartCanvasContainer.css";
import {ChartOfPerson} from "../services/chartService";
import {IPerson} from "../types/IPerson";
import Chart from "chart.js/auto";
import {ChartType} from "chart.js";

interface ChartCanvasContainerProps {
    chart: ChartOfPerson;
    data: IPerson[];
    type: ChartType;
}

export default function ChartCanvasContainer({ data, chart, type }: ChartCanvasContainerProps) {
    const chartRef = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        const chartElement = chartRef.current;
        if (data.length && chartElement) {
            chart.destroyChart();
            const chartData = chart.getChartData(data);
            chart.setChart(new Chart(
                chartElement,
                {
                    type,
                    data: {
                        labels: chartData.map((dataPoint) => dataPoint.label),
                        datasets: [{
                            label: chart.name,
                            data: chartData.map((dataPoint) => dataPoint.value),
                            backgroundColor: chartData.map((dataPoint) => dataPoint.backgroundColor),
                            hoverOffset: 4
                        }]
                    },
                }
            ));
        }
    }, [data, chart, type]);
    return (
        <div className="ChartContainer">
            <canvas ref={chartRef} />
        </div>
    )
}
