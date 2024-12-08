import Link from "next/link";
import { useCurrentUser, useLogoutUser } from "@/hooks/auth";
import Image from "next/image";

const Topbar = () => {
  const { data, isLoading } = useCurrentUser();
  const { mutate: logoutUser } = useLogoutUser();

  console.log("user---", data);

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      {/* Logo Section */}
      <div className="flex items-center text-green-500 hover:text-green-400 font-bold cursor-pointer">
        Connectify
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Sign-In Buttons (Hardcoded Example) */}
        {isLoading ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-20 h-7"></button>
        ) : data?.getCurrentUser && data?.getCurrentUser.isVerified ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => logoutUser()}>
            Logout
          </button>
        ) : (
          <Link href={"/login"}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Log In
            </button>
          </Link>
        )}

        {/* User Button Placeholder */}
        {!isLoading && data?.getCurrentUser && data.getCurrentUser.isVerified && (
          <Link href={`/${data.getCurrentUser.username}`}>
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <Image
                src={data.getCurrentUser.profileImageURL || "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"}
                alt="user profile"
                width={32} // Adjust the width as needed
                height={32} // Adjust the height as needed
                className="rounded-full"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
