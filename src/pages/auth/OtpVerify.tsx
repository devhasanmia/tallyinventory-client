import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useVerifyOtpMutation } from "../../redux/api/features/auth/authApi";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/api/features/auth/authSlice";
import { toast } from "sonner";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

type OtpInputs = z.infer<typeof otpSchema>;
const OtpVerify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpInputs>({
    resolver: zodResolver(otpSchema),
  });
  const dispatch = useAppDispatch()
    const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const onSubmit = async (data: OtpInputs) => {
      try {
      const result = await verifyOtp(data).unwrap();
      console.log(result)
      dispatch(
        setUser({
          user: result.data.otpAccessToken,
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
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              id="otp"
              type="number"
              {...register("otp")}
              maxLength={6}
              placeholder="Enter the 6-digit OTP"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.otp
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.otp && (
              <p className="text-red-600 text-sm mt-1">
                {errors.otp.message?.toString()}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition duration-200"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Didn’t receive the OTP?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
