import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../assets/intelwise-logistics.png';
import { useState } from 'react';
import {
  Plane,
  Ship,
  Truck as TruckIcon,
  Warehouse,
  Brain,
  FileCheck,
  Crown,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  Shield,
  Zap,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';

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

// Services data with detailed info
const services = [
  {
    id: 'air-freight',
    icon: Plane,
    title: 'Air Freight',
    subtitle: 'Fast & Reliable Global Shipping',
    description:
      'Our air freight services deliver your cargo worldwide with speed and precision. We partner with leading airlines to ensure reliable transit times and competitive rates.',
    features: [
      'Door-to-door delivery',
      'Real-time tracking',
      'Temperature-controlled options',
      'Express & economy options',
      'Customs clearance support',
      'Insurance coverage',
    ],
    stats: { delivery: '1-3 days', coverage: '150+ destinations', reliability: '99.7%' },
    color: 'from-orange/10 to-orange/5',
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'sea-freight',
    icon: Ship,
    title: 'Sea Freight',
    subtitle: 'Cost-Effective Ocean Shipping',
    description:
      'For large-volume shipments, our sea freight services offer the most economical solution. We handle FCL, LCL, and project cargo with expertise.',
    features: [
      'Full Container Load (FCL)',
      'Less Container Load (LCL)',
      'Project cargo handling',
      'Reefer containers',
      'Documentation support',
      'Port-to-port or door-to-door',
    ],
    stats: { delivery: '15-45 days', coverage: '200+ ports', reliability: '99.5%' },
    color: 'from-accent-blue/10 to-accent-blue/5',
    image: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'road-transport',
    icon: TruckIcon,
    title: 'Road Transport',
    subtitle: 'Efficient Regional Logistics',
    description:
      'Our road transport network covers major trade routes with flexible scheduling and dedicated fleet management. Ideal for regional and cross-border shipping.',
    features: [
      'Full truckload (FTL)',
      'Less than truckload (LTL)',
      'Express delivery',
      'Temperature-controlled fleet',
      'Cross-border expertise',
      'Last-mile solutions',
    ],
    stats: { delivery: '1-5 days', coverage: '50+ countries', reliability: '99.8%' },
    color: 'from-navy/10 to-navy/5',
    image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'warehousing',
    icon: Warehouse,
    title: 'Warehousing',
    subtitle: 'Advanced Storage Solutions',
    description:
      'Our modern warehousing facilities offer secure storage with advanced inventory management systems. Strategic locations for optimal distribution.',
    features: [
      'Temperature-controlled storage',
      'Bonded warehouse options',
      'Inventory management system',
      'Order fulfillment services',
      'Cross-docking facilities',
      '24/7 security monitoring',
    ],
    stats: { capacity: '5M sq ft', locations: '50+ facilities', accuracy: '99.9%' },
    color: 'from-orange/10 to-orange/5',
    image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'ai-optimization',
    icon: Brain,
    title: 'AI-Powered Optimization',
    subtitle: 'Intelligent Supply Chain',
    description:
      'Leverage machine learning to optimize your entire supply chain. Our AI platform analyzes patterns to reduce costs and improve delivery times.',
    features: [
      'Route optimization',
      'Demand forecasting',
      'Inventory optimization',
      'Risk prediction',
      'Cost reduction analytics',
      'Performance dashboards',
    ],
    stats: { costReduction: '32% avg', accuracy: '95%', roi: '3-6 months' },
    color: 'from-accent-blue/10 to-accent-blue/5',
    image: 'https://images.pexels.com/photos/8386442/pexels-photo-8386442.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'customs-clearance',
    icon: FileCheck,
    title: 'Customs Clearance',
    subtitle: 'Compliant & Hassle-Free Clearance',
    description:
      'Our licensed customs brokers ensure your cargo crosses every border smoothly. We handle documentation, duties, tariffs, and full compliance with local regulations.',
    features: [
      'Licensed customs brokerage',
      'HS code classification',
      'Duty & tax calculation',
      'Import/export documentation',
      'Regulatory compliance',
      'Bonded storage options',
    ],
    stats: { processing: '24-48 hrs', compliance: '100%', countries: '120+ markets' },
    color: 'from-orange/10 to-orange/5',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'private-jet-charter',
    icon: Crown,
    title: 'Private Jet Charter',
    subtitle: 'Premium Executive Travel',
    description:
      'Luxury aviation services for executives and VIP clients. We arrange private jet charters worldwide, offering comfort, privacy, and on-demand flexibility.',
    features: [
      'Global charter network',
      'On-demand scheduling',
      'VIP ground handling',
      'In-flight concierge',
      'Multi-leg itineraries',
      'Cargo & passenger combined',
    ],
    stats: { availability: 'On-Demand', fleetSize: '1,000+ jets', coverage: '180+ countries' },
    color: 'from-navy/10 to-navy/5',
    image: 'https://images.pexels.com/photos/1268701/pexels-photo-1268701.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// Benefits data
const benefits = [
  {
    icon: Clock,
    title: 'Faster Delivery',
    description: 'Optimized routes and multiple transport modes ensure quick turnaround.',
  },
  {
    icon: Shield,
    title: 'Secure Handling',
    description: 'Advanced tracking and insurance options protect your valuable cargo.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Extensive network spanning 120+ countries for worldwide coverage.',
  },
  {
    icon: Zap,
    title: 'Smart Technology',
    description: 'AI-powered platform provides real-time insights and optimization.',
  },
];

const faqs = [
  {
    question: 'Does IntelWise Logistics handle customs clearance for imports into Kenya?',
    answer:
      'Yes, IntelWise Logistics provides full customs documentation and clearance services for both imports and exports through Kenyan ports and border points.',
  },
  {
    question: 'Do you offer shipping services from Asia to Kenya?',
    answer:
      'Yes, we connect Kenya with trade partners across Asia, offering both air and sea freight options depending on cargo type and timeline.',
  },
  {
    question: 'Can you arrange shipping from Kenya to Canada or Australia?',
    answer:
      'Yes, IntelWise Logistics manages freight forwarding to and from Canada and Australia, including documentation and customs support on both ends.',
  },
  {
    question: 'Do you offer warehousing services in Nairobi?',
    answer:
      'Yes, we provide secure short and long-term warehousing and storage solutions for businesses across East Africa.',
  },
  {
    question: 'What areas does IntelWise Logistics serve?',
    answer:
      'IntelWise Logistics is based in Nairobi, Kenya, and serves clients across Kenya while connecting trade partners in Asia, Canada, and Australia.',
  },
];

const ServicesPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: '-50px' });
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="pt-20 bg-[#071628]">
      {/* Hero Section */}
      <section ref={heroRef} className="py-24 bg-gradient-to-br from-[#071628] via-navy to-[#0D2545] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center text-white"
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="flex justify-center mb-8">
              <div className="bg-white rounded-2xl px-5 py-2.5 border border-navy/10 shadow-[0_4px_20px_rgba(0,0,0,0.28)] inline-block">
                <img
                  src={Logo}
                  alt="IntelWise Logistics"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-sm rounded-full border border-white/10 mb-6"
            >
              <Zap className="w-4 h-4 text-orange" />
              <span className="text-sm">Specialized in Diversified Logistics Fields</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Our Services
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-4"
            >
              Comprehensive logistics solutions designed to move your business forward.
              From air &amp; sea freight to private jet charter, we have you covered.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-white/35 text-sm uppercase tracking-[0.2em]">
              Smart Solutions &bull; Global Reach &bull; Delivering Excellence
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative rounded-4xl overflow-hidden shadow-soft">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    {/* Stats overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy/90 to-transparent p-6">
                      <div className="grid grid-cols-3 gap-4 text-white">
                        {Object.entries(service.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <p className="text-xs text-white/60 uppercase tracking-wider">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-lg font-semibold">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className={`inline-flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r ${service.color} mb-6`}>
                    <service.icon className="w-6 h-6 text-orange" />
                    <span className="text-sm font-medium text-navy">{service.subtitle}</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                    {service.title}
                  </h2>

                  <p className="text-navy/60 text-lg mb-8">{service.description}</p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                        <span className="text-navy/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-orange font-semibold hover:gap-4 transition-all"
                  >
                    Get a Quote for {service.title}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={benefitsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="section-title text-center mb-16">
              Why Choose IntelWise
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange/10 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-2">{benefit.title}</h3>
                  <p className="text-navy/60">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

              {/* FAQ Section */}
        <section ref={faqRef} className="py-24 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={faqInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-orange/10 mb-4">
                  <HelpCircle className="w-6 h-6 text-orange" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-navy/60 text-lg">
                  Common questions about our logistics services across Kenya and beyond
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-navy/10 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between gap-4 p-6 text-left bg-white hover:bg-navy/[0.02] transition-colors"
                    >
                      <span className="font-semibold text-navy">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-orange flex-shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6 bg-white">
                        <p className="text-navy/60">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Ready to Optimize Your Logistics?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-white/70 text-lg mb-10"
            >
              Contact our team today for a customized logistics solution that fits your business needs.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary px-10 py-4 gap-2 group">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tracking" className="btn-secondary-light px-10 py-4">
                Track a Shipment
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
