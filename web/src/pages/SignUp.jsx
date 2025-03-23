import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.css";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "First name is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Last name is required!";
    }
    if (!values.role) {
      errors.role = "Select a role!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Enter a valid email.";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values["confirm-password"]) {
      errors["confirm-password"] = "Confirm password is required";
    } else if (values["confirm-password"] !== values.password) {
      errors["confirm-password"] = "Passwords do not match";
    }
    return errors;
  };
  return (
    <div className="sign-up-container">
      <div className="sign-up-form-container">
        <h1 className="sign-up-title">Create an Account</h1>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <input
            type="text"
            placeholder="First Name"
            className="input-field"
            id="firstname"
            onChange={handleChange}
          />
          <p className="error-text">{formErrors.firstname}</p>

          <input
            type="text"
            placeholder="Last Name"
            className="input-field"
            id="lastname"
            onChange={handleChange}
          />
          <p className="error-text">{formErrors.lastname}</p>

          <select
            placeholder="Role"
            className="input-field"
            id="role"
            onChange={handleChange}
          >
            <option>Select Role</option>
            <option value="Doctor">Doctor</option>
            <option value="Student">Student</option>
          </select>
          <p className="error-text">{formErrors.role}</p>

          <input
            type="email"
            placeholder="Email"
            className="input-field"
            id="email"
            onChange={handleChange}
          />
          <p className="error-text">{formErrors.email}</p>

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            id="password"
            onChange={handleChange}
          />
          <p className="error-text">{formErrors.password}</p>

          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            id="confirm-password"
            onChange={handleChange}
          />
          <p className="error-text">{formErrors["confirm-password"]}</p>

          <button
            disabled={loading}
            className="submit-button"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <div className="sign-in-link">
          <p>Already have an account?</p>
          <Link to="/sign-in">
            <span className="sign-in-text">Sign In</span>
          </Link>
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}


