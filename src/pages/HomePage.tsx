import { useRef, useEffect, useState, useCallback } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../assets/Logo3.png';
import {
  ArrowRight,
  Plane,
  Ship,
  Truck as TruckIcon,
  Warehouse,
  Brain,
  FileCheck,
  Crown,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
  Globe,
  Shield,
  Clock,
  Users,
  Quote,
  ClipboardList,
  CreditCard,
  PackageCheck,
  Zap,
  MapPin,
} from 'lucide-react';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: 120, suffix: '+', label: 'Countries Served', icon: Globe },
  { value: 50, suffix: 'K+', label: 'Deliveries Made', icon: PackageCheck },
  { value: 99.8, suffix: '%', label: 'On-Time Accuracy', icon: Shield },
  { value: 24, suffix: '/7', label: 'Expert Support', icon: Clock },
];

const services = [
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Fast and reliable air cargo services worldwide with real-time tracking and competitive rates.',
    tag: 'Most Popular',
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#air-freight',
  },
  {
    icon: Ship,
    title: 'Sea Freight',
    description: 'Cost-effective ocean shipping for large volumes across continents — FCL, LCL, and project cargo.',
    tag: null,
    image: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#sea-freight',
  },
  {
    icon: TruckIcon,
    title: 'Road Transport',
    description: 'Efficient ground transportation for regional logistics with flexible FTL and LTL options.',
    tag: null,
    image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#road-transport',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Secure storage solutions with advanced inventory management at strategic locations worldwide.',
    tag: null,
    image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#warehousing',
  },
  {
    icon: FileCheck,
    title: 'Customs Clearance',
    description: 'Specialized customs brokerage and compliance services ensuring smooth cross-border cargo movement.',
    tag: null,
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#customs-clearance',
  },
  {
    icon: Crown,
    title: 'Private Jet Charter',
    description: 'Luxury travel and charter flight solutions for executives and premium cargo worldwide.',
    tag: 'Premium',
    image: 'https://images.pexels.com/photos/1268701/pexels-photo-1268701.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#private-jet-charter',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechFlow Inc.',
    content: 'IntelWise transformed our supply chain. Their AI-powered optimization reduced our shipping costs by 32% while improving delivery times significantly.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Operations Director, GlobalMart',
    content: 'The real-time tracking and proactive communication set IntelWise apart. We always know exactly where our shipments are at every stage.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Supply Chain Manager, FreshFoods Co.',
    content: 'Reliability is everything in food logistics. IntelWise has never missed a delivery window for us in two years of partnership.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Founder, UrbanStyle',
    content: 'From small startup to global brand, IntelWise scaled with us every step of the way. Their team truly understands growing businesses.',
    rating: 5,
  },
];

const whyChooseUs = [
  { icon: Globe, title: 'Global Network', description: 'Presence in 120+ countries with on-the-ground local expertise' },
  { icon: Shield, title: 'Real-Time Visibility', description: 'Track every shipment at each stage of transit, live' },
  { icon: Brain, title: 'AI-Powered Routes', description: 'Smart route optimization that cuts costs and improves speed' },
  { icon: Users, title: '24/7 Expert Support', description: 'Dedicated logistics team available around the clock' },
];

const howItWorks = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Place Your Enquiry',
    description: 'Tell us about your shipment needs — origin, destination, cargo type, and timeline. Our team responds within 2 hours.',
  },
  {
    icon: CreditCard,
    step: '02',
    title: 'Confirm & Pay',
    description: 'Review your custom quote, approve the service, and complete payment securely. We handle all documentation.',
  },
  {
    icon: PackageCheck,
    step: '03',
    title: 'Track & Receive',
    description: 'We handle pickup, transit, customs, and last-mile delivery. You track everything live through our platform.',
  },
];

const partners = [
  { name: 'DHL', category: 'Logistics Partner' },
  { name: 'FedEx', category: 'Delivery Partner' },
  { name: 'Maersk', category: 'Shipping Partner' },
  { name: 'Emirates', category: 'Air Partner' },
  { name: 'Kuehne+Nagel', category: 'Freight Partner' },
  { name: 'MSC', category: 'Ocean Partner' },
];

// ─── Ticker events ─────────────────────────────────────────────────────────────
const tickerEvents = [
  { icon: Plane, label: 'Air freight departed', detail: 'Dubai → New York', color: '#FF6A00' },
  { icon: Ship, label: 'Sea freight cleared', detail: 'Shanghai → Hamburg', color: '#2F80ED' },
  { icon: TruckIcon, label: 'Road delivery confirmed', detail: 'Frankfurt → Paris', color: '#10b981' },
  { icon: CheckCircle2, label: 'Customs cleared', detail: 'Singapore Port', color: '#FF6A00' },
  { icon: MapPin, label: 'Shipment delivered', detail: 'Los Angeles, CA', color: '#2F80ED' },
  { icon: PackageCheck, label: 'Package received', detail: 'Tokyo Distribution Hub', color: '#10b981' },
  { icon: Plane, label: 'Charter flight scheduled', detail: 'London → Riyadh', color: '#FF6A00' },
  { icon: Globe, label: 'New route optimized', detail: 'Melbourne → Cape Town', color: '#2F80ED' },
];

// ─── Floating Particles ──────────────────────────────────────────────────────
const NUM_PARTICLES = 28;

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  xEnd: number;
};

const FloatingParticles = () => {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      xEnd: (Math.random() - 0.5) * 60,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 2 === 0 ? '#FF6A00' : '#2F80ED',
            opacity: 0,
          }}
          animate={{
            y: [0, -80, -160],
            x: [0, p.xEnd * 0.5, p.xEnd],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

// ─── Animated Counter ────────────────────────────────────────────────────────
const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView || started) return;
    setStarted(true);
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value, started]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};

// ─── Network Lines SVG ───────────────────────────────────────────────────────
const NetworkLines = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-10"
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
  >
    {[
      'M 100 300 Q 300 100 500 250 T 800 200',
      'M 0 400 Q 200 200 400 350 T 800 300',
      'M 150 500 Q 350 250 600 350 T 800 250',
      'M 0 200 Q 200 400 400 250 T 750 400',
    ].map((d, i) => (
      <motion.path
        key={i}
        d={d}
        stroke="#FF6A00"
        strokeWidth="1"
        fill="none"
        strokeDasharray="8 16"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{
          pathLength: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.8 },
          opacity: { duration: 1, delay: i * 0.8 },
        }}
      />
    ))}
    {[
      { cx: 100, cy: 300 }, { cx: 300, cy: 180 }, { cx: 500, cy: 250 }, { cx: 700, cy: 210 },
      { cx: 200, cy: 400 }, { cx: 400, cy: 330 }, { cx: 600, cy: 350 }, { cx: 750, cy: 290 },
    ].map((pos, i) => (
      <motion.circle
        key={i}
        cx={pos.cx}
        cy={pos.cy}
        r="4"
        fill="#FF6A00"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
      />
    ))}
  </svg>
);

// ─── Globe Hero Visualization ─────────────────────────────────────────────────
const GLOBE_PX = 380;

const ORBIT_CFG = [
  {
    r: 235,
    Icon: TruckIcon,
    startAngle: 180,
    dotStartAngle: 330,
    iconBg: 'rgba(6,20,65,0.92)',
    iconBorder: 'rgba(47,128,237,0.62)',
    iconGlow: 'rgba(47,128,237,0.48)',
    iconShadow: '0 0 22px 5px rgba(47,128,237,0.38), inset 0 1px 0 rgba(255,255,255,0.10)',
    iconClass: 'text-white',
    ringColor: 'rgba(47,128,237,0.40)',
    dotColor: '#3B82F6',
    dotShadow: 'rgba(59,130,246,0.85)',
    dasharray: '7 5',
    duration: 22,
  },
  {
    r: 290,
    Icon: Plane,
    startAngle: 90,
    dotStartAngle: 260,
    iconBg: 'rgba(65,22,6,0.92)',
    iconBorder: 'rgba(255,106,0,0.68)',
    iconGlow: 'rgba(255,106,0,0.48)',
    iconShadow: '0 0 22px 5px rgba(255,106,0,0.42), inset 0 1px 0 rgba(255,255,255,0.10)',
    iconClass: 'text-white',
    ringColor: 'rgba(255,106,0,0.38)',
    dotColor: '#FF6A00',
    dotShadow: 'rgba(255,106,0,0.85)',
    dasharray: '6 5',
    duration: 16,
  },
  {
    r: 345,
    Icon: Ship,
    startAngle: 0,
    dotStartAngle: 90,
    iconBg: 'rgba(6,20,65,0.92)',
    iconBorder: 'rgba(47,128,237,0.62)',
    iconGlow: 'rgba(47,128,237,0.48)',
    iconShadow: '0 0 22px 5px rgba(47,128,237,0.38), inset 0 1px 0 rgba(255,255,255,0.10)',
    iconClass: 'text-white',
    ringColor: 'rgba(47,128,237,0.34)',
    dotColor: '#3B82F6',
    dotShadow: 'rgba(59,130,246,0.85)',
    dasharray: '8 7',
    duration: 28,
  },
] as const;

const SVG_D = 730;
const SVG_C = SVG_D / 2;

const AnimatedGlobe = () => (
  <div className="relative w-full h-full flex items-center justify-center select-none">
    <svg
      width={SVG_D} height={SVG_D} viewBox={`0 0 ${SVG_D} ${SVG_D}`}
      className="absolute pointer-events-none"
      style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}
      aria-hidden="true"
    >
      {ORBIT_CFG.map((o) => (
        <circle key={o.r} cx={SVG_C} cy={SVG_C} r={o.r}
          stroke={o.ringColor} strokeWidth="1.5" fill="none"
          strokeDasharray={o.dasharray} />
      ))}
    </svg>

    <div className="absolute rounded-full pointer-events-none" style={{
      width: GLOBE_PX + 130, height: GLOBE_PX + 130,
      top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      background: 'radial-gradient(circle, rgba(47,128,237,0.40) 12%, rgba(14,50,130,0.18) 52%, transparent 70%)',
      filter: 'blur(30px)', zIndex: 3,
    }} />

    <div className="absolute rounded-full pointer-events-none" style={{
      width: GLOBE_PX + 8, height: GLOBE_PX + 8,
      top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      border: '1.5px solid rgba(47,128,237,0.48)',
      boxShadow: '0 0 44px rgba(47,128,237,0.32), inset 0 0 44px rgba(47,128,237,0.07)',
      zIndex: 9,
    }} />

    <div className="absolute rounded-full" style={{
      width: GLOBE_PX, height: GLOBE_PX,
      top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      zIndex: 10,
      overflow: 'hidden',
      boxShadow: '0 0 100px rgba(47,128,237,0.55), 0 0 40px rgba(47,128,237,0.28)',
    }}>
      <img src={LoadingScreen} alt="Global Logistics Network"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        draggable={false} />
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, transparent 38%, rgba(4,10,28,0.32) 65%, rgba(4,10,28,0.60) 100%)',
      }} />
    </div>

    {ORBIT_CFG.map((o, i) => (
      <div key={`icon-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 20 }}>
        <motion.div
          style={{ width: o.r * 2, height: o.r * 2, marginTop: -o.r, marginLeft: -o.r }}
          initial={{ rotate: o.startAngle }}
          animate={{ rotate: o.startAngle + 360 }}
          transition={{ duration: o.duration, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}>
            <motion.div
              initial={{ rotate: -o.startAngle }}
              animate={{ rotate: -o.startAngle - 360 }}
              transition={{ duration: o.duration, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              <div className="absolute rounded-full pointer-events-none"
                style={{ inset: '-12px', background: o.iconGlow, filter: 'blur(11px)', opacity: 0.88 }} />
              <div className="relative flex items-center justify-center rounded-full" style={{
                width: 50, height: 50,
                background: o.iconBg,
                border: `1.5px solid ${o.iconBorder}`,
                backdropFilter: 'blur(12px)',
                boxShadow: o.iconShadow,
              }}>
                <o.Icon className={`w-5 h-5 ${o.iconClass}`} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    ))}

    {ORBIT_CFG.map((o, i) => (
      <div key={`dot-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 18 }}>
        <motion.div
          style={{ width: o.r * 2, height: o.r * 2, marginTop: -o.r, marginLeft: -o.r }}
          initial={{ rotate: o.dotStartAngle }}
          animate={{ rotate: o.dotStartAngle + 360 }}
          transition={{ duration: o.duration, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="rounded-full" style={{
              width: 9, height: 9,
              background: o.dotColor,
              boxShadow: `0 0 10px 3px ${o.dotShadow}`,
            }} />
          </div>
        </motion.div>
      </div>
    ))}

    {/* Top-left card: Shipment */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute z-30"
      style={{ top: '8%', left: '2%' }}
    >
      <div className="px-4 py-3 rounded-2xl" style={{
        background: 'rgba(5,13,36,0.90)',
        border: '1px solid rgba(47,100,200,0.28)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        <div className="text-[11px] text-white/45 uppercase tracking-widest mb-1">Shipment</div>
        <div className="text-orange text-base font-extrabold tracking-wide">#IW-2847</div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" />
          <span className="text-[11px] text-white/60 font-medium">In Transit</span>
        </div>
      </div>
    </motion.div>

    {/* Middle-left card: AI Route */}
    <div className="absolute z-30" style={{ top: '50%', left: '2%', transform: 'translateY(-50%)' }}>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <div className="px-4 py-3 rounded-2xl flex items-center gap-3" style={{
          background: 'rgba(5,13,36,0.90)',
          border: '1px solid rgba(47,100,200,0.28)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>
          <Zap className="w-5 h-5 text-orange shrink-0" />
          <div>
            <div className="text-[11px] text-white/45 font-medium">AI Optimized</div>
            <div className="text-white text-sm font-bold">Route Active</div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Bottom-right card: Customs */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      className="absolute z-30"
      style={{ bottom: '8%', right: '2%' }}
    >
      <div className="px-4 py-3 rounded-2xl flex items-center gap-3" style={{
        background: 'rgba(5,13,36,0.90)',
        border: '1px solid rgba(47,100,200,0.28)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        <Shield className="w-5 h-5 text-green-400 shrink-0" />
        <div>
          <div className="text-[11px] text-white/45 font-medium">Customs</div>
          <div className="text-white text-sm font-bold">Cleared</div>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── Live Cargo Ticker ────────────────────────────────────────────────────────
const LiveCargoTicker = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tickerEvents.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #0a1628 0%, #061020 50%, #0a1628 100%)',
        borderTop: '1px solid rgba(255,106,0,0.18)',
        borderBottom: '1px solid rgba(255,106,0,0.18)',
      }}
    >
      {/* Sweep shimmer */}
      <motion.div
        className="absolute inset-y-0 w-32 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.06), transparent)' }}
        animate={{ x: ['-100%', '1200%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          {/* Live badge */}
          <div className="flex items-center gap-2 flex-shrink-0 bg-red-500/15 border border-red-500/25 px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-300 text-xs font-bold uppercase tracking-widest">LIVE</span>
          </div>

          {/* Scrolling ticker items */}
          <div className="flex-1 overflow-hidden h-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex items-center gap-3 absolute inset-0"
              >
                {tickerEvents.map((evt, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-3 py-0.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                      }`}
                      style={isActive ? { background: `${evt.color}15`, border: `1px solid ${evt.color}30` } : {}}
                    >
                      {isActive && (
                        <>
                          <evt.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: evt.color }} />
                          <span className="text-white/80 text-sm font-medium whitespace-nowrap">{evt.label}</span>
                          <span className="text-white/35 text-xs whitespace-nowrap">— {evt.detail}</span>
                        </>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {tickerEvents.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 14 : 4,
                  height: 4,
                  background: i === activeIndex ? '#FF6A00' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Tilt Card wrapper ────────────────────────────────────────────────────────
const TiltCard = ({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#071628] via-navy to-[#0D2545] overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(47,128,237,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Animated logistics network lines */}
      <motion.div style={{ y }} className="absolute inset-0">
        <NetworkLines />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-7rem)]">
          {/* Left: Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            {/* Brand tagline badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-sm rounded-full border border-white/12 mb-8"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-sm text-white/75 font-medium tracking-wide">
                Smart Solutions &bull; Global Reach &bull; Delivering Excellence
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6"
            >
              Smarter Global Logistics,
              <br />
              <span className="relative inline-block">
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #FF6A00, #ffb347, #2F80ED, #FF6A00)',
                    backgroundSize: '300% 100%',
                    animation: 'shimmerText 4s linear infinite',
                  }}
                >
                  Powered by IntelWise
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/65 mb-10 max-w-xl leading-relaxed"
            >
              Your expert in full integrated shipping &amp; logistics. We connect
              continents with fast, secure, and intelligent solutions — air, sea, road,
              and beyond.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact" className="btn-primary text-base px-8 py-4 gap-2 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get a Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
              <Link to="/tracking" className="btn-secondary-light text-base px-8 py-4">
                Track Shipment
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/8"
            >
              {[
                { icon: Shield, color: 'green', label: 'ISO 9001 Certified' },
                { icon: Clock, color: 'orange', label: '24/7 Support' },
                { icon: Users, color: 'blue', label: '10K+ Clients' },
                { icon: Globe, color: 'white', label: '120+ Countries' },
              ].map(({ icon: Icon, color, label }, i) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    color === 'green' ? 'bg-green-500/20' :
                    color === 'orange' ? 'bg-orange/20' :
                    color === 'blue' ? 'bg-accent-blue/20' : 'bg-white/10'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      color === 'green' ? 'text-green-400' :
                      color === 'orange' ? 'text-orange' :
                      color === 'blue' ? 'text-accent-blue' : 'text-white/70'
                    }`} />
                  </div>
                  <span className="text-sm text-white/55">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Animated globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="hidden lg:block h-[700px]"
          >
            <AnimatedGlobe />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Stats Section ────────────────────────────────────────────────────────────
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-0 bg-white relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-orange/0 via-orange to-orange/0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-navy/8 border border-navy/8 rounded-3xl overflow-hidden bg-gradient-to-br from-background to-white shadow-soft"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center p-8 md:p-10 group hover:bg-orange/3 transition-colors relative overflow-hidden"
            >
              {/* Hover ripple */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,106,0,0.06) 0%, transparent 70%)' }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <stat.icon className="w-6 h-6 text-orange" />
                </motion.div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-navy/55 text-sm font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Services Section ─────────────────────────────────────────────────────────
const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #04111f 0%, #071628 50%, #04111f 100%)' }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(47,128,237,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border border-orange/20"
            style={{ background: 'rgba(255,106,0,0.10)' }}
          >
            <Zap className="w-4 h-4 text-orange" />
            <span className="text-sm font-semibold text-orange uppercase tracking-wider">What We Do</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Full-Integrated Logistics Services
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-white/50 max-w-2xl mx-auto">
            Specialized in diversified fields in logistics — from freight to concierge solutions
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
            >
              <Link to={service.link} className="block h-full">
              <TiltCard
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
                style={{
                  background: 'rgba(7, 18, 42, 0.92)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
                }}
              >
                <motion.div
                  className="h-full"
                  whileHover={{
                    borderColor: 'rgba(47,128,237,0.38)',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.50), 0 0 0 1px rgba(47,128,237,0.22), 0 8px 40px rgba(47,128,237,0.16)',
                  }}
                  transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                  style={{ height: '100%' }}
                >
                  {/* Image panel */}
                  <div className="relative overflow-hidden" style={{ height: '210px' }}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(7,18,42,1) 0%, rgba(7,18,42,0.45) 45%, transparent 100%)' }}
                    />
                    {service.tag && (
                      <span
                        className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full text-white z-10"
                        style={{ background: 'rgba(255,106,0,0.95)', boxShadow: '0 2px 10px rgba(255,106,0,0.45)' }}
                      >
                        {service.tag}
                      </span>
                    )}
                    {/* Scan line effect on hover */}
                    <motion.div
                      className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                      animate={{ y: [0, 210] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-6 pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,106,0,0.12)' }}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <service.icon className="w-5 h-5 text-orange" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-white">{service.title}</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-1.5 mt-5 text-orange text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(to right, #FF6A00, #2F80ED)' }} />
                </motion.div>
              </TiltCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/services" className="inline-flex items-center gap-2 btn-primary px-8 py-3 group relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              View All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.span
              className="absolute inset-0 bg-white/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.4 }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ─── How It Works Section ─────────────────────────────────────────────────────
const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/10 rounded-full mb-4"
          >
            <CheckCircle2 className="w-4 h-4 text-accent-blue" />
            <span className="text-sm font-semibold text-accent-blue uppercase tracking-wider">Simple Process</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-title">
            How It Works
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
            Getting started with IntelWise is simple. From enquiry to delivery in three steps.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-orange via-accent-blue to-orange opacity-20" />

          {howItWorks.map((step, index) => (
            <motion.div key={step.step} variants={fadeInUp} className="relative group">
              <motion.div
                className="bg-background rounded-3xl p-8 border border-navy/6 hover:border-orange/30 hover:shadow-card transition-all duration-300"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange to-orange-400 flex items-center justify-center shadow-lg shadow-orange/20"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <span className="text-5xl font-bold text-navy/8 leading-none">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
                <p className="text-navy/60 leading-relaxed">{step.description}</p>
              </motion.div>

              {index < howItWorks.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-white border-2 border-orange/30 flex items-center justify-center shadow-sm"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-4 h-4 text-orange" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/contact" className="inline-flex items-center gap-2 text-orange font-semibold hover:gap-4 transition-all">
            Submit an Enquiry Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Image Carousel Section ───────────────────────────────────────────────────
const carouselSlides = [
  {
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tag: 'Air Freight',
    title: 'Connecting Continents\nThrough the Sky',
    subtitle: 'Express air cargo to 120+ destinations worldwide with same-day dispatch.',
    accent: '#FF6A00',
  },
  {
    image: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tag: 'Sea Freight',
    title: 'Commanding the\nWorld\'s Oceans',
    subtitle: 'Full container loads, break bulk, and project cargo across every major shipping lane.',
    accent: '#2F80ED',
  },
  {
    image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tag: 'Road Transport',
    title: 'Last-Mile Precision\nDelivery',
    subtitle: 'Flexible FTL and LTL road solutions that get your cargo where it needs to be.',
    accent: '#10b981',
  },
  {
    image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tag: 'Warehousing',
    title: 'Smart Storage,\nGlobal Reach',
    subtitle: 'AI-managed warehousing with real-time inventory across 40+ strategic hubs.',
    accent: '#FF6A00',
  },
  {
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tag: 'Customs Clearance',
    title: 'Borders? No\nBarrier for Us',
    subtitle: 'Expert customs brokerage ensuring frictionless cross-border movement.',
    accent: '#2F80ED',
  },
];

const ImageCarouselSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const total = carouselSlides.length;

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent((next + total) % total);
  }, [total]);

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  // Autoplay
  useEffect(() => {
    autoTimer.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
    }, 5000);
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [total]);

  const resetAuto = () => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
    }, 5000);
  };

  const handlePrev = () => { prev(); resetAuto(); };
  const handleNext = () => { next(); resetAuto(); };
  const handleDot = (i: number) => { go(i, i > current ? 1 : -1); resetAuto(); };

  // Drag / swipe
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(false);
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = endX - dragStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
    setIsDragging(false);
  };
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    if (Math.abs(x - dragStartX.current) > 8) setIsDragging(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 1.04 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.96 }),
  };

  const slide = carouselSlides[current];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden select-none"
      style={{ height: 'clamp(440px, 68vh, 760px)' }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.72, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          drag={false}
        >
          {/* Image with parallax zoom-in on enter */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'easeOut' }}
          >
            <img
              src={slide.image}
              alt={slide.tag}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(4,10,28,0.88) 0%, rgba(4,10,28,0.55) 50%, rgba(4,10,28,0.15) 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(4,10,28,0.70) 0%, transparent 45%)',
          }} />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
                className="max-w-xl"
              >
                {/* Tag */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-5"
                  style={{ background: `${slide.accent}cc`, boxShadow: `0 4px 20px ${slide.accent}55` }}
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  {slide.tag}
                </div>

                {/* Headline */}
                <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-[1.08] mb-5 whitespace-pre-line">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                  {slide.subtitle}
                </p>

                {/* CTA */}
                <Link
                  to="/services"
                  onClick={(e) => isDragging && e.preventDefault()}
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm border border-white/25 px-5 py-2.5 rounded-xl hover:bg-white hover:text-navy transition-all duration-300 group"
                >
                  Explore Service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Slide counter — bottom right */}
          <div className="absolute bottom-8 right-8 text-white/50 text-sm font-mono tabular-nums hidden sm:block">
            <span className="text-white font-bold text-lg">{String(current + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            {String(total).padStart(2, '0')}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next buttons */}
      <div className="absolute inset-y-0 left-4 sm:left-8 flex items-center z-20 pointer-events-none">
        <motion.button
          onClick={handlePrev}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white pointer-events-auto"
          style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.20)' } as any}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
      </div>
      <div className="absolute inset-y-0 right-4 sm:right-8 flex items-center z-20 pointer-events-none">
        <motion.button
          onClick={handleNext}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white pointer-events-auto"
          style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.20)' } as any}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Dot navigation + progress bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        {/* Progress bar for active slide */}
        <div className="w-32 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <motion.div
            key={current}
            className="h-full rounded-full"
            style={{ background: slide.accent }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {carouselSlides.map((s, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              className="relative rounded-full transition-all duration-300 focus:outline-none"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? slide.accent : 'rgba(255,255,255,0.30)',
                boxShadow: i === current ? `0 0 8px ${slide.accent}` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-6 right-20 hidden lg:flex items-end gap-2 z-20">
        {carouselSlides.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => handleDot(i)}
            className="relative overflow-hidden rounded-lg flex-shrink-0 focus:outline-none"
            style={{ width: 56, height: 40 }}
            whileHover={{ scale: 1.06 }}
            animate={{ opacity: i === current ? 1 : 0.45, outline: i === current ? `2px solid ${slide.accent}` : '2px solid transparent' }}
            transition={{ duration: 0.25 }}
          >
            <img src={s.image} alt={s.tag} className="w-full h-full object-cover" draggable={false} />
          </motion.button>
        ))}
      </div>

      {/* Swipe hint — fades out after load */}
      <motion.div
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-white/25 text-xs uppercase tracking-widest flex items-center gap-2 pointer-events-none lg:hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <ChevronLeft className="w-3 h-3" /> Swipe <ChevronRight className="w-3 h-3" />
      </motion.div>
    </section>
  );
};

// ─── Tracking Section ─────────────────────────────────────────────────────────
const TrackingSection = () => {
  const [trackingId, setTrackingId] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const trackingSteps = [
    { label: 'Order Placed', date: 'Jun 5, 2024', completed: true },
    { label: 'In Transit', date: 'Jun 6, 2024', completed: true },
    { label: 'Customs Cleared', date: 'Jun 8, 2024', completed: true },
    { label: 'Delivered', date: 'Jun 10, 2024', completed: false },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#071628] via-navy to-[#0D2545] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-white"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 border border-white/10 rounded-full mb-6">
              <Clock className="w-4 h-4 text-orange" />
              <span className="text-sm font-medium">Real-Time Updates</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Track Your Shipment
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-300">
                Anytime, Anywhere
              </span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-white/65 text-lg mb-8 leading-relaxed">
              Stay informed at every stage. Monitor your cargo's journey from pickup
              through customs to final delivery with live GPS tracking.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking ID — e.g. IW-2024-2847"
                className="flex-1 px-5 py-4 bg-white/8 border border-white/15 rounded-xl text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-sm"
              />
              <Link to="/tracking" className="btn-primary whitespace-nowrap">
                Track Now
              </Link>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-white/35 text-xs mt-3">
              Try sample ID: <span className="text-orange">IW-2024-2847</span>
            </motion.p>
          </motion.div>

          {/* Timeline card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/6 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Tracking ID</p>
                <p className="text-white font-mono font-semibold text-lg">IW-2024-2847</p>
              </div>
              <div className="flex items-center gap-2 bg-green-500/15 border border-green-500/25 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Active</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8 p-4 bg-white/5 rounded-xl">
              <div className="flex-1">
                <p className="text-white/40 text-xs">Origin</p>
                <p className="text-white font-semibold text-sm">Shanghai, CN</p>
              </div>
              <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-5 h-5 text-orange" />
              </motion.div>
              <div className="flex-1 text-right">
                <p className="text-white/40 text-xs">Destination</p>
                <p className="text-white font-semibold text-sm">New York, US</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/8" />
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '72%' } : { height: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="absolute left-4 top-4 w-0.5 bg-gradient-to-b from-orange to-orange/40"
              />
              {trackingSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-5 mb-7 last:mb-0"
                >
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed ? 'bg-orange shadow-lg shadow-orange/30' : 'bg-white/8 border border-white/15'
                  }`}>
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <p className={`font-medium text-sm ${step.completed ? 'text-white' : 'text-white/35'}`}>{step.label}</p>
                    <p className={`text-xs ${step.completed ? 'text-white/50' : 'text-white/25'}`}>{step.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Why Choose Us Section ────────────────────────────────────────────────────
const WhyChooseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-soft">
              <img
                src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Global Logistics Operations"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 left-6 right-6 bg-white rounded-2xl p-5 shadow-card border border-navy/6 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-navy/55">On-time Delivery Rate</p>
                <p className="text-3xl font-bold text-navy mt-0.5">99.8%</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex gap-1">
                  {[4, 8, 6, 9, 7].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-2 bg-orange rounded-sm"
                      style={{ height: `${h * 4}px` }}
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-navy/40">Last 12 months</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="pt-6 lg:pt-0"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 rounded-full mb-6">
              <Star className="w-4 h-4 text-orange fill-orange" />
              <span className="text-sm font-semibold text-orange uppercase tracking-wider">Why IntelWise</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="section-title mb-4">Why Choose Us</motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle mb-10">
              We combine cutting-edge technology with deep logistics expertise to deliver unmatched reliability and value.
            </motion.p>

            <div className="space-y-5">
              {whyChooseUs.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-orange/3 transition-colors group cursor-default"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="w-11 h-11 rounded-xl bg-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <item.icon className="w-5 h-5 text-orange" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-navy text-base mb-0.5">{item.title}</h4>
                    <p className="text-navy/55 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-8">
              <Link to="/about" className="inline-flex items-center gap-2 text-orange font-semibold hover:gap-4 transition-all">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials Section ─────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 rounded-full mb-4">
            <Star className="w-4 h-4 text-orange fill-orange" />
            <span className="text-sm font-semibold text-orange uppercase tracking-wider">Client Stories</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="section-title">What Our Clients Say</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
            Trusted by thousands of businesses worldwide to move their world faster
          </motion.p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="overflow-hidden"
          >
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="flex"
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="w-full flex-shrink-0 px-2 md:px-8">
                  <div className="max-w-3xl mx-auto bg-white border border-navy/6 rounded-3xl p-8 md:p-12 shadow-card">
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -20 }}
                          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
                          transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 400 }}
                        >
                          <Star className="w-5 h-5 text-orange fill-orange" />
                        </motion.div>
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-orange/20 mb-4" />
                    <p className="text-lg md:text-xl text-navy/75 mb-8 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange to-accent-blue flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{testimonial.name}</p>
                        <p className="text-navy/55 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-navy/8 shadow-card hover:shadow-card-hover hover:border-orange/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-navy" />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-orange w-6 h-2' : 'bg-navy/15 w-2 h-2'
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-navy/8 shadow-card hover:shadow-card-hover hover:border-orange/30 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-navy" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Partners Section ─────────────────────────────────────────────────────────
const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 bg-white border-t border-navy/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-10"
        >
          <p className="text-navy/40 text-sm uppercase tracking-[0.2em] font-medium">
            Trusted by Industry Leaders &amp; Global Partners
          </p>
        </motion.div>

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-12 w-max"
          >
            {[...partners, ...partners].map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-1 group cursor-default flex-shrink-0"
              >
                <div className="px-6 py-3 bg-background rounded-xl border border-navy/6 group-hover:border-orange/30 group-hover:shadow-md transition-all duration-300">
                  <span className="text-navy/70 font-bold text-lg group-hover:text-navy transition-colors whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
                <span className="text-navy/30 text-xs">{partner.category}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── CTA Section ──────────────────────────────────────────────────────────────
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#071628] via-navy to-[#0D2545] relative overflow-hidden">
      {/* Animated background gradient pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 50%, rgba(255,106,0,0.12) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 50%, rgba(255,106,0,0.20) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 50%, rgba(255,106,0,0.12) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0">
        <NetworkLines />
      </div>
      <FloatingParticles />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl px-5 py-2.5 border border-navy/10 shadow-[0_4px_20px_rgba(0,0,0,0.28)] inline-block">
              <img src="/intelwise-logistics.png" alt="IntelWise Logistics" className="h-10 w-auto object-contain" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Let's Move Your World
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, #FF6A00, #ffb347, #ff8c00, #FF6A00)',
                backgroundSize: '300% 100%',
                animation: 'shimmerText 3s linear infinite',
              }}
            >
              Faster
            </span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-white/60 text-lg md:text-xl mb-4 max-w-2xl mx-auto">
            Ready to optimize your logistics? Get a personalized quote and discover how IntelWise can transform your supply chain.
          </motion.p>

          <motion.p variants={fadeInUp} className="text-white/35 text-sm mb-10 uppercase tracking-[0.2em]">
            Smart Solutions &bull; Global Reach &bull; Delivering Excellence
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-base px-10 py-4 gap-2 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            <Link to="/services" className="btn-secondary-light text-base px-10 py-4">
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <LiveCargoTicker />
      <StatsSection />
      <ServicesSection />
      <HowItWorksSection />
      <ImageCarouselSection />
      <TrackingSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
