import {useTableContext} from "../contexts/TableContext";
import PageLink from "./PageLink";

export default function PageSwitcher() {
    const { count, limit, data } = useTableContext();
    const currentPage = Math.floor(count / limit) + 1;
    const lastPage = Math.floor(data.length / limit);
    return (
        <div>
            <PageLink isEnabled={currentPage !== 1} page={1} />
            {currentPage > 2 && <PageLink isEnabled page={currentPage - 1} />}
            {currentPage > 1 && <PageLink isEnabled={false} page={currentPage} />}
            {lastPage - currentPage > 1 && <PageLink isEnabled page={currentPage + 1} />}
            {lastPage !== 1 && currentPage !== lastPage && <PageLink isEnabled page={lastPage} />}
        </div>
    );
}
