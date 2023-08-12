import {useTableContext} from "../contexts/TableContext";
import PageLink from "./PageLink";

interface PageSwitcherProps {
    visibleDataLength: number;
}

export default function PageSwitcher(props: PageSwitcherProps) {
    const { count, limit } = useTableContext();
    const currentPage = Math.floor(count / limit) + 1;
    const lastPage = Math.floor(props.visibleDataLength / limit);

    if (lastPage === 0) {
        return null;
    }

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
