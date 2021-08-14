import React, { Component } from 'react';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import Notify from './shared/Notify';
import ModalCustom from './shared/Modal';

class App extends Component {
  state = {}
  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    let notifyComponent = !this.state.isFullPageLayout ? <Notify/> : '';
    let modalComponent = !this.state.isFullPageLayout ? <ModalCustom/> : '';

    //let modalComponent = !this.state.isFullPageLayout ? <Modal/> : '';
    return (
      <div className="container-scroller">
        { sidebarComponent }
        <div className="container-fluid page-body-wrapper">
          { navbarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
              { notifyComponent }
              { modalComponent }
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
    );
  }

}

export default App
