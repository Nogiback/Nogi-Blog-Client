import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { PiFlowerLotus } from 'react-icons/pi';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Nav() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuth, isAuthor, logout } = useContext(AuthContext);
  const toast = useToast();

  return (
    <Box position='sticky' top='0' zIndex='3'>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.900', 'gray.200')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Icon as={PiFlowerLotus} boxSize={6} mr='1' />
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'gray.200')}
          >
            Nogi Blog
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={8}>
            <DesktopNav isAuthor={isAuthor} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={{ base: '2', md: '6' }}
        >
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          {isAuth ? (
            <Button
              onClick={() => {
                logout();
                toast({
                  title: 'Goodbye!',
                  description: 'You have successfully logged out.',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
              }}
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight={600}
              color={'white'}
              bg={'blue.500'}
              _hover={{
                bg: 'blue.300',
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                as={NavLink}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                to={'/login'}
              >
                Sign In
              </Button>
              <Button
                as={NavLink}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'blue.500'}
                to={'/register'}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav isAuthor={isAuthor} />
      </Collapse>
    </Box>
  );
}

function DesktopNav({ isAuthor }) {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      <Box>
        <Link
          as={NavLink}
          p={2}
          to={'/'}
          fontSize={'sm'}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
          }}
        >
          {'Home'}
        </Link>
      </Box>
      {isAuthor && (
        <Box>
          <Link
            as={NavLink}
            p={2}
            to={'/posts/new'}
            fontSize={'sm'}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {'Write Post'}
          </Link>
        </Box>
      )}
    </Stack>
  );
}

function MobileNav({ isAuthor }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  return (
    <Stack bg={bgColor} p={4} display={{ md: 'none' }}>
      <Stack spacing={4}>
        <Box
          py={2}
          as='a'
          href={'/'}
          justifyContent='space-between'
          alignItems='center'
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text fontWeight={600} color={textColor}>
            Home
          </Text>
        </Box>
      </Stack>
      {isAuthor && (
        <Stack spacing={4}>
          <Box
            py={2}
            as='a'
            href={'/posts/new'}
            justifyContent='space-between'
            alignItems='center'
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Text fontWeight={600} color={textColor}>
              Write Post
            </Text>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
