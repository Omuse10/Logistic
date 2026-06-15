import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Globe,
  Building,
  MessageSquare,
  ArrowRight,
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

// Contact info
const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'info@intelwiselogistics.com',
    description: 'General inquiries and support',
    action: 'mailto:info@intelwiselogistics.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+1 (234) 567-890',
    description: 'Mon-Fri 8AM-8PM EST',
    action: 'tel:+1234567890',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '350 5th Avenue, Suite 4000',
    description: 'New York, NY 10118',
    action: '#',
  },
];

// Global offices
const offices = [
  { city: 'New York', country: 'USA', type: 'Global HQ', timezone: 'EST (UTC-5)' },
  { city: 'Shanghai', country: 'China', type: 'Asia Hub', timezone: 'CST (UTC+8)' },
  { city: 'Rotterdam', country: 'Netherlands', type: 'Europe Hub', timezone: 'CET (UTC+1)' },
  { city: 'Dubai', country: 'UAE', type: 'Middle East Hub', timezone: 'GST (UTC+4)' },
];

// FAQ
const faqs = [
  {
    q: 'How quickly can I get a shipping quote?',
    a: 'We provide instant quotes for standard shipments via our online form. For complex or project cargo, our team responds within 2 business hours.',
  },
  {
    q: 'What information do I need to provide for a quote?',
    a: 'Basic details include origin/destination, cargo type, weight/dimensions, and desired delivery timeline. Our team can help gather any missing information.',
  },
  {
    q: 'Can you handle customs clearance?',
    a: 'Yes, we offer comprehensive customs brokerage services in all major trade lanes. Our licensed brokers handle documentation, duties, and compliance.',
  },
  {
    q: 'What types of cargo do you handle?',
    a: 'We handle everything from general cargo to specialized shipments including hazardous materials, temperature-controlled goods, and oversized project cargo.',
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-100px' });
  const officesRef = useRef(null);
  const officesInView = useInView(officesRef, { once: true, margin: '-100px' });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: '-100px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
                  src="/intelwise-logistics.png"
                  alt="IntelWise Logistics"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-sm rounded-full border border-white/10 mb-8"
            >
              <MessageSquare className="w-4 h-4 text-orange" />
              <span className="text-sm">Let's Connect</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Contact Us
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            >
              Ready to optimize your logistics? Our team is here to help you find the
              perfect solution for your shipping needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-background -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-card p-8 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center mb-6 group-hover:bg-orange/20 transition-colors">
                  <method.icon className="w-7 h-7 text-orange" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{method.title}</h3>
                <p className="text-navy font-medium mb-1">{method.value}</p>
                <p className="text-navy/60 text-sm">{method.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <motion.div
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="section-title mb-4">
                Get a Quote
              </motion.div>
              <motion.p variants={fadeInUp} className="text-navy/60 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </motion.p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Message Sent!</h3>
                  <p className="text-navy/60">
                    Thank you for reaching out. Our team will contact you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  variants={fadeInUp}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                        placeholder="+1 (234) 567-890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Service Interested In *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="air-freight">Air Freight</option>
                      <option value="sea-freight">Sea Freight</option>
                      <option value="road-transport">Road Transport</option>
                      <option value="warehousing">Warehousing</option>
                      <option value="ai-optimization">AI Optimization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-navy/20 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent resize-none"
                      placeholder="Tell us about your shipping needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Why Contact Us */}
              <div className="bg-background rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-semibold text-navy mb-6">
                  Why Work With Us?
                </h3>
                <div className="space-y-4">
                  {[
                    'Personalized solutions for your unique shipping needs',
                    'Competitive rates with transparent pricing',
                    'Dedicated account manager for your shipments',
                    'Real-time tracking and 24/7 support',
                    'AI-powered route optimization for efficiency',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-navy/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-navy rounded-2xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-6">Need Immediate Help?</h3>
                <p className="text-white/70 mb-6">
                  Our support team is available around the clock for urgent shipments.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-orange" />
                    <div>
                      <p className="text-sm text-white/60">Call Now</p>
                      <p className="font-semibold">+1 (234) 567-890</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <Clock className="w-5 h-5 text-orange" />
                    <div>
                      <p className="text-sm text-white/60">Support Hours</p>
                      <p className="font-semibold">24/7 Emergency Line</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section ref={officesRef} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={officesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="section-title">
              Global Presence
            </motion.div>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Strategic hubs across the world for seamless global logistics
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={officesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {offices.map((office) => (
              <motion.div
                key={office.city}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-orange" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange bg-orange/10 px-2 py-1 rounded">
                    {office.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy">{office.city}</h3>
                <p className="text-navy/60 text-sm mb-2">{office.country}</p>
                <p className="text-xs text-navy/40">{office.timezone}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* World Map Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={officesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 relative bg-white rounded-2xl shadow-soft p-8 overflow-hidden"
          >
            <Globe className="w-full h-64 text-navy/5" strokeWidth={0.5} />
            {/* Decorative dots for offices */}
            <div className="absolute inset-0">
              {[
                { top: '35%', left: '25%' }, // New York
                { top: '38%', left: '85%' }, // Shanghai
                { top: '28%', left: '52%' }, // Rotterdam
                { top: '48%', left: '62%' }, // Dubai
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  style={{ top: pos.top, left: pos.left }}
                  initial={{ scale: 0 }}
                  animate={officesInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="absolute w-3 h-3 bg-orange rounded-full shadow-lg shadow-orange/30"
                >
                  <div className="absolute inset-0 bg-orange rounded-full animate-ping" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={faqInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="section-title">
              Frequently Asked Questions
            </motion.div>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Quick answers to common questions about our services
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={faqInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-background rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-navy">{faq.q}</span>
                  <ArrowRight
                    className={`w-5 h-5 text-orange transition-transform ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === index ? 'auto' : 0,
                    opacity: expandedFaq === index ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-navy/60">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
