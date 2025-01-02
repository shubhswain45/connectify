import Link from "next/link";
import { GetServerSideProps } from "next";
import { createGraphqlClient } from "@/clients/api";
import { getFeedTracksQuery } from "@/graphql/query/track";
import { Track } from "@/gql/graphql";
import { parseCookies } from "nookies";
import SectionGrid from "@/components/_dashboard/_home/SectionGrid";
import PaginationController from "@/components/_dashboard/PaginationController";
import DashboardLayout from "@/layout/DashboardLayout";
import { useGetCurrentTheme } from "@/hooks/theme";
import LikedHeader from "@/components/_dashboard/_home/LikedHeader";

interface HomePageProps {
  tracks: Track[] | null;
}

const HomePage = ({ tracks }: HomePageProps) => {
  const [theme] = useGetCurrentTheme();

  return (
    <DashboardLayout shouldShowFeatureHeader={true}>
      <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
        <LikedHeader image="" href="" name="Liked songs"/>
      </div>
        {tracks === null ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
            <h1 className="text-lg sm:text-2xl font-bold text-zinc-400">
              Please login/signup
            </h1>
            <div className="flex justify-center space-x-4">
              <Link href="/login">
                <div
                  className="hover:underline text-lg"
                  style={{ color: theme as string }}
                >
                  Go to Login
                </div>
              </Link>
              <span className="text-zinc-400">Or</span>
              <Link href="/dashboard/explore">
                <div
                  className="hover:underline text-lg"
                  style={{ color: theme as string }}
                >
                  Explore
                </div>
              </Link>
            </div>
          </div>
        ) : tracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
            <h1 className="text-lg sm:text-2xl font-bold text-zinc-400">
              Follow some users to see their Tracks
            </h1>
          </div>
        ) : (
          <>
            <div className="space-y-8 mt-10">
              <SectionGrid tracks={tracks} />
            </div>
          </>
        )}

        {/* Pagination Controller */}
        {tracks != null && <PaginationController basePath="dashboard" hasNextPage={tracks.length >= 5} />}

      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.__connectify_token_from_server;
  const page = context.query.page ? parseInt(context.query.page as string, 10) : 1;

  let tracks = null;

  if (token) {
    const graphqlClient = createGraphqlClient(token);
    const { getFeedTracks } = await graphqlClient.request(getFeedTracksQuery, {
      page,
    });
    tracks = getFeedTracks;
  }

  return {
    props: {
      tracks,
    },
  };
};

export default HomePage;
