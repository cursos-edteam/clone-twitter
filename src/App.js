import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from './apollo';
import Paths from './routes';
import Storage from "./plugins/Storage";
import AuthContext from "./context/AuthContext";
import { Container } from 'semantic-ui-react';

const Routes = () => (Paths || []).map((item, idx) => <Route key={idx} exact={item.exact} path={item.path} component={item.component} />);

const Location = ({ auth, setAuth }) => {
  const history = useHistory();
  const location = useLocation();
  const token = Storage.get('token');
  useEffect(() => {
    if (!token) {
      if (location.pathname !== '/login') history.push('/login');
    } else {
      setAuth(Storage.decode(token));
      history.push('/home');
    }
  }, [location]);
  return <Routes/>;
}

const App = () => {

  const [ auth, setAuth] = useState(null);

  const logout = ()  => {};

  const setUser = (user) => setAuth(user);

  const data = {
    auth,
    logout,
    setUser
  };

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={data}>
        <Router>
          <Container>
            <Switch>
              <Location auth={auth} setAuth={setAuth}/>
            </Switch>
          </Container>
        </Router>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
