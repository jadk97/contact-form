import React, { useState } from "react";
import "./ContactForm.css";
import axios from "axios";

const ContactForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const emailReg = /\S+@\S+\.\S+/;


  const formErrors = {
    firstName: firstName.length > 25 && "First name cannot exceed 25 characters.",
    lastName: lastName.length > 25 && "Last name cannot exceed 25 characters.",
    emailLength: email.length > 50 && "Email cannot exceed 50 characters.",
    emailInvalid: email.length > 0 && !emailReg.test(email) && "Please enter a valid email.",
    message: message.length > 500 && "Message cannot exceed 500 characters."
  }

  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("")
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let data = {
        firstName,
        lastName,
        email,
        message
      }
      let response = await axios.post(`${process.env.REACT_APP_BACKEND}/contact`, data);
      props.setResponse({ type: "success", message: response.data.message });
      clearInputs();

    }
    catch (error) {
      props.setResponse({ type: "error", message: error.response.data.error })
    }
    finally {
      setLoading(false);
    }

  }
  const buttonEnabled = firstName && !formErrors.firstName 
  && lastName && !formErrors.lastName 
  && email && !formErrors.emailLength 
  && !formErrors.emailInvalid 
  && message && !formErrors.message;
  // console.log(!formErrors);
  return (
    <form className="contact-form">
      <div className="form-group">
        <label htmlFor="fname">First name</label>
        <input
          type="text"
          id="fname"
          className={`${formErrors.firstName ? "input-error" : ""}`}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {formErrors.firstName && (
          <small className="error-label">{formErrors.firstName}</small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="lname">Last name</label>
        <input
          type="text"
          id="lname"
          className={`${formErrors.lastName ? "input-error" : ""}`}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {formErrors.lastName && (
          <small className="error-label">{formErrors.lastName}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className={`${formErrors.emailInvalid || formErrors.emailLength ? "input-error" : ""}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formErrors.emailInvalid && (
          <small className="error-label">{formErrors.emailInvalid}</small>
        )}
        {formErrors.emailLength && (
          <small className="error-label">{formErrors.emailLength}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">Your message:</label>
        <textarea
          className={`${formErrors.message ? "input-error" : ""}`}
          rows={10}
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className={`character-counter ${formErrors.message ? "input-error" : ""}`}>
          {500 - message.length}
        </div>
        {formErrors.message && (
          <small className="error-label">{formErrors.message}</small>
        )}
      </div>

      <div className="form-group">
        <button
          disabled={!buttonEnabled || loading}
          type="submit"
          className={`submit-button ${!buttonEnabled || loading ? "disabled" : ""}`}
          onClick={(e) => submitHandler(e)}
        >
          {loading ? <div className="loading">Loading</div> : "Submit"}
        </button>

      </div>
    </form>)
};

export default ContactForm;