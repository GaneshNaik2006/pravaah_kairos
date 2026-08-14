import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Background & Landing Experience
import SpaceGalaxyBackground from './components/Background/SpaceGalaxyBackground';
import IntroScreen from './components/LandingExperience/IntroScreen';

// Core Page Layout
import Navbar from './components/Navigation/Navbar';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/About/AboutSection';
import ChronoCalendarSection from './components/Calendar/ChronoCalendarSection';
import OrbitCalendar from './components/Calendar/OrbitCalendar';
import HighlightsSection from './components/Highlights/HighlightsSection';
import VideoSection from './components/Video/VideoSection';
import Footer from './components/Footer/Footer';

// Modals
import ProfileModal from './components/Profile/ProfileModal';
import RegisterModal from './components/Profile/RegisterModal';
import CinemaModal from './components/Video/CinemaModal';

export default function App() {
  // Phase sequence: 'intro' -> 'galaxyReveal' -> 'contentFadeIn' -> 'ready'
  const [phase, setPhase] = useState('intro');

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);
  const [activeCinemaVideo, setActiveCinemaVideo] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  const [user, setUser] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@iitbbs.ac.in',
    id: 'P27-KAIROS-9842',
    college: 'IIT Bhubaneswar',
  });

  const [registeredEvents, setRegisteredEvents] = useState([
    {
      title: 'CHRONO HACKATHON (36H)',
      time: '11:00 AM (Feb 12)',
      venue: 'LHC Complex',
    },
    {
      title: 'PRONITE: EDM NIGHT',
      time: '08:00 PM (Feb 13)',
      venue: 'Main Festival Grounds',
    },
  ]);

  // Section Observer for active navbar link highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'calendar', 'events', 'gallery', 'media', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sequence Flow Handlers:
  // Called when IntroScreen finishes its hold timer.
  // AnimatePresence will trigger IntroScreen's exit animation (logo fades out in reverse of entrance) BEFORE unmounting it!
  const handleIntroComplete = () => {
    setPhase('galaxyReveal');
    
    // Homepage content fades into view smoothly AFTER IntroScreen exit completes
    setTimeout(() => {
      setPhase((currentPhase) => (currentPhase === 'galaxyReveal' ? 'contentFadeIn' : currentPhase));
    }, 600);
  };

  const handleInitialRotationComplete = () => {
    setPhase('contentFadeIn');
  };

  const handleRegistrationComplete = ({ user: updatedUser, registeredEvent }) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
    if (registeredEvent && !registeredEvents.some((e) => e.title === registeredEvent.title)) {
      setRegisteredEvents((prev) => [...prev, registeredEvent]);
    }
  };

  const isContentVisible = phase === 'contentFadeIn' || phase === 'ready';

  return (
    <div className="relative bg-[#020208] text-gray-100 min-h-screen font-sans selection:bg-kairos-cyan selection:text-black overflow-x-hidden">
      
      {/* Deep Space Background */}
      <SpaceGalaxyBackground
        phase={phase}
        onInitialRotationComplete={handleInitialRotationComplete}
      />

      {/* Intro Screen wrapped in AnimatePresence mode="wait" */}
      {/* When phase changes, IntroScreen's exit prop fires (logo fades out in exact reverse of entrance) */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <IntroScreen key="intro_screen" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Sequential Content Reveal: Homepage text & navbar fade in ONLY AFTER logo has completely finished its exit animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isContentVisible ? 1 : 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="relative z-10 flex flex-col min-h-screen"
      >
        {/* Sticky Glassmorphic Navbar */}
        <Navbar
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenRegister={() => {
            setSelectedEventForReg(null);
            setIsRegisterOpen(true);
          }}
          activeSection={activeSection}
        />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* Hero Section */}
          <HeroSection
            onOpenRegister={() => {
              setSelectedEventForReg(null);
              setIsRegisterOpen(true);
            }}
          />

          {/* Interactive About Fest Section */}
          <AboutSection />

          {/* 3-Day Festival Calendar Section */}
          <ChronoCalendarSection
            onRegisterEvent={(event) => {
              setSelectedEventForReg(event);
              setIsRegisterOpen(true);
            }}
          />

          {/* Multiverse Event Nexus Section */}
          <OrbitCalendar
            onRegisterEvent={(event) => {
              setSelectedEventForReg(event);
              setIsRegisterOpen(true);
            }}
          />

          {/* PRAVAAH Highlights Photo Marquee */}
          <HighlightsSection />

          {/* Cinematic Video Section */}
          <VideoSection
            onSelectVideo={(video) => setActiveCinemaVideo(video)}
          />
        </main>

        {/* Footer */}
        <Footer
          onOpenRegister={() => {
            setSelectedEventForReg(null);
            setIsRegisterOpen(true);
          }}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Modals */}
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          registeredEvents={registeredEvents}
          onLogout={() => {
            alert('Mock Logout successful.');
            setIsProfileOpen(false);
          }}
        />

        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          selectedEvent={selectedEventForReg}
          onRegistrationComplete={handleRegistrationComplete}
        />

        <CinemaModal
          video={activeCinemaVideo}
          onClose={() => setActiveCinemaVideo(null)}
        />
      </motion.div>
    </div>
  );
}
