/*
P-Line Car Detail Landing Page (single-file React component)
- Tailwind CSS utility classes are used for styling (assumes Tailwind is set up in the project)
- Supports Dark/Light mode with a toggle button in navbar
- Light mode: white and gray shades (default)
- Dark mode: dark blue/gray premium palette
- Smooth animated transitions between modes + rotating toggle icon
- Fade-in animation for sections on scroll
- Smooth scroll to sections + auto-close mobile menu

IMPORTANT: Make sure Tailwind config has: darkMode: "class"
*/

import React, { useState, useEffect } from 'react';
import { FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';

const ASSETS = {
	HERO_LIGHT: '/maxim-potkin-_jagF3AakVc-unsplash.jpg', // világos mód háttér
	HERO_DARK: '/tai-s-captures-MU85YmmGzOg-unsplash.jpg', // sötét mód háttér
	LOGO_LIGHT: '/p_linecardetail_whiteemblem.png',
	LOGO_DARK: '/p_linecardetail_blackemblem.png',
	REF1: '/LexusIS300h-finish-exterior1.jpeg',
	REF2: '/MercedesBenzGLA200-finish-exterior1.jpeg',
	REF3: '/VolkswagenPASSAT2.0TDI-interior1.jpeg',
	REF4: '',
	HOME: '/home-button.png',
	SUN: '/light.png',
	MOON: '/moon.png',
};

export default function PLineLanding() {
	const [open, setOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [visibleSections, setVisibleSections] = useState({});

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisibleSections((prev) => ({
							...prev,
							[entry.target.id]: true,
						}));
					}
				});
			},
			{ threshold: 0.2 }
		);

		document
			.querySelectorAll('section')
			.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		document.documentElement.style.scrollBehavior = 'smooth';
		return () => {
			document.documentElement.style.scrollBehavior = 'auto';
		};
	}, []);

	const handleNavClick = (id) => {
		const el = document.querySelector(id);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
		setOpen(false);
	};

	const fadeClass = (id) =>
		`transition-all duration-1000 ease-out transform ${
			visibleSections[id]
				? 'opacity-100 translate-y-0'
				: 'opacity-0 translate-y-6'
		}`;

	return (
		<div className='min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 font-sans dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 dark:text-gray-100 transition-colors duration-500 ease-in-out'>
			{/* NAV */}
			<header className='backdrop-blur-md bg-white/70 dark:bg-gray-900/70 fixed w-full z-40 shadow-sm transition-colors duration-500 ease-in-out'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<div className='flex items-center gap-3'>
							<button
								onClick={() =>
									window.scrollTo({
										top: 0,
										behavior: 'smooth',
									})
								}
								className='focus:outline-none'
								aria-label='Home'
							>
								<img
									src={ASSETS.HOME}
									alt='Home'
									className='h-8 w-8 object-contain transition-transform duration-300 hover:scale-110'
								/>
							</button>
						</div>

						<nav className='hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-500 ease-in-out'>
							<button
								onClick={() => handleNavClick('#bemutatkozas')}
								className='hover:text-gray-900 dark:hover:text-white'
							>
								Bemutatkozás
							</button>
							<button
								onClick={() =>
									handleNavClick('#szolgaltatasok')
								}
								className='hover:text-gray-900 dark:hover:text-white'
							>
								Szolgáltatások
							</button>
							<button
								onClick={() => handleNavClick('#faq')}
								className='hover:text-gray-900 dark:hover:text-white'
							>
								Gyakori kérdések
							</button>
							<button
								onClick={() => handleNavClick('#referenciak')}
								className='hover:text-gray-900 dark:hover:text-white'
							>
								Referenciák
							</button>
							<button
								onClick={() => handleNavClick('#elerhetoseg')}
								className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800'
							>
								Elérhetőségek
							</button>

							{/* Dark/Light Mode Toggle */}
							<button
								onClick={() => setDarkMode(!darkMode)}
								className='ml-4 p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500 ease-in-out'
								aria-label='Dark mode toggle'
							>
								<img
									src={darkMode ? ASSETS.SUN : ASSETS.MOON}
									alt='mode switch'
									className={`w-6 h-6 transform transition-transform duration-500 ${
										darkMode ? 'rotate-180' : 'rotate-0'
									}`}
								/>
							</button>
						</nav>

						<div className='md:hidden flex items-center gap-2'>
							<button
								onClick={() => setDarkMode(!darkMode)}
								className='p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500 ease-in-out'
								aria-label='Dark mode toggle'
							>
								<img
									src={darkMode ? ASSETS.SUN : ASSETS.MOON}
									alt='mode switch'
									className={`w-6 h-6 transform transition-transform duration-500 ${
										darkMode ? 'rotate-180' : 'rotate-0'
									}`}
								/>
							</button>

							<button
								onClick={() => setOpen(!open)}
								aria-label='menu'
								className='p-2 rounded-md'
							>
								<svg
									className='w-6 h-6 text-gray-700 dark:text-gray-200 transition-colors duration-500 ease-in-out'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d={
											open
												? 'M6 18L18 6M6 6l12 12'
												: 'M4 6h16M4 12h16M4 18h16'
										}
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{open && (
					<div className='md:hidden px-4 pb-4 bg-white/90 dark:bg-gray-900/90 transition-colors duration-500 ease-in-out'>
						<div className='flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200'>
							<button
								onClick={() => handleNavClick('#bemutatkozas')}
								className='block py-2 text-left'
							>
								Bemutatkozás
							</button>
							<button
								onClick={() =>
									handleNavClick('#szolgaltatasok')
								}
								className='block py-2 text-left'
							>
								Szolgáltatások
							</button>
							<button
								onClick={() => handleNavClick('#faq')}
								className='block py-2 text-left'
							>
								Gyakori kérdések
							</button>
							<button
								onClick={() => handleNavClick('#referenciak')}
								className='block py-2 text-left'
							>
								Referenciák
							</button>
							<button
								onClick={() => handleNavClick('#elerhetoseg')}
								className='block py-2 text-left'
							>
								Elérhetőségek
							</button>
						</div>
					</div>
				)}
			</header>

			{/* HERO */}
			<main className='pt-20'>
				<section
					id='hero'
					className='relative flex items-center justify-center py-12 transition-colors duration-500 ease-in-out'
					style={{
						backgroundImage: `url('${
							darkMode ? ASSETS.HERO_DARK : ASSETS.HERO_LIGHT
						}')`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<div className='bg-white/50 dark:bg-gray-900/70 rounded-xl p-1 md:p-8 shadow transition-colors duration-500 ease-in-out backdrop-blur-sm text-center max-w-2xl mx-auto'>
						<img
							src={
								darkMode ? ASSETS.LOGO_LIGHT : ASSETS.LOGO_DARK
							}
							alt='P-Line Car Detail logo'
							className='mx-auto w-48 md:w-64'
						/>
						<p className='mt-2 text-lg text-gray-700 dark:text-gray-300 transition-colors duration-500 ease-in-out'>
							Japán minőség, magyar kéz által — prémium autóápolás
							Székelyudvarhelyen. Külső-belső tisztítás,
							kárpittisztítás és részletgazdag ápolás, ahogy a
							luxusautók megkívánják.
						</p>
						<div className='mt-2 flex justify-center gap-3'>
							<button
								onClick={() =>
									handleNavClick('#szolgaltatasok')
								}
								className='inline-block px-6 py-3 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-100 transition-colors duration-500 ease-in-out'
							>
								Szolgáltatások
							</button>
							<button
								onClick={() => handleNavClick('#elerhetoseg')}
								className='inline-block px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-colors duration-500 ease-in-out'
							>
								Foglalás & Elérhetőségek
							</button>
						</div>
					</div>
				</section>

				{/* BEMUTATKOZÁS */}
				<section
					id='bemutatkozas'
					className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${fadeClass(
						'bemutatkozas'
					)}`}
				>
					<div className='bg-white dark:bg-gray-800 shadow rounded-2xl p-8 md:p-12 transition-colors duration-500 ease-in-out'>
						<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
							Bemutatkozás
						</h2>
						<p className='mt-4 text-gray-700 dark:text-gray-300 max-w-3xl'>
							Székelyudvarhelyre költöztem Magyarországról, és a
							P-Line Car Detailt azért hoztam létre, hogy prémium,
							mégis személyes autóápolást nyújtsak a környék
							autótulajdonosainak. A saját Lexusom inspirált —
							precíz, megbízható és hosszú távon tartós
							megoldásokat alkalmazok minden autón.
						</p>
					</div>
				</section>

				{/* SZOLGÁLTATÁSOK */}
				<section
					id='szolgaltatasok'
					className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${fadeClass(
						'szolgaltatasok'
					)}`}
				>
					<h2 className='text-2xl font-semibold mb-8 text-gray-900 dark:text-white'>
						Szolgáltatások
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<ServiceCard
							title='Külső mosás'
							desc='Alapos több lépcsős mosás kézileg befejezve, prémium szerekkel és technikával.'
							price='50 lei'
						/>
						<ServiceCard
							title='Belső takarítás'
							desc='Kárpit, műszerfal és belső elemek tisztítása és ápolása.'
							price='50 lei'
						/>
						<ServiceCard
							title='Kárpittisztítás'
							desc='Mélytisztítás és folteltávolítás szövet- és bőrfelületeken.'
							price='150 lei *Bevezető áron*'
						/>
						<ServiceCard
							title='Motortér prémium gondoskodás'
							desc='Kímélő tisztítása speciális módszerrel, műanyag és gumifelületek ápolása.'
							price='100 lei'
						/>
						<ServiceCard
							title='Felnik felületkezelése'
							desc='Tisztítás, ápoló bevonat a jobb szennyeződés taszításért és hosszan tartó ragyogásért.'
							price='25 lei'
						/>
						<ServiceCard
							title='Személyre szabott megoldások*'
							desc='Egyedi kérésekhez igazodva.'
							price='*Megbeszéltek alapján'
						/>
					</div>
				</section>

				{/* GYAKORI KÉRDÉSEK */}
				<section
					id='faq'
					className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${fadeClass(
						'faq'
					)}`}
				>
					<h2 className='text-2xl font-semibold mb-8 text-gray-900 dark:text-white'>
						Gyakori kérdések
					</h2>
					<div className='space-y-4'>
						<FAQItem
							q='Mennyi ideig tart egy teljes külső tisztítás?'
							a='Átlagosan 1-2 órát vesz igénybe az autó méretétől és állapotától függően.'
						/>
						<FAQItem
							q='Mennyi ideig tart egy teljes belső takarítás?'
							a='Átlagosan 2-3 órát vesz igénybe az autó méretétől és állapotától függően.'
						/>
						<FAQItem
							q='Külső és belső takarítást követően is ápoljátok a felületeket?'
							a='Igen, mind a kettő esetben teljes tisztítást, majd ápolást kap a felület.'
						/>
						<FAQItem
							q='Mennyire vagytok alaposak?'
							a='Mind külső és belső felületeknél is használjuk a speciális ecseteket, hogy a legnehezebben elérhető helyekről is kitudjuk venni a szennyeződéseket.'
						/>
						<FAQItem
							q='Készül kép/videó anyag az autómról?'
							a='Before/After fénykép vagy videó dokumentáció történik minden szolgáltatásnál, visszatérő ügyfélnél is.'
						/>
						<FAQItem
							q='Vállaltok garanciát?'
							a='Természetesen. Emberek vagyunk, hibázhatunk. Átvételtől számítva 24 órás elégedettségi garanciát vállalok.'
						/>
						<FAQItem
							q='Mire terjed ki a garancia?'
							a='Szennyeződés maradványnál ingyen kijavítom a kezelt részt.'
						/>
						<FAQItem
							q='Fog bővülni a szolgáltatási körötök?'
							a='Mindenképpen. Polirozás és kerámia bevonatok elérhetőek lesznek a jövőben.'
						/>
					</div>
				</section>

				{/* REFERENCIÁK */}
				<section
					id='referenciak'
					className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${fadeClass(
						'referenciak'
					)}`}
				>
					<h2 className='text-2xl font-semibold mb-8 text-gray-900 dark:text-white'>
						Referenciák
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<ReferenceCard
							img={ASSETS.REF1}
							title='Lexus IS300h'
							note='Teljes külső-belső tisztítás, ápolás és kárpittisztítás.'
						/>
						<ReferenceCard
							img={ASSETS.REF2}
							title='Mercedes-Benz GLA200'
							note='Teljes külső-belső tisztítás, ápolás és alcantara bőrtisztítás.'
						/>
						<ReferenceCard
							img={ASSETS.REF3}
							title='Volkswagen PASSAT 2.0TDI'
							note='Teljes külső-belső tisztítás, ápolás és kárpittisztítás.'
						/>
						<ReferenceCard
							img={ASSETS.REF4}
							title='Audi RS6'
							note='Külső mosás, ápolás.'
						/>
					</div>
				</section>

				{/* ELÉRHETŐSÉG */}
				<section
					id='elerhetoseg'
					className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${fadeClass(
						'elerhetoseg'
					)}`}
				>
					<div className='bg-white dark:bg-gray-800 shadow rounded-2xl p-8 md:p-12 transition-colors duration-500 ease-in-out'>
						<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
							Elérhetőségek
						</h2>
						<p className='mt-4 text-gray-700 dark:text-gray-300'>
							📍 Székelyudvarhely
							<br />
							📞 +40 772 079 191
							<br />
							✉️ info@plinecardetail.ro
						</p>
						<div className='mt-6 flex gap-6 text-3xl'>
							<a
								href='https://www.tiktok.com/@p_linecardetail'
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
							>
								<FaTiktok />
							</a>
							<a
								href='https://www.instagram.com/p_linecardetail/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
							>
								<FaInstagram />
							</a>
							<a
								href='#'
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
							>
								<FaFacebook />
							</a>
						</div>
					</div>
				</section>

				{/* FOOTER */}
				<footer className='py-8 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500 ease-in-out'>
					© {new Date().getFullYear()} P-Line Car Detail — Japán
					minőség, magyar kéz által, Székelyföld szívében.
				</footer>
			</main>
		</div>
	);
}

/* UI components */
function ServiceCard({ title, desc, price }) {
	return (
		<div className='bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition-colors duration-500 ease-in-out'>
			<h3 className='font-semibold text-gray-900 dark:text-white'>
				{title}
			</h3>
			<p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
				{desc}
			</p>
			<p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
				{price}
			</p>
		</div>
	);
}

function FAQItem({ q, a }) {
	return (
		<div className='bg-white dark:bg-gray-800 shadow rounded-xl p-5 transition-colors duration-500 ease-in-out'>
			<h4 className='font-medium text-gray-900 dark:text-white'>{q}</h4>
			<p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>{a}</p>
		</div>
	);
}

function ReferenceCard({ img, title, note }) {
	return (
		<div className='bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden transition-colors duration-500 ease-in-out'>
			<div
				className='h-48 bg-cover bg-center'
				style={{ backgroundImage: `url('${img}')` }}
			></div>
			<div className='p-4'>
				<h4 className='font-semibold text-gray-900 dark:text-white'>
					{title}
				</h4>
				<p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
					{note}
				</p>
			</div>
		</div>
	);
}
