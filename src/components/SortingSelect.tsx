import {PersonSortingOption} from "../services/sortingService";
import Select from "./Select";

interface SortingSelectProps {
    options: PersonSortingOption[];
    onChange(newValue: PersonSortingOption["value"]): void;
}

export default function SortingSelect(props: SortingSelectProps) {
    return (
        <Select<PersonSortingOption, PersonSortingOption["value"]>
            options={props.options}
            onChange={props.onChange}
            getValueFromOption={(option) => option.value}
        />
    )
}
