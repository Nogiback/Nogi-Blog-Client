import { Button, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import DeleteModal from './DeleteModal';

export default function DeleteCommentButton({ deleteComment }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size={'sm'} onClick={onOpen}>
        <DeleteIcon boxSize='4' color='red.500' />
      </Button>
      <DeleteModal
        message='Delete comment?'
        onConfirm={() => {
          deleteComment();
          onClose();
        }}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
