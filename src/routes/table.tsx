import React from "react";
import {IPerson} from "../types/IPerson";
import DataTable from "../components/DataTable";
import TableHeader from "../components/TableHeader";
import {DEFAULT_ITEM_PER_PAGE_COUNT} from "../services/pagingService";
import {requestData} from "../services/requestService";
import {TableContext} from "../contexts/TableContext";
import PageSwitcher from "../components/PageSwitcher";

export default function Table() {
    const [data, setData] = React.useState<IPerson[]>([]);
    const [visibleData, setVisibleData] = React.useState<IPerson[]>([]);
    const [count, setCount] = React.useState(0);
    const [limit, setLimit] = React.useState(DEFAULT_ITEM_PER_PAGE_COUNT);
    React.useEffect(() => {
        requestData().then((newData) => {
            setData(newData);
            // This is a bit unflexible in case we need to do re-request but should be fine with our constraints
            setVisibleData(newData.slice(0, DEFAULT_ITEM_PER_PAGE_COUNT));
        });
    }, []);
    const handleSetLimit = React.useCallback((newLimit: number) => {
        setLimit(newLimit);
        setCount(Math.floor(count / newLimit) * newLimit);
    }, [count]);
    const context = React.useMemo(() => {
        return {
            data,
            updateData: setData,
            count,
            updateCount: setCount,
            limit,
            updateLimit: handleSetLimit,
        };
    }, [data, count, limit, handleSetLimit]);
    React.useEffect(() => {
        setVisibleData(data.slice(count, count + limit));
    }, [data, count, limit]);

    return (
        <TableContext.Provider value={context}>
            <div>
                <TableHeader />
                <DataTable data={visibleData} />
                <PageSwitcher />
            </div>
        </TableContext.Provider>
    );
}
