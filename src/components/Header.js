import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="navbar bg-primary text-primary-content">
            <Link to="/">
                <button className="btn btn-ghost text-lg lg:text-xl">모버파</button>
            </Link>
        </div>
    )
};

export default Header;
