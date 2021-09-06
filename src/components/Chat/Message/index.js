import React from "react";
import "./style.scss";

const Index = ({ sender, messages }) => {
  return (
    <div className="conversation-messages">
      {messages && messages.length > 0
        ? messages.map((items, i) => (
            <div className="message" key={i} id="message">
              <div className="d-flex">
                {/* messages */}
                <div
                  className={
                    items.sender === sender
                      ? "sent-message ml-auto text-right"
                      : "recived-message text-left"
                  }
                >
                  <p>{items.message}</p>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Index;
