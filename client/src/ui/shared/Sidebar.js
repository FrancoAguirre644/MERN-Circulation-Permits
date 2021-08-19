import { Link, useLocation, withRouter } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap'
import { DataContext } from '../../store/GlobalState';

const Sidebar = () => {

  const { state } = useContext(DataContext)

  const { auth } = state

  const router = useLocation()

  const isPathActive = (r) => {
    if (r === router.pathname) {
      return "active"
    } else {
      return ""
    }
  }

  const userData = () => {
    return (
      <li className="nav-item profile">
        <div className="profile-desc">
          <div className="profile-pic">
            <div className="count-indicator">
              <img className="img-xs rounded-circle " src='/assets/images/faces/face15.jpg' alt="profile" />
              <span className="count bg-success"></span>
            </div>
            <div className="profile-name">
              <h5 className="mb-0 font-weight-normal"><Trans>{auth.user.username}</Trans></h5>
              <span><Trans>Gold Member</Trans></span>
            </div>
          </div>
          <Dropdown alignRight>
            <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
              <i className="mdi mdi-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="sidebar-dropdown preview-list">
              <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-settings text-primary"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small"><Trans>Account settings</Trans></p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-onepassword  text-info"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small"><Trans>Change Password</Trans></p>
                </div>
              </a>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </li>
    )
  }

  const adminRoute = () => {
    return (
      <>
        <li className={isPathActive('/users') ? 'nav-item menu-items active' : 'nav-item menu-items'} >
          <Link className="nav-link" to="/users">
            <span className="menu-icon"><i className="mdi mdi-account-circle"></i></span>
            <span className="menu-title"><Trans>Users</Trans></span>
          </Link>
        </li>
        <li className={isPathActive('/profiles') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/profiles">
            <span className="menu-icon"><i className="mdi mdi-account-circle"></i></span>
            <span className="menu-title"><Trans>Profiles</Trans></span>
          </Link>
        </li>
      </>
    )
  }

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <Link to="/" className="sidebar-brand brand-logo">
          <img src='/assets/images/logo.svg' alt="logo" />
        </Link>
        <a className="sidebar-brand brand-logo-mini" href="index.html"><img src='/assets/images/logo-mini.svg' alt="logo" /></a>
      </div>
      <ul className="nav">
        {Object.keys(auth).length > 0 && userData()}
        <li className="nav-item nav-category">
          <span className="nav-link"><Trans>Navigation</Trans></span>
        </li>
        <li className={isPathActive('/') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/">
            <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
            <span className="menu-title"><Trans>Dashboard</Trans></span>
          </Link>
        </li>
        { /*******************************************************************************************************/}
        {Object.keys(auth).length > 0 && adminRoute()}
        <li className={isPathActive('/permits') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/permits">
            <span className="menu-icon"><i className="mdi mdi-account-circle"></i></span>
            <span className="menu-title"><Trans>Permits</Trans></span>
          </Link>
        </li>
        <li className={isPathActive('/persons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/persons">
            <span className="menu-icon"><i className="mdi mdi-account-circle"></i></span>
            <span className="menu-title"><Trans>Persons</Trans></span>
          </Link>
        </li>
        <li className={isPathActive('/sites') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/sites">
            <span className="menu-icon"><i className="mdi mdi-account-circle"></i></span>
            <span className="menu-title"><Trans>Sites</Trans></span>
          </Link>
        </li>
        <li className={isPathActive('/vehicles') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/vehicles">
            <span className="menu-icon"><i className="mdi mdi-account-circle"></i></span>
            <span className="menu-title"><Trans>Vehicles</Trans></span>
          </Link>
        </li>
        <li className={isPathActive('/vehicles') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/vehicles">
            <span className="menu-icon"><i className="mdi mdi-account-circle"></i></span>
            <span className="menu-title"><Trans>Reports</Trans></span>
          </Link>
        </li>
        { /*******************************************************************************************************/}
      </ul>
    </nav>
  );
}

export default withRouter(Sidebar);