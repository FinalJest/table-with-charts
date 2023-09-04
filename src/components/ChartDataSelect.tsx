import {ChartOfPerson} from "../services/chartService";
import Select from "./Select";

interface ChartDataSelectProps {
    options: ChartOfPerson[];
    onChange(newValue: ChartOfPerson["id"]): void;
}

export default function ChartDataSelect(props: ChartDataSelectProps) {
    return (
        <Select<ChartOfPerson, ChartOfPerson["id"]>
            options={props.options}
            onChange={props.onChange}
            getValueFromOption={(option) => option.id}
            getTextFromOption={(option) => option.name}
        />
    );
}
