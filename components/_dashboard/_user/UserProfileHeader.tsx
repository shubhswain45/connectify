import React from 'react';
import { useCurrentUser } from '@/hooks/auth';
import { Edit2 } from 'lucide-react';
import { useFollowUser } from '@/hooks/user';
import { GetUserProfileResponse } from '@/gql/graphql';

type UserProfileHeaderProps = {
    user: GetUserProfileResponse
    isFollowed: boolean;
    setIsFollowed: (isFollowed: boolean) => void
};

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
    user,
    isFollowed,
    setIsFollowed
}) => {
    const { data } = useCurrentUser();
    const { mutateAsync: followUser, isPending } = useFollowUser()

    const handleFollowToggle = async () => {
        await followUser(user.id)
        setIsFollowed(!isFollowed)
    };

    return (
        <>
            {/* Greeting Section */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Welcome to your profile</h1>

            {/* Profile Section */}
            <div className="rounded-xl shadow-lg p-8 mb-8">
                <div className="flex flex-col items-center">
                    {/* Avatar */}
                    <img
                        src={user.profileImageURL || "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"}
                        alt="User Avatar"
                        className="w-36 h-36 rounded-full mb-4 border-4"
                    />
                    {/* Username */}
                    <h2 className="text-3xl font-semibold">{user.username}</h2>
                    {/* Bio */}
                    <p className="text-gray-400 mt-2">{user.bio}</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
                    <div>
                        <h3 className="text-xl font-semibold text-white">{user.totalTracks}</h3>
                        <p className="text-gray-400">Tracks</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">{user.totalFollowers}</h3>
                        <p className="text-gray-400">Followers</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">0</h3>
                        <p className="text-gray-400">Following</p>
                    </div>

                    <div>
                        {/* Responsive Follow/Unfollow Button */}
                        {isPending ? (
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
                        )}
                    </div>
                </div>

                {/* Edit Profile Button */}
                {data?.getCurrentUser?.id === user.username && (
                    <div className="flex justify-center mt-6">
                        <button className="px-6 py-2 text-lg font-semibold text-teal-500 border border-teal-500 rounded-full hover:bg-teal-600 hover:text-white flex items-center">
                            <Edit2 size={18} className="mr-2" />
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserProfileHeader;
