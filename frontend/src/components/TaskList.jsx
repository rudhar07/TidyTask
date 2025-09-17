import {
  Box,
  Checkbox,
  HStack,
  IconButton,
  Text,
  VStack,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const TaskList = ({ tasks, onDelete, onEdit, onToggle }) => {
  const toast = useToast();

  const handleToggle = async (task) => {
    try {
      await onToggle(task._id, !task.isDone);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await onDelete(taskId);
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

  const getCategoryColor = (category) => {
    const colors = {
      personal: 'blue',
      work: 'purple',
      shopping: 'green',
      health: 'red',
      other: 'gray',
    };
    return colors[category] || 'gray';
  };

  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task) => (
        <Box
          key={task._id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          boxShadow="sm"
          bgColor={task.isDone ? 'gray.50' : 'white'}
        >
          <HStack justify="space-between">
            <HStack>
              <Checkbox
                isChecked={task.isDone}
                onChange={() => handleToggle(task)}
                size="lg"
              />
              <VStack align="start" spacing={1}>
                <Text
                  fontSize="lg"
                  textDecoration={task.isDone ? 'line-through' : 'none'}
                  color={task.isDone ? 'gray.500' : 'black'}
                >
                  {task.title}
                </Text>
                {task.description && (
                  <Text color="gray.600" fontSize="sm">
                    {task.description}
                  </Text>
                )}
                <Badge colorScheme={getCategoryColor(task.category)}>
                  {task.category}
                </Badge>
              </VStack>
            </HStack>
            <HStack>
              <IconButton
                icon={<EditIcon />}
                onClick={() => onEdit(task)}
                size="sm"
                colorScheme="blue"
                variant="ghost"
              />
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => handleDelete(task._id)}
                size="sm"
                colorScheme="red"
                variant="ghost"
              />
            </HStack>
          </HStack>
        </Box>
      ))}
      {tasks.length === 0 && (
        <Box textAlign="center" py={8}>
          <Text color="gray.500">No tasks found</Text>
        </Box>
      )}
    </VStack>
  );
};

export default TaskList;