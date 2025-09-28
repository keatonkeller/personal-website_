import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Linkedin, Youtube } from 'lucide-react';
import { InstagramLogo, XLogo } from '../icons/SocialLogos';
import { statusItems } from '../../data/profileData';

interface ProfileHeaderProps {
  isMobile?: boolean;
  onSocialClick: (platform: string) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  isMobile = false, 
  onSocialClick 
}) => {
  if (isMobile) {
    return (
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        {/* Profile Avatar */}
        <motion.div 
          className="flex justify-center pt-2"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        >
          <motion.div 
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <img 
              src="/keaton.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
        
        {/* Name directly under picture */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl font-light text-white">
            Keaton Keller
          </h2>
        </motion.div>
        
        {/* Status Items */}
        <motion.div 
          className="space-y-3 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
        >
          {statusItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="flex items-center justify-center gap-2 font-mono text-xs sm:text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1, ease: "easeOut" }}
            >
              <item.icon className="w-4 h-4 text-gray-500" />
              <span className={item.color}>{item.text}</span>
            </motion.div>
          ))}
          
          <motion.div 
            className="flex flex-col items-center gap-3 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          >
            <motion.div 
              className="flex items-center gap-3 text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7, ease: "easeOut" }}
            >
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">CHI</span>
              <span className="text-gray-400">DXB</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.9, ease: "easeOut" }}
            >
              {[
                { key: 'email', onClick: () => onSocialClick('email'), icon: Mail },
                { key: 'twitter', onClick: () => onSocialClick('twitter'), icon: XLogo },
                { key: 'youtube', onClick: () => onSocialClick('youtube'), icon: Youtube },
                { key: 'instagram', onClick: () => onSocialClick('instagram'), icon: InstagramLogo },
                { key: 'linkedin', onClick: () => onSocialClick('linkedin'), icon: Linkedin }
              ].map((social, index) => (
                <motion.button
                  key={social.key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 2.1 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={social.onClick}
                  className="hover:text-sky-400 transition-colors"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="flex flex-col justify-start"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
    >
      {/* Profile Section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
      >
        <div className="flex items-start gap-8 mb-6">
          <motion.div 
            className="w-52 h-52 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-800"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotate: 1 }}
          >
            <img 
              src="/keaton.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="flex-1">
            <motion.h2 
              className="text-5xl font-light mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
            >
              Keaton Keller
            </motion.h2>
            
            {/* Status Items */}
            <motion.div 
              className="space-y-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
            >
              {statusItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-4 font-mono text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.7 + index * 0.1, ease: "easeOut" }}
                >
                  <item.icon className="w-6 h-6 text-gray-500" />
                  <span className={item.color}>{item.text}</span>
                </motion.div>
              ))}
              <motion.div 
                className="flex items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.9, ease: "easeOut" }}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.1, ease: "easeOut" }}
                >
                  <MapPin className="w-6 h-6 text-gray-500" />
                  <span className="text-white font-medium text-xl">CHI</span>
                  <span className="text-gray-400">DXB</span>
                </motion.div>
                
                {/* Vertical separator */}
                <motion.div 
                  className="h-6 w-px bg-gradient-to-b from-teal-400/30 via-teal-400/30 to-teal-400/30"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 2.3, ease: "easeOut" }}
                />
                
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 2.5, ease: "easeOut" }}
                >
                  {[
                    { key: 'email', onClick: () => onSocialClick('email'), icon: Mail },
                    { key: 'twitter', onClick: () => onSocialClick('twitter'), icon: XLogo },
                    { key: 'youtube', onClick: () => onSocialClick('youtube'), icon: Youtube },
                    { key: 'instagram', onClick: () => onSocialClick('instagram'), icon: InstagramLogo },
                    { key: 'linkedin', onClick: () => onSocialClick('linkedin'), icon: Linkedin }
                  ].map((social, index) => (
                    <motion.button
                      key={social.key}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 2.7 + index * 0.1, ease: "easeOut" }}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={social.onClick}
                      className="hover:text-sky-400 transition-colors"
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.1, ease: "easeOut" }}
      >
        <div className="text-gray-300 leading-relaxed text-2xl space-y-8">
          <motion.p 
            className="text-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.3, ease: "easeOut" }}
          >
            I like discovering and building things that push culture and technology forward. Since 2007, I've been an early content creator and investor, spending my time building digital products, backing frontier startups, and advising founders on scaling what matters.
          </motion.p>
          <motion.p 
            className="text-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
          >
            I'm drawn to creative technologies with the potential for existential impact, and I geek out on the bleeding edge — whether that's in markets, media, or entirely new ideas. You'll usually find me online experimenting, out in nature recharging, or heads-down creating something new.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};