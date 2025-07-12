import { Component } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import "./index.css";

class LoginForm extends Component {
  state = {
    name: "",
    password: "",
    isError: false,
    errMsg: ""
  };

  setName = (event) => {
    this.setState({ name: event.target.value });
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });

    // 🧠 Step 1: Get user profile from backend
    fetch("https://store-rating-backend-1-10po.onrender.com/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          // ✅ Store user info in cookie
          Cookies.set("user_info", JSON.stringify(data), { expires: 30 });

          const { role } = data;
          console.log(data)
          const { history } = this.props;

          // ✅ Step 2: Redirect based on role
          if (role === "admin") {
            history.push("/admin-dashboard");
          } else if (role === "user") {
            history.push("/user-dashboard");
          } else if (role === "store-owner") {
            history.push("/store-owner-dashboard");
          } else {
            this.setState({ isError: true, errMsg: "Unknown role" });
          }
        } else {
          this.setState({ isError: true, errMsg: data.error || "Unable to fetch user info" });
        }
      })
      .catch(() => {
        this.setState({ isError: true, errMsg: "Failed to fetch user info" });
      });
  };

  submitFailure = (error) => {
    this.setState({ isError: true, errMsg: error });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { name, password } = this.state;
    const userDetails = { name, password };

    fetch("https://store-rating-backend-1-10po.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails),
      credentials: "include"
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          this.submitSuccess(data.jwtToken);
        } else {
          this.submitFailure(data.error || "Login failed");
        }
      })
      .catch((error) => {
        this.submitFailure(error.message);
      });
  };

  render() {
    const { name, password, isError, errMsg } = this.state;
    return (
      <div className="signup-form-bg-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <h1 className="main-heading">Login</h1>
          <div className="input-container">
            <label htmlFor="name" className="label">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={this.setName}
              className="input-type"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.setPassword}
              className="input-type"
            />
          </div>
          <button type="submit" className="sign-btn">Login</button>
          {isError && <p className="error-message">{errMsg}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
