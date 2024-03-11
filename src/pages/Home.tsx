import { Box, SimpleGrid, Container, Text } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthContext';
import { fetchAllBlogPosts } from '../utils/API';

interface Context {
  isAuth: boolean;
}

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  author: object;
  image: string;
  comments: string[];
  timestamp: Date;
};

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuth } = useContext<Context>(AuthContext);

  useEffect(() => {
    getBlogPosts();
  }, [isAuth]);

  async function getBlogPosts() {
    try {
      const allBlogPosts = await fetchAllBlogPosts();
      setBlogPosts(allBlogPosts);
      setError(null);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box mt='60px'>
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
              return <BlogCard key={post._id} post={post} />;
            })}
          </SimpleGrid>
        </Container>
      )}
    </Box>
  );
}
