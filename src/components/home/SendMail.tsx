import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";

const SendMail: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate success (API call placeholder)
    setTimeout(() => {
      setSuccess("Email sent successfully!");
      setEmail("");
    }, 500);
  };

  // Clear success after 1 minute
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 30000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="w-full mt-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full flex items-center bg-transparent"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-[1.5px] border-[#FAFAFA] rounded px-4 py-3 pr-12 outline-none text-white autofill-fix"
        />
        <button
          type="submit"
          className="absolute right-2 bg-transparent p-2 rounded-full rotate-45 text-white hover:bg-green-700 transition"
        >
          <Send size={20} />
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Success Message */}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </div>
  );
};

export default SendMail;
