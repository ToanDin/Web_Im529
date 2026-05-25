import React from 'react';

// Models
import { useAuthModel } from './models/authModel';
import { useMenuModel } from './models/menuModel';
import { useContentModel } from './models/contentModel';
import { useInboxModel } from './models/inboxModel';

// Controllers
import { useAppController } from './controllers/useAppController';
import { useAdminController } from './controllers/useAdminController';

// Views
import LandingPage from './views/LandingView/LandingPage';
import AdminLogin from './views/AdminView/AdminLogin';
import AdminDashboard from './views/AdminView/AdminDashboard';

import './App.css';

function App() {
  // Initialize Models
  const authModel = useAuthModel();
  const menuModel = useMenuModel();
  const contentModel = useContentModel();
  const inboxModel = useInboxModel();

  // Initialize Controllers
  const appController = useAppController(inboxModel.submitContactForm);
  const adminController = useAdminController({
    authModel,
    menuModel,
    contentModel,
    inboxModel
  });

  // Render Pipeline
  if (adminController.isAdminMode) {
    if (!authModel.adminToken) {
      return (
        <AdminLogin
          loginUsername={adminController.loginUsername}
          setLoginUsername={adminController.setLoginUsername}
          loginPassword={adminController.loginPassword}
          setLoginPassword={adminController.setLoginPassword}
          loginError={adminController.loginError}
          loginSubmitting={adminController.loginSubmitting}
          handleAdminLogin={adminController.handleAdminLogin}
          setIsAdminMode={adminController.setIsAdminMode}
        />
      );
    }

    return (
      <AdminDashboard
        adminController={adminController}
        menu={menuModel.menu}
        editedContent={contentModel.editedContent}
        handleEditedContentChange={contentModel.updateEditedContent}
        inboxMessages={inboxModel.inboxMessages}
        inboxLoading={inboxModel.inboxLoading}
        inboxError={inboxModel.inboxError}
        contentSaving={contentModel.contentSaving}
        contentSuccess={contentModel.contentSuccess}
        resetEditedContent={contentModel.resetEditedContent}
      />
    );
  }

  return (
    <LandingPage
      pageContent={contentModel.pageContent}
      menu={menuModel.menu}
      menuLoading={menuModel.menuLoading}
      appController={appController}
    />
  );
}

export default App;
