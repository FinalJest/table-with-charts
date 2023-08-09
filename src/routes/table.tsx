import React from "react";
import {IPerson} from "../types/IPerson";
import {requestData} from "../services/requestService";
import DataTable from "../components/DataTable";
import SortingContainer from "../components/SortingContainer";

export default function Table() {
    const [data, setData] = React.useState<IPerson[]>([]);
    React.useEffect(() => {
        requestData().then((newData) => {
            setData(newData);
        });
    }, []);
    const handleDataSorted = (newData: IPerson[]) => {
        setData(newData);
    };

    return (
        <div>
            <SortingContainer data={data} onDataSorted={handleDataSorted} />
            <DataTable data={data} />
        </div>
    );
}
