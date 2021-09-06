import React, { useState, useEffect } from "react";
import "./style.scss";
import Icon from "react-icons-kit";
import { ic_location_on } from "react-icons-kit/md";
import axios from "axios";
import { apiURL } from "../../../utils/apiURL";

const StepFour = ({ responsestep, id }) => {
  const [isLoading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      setLongitude(position.coords.latitude);
      setLatitude(position.coords.longitude);
    });
  }, []);

  const postLocation = async () => {
    try {
      const data = {
        longitude: longitude,
        latitude: latitude,
      };

      setLoading(true);
      const token = `token ${localStorage.getItem('token')}`
      const response = await axios.post(
        `${apiURL}/doctor/profile/${id}/update`,
        data, {
          headers: {authorization: token}
        }
      );
      if (response.status === 200) {
        setLoading(false);
        responsestep(5);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        console.log(error.response);
      }
    }
  };

  return (
    <div className="step">
      <div className="text-center">
        <button
          type="button"
          className="btn location-btn rounded-circle shadow-none p-4"
          onClick={postLocation}
        >
          <Icon icon={ic_location_on} size={50} />
        </button>
        {isLoading ? <p>Saving location...</p> : <p>Pick your location</p>}
      </div>
    </div>
  );
};

export default StepFour;
