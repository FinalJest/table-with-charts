import {ChangeEventHandler} from "react";

interface SelectProps<OptionType, ChangeValueType extends string> {
    options: OptionType[];
    onChange(newValue: ChangeValueType): void;
    getValueFromOption(option: OptionType): ChangeValueType;
    getTextFromOption(option: OptionType): string;
}

export default function Select<OptionType, ChangeValueType extends string>(
    props: SelectProps<OptionType, ChangeValueType>
) {
    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        props.onChange(event.target.value as ChangeValueType);
    };
    return (
        <select onChange={handleChange}>
            {props.options.map((option) => {
                const value = props.getValueFromOption(option);
                return <option key={value} value={value}>{props.getTextFromOption(option)}</option>;
            })}
        </select>
    )
}
