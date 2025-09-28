import React, { useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean;
  isSubmitting?: boolean;
  error: string;
  emailForm: {
    name: string;
    email: string;
    message: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  captcha: {
    question: string;
    answer: number;
    userAnswer: string;
  };
  onCaptchaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGenerateCaptcha: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  isSuccess,
  isSubmitting = false,
  error,
  emailForm,
  onFormChange,
  captcha,
  onCaptchaChange,
  onSubmit,
  onGenerateCaptcha
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen || !captcha.question) return;
    
    if (canvasRef.current && captcha.question) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set canvas background to match the input styling
      ctx.fillStyle = 'rgba(17, 24, 39, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some noise/distortion to make it harder for bots
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }
      
      // Draw the math problem
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add slight rotation and positioning variation to make it harder to parse
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((Math.random() - 0.5) * 0.1); // Small random rotation
      ctx.fillText(`${captcha.question} = ?`, 0, 0);
      ctx.restore();
      
      // Add some random dots as noise
      ctx.fillStyle = 'rgba(147, 51, 234, 0.3)';
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width, 
          Math.random() * canvas.height, 
          Math.random() * 2 + 1, 
          0, 
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }, [captcha.question, isOpen]);
  
  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-black border border-gray-800 rounded-2xl p-8 max-w-md w-full relative overflow-hidden">
          {/* Purple Grid Background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          
          <div className="text-center space-y-6 relative z-10">
            {/* Animated Checkmark */}
            <div className="relative mx-auto w-20 h-20">
              <div className="w-20 h-20 rounded-full border-2 border-teal-400/30 bg-teal-400/10 flex items-center justify-center animate-pulse">
                <svg 
                  className="w-10 h-10 text-teal-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{
                    strokeDasharray: 50,
                    strokeDashoffset: 50,
                    animation: 'drawCheck 0.8s ease-in-out forwards'
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Animated ring */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-teal-400/50"
                style={{
                  animation: 'ringPulse 0.6s ease-out forwards'
                }}
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-light text-white mb-2">Message Sent!</h3>
              <p className="text-gray-300">Thanks for reaching out. Your message has been saved and I'll get back to you soon.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-black border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full relative overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Purple Grid Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="mb-6 relative z-10">
          <h3 className="text-xl sm:text-2xl font-light text-white mb-2">Let's Connect</h3>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4 relative z-10">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={emailForm.name}
              onChange={onFormChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all backdrop-blur-sm text-sm sm:text-base"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={emailForm.email}
              onChange={onFormChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all backdrop-blur-sm text-sm sm:text-base"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={emailForm.message}
              onChange={onFormChange}
              required
              rows={4}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all resize-none backdrop-blur-sm text-sm sm:text-base"
            />
          </div>
          
          <div>
            <label htmlFor="captcha" className="block text-sm font-medium text-gray-300 mb-2">
              Security Check - Solve this math problem:
            </label>
            <div className="flex items-center gap-2 sm:gap-4 mb-2 flex-wrap sm:flex-nowrap">
              <canvas
                ref={canvasRef}
                width={120}
                height={50}
                className="border border-gray-700 rounded-lg backdrop-blur-sm flex-shrink-0"
                style={{ imageRendering: 'crisp-edges' }}
              />
              <input
                type="number"
                id="captcha"
                value={captcha.userAnswer}
                onChange={onCaptchaChange}
                required
                className="w-20 sm:w-24 px-2 py-2 sm:px-4 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-center backdrop-blur-sm text-sm sm:text-base"
                placeholder="?"
              />
              <button
                type="button"
                onClick={onGenerateCaptcha}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Regenerate
              </button>
            </div>
            
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg border transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
              isSubmitting 
                ? 'bg-gray-500/20 text-gray-400 border-gray-500/30 cursor-not-allowed' 
                : 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border-teal-400/30 hover:border-teal-400/50'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};