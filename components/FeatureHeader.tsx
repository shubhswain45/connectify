import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Headphones, Library, SquarePlus } from 'lucide-react';
import { FiSearch } from 'react-icons/fi';
import { useGetCurrentTheme } from '@/hooks/theme';

const navItems = [
  { id: 'headphones', component: Headphones, path: '/dashboard' },
  { id: 'library', component: Library, path: '/dashboard/playlist' },
  { id: 'search', component: FiSearch, path: '/dashboard/search' },
  { id: 'add', component: SquarePlus, path: null }, // Path `null` for items without links
];

function FeatureHeader() {
  const [theme] = useGetCurrentTheme()
  const router = useRouter();
  const highlightedPath = useMemo(() => router.pathname, [router.pathname]);
  
  return (
    <div className="mt-4 ml-4 flex items-center space-x-4">
      {navItems.map(({ id, component: Icon, path }) => (
        <div
          key={id}
          className={`p-2 rounded-full text-white`}
          style={{ backgroundColor: highlightedPath === path ? theme as string : 'transparent' }}
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
      {/* <CreateTrackDialog songDialogOpen={true} setSongDialogOpen={jjj}/> */}
    </div>
  );
}

export default FeatureHeader;
