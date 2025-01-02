import { createGraphqlClient } from "@/clients/api";
import { LoginUserInput, ResetPasswordInput, SignupUserInput, VerifyEmailInput } from "@/gql/graphql";
import { forgotPasswordMutation, loginUserMutation, logoutUserMutation, resetPasswordMutation, signupUserMutation, verifyEmailMutation } from "@/graphql/mutations/auth";
import { getCurrentUserQuery } from "@/graphql/query/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const graphqlClient = createGraphqlClient()
            const data = await graphqlClient.request(getCurrentUserQuery)
            return data
        }
    })
}

export const useSignupUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userData: SignupUserInput) => {
            // Check if all required fields are filled
            if (!userData.email || !userData.username || !userData.fullName || !userData.password) {
                throw new Error("Please fill all the fields");
            }

            // Check if the email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userData.email)) {
                throw new Error("Invalid email format.");
            }

            // Check if the password is greater than 6 char
            if (userData.password.length < 6) {
                throw new Error("Password must be at least 6 characters long.");
            }

            try {
                const graphQLClient = createGraphqlClient()
                const { signupUser } = await graphQLClient.request(signupUserMutation, { input: userData });
                return signupUser
            } catch (error: any) {
                // Throw only the error message for concise output
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },

        onSuccess: (data) => {
            toast.success("signup successfully")
        },

        onError: (error: any) => {
            const errorMessage = error.message.split(':').pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        }
    });
};

export const useVerifyEmail = () => {
    const queryClient = useQueryClient();
    const router = useRouter()

    return useMutation({
        mutationFn: async (input: VerifyEmailInput) => {
            try {
                const graphqlClient = createGraphqlClient()
                const { verifyEmail } = await graphqlClient.request(verifyEmailMutation, { input });

                if (verifyEmail) {
                    const res = await fetch("/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token: verifyEmail.token
                        }),
                    });

                    if (!res.ok) {
                        throw new Error("Failed to set the cookie on the server.");
                    }

                    // Return some useful data after success, such as a token if needed
                    return verifyEmail
                }
            } catch (error: any) {
                // Throw only the error message for concise output
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },

        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], () => {
                return { getCurrentUser: data }
            })
            toast.success("Email verification successful!");
            router.replace("/")
        },

        onError: (error) => {
            const errorMessage = error.message.split(':').pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        }
    });
}

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (userData: LoginUserInput) => {
            // Check if all required fields are filled
            if (!userData.usernameOrEmail || !userData.password) {
                throw new Error("Please fill both fields");
            }

            try {
                const graphqlClient = createGraphqlClient()
                const { loginUser } = await graphqlClient.request(loginUserMutation, { input: userData });
                if (loginUser.isVerified) {
                    const res = await fetch("/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token: loginUser.token
                        }),
                    });

                    if (!res.ok) {
                        throw new Error("Failed to set the cookie on the server.");
                    }
                }
                return loginUser
            } catch (error: any) {
                // Throw only the error message for concise output
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },

        onSuccess: (data) => {
            if (!data?.isVerified) {
                toast.error("Your account is not verified! Pls verified");

            } else {
                router.replace("/")
                toast.success("Login successful!");

                queryClient.setQueryData(["currentUser"], () => {
                    return { getCurrentUser: data }
                })
            }            
        },

        onError: (error: any) => {
            const errorMessage = error.message.split(':').pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        }
    });
};


export const useLogoutUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const graphqlClient = createGraphqlClient()
            const { logoutUser } = await graphqlClient.request(logoutUserMutation);

            const res = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to set the cookie on the server.");
            }

            // Return some useful data after success, such as a token if needed
            return logoutUser
        },

        onSuccess: (data) => {
            queryClient.setQueriesData({ queryKey: ['currentUser'] }, () => ({
                getAuthUser: null
            }));

            toast.success("Logout successful!");
        },
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (usernameOrEmail: string) => {
            if (!usernameOrEmail) {
                throw new Error("Email or Username is required!")
            }
            try {
                const graphqlClient = createGraphqlClient()
                const { forgotPassword } = await graphqlClient.request(forgotPasswordMutation, { usernameOrEmail });
                return forgotPassword;
            } catch (error: any) {
                // Throw only the error message for concise output
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },

        onSuccess: (data) => {
            toast.success("Reset link send successful to your Email!");
        },

        onError: (error) => {
            const errorMessage = error.message.split(':').pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        }
    });
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (input: ResetPasswordInput) => {

            if (input.newPassword != input.confirmPassword) {
                throw new Error("Password does't match.")
            }

            if (input.newPassword.length < 6) {
                throw new Error("Password must be at least 6 characters long.");
            }

            try {
                const graphqlClient = createGraphqlClient()
                const { resetPassword } = await graphqlClient.request(resetPasswordMutation, { input });
                return resetPassword;
            } catch (error: any) {
                // Throw only the error message for concise output
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },

        onSuccess: (data) => {
            toast.success("Reset password successful! now back to login");
        },

        onError: (error) => {
            const errorMessage = error.message.split(':').pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        }
    });
}