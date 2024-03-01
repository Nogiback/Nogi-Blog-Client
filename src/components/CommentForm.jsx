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
  useToast,
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { addComment, fetchComments } from '../utils/API';
import { AuthContext } from '../context/AuthContext';

export default function CommentForm({ comments, setComments }) {
  const [comment, setComment] = useState({ comment: '' });
  const { isAuth } = useContext(AuthContext);
  const { postID } = useParams();
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const toast = useToast();

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
      toast({
        title: 'Success!',
        description: 'New comment added.',
        status: 'success',
        duration: '8000',
        isClosable: true,
      });
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
                color='gray.200'
                bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
                _hover={{
                  bgGradient: 'linear(to-l, blue.300, blue.400, blue.500)',
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
            <Link as={NavLink} color='blue.400' to='/login'>
              Login
            </Link>{' '}
            or{' '}
            <Link as={NavLink} color='blue.400' to='/register'>
              create an account
            </Link>{' '}
            to join the conversation.
          </Heading>
        </Container>
      )}
    </>
  );
}
