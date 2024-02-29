import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useContext(AuthContext);
  const nav = useNavigate();
  const toast = useToast();

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(formData);
      toast({
        title: 'Success!',
        description: 'Account created. You can now login.',
        status: 'success',
        duration: '8000',
        isClosable: true,
      });
      nav('/login');
    } catch (err) {
      if (err.response.status === 409) {
        toast({
          title: 'Oops!',
          description: 'Username already exists.',
          status: 'error',
          duration: '8000',
          isClosable: true,
        });
      } else {
        toast({
          title: 'Oops!',
          description: `${err.response.data.errors[0].msg}`,
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to post comments and join the community! ✌️
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
              <FormControl id='username' isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  name='username'
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl id='password' isRequired>
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
              <FormControl id='confirmPassword' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name='confirmPassword'
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
              <Stack spacing={10} pt={2}>
                <Button
                  type='submit'
                  loadingText='Submitting'
                  size='lg'
                  bgGradient='linear(to-r, blue.400, blue.500, blue.600)'
                  color='gray.200'
                  _hover={{
                    bgGradient: 'linear(to-l, blue.300, blue.400, blue.500)',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Text
                    as={Link}
                    to='/login'
                    color={'blue.400'}
                    _hover={{
                      color: 'blue.300',
                    }}
                  >
                    Sign in here.
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
