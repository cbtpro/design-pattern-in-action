import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { BridgePage } from './pages/BridgePage';
import { FlyweightPage } from './pages/FlyweightPage';
import { SingletonPage } from './pages/SingletonPage';
import { PubSubPage } from './pages/PubSubPage';
import { Patterns } from './pages/Patterns';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bridge" element={<BridgePage />} />
            <Route path="/flyweight" element={<FlyweightPage />} />
            <Route path="/singleton" element={<SingletonPage />} />
            <Route path="/pubsub" element={<PubSubPage />} />
            <Route path="/patterns" element={<Patterns />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;