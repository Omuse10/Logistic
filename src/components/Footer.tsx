import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    services: [
      { to: '/services', label: 'Air Freight' },
      { to: '/services', label: 'Sea Freight' },
      { to: '/services', label: 'Road Transport' },
      { to: '/services', label: 'Warehousing' },
      { to: '/services', label: 'Customs Clearance' },
      { to: '/services', label: 'Private Jet Charter' },
    ],
    company: [
      { to: '/about', label: 'About Us' },
      { to: '/about', label: 'Our Team' },
      { to: '/about', label: 'Careers' },
      { to: '/contact', label: 'Contact' },
    ],
    support: [
      { to: '/tracking', label: 'Track Shipment' },
      { to: '/contact', label: 'Get a Quote' },
      { to: '/contact', label: 'Help Center' },
      { to: '/contact', label: 'FAQs' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-navy text-white">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-orange via-accent-blue to-orange" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-2xl px-4 py-2 border border-navy/10 shadow-[0_4px_20px_rgba(0,0,0,0.28)] inline-block"
              >
                <img
                  src="/intelwise-logistics.png"
                  alt="IntelWise Logistics"
                  className="h-14 w-auto object-contain"
                />
              </motion.div>
            </Link>

            <p className="text-white/60 mb-2 max-w-sm text-sm leading-relaxed">
              Smart Solutions &bull; Global Reach &bull; Delivering Excellence
            </p>
            <p className="text-white/50 mb-6 max-w-sm text-sm leading-relaxed">
              Your expert in full integrated shipping &amp; logistics services.
              Connecting continents with intelligent, fast, and secure solutions.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@intelwiselogistics.com"
                className="flex items-center gap-3 text-white/70 hover:text-orange transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@intelwiselogistics.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-white/70 hover:text-orange transition-colors text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Global HQ: New York, USA</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Newsletter mini */}
            <div className="mt-8">
              <p className="text-sm font-medium text-white/70 mb-3">Stay Updated</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-orange"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-orange rounded-lg text-sm font-medium hover:bg-orange-400 transition-colors"
                >
                  Go
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2024 IntelWise Logistics. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-white/5 hover:bg-orange/20 text-white/60 hover:text-orange transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
