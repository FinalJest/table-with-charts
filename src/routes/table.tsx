import React from "react";
import {IPerson} from "../types/IPerson";
import DataTable from "../components/DataTable";
import TableHeader from "../components/TableHeader";
import {DEFAULT_ITEM_PER_PAGE_COUNT} from "../services/pagingService";
import {requestData} from "../services/requestService";
import {ITableContext, TableContext} from "../contexts/TableContext";
import PageSwitcher from "../components/PageSwitcher";
import {getFullName} from "../services/personService";
import {Link} from "react-router-dom";

export function getFilteredData(data: IPerson[], filter: string): IPerson[] {
    return data.filter((person) => getFullName(person).includes(filter.toLowerCase()));
}

function getVisibleData(data: IPerson[], count: number, limit: number): IPerson[] {
    return data.slice(count, count + limit);
}

export default function Table() {
    const [data, setData] = React.useState<IPerson[]>([]);
    const [count, setCount] = React.useState<number>(0);
    const [limit, setLimit] = React.useState<number>(DEFAULT_ITEM_PER_PAGE_COUNT);
    const [filter, setFilter] = React.useState<string>("");
    React.useEffect(() => {
        requestData().then((newData) => {
            setData(newData);
        });
    }, []);
    const context: ITableContext = React.useMemo(() => {
        return {
            data,
            count,
            limit,
            filter,
            updateData: (newData) => {
                setData(newData);
            },
            updateCount: (newCount) => {
                setCount(newCount);
            },
            updateLimit: (newLimit) => {
                const newCount = Math.floor(count / newLimit) * newLimit;
                setLimit(newLimit);
                setCount(newCount);
            },
            updateFilter: (newFilter) => {
                setFilter(newFilter);
                setCount(0);
            },
        };
    }, [data, count, limit, filter]);

    const filteredData = getFilteredData(data, filter);
    const visibleData = getVisibleData(filteredData, count, limit);

    return (
        <TableContext.Provider value={context}>
            <div>
                <Link to="/">Home</Link>
                <TableHeader />
                <DataTable data={visibleData} />
                <PageSwitcher visibleDataLength={filteredData.length} />
            </div>
        </TableContext.Provider>
    );
}
