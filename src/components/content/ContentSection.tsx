import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ExternalLink, Youtube, Globe } from 'lucide-react';
import { sectionData } from '../../data/profileData';

interface ContentSectionProps {
  activeSection: string;
  hoveredItem: string | null;
  setHoveredItem: (id: string | null) => void;
  expandedItems: Set<string>;
  onCareerClick: (item: any, e: React.MouseEvent) => void;
  onExternalLinkClick: (url: string, e: React.MouseEvent) => void;
  isMobile?: boolean;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  activeSection,
  hoveredItem,
  setHoveredItem,
  expandedItems,
  onCareerClick,
  onExternalLinkClick,
  isMobile = false
}) => {
  const data = sectionData[activeSection as keyof typeof sectionData];
  const textSizes = isMobile ? {
    company: 'text-base sm:text-lg',
    role: 'text-xs sm:text-sm',
    period: 'text-xs sm:text-sm',
    description: 'text-xs sm:text-sm',
    icon: 'w-5 h-5',
    externalIcon: 'w-4 h-4'
  } : {
    company: 'text-2xl',
    role: 'text-xl',
    period: 'text-lg',
    description: 'text-lg',
    icon: 'w-6 h-6',
    externalIcon: 'w-6 h-6'
  };

  // Container height: Reading gets h-96 on desktop, everything else gets h-80
  const containerHeight = activeSection === 'Reading' && !isMobile ? 'h-96' : 'h-80';

  // Apple-style animation variants
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // Apple's signature easing
        staggerChildren: activeSection === 'Reading' ? 0.03 : 0.08,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 15,
      x: -10,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const readingItemVariants: Variants = {
    hidden: { 
      opacity: 0,
      x: -20,
      scale: 0.96
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const hoverVariants: Variants = {
    hover: {
      scale: 1.02,
      x: isMobile ? 2 : 5,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className={`${containerHeight} relative`}
        key={activeSection}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          className={`${activeSection === 'Reading' && !isMobile ? 'overflow-y-auto [&::-webkit-scrollbar]:hidden' : 'overflow-visible'} h-full relative`}
          style={activeSection === 'Reading' && !isMobile ? {
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } : {}}
        >
          <motion.div 
            className="space-y-0 pb-4"
            variants={{
              visible: {
                transition: {
                  staggerChildren: activeSection === 'Reading' ? 0.03 : 0.08
                }
              }
            }}
          >
            {activeSection === 'Reading' ? (
              data.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={readingItemVariants}
                  whileHover="hover"
                  className={`group flex items-center justify-between ${isMobile ? 'py-3' : 'py-5'} border-b border-gray-800/50 cursor-pointer transition-all duration-200 ${
                    hoveredItem === item.id ? 'bg-purple-900/10' : ''
                  } ${item.url !== '#' ? 'hover:bg-purple-900/10' : ''}`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => onExternalLinkClick(item.url, { stopPropagation: () => {} } as React.MouseEvent)}
                >
                  <motion.div 
                    className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0"
                    variants={hoverVariants}
                  >
                    <div className="min-w-0 flex-1">
                      <motion.div 
                        className={`text-white font-medium ${textSizes.company} mb-1 truncate`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.03 + 0.1 }}
                      >
                        {item.company}
                      </motion.div>
                      {item.role && (
                        <motion.div 
                          className={`text-gray-400 ${textSizes.role}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.03 + 0.15 }}
                        >
                          {item.role}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-2 flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 + 0.2 }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        x: 3,
                        y: -3,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <ExternalLink className={`${textSizes.externalIcon} text-gray-500 transition-all duration-200 ${
                        hoveredItem === item.id ? 'text-gray-300' : ''
                      }`} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              data.map((item, index) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className={`group border-b border-gray-800/50 transition-all duration-200 ${isMobile ? 'py-3 px-2' : 'py-6'} ${
                    hoveredItem === item.id ? 'bg-purple-900/10' : ''
                  } ${item.url !== '#' || (activeSection === 'About' && item.description) ? 'hover:bg-purple-900/10' : ''} ${
                    activeSection === 'About' && item.description ? 'cursor-pointer' : ''
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={(e) => onCareerClick(item, e)}
                >
                  <motion.div 
                    className="flex items-center justify-between"
                    variants={hoverVariants}
                  >
                    <div className={`flex items-center ${isMobile ? 'gap-3 w-3/4' : 'gap-8 w-4/5'} min-w-0`}>
                      <div className="min-w-0">
                        <motion.div 
                          className={`flex items-center ${isMobile ? 'gap-2 flex-wrap' : 'gap-6'}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
                        >
                          <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
                            {item.icon && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 + 0.15 }}
                              >
                                <item.icon className={`${textSizes.icon} text-gray-400`} />
                              </motion.div>
                            )}
                            <motion.span 
                              className={`text-white font-medium ${textSizes.company} ${isMobile ? 'truncate' : ''}`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
                            >
                              {item.company}
                            </motion.span>
                            {item.id === 'ugc' && (
                              <motion.a 
                                href="https://ugc.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-sky-400 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.08 + 0.25 }}
                                whileHover={{ scale: 1.2, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Globe className={textSizes.icon} />
                              </motion.a>
                            )}
                            {item.id === 'techsmartt' && (
                              <motion.a 
                                href="https://youtube.com/tech"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-red-400 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.08 + 0.25 }}
                                whileHover={{ scale: 1.2, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Youtube className={textSizes.icon} />
                              </motion.a>
                            )}
                          </div>
                          {item.isExited && (
                            <motion.span 
                              className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs font-medium rounded"
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
                            >
                              Exited
                            </motion.span>
                          )}
                          {item.role === 'Acquired' && (
                            <motion.span 
                              className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded"
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
                            >
                              Acquired
                            </motion.span>
                          )}
                        </motion.div>
                        <motion.div 
                          className={`flex items-center gap-2 sm:gap-4 ${isMobile ? 'mt-1' : 'mt-2'} flex-wrap`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.08 + 0.25 }}
                        >
                          <span className={`text-gray-300 ${textSizes.role}`}>{item.role}</span>
                          {item.type && <span className={`text-gray-500 ${isMobile ? 'text-xs sm:text-sm' : 'text-lg'}`}>{item.type}</span>}
                        </motion.div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="flex items-center gap-2 sm:gap-4 w-1/4 flex-shrink-0"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
                    >
                      <span className={`text-gray-500 font-medium text-left ${textSizes.period}`}>
                        {item.period}
                      </span>
                    </motion.div>
                  </motion.div>
                  
                  {/* Description with smooth expand animation */}
                  {activeSection === 'About' && item.description && (
                    <AnimatePresence>
                      {(expandedItems.has(item.id) || hoveredItem === item.id) && (
                        <motion.div 
                          className={`${isMobile ? 'mt-3' : 'mt-6'} overflow-hidden`}
                          initial={{ height: 0, opacity: 0, y: -10 }}
                          animate={{ 
                            height: 'auto',
                            opacity: expandedItems.has(item.id) ? 1 : 0.6,
                            y: 0
                          }}
                          exit={{ height: 0, opacity: 0, y: -10 }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            opacity: { duration: 0.2 }
                          }}
                        >
                          <motion.div 
                            className={`text-gray-400 ${textSizes.description} leading-relaxed`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <div className={`${
                              expandedItems.has(item.id) 
                                ? '' 
                                : hoveredItem === item.id 
                                  ? 'line-clamp-3 relative after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-20 after:h-6 after:bg-gradient-to-l after:from-black after:to-transparent' 
                                  : ''
                            }`}>
                              {item.description}
                              {!expandedItems.has(item.id) && hoveredItem === item.id && (
                                <motion.div 
                                  className={`text-gray-500 ${isMobile ? 'text-xs mt-2' : 'text-sm mt-3'} italic`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                  Click to expand
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                  
                  {/* Hover text for Interests and Fun sections */}
                  {(activeSection === 'Interests' || activeSection === 'Fun') && item.hoverText && hoveredItem === item.id && (
                    <AnimatePresence>
                      <motion.div 
                        className={`${isMobile ? 'mt-3' : 'mt-4'} overflow-hidden`}
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ 
                          height: 'auto',
                          opacity: 0.8,
                          y: 0
                        }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ 
                          duration: 0.3, 
                          ease: [0.25, 0.46, 0.45, 0.94],
                          opacity: { duration: 0.2 }
                        }}
                      >
                        <motion.div 
                          className={`text-gray-400 ${textSizes.description} leading-relaxed`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {item.hoverText}
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
        
        {/* Fade overlay for Reading section */}
        {activeSection === 'Reading' && !isMobile && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};