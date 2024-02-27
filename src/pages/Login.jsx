import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

export default function Login() {
  const [formData, setFormData] = useState({});
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const toast = useToast();

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);
      await login(formData);
      toast({
        title: 'Success!',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: '8000',
        isClosable: true,
      });
      nav('/');
    } catch (err) {
      if (err.response.status === 401) {
        toast({
          title: 'Oops!',
          description: 'Incorrect username or password.',
          status: 'error',
          duration: '8000',
          isClosable: true,
        });
      } else {
        toast({
          title: 'Oops!',
          description: `${err.message}`,
          status: 'error',
          duration: '8000',
          isClosable: true,
        });
      }
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Welcome Back!</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Please sign in to access your account
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  name='username'
                  type='text'
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name='password'
                  type='password'
                  onChange={handleFormChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  type='submit'
                  bg={'blue.500'}
                  color='gray.200'
                  _hover={{
                    bg: 'blue.300',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
