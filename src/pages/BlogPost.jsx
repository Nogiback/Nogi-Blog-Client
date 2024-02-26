import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function BlogPost() {
  const { postID } = useParams();

  return <div>BlogPost</div>;
}
