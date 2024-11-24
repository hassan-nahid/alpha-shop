import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../provider/userProvider";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, clearUserData } = useUser();



    const handleLogout = () => {
        localStorage.removeItem("token");
        clearUserData("user");
        navigate("/login");
    };

    const liTag = (
        <>
            <li>
                <Link to="/" className="text-white font-semibold">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/products" className="text-white font-semibold">
                    Products
                </Link>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-primary">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu bg-primary menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {liTag}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl text-white">Alpha Shop</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{liTag}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="flex gap-1">
                            <button
                                onClick={handleLogout}
                                className="btn btn-ghost bg-primary text-white border-1 border-white hover:border-1 hover:border-white">
                                Logout
                            </button>
                            <img className="rounded-full w-12 h-12" title={user?.email} src="/user.jpg" alt="" />
                        </div>

                    ) : (
                        <Link
                            to="/login"
                            className="btn btn-ghost bg-primary text-white border-1 border-white hover:border-1 hover:border-white">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
