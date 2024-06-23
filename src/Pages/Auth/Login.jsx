import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Login() {
  const [role, setRole] = useState("Candidate");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const apiEndpoint = "https://bdu-swe-dept.vercel.app/login-user"

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      if (json.success) {
        console.log(json)
        // showToast('Successfully logged in!', 'success');
        navigate(role === "teacher" ? `/dashboard` : `/dashboard`);
      } else {
        // showToast('Login failed. Please check your credentials.', 'error');
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (errorRes) {
      // showToast('Something went wrong!', 'error');
      console.error("Login error:", errorRes);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary h-[20vh] md:h-[30vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-4xl text-white font-semibold text-center">Login</h1>
        <p className="text-center text-white mt-2 md:mt-6 px-10">
          Sign in To Account
        </p>
      </div>

      <div className="bg-[#EDF6FF] flex justify-center items-center">
        {/* Form */}
        <div className="w-[90vw] md:w-1/3 bg-white rounded-md p-10 my-16 flex flex-col gap-4">
          <div className="flex justify-center items-center flex-col py-2">
            <h1 className="text-2xl md:text-4xl font-semibold mb-4">Hi, Welcome Back!</h1>
            {/* <p className="text-center">
              Still do not have account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign Up
              </Link>
            </p> */}
          </div>

          {/* Switcher */}
          {/* <div>
            <label className="w-full relative inline-flex cursor-pointer select-none items-center justify-center rounded-3xl bg-lightBlue p-1">
              <span
                onClick={() => setRole("Candidate")}
                className={`flex items-center justify-center space-x-[6px] rounded-3xl py-2 px-[18px] text-sm font-medium w-full ${role === "Candidate" ? "text-primary border border-primary bg-[#f4f7ff]" : "text-darkGray border border-lightBlue"}`}
              >
                Candidate
              </span>
              <span
                onClick={() => setRole("Employer")}
                className={`flex items-center justify-center space-x-[6px] rounded-3xl py-2 px-[18px] text-sm font-medium w-full ${role === "Employer" ? "text-primary border border-primary bg-[#f4f7ff]" : "text-darkGray border border-lightBlue"}`}
              >
                Employer
              </span>
            </label>
          </div> */}

          {/* Email */}
          <div>
            <p className="text-darkGray">Email *</p>
            <input
              {...register("email", { required: "Email is required" })}
              className="text-sm w-full px-4 py-2 border border-solid border-gray rounded bg-lightBlue mt-1"
              type="text"
              placeholder="Email Address"
            />
            {errors.email && <p className="text-red">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <p className="text-darkGray">Password *</p>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                className="text-sm w-full px-4 py-2 border border-solid border-gray rounded bg-lightBlue mt-1"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <div className="absolute top-[30%] right-2">
                {showPassword ? (
                  <IoEyeOutline size={22} className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <IoEyeOffOutline size={22} className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
            </div>
            {errors.password && <p className="text-red">{errors.password.message}</p>}
          </div>

          {/* Remember Me */}
          <div className="mt-4 flex justify-between text-sm">
            <label className="flex gap-2 font-normal cursor-pointer hover:text-primary">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            {/* <Link to="/forgot-password" className="font-normal hover:underline">
              Forgot Password?
            </Link> */}
          </div>

          <button onClick={handleSubmit(onSubmit)} className="bg-primary hover:bg-blue-500 py-2 rounded-md text-white text-center">
            Login
          </button>

          {/* <div className="flex text-sm items-center justify-center gap-2">
            <p>Have an account?</p>
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
