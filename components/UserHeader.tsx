import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Headphones, Library } from 'lucide-react';
import { useGetCurrentTheme } from '@/hooks/theme';

function UserHeader() {
    const router = useRouter();
    const { username } = router.query; // Extract `username` from the route parameters
    const navItems = [
        { id: 'headphones', component: Headphones, path: `/dashboard/${username}` },
        { id: 'library', component: Library, path: `/dashboard/${username}/playlists` },
    ];
    const [theme] = useGetCurrentTheme();
    const highlightedPath = useMemo(() => router.asPath, [router.asPath]); // Use `asPath` instead of `pathname`

    return (
        <div className="mt-4 flex items-center space-x-4">
            {navItems.map(({ id, component: Icon, path }) => (
                <div
                    key={id}
                    className={`p-2 rounded-full text-white`}
                    style={{ backgroundColor: highlightedPath === path ? (theme as string) : 'transparent' }}
                >
                    {path ? (
                        <Link href={path}>
                            <Icon size={17} />
                        </Link>
                    ) : (
                        <Icon size={17} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default UserHeader;
