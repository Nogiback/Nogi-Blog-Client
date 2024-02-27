import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Icon,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

export default function Hero() {
  const { isAuth } = useContext(AuthContext);

  return (
    <Stack minH='40vh' direction={{ base: 'column', md: 'row' }}>
      <Flex
        p={8}
        flex={1}
        align={'center'}
        justify={'center'}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              Welcome to
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              The Nogi Blog
            </Text>{' '}
          </Heading>
          <Text
            fontSize={{ base: 'md', lg: 'lg' }}
            color={useColorModeValue('gray.800', 'gray.200')}
          >
            Hello! My name is Peter Do. I am a full stack developer based in
            Toronto, Canada. This is my personal blog. Journey with me through
            my life&apos;s adventures, musings, and reflections.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            {!isAuth && (
              <Button
                as={Link}
                to='/register'
                rounded={'full'}
                bg={'blue.500'}
                color={'white'}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Sign Up
              </Button>
            )}
            <Button as='a' href='https://github.com/Nogiback' rounded={'full'}>
              <Icon as={FaGithub} h={4} w={4} />
              <Text as='span' ml={1}>
                {' '}
                Github
              </Text>
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
      </Flex>
    </Stack>
  );
}
