/* eslint-disable */
import React, { useState } from "react";
import firebase from "../firebase.js";
import validator from 'validator'

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [button, setButton] = useState("Skicka");
  const [sentMessage, setSentMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(validateSubmit()){

    let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
    var tempDate = new Date();
    const getDate = `${tempDate.getFullYear()}-${formatTwoDigits(tempDate.getMonth()+1)}-${formatTwoDigits(tempDate.getDate())} ${formatTwoDigits(tempDate.getHours())}:${formatTwoDigits(tempDate.getMinutes())}:${formatTwoDigits(tempDate.getSeconds())}`;
    
    const itemsRef = firebase.database().ref('emails');
        const item = {
          name: name,
          email: email,
          message: message,
          date: getDate
        }
        itemsRef.push(item)

    setSentMessage(true);
    setButton("Skicka");
    setName("");
    setEmail("");
    setMessage("");
    }
  };

  const validateSubmit = () => {
    if (name.length < 1){
        setButton("Vänligen fyll i ett namn. Försök igen.");
        return false;
    }
    if (!validator.isEmail(email)){
      setButton("Vänligen fyll i en korrekt email. Försök igen.");
      return false;
  }
    if (message.length < 1){
      setButton("Glöm inte skriva ett meddelande. Försök igen. ");
      return false;
    }
    return true;
  }

  return (

  <form className="w-full px-6" onSubmit={handleSubmit}>
  <div className="flex flex-wrap -mx-3 mb-1">
    <div className="w-full px-3 mb-6">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Namn
      </label>
      <input placeholder="Namn" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="name" type="text"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-3">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        E-mail
      </label>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={40} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-3">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Meddelande
      </label>
      <textarea placeholder="Meddelande" value={message} maxLength={500} onChange={(e) => setMessage(e.target.value)} className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>
    </div>
  </div>
  <div className="md:flex md:items-center">
    <div className="md:w-1/3">
      <button className="shadow bg-blue-700 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
        Skicka
      </button>
    </div>
    <div className="md:w-2/3"></div>
  </div>
  {sentMessage ? (
                <div className="text-black text-xs font-bold py-3 px-1 transition duration-400 ease-in-out slide" ><a>Tack för ditt meddelande. Vi svarar så fort vi kan!</a></div>
              ) : (
                <div></div>
              )}
</form>


    
  );
};

export default ContactForm;