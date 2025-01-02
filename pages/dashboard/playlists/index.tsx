import Link from "next/link";
import { GetServerSideProps } from "next";
import { createGraphqlClient } from "@/clients/api";
import { UserPlaylistsResponse } from "@/gql/graphql";
import { parseCookies } from "nookies"; // Import nookies to parse cookies

import SectionGrid from "@/components/_dashboard/_home/SectionGrid";
import { getFeedPlaylistsQuery } from "@/graphql/query/playlist";
import DashboardLayout from "@/layout/DashboardLayout";
import PaginationController from "@/components/_dashboard/PaginationController";

interface HomePageProps {
  res: UserPlaylistsResponse | null;
}

const HomePage = ({ res }: HomePageProps) => {
  return (
    <DashboardLayout shouldShowFeatureHeader={true}>
      <div className="p-4 sm:p-6">
        {/* Greeting Section */}
        {res == null ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
            <h1 className="text-lg sm:text-2xl font-bold text-zinc-400">
              Please login/signup
            </h1>
            <Link href="/login">
              <div className="text-blue-500 hover:underline text-lg">Go to Login</div>
            </Link>
          </div>
        ) : res?.playlists?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
            <h1 className="text-lg sm:text-2xl font-bold text-zinc-400">
              Follow some users to see their Tracks
            </h1>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              <SectionGrid playlists={res.playlists} />
            </div>

            {/* Pagination Controller */}
            {res?.playlists && <PaginationController basePath="dashboard/playlists" hasNextPage={res.playlists.length >= 0} />}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

// Server-side data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context); // Parse cookies from the context
  const token = cookies.__connectify_token_from_server; // Get the token

  let res = null;

  if (!token) {
    return {
      props: {
        res,
      },
    };
  }
  
  if (token) {
    // If the token exists, consider the user as logged in
    const graphqlClient = createGraphqlClient(token);
    const { getFeedPlaylists } = await graphqlClient.request(getFeedPlaylistsQuery);
    res = getFeedPlaylists;
  }

  return {
    props: {
      res,
    },
  };
};

export default HomePage;
