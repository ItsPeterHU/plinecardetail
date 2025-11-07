import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
	ServiceCard,
	FAQItem,
	ReferenceCard,
	ExpandableSection,
} from './components';
import { ASSETS } from './constants';

export default function App() {
	const { t, i18n } = useTranslation();
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem('darkMode');
		return saved ? JSON.parse(saved) : true; // alapból true, ha nincs mentett érték
	});

	// Görgetés figyelése (átlátszóság + nyíl megjelenés)
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 30);
			setShowScrollTop(window.scrollY > 200);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Sötét mód kapcsoló
	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode);
		localStorage.setItem('darkMode', JSON.stringify(darkMode));
	}, [darkMode]);

	// Navigációs gombok lassú görgetése
	const handleNavClick = (id) => {
		const section = document.querySelector(id);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
			setOpen(false);
		}
	};

	// Animációs osztály
	const fadeClass = () =>
		'transition-opacity duration-700 ease-in-out opacity-100';

	return (
		<div className='min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 ease-in-out'>
			{/* === NAV === */}
			<header
				className={`fixed w-full z-40 backdrop-blur-md shadow-sm transition-all duration-500 ease-in-out ${
					scrolled
						? 'bg-white/90 dark:bg-gray-900/90 shadow-lg'
						: 'bg-white/40 dark:bg-gray-900/40'
				}`}
			>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						{/* BAL OLDAL */}
						<h1 className='text-xl font-semibold text-gray-900 dark:text-white'>
							P-Line Car Detail
						</h1>

						{/* MENÜ - DESKTOP */}
						<nav className='hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200'>
							{[
								['#bemutatkozas', t('nav.about')],
								['#szolgaltatasok', t('nav.services')],
								['#faq', t('nav.faq')],
								['#referenciak', t('nav.references')],
								['#elerhetoseg', t('nav.contact')],
							].map(([id, label]) => (
								<button
									key={id}
									onClick={() => handleNavClick(id)}
									className='hover:text-gray-900 dark:hover:text-white transition-colors'
								>
									{label}
								</button>
							))}

							{/* NYELV ZÁSZLÓK */}
							<div className='flex items-center gap-3 ml-4'>
								{[
									['hu', ASSETS.HUNGARY],
									['ro', ASSETS.ROMANIA],
									['en', ASSETS.ENGLAND],
								].map(([lang, flag]) => (
									<button
										key={lang}
										onClick={() =>
											i18n.changeLanguage(lang)
										}
										className='transition-transform duration-300 hover:scale-110'
									>
										<img
											src={flag}
											alt={lang}
											className={`h-6 w-6 rounded-full border border-gray-300 transition-all duration-300 ${
												i18n.language === lang
													? 'grayscale-0 opacity-100'
													: 'grayscale opacity-60'
											}`}
										/>
									</button>
								))}
							</div>

							{/* DARK MODE */}
							<button
								onClick={() => setDarkMode(!darkMode)}
								className='ml-4 relative p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500 ease-in-out group'
								aria-label='Dark mode toggle'
							>
								<img
									src={darkMode ? ASSETS.SUN : ASSETS.MOON}
									alt='mode'
									className={`w-6 h-6 transform transition-all duration-700 ease-in-out 
										${
											darkMode
												? 'rotate-[360deg] scale-110 opacity-90 drop-shadow-[0_0_8px_#facc15]' // napfény effekt
												: 'rotate-0 scale-100 opacity-100 drop-shadow-[0_0_6px_#60a5fa]' // holdfény effekt
										}`}
								/>
							</button>
						</nav>

						{/* MOBIL MENÜ */}
						<div className='lg:hidden flex items-center gap-2'>
							{/* ZÁSZLÓK MOBILRA */}
							<div className='flex items-center gap-2'>
								{[
									['hu', ASSETS.HUNGARY],
									['ro', ASSETS.ROMANIA],
									['en', ASSETS.ENGLAND],
								].map(([lang, flag]) => (
									<button
										key={lang}
										onClick={() =>
											i18n.changeLanguage(lang)
										}
										className='transition-transform duration-300 hover:scale-110'
									>
										<img
											src={flag}
											alt={lang}
											className={`h-5 w-5 rounded-full border border-gray-300 transition-all duration-300 ${
												i18n.language === lang
													? 'grayscale-0 opacity-100'
													: 'grayscale opacity-60'
											}`}
										/>
									</button>
								))}
							</div>

							{/* DARK MODE - MOBILE */}
							<button
								onClick={() => setDarkMode(!darkMode)}
								className='p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500 ease-in-out group'
								aria-label='Dark mode toggle'
							>
								<img
									src={darkMode ? ASSETS.SUN : ASSETS.MOON}
									alt='mode'
									className={`w-6 h-6 transform transition-all duration-700 ease-in-out 
										${
											darkMode
												? 'rotate-[360deg] scale-110 opacity-90 drop-shadow-[0_0_6px_#facc15]'
												: 'rotate-0 scale-100 opacity-100 drop-shadow-[0_0_5px_#60a5fa]'
										}`}
								/>
							</button>

							{/* SZENDVICSMENÜ */}
							<button
								onClick={() => setOpen(!open)}
								className='p-2 rounded-md'
							>
								<svg
									className='w-6 h-6 text-gray-700 dark:text-gray-200'
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

				{/* MOBIL LENYÍLÓ MENÜ */}
				{open && (
					<div className='md:hidden px-4 pb-4 bg-white/90 dark:bg-gray-900/90'>
						<div className='flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200'>
							{[
								['#bemutatkozas', t('nav.about')],
								['#szolgaltatasok', t('nav.services')],
								['#faq', t('nav.faq')],
								['#referenciak', t('nav.references')],
								['#elerhetoseg', t('nav.contact')],
							].map(([id, label]) => (
								<button
									key={id}
									onClick={() => handleNavClick(id)}
									className='block py-2 text-left'
								>
									{label}
								</button>
							))}
						</div>
					</div>
				)}
			</header>

			{/* === FELGÖRGETŐ GOMB === */}
			{showScrollTop && (
				<button
					onClick={() =>
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}
					className='z-[9999] fixed bottom-6 right-6 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300'
				>
					<img
						src={ASSETS.HOME}
						alt='Scroll to top'
						className='w-6 h-6'
					/>
				</button>
			)}

			{/* === HERO + TÖBBI SZEKCIÓ === */}
			<main className='pt-20'>
				<section
					id='hero'
					className='relative min-h-[65vh] flex items-center justify-center transition-colors duration-500 ease-in-out'
					style={{
						backgroundImage: `url('${
							darkMode ? ASSETS.HERO_DARK : ASSETS.HERO_LIGHT
						}')`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<div className='max-w-3xl mx-auto px-3 py-1 bg-white/50 dark:bg-gray-900/70 rounded-xl shadow backdrop-blur-sm text-center transition-colors duration-500 ease-in-out'>
						<img
							src={
								darkMode ? ASSETS.LOGO_LIGHT : ASSETS.LOGO_DARK
							}
							alt='P-Line Car Detail logo'
							className='mx-auto mb-1 w-48 md:w-64'
						/>
						<p className='text-lg text-gray-800 dark:text-gray-200'>
							{t('hero.headline')}
						</p>
						<p className='mt-2 text-gray-600 dark:text-gray-400'>
							{t('hero.text')}
						</p>

						<div className='mt-6 flex justify-center gap-3'>
							<button
								onClick={() =>
									document
										.getElementById('szolgaltatasok')
										.scrollIntoView({ behavior: 'smooth' })
								}
								className='px-6 py-3 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-100 transition-colors'
							>
								{t('hero.cta1')}
							</button>
							<button
								onClick={() =>
									document
										.getElementById('elerhetoseg')
										.scrollIntoView({ behavior: 'smooth' })
								}
								className='px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-colors'
							>
								{t('hero.cta2')}
							</button>
						</div>
					</div>
				</section>

				{/* BEMUTATKOZÁS */}
				<section
					id='bemutatkozas'
					className={`w-full flex justify-center py-16 text-center ${fadeClass(
						'bemutatkozas'
					)}`}
				>
					<div className='max-w-3xl px-4'>
						<h2 className='text-2xl font-semibold mb-6 text-gray-900 dark:text-white'>
							{t('about.title')}
						</h2>
						<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
							{t('about.text')}
						</p>
					</div>
				</section>

				{/* SZOLGÁLTATÁSOK */}
				<section
					id='szolgaltatasok'
					className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center ${fadeClass(
						'szolgaltatasok'
					)}`}
				>
					<h2 className='text-2xl font-semibold mb-8 text-gray-900 dark:text-white'>
						{t('services.title')}
					</h2>

					<ExpandableSection
						sectionId='szolgaltatasok'
						items={[
							...Array.from({ length: 12 }, (_, i) => ({
								title: t(`services.service${i + 1}.name`),
								desc: t(`services.service${i + 1}.desc`),
								price: t(`services.service${i + 1}.price`),
							})),
						]}
						initialCount={3}
						renderItem={(item) => (
							<ServiceCard
								title={item.title}
								desc={item.desc}
								info={item.price}
							/>
						)}
					/>
				</section>

				{/* GYAKORI KÉRDÉSEK */}
				<section
					id='faq'
					className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center ${fadeClass(
						'faq'
					)}`}
				>
					<h2 className='text-2xl font-semibold mb-8 text-gray-900 dark:text-white'>
						{t('nav.faq')}
					</h2>

					<ExpandableSection
						sectionId='faq'
						items={Array.from({ length: 12 }, (_, i) => ({
							q: t(`questions.faq${i + 1}.q`),
							a: t(`questions.faq${i + 1}.a`),
						}))}
						initialCount={3}
						renderItem={(item, index) => (
							<FAQItem key={index} q={item.q} a={item.a} />
						)}
					/>
				</section>

				{/* REFERENCIÁK */}
				<section
					id='referenciak'
					className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center ${fadeClass(
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
							note={t('references.ref1')}
						/>
						<ReferenceCard
							img={ASSETS.REF2}
							title='Mercedes-Benz GLA200'
							note={t('references.ref2')}
						/>
						<ReferenceCard
							img={ASSETS.REF3}
							title='Volkswagen PASSAT 2.0TDI'
							note={t('references.ref3')}
						/>
						<ReferenceCard
							img={ASSETS.REF4}
							title='Skoda OCTAVIA'
							note={t('references.ref4')}
						/>
					</div>
				</section>

				{/* ELÉRHETŐSÉGEK */}
				<section
					id='elerhetoseg'
					className='w-full flex justify-center py-16 text-center text-gray-900 dark:text-white'
				>
					<div className='max-w-4xl w-full px-4'>
						<h2 className='text-2xl font-semibold mb-8'>
							{t('contact.title')}
						</h2>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center'>
							<div className='flex flex-col gap-2'>
								<p>{t('contact.address')}</p>
								<p>{t('contact.phone')}</p>
								<p>{t('contact.email')}</p>
							</div>

							<div className='flex flex-col gap-3'>
								<a href='#' className='hover:underline'>
									{t('contact.social.tiktok')}
								</a>
								<a href='#' className='hover:underline'>
									{t('contact.social.instagram')}
								</a>
								<a href='#' className='hover:underline'>
									{t('contact.social.facebook')}
								</a>
							</div>
						</div>

						<p className='mt-12 text-center text-gray-600 dark:text-gray-400'>
							{t('contact.footer')}
						</p>
					</div>
				</section>
			</main>
		</div>
	);
}
