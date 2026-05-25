import { useState } from 'react';

export function useInboxModel() {
  const [inboxMessages, setInboxMessages] = useState([]);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [inboxError, setInboxError] = useState(null);

  const fetchInbox = async (token) => {
    if (!token) return;
    setInboxLoading(true);
    setInboxError(null);
    try {
      const res = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setInboxMessages(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        setInboxError('Failed to fetch contact submissions.');
      }
    } catch (err) {
      setInboxError('Failed to establish server connection.');
    } finally {
      setInboxLoading(false);
    }
  };

  const submitContactForm = async (contactForm) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  };

  const deleteMessage = async (id, token) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setInboxMessages(prev => prev.filter(msg => msg.id !== id));
        return { success: true };
      } else {
        return { success: false, error: 'Failed to delete customer message.' };
      }
    } catch (err) {
      return { success: false, error: 'Error deleting customer message.' };
    }
  };

  return {
    inboxMessages,
    inboxLoading,
    inboxError,
    fetchInbox,
    submitContactForm,
    deleteMessage
  };
}
