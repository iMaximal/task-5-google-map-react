/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Map from './../Map';
import Footer from './../../components/Footer';
import NotFoundPage from '../NotFoundPage';


export default function App() {
  return (
    <Auxiliary>
      <Switch>
        <Route
          exact
          path="/"
          component={Map}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Auxiliary>
  );
}
