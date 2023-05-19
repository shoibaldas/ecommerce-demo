import React, { useContext, useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import { GrGooglePlus } from "react-icons/gr";
import Swal from "sweetalert2";
import { UserContext } from "../../hooks/AuthProvider/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const {signIn, setSignIn} = useContext(UserContext);
  const navigate = useNavigate();

  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();

    const errors = {};

    if (!email.trim()) {
      errors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors["email"] = "Email is invalid";
    }
    if (!password.trim()) {
      errors["password"] = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields correctly.",
      });
      return;
    }
    // Retrieve user credentials from local storage
    const storedCredentials = JSON.parse(localStorage.getItem('user'));
    const storedEmail = storedCredentials.email;
    const storedPassword = storedCredentials.password;

    if (email === storedEmail && password === storedPassword) {
      // Successful login
      setErrors("");
      setErrorMessage("");
      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
      });
      setSignIn(!signIn);
      navigate("/");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="h-screen bg-fixed bg-center bg-cover custom-img">
      <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]">
        <div className="w-80 p-7 backdrop-blur-3xl bg-white/80 rounded">
          <h2 className="text-center text-2xl font-semibold">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control flex flex-col w-full max-w-xs">
              <label className="label">
                <span className="label-text text-gray-800 font-semibold">
                  Email <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="rounded-md mt-2 py-1 px-2 border border-gray-500"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="relative form-control mt-2 flex flex-col w-full max-w-xs">
              <label className="label">
                <span className="label-text text-gray-800 font-semibold">
                  Password <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-2 rounded-md py-1 px-2 border border-gray-500"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              <div
                className="absolute bottom-[6.5px] right-1 cursor-pointer"
                onClick={handleToggleShowPassword}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <label className="label-text text-sm text-gray-800 cursor-pointer underline underline-offset-1">
              Forget Password?
            </label>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <input
              type="submit"
              value="Login"
              className="mt-6 cursor-pointer font-semibold text-white w-full max-w-xs bg-black p-2 rounded-md"
            />
            <div className="text-center">
              <label className="label-text text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="cursor-pointer font-semibold text-gray-700 underline"
                >
                  Create Account
                </Link>
              </label>
            </div>
            <div className="text-center mt-4">
              <div className="flex items-center space-x-3">
                <div className="flex-1 h-px sm:w-16 dark:bg-sky-800"></div>
                <h4 className="label-text-alt text-sm font-semibold text-gray-500">
                  or Sign in with
                </h4>
                <div className="flex-1 h-px sm:w-16 dark:bg-sky-800"></div>
              </div>
              <div title="Google" className="mt-2 flex justify-center">
                <GrGooglePlus className="w-8 h-8 text-orange-700 mr-3 cursor-pointer p-1 rounded-full"></GrGooglePlus>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
