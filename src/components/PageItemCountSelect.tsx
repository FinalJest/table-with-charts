import {useTableContext} from "../contexts/TableContext";
import {ChangeEventHandler} from "react";
import {DEFAULT_ITEM_PER_PAGE_COUNT} from "../services/pagingService";

const OPTIONS = [5, 10, 20, 50];

export default function PageItemCountSelect() {
    const { updateLimit } = useTableContext();
    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        updateLimit(Number(event.target.value));
    };

    return (
        <select onChange={handleChange} defaultValue={DEFAULT_ITEM_PER_PAGE_COUNT}>
            {OPTIONS.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
    );
}
