import { useState, useEffect } from 'react';

export function useAppController(submitContactForm) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState(null); // 'submitting', 'success', 'error'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('submitting');

    const result = await submitContactForm(contactForm);
    if (result && result.success) {
      setContactStatus('success');
      setContactForm({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      setTimeout(() => setContactStatus(null), 5000);
    } else {
      setContactStatus('error');
    }
  };

  const fillContactInquiry = (productName, productPrice) => {
    setContactForm({
      name: contactForm.name,
      email: contactForm.email,
      subject: `Inquiry: ${productName}`,
      message: `Hi Im 529, I'd like to inquire about the availability of the ${productName} ($${productPrice}) for my upcoming visit.`
    });
  };

  return {
    mobileMenuOpen,
    setMobileMenuOpen,
    scrolled,
    selectedProduct,
    setSelectedProduct,
    contactForm,
    contactStatus,
    handleContactChange,
    handleContactSubmit,
    fillContactInquiry
  };
}
