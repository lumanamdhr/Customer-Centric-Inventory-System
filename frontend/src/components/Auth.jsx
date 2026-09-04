import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
} from "lucide-react";

function Auth({
  onBack,
  onLoginSuccess,
}) {
  // Controls whether we show Login or Sign Up
  const [mode, setMode] = useState("login");

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Switch Login/Signup
  const switchMode = (newMode) => {
    setMode(newMode);
    setMessage("");
    setMessageType("");

    // Reset password visibility
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // LOGIN
  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      // OAuth2 expects form data
      const formData = new URLSearchParams();

      formData.append("username", loginEmail);
      formData.append("password", loginPassword);

      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data.detail === "string"
            ? data.detail
            : "Login failed.";

        setMessage(errorMessage);
        setMessageType("error");
        return;
      }

      // Save authentication information
      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "customer_id",
        data.customer_id
      );

      localStorage.setItem(
        "customer_name",
        data.name
      );

      localStorage.setItem(
        "customer_email",
        data.email
      );

      localStorage.setItem(
        "customer_role",
        data.role
      );

      setMessage("Login successful.");
      setMessageType("success");

      // Tell App about the logged-in user's role
      setTimeout(() => {
        onLoginSuccess(data.role);
      }, 500);

    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        "Unable to connect to the server."
      );

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  // SIGN UP
  const handleSignup = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    // Check passwords
    if (signupPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    if (signupPassword.length < 6) {
      setMessage(
        "Password should contain at least 6 characters."
      );
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      // Combine first and last name
      const fullName =
        `${firstName} ${lastName}`.trim();

      const response = await fetch(
        "http://127.0.0.1:8000/customers",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: fullName,
            email: signupEmail,
            password: signupPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data.detail === "string"
            ? data.detail
            : "Unable to create account.";

        setMessage(errorMessage);
        setMessageType("error");
        return;
      }

      setMessage(
        "Account created successfully. Please log in."
      );
      setMessageType("success");

      // Move to login after successful signup
      setLoginEmail(signupEmail);

      setTimeout(() => {
        setMode("login");
        setMessage("");
      }, 1200);

    } catch (error) {
      console.error("Signup error:", error);

      setMessage(
        "Unable to connect to the server."
      );

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <button
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-rose-600"
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>

        <div className="mt-8 grid overflow-hidden rounded-[2rem] bg-white shadow-xl lg:grid-cols-2">

          {/* Left visual section */}
          <div className="relative hidden min-h-[650px] overflow-hidden bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100 lg:block">

            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/30" />

            <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-rose-300/30" />

            <div className="relative z-10 flex h-full flex-col justify-center px-14">

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-700">
                Beauty & You
              </p>

              <h1 className="mt-5 max-w-md text-5xl font-semibold leading-tight text-gray-900">
                Your beauty journey starts here.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-gray-600">
                Sign in to continue shopping or create an account
                and discover your favorite Lakmé beauty essentials.
              </p>

            </div>
          </div>


          {/* Right form section */}
          <div className="px-7 py-10 sm:px-12 sm:py-14">

            {/* Mobile brand */}
            <div className="lg:hidden">

              <p className="text-center text-2xl font-semibold tracking-[0.25em] text-gray-900">
                LAKMÉ
              </p>

            </div>

            {/* Heading */}
            <div className="mt-6 text-center">

              <h2 className="mt-3 text-3xl font-semibold text-rose-500">
                {mode === "login"
                  ? "Welcome"
                  : "Create Your Account"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {mode === "login"
                  ? "Log in to continue your beauty journey."
                  : "Create your account and discover more from Lakmé."}
              </p>

            </div>


            {/* Mode switch */}
            <div className="mx-auto mt-8 flex max-w-sm rounded-full bg-stone-100 p-1">

              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition ${
                  mode === "login"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <LogIn size={16} />
                Login
              </button>

              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition ${
                  mode === "signup"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <UserPlus size={16} />
                Sign Up
              </button>

            </div>


            {/* Messages */}
            {message && (
              <div
                className={`mx-auto mt-6 max-w-sm rounded-xl px-4 py-3 text-sm ${
                  messageType === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}


            {/* LOGIN FORM */}
            {mode === "login" && (
              <form
                onSubmit={handleLogin}
                className="mx-auto mt-8 max-w-sm space-y-5"
              >

                {/* Email */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={loginEmail}
                    onChange={(event) =>
                      setLoginEmail(event.target.value)
                    }
                    autoComplete="email"
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-rose-300 focus:bg-white"
                  />

                </div>


                {/* Password */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={loginPassword}
                      onChange={(event) =>
                        setLoginPassword(event.target.value)
                      }
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pr-12 text-sm text-gray-800 outline-none transition focus:border-rose-300 focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-gray-400 hover:text-rose-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer rounded-full bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </button>

              </form>
            )}


            {/* SIGNUP FORM */}
            {mode === "signup" && (
              <form
                onSubmit={handleSignup}
                className="mx-auto mt-8 max-w-sm space-y-5"
              >

                {/* First + Last Name */}
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(event) =>
                        setFirstName(event.target.value)
                      }
                      autoComplete="given-name"
                      placeholder="First name"
                      required
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={(event) =>
                        setLastName(event.target.value)
                      }
                      autoComplete="family-name"
                      placeholder="Last name"
                      required
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white"
                    />

                  </div>

                </div>


                {/* Email */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={signupEmail}
                    onChange={(event) =>
                      setSignupEmail(event.target.value)
                    }
                    autoComplete="email"
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300 focus:bg-white"
                  />

                </div>


                {/* Password */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="newPassword"
                      value={signupPassword}
                      onChange={(event) =>
                        setSignupPassword(event.target.value)
                      }
                      autoComplete="new-password"
                      placeholder="Create a password"
                      required
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-rose-300 focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-gray-400 hover:text-rose-600"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>


                {/* Confirm Password */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      required
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-rose-300 focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (previous) => !previous
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-gray-400 hover:text-rose-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer rounded-full bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </main>
  );
}

export default Auth;