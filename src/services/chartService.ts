import {IPerson} from "../types/IPerson";
import Chart from "chart.js/auto";

interface DataPoint {
    label: string;
    value: number;
    backgroundColor: string;
}

export interface ChartOfPerson {
    id: string;
    chartObject: Chart | null;
    getChartData(data: IPerson[]): DataPoint[];
    setChart(chart: Chart<any>): void; // decided not to fight types of this library for test task
    destroyChart(): void;
}

abstract class BaseChart implements ChartOfPerson {
    id = "base";
    chartObject: Chart | null = null;
    getChartData(data: IPerson[]): DataPoint[] {
        return [];
    }
    setChart(chart: Chart<any>) {
        this.chartObject = chart;
    }
    destroyChart() {
        this.chartObject?.destroy();
    }
}

const getDecadeFromLabel = (label: string) => label.slice(0, 3);

export class YearsOfBirthChart extends BaseChart {
    id = "yearsOfBirth";
    getChartData(data: IPerson[]): DataPoint[] {
        const result: DataPoint[] = [
            { label: "1960s", value: 0, backgroundColor: "rgb(255, 99, 132)" },
            { label: "1970s", value: 0, backgroundColor: "rgb(54, 162, 235)" },
            { label: "1980s", value: 0, backgroundColor: "rgb(255, 205, 86)" },
            { label: "1990s", value: 0, backgroundColor: "rgb(52,179,37)" },
        ];
        let othersCount = 0;
        data.forEach((person) => {
            const personsDataPoint = result.find((dataPoint) => {
                const decade = getDecadeFromLabel(dataPoint.label);
                return `${person.dateOfBirth.getFullYear()}`.startsWith(decade);
            });
            if (personsDataPoint) {
                personsDataPoint.value++;
            } else {
                othersCount++;
            }
        });
        return [
            ...result,
            { label: "Other", value: othersCount, backgroundColor: "rgb(116,116,116)" },
        ].filter((dataPoint) => dataPoint.value > 0);
    };
}

function increaseValueOfPoint(label: string, result: DataPoint[]) {
    const point = result.find((point) => point.label === label);
    if (point) {
        point.value++;
    }
}

export class SalaryChart extends BaseChart {
    id = "salary";
    getChartData(data: IPerson[]): DataPoint[] {
        const result: DataPoint[] = [
            { label: "<40k", value: 0, backgroundColor: "rgb(255, 99, 132)" },
            { label: "40k - 79k", value: 0, backgroundColor: "rgb(54, 162, 235)" },
            { label: "80k - 119k", value: 0, backgroundColor: "rgb(255, 205, 86)" },
            { label: ">120k", value: 0, backgroundColor: "rgb(52,179,37)" },
            { label: "None", value: 0, backgroundColor: "rgb(116,116,116)" },
        ];
        // Has to be a better way to organize it
        data.forEach((person) => {
            if (person.salary === undefined) {
                increaseValueOfPoint("None", result);
                return;
            }
            if (person.salary < 40000) {
                increaseValueOfPoint("<40k", result);
                return;
            }
            if (person.salary < 80000) {
                increaseValueOfPoint("40k - 79k", result);
                return;
            }
            if (person.salary < 120000) {
                increaseValueOfPoint("80k - 119k", result);
                return;
            }
            increaseValueOfPoint(">120k", result);
        });
        return result;
    }
}

export class YearsOfExperienceChart extends BaseChart {
    id = "yearsOfExperience";
    getChartData(data: IPerson[]): DataPoint[] {
        const result: DataPoint[] = [
            { label: "<2", value: 0, backgroundColor: "rgb(255, 99, 132)" },
            { label: "2-4", value: 0, backgroundColor: "rgb(54, 162, 235)" },
            { label: "4-6", value: 0, backgroundColor: "rgb(255, 205, 86)" },
            { label: ">6", value: 0, backgroundColor: "rgb(52,179,37)" },
            { label: "None", value: 0, backgroundColor: "rgb(116,116,116)" },
        ];
        data.forEach((person) => {
            if (person.yearsOfExperience === undefined) {
                increaseValueOfPoint("None", result);
                return;
            }
            if (person.yearsOfExperience < 2) {
                increaseValueOfPoint("<2", result);
                return;
            }
            if (person.yearsOfExperience < 4) {
                increaseValueOfPoint("2-4", result);
                return;
            }
            if (person.yearsOfExperience < 6) {
                increaseValueOfPoint("4-6", result);
                return;
            }
            increaseValueOfPoint(">6", result);
        });
        return result;
    }
}
