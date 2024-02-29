import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { addBlogPost } from '../utils/API';

export default function NewBlogPost() {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
  });
  const { isAuth } = useContext(AuthContext);
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const nav = useNavigate();
  const toast = useToast();

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newPost = await addBlogPost(formData);
      toast({
        title: 'Success!',
        description: 'New blog post added.',
        status: 'success',
        duration: '8000',
        isClosable: true,
      });
      nav(`/posts/${newPost._id}`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {isAuth && (
        <Container h='100vh' maxW='5xl' p={{ base: 5, md: 8 }}>
          <Flex justifyContent='start'>
            <Heading
              as='h3'
              size='lg'
              fontWeight='bold'
              textAlign='left'
              mb={{ base: '2', md: '6' }}
            >
              New Blog Post
            </Heading>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Stack spacing='6'>
              <FormControl isRequired>
                <FormLabel fontSize={19} fontWeight={700}>
                  Title
                </FormLabel>
                <Input
                  type='text'
                  name='title'
                  borderWidth={'1px'}
                  borderColor={borderColor}
                  onChange={handleFormChange}
                  value={formData.title}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={19} fontWeight={700}>
                  Image URL
                </FormLabel>
                <Input
                  type='text'
                  name='image'
                  borderWidth={'1px'}
                  borderColor={borderColor}
                  onChange={handleFormChange}
                  value={formData.image}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={19} fontWeight={700}>
                  Body
                </FormLabel>
                <Textarea
                  borderWidth={'1px'}
                  borderColor={borderColor}
                  minH={{ base: '200px', md: '400px' }}
                  resize='vertical'
                  name='content'
                  onChange={handleFormChange}
                  value={formData.content}
                ></Textarea>
              </FormControl>
              <Button
                w={24}
                type='submit'
                bg={'blue.500'}
                color='gray.200'
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Container>
      )}
    </>
  );
}

//   return (
//     <Container
//       minH='100vh'
//       maxW='5xl'
//       mx='auto'
//       my='auto'
//       p={{ base: 5, md: 10 }}
//     >
//       <Heading>New Blog Post</Heading>
//       <Flex direction='column' gap='6'>
//         <Textarea
//           minH={{ base: '200px', md: '400px' }}
//           size='lg'
//           resize='vertical'
//           isRequired
//         ></Textarea>
//         <Button
//           type='submit'
//           loadingText='Submitting'
//           size='md'
//           bg={'blue.500'}
//           color={'white'}
//           _hover={{
//             bg: 'blue.300',
//           }}
//         >
//           Submit
//         </Button>
//       </Flex>
//     </Container>
//   );
// }
