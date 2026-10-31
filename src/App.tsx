import { useState, useEffect, useRef } from 'react';
import { translations, Language } from './i18n';
import {
  Menu,
  X,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Truck,
  Droplets,
  Globe,
  Lock,
  Save,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

// Default images from Unsplash
const defaultImages = {
  hero: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
  about: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
  service1: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  service2: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&q=80',
  service3: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&q=80',
  service4: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
};

// Admin password (in production, use proper auth)
const ADMIN_PASSWORD = 'admin2024';

// LocalStorage keys
const STORAGE_KEY_CONTENT = 'serenity_massage_content';
const STORAGE_KEY_IMAGES = 'serenity_massage_images';
const STORAGE_KEY_LANG = 'serenity_massage_lang';

// Calendly URL - replace with your own
const CALENDLY_URL = 'https://calendly.com/your-username/60min';

function App() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEY_LANG) as Language) || 'en';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Content state (editable via admin)
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
    if (saved) return JSON.parse(saved);
    return null;
  });

  // Images state (editable via admin)
  const [images, setImages] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_IMAGES);
    if (saved) return JSON.parse(saved);
    return { ...defaultImages };
  });

  const t = translations[lang];

  // Scroll listener for header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  }, [lang]);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % 6);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Calendly widget
  useEffect(() => {
    if (adminOpen) return;
    const timer = setTimeout(() => {
      const container = document.getElementById('calendly-inline-widget');
      if (container && typeof (window as any).Calendly !== 'undefined') {
        container.innerHTML = '';
        (window as any).Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: container,
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [lang, adminOpen]);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminAuth(true);
      setAdminError('');
    } else {
      setAdminError(lang === 'en' ? 'Incorrect password' : 'Неверный пароль');
    }
  };

  const handleSaveContent = () => {
    localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(content));
    localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(images));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY_CONTENT);
    localStorage.removeItem(STORAGE_KEY_IMAGES);
    setContent(null);
    setImages({ ...defaultImages });
  };

  const updateContent = (path: string, value: string) => {
    setContent((prev: any) => {
      const newContent = { ...prev };
      const keys = path.split('.');
      let obj: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const getContentValue = (path: string, fallback: string): string => {
    if (!content) return fallback;
    const keys = path.split('.');
    let obj: any = content;
    for (const key of keys) {
      if (obj && obj[key] !== undefined) {
        obj = obj[key];
      } else {
        return fallback;
      }
    }
    return typeof obj === 'string' ? obj : fallback;
  };

  const reviews = [
    { name: t.reviews.items.review1.name, text: t.reviews.items.review1.text, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80' },
    { name: t.reviews.items.review2.name, text: t.reviews.items.review2.text, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { name: t.reviews.items.review3.name, text: t.reviews.items.review3.text, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { name: t.reviews.items.review4.name, text: t.reviews.items.review4.text, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
    { name: t.reviews.items.review5.name, text: t.reviews.items.review5.text, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
    { name: t.reviews.items.review6.name, text: t.reviews.items.review6.text, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
  ];

  const services = [
    { key: 'deepTissue', image: images.service1 },
    { key: 'swedish', image: images.service2 },
    { key: 'sports', image: images.service3 },
    { key: 'aromatherapy', image: images.service4 },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-lg font-bold">S</span>
              </div>
              <span className={`font-serif text-xl font-semibold ${scrolled ? 'text-stone-800' : 'text-white'}`}>
                Serenity
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { href: '#home', label: t.nav.home },
                { href: '#services', label: t.nav.services },
                { href: '#about', label: t.nav.about },
                { href: '#reviews', label: t.nav.reviews },
                { href: '#booking', label: t.nav.booking },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                    scrolled ? 'text-stone-700' : 'text-white/90'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Language Switcher + CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  scrolled
                    ? 'border-stone-300 text-stone-700 hover:border-amber-500'
                    : 'border-white/40 text-white hover:border-white/80'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'en' ? 'RU' : 'EN'}
              </button>
              <a
                href="#booking"
                className="hidden sm:inline-flex px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-amber-700/30"
              >
                {t.nav.booking}
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden ${scrolled ? 'text-stone-800' : 'text-white'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-xl border-t">
            <nav className="flex flex-col px-6 py-4 gap-3">
              {[
                { href: '#home', label: t.nav.home },
                { href: '#services', label: t.nav.services },
                { href: '#about', label: t.nav.about },
                { href: '#reviews', label: t.nav.reviews },
                { href: '#booking', label: t.nav.booking },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-stone-700 font-medium py-2 border-b border-stone-100"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt="Premium Massage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium">{content?.heroBadge || t.hero.badge}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {content?.heroTitle || t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            {content?.heroSubtitle || t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-700 hover:bg-amber-600 text-white text-lg font-semibold rounded-full transition-all shadow-2xl shadow-amber-700/40 hover:scale-105"
            >
              {t.hero.cta}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-semibold rounded-full border border-white/30 transition-all"
            >
              {t.nav.services}
            </a>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              {content?.servicesTitle || t.services.title}
            </h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              {content?.servicesSubtitle || t.services.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => {
              const serviceData = (t.services.items as any)[service.key];
              return (
                <div
                  key={idx}
                  className="group bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={serviceData.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-stone-800 mb-3">
                      {serviceData.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">
                      {serviceData.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-700 font-bold text-lg">{serviceData.price}</span>
                      <a
                        href="#booking"
                        className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                      >
                        {t.nav.booking} →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <img
                src={images.about}
                alt="About Us"
                className="rounded-2xl shadow-2xl w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-700 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="text-3xl font-bold font-serif">8+</div>
                <div className="text-sm opacity-90">{lang === 'en' ? 'Years Experience' : 'Лет опыта'}</div>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 mb-4">
                {content?.aboutTitle || t.about.title}
              </h2>
              <p className="text-amber-700 font-medium text-lg mb-6">
                {content?.aboutSubtitle || t.about.subtitle}
              </p>
              <p className="text-stone-600 leading-relaxed mb-8 text-lg">
                {content?.aboutDescription || t.about.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5" />, text: t.about.features.certified },
                  { icon: <Truck className="w-5 h-5" />, text: t.about.features.equipment },
                  { icon: <Droplets className="w-5 h-5" />, text: t.about.features.oils },
                  { icon: <MapPin className="w-5 h-5" />, text: t.about.features.coverage },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-stone-700 font-medium text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              {content?.reviewsTitle || t.reviews.title}
            </h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              {content?.reviewsSubtitle || t.reviews.subtitle}
            </p>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-600 leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-stone-800">{review.name}</div>
                    <div className="text-sm text-stone-500">{lang === 'en' ? 'Verified Client' : 'Проверенный клиент'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile slider */}
          <div className="md:hidden">
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic min-h-[120px]">
                "{reviews[currentReview].text}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={reviews[currentReview].avatar}
                  alt={reviews[currentReview].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-stone-800">{reviews[currentReview].name}</div>
                  <div className="text-sm text-stone-500">{lang === 'en' ? 'Verified Client' : 'Проверенный клиент'}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentReview((prev) => (prev - 1 + 6) % 6)}
                className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-amber-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-stone-700" />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentReview ? 'bg-amber-700 w-6' : 'bg-stone-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentReview((prev) => (prev + 1) % 6)}
                className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-amber-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-stone-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 md:py-28 bg-gradient-to-br from-stone-900 to-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.booking.title}
            </h2>
            <p className="text-stone-300 text-lg max-w-2xl mx-auto">
              {t.booking.subtitle}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Calendly inline widget */}
            <div
              id="calendly-inline-widget"
              className="calendly-inline-widget w-full"
              style={{ minWidth: '320px', height: '700px' }}
            />
            {/* Fallback if Calendly doesn't load */}
            <div className="p-8 text-center">
              <p className="text-stone-600 mb-4">
                {lang === 'en'
                  ? 'If the calendar doesn\'t load, please use the link below:'
                  : 'Если календарь не загружается, используйте ссылку ниже:'}
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-full transition-all"
              >
                <Clock className="w-5 h-5" />
                {lang === 'en' ? 'Open Scheduling Page' : 'Открыть страницу записи'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-serif text-lg font-bold">S</span>
                </div>
                <span className="font-serif text-xl font-semibold">Serenity</span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">{t.footer.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">{t.nav.contact}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-stone-400">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">{t.footer.address}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">{t.footer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">{t.footer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">{t.footer.hours}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">{t.nav.services}</h4>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li><a href="#services" className="hover:text-amber-400 transition-colors">{t.services.items.deepTissue.title}</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">{t.services.items.swedish.title}</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">{t.services.items.sports.title}</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">{t.services.items.aromatherapy.title}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-stone-500 text-sm">{t.footer.rights}</p>
            <button
              onClick={() => setAdminOpen(true)}
              className="text-stone-600 hover:text-amber-500 text-xs transition-colors flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              {t.footer.adminLink}
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Modal */}
      {adminOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setAdminOpen(false); setAdminAuth(false); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Admin Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h3 className="font-serif text-2xl font-bold text-stone-800">{t.admin.title}</h3>
              <div className="flex items-center gap-3">
                {adminAuth && (
                  <button
                    onClick={() => setAdminAuth(false)}
                    className="text-sm text-stone-600 hover:text-red-600 transition-colors"
                  >
                    {t.admin.logout}
                  </button>
                )}
                <button
                  onClick={() => { setAdminOpen(false); setAdminAuth(false); }}
                  className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Admin Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!adminAuth ? (
                /* Login Form */
                <div className="max-w-sm mx-auto py-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-amber-700" />
                    </div>
                    <h4 className="text-xl font-semibold text-stone-800">{t.admin.loginTitle}</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        {t.admin.password}
                      </label>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                        className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    {adminError && (
                      <p className="text-red-600 text-sm">{adminError}</p>
                    )}
                    <button
                      onClick={handleAdminLogin}
                      className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl transition-colors"
                    >
                      {t.admin.login}
                    </button>
                  </div>
                </div>
              ) : (
                /* Admin Panel */
                <div className="space-y-8">
                  {/* Hero Section Editor */}
                  <div className="bg-stone-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      {t.admin.sections.hero}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.heroTitle}</label>
                        <input
                          type="text"
                          defaultValue={getContentValue('heroTitle', t.hero.title)}
                          onBlur={(e) => updateContent('heroTitle', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.heroSubtitle}</label>
                        <textarea
                          defaultValue={getContentValue('heroSubtitle', t.hero.subtitle)}
                          onBlur={(e) => updateContent('heroSubtitle', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.heroBadge}</label>
                        <input
                          type="text"
                          defaultValue={getContentValue('heroBadge', t.hero.badge)}
                          onBlur={(e) => updateContent('heroBadge', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services Section Editor */}
                  <div className="bg-stone-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      {t.admin.sections.services}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.servicesTitle}</label>
                        <input
                          type="text"
                          defaultValue={getContentValue('servicesTitle', t.services.title)}
                          onBlur={(e) => updateContent('servicesTitle', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.servicesSubtitle}</label>
                        <input
                          type="text"
                          defaultValue={getContentValue('servicesSubtitle', t.services.subtitle)}
                          onBlur={(e) => updateContent('servicesSubtitle', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* About Section Editor */}
                  <div className="bg-stone-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      {t.admin.sections.about}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.aboutTitle}</label>
                        <input
                          type="text"
                          defaultValue={getContentValue('aboutTitle', t.about.title)}
                          onBlur={(e) => updateContent('aboutTitle', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.aboutSubtitle}</label>
                        <input
                          type="text"
                          defaultValue={getContentValue('aboutSubtitle', t.about.subtitle)}
                          onBlur={(e) => updateContent('aboutSubtitle', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.aboutDescription}</label>
                        <textarea
                          defaultValue={getContentValue('aboutDescription', t.about.description)}
                          onBlur={(e) => updateContent('aboutDescription', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reviews Section Editor */}
                  <div className="bg-stone-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      {t.admin.sections.reviews}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.reviewsTitle}</label>
                        <input
                          type="text"
                          defaultValue={getContentValue('reviewsTitle', t.reviews.title)}
                          onBlur={(e) => updateContent('reviewsTitle', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">{t.admin.labels.reviewsSubtitle}</label>
                        <input
                          type="text"
                          defaultValue={getContentValue('reviewsSubtitle', t.reviews.subtitle)}
                          onBlur={(e) => updateContent('reviewsSubtitle', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images Editor */}
                  <div className="bg-stone-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      {t.admin.sections.images}
                    </h4>
                    <div className="space-y-4">
                      {[
                        { key: 'hero', label: t.admin.labels.heroImage },
                        { key: 'about', label: t.admin.labels.aboutImage },
                        { key: 'service1', label: t.admin.labels.serviceImage1 },
                        { key: 'service2', label: t.admin.labels.serviceImage2 },
                        { key: 'service3', label: t.admin.labels.serviceImage3 },
                        { key: 'service4', label: t.admin.labels.serviceImage4 },
                      ].map((img) => (
                        <div key={img.key}>
                          <label className="block text-sm font-medium text-stone-600 mb-1">{img.label}</label>
                          <input
                            type="text"
                            value={images[img.key]}
                            onChange={(e) => setImages((prev) => ({ ...prev, [img.key]: e.target.value }))}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <button
                      onClick={handleSaveContent}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl transition-colors"
                    >
                      {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saveSuccess ? t.admin.saved : t.admin.save}
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold rounded-xl transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t.admin.reset}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
