import { LayoutDashboardIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const Topbar = () => {
  // Hardcoded value for admin access
  const isAdmin = false;

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10"
    >
      {/* Logo Section */}
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8" alt="Spotify logo" />
        Spotify
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Admin Dashboard Link */}
        {isAdmin && (
          <Link href="/admin" className={buttonVariants({ variant: "outline" })}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        {/* Sign-In Buttons (Hardcoded Example) */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign In
        </button>

        {/* User Button Placeholder */}

        <Link href={`/shubh`}>
        <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
          U
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
