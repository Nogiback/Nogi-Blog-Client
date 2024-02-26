import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
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
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/new' element={<NewBlogPost />} />
        <Route path='/posts/:postID' element={<BlogPost />} />
        <Route path='/posts/:postID/edit' element={<EditBlogPost />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
