import { useState } from "react";
import { 
  Container, 
  VStack, 
  HStack, 
  Input, 
  Button, 
  Text, 
  Checkbox, 
  IconButton, 
  Heading 
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((t, i) => 
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <Heading as="h1" size="2xl" mb={6}>Todo App</Heading>
        <HStack w="100%">
          <Input 
            placeholder="Add a new task" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
          />
          <Button onClick={addTask} colorScheme="teal">Add Task</Button>
        </HStack>
        <VStack w="100%" spacing={3} mt={5}>
          {tasks.map((t, index) => (
            <HStack 
              key={index} 
              w="100%" 
              p={3} 
              borderWidth="1px" 
              borderRadius="md" 
              justifyContent="space-between"
              bg={t.completed ? "green.100" : "white"}
            >
              <Checkbox 
                isChecked={t.completed} 
                onChange={() => toggleTaskCompletion(index)}
              >
                <Text as={t.completed ? "s" : ""}>{t.text}</Text>
              </Checkbox>
              <IconButton 
                aria-label="Delete task" 
                icon={<FaTrash />} 
                onClick={() => deleteTask(index)} 
                colorScheme="red"
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;