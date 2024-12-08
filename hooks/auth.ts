import { createGraphqlClient } from "@/clients/api";
import { SignupUserInput } from "@/gql/graphql";
import { signupUserMutation } from "@/graphql/mutations/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
