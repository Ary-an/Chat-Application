import { useState } from "react";
import axios from "axios";

const projectID = process.env.REACT_APP_PROJECT_ID;

const Modal = () => {
  const [authDetails, setAuthDetails] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = authDetails;

    const authObject = {
      "Project-ID": projectID,
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
      setError("");
    } catch (err) {
      setError("Oops, incorrect credentials.");
    }
  };

  const handleChange = (e) => {
    setAuthDetails({
      ...authDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={authDetails.username}
            onChange={(e) => handleChange(e)}
            className="input"
            placeholder="Username"
            name="username"
            required
          />
          <input
            type="password"
            value={authDetails.password}
            onChange={(e) => handleChange(e)}
            className="input"
            placeholder="Password"
            name="password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>
  );
};

export default Modal;
