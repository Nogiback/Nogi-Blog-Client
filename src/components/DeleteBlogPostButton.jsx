import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import DeleteModal from './DeleteModal';

export default function DeleteBlogPostButton({ deleteBlogPost }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        fontSize='sm'
        position='absolute'
        right='5px'
        top='5px'
        margin='5px'
        zIndex='1'
      >
        <Button
          onClick={onOpen}
          size='sm'
          p='2px 8px'
          colorScheme='red'
          as='button'
        >
          <DeleteIcon />
        </Button>
      </Box>
      <DeleteModal
        message='Delete blog post?'
        onConfirm={() => {
          deleteBlogPost();
          onClose();
        }}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
