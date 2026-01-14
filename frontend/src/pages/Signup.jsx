import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearError } from "../slicer/authSlicer";
import { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Shield,
  Zap,
  Star,
  Award,
  Rocket,
} from "lucide-react";
import toast from "react-hot-toast";
import "../App.css"

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username should contain at least 3 characters")
      .max(20, "Username should contain at most 20 characters")
      .regex(/^[a-zA-Z0-9_ ]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Invalid Email"),
    password: z
      .string()
      .min(6, "Password should contain at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Watch form fields
  const watchedFields = watch(["username", "email", "password", "confirmPassword"]);
  const password = watch("password");

  // Calculate password strength
  useEffect(() => {
    if (password) {
      let strength = 0;
      if (password.length >= 6) strength += 25;
      if (password.length >= 10) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(password)) strength += 25;
      setPasswordStrength(Math.min(strength, 100));
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  // Clear error when any field changes
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [watchedFields, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Account created successfully!", {
        icon: "🎉",
        duration: 3000,
      });
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    const { confirmPassword, ...userData } = data;
    dispatch(signupUser(userData));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return "bg-red-500";
    if (passwordStrength < 60) return "bg-yellow-500";
    if (passwordStrength < 80) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return "Weak";
    if (passwordStrength < 60) return "Fair";
    if (passwordStrength < 80) return "Good";
    return "Strong";
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-400/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="w-full max-w-md relative z-10 animate-fadeInUp">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
              <div className="relative">
                <div className="inline-flex w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center mx-auto mb-4 shadow-2xl border border-white/30 animate-scaleIn">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 animate-slideDown">
                  Join TaskFlow
                </h2>
                <p className="text-purple-100 animate-slideDown animation-delay-200">
                  Create your account and start managing tasks
                </p>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Username Field */}
                <div className="animate-slideUp">
                  <label className="block mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-500" />
                      Username
                    </span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="johndoe"
                      {...register("username")}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.username
                          ? "border-red-400 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-500/20"
                          : "border-gray-200 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-500/20"
                      } outline-none`}
                    />
                    {!errors.username && watchedFields[0] && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-scaleIn">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1 animate-slideDown">
                      <AlertCircle className="w-4 h-4" />
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="animate-slideUp animation-delay-100">
                  <label className="block mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-500" />
                      Email
                    </span>
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...register("email")}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.email
                          ? "border-red-400 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-500/20"
                          : "border-gray-200 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-500/20"
                      } outline-none`}
                    />
                    {!errors.email && watchedFields[1]?.includes("@") && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-scaleIn">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1 animate-slideDown">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="animate-slideUp animation-delay-200">
                  <label className="block mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-500" />
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password")}
                      className={`w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 dark:bg-slate-800/50 border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.password
                          ? "border-red-400 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-500/20"
                          : "border-gray-200 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-500/20"
                      } outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-3 animate-slideDown">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          Password Strength
                        </span>
                        <span className={`text-xs font-bold ${
                          passwordStrength < 30 ? "text-red-500" :
                          passwordStrength < 60 ? "text-yellow-500" :
                          passwordStrength < 80 ? "text-blue-500" : "text-green-500"
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()} transition-all duration-500 ease-out`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1 animate-slideDown">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="animate-slideUp animation-delay-300">
                  <label className="block mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-500" />
                      Confirm Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                      className={`w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 dark:bg-slate-800/50 border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.confirmPassword
                          ? "border-red-400 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-500/20"
                          : "border-gray-200 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-500/20"
                      } outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1 animate-slideDown">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-shake">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="animate-slideUp animation-delay-400">
                  <label className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border-2 border-purple-100 dark:border-purple-800/30 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors duration-200">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-2 border-purple-300 dark:border-purple-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer transition-all duration-200"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="animate-slideUp animation-delay-500">
                  <button
                    type="submit"
                    disabled={isSubmitting || loading || !agreeToTerms}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting || loading || !agreeToTerms
                        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105 active:scale-95"
                    }`}
                  >
                    {isSubmitting || loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        Create Account
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Features List */}
              <div className="mt-6 grid grid-cols-2 gap-3 animate-fadeIn animation-delay-600">
                {[
                  { icon: Shield, text: "Secure & Safe" },
                  { icon: Zap, text: "Fast Setup" },
                  { icon: Star, text: "Free Forever" },
                  { icon: Award, text: "No Credit Card" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                  >
                    <feature.icon className="w-4 h-4 text-purple-500" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center animate-fadeIn animation-delay-700">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200"
                  >
                    Sign In →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 animate-fadeIn animation-delay-800">
            © 2026 TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;