export const PlaylistSkeleton = () => {
	return Array.from({ length: 7 }).map((_, i) => (
		<div key={i} className='p-2 rounded-md flex items-center gap-3'>
			<div className='w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0 animate-pulse' />
			<div className='flex-1 min-w-0 hidden md:block space-y-2'>
				<div className='h-4 bg-zinc-800 rounded animate-pulse w-3/4' />
				<div className='h-3 bg-zinc-800 rounded animate-pulse w-1/2' />
			</div>
		</div>
	));
};

export const PlaylistSkeletonTwo = () => {
	return Array.from({ length: 7 }).map((_, i) => (
		<div key={i} className='p-2 rounded-md flex items-center gap-3'>
			
			<div className='flex-1 min-w-0 hidden md:block space-y-2'>
				<div className='h-8 w-full bg-zinc-800 rounded animate-pulse' />
			</div>
		</div>
	));
};

export const SearchContentSkeleton = () => {
	return (
	  <div className="px-4 sm:px-8 max-w-[800px] mx-auto space-y-4">
		{Array.from({ length: 7 }).map((_, i) => (
		  <div
			key={i}
			className="p-3 rounded-md flex items-center gap-4 animate-pulse bg-zinc-800"
		  >
			{/* Image Skeleton */}
			<div className="w-16 h-16 bg-zinc-900 rounded-md"></div>
  
			{/* Text Skeleton */}
			<div className="flex flex-col flex-1 space-y-2">
			  <div className="h-3 bg-zinc-900 rounded w-3/4"></div>
			  <div className="h-3 bg-zinc-900 rounded w-1/2"></div>
			</div>
		  </div>
		))}
	  </div>
	);
  };