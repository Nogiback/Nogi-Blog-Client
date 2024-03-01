import {
  Box,
  Badge,
  Image,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import he from 'he';

export default function BlogCard({ post }) {
  function formatDate(timestamp) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED);
  }

  return (
    <>
      <Link to={`/posts/${post._id}`}>
        <Box
          borderWidth='1px'
          shadow='md'
          rounded='lg'
          overflow='hidden'
          boxShadow='2xl'
        >
          <Image src={`${post.image}`} alt='Blog image' objectFit='cover' />
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
              {he.decode(post.content)}
            </Text>
          </Box>
        </Box>
      </Link>
    </>
  );
}
