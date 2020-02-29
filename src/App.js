import { Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import React, { Suspense } from 'react';

import CircularProgress from './components/CircularProgress';
import PageNotFound from './components/PageNotFound';
import Route from './components/Route';

/**
 * Route-based code-splitting
 * A component created using React.lazy() only gets loaded when it needs to be rendered.
 * https://reactjs.org/docs/code-splitting.html
 */
const Home = React.lazy(() => import('./screens/Home'));
const Quiz = React.lazy(() => import('./screens/Quiz'));
const Result = React.lazy(() => import('./screens/Result'));

export default function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Router>
        <Container maxWidth="sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quiz">quiz</Link>
            </li>
            <li>
              <Link to="/result">result</Link>
            </li>
          </ul>

          <hr />

          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/" title="Home">
              <Home />
            </Route>
            <Route path="/quiz" title="Quiz">
              <Quiz />
            </Route>
            <Route path="/result" title="Result">
              <Result />
            </Route>
            <Route exact path="/404" title="Page Not Found">
              <PageNotFound />
            </Route>
            <Route path="/*" title="Page Not Found">
              <PageNotFound />
            </Route>
            <Route />
          </Switch>
        </Container>
      </Router>
    </Suspense>
  );
}
