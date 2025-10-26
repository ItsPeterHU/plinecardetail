import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../constants/assets'; // vagy '../App', ha ott van az ASSETS

const ExpandableSection = ({
	items,
	renderItem,
	initialCount = 3,
	sectionId,
}) => {
	const [showAll, setShowAll] = useState(false);

	// Automatikus visszazárás más szekcióra lépéskor
	useEffect(() => {
		const handleScroll = () => {
			const sections = document.querySelectorAll('section[id]');
			let activeSection = null;

			sections.forEach((section) => {
				const rect = section.getBoundingClientRect();
				if (rect.top <= 150 && rect.bottom >= 150) {
					activeSection = section.id;
				}
			});

			if (activeSection && activeSection !== sectionId) {
				setShowAll(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [sectionId]);

	const visibleItems = showAll ? items : items.slice(0, initialCount);

	return (
		<div className="flex flex-col items-center">
			{/* Tartalom grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
				<AnimatePresence>
					{visibleItems.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>
							{renderItem(item, index)}
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{/* Plus / Minus gomb képként */}
			{items.length > initialCount && (
				<motion.button
					onClick={() => setShowAll(!showAll)}
					className="mt-8 flex items-center justify-center transition-transform duration-300 hover:scale-110 focus:outline-none"
					aria-label={showAll ? 'Kevesebb megjelenítése' : 'Továbbiak megjelenítése'}
					whileTap={{ scale: 0.9 }}
				>
					<motion.img
						key={showAll ? 'minus' : 'plus'}
						src={showAll ? ASSETS.MINUS : ASSETS.PLUS}
						alt={showAll ? 'Kevesebb' : 'Továbbiak'}
						className="w-8 h-8 object-contain opacity-80 hover:opacity-100 transition"
						initial={{ rotate: 0 }}
						animate={{ rotate: showAll ? 180 : 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
					/>
				</motion.button>
			)}
		</div>
	);
};

export default ExpandableSection;
