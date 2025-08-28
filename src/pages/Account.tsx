import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { Eye, EyeOff } from "lucide-react";

import Footer from "@/components/home/Footer";
import Headline from "@/components/home/Headline";
import PageHistory from "@/components/home/PageHistory";
import Navber from "@/components/Navber";
import { updateUserProfile } from "@/store/userSlice";

const Account = () => {
  const { currentUser } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const [activeLink, setActiveLink] = useState("My Profile");

  // Form state
  const [firstName, setFirstName] = useState(currentUser?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(currentUser?.name?.split(" ")[1] || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [address, setAddress] = useState(currentUser?.otherinfo || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggles for password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // UI feedback
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sidebarLinks = [
    {
      section: "Manage My Account",
      links: ["My Profile", "Address Book", "My Payment Options"],
    },
    {
      section: "My Orders",
      links: ["My Returns", "My Cancellations"],
    },
    {
      section: "My Wishlist",
      links: ["My Wishlist"],
    },
  ];

  const validateForm = () => {
    const errs: string[] = [];
    if (!firstName.trim()) errs.push("First name is required");
    if (!lastName.trim()) errs.push("Last name is required");
    if (!email.trim()) errs.push("Email is required");
    if (!address.trim()) errs.push("Address is required");

    if (currentPassword) {
      if (currentPassword !== currentUser?.password) {
        errs.push("Current password is incorrect");
      }
      if (!newPassword) errs.push("New password is required");
      if (newPassword !== confirmPassword) {
        errs.push("Passwords do not match");
      }
    }
    return errs;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setMessage(validationErrors.join(" | "));
      return;
    }

    const updatedName = `${firstName} ${lastName}`;
    const updates: any = {
      name: updatedName,
      email,
      otherinfo: address,
    };
    if (newPassword) updates.password = newPassword;

    if (currentUser) {
      setLoading(true);

      // Simulate processing delay (30s)
      setTimeout(async () => {
        await dispatch(updateUserProfile({ id: currentUser.id, updates }));
        setLoading(false);

        setMessage("Profile updated successfully! ✅");

        // Reset password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // Hide message after 1 min
        setTimeout(() => setMessage(""), 60000);
      }, 30000);
    }
  };

  return (
    <div>
      <Headline />
      <Navber />
      <div className="flexBetween w-[95%] mx-auto ">
        <div className="w-fit">
          <PageHistory path="Home" current="Account" />
        </div>
        <p className="text-gray-700">
          Welcome{" "}
          <span className="text-[#DB4444] font-medium">
            {currentUser ? `${currentUser.name}` : "Guest"}
          </span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-[40px] md:gap-[139px]">
        {/* Sidebar */}
        <div className="space-y-8">
          {sidebarLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold mb-3">{section.section}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li
                    key={link}
                    className={`cursor-pointer ps-[34px] ${
                      activeLink === link
                        ? "text-[#DB4444] font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => setActiveLink(link)}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div>
          {activeLink === "My Profile" ? (
            <div>
              <h2 className="text-[#DB4444] text-xl font-semibold mb-6">
                Edit Your Profile
              </h2>

              <form className="space-y-6" onSubmit={handleSave}>
                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-[#F5F5F5] h-[50px] rounded px-3 w-full outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-[#F5F5F5] h-[50px] rounded px-3 w-full outline-none"
                  />
                </div>

                {/* Email + Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#F5F5F5] h-[50px] rounded px-3 w-full outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-[#F5F5F5] h-[50px] rounded px-3 w-full outline-none"
                  />
                </div>

                {/* Password Change */}
                <div>
                  <h3 className="font-semibold mb-3">Password Changes</h3>
                  <div className="space-y-4">
                    {/* Current Password */}
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-[#F5F5F5] h-[50px] rounded px-3 w-full outline-none pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        onClick={() => setShowCurrent(!showCurrent)}
                      >
                        {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-[#F5F5F5] h-[50px] rounded px-3 w-full outline-none pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        onClick={() => setShowNew(!showNew)}
                      >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-[#F5F5F5] h-[50px] rounded px-3 w-full outline-none pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-end gap-[32px]">
                    <button
                      type="button"
                      className="h-[50px] px-6 bg-white rounded "
                      onClick={() => {
                        setFirstName(currentUser?.name?.split(" ")[0] || "");
                        setLastName(currentUser?.name?.split(" ")[1] || "");
                        setEmail(currentUser?.email || "");
                        setAddress(currentUser?.otherinfo || "");
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setMessage("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-[50px] px-6 bg-[#DB4444] text-white rounded flex items-center justify-center min-w-[150px]"
                    >
                      {loading ? (
                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>

                  {/* Message */}
                  {message && (
                    <p
                      className={`text-sm mt-2 ${
                        message.includes("successfully")
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {message} | Remove current passowrd if you do not want to chang it
                    </p>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] text-gray-600">
              {activeLink} coming soon...
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
