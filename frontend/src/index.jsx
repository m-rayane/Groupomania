import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
// import { hasAuthenticated } from './api/Services/AuthServices';

import './index.scss';

import Header from './components/Header/header';
import Login from './components/Auth/login';
import CreatePost from './components/Post/createPost';
import Logout from './components/Auth/logout';
import PostOffice from './pages/postOffice';
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
                              <Route path="/logOut" element={<Logout />} />
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