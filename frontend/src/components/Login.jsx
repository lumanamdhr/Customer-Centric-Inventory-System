import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Login({ isOpen, onClose }) { /*isopen shows panels and when we click x it will close*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");

    try {
      const formData = new URLSearchParams(); //creates form data instead of JSON

      formData.append("username", email); //puts the email insisde OAuth2 username field
      formData.append("password", password); //puts the pw in pw field

      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", //tells FastAPI its sending form data
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
        setMessage("Please enter a valid email and password.");
      } else {
        setMessage(data.detail || "Login failed");
      }

      return;
      }

      console.log("Logged in customer:", data);

      localStorage.setItem("access_token", data.access_token); /*stoes the JWT returned by FastAPI*/
      localStorage.setItem("customer_id", data.customer_id);
      localStorage.setItem("customer_name", data.name);

      setMessage("Login successful!");

        setTimeout(() => {
      onClose();
    }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to server.");
    }
  };

  return (
    <>
      {/* Dark background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Login panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full" /*panel appers and panel moves outside the screen*/
        }`}
      >
        <div className="p-8">

          {/* Close button */}
          <button
            onClick={onClose}
            className=" cursor-pointer absolute top-6 right-6 text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>

          {/* Heading */}
          <div className="mt-12 mb-8">

            <p className="text-sm tracking-[0.25em] text-gray-500 uppercase">
              Welcome Back
            </p>

            <h2 className="text-3xl font-semibold mt-2">
              Sign In
            </h2>

            <p className="text-gray-500 mt-3 text-sm">
              Sign in to add products to your cart and continue shopping.
            </p>

          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="w-full border-b border-gray-300 py-3 outline-none focus:border-black transition"
              />
            </div>

            {/* Password */}
            <div>
            <label className="block text-sm font-medium mb-2">
                Password
            </label>

            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full border-b border-gray-300 py-3 pr-10 outline-none focus:border-black transition"
                />

                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                aria-label={showPassword ? "Hide password" : "Show password"}
                >
                {showPassword ?(
                    <EyeOff size={19} />
                ) : (
                    <Eye size={19} />
                )}
                </button>
            </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 mt-4 hover:bg-gray-800 transition"
            >
              Login
            </button>

          </form>

          {/* Message */}
          {message && (
            <p className="text-center mt-5 text-sm text-gray-600">
              {message}
            </p>
          )}

        </div>
      </div>
    </>
  );
}

export default Login;