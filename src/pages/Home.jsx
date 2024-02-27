import { useState, useEffect, useContext } from 'react';
import { Box, SimpleGrid, Container } from '@chakra-ui/react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthContext';
import { fetchAllBlogPosts } from '../utils/API';

export default function Home() {
  const [blogPosts, setBlogPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
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
    getBlogPosts();
  }, [isAuth]);

  return (
    <Box>
      <Hero />
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      {blogPosts && (
        <Container
          minHeight='100vh'
          maxWidth='100vw'
          mx='auto'
          my='auto'
          p={{ base: 5, md: 10 }}
        >
          <SimpleGrid columns={[1, 2, 3, 4]} spacing='8'>
            {blogPosts.map((post) => {
              return <BlogCard key={post._id} post={post} />;
            })}
          </SimpleGrid>
        </Container>
      )}
    </Box>
  );
}