import { Link, useNavigate } from "react-router-dom";
import "./mailList.css";

const MailList = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };
  return (
      
      <div className="mail">
        

        <p className="mailTitle">Save time, save money !</p>
        <span className="mailDesc">
          Sign up and we'll send the best deals to you{" "}
        </span>
        <div className="mailInputContainer">
          <input type="text" placeholder="Your E-mail Here..." />
          <button onClick={handleClick}>Subscribe!</button>
        </div>
        <div className="ajouter">
          <button>Ajouter votre établissement</button>
        </div>
        <div className="liens">
          <div className="licontainer">
            <Link className="li">Version mobile</Link>
            <Link className="li">Gerer vos réservations</Link>
            <Link className="li">Aide du service clients</Link>
            <Link className="li">Devenir affilié</Link>
            <Link className="li">MalouBooking.com Business</Link>
          </div>
        </div>
        </div>
      
    
  );
};

export default MailList;
