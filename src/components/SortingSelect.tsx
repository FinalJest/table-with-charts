import {ChangeEventHandler} from "react";
import {PersonSortingOption} from "../services/sortingService";

interface SortingSelectProps {
    options: PersonSortingOption[];
    onChange(newValue: PersonSortingOption["value"]): void;
}

export default function SortingSelect(props: SortingSelectProps) {
    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        props.onChange(event.target.value);
    };
    return (
        <select onChange={handleChange}>
            {props.options.map((option) =>
                <option key={option.value} value={option.value}>{option.text}</option> )}
        </select>
    );
}
