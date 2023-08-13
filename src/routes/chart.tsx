import React from "react";
import {IPerson} from "../types/IPerson";
import {requestData} from "../services/requestService";
import {ChartOfPerson, SalaryChart, YearsOfBirthChart, YearsOfExperienceChart} from "../services/chartService";
import ChartCanvasContainer from "../components/ChartCanvasContainer";
import ChartDataSelect from "../components/ChartDataSelect";
import {ChartType} from "chart.js";
import ChartTypeSelect from "../components/ChartTypeSelect";
import {getFullName} from "../services/personService";
import FilterInput from "../components/FilterInput";
import {Link} from "react-router-dom";

const CHART_OPTIONS = [
    new YearsOfBirthChart(),
    new SalaryChart(),
    new YearsOfExperienceChart(),
];

const CHART_TYPES: ChartType[] = [
    "pie",
    "bar",
]

export default function ChartPage() {
    const [data, setData] = React.useState<IPerson[]>([]);
    const [chart, setChart] = React.useState<ChartOfPerson>(CHART_OPTIONS[0]);
    const [type, setType] = React.useState<ChartType>("pie");
    const [filter, setFilter] = React.useState("");
    React.useEffect(() => {
        requestData().then((newData) => {
            setData(newData);
        });
    }, []);
    const handleChangeChartData = (id: string) => {
        const newOption = CHART_OPTIONS.find((option) => option.id === id);
        if (newOption) {
            chart.destroyChart();
            setChart(newOption);
        }
    };
    const handleChangeChartType = (newChartType: ChartType) => {
        chart.destroyChart();
        setType(newChartType);
    };
    const filteredData = data.filter((person) => getFullName(person).includes(filter));
    return (
        <div>
            <Link to="/">Home</Link>
            <div>
                <ChartDataSelect options={CHART_OPTIONS} onChange={handleChangeChartData} />
                <ChartTypeSelect options={CHART_TYPES} onChange={handleChangeChartType} />
                <FilterInput updateFilter={setFilter} />
            </div>
            <ChartCanvasContainer chart={chart} data={filteredData} type={type} />
        </div>
    );
}
