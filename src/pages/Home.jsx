import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, SimpleGrid, Container } from '@chakra-ui/react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import { AuthContext } from '../context/authContext';
import { fetchAllBlogPosts } from '../utils/API';

const dataList = [
  {
    id: 1,
    title: 'Rails ActiveAdmin',
    authorName: 'Ali',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  },
  {
    id: 2,
    title: 'Rails ActiveAdmin',
    authorName: 'Ali',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  },
  {
    id: 3,
    title: 'Rails ActiveAdmin',
    authorName: 'Ali',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  },
  {
    id: 4,
    title: 'Rails ActiveAdmin',
    authorName: 'Ali',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  },
];

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
      {isLoading && <p>Loading posts...</p>}
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
