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

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await register({ name, email, password });

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
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
      <VStack spacing={4}>
        <Heading>Register for TidyTask</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
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
              Register
            </Button>
          </VStack>
        </form>
        <Text>
          Already have an account?{' '}
          <Link color="blue.500" href="/login">
            Login here
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default RegisterForm;