import React, { useState, useEffect, useCallback } from "react";
import "./style.scss";
import axios from "axios";
import Icon from "react-icons-kit";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { apiURL } from "../../utils/apiURL";
import { ic_near_me, ic_add } from "react-icons-kit/md";
import { useLocation, useHistory } from "react-router-dom";

import Header from "../../components/Chat/Header/index";
import LeftMenu from "../../components/Chat/LeftMenu/index";
import RightMenu from "../../components/Chat/RightMenu/index";
import ConversationMessages from "../../components/Chat/Message/index";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Index = () => {
  const query = useQuery();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [senderId, setSenderId] = useState(null);
  const [myFiles, setMyFiles] = useState([]);
  const [recivedFiles] = useState([1, 2, 3, 4, 5, 6]);
  const [messages, setMessages] = useState([]);
  const token = query.get("token");
  const reciver = query.get("reciver");
  const appointmentId = query.get("appointmentid");
  const [header] = useState({
    headers: { Authorization: "Bearer " + token },
  });

  // Check Appointment status
  const checkAppointmentStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiURL}/chat/check/${appointmentId}/appointment`,
        header
      );
      if (response.data.status === false) {
        history.goBack();
      }
    } catch (error) {
      if (error) {
        console.log(error.response);
      }
    }
  }, [history, appointmentId, header]);

  useEffect(() => {
    if (!token && reciver && appointmentId) history.push("/");

    const sender = jwt_decode(token);
    setSenderId(sender.id);
    checkAppointmentStatus();
  }, [history, token, reciver, appointmentId, header, checkAppointmentStatus]);

  // Message Submit
  const onSubmit = async (data, event) => {
    const newMessage = {
      sender: senderId,
      reciver: reciver,
      message: data.message,
    };
    setMessages((exMessage) => [...exMessage, newMessage]);

    const newMessage2 = {
      sender: reciver,
      reciver: senderId,
      message: data.message,
    };
    setMessages((exMessage) => [...exMessage, newMessage2]);
    event.target.reset();

    console.log(newMessage);
  };

  // File Upload
  const fileUploadHandle = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setMyFiles((exFiles) => [...exFiles, fileURL]);
    }
  };

  return (
    <div className="chat-room border">
      <Header sender={{ name: "Sender" }} reciver={{ name: "Reciver" }} />

      {/* Room Body */}
      <div className="room-body d-lg-flex">
        {/* Left Menu */}
        <div className="left-menu d-none d-lg-block">
          <LeftMenu files={recivedFiles} />
        </div>

        {/* Message Menu */}
        <div className="flex-fill message-menu">
          {/* Messages */}
          <div className="messages">
            <ConversationMessages sender={senderId} messages={messages} />
          </div>

          {/* Message Send Container */}
          <div className="send-container py-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex">
                {/* Text input field */}
                <div className="flex-fill">
                  <input
                    type="text"
                    name="message"
                    placeholder="Write message"
                    {...register("message", { required: true })}
                    className={
                      errors.message
                        ? "form-control shadow-none error-border"
                        : "form-control shadow-none"
                    }
                  />
                </div>

                {/* Message Submit */}
                <div className="ml-auto px-2">
                  <button
                    type="submit"
                    className="btn rounded-circle shadow-none"
                  >
                    <Icon
                      icon={ic_near_me}
                      size={25}
                      style={{ color: "#007cfa" }}
                    />
                  </button>
                </div>

                {/* File Upload */}
                <div className="file-upload">
                  <input
                    type="file"
                    className="upload"
                    onChange={fileUploadHandle}
                    // accept=".pdf"
                  />
                  <button
                    type="button"
                    className="btn rounded-circle shadow-none"
                  >
                    <Icon icon={ic_add} size={25} style={{ color: "#eeeee" }} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Menu */}
        <div className="right-menu d-none d-lg-block">
          <RightMenu files={myFiles} />
        </div>
      </div>
    </div>
  );
};

export default Index;
