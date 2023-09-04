import React from "react";
import "./FilterInput.css";

interface FilterInputProps {
    updateFilter: (newFilter: string) => void;
}

export default function FilterInput(props: FilterInputProps) {
    const filterInput = React.useRef<HTMLInputElement>(null);
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (filterInput.current) {
            props.updateFilter(filterInput.current.value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="FilterContainer">
            <div>Filter Input:</div>
            <input ref={filterInput} type="text" />
            <button>Apply</button>
        </form>
    );
}
