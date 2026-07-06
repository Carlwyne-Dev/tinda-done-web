import { useState, useEffect, useRef } from 'react';
import { Download, Smartphone, BarChart3, BookOpen, ShieldCheck, HelpCircle, Mail, History, ChevronDown, X } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';

const AccordionItem = ({ title, children, isChangelog = false, badge = null, isInitialOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(isInitialOpen);
  
  return (
    <motion.div className={isChangelog ? "changelog-entry accordion-item" : "faq-item accordion-item"} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div 
        className={isChangelog ? "changelog-version" : "faq-header"}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: isChangelog ? '0' : '0' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
          {isChangelog ? title : <h3 style={{ margin: 0 }}>{title}</h3>} 
          {badge}
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={20} />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: '16px' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function App() {
  const { scrollY } = useScroll();

  // Marquee scroll effect
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const marqueeX = useTransform(sectionScroll, [0, 1], ["500px", "-3000px"]);

  // Detect mobile synchronously to avoid wrong initial state on first render
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Desktop: hover-driven swap
  const [isHovered, setIsHovered] = useState(false);

  // Legal modal: 'terms' | 'privacy' | null
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);
  const closeModal = () => setActiveModal(null);

  // Carousel
  const screenshotScrollRef = useRef<HTMLDivElement>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const screenshots = [
    { src: '/terminal.jfif', alt: 'Store Management Terminal' },
    { src: '/inventory.jfif', alt: 'Inventory Management' },
    { src: '/analytics.jfif', alt: 'Analytics Dashboard' },
    { src: '/credit.jfif', alt: 'Credit Trust Ledger' },
    { src: '/costs.jfif', alt: 'Expense Tracking' },
  ];
  
  // Multiply the array to create an "infinite" looping feel
  const duplicatedScreenshots = [...screenshots, ...screenshots, ...screenshots, ...screenshots];

  // Mobile: scroll-driven swap — starts at 80px, completes at 320px
  const heroBackScale = useTransform(scrollY, [80, 320], [0.85, 1.05]);
  const heroBackRotateY = useTransform(scrollY, [80, 320], [15, 0]);
  const heroBackOpacity = useTransform(scrollY, [80, 320], [0.5, 1]);
  const heroBackFilter = useTransform(scrollY, [80, 320], ['blur(3px)', 'blur(0px)']);
  const heroBackX = useTransform(scrollY, [80, 320], [0, -10]);
  const heroBackY = useTransform(scrollY, [80, 320], [0, 30]);

  const heroFrontScale = useTransform(scrollY, [80, 320], [1, 0.85]);
  const heroFrontRotateY = useTransform(scrollY, [80, 320], [-15, 15]);
  const heroFrontOpacity = useTransform(scrollY, [80, 320], [1, 0.1]);
  const heroFrontFilter = useTransform(scrollY, [80, 320], ['blur(0px)', 'blur(5px)']);
  const heroFrontX = useTransform(scrollY, [80, 320], [0, 20]);
  const heroFrontY = useTransform(scrollY, [80, 320], [0, -40]);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <span className="glow-dot">●</span> TindaDone
          </div>
          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#changelog">Changelog</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <motion.a 
            href="#download" 
            className="btn-primary get-apk-btn" 
            style={{ padding: '10px 20px', fontSize: '14px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get the APK
          </motion.a>
        </div>
      </header>

      <div className="container">

        <section className="hero">
          <div className="hero-split">
            <motion.div className="hero-text" variants={container} initial="hidden" animate="show">
              <motion.h1 variants={item}>
                Your Sari-Sari Store, <br />Fully Digital.
              </motion.h1>
              <motion.p variants={item}>
                TindaDone is a premium, offline-first mobile store management and internal record-keeping tool built for sari-sari stores and micro-businesses.
               </motion.p>
               <motion.p variants={item} className="hero-tagline">
                 Spend less time managing. Spend more time growing.
              </motion.p>
              <motion.a 
                href="#download" 
                className="btn-primary"
                variants={item}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={22} />
                Download APK Now
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="hero-image-container"
              initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {isMobile ? (
                /* Mobile: scroll-driven dual card swap */
                <div className="hero-mockup-group">
                  <motion.div 
                    className="mockup-back"
                    style={{
                      scale: heroBackScale,
                      rotateY: heroBackRotateY,
                      rotateX: 10,
                      opacity: heroBackOpacity,
                      filter: heroBackFilter,
                      x: heroBackX,
                      y: heroBackY,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <img src="/analytics.jfif" alt="TindaDone Analytics" />
                  </motion.div>
                  <motion.div 
                    className="mockup-front"
                    style={{
                      scale: heroFrontScale,
                      rotateY: heroFrontRotateY,
                      rotateX: 10,
                      opacity: heroFrontOpacity,
                      filter: heroFrontFilter,
                      x: heroFrontX,
                      y: heroFrontY,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <img src="/main_pic.jpg" alt="TindaDone App" />
                  </motion.div>
                </div>
              ) : (
                /* Desktop: dual card hover swap */
                <div 
                  className="hero-mockup-group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.div 
                    className="mockup-back"
                    animate={{
                      scale: isHovered ? 1.05 : 0.85,
                      rotateY: isHovered ? 0 : 15,
                      rotateX: 10,
                      opacity: isHovered ? 1 : 0.4,
                      filter: isHovered ? 'blur(0px)' : 'blur(4px)',
                      x: isHovered ? -10 : 0,
                      y: isHovered ? 30 : 0,
                      zIndex: isHovered ? 3 : 1,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <img src="/analytics.jfif" alt="TindaDone Analytics" />
                  </motion.div>
                  <motion.div 
                    className="mockup-front"
                    animate={{
                      scale: isHovered ? 0.9 : 1,
                      rotateY: isHovered ? 0 : -15,
                      rotateX: 10,
                      opacity: isHovered ? 0.5 : 1,
                      filter: isHovered ? 'blur(3px)' : 'blur(0px)',
                      x: isHovered ? 10 : 0,
                      y: isHovered ? -30 : 0,
                      zIndex: isHovered ? 1 : 2,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <img src="/main_pic.jpg" alt="TindaDone App" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <section id="features" className="features">
          <h2 className="sr-only">Key Features of TindaDone</h2>
          <motion.div className="feature-card" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="feature-icon"><Smartphone size={28} /></div>
            <h3>Smart Selling & Checkout</h3>
            <p style={{ color: 'var(--text-muted)' }}>Lightning-fast barcode scanning and bulk mode support. Process both Cash and GCash transactions instantly.</p>
          </motion.div>
          <motion.div className="feature-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="feature-icon"><BookOpen size={28} /></div>
            <h3>Utang (Credit) Management</h3>
            <p style={{ color: 'var(--text-muted)' }}>Log partial payments, set due reminders, and checkout directly to Utang without manual debt tracking.</p>
          </motion.div>
          <motion.div className="feature-card" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <div className="feature-icon"><BarChart3 size={28} /></div>
            <h3>Profit & Inventory Tracking</h3>
            <p style={{ color: 'var(--text-muted)' }}>Track exact profit per item, set low-stock threshold alerts, and auto-generate daily and monthly reports.</p>
          </motion.div>
        </section>

        <section className="screenshots" ref={sectionRef}>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>See it in action</motion.h2>
          
          <div className="screenshot-wrapper" style={{ overflow: 'hidden' }}>
            <motion.div style={isMobile ? {} : { x: marqueeX, width: 'max-content' }}>
              <motion.div 
                className="screenshot-container" 
                drag={isMobile ? false : "x"}
                dragConstraints={{ left: -4000, right: 1000 }}
                dragElastic={0.1}
                ref={screenshotScrollRef} 
                onScroll={() => {
                  if (!screenshotScrollRef.current || !isMobile) return;
                  const scrollPos = screenshotScrollRef.current.scrollLeft;
                  const itemWidth = 330; 
                  setActiveScreenshot(Math.round(scrollPos / itemWidth) % screenshots.length);
                }}
                style={{ cursor: isMobile ? 'auto' : 'grab' }}
                whileTap={{ cursor: isMobile ? 'auto' : 'grabbing' }}
              >
                {duplicatedScreenshots.map((s, i) => (
                  <motion.div 
                    key={i}
                    className="phone-mockup"
                    animate={{ 
                      y: i % 2 === 0 ? -30 : 30, 
                      rotateY: i % 2 === 0 ? 15 : -15, 
                      rotateX: 10, 
                      scale: 0.95 
                    }}
                    whileHover={{ 
                      y: 0, 
                      rotateY: 0, 
                      rotateX: 0, 
                      scale: 1.05, 
                      zIndex: 10 
                    }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <img src={s.src} alt={`${s.alt} ${i}`} draggable={false} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="carousel-dots">
            {screenshots.map((_, i) => (
              <button
                key={i}
                className={`dot ${activeScreenshot === i ? 'active' : ''}`}
                onClick={() => {
                  if (screenshotScrollRef.current) {
                    const itemWidth = 330;
                    screenshotScrollRef.current.scrollTo({ left: i * itemWidth, behavior: 'smooth' });
                  }
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>
      </div>

      <section id="download" className="download-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="trial-badge"
          >
            7-Day Free Trial
          </motion.div>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>Ready to upgrade your store?</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Download the official TindaDone APK below. You get full access to all features completely free for 7 days. After the trial, simply purchase a permanent activation key to keep your data safe and unlock lifetime access.
          </motion.p>
          <motion.a 
            href="https://github.com/Carlwyne-Dev/tinda-done-web/releases/download/v1.0.2/tindadone.apk" 
            className="btn-primary" 
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={22} />
            Download TindaDone.apk
          </motion.a>
          <p style={{ marginTop: '24px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <ShieldCheck size={18} color="#10b981" /> 100% Secure & Offline
          </p>
          <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)', maxWidth: '400px', margin: '12px auto 0' }}>
            *If your phone blocks the installation or shows a warning, tap <strong>"More details"</strong> and select <strong>"Install anyway"</strong> to proceed.
          </p>
          <p style={{ marginTop: '16px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', maxWidth: '420px', margin: '16px auto 0' }}>
            By downloading, you agree to our{' '}
            <button onClick={() => setActiveModal('terms')} style={{ background: 'none', border: 'none', color: 'rgba(16,185,129,0.6)', cursor: 'pointer', fontSize: '11px', padding: 0, textDecoration: 'underline' }}>Terms &amp; Conditions</button>
            {' '}and{' '}
            <button onClick={() => setActiveModal('privacy')} style={{ background: 'none', border: 'none', color: 'rgba(16,185,129,0.6)', cursor: 'pointer', fontSize: '11px', padding: 0, textDecoration: 'underline' }}>Privacy Policy</button>.
          </p>
        </div>
      </section>

      <div className="container">
        <section id="changelog" className="changelog">
          <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
            <History size={36} color="#10b981" /> Changelog
          </h2>
          <div className="changelog-timeline">
            {/* v1.0.2 */}
            <AccordionItem isChangelog title="v1.0.2" badge={<span className="changelog-badge">Latest Update</span>}>
              <ul className="changelog-list">
                <li><strong>Redesigned Total Sales Breakdown:</strong> Replaced the basic gray box with a clean, modern, receipt-style layout for easier reading at a glance.</li>
                <li><strong>Enhanced "Transactions" Section:</strong> Now clearly displays the total transaction count for the period and the average sale amount to help you track daily performance.</li>
                <li><strong>Added Utang (Credit) Tracking to Reports:</strong> The sales breakdown now dynamically displays the total Utang Issued and Utang Collected for the period you are viewing.</li>
                <li><strong>Streamlined UI:</strong> Unified the styling of the Cash and GCash payment pills on the cart screen for a cleaner checkout experience.</li>
                <li><strong>Refined Aesthetics:</strong> Removed out-of-place emojis from data tables to maintain a professional, minimalist look.</li>
              </ul>
            </AccordionItem>

            {/* v1.0.1 */}
            <AccordionItem isChangelog title="v1.0.1">
              <ul className="changelog-list">
                <li><strong>Offline-First Improvements:</strong> Improved reliability for offline stock deductions and offline cart checkouts.</li>
                <li><strong>Performance Enhancements:</strong> Optimized the product loading speed in the main inventory catalog.</li>
                <li><strong>Admin Connectivity:</strong> Strengthened security and device-sync reliability with the central admin control panel.</li>
              </ul>
            </AccordionItem>

            {/* v1.0.0 */}
            <AccordionItem isChangelog title="v1.0.0" badge={<span className="changelog-badge initial">Initial Release</span>}>
              <ul className="changelog-list">
                <li><strong>Smart Selling:</strong> Fast cart system with quantity adjustments and Bulk Mode support.</li>
                <li><strong>Real-Time Inventory:</strong> Track stock counts, low-stock thresholds, and visual product catalogs.</li>
                <li><strong>Customer Utang Management:</strong> Fully functional customer credit ledger with due reminders and partial payments.</li>
                <li><strong>Analytics & Reporting:</strong> Track daily sales, profits, and expenses offline.</li>
                <li><strong>License Activation System:</strong> Secure 7-day trial and device ID-based premium activation.</li>
              </ul>
            </AccordionItem>
          </div>
        </section>

        <section id="faq" className="faq">
          <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <HelpCircle size={36} color="#10b981" /> FAQ
          </h2>
          <AccordionItem title="Is TindaDone completely offline?">
            <p style={{ margin: 0 }}>Yes! Core operations like selling, inventory updates, checkout, and credit logging work 100% offline. An internet connection is only required for trial validation, license activation, and optional cloud backups.</p>
          </AccordionItem>
          <AccordionItem title="What happens after the 7-day trial?">
            <p style={{ margin: 0 }}>Once your trial ends, your data is securely locked but never deleted. You just need to purchase a lifetime activation key. Once entered, all your records will instantly unlock and you can continue where you left off.</p>
          </AccordionItem>
          <AccordionItem title="How do I activate the app?">
            <p style={{ margin: 0 }}>After installing, you will see a unique "Device Code" on your screen. Send this code to our official Facebook page or contact email to purchase your Activation Key.</p>
          </AccordionItem>
        </section>

        <section id="disclaimer" className="disclaimer" style={{ padding: '40px 0', textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={20} /> Disclaimer
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
            TindaDone is a store management and internal record-keeping tool designed for sari-sari stores and small businesses. It helps users manage sales, inventory, utang, expenses, and reports for daily operations.
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.6', fontWeight: 500 }}>
            TindaDone currently does not issue official BIR receipts and is not a substitute for BIR-accredited POS systems where legally required.
          </p>
        </section>

        <footer id="contact" className="footer">
          <div className="footer-inner">

            {/* Logo + tagline column */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="glow-dot">●</span> TindaDone
              </div>
              <p className="footer-desc">
                Store management &amp; record-keeping for sari-sari stores and micro-businesses.
              </p>
              <div className="footer-socials">
                <a href="https://www.facebook.com/crlwyn" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/crlwyn_/" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>

            {/* Quick links column */}
            <div className="footer-col">
              <h4 className="footer-col-title">Navigate</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#changelog">Changelog</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#download">Download</a></li>
              </ul>
            </div>

            {/* Contact column */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact</h4>
              <ul className="footer-links">
                <li>
                  <a href="mailto:magharicarlwyne@gmail.com">
                    <Mail size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    magharicarlwyne@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:09949703783">
                    <Smartphone size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    09949703783
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} TindaDone. All rights reserved.</p>
            <div className="footer-legal">
              <button onClick={() => setActiveModal('terms')} className="footer-legal-btn">Terms &amp; Conditions</button>
              <span className="footer-divider">·</span>
              <button onClick={() => setActiveModal('privacy')} className="footer-legal-btn">Privacy Policy</button>
            </div>
          </div>
        </footer>
      </div>

      {/* Legal Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="legal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="legal-modal"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="legal-modal-header">
                <h2>{activeModal === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}</h2>
                <button className="legal-close" onClick={closeModal}><X size={22} /></button>
              </div>
              <div className="legal-modal-body">
                {activeModal === 'terms' ? (
                  <>
                    <p className="legal-date">Last updated: July 2025</p>
                    <h3>1. Acceptance of Terms</h3>
                    <p>By downloading and using TindaDone, you agree to these Terms & Conditions. If you do not agree, please do not use the app.</p>
                    <h3>2. Description of Service</h3>
                    <p>TindaDone is a business management and record-keeping application designed for sari-sari stores and small businesses. It helps users manage sales, inventory, utang (credit), expenses, and daily operational reports. It is <strong>not</strong> a BIR-accredited Point-of-Sale system and does not issue official receipts.</p>
                    <h3>3. License</h3>
                    <p>TindaDone is provided under a commercial license. After a 7-day free trial, continued use requires the purchase of a lifetime activation key linked to a single device. The license is non-transferable and for personal/business use only.</p>
                    <h3>4. Prohibited Use</h3>
                    <p>You may not reverse-engineer, decompile, resell, or redistribute TindaDone or its activation keys. Any attempt to bypass or crack the licensing system is strictly prohibited.</p>
                    <h3>5. Data Responsibility</h3>
                    <p>All data entered into TindaDone (products, sales, customer credit records) is stored locally on your device. We are not responsible for data loss due to device failure, factory reset, or uninstallation. We strongly recommend using the app's backup feature regularly. Users are responsible for complying with any local laws or regulations applicable to their business.</p>
                    <h3>6. Intellectual Property</h3>
                    <p>All rights, title, logos, graphics, software, and source code of TindaDone remain the intellectual property of the developer and are protected by applicable copyright laws. Unauthorized reproduction or distribution is strictly prohibited.</p>
                    <h3>7. Disclaimers</h3>
                    <p>TindaDone is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free operation. To the fullest extent permitted by law, TindaDone shall not be liable for any indirect, incidental, or consequential damages arising from the use of the application.</p>
                    <h3>8. Changes to Terms</h3>
                    <p>We reserve the right to update these Terms at any time. Continued use of the app after changes constitutes acceptance of the new Terms.</p>
                    <h3>9. Contact</h3>
                    <p>For questions, contact us at <a href="mailto:magharicarlwyne@gmail.com">magharicarlwyne@gmail.com</a>.</p>
                  </>
                ) : (
                  <>
                    <p className="legal-date">Last updated: July 2025</p>
                    <h3>1. Information We Collect</h3>
                    <p>TindaDone operates <strong>fully offline</strong>. All data you enter — including product names, prices, sales records, and customer credit information — is stored <strong>locally on your device only</strong> and is never transmitted to our servers.</p>
                    <p>TindaDone only connects to the internet for:</p>
                    <ul>
                      <li>Trial validation</li>
                      <li>License activation and verification</li>
                    </ul>
                    <p>During these moments, only your <strong>anonymous device identifier</strong> and <strong>activation key</strong> are transmitted for licensing purposes. No personal data, sales data, or customer data is ever sent.</p>
                    <h3>2. Data Storage</h3>
                    <p>All business data (inventory, transactions, customer records, reports) is stored in a local database on your Android device. We have no access to this data.</p>
                    <h3>3. Data Sharing</h3>
                    <p>We do not sell, rent, or share any of your data with third parties. Ever.</p>
                    <h3>4. Data Security</h3>
                    <p>Since your data lives on your device, its security depends on your device's security settings. We recommend enabling screen lock and using the app's backup feature to prevent data loss. If you choose to export backups yourself, you are responsible for securing those backup files.</p>
                    <h3>5. Children's Privacy</h3>
                    <p>TindaDone is not directed at children under 13. We do not knowingly collect information from children.</p>
                    <h3>6. Changes to This Policy</h3>
                    <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.</p>
                    <h3>7. Contact</h3>
                    <p>Questions about this Privacy Policy may be sent to: <a href="mailto:magharicarlwyne@gmail.com">magharicarlwyne@gmail.com</a></p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </>
  );
}

export default App;
