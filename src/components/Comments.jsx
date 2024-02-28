import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../utils/API';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default function Comments() {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postID } = useParams();

  useEffect(() => {
    async function getComments() {
      try {
        const postComments = await fetchComments(postID);
        setComments(postComments);
        setError(null);
      } catch (err) {
        setError(err.message);
        setComments(null);
      } finally {
        setIsLoading(false);
      }
    }
    getComments();
  }, []);

  return (
    <Box>
      <CommentList comments={comments} isLoading={isLoading} error={error} />
      <CommentForm comments={comments} setComments={setComments} />
    </Box>
  );
}
