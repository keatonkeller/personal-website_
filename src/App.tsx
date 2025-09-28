import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sections } from './data/profileData';
import { ProfileHeader } from './components/profile/ProfileHeader';
import { ContentSection } from './components/content/ContentSection';
import { EmailModal } from './components/modals/EmailModal';
import { useEmailModal } from './hooks/useEmailModal';

function App() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('About');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const {
    showEmailModal,
    setShowEmailModal,
    isSuccess,
    isSubmitting,
    emailForm,
    error,
    captcha,
    handleJamClick,
    handleEmailSubmit,
    handleEmailFormChange,
    handleCaptchaChange,
    generateCaptcha
  } = useEmailModal();

  const handleSocialClick = (platform: string) => {
    const urls = {
      email: 'mailto:contact@keatonkeller.com',
      twitter: 'https://x.com/keaton',
      youtube: 'https://youtube.com/keaton',
      instagram: 'https://instagram.com/keaton',
      linkedin: 'https://linkedin.com/in/keatonkeller/'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  const handleCareerClick = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeSection === 'About' && item.description) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(item.id)) {
          newSet.delete(item.id);
        } else {
          newSet.add(item.id);
        }
        return newSet;
      });
    }
  };

  const handleExternalLinkClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className="h-screen lg:overflow-hidden bg-black text-white font-light relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Royal Purple Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-8 h-full flex flex-col"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {/* Mobile Layout */}
        <motion.div
          className="lg:hidden space-y-4 overflow-y-auto flex-1 pb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <ProfileHeader isMobile onSocialClick={handleSocialClick} />

          {/* Bio */}
          <motion.div
            className="text-center space-y-3 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          >
            <div className="text-gray-300 leading-relaxed text-sm sm:text-base space-y-3">
              <p>
                I like discovering and building things that push culture and
                technology forward. Since 2007, I've been an early content
                creator and investor, spending my time building digital
                products, backing frontier startups, and advising founders on
                scaling what matters.
              </p>
              <p>
                I'm drawn to creative technologies with the potential for
                existential impact, and I geek out on the bleeding edge — whether
                that's in markets, media, or entirely new ideas. You'll usually
                find me online experimenting, out in nature recharging, or
                heads-down creating something new.
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="space-y-3 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="grid grid-cols-4 gap-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
            >
              {sections.map((section, index) => (
                <motion.button
                  key={section}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.2 + index * 0.1,
                    ease: 'easeOut'
                  }}
                  onClick={() => setActiveSection(section)}
                  className={`font-light text-sm sm:text-base py-2 px-1 rounded-lg transition-all duration-200 ${
                    activeSection === section
                      ? 'text-white bg-teal-500/20 border border-teal-400/30'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                  }`}
                >
                  {section}
                </motion.button>
              ))}
            </motion.div>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent mx-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
            />

            <motion.div
              className="space-y-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
            >
              <ContentSection
                activeSection={activeSection}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
                expandedItems={expandedItems}
                onCareerClick={handleCareerClick}
                onExternalLinkClick={handleExternalLinkClick}
                isMobile
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Desktop Layout */}
        <motion.div
          className="hidden lg:flex justify-center items-center h-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            className="grid grid-cols-[60%_40%] gap-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          >
            {/* Left Column - Profile & Status */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
            >
              <ProfileHeader onSocialClick={handleSocialClick} />
            </motion.div>

            {/* Right Column - Work Experience */}
            <motion.div
              className="flex flex-col justify-start"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
            >
              {/* Horizontal Navigation */}
              <motion.div
                className="mb-10 overflow-x-auto pr-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
              >
                <motion.div
                  className="flex justify-between items-center min-w-max pb-4 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3, ease: 'easeOut' }}
                >
                  {sections.map((section, index) => (
                    <motion.button
                      key={section}
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 1.5 + index * 0.1,
                        ease: 'easeOut'
                      }}
                      onClick={() => setActiveSection(section)}
                      className={`text-3xl font-light whitespace-nowrap transition-colors duration-200 flex-shrink-0 ${
                        activeSection === section
                          ? 'text-white'
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {section}
                    </motion.button>
                  ))}
                </motion.div>
                <motion.div
                  className="h-px bg-gradient-to-r from-sky-400/30 via-sky-400/30 to-sky-400/30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.9, ease: 'easeOut' }}
                />
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.1, ease: 'easeOut' }}
              >
                <ContentSection
                  activeSection={activeSection}
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  expandedItems={expandedItems}
                  onCareerClick={handleCareerClick}
                  onExternalLinkClick={handleExternalLinkClick}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Email Modal */}
        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          isSuccess={isSuccess}
          isSubmitting={isSubmitting}
          error={error}
          emailForm={emailForm}
          onFormChange={handleEmailFormChange}
          captcha={captcha}
          onCaptchaChange={handleCaptchaChange}
          onSubmit={handleEmailSubmit}
          onGenerateCaptcha={generateCaptcha}
        />
      </motion.div>

      {/* Centered CTA Button - MOVED OUTSIDE for full viewport centering */}
      <motion.div
        className={`absolute bottom-6 lg:bottom-16 inset-x-0 flex justify-center z-20 ${showEmailModal ? 'hidden' : ''}`}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 2.5, ease: 'easeOut' }}
      >
        <motion.button
          onClick={handleJamClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 bg-teal-500/20 backdrop-blur-sm text-teal-400 text-lg sm:text-xl lg:text-2xl font-medium rounded-full border border-teal-400/30 hover:bg-teal-500/30 hover:border-teal-400/50 transition-all duration-200 shadow-lg hover:shadow-teal-400/20 whitespace-nowrap"
        >
          Let's Connect
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default App;