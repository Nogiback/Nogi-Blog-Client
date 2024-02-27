import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import he from 'he';
import { DateTime } from 'luxon';
import { AuthContext } from '../context/AuthContext';
import { fetchBlogPost } from '../utils/API';

export default function BlogPost() {
  const { postID } = useParams();

  return <div>BlogPost</div>;
}
