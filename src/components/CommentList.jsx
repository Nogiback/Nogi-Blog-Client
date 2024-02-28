import {
  Container,
  Heading,
  Flex,
  Text,
  Stack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import he from 'he';
import { DateTime } from 'luxon';
import Loading from './Loading';

export default function CommentList({ comments, isLoading, error }) {
  const textColor = useColorModeValue('gray.700', 'gray.400');

  function formatDate(timestamp) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_MED);
  }

  return (
    <>
      {isLoading && <Loading message='Loading comments...' />}
      {error && <Text>{error}</Text>}
      {comments && comments.length > 0 && (
        <Container maxW='5xl' p={{ base: 5, md: 8 }}>
          <Flex justifyContent='start'>
            <Heading
              as='h3'
              size='lg'
              fontWeight='bold'
              textAlign='left'
              mb={{ base: '4', md: '2' }}
            >
              {`Comments (${comments.length})`}
            </Heading>
          </Flex>
          <Stack direction='column' spacing={5} my={4}>
            {comments.map((comment) => {
              return (
                <Stack
                  key={comment._id}
                  direction='column'
                  maxW='100%'
                  borderWidth='1px'
                  shadow='lg'
                  rounded='md'
                  p='3'
                >
                  <HStack spacing={3}>
                    <Flex direction='column'>
                      <Text fontWeight='bold' fontSize='lg'>
                        {comment.user.username}
                      </Text>
                      <Text fontWeight='light' fontSize='xs'>
                        {formatDate(comment.timestamp)}
                      </Text>
                    </Flex>
                  </HStack>
                  <Text
                    color={textColor}
                    fontSize='md'
                    textAlign='left'
                    lineHeight='1.375'
                    fontWeight='300'
                  >
                    {he.decode(comment.comment)}
                  </Text>
                </Stack>
              );
            })}
          </Stack>
        </Container>
      )}
    </>
  );
}
