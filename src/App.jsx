import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';

import BlogPost from './pages/BlogPost';
import NewBlogPost from './pages/NewBlogPost';
import EditBlogPost from './pages/EditBlogPost';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/:postID' element={<BlogPost />} />
        <Route
          path='/posts/new'
          element={
            <ProtectedRoute>
              <NewBlogPost />
            </ProtectedRoute>
          }
        />
        <Route
          path='/posts/:postID/edit'
          element={
            <ProtectedRoute>
              <EditBlogPost />
            </ProtectedRoute>
          }
        />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </>
  );
}

export default App;
