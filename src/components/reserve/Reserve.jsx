import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

const Reserve = ({ setOpen, hotelId }) => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDates, setSelectedDates] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { user } = useContext(AuthContext);
  
  const [roomsNumber, setRoomsNumber] = useState("");
  const { data, loading } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value] 
        : selectedRooms.filter((item) => item !== value)
    );
   
    setUsername(user.username);
    setEmail(user.email);
    setPhone(user.phone);
    setSelectedDates([
      dates[0].startDate.toString(),
      dates[0].endDate.toString(),
    ]);
   
  };
 

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axiosInstance.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      const newReservation = {
        username,
        email,
        phone,
        hotelId,
        selectedRooms,
        selectedDates,
     
      };
      await axiosInstance.post("/reservation", newReservation);
      setOpen(false);
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your Rooms:</span>
        {data.map((item) => {
          return (
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max People : <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">${item.price}</div>
              </div>
              {item.roomNumbers.map((roomNumber) => {
                return (
                  <div className="room" >
                    <label id={roomNumber._id}>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}

        <button onClick={handleClick} className="rbutton">
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default Reserve;
