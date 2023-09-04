import {ChartType} from "chart.js";
import Select from "./Select";

interface ChartTypeSelectProps {
    options: ChartType[];
    onChange(newValue: ChartType): void;
}

export default function ChartTypeSelect(props: ChartTypeSelectProps) {
    return (
        <Select<ChartType, ChartType>
            options={props.options}
            onChange={props.onChange}
            getValueFromOption={(option) => option}
            getTextFromOption={(option) => `${option[0].toUpperCase()}${option.slice(1)}`}
        />
    );
}
