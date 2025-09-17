import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Link,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login({ email, password });

    if (result.success) {
      navigate('/dashboard');
    } else {
      toast({
        title: 'Error',
        description: result.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={8}
      borderRadius="xl"
      boxShadow="xl"
      bg="white"
      bgGradient="linear(to-b, white, gray.50)"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: "-1px",
        left: "0",
        right: "0",
        height: "2px",
        bgGradient: "linear(to-r, blue.400, purple.500)",
        borderRadius: "xl"
      }}
    >
      <VStack spacing={6}>
        <VStack spacing={2}>
          <Heading size="xl" bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
            Login to TidyTask
          </Heading>
          <Text color="gray.500" fontSize="md">
            Welcome back! Please enter your details.
          </Text>
        </VStack>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={isLoading}
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text>
          Don't have an account?{' '}
          <Link color="blue.500" href="/register">
            Register here
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginForm;