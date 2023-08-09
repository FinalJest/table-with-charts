import {useTableContext} from "../contexts/TableContext";

interface PageLinkProps {
    isEnabled: boolean;
    page: number;
}

export default function PageLink(props: PageLinkProps) {
    const { updateCount, limit } = useTableContext();
    const handleLinkClick = () => {
        updateCount((props.page - 1) * limit);
    };
    return (
        <button onClick={handleLinkClick} disabled={!props.isEnabled}>{props.page}</button>
    );
}
