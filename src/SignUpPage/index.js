import { Component } from "react";
import "./index.css";

class SignUpPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  };

  setName = (event) => {
    this.setState({ name: event.target.value });
  };

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  setAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  setRole = (event) => {
    this.setState({ role: event.target.value });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { name, email, password, address, role } = this.state;
    const userDetails = { name, email, password, address, role };

    fetch("https://store-rating-backend-1-10po.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          console.log("Success:", data);
          alert("User registered successfully!");
        } else {
          console.error("Error:", data.error || "Something went wrong");
          alert(data.error || "Registration failed.");
        }
      })
      .catch((err) => {
        console.error("Network error:", err);
        alert("Network error occurred");
      });
  };

  render() {
    const { role } = this.state;

    return (
      <div className="signup-form-bg-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <h1 className="main-heading">Sign Up</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Name"
              onChange={this.setName}
              className="input-type"
              required
            />
            <input
              type="email"
              placeholder="Email"
              onChange={this.setEmail}
              className="input-type"
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={this.setPassword}
              className="input-type"
              required
            />
            <input
              type="text"
              placeholder="Address"
              onChange={this.setAddress}
              className="input-type"
              required
            />

            {/* ✅ Role Dropdown */}
            <select
              value={role}
              onChange={this.setRole}
              className="input-type"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="store_owner">Store Owner</option>
            </select>
          </div>
          <button type="submit" className="sign-btn">
            Sign Up
          </button>
          <p className="message">
            Already have an account? <a href="https://store-rating-backend-1-10po.onrender.com/">Login</a>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
