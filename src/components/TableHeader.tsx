import SortingContainer from "./SortingContainer";
import PageItemCountSelect from "./PageItemCountSelect";
import "./TableHeader.css";
import FilterInput from "./FilterInput";
import {useTableContext} from "../contexts/TableContext";

export default function TableHeader() {
    const { updateFilter } = useTableContext(); // Passing through props since FilterInput is common component
    return (
        <div className="TableHeader">
            <SortingContainer />
            <PageItemCountSelect />
            <FilterInput updateFilter={updateFilter} />
        </div>
    );
}
