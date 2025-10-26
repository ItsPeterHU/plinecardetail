import React from 'react';

export default function ServiceCard({ title, desc, info }) {
	return (
		<div className="min-h-[180px] relative bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-500 rounded-xl p-6 group overflow-hidden">
			<div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-gray-400 to-gray-700 transition-opacity duration-700"></div>

			<h3 className="font-semibold text-lg text-gray-900 dark:text-white relative z-10">
				{title}
			</h3>
			<p className="mt-2 text-sm text-gray-600 dark:text-gray-300 relative z-10">
				{desc}
			</p>

			{info && (
				<p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-400 relative z-10">
					{info}
				</p>
			)}
		</div>
	);
}
