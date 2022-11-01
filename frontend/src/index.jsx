import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
// import { hasAuthenticated } from './api/Services/AuthServices';

import './index.scss';

import Header from './components/Header/header';
import Login from './pages/login';
import CreatePost from './pages/createPost';
import PostOffice from './pages/postOffice';
import Profile from './pages/profile';
import PageNotFound from './pages/pageNotFound';
// import Auth from './utils/contexts/Auth';
import { PostProvider } from './utils/contexts/postContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
    return (
        
          <React.StrictMode>
            
              <div className="container">
                    <PostProvider>
                      <Router>
                        <div className="header">
                          <Header />
                        </div>
                        <div className="main">
                          <Routes>
                              <Route exact path="/" element={<PostOffice />} />
                              <Route path="/login" element={<Login />} />
                              <Route path="/createPost" element={<CreatePost />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="*" element={<PageNotFound />}></Route>
                          </Routes>
                        </div>
                      </Router>
                    </PostProvider>
              </div>
            
          </React.StrictMode>
        
    );
}

root.render(
    <App />
)


export default App;