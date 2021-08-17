import React from 'react';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './ui/shared/Navbar';
import Sidebar from './ui/shared/Sidebar';
import Footer from './ui/shared/Footer';
import Notify from './ui/shared/Notify';
import ModalCustom from './ui/shared/Modal';

function App() {
  const state = {}
  let navbarComponent = !state.isFullPageLayout ? <Navbar /> : '';
  let sidebarComponent = !state.isFullPageLayout ? <Sidebar /> : '';
  let footerComponent = !state.isFullPageLayout ? <Footer /> : '';
  let notifyComponent = !state.isFullPageLayout ? <Notify /> : '';
  let modalComponent = !state.isFullPageLayout ? <ModalCustom /> : '';

  return (
    <div className="container-scroller">
      {sidebarComponent}
      <div className="container-fluid page-body-wrapper">
        {navbarComponent}
        <div className="main-panel">
          <div className="content-wrapper">
            <AppRoutes />
            {notifyComponent}
            {modalComponent}
          </div>
          {footerComponent}
        </div>
      </div>
    </div>
  );
}

export default App
