import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Container/Home';
import Header from './Header/Header';
import About from './Container/About';
import Message from './Container/Message';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route exact path="about" element={<About />} />
          <Route exact path="messages" element={<Message />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
