import React from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import { getAllResponseMessage } from "../../redux/user/userSlicer";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ lastMessageRef}) => {
    const messages= useSelector(getAllResponseMessage)
    const navigator = useNavigate()


  const handlerLogout=()=>{
    console.log("Log out  CLicked")
    navigator('/')

  }
  return (
    <>
      <header className="chat__mainHeader">
        <p className="app_name">Frank Chat App</p>
        <button className="leaveChat__btn" onClick={handlerLogout}>
          Log out
        </button>
      </header>
      <div className="message__container">
      {messages.map(message => { return (
            message.socketID == localStorage.getItem("idNumber") ? (
              <div className="message__chats" key={message.id}>
            <p className='sender__name'>You</p>
            <div className='message__sender'>
                <p>{message.text}</p>
            </div>
          </div>
            ): (
              <div className="message__chats" key={message.id}>
            <p>{message.name}</p>
            <div className='message__recipient'>
                <p>{message.text}</p>
            </div>
          </div>
            )
            )})}
            <div ref={lastMessageRef}></div>
      </div>
    </>
  );
};
export default ChatBody;
