import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "@/components/home/Footer";
import Headline from "@/components/home/Headline";
import Navber from "@/components/Navber";
import type { AppDispatch, RootState } from "@/store/store";
import { signupUser } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const redir = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.users);

  const [message, setMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    dispatch(signupUser(form));
  };

  useEffect(() => {
    if (status === "succeeded") {
      setMessage("Account created successfully!");
      setRedirecting(true);

      const timer = setTimeout(() => {
        redir("/login");
      }, 10000); // 10s delay

      return () => clearTimeout(timer);
    } else if (status === "failed") {
      setMessage(error || "Signup failed. Please try again.");
    }
  }, [status, error, redir]);

  return (
    <div>
      <Headline />
      <Navber />

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-[1fr_371px] gap-[40px] md:gap-[129px] items-center">
        {/* Box 1 - Image */}
        <div>
          <img
            src="https://res.cloudinary.com/dlifiojbx/image/upload/v1756206989/exclusive/dl.beatsnoop_taul1m.jpg"
            alt="Signup visual"
            className="w-full h-auto rounded-2xl object-contain"
          />
        </div>

        {/* Box 2 - Form */}
        <div className="flex flex-col max-w-sm w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
          <p className="text-gray-600 mb-6">Enter your details below</p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full h-[32px] border-b outline-none px-1"
            />
            <input
              type="email"
              name="email"
              placeholder="Email or Phone Number"
              value={form.email}
              onChange={handleChange}
              className="w-full h-[32px] border-b outline-none px-1"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-[32px] border-b outline-none px-1"
            />

            <button
              type="submit"
              disabled={status === "loading" || redirecting}
              className="w-full h-[40px] bg-red-500 text-white rounded-md flex items-center justify-center mt-4"
            >
              {status === "loading" || redirecting ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                "Create Account"
              )}
            </button>

            <button
              type="button"
              className="w-full h-[40px] border rounded-md flex items-center justify-center gap-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>

            {message && (
              <p
                className={`text-sm mt-2 ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            {redirecting && (
              <p className="text-sm text-blue-600 mt-2 animate-pulse">
                Redirecting to login in 10 seconds...
              </p>
            )}
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-red-500 font-medium">
              Login
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
