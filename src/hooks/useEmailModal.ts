import { useState } from 'react';
import { submitContactForm, type ContactSubmission } from '../lib/supabase';

export const useEmailModal = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [captcha, setCaptcha] = useState({ question: '', answer: 0, userAnswer: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateCaptcha = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer, question;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * 50) + 10;
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 30;
        num2 = Math.floor(Math.random() * 20) + 5;
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 12) + 2;
        num2 = Math.floor(Math.random() * 12) + 2;
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
      default:
        num1 = 5;
        num2 = 3;
        answer = 8;
        question = '5 + 3';
    }
    
    setCaptcha({ question, answer, userAnswer: '' });
  };

  const handleJamClick = () => {
    generateCaptcha();
    setIsSuccess(false);
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    // Validate captcha
    if (parseInt(captcha.userAnswer) !== captcha.answer) {
      setError('Please solve the math problem correctly to verify you\'re human.');
      generateCaptcha(); // Generate new captcha on failure
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Prepare submission data
      const submissionData: Omit<ContactSubmission, 'id' | 'created_at'> = {
        name: emailForm.name.trim(),
        email: emailForm.email.trim(),
        message: emailForm.message.trim(),
        user_agent: navigator.userAgent
      };

      // Submit using helper function
      await submitContactForm(submissionData);

      // Show success state
      setIsSuccess(true);
      
      // Auto close after 3 seconds and reset form
      setTimeout(() => {
        setShowEmailModal(false);
        setIsSuccess(false);
        setEmailForm({ name: '', email: '', message: '' });
        setCaptcha({ question: '', answer: 0, userAnswer: '' });
        setError('');
        setIsSubmitting(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('Failed to send message. Please try again or contact directly via email.');
      setIsSubmitting(false);
    }
  };

  const handleEmailFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(''); // Clear error when user starts typing
    setCaptcha(prev => ({
      ...prev,
      userAnswer: e.target.value
    }));
  };

  return {
    showEmailModal,
    setShowEmailModal,
    isSuccess,
    isSubmitting,
    error,
    setError,
    emailForm,
    captcha,
    handleJamClick,
    handleEmailSubmit,
    handleEmailFormChange,
    handleCaptchaChange,
    generateCaptcha
  };
};