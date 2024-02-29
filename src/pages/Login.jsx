import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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
            Please sign in to access your account ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={6}>
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
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    onChange={handleFormChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type='submit'
                color='gray.200'
                bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
                _hover={{
                  bgGradient: 'linear(to-l, blue.300, blue.400, blue.500)',
                }}
              >
                Sign in
              </Button>
              <Stack pt={6}>
                <Text align={'center'}>
                  Not a member?{' '}
                  <Text
                    as={Link}
                    to='/register'
                    color={'blue.400'}
                    _hover={{
                      color: 'blue.300',
                    }}
                  >
                    Sign up here.
                  </Text>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
