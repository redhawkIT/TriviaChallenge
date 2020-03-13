import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { Suspense } from 'react';

import * as hooks from './hooks';
import CircularProgress from './components/CircularProgress';
import Layout from './components/Layout/Layout';
import PageNotFound from './components/PageNotFound';
import Route from './components/Route';

/**
 * Route-based code-splitting, I would of used something like next.js but this project was already set up with CRA
 * A component created using React.lazy() only gets loaded when it needs to be rendered.
 * https://reactjs.org/docs/code-splitting.html
 */
const Home = React.lazy(() => import('./screens/home'));
const Quiz = React.lazy(() => import('./screens/Quiz'));
const Result = React.lazy(() => import('./screens/Result'));
// const Statistics = React.lazy(() => import('./screens/Statistics'));

function App() {
  const quiz = useSelector(state => state.quiz);
  const { fetchNewQuestions } = hooks.useTriviaAPI(quiz.options);

  return (
    <Suspense fallback={<CircularProgress />}>
      <Router>
        <Layout>
          {/* A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
         */}
          <Switch>
            <Route exact path="/TriviaChallenge" title="Home">
              <Home />
            </Route>
            <Route exact path="/TriviaChallenge/home" title="Home">
              <Home />
            </Route>
            <Route path="/TriviaChallenge/quiz" title="Quiz">
              <Quiz />
            </Route>
            <Route path="/TriviaChallenge/results" title="Results">
              <Result fetchNewQuestions={fetchNewQuestions} />
            </Route>
            {/* <Route path="/TriviaChallenge/statistics" title="Statistics">
              <Statistics />
            </Route> */}
            <Route exact path="/TriviaChallenge/404" title="Page Not Found">
              <PageNotFound />
            </Route>
            <Route path="/*" title="Page Not Found">
              <PageNotFound />
            </Route>
            <Route exact path="/" title="Home">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Suspense>
  );
}

export default App;
