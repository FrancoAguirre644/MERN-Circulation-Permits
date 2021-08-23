import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Profile from './pages/auth/Profile'

import Dashboard from './pages/Dashboard'

import Profiles from './pages/profile/Index'

import Users from './pages/user/Index'
import CreateUser from './pages/user/Create'
import EditUser from './pages/user/Edit'

import Sites from './pages/site/Index'
import CreateSide from './pages/site/Create'
import EditSide from './pages/site/Edit'

import Persons from './pages/person/Index'
import CreatePerson from './pages/person/Create'
import EditPerson from './pages/person/Edit'

import Vehicles from './pages/vehicle/Index'
import CreateVehicle from './pages/vehicle/Create'
import EditVehicle from './pages/vehicle/Edit'

import Permits from './pages/permits/Index'

import Reports from './pages/reports/Index'
import ReportFromPersons from './pages/reports/ReportFromPersons'
import ReportBetweenDates from './pages/reports/ReportBetweenDates'
import ReportBetweenDatesAndSites from './pages/reports/ReportBetweenDatesAndSites'
import ReportFromVehicles from './pages/reports/ReportFromVehicles'

import Spinner from './components/Spinner';

const AppRoutes = () => {

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>

        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/profile" component={Profile} exact />

        <Route path="/" component={Dashboard} exact />

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

        <Route path="/permits" component={Permits} exact />

        <Route path="/reports" component={Reports} exact />
        <Route path="/reports/from/persons" component={ReportFromPersons} exact />
        <Route path="/reports/from/vehicles" component={ReportFromVehicles} exact />
        <Route path="/reports/between/dates" component={ReportBetweenDates} exact />
        <Route path="/reports/between/dates/sites" component={ReportBetweenDatesAndSites} exact />

      </Switch>
    </Suspense>
  );
}

export default AppRoutes;