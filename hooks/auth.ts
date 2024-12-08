import { createGraphqlClient } from "@/clients/api";
import { LoginUserInput, SignupUserInput, VerifyEmailInput } from "@/gql/graphql";
import { loginUserMutation, signupUserMutation, verifyEmailMutation } from "@/graphql/mutations/auth";
import { getCurrentUserQuery } from "@/graphql/query/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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

                if(signupUser){
                    const res = await fetch("/api/hello", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          token: signupUser.token
                        }),
                      });
            
                      if (!res.ok) {
                        throw new Error("Failed to set the cookie on the server.");
                      }
            
                      // Return some useful data after success, such as a token if needed
                      return true
                }

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
                return verifyEmail;
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
                if(loginUser){
                    const res = await fetch("/api/hello", {
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
            
                      // Return some useful data after success, such as a token if needed
                      return loginUser
                }
            } catch (error: any) {
                // Throw only the error message for concise output
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },

        onSuccess: (data) => {
            if (!data?.isVerified) {
                toast.error("Your account is not verified! Pls verified");

            } else {
                toast.success("Login successful!");
            }

            queryClient.setQueryData(["currentUser"], () => {
                return { getCurrentUser: data }
            })
        },

        onError: (error: any) => {
            const errorMessage = error.message.split(':').pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        }
    });
};