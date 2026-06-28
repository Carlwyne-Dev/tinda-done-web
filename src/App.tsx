import { useState, useEffect, useRef } from 'react';
import { Download, Smartphone, BarChart3, BookOpen, ShieldCheck, HelpCircle, Mail } from 'lucide-react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';

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

  // Carousel
  const screenshotScrollRef = useRef<HTMLDivElement>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const screenshots = [
    { src: '/terminal.jfif', alt: 'POS Terminal' },
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
                TindaDone is the ultimate offline-first Point of Sale & Inventory tracker designed specifically for micro-businesses. Throw away the messy notebooks.
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
                    <img src="/terminal.jfif" alt="TindaDone POS" />
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
                    <img src="/terminal.jfif" alt="TindaDone POS" />
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
            <h3>Scan & Sell</h3>
            <p style={{ color: 'var(--text-muted)' }}>Fast barcode scanning using your phone's camera. Process transactions in seconds.</p>
          </motion.div>
          <motion.div className="feature-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="feature-icon"><BookOpen size={28} /></div>
            <h3>Utang Ledger</h3>
            <p style={{ color: 'var(--text-muted)' }}>Keep a clean, trust-based record of customer credits. Never lose an unpaid tab again.</p>
          </motion.div>
          <motion.div className="feature-card" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <div className="feature-icon"><BarChart3 size={28} /></div>
            <h3>Smart Analytics</h3>
            <p style={{ color: 'var(--text-muted)' }}>Get daily, monthly, and yearly insights on your revenue and net profit automatically.</p>
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
            href="/tindadone.apk" 
            className="btn-primary" 
            download="tindadone.apk"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={22} />
            Download TindaDone.apk
          </motion.a>
          <p style={{ marginTop: '24px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <ShieldCheck size={18} color="#10b981" /> 100% Secure & Offline
          </p>
          <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
            Having trouble? <a href="https://drive.google.com/uc?export=download&id=1m-1c5wd0YfxCFy1qTKqylNHAfM2QnzK_" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Download via Google Drive instead</a>
          </p>
        </div>
      </section>

      <div className="container">
        <section id="faq" className="faq">
          <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <HelpCircle size={36} color="#10b981" /> FAQ
          </h2>
          <motion.div className="faq-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3>Is TindaDone completely offline?</h3>
            <p>Yes! TindaDone saves all your inventory and sales data directly on your device. You don't need an internet connection to run your store, making it fast and reliable.</p>
          </motion.div>
          <motion.div className="faq-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3>What happens after the 7-day trial?</h3>
            <p>Once your trial ends, your data is securely locked but never deleted. You just need to purchase a lifetime activation key. Once entered, all your records will instantly unlock and you can continue where you left off.</p>
          </motion.div>
          <motion.div className="faq-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <h3>How do I activate the app?</h3>
            <p>After installing, you will see a unique "Device Code" on your screen. Send this code to our official Facebook page or contact email to purchase your Activation Key.</p>
          </motion.div>
        </section>

        <footer id="contact" className="footer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} />
                <span>Need help? Contact us at</span>
              </div>
              <a href="mailto:magharicarlwyne@gmail.com" style={{ color: '#fff', fontWeight: 'bold' }}>magharicarlwyne@gmail.com</a>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Smartphone size={18} />
              <span>Call / Text:</span> <a href="tel:09949703783" style={{ color: '#fff', fontWeight: 'bold' }}>09949703783</a>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
              <a href="https://www.facebook.com/crlwyn" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/crlwyn_/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          <p style={{ marginTop: '32px', fontSize: '14px' }}>&copy; {new Date().getFullYear()} TindaDone. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
