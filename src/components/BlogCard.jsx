import {
  Box,
  Badge,
  Image,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { AuthContext } from '../context/AuthContext';
import DeleteBlogPostButton from './DeleteBlogPostButton';

export default function BlogCard({ post, deleteBlogPost }) {
  const { isAuthor } = useContext(AuthContext);

  function formatDate(timestamp) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED);
  }

  return (
    <Box position='relative'>
      {isAuthor && (
        <DeleteBlogPostButton deleteBlogPost={() => deleteBlogPost(post._id)} />
      )}
      <Link to={`/posts/${post._id}`}>
        <Box
          borderWidth='1px'
          shadow='md'
          rounded='lg'
          overflow='hidden'
          position='relative'
        >
          <Image src={`${post.image}`} alt='Blog image' />
          <Box p={{ base: 4, lg: 6 }}>
            <Box d='flex' alignItems='baseline' mb='2'>
              <Box
                fontWeight='semibold'
                as='h2'
                letterSpacing='wide'
                textTransform='uppercase'
              >
                {post.title}
              </Box>
            </Box>
            <Box>
              <Flex color='gray.600' fontSize='sm' gap={2}>
                <Badge rounded='full' px='2' colorScheme='teal'>
                  {post.author.username}
                </Badge>
                <Badge rounded='full' px='2' colorScheme='purple'>
                  {formatDate(post.timestamp)}
                </Badge>
              </Flex>
            </Box>
            <Text
              mt='1'
              noOfLines={4}
              lineHeight='tight'
              color={useColorModeValue('gray.800', 'gray.200')}
              fontSize='sm'
            >
              {post.content}
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}
