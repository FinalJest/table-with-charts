import {IPerson} from "../types/IPerson";
import Chart from "chart.js/auto";

interface DataPoint {
    label: string;
    value: number;
    backgroundColor: string;
}

export interface ChartOfPerson {
    id: string;
    name: string;
    chartObject: Chart | null;
    getChartData(data: IPerson[]): DataPoint[];
    setChart(chart: Chart<any>): void; // decided not to fight types of this library for test task
    destroyChart(): void;
}

abstract class BaseChart implements ChartOfPerson {
    id = "base";
    name = "Base";
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

const convertMapToSortedArray = <T>(map: Map<number, T>) => Array.from(map.entries())
    .sort((a, b) => a[0] - b[0]);

const getColorFromIndex = (index: number, arrayLength: number) =>
    `rgb(${index * (255 / arrayLength)}, 0, ${255 - index * (255 / arrayLength)})`;

function genericGetChartData<T>(
    data: T[],
    getKey: (element: T) => number | undefined,
): DataPoint[] {
    let keyValueNotSetCount = 0;
    const dataList = data.reduce<Map<number, number>>((result, person) => {
        const keyValue = getKey(person);
        if (keyValue === undefined) {
            keyValueNotSetCount++;
            return result;
        }
        const currentResult = result.get(keyValue);
        const newValue = (currentResult ?? 0) + 1;
        result.set(keyValue, newValue);
        return result;
    }, new Map<number, number>());
    const result = convertMapToSortedArray(dataList);
    const dataPoints = result.map(([key, count], index) => ({
        label: `${key}`,
        value: count,
        backgroundColor: getColorFromIndex(index, result.length),
    }));
    return keyValueNotSetCount ?
        [...dataPoints, { label: "Not Assigned", value: keyValueNotSetCount, backgroundColor: "rgb(116,116,116)" }]
        : dataPoints;
}

export class YearsOfBirthChart extends BaseChart {
    id = "yearsOfBirth";
    name = "Years Of Birth";
    getChartData(data: IPerson[]): DataPoint[] {
        return genericGetChartData(
            data,
            (person) => {
                const year = person.dateOfBirth.getFullYear();
                return year - year % 10;
            },
        ).map((dataPoint) => ({ ...dataPoint, label: `${dataPoint.label}s` }));
    };
}

export class SalaryChart extends BaseChart {
    id = "salary";
    name = "Rounded Salary";
    getChartData(data: IPerson[]) {
        return genericGetChartData(data, (person) =>
            person.salary && (Math.round(person.salary / 10000) * 10000)
        );
    }
}

export class YearsOfExperienceChart extends BaseChart {
    id = "yearsOfExperience";
    name = "Years Of Experience";
    getChartData(data: IPerson[]): DataPoint[] {
        return genericGetChartData(data, (person) =>
            person.yearsOfExperience && Math.round(person.yearsOfExperience)
        );
    }
}

export class AverageSalaryPerYearsOfExperienceChart extends BaseChart {
    id = "averageSalaryPerYOE";
    name = "Average Salary Per Years of Experience";
    getChartData(data: IPerson[]): DataPoint[] {
        type DataMap = Map<number, { total: number, count: number }>;
        function fillDataMap(result: DataMap, person: IPerson) {
            if (person.salary === undefined || person.yearsOfExperience === undefined) {
                return result;
            }
            const roundedYearsOfExperience = Math.round(person.yearsOfExperience);
            const previousValue = result.get(roundedYearsOfExperience);
            if (previousValue) {
                result.set(
                    roundedYearsOfExperience,
                    { total: previousValue.total + person.salary, count: previousValue.count + 1 },
                );
            } else {
                result.set(
                    roundedYearsOfExperience,
                    { total: person.salary, count: 1 },
                );
            }
            return result;
        }
        const dataMap = data.reduce<DataMap>(fillDataMap, new Map());
        const sortedDataArray = convertMapToSortedArray(dataMap);
        return sortedDataArray.map(([years, salaryResult], index) => ({
            label: `${years}`,
            value: Math.round(salaryResult.total / salaryResult.count),
            backgroundColor: getColorFromIndex(index, sortedDataArray.length),
        }));
    }
}
