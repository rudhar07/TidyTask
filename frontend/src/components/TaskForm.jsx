import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
} from '@chakra-ui/react';

const TaskForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || 'personal');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit({ title, description, category });
    setIsLoading(false);
    onClose();
    // Reset form
    if (!initialData) {
      setTitle('');
      setDescription('');
      setCategory('personal');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent
        borderRadius="xl"
        boxShadow="xl"
        bgGradient="linear(to-b, white, gray.50)"
      >
        <ModalHeader
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          fontSize="2xl"
          textAlign="center"
          pt={6}
        >
          {initialData ? 'Edit Task' : 'Add New Task'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel fontWeight="medium">Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  size="lg"
                  borderRadius="md"
                  borderColor="gray.300"
                  _hover={{
                    borderColor: "blue.400"
                  }}
                  _focus={{
                    borderColor: "blue.400",
                    boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)"
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="medium">Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description"
                  size="lg"
                  borderRadius="md"
                  borderColor="gray.300"
                  _hover={{
                    borderColor: "blue.400"
                  }}
                  _focus={{
                    borderColor: "blue.400",
                    boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)"
                  }}
                  minH="120px"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">Category</FormLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="lg"
                  borderRadius="md"
                  borderColor="gray.300"
                  _hover={{
                    borderColor: "blue.400"
                  }}
                  _focus={{
                    borderColor: "blue.400",
                    boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)"
                  }}
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <Button
                type="submit"
                width="100%"
                isLoading={isLoading}
                size="lg"
                borderRadius="md"
                bgGradient="linear(to-r, blue.400, purple.500)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, purple.600)"
                }}
                _active={{
                  bgGradient: "linear(to-r, blue.600, purple.700)"
                }}
                mb={4}
              >
                {initialData ? 'Update Task' : 'Add Task'}
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TaskForm;