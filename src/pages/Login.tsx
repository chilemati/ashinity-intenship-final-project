import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Footer from "@/components/home/Footer";
import Headline from "@/components/home/Headline";
import Navber from "@/components/Navber";
import type { AppDispatch, RootState } from "@/store/store";
import { loginUser } from "@/store/userSlice";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { status, error, currentUser } = useSelector(
    (state: RootState) => state.users
  );

  const [message, setMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!form.email || !form.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (status === "succeeded" && currentUser) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        navigate("/account");
      }, 10000);
      return () => clearTimeout(timer);
    } else if (status === "failed") {
      setMessage(error || "Login failed. Please try again.");
    }
  }, [status, error, currentUser, navigate]);

  return (
    <div>
      <Headline />
      <Navber />

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-[1fr_371px] gap-[40px] md:gap-[129px] items-center">
        {/* Box 1 - Image */}
        <div>
          <img
            src="https://res.cloudinary.com/dlifiojbx/image/upload/v1756206989/exclusive/dl.beatsnoop_taul1m.jpg"
            alt="Login visual"
            className="w-full h-auto rounded-2xl object-contain"
          />
        </div>

        {/* Box 2 - Form */}
        <div className="flex flex-col max-w-sm w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Log in to Exclusive</h2>
          <p className="text-gray-600 mb-6">Enter your details below</p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email or Phone Number"
              value={form.email}
              onChange={handleChange}
              className="w-full h-[32px] border-b outline-none px-1"
            />

            {/* Password with toggle */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full h-[32px] border-b outline-none px-1 pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <fieldset className="flexBetween">
              <button
                type="submit"
                disabled={status === "loading" || redirecting}
                className="w-full h-[40px] bg-[#DB4444] text-white rounded-md flex items-center justify-center mt-4"
              >
                {status === "loading" || redirecting ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                ) : (
                  "Log In"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="w-full h-[40px] bg-white text-[#DB4444] rounded-md flex items-center justify-center mt-2"
              >
                Forgot Password?
              </button>
            </fieldset>

            {redirecting && (
              <p className="text-sm text-blue-600 mt-2 animate-pulse">
                Redirecting to your account in 10 seconds...
              </p>
            )}

            {message && (
              <p
                className={`text-sm mt-2 ${
                  message.includes("failed")
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-red-500 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
