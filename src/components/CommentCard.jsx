import { Flex, Text, Stack, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import he from 'he';
import { DateTime } from 'luxon';
import DeleteCommentButton from './DeleteCommentButton';

export default function CommentCard({ comment, deleteComment }) {
  const textColor = useColorModeValue('gray.700', 'gray.400');
  const { isAuth, currentUser } = useContext(AuthContext);

  function formatDate(timestamp) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED);
  }

  return (
    <Stack
      key={comment._id}
      direction='column'
      maxW='100%'
      borderWidth='1px'
      shadow='lg'
      rounded='md'
      p='3'
    >
      <Flex justifyContent={'space-between'}>
        <Flex direction='column'>
          <Text fontWeight='bold' fontSize='lg'>
            {comment.user.username}
          </Text>
          <Text fontWeight='light' fontSize='xs'>
            {formatDate(comment.timestamp)}
          </Text>
        </Flex>
        {isAuth && comment.user._id === currentUser && (
          <DeleteCommentButton
            deleteComment={() => deleteComment(comment._id)}
          />
        )}
      </Flex>
      <Text
        color={textColor}
        fontSize='md'
        textAlign='left'
        lineHeight='1.375'
        fontWeight='300'
      >
        {he.decode(comment.comment)}
      </Text>
    </Stack>
  );
}
