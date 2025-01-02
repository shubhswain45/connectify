import { useState } from "react"; // Import useState for local state
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies"; // Used for parsing cookies
import { createGraphqlClient } from "@/clients/api";
import { getUserProfileQuery, getUserTracksQuery } from "@/graphql/query/user";
import { GetUserProfileResponse, Track } from "@/gql/graphql";
import SectionGrid from "@/components/_dashboard/_home/SectionGrid";
import UserHeader from "@/components/_dashboard/_user/UserHeader";
import DashboardLayout from "@/layout/DashboardLayout";
import PaginationController from "@/components/_dashboard/PaginationController";
import UserProfileHeader from "@/components/_dashboard/_user/UserProfileHeader";

interface UserPageProps {
  user: GetUserProfileResponse | null;
  userTracks: Track[] | null;
}

const UserPage = ({ user, userTracks }: UserPageProps) => {
  const [isFollowed, setIsFollowed] = useState(user?.followedByMe || false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">
          Sorry, user does not exist 404 ☹️
        </h1>
      </div>
    );
  }

  return (
    <DashboardLayout shouldShowFeatureHeader={false}>
      <div className="p-4 sm:p-6">
        <UserProfileHeader user={user} isFollowed={isFollowed} setIsFollowed={setIsFollowed} />

        {/* Header Sections */}
        <UserHeader />

        {/* Additional Sections */}
        {!userTracks ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">No Tracks yet ☹️</h1>
          </div>
        ) : (
          <>
            <div className="space-y-8 mt-5">
              <SectionGrid tracks={userTracks} />
            </div>
            <PaginationController basePath={`dashboard/${user.username}`} hasNextPage={userTracks.length >= 0} />
          </>
        )}
      </div>
    </DashboardLayout>
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
