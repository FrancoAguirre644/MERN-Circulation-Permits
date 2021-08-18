import React, { Component } from 'react';
import './App.scss';
import AppRoutes from './AppRoutes';
import { withRouter } from 'react-router-dom';
import Navbar from './ui/shared/Navbar';
import Sidebar from './ui/shared/Sidebar';
import Footer from './ui/shared/Footer';
import Notify from './ui/shared/Notify';
import ModalCustom from './ui/shared/Modal';


class App extends Component {
  state = {}
  componentDidMount() {
    this.onRouteChanged();
  }
  render() {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar /> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : '';
    let notifyComponent = !this.state.isFullPageLayout ? <Notify /> : '';
    let modalComponent = !this.state.isFullPageLayout ? <ModalCustom /> : '';

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

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/login', '/register'];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

}

export default (withRouter(App));
