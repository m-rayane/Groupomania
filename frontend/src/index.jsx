import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
// import { hasAuthenticated } from './api/Services/AuthServices';

import './index.scss';

import Home from './pages/Home/home';
import Header from './components/Header/header';
import AuthModals from './pages/Auth/authModals';
import CreatePost from './components/Post/createPost';
import Logout from './components/Auth/logout';
import PostOffice from './components/Post/postOffice';
// import Auth from './utils/contexts/Auth';
import { AuthProvider } from './utils/contexts/formContext';
import { PostProvider } from './utils/contexts/postContext';
// import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';


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
                        <AuthProvider>
                          <Routes>
                              <Route exact path="/" element={<Home />} />
                              <Route path="/postOffice" element={<PostOffice />} />
                              <Route path="/auth" element={<AuthModals />} />
                              <Route path="/createPost" element={<CreatePost />} />
                              <Route path="/logOut" element={<Logout />} />
                          </Routes>
                          </AuthProvider>
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