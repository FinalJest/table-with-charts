import {Link} from "react-router-dom";

export default function Root() {
    return (
        <div className="Home">
            <Link to="table">Table</Link>
            <Link to="chart">Chart</Link>
        </div>
    );
}
