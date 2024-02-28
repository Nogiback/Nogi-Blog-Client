import { Box, SimpleGrid, Container, Text, useToast } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthContext';
import { deleteBlogPost, fetchAllBlogPosts } from '../utils/API';

export default function Home() {
  const [blogPosts, setBlogPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuth } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    getBlogPosts();
  }, [isAuth]);

  async function getBlogPosts() {
    try {
      const allBlogPosts = await fetchAllBlogPosts();
      setBlogPosts(allBlogPosts);
      setError(null);
    } catch (err) {
      setError(err.message);
      setBlogPosts(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBlogPostDelete(postID) {
    try {
      await deleteBlogPost(postID);
      getBlogPosts();
      toast({
        title: 'Success!',
        description: 'You have successfully deleted your blog post.',
        status: 'success',
        duration: '8000',
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box>
      <Hero />
      {isLoading && <Loading message='Loading Posts...' />}
      {error && <Text>{error}</Text>}
      {blogPosts && (
        <Container
          minHeight='100vh'
          maxWidth='1600px'
          mx='auto'
          my='auto'
          p={{ base: 5, md: 10 }}
        >
          <SimpleGrid columns={[1, 2, 3, 4]} spacing='8'>
            {blogPosts.map((post) => {
              return (
                <BlogCard
                  key={post._id}
                  post={post}
                  deleteBlogPost={handleBlogPostDelete}
                />
              );
            })}
          </SimpleGrid>
        </Container>
      )}
    </Box>
  );
}
