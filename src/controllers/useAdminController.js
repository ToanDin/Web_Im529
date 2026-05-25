import { useState, useEffect } from 'react';

export function useAdminController({ authModel, menuModel, contentModel, inboxModel }) {
  const [adminActiveTab, setAdminActiveTab] = useState('page'); // 'page', 'menu', 'inbox'

  // Admin Login Form States
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Admin Menu Editor States
  const [isMenuFormOpen, setIsMenuFormOpen] = useState(false);
  const [menuForm, setMenuForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    tag: '',
    image: '',
    category: 'signatures'
  });
  const [menuFormSubmitting, setMenuFormSubmitting] = useState(false);
  const [menuFormError, setMenuFormError] = useState(null);
  const [imageUploadingField, setImageUploadingField] = useState(null); // 'heroBg', 'aboutImage', 'menuImage'

  // Admin routing state
  const [isAdminMode, setIsAdminMode] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminMode(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch messages if Inbox is selected
  useEffect(() => {
    if (authModel.adminToken && adminActiveTab === 'inbox') {
      inboxModel.fetchInbox(authModel.adminToken);
    }
  }, [authModel.adminToken, adminActiveTab]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSubmitting(true);

    const result = await authModel.login(loginUsername, loginPassword);
    setLoginSubmitting(false);

    if (result.success) {
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError(result.error);
    }
  };

  const handleAdminLogout = () => {
    authModel.logout();
  };

  const handleImageUpload = async (e, fieldKey, onUploadSuccess) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image file size exceeds the 10MB limit.");
      return;
    }

    setImageUploadingField(fieldKey);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`/api/admin/upload?type=${fieldKey}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authModel.adminToken}`
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onUploadSuccess(data.fileUrl);
      } else {
        alert(data.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error connecting to image upload endpoint.');
    } finally {
      setImageUploadingField(null);
    }
  };

  const openMenuAdd = (activeCategory) => {
    setMenuForm({
      id: '',
      name: '',
      description: '',
      price: '',
      tag: '',
      image: '',
      category: activeCategory || 'signatures'
    });
    setMenuFormError(null);
    setIsMenuFormOpen(true);
  };

  const openMenuEdit = (item, category) => {
    setMenuForm({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      tag: item.tag || '',
      image: item.image || '',
      category: category
    });
    setMenuFormError(null);
    setIsMenuFormOpen(true);
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setMenuFormSubmitting(true);
    setMenuFormError(null);

    if (!menuForm.name || !menuForm.price) {
      setMenuFormError('Name and Price are required.');
      setMenuFormSubmitting(false);
      return;
    }

    if (isNaN(parseFloat(menuForm.price))) {
      setMenuFormError('Price must be a valid numeric value.');
      setMenuFormSubmitting(false);
      return;
    }

    const result = await menuModel.saveMenuItem(menuForm, authModel.adminToken);
    setMenuFormSubmitting(false);

    if (result.success) {
      setIsMenuFormOpen(false);
    } else {
      setMenuFormError(result.error);
    }
  };

  const handleDeleteMenu = async (category, id) => {
    if (!confirm('Are you sure you want to delete this cocktail from the menu database?')) return;
    const result = await menuModel.deleteMenuItem(category, id, authModel.adminToken);
    if (!result.success) {
      alert(result.error);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Archive and permanently delete this customer message?')) return;
    const result = await inboxModel.deleteMessage(id, authModel.adminToken);
    if (!result.success) {
      alert(result.error);
    }
  };

  const handleContentSave = async (e) => {
    e.preventDefault();
    const result = await contentModel.saveContent(authModel.adminToken);
    if (!result.success) {
      alert(result.error);
    }
  };

  return {
    adminActiveTab,
    setAdminActiveTab,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    loginError,
    loginSubmitting,
    isMenuFormOpen,
    setIsMenuFormOpen,
    menuForm,
    setMenuForm,
    menuFormSubmitting,
    menuFormError,
    imageUploadingField,
    isAdminMode,
    setIsAdminMode,
    handleAdminLogin,
    handleAdminLogout,
    handleImageUpload,
    openMenuAdd,
    openMenuEdit,
    handleMenuSubmit,
    handleDeleteMenu,
    handleDeleteMessage,
    handleContentSave
  };
}
