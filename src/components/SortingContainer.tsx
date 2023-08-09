import SortingSelect from "./SortingSelect";
import React from "react";
import {PersonSortingOption, SortByDOB, SortById, SortByIncome, SortByIndustry} from "../services/sortingService";
import OrderButton from "./OrderButton";
import {useTableContext} from "../contexts/TableContext";

const sortingOptions: PersonSortingOption[] = [
    new SortById(),
    new SortByDOB(),
    new SortByIncome(),
    new SortByIndustry(),
];

export default function SortingContainer() {
    const { data, updateData } = useTableContext();
    const [isDescending, setIsDescending] = React.useState(false);
    const [currentSortingOption, setCurrentSortingOption] = React.useState(sortingOptions[0]);
    const sortTable = (sortingOption: PersonSortingOption, currentIsDescending: boolean) => {
        // Sadly .toSorted is not supported in Node yet
        const newData = [...data].sort((a, b) =>
            sortingOption.sortFunction(a, b, currentIsDescending));
        updateData(newData);
        setCurrentSortingOption(sortingOption);
    }
    const handleSortingOptionChange = (newValue: PersonSortingOption["value"]) => {
        const newSortingOption = sortingOptions.find((option) => option.value === newValue);
        if (newSortingOption) {
            sortTable(newSortingOption, isDescending);
        }
    };
    const handleOrderToggle = () => {
        const newIsDescending = !isDescending;
        setIsDescending(newIsDescending);
        sortTable(currentSortingOption, newIsDescending);
    };
    return (
        <div>
            <SortingSelect options={sortingOptions} onChange={handleSortingOptionChange} />
            <OrderButton isDescending={isDescending} onClick={handleOrderToggle} />
        </div>
    );
}
