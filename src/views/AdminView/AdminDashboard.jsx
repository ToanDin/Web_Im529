import React from 'react';
import AdminSidebar from './AdminSidebar';
import ManageContent from './ManageContent';
import ManageMenu from './ManageMenu';
import ManageInbox from './ManageInbox';
import MenuFormModal from './MenuFormModal';

export default function AdminDashboard({
  adminController,
  menu,
  editedContent,
  handleEditedContentChange,
  inboxMessages,
  inboxLoading,
  inboxError,
  contentSaving,
  contentSuccess,
  resetEditedContent
}) {
  return (
    <div className="min-h-screen bg-brand-dark text-gray-200 font-sans flex flex-col lg:flex-row relative">
      {/* Sidebar Navigation */}
      <AdminSidebar
        adminActiveTab={adminController.adminActiveTab}
        setAdminActiveTab={adminController.setAdminActiveTab}
        inboxMessagesCount={inboxMessages.length}
        handleAdminLogout={adminController.handleAdminLogout}
        setIsAdminMode={adminController.setIsAdminMode}
      />

      {/* Main Workspace */}
      <main className="flex-grow p-6 lg:p-10 overflow-y-auto max-h-screen">
        {/* Tab Content copy */}
        {adminController.adminActiveTab === 'page' && (
          <ManageContent
            editedContent={editedContent}
            handleEditedContentChange={handleEditedContentChange}
            handleImageUpload={adminController.handleImageUpload}
            imageUploadingField={adminController.imageUploadingField}
            contentSaving={contentSaving}
            contentSuccess={contentSuccess}
            handleContentSave={adminController.handleContentSave}
            resetEditedContent={resetEditedContent}
          />
        )}

        {/* Tab Content menu */}
        {adminController.adminActiveTab === 'menu' && (
          <ManageMenu
            menu={menu}
            openMenuAdd={adminController.openMenuAdd}
            openMenuEdit={adminController.openMenuEdit}
            handleDeleteMenu={adminController.handleDeleteMenu}
          />
        )}

        {/* Tab Content inbox */}
        {adminController.adminActiveTab === 'inbox' && (
          <ManageInbox
            inboxMessages={inboxMessages}
            inboxLoading={inboxLoading}
            inboxError={inboxError}
            handleDeleteMessage={adminController.handleDeleteMessage}
          />
        )}
      </main>

      {/* Menu Editor Form Overlay Modal */}
      <MenuFormModal
        isMenuFormOpen={adminController.isMenuFormOpen}
        setIsMenuFormOpen={adminController.setIsMenuFormOpen}
        menuForm={adminController.menuForm}
        setMenuForm={adminController.setMenuForm}
        menuFormSubmitting={adminController.menuFormSubmitting}
        menuFormError={adminController.menuFormError}
        handleMenuSubmit={adminController.handleMenuSubmit}
        handleImageUpload={adminController.handleImageUpload}
        imageUploadingField={adminController.imageUploadingField}
      />
    </div>
  );
}
