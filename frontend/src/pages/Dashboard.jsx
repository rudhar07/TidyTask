import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Select,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { tasks as tasksApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const fetchTasks = async () => {
    try {
      const { data } = await tasksApi.getAll(selectedCategory);
      setTasks(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch tasks',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedCategory]);

  const handleCreateTask = async (taskData) => {
    try {
      await tasksApi.create(taskData);
      fetchTasks();
      toast({
        title: 'Success',
        description: 'Task created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await tasksApi.update(selectedTask._id, taskData);
      setSelectedTask(null);
      fetchTasks();
      toast({
        title: 'Success',
        description: 'Task updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await tasksApi.delete(taskId);
      fetchTasks();
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleToggleTask = async (taskId, isDone) => {
    try {
      await tasksApi.update(taskId, { isDone });
      fetchTasks();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    onOpen();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="container.lg">
        <VStack spacing={8}>
          <Box
            w="100%"
            p={6}
            borderRadius="xl"
            bg="white"
            boxShadow="md"
            bgGradient="linear(to-r, blue.50, purple.50)"
          >
            <HStack width="100%" justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Heading
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  bgClip="text"
                  fontSize={{ base: "2xl", md: "3xl" }}
                >
                  My Tasks
                </Heading>
                <Text color="gray.600">Organize your day efficiently</Text>
              </VStack>
              <Button
                onClick={handleLogout}
                colorScheme="red"
                variant="outline"
                _hover={{
                  bg: "red.50"
                }}
                size="md"
              >
                Logout
              </Button>
            </HStack>
          </Box>

          <HStack
            width="100%"
            justify="space-between"
            bg="white"
            p={4}
            borderRadius="lg"
            boxShadow="sm"
          >
            <Select
              placeholder="Filter by category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              maxW="200px"
              bg="white"
              borderColor="gray.300"
              _hover={{
                borderColor: "blue.400"
              }}
            >
              <option value="">All Categories</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </Select>

            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={() => {
                setSelectedTask(null);
                onOpen();
              }}
              bgGradient="linear(to-r, blue.400, purple.500)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, purple.600)"
              }}
              _active={{
                bgGradient: "linear(to-r, blue.600, purple.700)"
              }}
            >
              Add Task
            </Button>
          </HStack>

          <Box
            width="100%"
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="sm"
            minH="400px"
          >
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onToggle={handleToggleTask}
            />
          </Box>

          <TaskForm
            isOpen={isOpen}
            onClose={() => {
              onClose();
              setSelectedTask(null);
            }}
            onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
            initialData={selectedTask}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default Dashboard;