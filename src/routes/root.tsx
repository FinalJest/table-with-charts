import {Link} from "react-router-dom";

export default function Root() {
    return (
        <div className="Home">
            <h1>
                List of Contents
            </h1>
            <ul>
                <li><Link to="table">Table</Link></li>
                <li><Link to="chart">Chart</Link></li>
            </ul>
        </div>
    );
}
