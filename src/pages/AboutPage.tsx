import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe,
  Target,
  Heart,
  Users,
  Award,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
  Linkedin,
  Twitter,
  Mail,
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

// Company values
const values = [
  {
    icon: Target,
    title: 'Precision',
    description:
      'We deliver with accuracy and attention to every detail, ensuring your cargo arrives safely and on time.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description:
      'Transparent pricing, honest communication, and ethical practices form the foundation of our business.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description:
      'Continuously evolving our technology and processes to provide cutting-edge logistics solutions.',
  },
  {
    icon: Shield,
    title: 'Security',
    description:
      'Your cargo is protected with industry-leading security measures and comprehensive insurance options.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description:
      'Building long-term relationships with clients, understanding their unique needs, and delivering value.',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description:
      'Helping businesses scale globally with flexible logistics solutions that grow with them.',
  },
];

// Leadership team
const team = [
  {
    name: 'Alexandra Chen',
    role: 'CEO & Founder',
    bio: 'Former VP at Flexport with 15+ years in global logistics. Founded IntelWise to bring AI-powered efficiency to international shipping.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Marcus Williams',
    role: 'Chief Operations Officer',
    bio: 'Ex-Maersk executive with deep expertise in maritime operations. Oversees our global network operations.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Chief Technology Officer',
    bio: 'PhD in Supply Chain AI from MIT. Leads our AI optimization platform development and innovation.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'James Rodriguez',
    role: 'Chief Commercial Officer',
    bio: '20+ years in B2B sales and strategic partnerships. Drives our global expansion and client relationships.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
  },
];

// Stats
const companyStats = [
  { value: '2015', label: 'Founded' },
  { value: '2,500+', label: 'Team Members' },
  { value: '120+', label: 'Countries Served' },
  { value: '10,000+', label: 'Happy Clients' },
];

// Milestones
const milestones = [
  { year: '2015', event: 'Founded in New York with a vision for smarter logistics' },
  { year: '2017', event: 'Expanded to 25 countries across North America and Europe' },
  { year: '2019', event: 'Launched AI-powered route optimization platform' },
  { year: '2021', event: 'Reached 100+ countries with 1 million shipments delivered' },
  { year: '2023', event: 'Awarded Best Logistics Innovation by Global Freight Awards' },
  { year: '2024', event: 'Serving 10,000+ clients with 120+ country coverage' },
];

const AboutPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-50px' });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

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
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-sm rounded-full border border-white/10 mb-6"
            >
              <Globe className="w-4 h-4 text-orange" />
              <span className="text-sm">Established 2015 &bull; Serving 120+ Countries</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              About IntelWise
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-10"
            >
              We're on a mission to make global logistics smarter, faster, and more
              reliable. Powered by technology, driven by expertise.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {companyStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-orange mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-4xl overflow-hidden shadow-soft">
                <img
                  src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our Team"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-card p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-orange" />
                  </div>
                  <div>
                    <p className="text-sm text-navy/60">Recognition</p>
                    <p className="font-semibold text-navy">Best Logistics Innovation 2023</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={missionInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="section-title mb-6">
                Our Mission
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-navy/80 mb-8 leading-relaxed"
              >
                At IntelWise Logistics, we believe that global trade should be
                seamless, transparent, and accessible to businesses of all sizes.
                Our mission is to eliminate the complexity of international shipping
                through intelligent technology and dedicated expertise.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-navy/80 mb-8 leading-relaxed"
              >
                Founded in 2015, we've grown from a small team of logistics
                enthusiasts to a global operation serving clients in over 120
                countries. Our AI-powered platform processes millions of data
                points to optimize routes, reduce costs, and ensure reliable deliveries.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-orange font-semibold hover:gap-4 transition-all"
                >
                  Partner With Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="section-title">
              Our Core Values
            </motion.div>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-orange" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{value.title}</h3>
                <p className="text-navy/60">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="section-title">
              Leadership Team
            </motion.div>
            <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
              Meet the experts driving IntelWise forward
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group bg-background rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy">{member.name}</h3>
                  <p className="text-orange text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-navy/60 text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center hover:bg-orange/10 text-navy/60 hover:text-orange transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.twitter}
                      className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center hover:bg-orange/10 text-navy/60 hover:text-orange transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href="mailto:contact@example.com"
                      className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center hover:bg-orange/10 text-navy/60 hover:text-orange transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={timelineInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Our Journey
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 text-lg">
              From startup to global leader in logistics technology
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1 * index }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange border-4 border-navy z-10" />

                {/* Content */}
                <div
                  className={`flex-1 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'
                  }`}
                >
                  <span className="text-orange font-mono font-semibold">{milestone.year}</span>
                  <p className="text-white mt-2">{milestone.event}</p>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="bg-gradient-to-br from-navy to-navy-50 rounded-4xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange/20 rounded-full blur-3xl" />
            </div>

            <motion.h2
              variants={fadeInUp}
              className="relative text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Join Our Journey
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="relative text-white/70 text-lg mb-10 max-w-xl mx-auto"
            >
              Whether you're looking to optimize your supply chain or join our team,
              we'd love to connect with you.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="relative flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/contact"
                className="btn-primary px-10 py-4 gap-2 group"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="btn-secondary-light px-10 py-4"
              >
                View Our Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
