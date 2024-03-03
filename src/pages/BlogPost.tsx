import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import he from 'he';
import { DateTime } from 'luxon';
import { AuthContext } from '../context/AuthContext';
import { fetchBlogPost, deleteBlogPost } from '../utils/API';
import Loading from '../components/Loading';
import Comments from '../components/Comments';
import DeleteBlogPostButton from '../components/DeleteBlogPostButton';

interface Context {
  isAuth: boolean;
  isAuthor: boolean;
}

interface PostInterface {
  title: string;
  image: string;
  content: string;
  timestamp: string;
  author: {
    username: string;
  };
  comments: string[];
  _id: string;
}

export default function BlogPost() {
  const [postDetails, setPostDetails] = useState<PostInterface | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth, isAuthor } = useContext<Context>(AuthContext);
  const { postID } = useParams() as { postID: string };
  const nav = useNavigate();
  const toast = useToast();
  const textColor = useColorModeValue('gray.900', 'gray.400');
  const boxColor = useColorModeValue('gray.100', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    async function getBlogPost() {
      try {
        const blogPost = await fetchBlogPost(postID);
        setPostDetails(blogPost);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setPostDetails(null);
      } finally {
        setIsLoading(false);
      }
    }
    getBlogPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  function formatDate(timestamp: string) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED);
  }

  async function handleBlogPostDelete(postID: string) {
    try {
      await deleteBlogPost(postID);
      nav('/');
      toast({
        title: 'Success!',
        description: 'You have successfully deleted your blog post.',
        status: 'success',
        duration: 8000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box bg={boxColor} mt='60px'>
      {isLoading && <Loading message='Loading Post...' />}
      {error && <Text>{error}</Text>}
      {postDetails && (
        <>
          <Container minH={'100vh'} maxW={'5xl'}>
            <SimpleGrid
              columns={1}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 18 }}
            >
              <Flex>
                <Image
                  rounded={'md'}
                  alt={'blog image'}
                  src={postDetails.image}
                  fallbackSrc='https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  fit={'cover'}
                  align={'center'}
                  w={'100%'}
                  h={{ base: '100%', sm: '300px' }}
                />
              </Flex>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Flex justifyContent={'space-between'}>
                  <Box as={'header'}>
                    <Heading
                      lineHeight={1.1}
                      fontWeight={600}
                      fontSize={{ base: 'xl', sm: '3xl', lg: '4xl' }}
                    >
                      {he.decode(postDetails.title)}
                    </Heading>
                    <Text color={textColor} fontWeight={300} fontSize={'2xl'}>
                      {postDetails.author.username}
                    </Text>
                    <Text color={textColor} fontWeight={300} fontSize={'2xl'}>
                      {formatDate(postDetails.timestamp)}
                    </Text>
                  </Box>
                  <Flex>
                    {isAuthor && (
                      <>
                        <Box fontSize='sm' margin='5px' zIndex='1'>
                          <Button
                            size='sm'
                            p='2px 8px'
                            colorScheme='blue'
                            leftIcon={<EditIcon />}
                            onClick={() => nav(`/posts/${postID}/edit`)}
                          >
                            Edit Post
                          </Button>
                        </Box>
                        <DeleteBlogPostButton
                          deleteBlogPost={() =>
                            handleBlogPostDelete(postDetails._id)
                          }
                        />
                      </>
                    )}
                  </Flex>
                </Flex>
                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={'column'}
                  divider={<StackDivider borderColor={borderColor} />}
                >
                  <VStack whiteSpace={'pre-wrap'} spacing={{ base: 4, sm: 6 }}>
                    <Text fontSize={'lg'}>
                      {he.decode(postDetails.content)}
                    </Text>
                  </VStack>
                </Stack>
              </Stack>
            </SimpleGrid>
            <hr />
          </Container>
          {postDetails.comments && <Comments />}
        </>
      )}
    </Box>
  );
}
