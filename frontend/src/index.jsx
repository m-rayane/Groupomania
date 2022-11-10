import './index.scss'

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import Header from './components/Organisms/header'
import Login from './pages/login'
import CreatePost from './pages/createPost'
import PostOffice from './pages/postOffice'
import Profile from './pages/profile'
import PageNotFound from './pages/pageNotFound'
import { PostProvider } from './utils/contexts/postContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

function App() {
  return (
    <React.StrictMode>
      <div className="container">
        <Router>
          <PostProvider>
            <Header />
            <main className="main">
              <Routes>
                <Route exact path="/" element={<PostOffice />} />
                <Route path="/login" element={<Login />} />
                <Route path="/createPost" element={<CreatePost />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/error" element={<PageNotFound />} />
              </Routes>
            </main>
          </PostProvider>
        </Router>
      </div>
    </React.StrictMode>
  )
}

root.render(<App />)

export default App
