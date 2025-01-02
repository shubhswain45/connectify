import { useState } from "react"; // Import useState for local state
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Edit2 } from "lucide-react"; // Lucide React icon for edit
import FeaturedSection from "@/components/FeaturedSection";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies"; // Used for parsing cookies
import { createGraphqlClient } from "@/clients/api";
import { getUserPlaylistsQuery, getUserProfileQuery } from "@/graphql/query/user";
import { GetUserProfileResponse, UserPlaylistsResponse } from "@/gql/graphql";
import SectionGrid from "@/components/_dashboard/_home/SectionGrid";
import { useFollowUser } from "@/hooks/user";
import { useCurrentUser } from "@/hooks/auth";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { useRouter } from "next/router";
import { useGetCurrentBackground, useGetCurrentTheme } from "@/hooks/theme";
import UserHeader from "@/components/_dashboard/_user/UserHeader";
import Topbar from "../../../../components/_dashboard/Topbar";
import DashboardLayout from "@/layout/DashboardLayout";
import PaginationController from "@/components/_dashboard/PaginationController";
import UserProfileHeader from "@/components/_dashboard/_user/UserProfileHeader";

interface UserPageProps {
    user: GetUserProfileResponse | null;
    res: UserPlaylistsResponse | null;
}

const UserPage = ({ user, res }: UserPageProps) => {
    const [bg] = useGetCurrentBackground()
    const { data } = useCurrentUser()
    const router = useRouter()
    const page = router.query.page ? parseInt(router.query.page as string, 10) : 1;

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
        <DashboardLayout background={bg} shouldShowFeatureHeader={false}>

            <div className="p-4 sm:p-6">
                <UserProfileHeader user={user} isFollowed={isFollowed} setIsFollowed={setIsFollowed} />

                {/* Header Sections */}
                <UserHeader />

                {/* Additional Sections */}
                {!res?.playlists?.length ? (
                    <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">No Playlists yet ☹️</h1>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <SectionGrid playlists={res.playlists} />
                    </div>
                )}


            </div>

            {
                res?.playlists?.length && (
                    <PaginationController basePath={`dashboard/${user.username}`} hasNextPage={res?.playlists?.length >= 5} />
                )
            }
        </DashboardLayout>
    );
};

// Server-side data fetching for SSR
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { username } = context.params as { username: string };
    const cookies = parseCookies(context); // Parse cookies from the context
    const token = cookies.__connectify_token_from_server; // Get the token
    let user = null;
    let res = null;

    const graphqlClient = createGraphqlClient(token);
    const { getUserProfile } = await graphqlClient.request(getUserProfileQuery, { username });
    if (getUserProfile) {
        const { getUserPlaylists } = await graphqlClient.request(getUserPlaylistsQuery, { userId: getUserProfile.id });
        user = getUserProfile;
        res = getUserPlaylists;
    }

    return {
        props: {
            user,
            res,
        },
    };
};

export default UserPage;
