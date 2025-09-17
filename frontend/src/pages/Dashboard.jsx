import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Select,
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
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <HStack width="100%" justify="space-between">
          <Heading>My Tasks</Heading>
          <Button onClick={handleLogout} colorScheme="red" variant="outline">
            Logout
          </Button>
        </HStack>

        <HStack width="100%" justify="space-between">
          <Select
            placeholder="Filter by category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            maxW="200px"
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
          >
            Add Task
          </Button>
        </HStack>

        <Box width="100%">
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
  );
};

export default Dashboard;