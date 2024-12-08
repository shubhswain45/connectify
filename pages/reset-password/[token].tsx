import React from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import the useRouter hook
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { useResetPassword } from "@/hooks/auth";

interface ResetPasswordFormInputs {
    newPassword: string;
    confirmPassword: string;
}

const ResetPasswordPage = () => {
    const { register, handleSubmit } = useForm<ResetPasswordFormInputs>();
    const { mutate: resetPassword, isPending } = useResetPassword();
    const router = useRouter(); // Initialize the useRouter hook
    const { token } = router.query; // Extract the token from the URL

    console.log("token", token);
    
    const handleResetPassword = async (data: ResetPasswordFormInputs) => {
        if (!token) {
            console.error("Token is missing");
            return;
        }

        resetPassword({
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
            token: token as string, // Pass the token to your resetPassword mutation
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#242424] to-[#080808]">
            <div className="shadow-lg rounded-lg p-6 w-full max-w-md bg-[#121112]">
                <h1 className="text-2xl font-bold text-white text-center mb-4">
                    Reset Password
                </h1>
                <p className="text-sm text-white text-center mb-6">
                    Create a new password for your account.
                </p>

                <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">
                    <div>
                        <label htmlFor="newPassword" className="block text-xs font-semibold text-gray-300 mb-2">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            placeholder="New Password"
                            {...register("newPassword")}
                            className="w-full p-2 bg-transparent text-white border-[0.5px] border-white rounded-md focus:outline-none focus:border-white focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                            className="w-full p-2 bg-transparent text-white border-[0.5px] border-white rounded-md focus:outline-none focus:border-white focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <button type="submit" className="w-full py-3 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 focus:outline-none">
                        {isPending ? <Loader className="animate-spin mx-auto" size={25} /> : "Reset Password"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <Link href="/login">
                        <div className="text-blue-500 text-sm hover:underline">Back to Login</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
