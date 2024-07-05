import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Container/Home';
import Header from './Header/Header';
import About from './Container/About';
import Message from './Container/Message';
import FormPost from './Container/FormPost';
import SWR from './Container/SWR';

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
          <Route exact path="formPost" element={<FormPost />} />
          <Route exact path="latest" element={<SWR />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
