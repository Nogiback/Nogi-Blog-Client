import {
  Button,
  Container,
  Flex,
  Text,
  Heading,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import he from 'he';
import { AuthContext } from '../context/AuthContext';
import { updateBlogPost, fetchBlogPost } from '../utils/API';
import Loading from '../components/Loading';

interface Context {
  isAuth: boolean;
}

export default function EditBlogPost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth } = useContext<Context>(AuthContext);
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const nav = useNavigate();
  const toast = useToast();
  const { postID } = useParams() as { postID: string };

  useEffect(() => {
    async function getBlogPost() {
      try {
        const blogPost = await fetchBlogPost(postID);
        setTitle(he.decode(blogPost.title));
        setImage(he.decode(blogPost.image));
        setContent(he.decode(blogPost.content));
        setError(null);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setTitle('');
        setImage('');
        setContent('');
      } finally {
        setIsLoading(false);
      }
    }
    getBlogPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleImageChange(e) {
    setImage(e.target.value);
  }
  function handleContentChange(e) {
    setContent(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedPost = await updateBlogPost(postID, {
        title,
        image,
        content,
      });
      toast({
        title: 'Success!',
        description: 'Blog post successfully updated',
        status: 'success',
        duration: 8000,
        isClosable: true,
      });
      nav(`/posts/${updatedPost._id}`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {isLoading && <Loading message='Loading Post Details...' />}
      {error && <Text>{error}</Text>}
      {isAuth && (
        <Container h='100vh' maxW='5xl' mt='60px' p={{ base: 5, md: 8 }}>
          <Flex justifyContent='start'>
            <Heading
              as='h3'
              size='lg'
              fontWeight='bold'
              textAlign='left'
              mb={{ base: '2', md: '6' }}
            >
              Update Blog Post
            </Heading>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Stack spacing='6'>
              <FormControl isRequired>
                <FormLabel fontSize={19} fontWeight={700}>
                  Title
                </FormLabel>
                <Input
                  type='text'
                  name='title'
                  borderWidth={'1px'}
                  borderColor={borderColor}
                  onChange={handleTitleChange}
                  value={title}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={19} fontWeight={700}>
                  Image URL
                </FormLabel>
                <Input
                  type='text'
                  name='image'
                  borderWidth={'1px'}
                  borderColor={borderColor}
                  onChange={handleImageChange}
                  value={image}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={19} fontWeight={700}>
                  Body
                </FormLabel>
                <Textarea
                  borderWidth={'1px'}
                  borderColor={borderColor}
                  minH={{ base: '200px', md: '400px' }}
                  resize='vertical'
                  name='content'
                  onChange={handleContentChange}
                  value={content}
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
                Update
              </Button>
            </Stack>
          </form>
        </Container>
      )}
    </>
  );
}
