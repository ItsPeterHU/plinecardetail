import React from 'react';

export default function ReferenceCard({ img, title, note }) {
	return (
		<div className="relative bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg">
			<div
				className="h-52 bg-cover bg-center transition-transform duration-700 hover:scale-105"
				style={{ backgroundImage: `url(${img})` }}
			></div>
			<div className="p-5">
				<h4 className="font-semibold text-gray-900 dark:text-white">
					{title}
				</h4>
				<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
					{note}
				</p>
			</div>
		</div>
	);
}
