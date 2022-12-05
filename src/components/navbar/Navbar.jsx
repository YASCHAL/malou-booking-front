import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { user } = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const goToRegisterPage = () => {
    navigate("/register");
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo"> MalooBooking </span>
        </Link>
        {user ? (
          <>
            
            <div className="navItems">
              <img src={user.img} alt="" />
              <span> {user.username} </span>
              <button onClick={logout}>Logout</button>
              <FontAwesomeIcon
                className="logout"
                icon={faArrowRightFromBracket}
              />
            </div>
          </>
        ) : (
          <div>
            <button onClick={goToRegisterPage} className="navButton">
              Sign up
            </button>
            <button onClick={handleClick} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
