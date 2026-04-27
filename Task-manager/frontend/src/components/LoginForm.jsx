import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from "../redux/actions/authActions";
import Loader from "./utils/Loader";

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isLoggedIn, error } = useSelector(
    (state) => state.authReducer
  );

  //  Redirect after login
  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [isLoggedIn, redirectUrl, navigate]);

  // ✏️ Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateManyFields("login", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(
        errors.reduce(
          (total, ob) => ({ ...total, [ob.field]: ob.err }),
          {}
        )
      );
      return;
    }

    dispatch(postLoginData(formData.email, formData.password));
  };

  //  Field error UI
  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <form
      onSubmit={handleSubmit} //  IMPORTANT
      className="m-auto my-16 max-w-[500px] bg-white p-8 border-2 shadow-md rounded-md"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center mb-4">
            Welcome user, please login here
          </h2>

          {/* ❗ Backend error */}
          {error && (
            <p className="text-red-500 mb-3 text-center">
              {error}
            </p>
          )}

          <div className="mb-4">
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="youremail@domain.com"
              onChange={handleChange}
            />
            {fieldError("email")}
          </div>

          <div className="mb-4">
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Your password.."
              onChange={handleChange}
            />
            {fieldError("password")}
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark w-full"
          >
            Login
          </button>

          <div className="pt-4 text-center">
            <Link to="/signup" className="text-blue-400">
              Don't have an account? Signup here
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default LoginForm;