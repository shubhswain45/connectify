import { useState } from "react"; // Import useState for local state
import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/Topbar";
import { ChevronLeft, ChevronRight, Edit2, Router } from "lucide-react"; // Lucide React icon for edit
import FeaturedSection from "@/components/FeaturedSection";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies"; // Used for parsing cookies
import { createGraphqlClient } from "@/clients/api";
import { getUserProfileQuery, getUserTracksQuery } from "@/graphql/query/user";
import { GetUserProfileResponse, Track } from "@/gql/graphql";
import SectionGrid from "@/components/SectionGrid";
import { useFollowUser } from "@/hooks/user";
import { useCurrentUser } from "@/hooks/auth";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { useRouter } from "next/router";
import { useGetCurrentTheme } from "@/hooks/theme";
import UserHeader from "@/components/UserHeader";

interface UserPageProps {
  user: GetUserProfileResponse | null;
  userTracks: Track[] | null;
}

const UserPage = ({ user, userTracks }: UserPageProps) => {
  const [theme] = useGetCurrentTheme()
  const { mutateAsync: followUser, isPending } = useFollowUser()
  const { data, isLoading } = useCurrentUser()
  const router = useRouter()
  const page = router.query.page ? parseInt(router.query.page as string, 10) : 1;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">
          Sorry, user does not exist 404 ☹️
        </h1>
      </div>
    );
  }

  const [isFollowed, setIsFollowed] = useState(user.followedByMe);

  const handleFollowToggle = async () => {
    await followUser(user.id)
    setIsFollowed(!isFollowed)
  };

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      {/* Topbar */}
      <Topbar />

      {/* Scrollable Content */}
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          {/* Greeting Section */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Welcome to your profile</h1>

          {/* Profile Section */}
          <div className="bg-zinc-800 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <img
                src={user?.profileImageURL || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-36 h-36 rounded-full mb-4 border-4 border-teal-500"
              />
              {/* Username */}
              <h2 className="text-3xl font-semibold">{user?.username}</h2>
              {/* Bio */}
              <p className="text-gray-400 mt-2">{user?.bio}</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
              <div>
                <h3 className="text-xl font-semibold text-white">{user?.totalTracks}</h3>
                <p className="text-gray-400">Tracks</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{user?.totalFollowers}</h3>
                <p className="text-gray-400">Followers</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{user?.totalFollowings}</h3>
                <p className="text-gray-400">Following</p>
              </div>

              <div>
                {/* Responsive Follow/Unfollow Button */}
                {
                  isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-t-transparent border-white animate-spin rounded-full"></div>
                    </div>
                  ) : (
                    <button
                      onClick={handleFollowToggle}
                      className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold ${isFollowed
                        ? "text-white border border-white hover:text-gray-300"
                        : "bg-white text-black hover:bg-gray-300"
                        }`}
                    >
                      {isFollowed ? "Unfollow" : "Follow"}
                    </button>
                  )
                }
              </div>
            </div>

            {/* Edit Profile Button */}
            {
              data?.getCurrentUser?.id == user.id && (<div className="flex justify-center mt-6">
                <button className="px-6 py-2 text-lg font-semibold text-teal-500 border border-teal-500 rounded-full hover:bg-teal-600 hover:text-white flex items-center">
                  <Edit2 size={18} className="mr-2" />
                  Edit Profile
                </button>
              </div>)
            }
          </div>

          <UserHeader />

          {/* Featured Songs Section */}
          <FeaturedSection />

          {/* Additional Sections */}
          {!userTracks ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">No Tracks yet ☹️</h1>
            </div>
          ) : (
            <div className="space-y-8">
              <SectionGrid tracks={userTracks} />
            </div>
          )}

          {
            userTracks && (

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink
                      aria-label="Previous Page"
                      className="hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                      onClick={() => router.push(`/dashboard/${user.username}/?page=${Math.max(1, page - 1)}`)}
                    >
                      <ChevronLeft />
                    </PaginationLink>

                  </PaginationItem>

                  {[page, page + 1, page + 2].map((p, index) => (
                    p > 0 && (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => {
                            if (p === page) {
                              return;
                            }
                            router.push(`/dashboard/${user.username}/?page=${p}`);
                          }}
                          className={p === page ? "text-white hover:text-white" : "hover:bg-zinc-700 text-zinc-300 cursor-pointer"}
                          style={p === page ? { backgroundColor: theme as string } : {}}
                        >

                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => router.push(`/dashboard/${user.username}/?page=${page + 1}`)}
                      className="hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                    >
                      <ChevronRight />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )
          }
        </div>



      </ScrollArea>
    </main>
  );
};

// Server-side data fetching for SSR
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { username } = context.params as { username: string };
  const cookies = parseCookies(context); // Parse cookies from the context
  const token = cookies.__connectify_token_from_server; // Get the token
  const page = context.query.page ? parseInt(context.query.page as string, 10) : 1;
  let user = null;
  let userTracks = null;

  const graphqlClient = createGraphqlClient(token);
  const { getUserProfile } = await graphqlClient.request(getUserProfileQuery, { username });
  if (getUserProfile) {
    const { getUserTracks } = await graphqlClient.request(getUserTracksQuery, { payload: { username, page } });
    user = getUserProfile;
    userTracks = getUserTracks;
  }

  return {
    props: {
      user,
      userTracks,
    },
  };
};

export default UserPage;
