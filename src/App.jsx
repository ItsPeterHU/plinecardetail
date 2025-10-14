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
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const ASSETS = {
	HERO_LIGHT: '/ben-duke-2KT5xGoFf3I-unsplash.jpg', // világos mód háttér
	HERO_DARK: '/tai-s-captures-MU85YmmGzOg-unsplash.jpg', // sötét mód háttér
	LOGO_LIGHT: '/p_linecardetail_whiteemblem.png',
	LOGO_DARK: '/p_linecardetail_blackemblem.png',
	REF1: '/LexusIS300h-finish-exterior1.jpeg',
	REF2: '/MercedesBenzGLA200-finish-exterior1.jpeg',
	REF3: '/VolkswagenPASSAT2.0TDI-interior1.jpeg',
	REF4: '/SkodaOCTAVIAexterior1.jpeg',
	TIKTOK: '/tik-tok.png',
	INSTAGRAM: '/instagram.png',
	FACEBOOK: '/facebook.png',
	HOME: '/up-arrow.png',
	SUN: '/light.png',
	MOON: '/moon.png',
	LOCATION: '/map.png',
	MOBILE: '/phone.png',
	EMAIL: '/mail.png',
	HUNGARY: '/hungary.png',
	ROMANIA: '/romania.png',
	ENGLAND: '/united-kingdom.png',
};

export default function PLineLanding() {
	const [open, setOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [visibleSections, setVisibleSections] = useState({});
	const { t } = useTranslation();

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
						<div className='flex items-center flex-shrink-0'>
							<div className='items-center gap-2 flex-shrink-0'>
								<button>
									<img
										src={ASSETS.HUNGARY}
										onClick={() =>
											i18n.changeLanguage('hu')
										}
										alt='HU'
										className={`w-6 h-6 rounded-sm border transition-transform duration-300 hover:scale-110`}
									/>
								</button>
								<button>
									<img
										src={ASSETS.ROMANIA}
										onClick={() =>
											i18n.changeLanguage('ro')
										}
										alt='RO'
										className={`w-6 h-6 rounded-sm border transition-transform duration-300 hover:scale-110`}
									/>
								</button>
								<button>
									<img
										src={ASSETS.ENGLAND}
										onClick={() =>
											i18n.changeLanguage('en')
										}
										alt='EN'
										className={`w-6 h-6 rounded-sm border transition-transform duration-300 hover:scale-110`}
									/>
								</button>
							</div>
						</div>

						<nav className='hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-500 ease-in-out'>
							<button
								onClick={() => handleNavClick('#bemutatkozas')}
								className='hover:text-gray-900 dark:hover:text-white'
							>
								{t('nav.intro')}
							</button>
							<button
								onClick={() =>
									handleNavClick('#szolgaltatasok')
								}
								className='hover:text-gray-900 dark:hover:text-white'
							>
								{t('nav.services')}
							</button>
							<button
								onClick={() => handleNavClick('#faq')}
								className='hover:text-gray-900 dark:hover:text-white'
							>
								{t('nav.faq')}
							</button>
							<button
								onClick={() => handleNavClick('#referenciak')}
								className='hover:text-gray-900 dark:hover:text-white'
							>
								{t('nav.references')}
							</button>
							<button
								onClick={() => handleNavClick('#elerhetoseg')}
								className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800'
							>
								{t('nav.contact')}
							</button>

							{/* Dark/Light Mode Toggle */}
							<button
								onClick={() => setDarkMode(!darkMode)}
								className='flex-shrink-0 ml-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500 ease-in-out'
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
								{t('nav.intro')}
							</button>
							<button
								onClick={() =>
									handleNavClick('#szolgaltatasok')
								}
								className='block py-2 text-left'
							>
								{t('nav.services')}
							</button>
							<button
								onClick={() => handleNavClick('#faq')}
								className='block py-2 text-left'
							>
								{t('nav.faq')}
							</button>
							<button
								onClick={() => handleNavClick('#referenciak')}
								className='block py-2 text-left'
							>
								{t('nav.references')}
							</button>
							<button
								onClick={() => handleNavClick('#elerhetoseg')}
								className='block py-2 text-left'
							>
								{t('nav.contact')}
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
							{t('hero.title')}
						</p>
						<div className='mt-2 flex justify-center gap-3'>
							<button
								onClick={() =>
									handleNavClick('#szolgaltatasok')
								}
								className='inline-block px-6 py-3 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-100 transition-colors duration-500 ease-in-out'
							>
								{t('nav.services')}
							</button>
							<button
								onClick={() => handleNavClick('#elerhetoseg')}
								className='inline-block px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-colors duration-500 ease-in-out'
							>
								{t('nav.booking')}
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
							{t('nav.intro')}
						</h2>
						<p className='mt-4 text-gray-700 dark:text-gray-300 max-w-3xl'>
							{t('hero.subtitle')}
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
						{t('nav.services')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<ServiceCard
							title={t('service.title1')}
							desc={t('service.serv1')}
							price='50 lei'
						/>
						<ServiceCard
							title={t('service.title2')}
							desc={t('service.serv2')}
							price='50 lei'
						/>
						<ServiceCard
							title={t('service.title3')}
							desc={t('service.serv3')}
							price={t('service.gift1')}
						/>
						<ServiceCard
							title={t('service.title4')}
							desc={t('service.serv4')}
							price='100 lei'
						/>
						<ServiceCard
							title={t('service.title5')}
							desc={t('service.serv5')}
							price='25 lei'
						/>
						<ServiceCard
							title={t('service.title6')}
							desc={t('service.serv6')}
							price={t('service.gift2')}
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
						{t('nav.faq')}
					</h2>
					<div className='space-y-4'>
						<FAQItem
							q={t('questions.faq1.q1')}
							a={t('questions.faq1.a1')}
						/>
						<FAQItem
							q={t('questions.faq2.q2')}
							a={t('questions.faq2.a2')}
						/>
						<FAQItem
							q={t('questions.faq3.q3')}
							a={t('questions.faq3.a3')}
						/>
						<FAQItem
							q={t('questions.faq4.q4')}
							a={t('questions.faq4.a4')}
						/>
						<FAQItem
							q={t('questions.faq5.q5')}
							a={t('questions.faq5.a5')}
						/>
						<FAQItem
							q={t('questions.faq6.q6')}
							a={t('questions.faq6.a6')}
						/>
						<FAQItem
							q={t('questions.faq7.q7')}
							a={t('questions.faq7.a7')}
						/>
						<FAQItem
							q={t('questions.faq8.q8')}
							a={t('questions.faq8.a8')}
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
						{t('nav.references')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<ReferenceCard
							img={ASSETS.REF1}
							title='Lexus IS300h'
							note={t('reference.ref1')}
						/>
						<ReferenceCard
							img={ASSETS.REF2}
							title='Mercedes-Benz GLA200'
							note={t('reference.ref2')}
						/>
						<ReferenceCard
							img={ASSETS.REF3}
							title='Volkswagen PASSAT 2.0TDI'
							note={t('reference.ref1')}
						/>
						<ReferenceCard
							img={ASSETS.REF4}
							title='Skoda OCTAVIA'
							note={t('reference.ref3')}
						/>
					</div>
				</section>

				{/* ELÉRHETŐSÉG */}
				<section
					id='elerhetoseg'
					className='py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-in-out'
				>
					<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
						<h2 className='text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12'>
							{t('nav.contact')}
						</h2>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12'>
							{/* Helyszín */}
							<div className='flex flex-col items-center'>
								<img
									src={ASSETS.LOCATION}
									alt='Helyszín ikon'
									className='w-12 h-12 mb-4 transform transition duration-300 hover:scale-110 hover:opacity-80'
								/>
								<p className='text-gray-700 dark:text-gray-300'>
									Székelyudvarhely, RO
								</p>
							</div>

							{/* Mobil */}
							<div className='flex flex-col items-center'>
								<img
									src={ASSETS.MOBILE}
									alt='Telefon ikon'
									className='w-12 h-12 mb-4 transform transition duration-300 hover:scale-110 hover:opacity-80'
								/>
								<p className='text-gray-700 dark:text-gray-300'>
									+40 772 079 191
								</p>
							</div>

							{/* Email */}
							<div className='flex flex-col items-center'>
								<img
									src={ASSETS.EMAIL}
									alt='E-mail ikon'
									className='w-12 h-12 mb-4 transform transition duration-300 hover:scale-110 hover:opacity-80'
								/>
								<p className='text-gray-700 dark:text-gray-300'>
									info@plinecardetail.com
								</p>
							</div>
						</div>

						{/* Social Media külön sorban */}
						<div className='flex justify-center gap-12'>
							<a
								href='https://www.tiktok.com/@p_linecardetail'
								target='_blank'
								rel='noopener noreferrer'
								className='transform transition duration-300 hover:scale-110 hover:opacity-80'
							>
								<img
									src={ASSETS.TIKTOK}
									alt='TikTok'
									className='w-10 h-10'
								/>
							</a>
							<a
								href='https://www.instagram.com/p_linecardetail/'
								target='_blank'
								rel='noopener noreferrer'
								className='transform transition duration-300 hover:scale-110 hover:opacity-80'
							>
								<img
									src={ASSETS.INSTAGRAM}
									alt='Instagram'
									className='w-10 h-10'
								/>
							</a>
							<a
								href='https://facebook.com'
								target='_blank'
								rel='noopener noreferrer'
								className='transform transition duration-300 hover:scale-110 hover:opacity-80'
							>
								<img
									src={ASSETS.FACEBOOK}
									alt='Facebook'
									className='w-10 h-10'
								/>
							</a>
						</div>
					</div>
				</section>

				{/* FOOTER */}
				<footer className='py-8 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500 ease-in-out'>
					© {new Date().getFullYear()} {t('about.text')}
				</footer>
				<ScrollToTopButton />
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

function ScrollToTopButton() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setShow(true);
			} else {
				setShow(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (!show) return null;

	return (
		<button
			onClick={scrollToTop}
			className='fixed bottom-6 right-6 p-3 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:scale-110 transition-transform duration-300'
			aria-label='Vissza a tetejére'
		>
			<img
				src={ASSETS.HOME}
				alt='Home'
				className='w-6 h-6 object-contain'
			/>
		</button>
	);
}
