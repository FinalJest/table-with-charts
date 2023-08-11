import SortingContainer from "./SortingContainer";
import PageItemCountSelect from "./PageItemCountSelect";
import "./TableHeader.css";

export default function TableHeader() {
    return (
        <div className="TableHeader">
            <SortingContainer />
            <PageItemCountSelect />
        </div>
    );
}
