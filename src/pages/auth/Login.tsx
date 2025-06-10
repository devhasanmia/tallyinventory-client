import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "../../redux/api/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { tokenVerify } from "../../redux/api/features/units/tokenVerify";
import { useAppDispatch } from "../../redux/hooks";
import { otpAuth, setUser } from "../../redux/api/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 6 characters"),
});
type Inputs = z.infer<typeof loginSchema>;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: Inputs) => {
    try {
      const result = await login(data).unwrap();
      dispatch(
        otpAuth({
          otpAuthToken: result.data.otpAccessToken,
        })
      );
      navigate("/otp-verify");
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputWithLabel
            id="email"
            label="Email"
            name="email"
            placeholder="Enter Your Email"
            type="email"
            register={register}
            error={errors.email}
          />
          <InputWithLabel
            id="password"
            label="Password"
            name="password"
            placeholder="Enter your Password"
            type="password"
            register={register}
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
