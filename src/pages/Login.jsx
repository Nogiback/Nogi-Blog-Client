import { useState, useContext } from 'react';
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
} from '@chakra-ui/react';

export default function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(formData);
      setError(null);
      nav('/');
    } catch (err) {
      if (err.response.status === 401) {
        setError('Incorrect username or password');
      } else {
        setError(err.message);
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
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to access comments and other blog features!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack as='form' onSubmit={handleSubmit} spacing={4}>
            <FormControl id='username' isRequired>
              <FormLabel>Username</FormLabel>
              <Input type='text' onChange={handleFormChange} />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <Input type='password' onChange={handleFormChange} />
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
              {error && <Text>{error}</Text>}
              <Button
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
        </Box>
      </Stack>
    </Flex>
  );
}
