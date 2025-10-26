import React, { useState } from 'react';

export default function FAQItem({ q, a }) {
	const [open, setOpen] = useState(false);

	return (
		<div
			className="min-h-[90px] bg-white dark:bg-gray-800 shadow rounded-xl p-5 transition-all duration-500 hover:shadow-md"
		>
			<button
				onClick={() => setOpen(!open)}
				className="w-full flex justify-between items-center text-left"
			>
				<h4 className="font-medium text-gray-900 dark:text-white text-base">
					{q}
				</h4>
				<span
					className={`transform transition-transform duration-500 ${
						open ? 'rotate-180' : 'rotate-0'
					} text-gray-600 dark:text-gray-300`}
				>
					▼
				</span>
			</button>

			<div
				className={`overflow-hidden transition-all duration-700 ease-in-out ${
					open ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
					{a}
				</p>
			</div>
		</div>
	);
}
