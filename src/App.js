import Modal from "react-modal";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const handleClick = () => {
    setIsOpen(true);
  };

  const closeRequest = () => {
    setIsOpen(false);
  };

  const handleForm = (e) => {
    e.preventDefault();

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email. Please check your email address.");
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      isValid = false;
    }

    const selectedDate = new Date(dob);
    const today = new Date();

    if (selectedDate > today) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      isValid = false;
    }

    if (!isValid) return;

    const userData = {
      userName: user,
      email: email,
      DOB: dob,
      PhoneNumber: phone,
    };

    const prevData = JSON.parse(localStorage.getItem("details")) || [];
    prevData.push(userData);
    localStorage.setItem("details", JSON.stringify(prevData));

    setDob("");
    setEmail("");
    setPhone("");
    setUser("");
  };

  return (
    <div className="app">
      <h1>User Details Modal</h1>
      <button type="button" onClick={handleClick} className="modal-button">
        Open Form
      </button>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeRequest}
          ariaHideApp={false}
          appElement={document.getElementById('root')}
          shouldCloseOnOverlayClick={true}
          closeTimeoutMS={0}
          style={{
            overlay: {
              zIndex: 1000,
            },
            content: {
              zIndex:1001,
              width: "min-content",
              height: "min-content",
              margin: "auto",
              padding: "20px",
              textAlign: "center",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <div className="modal-content">
            <h1>Fill Details</h1>
            <form className="form-detail" onSubmit={handleForm}>
              <label htmlFor="username">
                <h3>UserName:</h3>
              </label>
              <input
                type="text"
                id="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                style={{
                  padding: "10px",
                }}
              />
              <label htmlFor="email">
                <h3>Email Address:</h3>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "10px",
                }}
              />
              <label htmlFor="phone">
                <h3>Phone Number:</h3>
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                required
                style={{
                  padding: "10px",
                }}
              />
              <label htmlFor="dob">
                <h3>Date of Birth:</h3>
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                style={{
                  padding: "10px",
                }}
              />
              <br />
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
            </div>
        </Modal>
        </div>
  );
}
