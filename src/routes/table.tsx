import React from "react";
import {IPerson} from "../types/IPerson";
import DataTable from "../components/DataTable";
import TableHeader from "../components/TableHeader";
import {DEFAULT_ITEM_PER_PAGE_COUNT} from "../services/pagingService";
import {requestData} from "../services/requestService";
import {TableContext} from "../contexts/TableContext";
import PageSwitcher from "../components/PageSwitcher";
import {getFullName} from "../services/personService";

interface TableState {
    data: IPerson[];
    count: number;
    limit: number;
    filter: string;
}

const initialState: TableState = {
    data: [],
    count: 0,
    limit: DEFAULT_ITEM_PER_PAGE_COUNT,
    filter: "",
};

type TableAction = { type: "SET_DATA", value: IPerson[]; }
    | { type: "SET_COUNT", value: number }
    | { type: "SET_LIMIT", value: number }
    | { type: "SET_FILTER", value: string };

export function getFilteredData(data: IPerson[], filter: string): IPerson[] {
    return data.filter((person) => getFullName(person).includes(filter.toLowerCase()));
}

function getVisibleData(data: IPerson[], count: number, limit: number): IPerson[] {
    return data.slice(count, count + limit);
}

function reducer(state: TableState, action: TableAction): TableState {
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                data: action.value,
            };
        case "SET_COUNT":
            return {
                ...state,
                count: action.value,
            };
        case "SET_LIMIT": {
            const newCount = Math.floor(state.count / action.value) * action.value
            return {
                ...state,
                limit: action.value,
                count: newCount,
            }
        }
        case "SET_FILTER":
            return {
                ...state,
                filter: action.value,
                count: 0,
            }
        default:
            return state;
    }
}

export default function Table() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
        requestData().then((newData) => {
            dispatch({ type: "SET_DATA", value: newData });
        });
    }, []);
    // Don't like this boilerplate, would probably be replaced by Redux in larger app
    const handlers = React.useMemo(() => {
        const setDataAction = (newData: IPerson[]) => dispatch({ type: "SET_DATA", value: newData });
        const setCountAction = (newCount: number) => dispatch({ type: "SET_COUNT", value: newCount });
        const setLimitAction = (newLimit: number) => dispatch({ type: "SET_LIMIT", value: newLimit });
        const setFilterAction = (newFilter: string) => dispatch({ type: "SET_FILTER", value: newFilter });
        return {
            setDataAction,
            setCountAction,
            setLimitAction,
            setFilterAction,
        };
    }, []);
    const context = React.useMemo(() => {
        return {
            ...state,
            updateData: handlers.setDataAction,
            updateCount: handlers.setCountAction,
            updateLimit: handlers.setLimitAction,
            updateFilter: handlers.setFilterAction,
        };
    }, [state, handlers]);

    const filteredData = getFilteredData(state.data, state.filter);
    const visibleData = getVisibleData(filteredData, state.count, state.limit);

    return (
        <TableContext.Provider value={context}>
            <div>
                <TableHeader />
                <DataTable data={visibleData} />
                <PageSwitcher visibleDataLength={filteredData.length} />
            </div>
        </TableContext.Provider>
    );
}
