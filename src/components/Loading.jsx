import { Box, Heading, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box h='100vh' textAlign='center' py={10} px={6}>
      <Spinner size='xl' />
      <Heading as='h2' size='xl' mt={6} mb={2}>
        Loading...
      </Heading>
    </Box>
  );
}
