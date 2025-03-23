import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import sign_in_img from "../assets/signup-page-image.png";
import "./signin.css";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState({});
  //const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.messagg));
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Enter a valid email!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  return (
    <div className="sign-in-container">
      <div className="sign-in-content">
        <img
          className="sign-in-image"
          src={sign_in_img}
          alt="Sign up page image"
        />
        <div className="sign-in-form-container">
          <h1 className="sign-in-title">Sign In</h1>
          <form onSubmit={handleSubmit} className="sign-in-form">
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

            <button
              disabled={loading}
              className="submit-button"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <div className="sign-up-link">
            <p>Don&apos;t have an account?</p>
            <Link to={"/sign-up"}>
              <span className="sign-up-text">Sign Up</span>
            </Link>
          </div>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
