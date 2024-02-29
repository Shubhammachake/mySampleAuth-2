import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    let mydata = localStorage.getItem("myInfo");
    let myData = JSON.parse(mydata);

    if (myData) {
      if (
        myData.userName === data.userName &&
        myData.password === data.password
      ) {
        alert("Login SucessFull");
        navigate("/Home");
      } else if (
        myData.userName === data.userName &&
        myData.password !== data.password
      ) {
        alert("incorect password");
      }
    } else {
      alert("no user found please try Register");
    }
  };

  return (
    <div className="cont">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter user Name"
          onChange={(e) => handleChange(e)}
          name="userName"
          required
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => handleChange(e)}
          name="password"
          required
        />
        <br />
        <button className="btns" type="submit">
          Login
        </button>
        <div className="button-div">
          <Link to="/Register">
            <button className="btns">Register</button>
          </Link>
          <Link>
            <button className="btns">Forgot Password</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
