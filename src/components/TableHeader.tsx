import SortingContainer from "./SortingContainer";
import PageItemCountSelect from "./PageItemCountSelect";
import "./TableHeader.css";
import FilterInput from "./FilterInput";

export default function TableHeader() {
    return (
        <div className="TableHeader">
            <SortingContainer />
            <PageItemCountSelect />
            <FilterInput />
        </div>
    );
}
