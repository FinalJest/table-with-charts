import SortingContainer from "./SortingContainer";
import PageItemCountSelect from "./PageItemCountSelect";
import FilterInput from "./FilterInput";
import {useTableContext} from "../contexts/TableContext";
import Header from "./Header";

export default function TableHeader() {
    const { updateFilter } = useTableContext(); // Passing through props since FilterInput is common component
    return (
        <Header>
            <SortingContainer />
            <PageItemCountSelect />
            <FilterInput updateFilter={updateFilter} />
        </Header>
    );
}
