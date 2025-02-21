import { FcDebian } from "react-icons/fc";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = ({user}) => {
    const auth = getAuth();

    const handleLogout = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

    return (
        <div className="w-full">
           
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/addtask"}>Add Task</Link></li>      
            <li><Link to={"/manage"}>Manage Task</Link></li>
    
      </ul>
    </div>
    <div className="flex">
      <FcDebian className="text-3xl md:text-4xl lg:text-5xl mr-2" />
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif">TaskZen</h1>

      </div>    </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-lg font-bold">
    <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/addtask"}>Add Task</Link></li>       
          
            <li><Link to={"/manage"}>Manage Task</Link></li>
          
      </ul>
  </div>
  <div className="navbar-end">
    {user? (
        <button className="btn bg-pink-600 text-white" onClick={handleLogout}>
        Logout
      </button>
    ):(
        <Link to={"/login"} className="btn bg-pink-600 text-white">
            Login</Link>


    )}
  </div>
</div>
        </div>
    );
};

export default Navbar;