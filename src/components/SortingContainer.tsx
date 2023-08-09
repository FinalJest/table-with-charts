import SortingSelect from "./SortingSelect";
import React from "react";
import {PersonSortingOption, SortByDOB, SortById, SortByIncome, SortByIndustry} from "../services/sortingService";
import {IPerson} from "../types/IPerson";
import OrderButton from "./OrderButton";

const sortingOptions: PersonSortingOption[] = [
    new SortById(),
    new SortByDOB(),
    new SortByIncome(),
    new SortByIndustry(),
];

// There is a lot of entanglement to IPerson interface in this code, for larger project deeper abstraction needed
interface SortingContainerProps {
    data: IPerson[];
    onDataSorted(newData: IPerson[]): void;
}

export default function SortingContainer(props: SortingContainerProps) {
    const [isDescending, setIsDescending] = React.useState(false);
    const [currentSortingOption, setCurrentSortingOption] = React.useState(sortingOptions[0]);
    const sortTable = (sortingOption: PersonSortingOption, currentIsDescending: boolean) => {
        // Sadly .toSorted is not supported in Node yet
        const newData = [...props.data].sort((a, b) =>
            sortingOption.sortFunction(a, b, currentIsDescending));
        props.onDataSorted(newData);
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
