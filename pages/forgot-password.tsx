import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { useForgotPassword } from "@/hooks/auth";

interface ForgotPasswordFormInputs {
    usernameOrEmail: string;
}

const ForgotPasswordPage = () => {

    const {mutate: forgotPassword, isPending} = useForgotPassword()

    const { register, handleSubmit} = useForm<ForgotPasswordFormInputs>();

    const handleForgotPassword = async (data: ForgotPasswordFormInputs) => {
        console.log(data.usernameOrEmail, "data.usernameOrEmail");
        
        forgotPassword(data.usernameOrEmail)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#242424] to-[#080808] ">
            <div className="shadow-lg rounded-lg p-6 w-full max-w-md bg-[#121112]">
                <h1 className="text-2xl font-bold text-white text-center mb-4">
                    Forgot Password
                </h1>
                <p className="text-sm text-white text-center mb-6">
                    Enter your registered email address or username and we will send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-4">
                    <div>
                        <label htmlFor="usernameOrEmail" className="block text-xs font-semibold text-gray-300 mb-2">
                            Username Or Email
                        </label>
                        <input
                            id="usernameOrEmail"
                            type="text"
                            placeholder="Username Or Email"
                            {...register('usernameOrEmail')}
                            className="w-full p-2 bg-transparent text-white border-[0.5px] border-white rounded-md focus:outline-none focus:border-white focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <button type="submit" className="w-full py-3 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 focus:outline-none">
                        {isPending ? <Loader className="animate-spin mx-auto" size={25} /> : 'Send reset link'}
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

export default ForgotPasswordPage;
