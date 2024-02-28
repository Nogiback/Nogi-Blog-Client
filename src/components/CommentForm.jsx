import {
  Container,
  Textarea,
  Heading,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { addComment, fetchComments } from '../utils/API';
import { AuthContext } from '../context/AuthContext';

export default function CommentForm({ comments, setComments }) {
  const [comment, setComment] = useState({ comment: '' });
  const { isAuth } = useContext(AuthContext);
  const { postID } = useParams();
  const borderColor = useColorModeValue('gray.300', 'gray.700');

  function handleFormChange(e) {
    const { name, value } = e.target;
    setComment({ ...comments, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addComment(postID, comment);
      const newComments = await fetchComments(postID);
      setComments(newComments);
      setComment({ comment: '' });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {isAuth ? (
        <Container maxW='5xl' p={{ base: 5, md: 8 }}>
          <Flex justifyContent='start'>
            <Heading
              as='h3'
              size='lg'
              fontWeight='bold'
              textAlign='left'
              mb={{ base: '2', md: '6' }}
            >
              Leave a comment
            </Heading>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Stack spacing='6'>
              <FormControl isRequired>
                <FormLabel fontSize={19} fontWeight={700}>
                  Message
                </FormLabel>
                <Textarea
                  isRequired
                  borderWidth={'1px'}
                  borderColor={borderColor}
                  resize='vertical'
                  name='comment'
                  onChange={handleFormChange}
                  value={comment.comment}
                ></Textarea>
              </FormControl>
              <Button
                w={24}
                type='submit'
                bg={'blue.500'}
                color='gray.200'
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Container>
      ) : (
        <Container maxW='5xl' py={{ base: '8', md: '16' }}>
          <Heading
            as='h3'
            textAlign='center'
            fontSize={{ base: 'lg', md: '2xl' }}
          >
            <Link color='blue.400' href='/login'>
              Login
            </Link>{' '}
            or{' '}
            <Link color='blue.400' href='/register'>
              create an account
            </Link>{' '}
            to join the conversation.
          </Heading>
        </Container>
      )}
    </>
  );
}
