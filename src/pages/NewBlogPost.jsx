import { Button, Container, Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function NewBlogPost() {
  const editorRef = useRef();

  function onClickHandler() {
    console.log(editorRef.current.getContent());
  }
  return (
    <Container minH='100vh' maxW='1200px'>
      <Flex direction='column' gap='6'>
        <Editor
          apiKey='znww49i6sumti7g9oupedgm5dj5xr0id0gzru5f4n8pql64u'
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{ menubar: false }}
        />
        <Button
          type='submit'
          loadingText='Submitting'
          size='md'
          bg={'blue.500'}
          color={'white'}
          _hover={{
            bg: 'blue.300',
          }}
          onClick={onClickHandler}
        >
          Submit
        </Button>
      </Flex>
    </Container>
  );
}
