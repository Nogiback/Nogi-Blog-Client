import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  border,
} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import he from 'he';
import { DateTime } from 'luxon';
import { AuthContext } from '../context/AuthContext';
import { fetchBlogPost } from '../utils/API';
import Loading from '../components/Loading';
import Comments from '../components/Comments';

export default function BlogPost() {
  const [postDetails, setPostDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { postID } = useParams();
  const { isAuth, isAuthor } = useContext(AuthContext);
  const textColor = useColorModeValue('gray.900', 'gray.400');
  const boxColor = useColorModeValue('gray.100', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    async function getBlogPost() {
      try {
        const blogPost = await fetchBlogPost(postID);
        setPostDetails(blogPost);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPostDetails(null);
      } finally {
        setIsLoading(false);
      }
    }
    getBlogPost();
  }, [isAuth]);

  function formatDate(timestamp) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED);
  }

  return (
    <Box bg={boxColor}>
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
                  fit={'cover'}
                  align={'center'}
                  w={'100%'}
                  h={{ base: '100%', sm: '300px' }}
                />
              </Flex>
              <Stack spacing={{ base: 6, md: 10 }}>
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

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={'column'}
                  divider={<StackDivider borderColor={borderColor} />}
                >
                  <VStack spacing={{ base: 4, sm: 6 }}>
                    {postDetails.content
                      .split('\n')
                      .filter((para) => para !== '')
                      .map((para, i) => (
                        <Text key={i} fontSize={'lg'}>
                          {he.decode(postDetails.content)}
                        </Text>
                      ))}
                  </VStack>
                </Stack>
              </Stack>
            </SimpleGrid>
            <hr />
          </Container>
          {postDetails.comments && <Comments />}
        </>
      )}
      {/* CommentForm */}
    </Box>
  );
}
