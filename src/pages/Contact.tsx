import Footer from "@/components/home/Footer";
import Headline from "@/components/home/Headline";
import PageHistory from "@/components/home/PageHistory";
import Navber from "@/components/Navber";
import { Phone, Mail, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    if (!formData.message.trim())
      newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success
    setSuccess(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setTimeout(() => setSuccess(false), 60000); // hide after 1 minute
  };

  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory path="Home" current="Contact" />

      {/* Contact Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8">
          {/* Left Box */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            {/* Call */}
            <div className="flex items-start gap-3 mb-[32px] pb-[32px] border-b-[1px] border-black ">
              <div className="p-3 bg-[#DB4444] text-white rounded-full">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="text-base font-poppins text-black font-medium mb-6">
                  Call To Us
                </h3>
                <p className="font-poppins text-black font-normal text-[14px] mb-4 text-sm">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="font-poppins text-black font-normal text-[14px] mb-4 text-sm">
                  Phone: +8801611112222
                </p>
              </div>
            </div>

            {/* Write */}
            <div className="flex items-start gap-3 mb-3">
              <div className="p-3 bg-[#DB4444] text-white rounded-full">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-base font-poppins text-black font-medium mb-6">
                  Write To Us
                </h3>
                <p className="font-poppins text-black font-normal text-[14px] mb-4 text-sm">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="font-poppins text-black font-normal text-[14px] mb-4 text-sm">
                  Emails: customer@exclusive.com
                </p>
                <p className="font-poppins text-black font-normal text-[14px] mb-4 text-sm">
                  Emails: support@exclusive.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Box (Form) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm relative">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {/* Inputs Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    className="h-[50px] bg-[#F5F5F5] w-full px-4 rounded outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email *"
                    className="h-[50px] bg-[#F5F5F5] w-full px-4 rounded outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone *"
                    className="h-[50px] bg-[#F5F5F5] w-full px-4 rounded outline-none"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Textarea */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full h-[207px] mt-[32px] bg-[#F5F5F5] px-4 py-3 rounded outline-none resize-none"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Button */}
              <div className="flex flex-col items-end mt-[32px]">
                <button
                  type="submit"
                  className="bg-[#DB4444] hover:bg-red-600 text-[#FAFAFA] font-medium px-[32px] lg:px-[48px] py-4 rounded font-poppins"
                >
                  Send Message
                </button>

                {/* Success Notification (below button) */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 5 }}
                      className="mt-4 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                      <CheckCircle size={18} />
                      <span>Message sent successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
