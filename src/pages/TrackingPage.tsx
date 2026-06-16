import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../assets/intelwise-logistics.png';
import {
  Search,
  Package,
  Truck,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  Weight,
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

// Sample tracking data
const sampleTracking = {
  id: 'IW-2024-2847',
  status: 'in-transit',
  estimatedDelivery: 'June 12, 2024',
  origin: 'Shanghai, China',
  destination: 'New York, USA',
  carrier: 'IntelWise Express Air',
  weight: '2,450 kg',
  pieces: '16 pallets',
  service: 'Air Freight - Express',
  timeline: [
    {
      status: 'Order Placed',
      date: 'Jun 5, 2024',
      time: '09:30 AM',
      location: 'Shanghai, China',
      completed: true,
      details: 'Shipment booked and confirmed',
    },
    {
      status: 'Pickup Complete',
      date: 'Jun 5, 2024',
      time: '02:15 PM',
      location: 'Shanghai Warehouse',
      completed: true,
      details: 'Cargo collected from shipper',
    },
    {
      status: 'In Transit',
      date: 'Jun 6, 2024',
      time: '08:00 AM',
      location: 'Pudong Airport',
      completed: true,
      details: 'Departed Shanghai via air freight',
    },
    {
      status: 'Customs Clearance',
      date: 'Jun 8, 2024',
      time: '11:30 AM',
      location: 'JFK Airport, NY',
      completed: true,
      details: 'Customs clearance completed',
    },
    {
      status: 'Final Delivery',
      date: 'Jun 10, 2024',
      time: '-- : --',
      location: 'New York, USA',
      completed: false,
      details: 'Awaiting final delivery',
    },
  ],
};

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState<typeof sampleTracking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      setTrackingData(sampleTracking);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="pt-20 bg-[#071628]">
      {/* Hero Section */}
      <section ref={heroRef} className="py-24 bg-gradient-to-br from-[#071628] via-navy to-[#0D2545] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/8 rounded-full blur-3xl" />
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-sm rounded-full border border-white/10 mb-8"
            >
              <Clock className="w-4 h-4 text-orange" />
              <span className="text-sm">Real-Time Tracking</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Track Your Shipment
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
            >
              Enter your tracking number to get real-time updates on your shipment's
              journey from origin to destination.
            </motion.p>

            {/* Tracking Form */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleTrack}
              className="max-w-2xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter tracking ID (e.g., IW-2024-2847)"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !trackingId}
                  className="btn-primary px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Track
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>

            {/* Quick Links */}
            <motion.div variants={fadeInUp} className="mt-6 text-white/60 text-sm">
              Try sample: <button onClick={() => setTrackingId('IW-2024-2847')} className="text-orange hover:underline">IW-2024-2847</button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tracking Results */}
      {hasSearched && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto border-4 border-orange/20 border-t-orange rounded-full"
                />
                <p className="mt-4 text-navy/60">Locating your shipment...</p>
              </div>
            ) : trackingData ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Status Banner */}
                <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center">
                        <Truck className="w-8 h-8 text-orange" />
                      </div>
                      <div>
                        <p className="text-sm text-navy/60">Tracking ID</p>
                        <p className="text-2xl font-mono font-semibold text-navy">{trackingData.id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-2 rounded-full ${
                        trackingData.status === 'in-transit'
                          ? 'bg-orange/10 text-orange'
                          : trackingData.status === 'delivered'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-navy/10 text-navy'
                      }`}>
                        <span className="font-semibold capitalize">{trackingData.status.replace('-', ' ')}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-navy/60">Est. Delivery</p>
                        <p className="font-semibold text-navy">{trackingData.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Summary */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Origin */}
                  <div className="bg-white rounded-2xl shadow-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-navy">Origin</span>
                    </div>
                    <p className="text-navy/60">{trackingData.origin}</p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-8 h-8 text-orange" />
                    </motion.div>
                  </div>

                  {/* Destination */}
                  <div className="bg-white rounded-2xl shadow-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-accent-blue" />
                      </div>
                      <span className="font-medium text-navy">Destination</span>
                    </div>
                    <p className="text-navy/60">{trackingData.destination}</p>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
                  <h3 className="font-semibold text-navy text-lg mb-4">Shipment Details</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-navy/60 mb-1">Carrier</p>
                      <p className="font-medium text-navy">{trackingData.carrier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-navy/60 mb-1">Service</p>
                      <p className="font-medium text-navy">{trackingData.service}</p>
                    </div>
                    <div>
                      <p className="text-sm text-navy/60 mb-1 flex items-center gap-1">
                        <Weight className="w-4 h-4" /> Weight
                      </p>
                      <p className="font-medium text-navy">{trackingData.weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-navy/60 mb-1 flex items-center gap-1">
                        <Package className="w-4 h-4" /> Pieces
                      </p>
                      <p className="font-medium text-navy">{trackingData.pieces}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h3 className="font-semibold text-navy text-lg mb-8">Tracking Timeline</h3>

                  <div className="relative">
                    {/* Progress line */}
                    <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-navy/10" />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: '80%' }}
                      transition={{ duration: 1 }}
                      className="absolute left-5 top-8 w-0.5 bg-orange"
                    />

                    {/* Steps */}
                    {trackingData.timeline.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex gap-6 mb-8 last:mb-0"
                      >
                        {/* Icon */}
                        <div className="relative z-10">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              step.completed
                                ? 'bg-orange text-white'
                                : 'bg-navy/10 text-navy/40'
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8 border-b border-navy/5 last:border-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h4 className={`font-semibold ${step.completed ? 'text-navy' : 'text-navy/40'}`}>
                              {step.status}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-navy/60">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {step.date}
                              </span>
                              <span>{step.time}</span>
                            </div>
                          </div>
                          <p className="text-navy/60 text-sm mb-1">{step.location}</p>
                          <p className="text-navy/80">{step.details}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Need Help */}
                <div className="mt-8 text-center">
                  <p className="text-navy/60 mb-4">Need help with your shipment?</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-xl hover:bg-navy-50 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      Contact Support
                    </Link>
                    <a
                      href="tel:+1234567890"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-navy/20 text-navy rounded-xl hover:bg-navy/5 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">No Results Found</h3>
                <p className="text-navy/60">
                  We couldn't find any shipment with that tracking ID. Please check and try again.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section (shown when not searched) */}
      {!hasSearched && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-orange" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">Real-Time Updates</h3>
                <p className="text-navy/60">
                  Get instant notifications and live updates as your shipment moves through each checkpoint.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent-blue/10 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-accent-blue" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">GPS Tracking</h3>
                <p className="text-navy/60">
                  Advanced GPS technology provides precise location data for your cargo at all times.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">Proof of Delivery</h3>
                <p className="text-navy/60">
                  Receive digital proof of delivery with signatures and timestamps once your shipment arrives.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default TrackingPage;
