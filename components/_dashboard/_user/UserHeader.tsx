import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Headphones, Library } from 'lucide-react';
import { useGetCurrentTheme } from '@/hooks/theme';
import { usePathname } from 'next/navigation';

function UserHeader() {
    const pathname = usePathname();
    const username = pathname.split('/')[2]; // Extract username from the pathname

    const navItems = [
        { id: 'headphones', component: Headphones, comparePath: '/dashboard/[username]', path: `/dashboard/${username}` },
        { id: 'library', component: Library, comparePath: '/dashboard/[username]/playlists', path: `/dashboard/${username}/playlists` },
    ];

    const [theme] = useGetCurrentTheme();
    const router = useRouter();
    const highlightedPath = useMemo(() => router.pathname, [router.pathname]);

    return (
        <div className="mt-4 ml-4 flex items-center space-x-4">
            {navItems.map(({ id, component: Icon, path, comparePath }) => (
                <div
                    key={id}
                    className={`p-2 rounded-full text-white cursor-pointer`}
                    style={{ backgroundColor: highlightedPath === comparePath ? theme as string: 'transparent' }}
                >
                    <Link href={path}>
                        <Icon size={17} />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default UserHeader;
