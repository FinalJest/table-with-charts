import {useTableContext} from "../contexts/TableContext";
import React from "react";
import "./FilterInput.css";

export default function FilterInput() {
    const { updateFilter } = useTableContext();
    const filterInput = React.useRef<HTMLInputElement>(null);
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (filterInput.current) {
            updateFilter(filterInput.current.value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="FilterContainer">
            <input ref={filterInput} type="text" />
            <button>Apply</button>
        </form>
    );
}
