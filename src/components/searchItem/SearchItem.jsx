import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dates, setDates] = useState(location.state.dates);
  const { dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);


  const handleClick = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
      navigate(`/hotels/${item._id}`);
  };
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle" onClick={handleClick}>{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">free airport taxi</span>
        <span className="siSubtitle">
          Studio apartment with air conditioning
        </span>
        <span className="siFeatures">{item.title}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later so lock in this great price today
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}

        <div className="siDetailsTexts">
          <span className="siPrice">$ {item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
           <div className="siCheck">
          <button onClick={handleClick} className="siCheckButton">
            See availability
          </button>
           </div>

        </div>
      </div>
    </div>
  );
};

export default SearchItem;
