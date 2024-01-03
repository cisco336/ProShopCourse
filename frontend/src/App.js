import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from "./screens/RegistrationScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
      <Router>
          <Header />
          <main className="py-3">
              <Container>
                  <Routes>
                      <Route path="/" Component={HomeScreen} exact />
                      <Route path="/product/:id" Component={ProductScreen} />
                      <Route path="/cart/:id?" Component={CartScreen} />
                      <Route path="/login" Component={LoginScreen} />
                      <Route path="/register" Component={RegistrationScreen} />
                      <Route path="/profile" Component={ProfileScreen} />
                  </Routes>
              </Container>
          </main>
          <Footer />
      </Router>
  );
}

export default App;
