import {IPerson} from "../types/IPerson";
import React from "react";

interface ITableContext {
    data: IPerson[];
    updateData(newData: IPerson[]): void;
    count: number;
    updateCount(newCount: number): void;
    limit: number;
    updateLimit(newLimit: number): void;
    filter: string;
    updateFilter(newFilter: string): void;
}

const initialContextValue: ITableContext = {
    data: [],
    updateData: () => {},
    count: 0,
    updateCount: () => {},
    limit: 0,
    updateLimit: () => {},
    filter: "",
    updateFilter: () => {},
};

export const TableContext = React.createContext<ITableContext>(initialContextValue);

export const useTableContext = () => React.useContext(TableContext);
