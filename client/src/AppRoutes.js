import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Profiles from './components/profile/Index'

import Users from './components/user/Index'
import CreateUser from './components/user/Create'
import EditUser from './components/user/Edit'

import Sites from './components/site/Index'
import CreateSide from './components/site/Create'
import EditSide from './components/site/Edit'

import Persons from './components/person/Index'
import CreatePerson from './components/person/Create'
import EditPerson from './components/person/Edit'

import Vehicles from './components/vehicle/Index'
import CreateVehicle from './components/vehicle/Create'
import EditVehicle from './components/vehicle/Edit'

import Spinner from './ui/shared/Spinner';

const Buttons = lazy(() => import('./ui/basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./ui/basic-ui/Dropdowns'));
const Typography = lazy(() => import('./ui/basic-ui/Typography'));

const BasicTable = lazy(() => import('./ui/tables/BasicTable'));

const Mdi = lazy(() => import('./ui/icons/Mdi'));

const Form = lazy(() => import('./ui/form-elements/BasicElements'));

const Login = lazy(() => import('./ui/user-pages/Login'));
const Register1 = lazy(() => import('./ui/user-pages/Register'));


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

        <Route path="/persons" component={Persons} exact />
        <Route path="/persons/create" component={CreatePerson} exact />
        <Route path="/persons/:id" component={EditPerson} exact />

        <Route path="/vehicles" component={Vehicles} exact />
        <Route path="/vehicles/create" component={CreateVehicle} exact />
        <Route path="/vehicles/:id" component={EditVehicle} exact />

      </Switch>
    </Suspense>
  );
}

export default AppRoutes;