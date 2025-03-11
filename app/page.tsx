"use client";

import { ConnectWallet } from "@/modules/wallet";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Badge,
  Icon
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Project {
  name: string;
  githubLink: string;
  description: string;
  keplerAddress: string;
}

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [description, setDescription] = useState("");
  const [keplerAddress, setKeplerAddress] = useState("");
  
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleAddProject = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setProjectName("");
    setGithubLink("");
    setDescription("");
    setKeplerAddress("");
  };

  const handleSaveProject = () => {
    if (projectName.trim() && githubLink.trim() && description.trim() && keplerAddress.trim()) {
      const newProject: Project = {
        name: projectName,
        githubLink,
        description,
        keplerAddress,
      };
      setProjects([...projects, newProject]);
      setProjectName("");
      setGithubLink("");
      setDescription("");
      setKeplerAddress("");
      setIsAdding(false);
    }
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="center" mb={10}>
        <Box position="absolute" top="1rem" left="1rem">
  <Image 
    src="logo.webp" 
    w="8rem" 
    borderRadius="full"  // Makes the image circular
    alt="Andromeda Logo"
  />
</Box>
          <Heading as="h1" size="xl" textAlign="center">
          AndroFund 
          </Heading>
          <Text fontSize="lg" textAlign="center" maxW="container.md">
          Fund Andromeda Open-Source Projects with Community Power          </Text>
          <Box 
            p={4} 
            bg="blue.50" 
            borderRadius="md" 
            borderLeft="4px solid" 
            borderColor="blue.500"
            width="full"
            maxW="container.md"
          >
            <Flex align="center">
              <Box mr={3} color="blue.500" fontWeight="bold">
                🔗
              </Box>
              <Box>
                <Text fontWeight="medium">Connect to Andromeda Devnet</Text>
                <Text fontSize="sm" color="gray.600">
                  Please connect your wallet to submit or manage your projects.
                </Text>
              </Box>
            </Flex>
            <Box mt={4}>
              <ConnectWallet />
            </Box>
          </Box>
        </VStack>

        <Divider my={8} />

        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h2" size="lg">
            Project Submissions
          </Heading>
          <Button 
            leftIcon={<Text mr={1}>+</Text>} 
            colorScheme="blue" 
            onClick={handleAddProject}
            isDisabled={isAdding}
          >
            Submit New Project
          </Button>
        </Flex>

        {isAdding && (
          <Card 
            mb={8} 
            borderWidth="1px" 
            borderColor={borderColor} 
            bg={cardBgColor} 
            shadow="md" 
            borderRadius="lg"
            overflow="hidden"
          >
            <CardHeader bg="blue.50" borderBottom="1px" borderColor={borderColor}>
              <Heading size="md">New Project Submission</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Project Name</FormLabel>
                  <Input 
                    value={projectName} 
                    onChange={(e) => setProjectName(e.target.value)} 
                    placeholder="Enter your project name" 
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>GitHub Repository</FormLabel>
                  <Input 
                    value={githubLink} 
                    onChange={(e) => setGithubLink(e.target.value)} 
                    placeholder="https://github.com/username/repository" 
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Project Description</FormLabel>
                  <Textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Describe your project's purpose, goals, and how funding will be used" 
                    minH="120px"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Kepler Address for Funding</FormLabel>
                  <Input 
                    value={keplerAddress} 
                    onChange={(e) => setKeplerAddress(e.target.value)} 
                    placeholder="Enter your Kepler wallet address" 
                    fontFamily="monospace"
                  />
                </FormControl>
              </Stack>
            </CardBody>
            <CardFooter bg="gray.50" borderTop="1px" borderColor={borderColor}>
              <HStack spacing={4}>
                <Button 
                  colorScheme="green" 
                  onClick={handleSaveProject}
                >
                  Submit Project
                </Button>
                <Button variant="outline" onClick={handleCancelAdd}>
                  Cancel
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        )}

        {projects.length > 0 ? (
          <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={6}>
            {projects.map((project, index) => (
              <Card key={index} borderWidth="1px" borderColor={borderColor} shadow="sm" borderRadius="md">
                <CardHeader pb={2}>
                  <Flex justify="space-between" align="flex-start">
                    <Heading size="md">{project.name}</Heading>
                    <Badge colorScheme="blue" variant="solid" borderRadius="full" px={2}>
                      Submitted
                    </Badge>
                  </Flex>
                </CardHeader>
                <CardBody pt={0}>
                  <LinkBox mt={1} mb={3}>
                    <Flex align="center">
                      <Text mr={2}>🔗</Text>
                      <LinkOverlay href={project.githubLink} isExternal color="blue.500">
                        View on GitHub
                      </LinkOverlay>
                    </Flex>
                  </LinkBox>
                  <Text fontSize="sm" color="gray.600" noOfLines={3} mb={4}>
                    {project.description}
                  </Text>
                  <Box 
                    bg="gray.50" 
                    p={3} 
                    borderRadius="md" 
                    fontSize="sm" 
                    fontFamily="monospace"
                  >
                    <Text fontWeight="bold" fontSize="xs" mb={1} color="gray.500">
                      KEPLER ADDRESS
                    </Text>
                    <Text isTruncated>
                      {project.keplerAddress}
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            ))}
          </Grid>
        ) : (
          !isAdding && (
            <Box 
              py={10} 
              px={6} 
              textAlign="center" 
              borderWidth="1px" 
              borderStyle="dashed" 
              borderColor={borderColor} 
              borderRadius="lg"
            >
              <Text color="gray.500" mb={4}>
                No projects have been submitted yet. Be the first to submit your open source project for funding!
              </Text>
              <Button 
                colorScheme="blue" 
                size="sm" 
                onClick={handleAddProject}
              >
                Submit New Project
              </Button>
            </Box>
          )
        )}
      </Container>
      
      <Box as="footer" mt={20} py={6} borderTop="1px" borderColor={borderColor} textAlign="center">
        <Text fontSize="sm" color="gray.500">
          © 2025 Andromeda Devnet. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Page;