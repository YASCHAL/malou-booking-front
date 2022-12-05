import "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import MailList from "../../components/mail/MailList";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faPerson } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer/Footer";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [openOptions, setOpenOptions] = useState(false);

  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();

  const { data, loading, reFetch } = useFetch(
    `/hotels?city=${destination}&max=${max || 999}&min=${min || 0}`
  );

  const handleClick = () => {
    reFetch();
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listPage">
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label htmlFor="">Destination</label>
                <div className="lsIt">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <input
                    onChange={(e) =>
                      setDestination(e.target.value.toLowerCase())
                    }
                    type="text"
                    placeholder={destination}
                  />
                </div>
              </div>
              <div className="lsItem">
                <label htmlFor="">Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>
                  <FontAwesomeIcon icon={faCalendarDays} />
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                )}
              </div>
              <div className="lsItem">
                <label htmlFor="">Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      MIN Price /<small> night</small>
                    </span>
                    <input
                      className="lsOptionInput"
                      type="number"
                      placeholder="$"
                      onChange={(e) => setMin(e.target.value)}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      MAX Price /<small> night</small>
                    </span>
                    <input
                      className="lsOptionInput"
                      type="number"
                      placeholder="$"
                      onChange={(e) => setMax(e.target.value)}
                    />
                  </div>

                  <div className="hsItem">
                    <div className="iItem">
                      <FontAwesomeIcon icon={faPerson} className="hIcon" />
                      <span
                        onClick={() => setOpenOptions(!openOptions)}
                        className="headerSearchText"
                      >{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                    </div>

                    {openOptions && (
                      <div className="opt">
                        <div className="optionItem">
                          <span className="optionText">Adult</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.adult <= 1}
                              className="optionCounterButton"
                              onClick={() => handleOption("adult", "d")}
                            >
                              -
                            </button>
                            <span className="optionCounterNumber">
                              {options.adult}
                            </span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("adult", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Children</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.children <= 0}
                              className="optionCounterButton"
                              onClick={() => handleOption("children", "d")}
                            >
                              -
                            </button>
                            <span className="optionCounterNumber">
                              {options.children}
                            </span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("children", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Room</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.room <= 1}
                              className="optionCounterButton"
                              onClick={() => handleOption("room", "d")}
                            >
                              -
                            </button>
                            <span className="optionCounterNumber">
                              {options.room}
                            </span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("room", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
            <div className="listResults">
              {loading ? (
                "loading"
              ) : (
                <>
                  {data.map((item) => (
                    <SearchItem item={item} key={item._id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default List;
