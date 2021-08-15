import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Profiles from './components/profile/Index'

import Users from './components/user/Index'
import CreateUser from './components/user/Create'
import EditUser from './components/user/Edit'

import Sites from './components/site/Index'
import CreateSide from './components/site/Create'
import EditSide from './components/site/Edit'


import Spinner from './shared/Spinner';

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const Form = lazy(() => import('./form-elements/BasicElements'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


const AppRoutes = () => {

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>

        <Route path="/basic-ui/buttons" component={Buttons} />
        <Route path="/basic-ui/dropdowns" component={Dropdowns} />
        <Route path="/basic-ui/typography" component={Typography} />
        <Route path="/basic-ui/typography" component={Typography} />

        <Route path="/form-elements/basic-elements" component={Form} />

        <Route path="/tables/basic-table" component={BasicTable} />

        <Route path="/icons/mdi" component={Mdi} />

        <Route path="/user-pages/login-1" component={Login} exact />
        <Route path="/user-pages/register-1" component={Register1} exact />

        <Route path="/profiles" component={Profiles} />

        <Route path="/users" component={Users} exact />
        <Route path="/users/create" component={CreateUser} exact />
        <Route path="/users/:id" component={EditUser} exact />

        <Route path="/sites" component={Sites} exact />
        <Route path="/sites/create" component={CreateSide} exact />
        <Route path="/sites/:id" component={EditSide} exact />

      </Switch>
    </Suspense>
  );
}

export default AppRoutes;