import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, CheckCircle } from "lucide-react";

function ResetPassword({ onBackToLogin }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(false);

  // Get reset token from URL
  const searchParams = new URLSearchParams(
    window.location.search
  );

  const token = searchParams.get("token");

  // -----------------------------
  // PASSWORD VALIDATION
  // -----------------------------

  const validatePassword = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password =
        "Password must contain at least one number.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (!token) {
      newErrors.token =
        "Invalid or missing password reset link.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // RESET PASSWORD
  // -----------------------------

  const handleResetPassword = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (!validatePassword()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            token: token,
            new_password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data.detail === "string"
            ? data.detail
            : "Unable to reset password.";

        setMessage(errorMessage);
        setMessageType("error");

        return;
      }

      setMessage(
        "Your password has been reset successfully."
      );

      setMessageType("success");

      setPassword("");
      setConfirmPassword("");
      setErrors({});

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setMessage(
        "Unable to connect to the server."
      );

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        {/* Back to login */}
        <button
          type="button"
          onClick={onBackToLogin}
          className="cursor-pointer text-sm font-medium text-gray-600 transition hover:text-rose-600"
        >
          ← Back to Login
        </button>

        <div className="mt-8 grid overflow-hidden rounded-[2rem] bg-white shadow-xl lg:grid-cols-2">

          {/* -------------------------------- */}
          {/* LEFT PINK SECTION */}
          {/* -------------------------------- */}

          <div className="relative hidden min-h-[650px] overflow-hidden bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100 lg:block">

            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/30" />

            <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-rose-300/30" />

            <div className="relative z-10 flex h-full flex-col justify-center px-14">

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-700">
                Beauty & You
              </p>

              <h1 className="mt-5 max-w-md text-5xl font-semibold leading-tight text-gray-900">
                A fresh start for your account.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-gray-600">
                Create a new password and continue your
                beauty journey with Lakmé.
              </p>

            </div>
          </div>

          {/* -------------------------------- */}
          {/* RIGHT FORM */}
          {/* -------------------------------- */}

          <div className="px-7 py-10 sm:px-12 sm:py-14">

            {/* Mobile logo */}
            <div className="lg:hidden">

              <p className="text-center text-2xl font-semibold tracking-[0.25em] text-gray-900">
                LAKMÉ
              </p>

            </div>

            {/* Heading */}
            <div className="mt-6 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600">

                {messageType === "success" ? (
                  <CheckCircle size={27} />
                ) : (
                  <LockKeyhole size={27} />
                )}

              </div>

              <h2 className="mt-5 text-3xl font-semibold text-rose-500">
                Reset Password
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600">
                Create a new password for your Lakmé account.
              </p>

            </div>

            {/* Message */}
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

            {/* Token error */}
            {errors.token && (
              <p className="mx-auto mt-5 max-w-sm text-center text-sm text-red-500">
                {errors.token}
              </p>
            )}

            {/* Form */}
            {!messageType || messageType !== "success" ? (
              <form
                onSubmit={handleResetPassword}
                className="mx-auto mt-8 max-w-sm space-y-5"
              >

                {/* New Password */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    New Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      autoComplete="new-password"
                      placeholder="Enter your new password"
                      className={`w-full rounded-xl border ${
                        errors.password
                          ? "border-red-400"
                          : "border-stone-200"
                      } bg-stone-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-rose-300 focus:bg-white`}
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

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-gray-500">
                    At least 8 characters, including uppercase,
                    lowercase and a number.
                  </p>

                </div>

                {/* Confirm Password */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      autoComplete="new-password"
                      placeholder="Confirm your new password"
                      className={`w-full rounded-xl border ${
                        errors.confirmPassword
                          ? "border-red-400"
                          : "border-stone-200"
                      } bg-stone-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-rose-300 focus:bg-white`}
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

                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}

                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading || !token}
                  className="w-full cursor-pointer rounded-full bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {loading
                    ? "Resetting Password..."
                    : "Reset Password"}
                </button>

              </form>
            ) : (
              /* Success */
              <div className="mx-auto mt-8 max-w-sm">

                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="w-full cursor-pointer rounded-full bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Back to Login
                </button>

              </div>
            )}

          </div>
        </div>

      </div>

    </main>
  );
}

export default ResetPassword;