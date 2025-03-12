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
  Spacer
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Project {
  name: string;
  githubLink: string;
  description: string;
  keplerAddress: string;
}

const Page = () => {
  // Hardcoded initial projects
  const initialProjects: Project[] = [
    {
      name: "Token-Launchpad",
      githubLink: "https://github.com/lalitcap23/token-lauchpad.git",
      description: "An innovative platform for creating and launching custom tokens on the Solana blockchain. This project simplifies the token creation process with an intuitive interface, automated smart contract deployment, and built-in liquidity management. Designed with security and scalability in mind, Token-Launchpad enables developers and entrepreneurs to bring their token ideas to market without deep blockchain knowledge.",
      keplerAddress: "kepler16z9qn4pq8xmy7hq2qzr4yne5mglgvr7jkl29qnz"
    },
    {
      name: "Auto-Git",
      githubLink: "https://github.com/lalitcap23/Auto-git.git",
      description: "A powerful npm package that streamlines and automates Git workflows for developers. Auto-Git handles repetitive tasks like branch management, commit formatting, and merge processes through customizable templates and intelligent commands. It enforces team conventions, integrates with CI/CD pipelines, and provides detailed workflow analytics. Perfect for teams looking to standardize their Git practices and increase development efficiency.",
      keplerAddress: "kepler16y2m8vq7xtr9j4zp3f5eq8a2wnm7dlk46xsf"
    }
  ];
  
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [description, setDescription] = useState("");
  const [keplerAddress, setKeplerAddress] = useState("");
  
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue("white", "gray.800");
  const accentColor = useColorModeValue("blue.500", "blue.300");

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
    <Box minH="100vh" bg={bgColor}>
      {/* Header with Logo and Navigation */}
      <Box 
        as="header" 
        py={4} 
        px={8} 
        bg={headerBgColor} 
        position="sticky" 
        top={0} 
        zIndex={10}
        borderBottom="1px" 
        borderColor={borderColor}
        boxShadow="sm"
      >
        <Flex maxW="container.xl" mx="auto" align="center">
          <Flex align="center">
            <Image src="logo.webp" h="2.5rem" alt="Andromeda Logo" />
            <Divider orientation="vertical" h="24px" mx={4} />
            <Heading as="h1" size="md" letterSpacing="tight">
            AndroFund            </Heading>
          </Flex>
          <Spacer />
          <ConnectWallet />
        </Flex>
      </Box>

      {/* Hero Section */}
      <Box 
        bg="blue.600" 
        color="white" 
        py={12} 
        px={8} 
        backgroundImage="linear-gradient(135deg, #2a4365 0%, #3182ce 100%)"
      >
        <Container maxW="container.xl">
          <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between">
            <VStack align="flex-start" spacing={4} maxW="container.md" pr={{ md: 8 }}>
              <Heading as="h2" size="2xl" lineHeight="shorter">
                Empowering Innovation in the Andromeda Ecosystem
              </Heading>
              <Text fontSize="xl" opacity={0.9}>
                The Andromeda Open Source Funding initiative supports developers building the future of 
                decentralized applications. We provide financial resources, technical guidance, and community 
                support to projects that advance the Andromeda Devnet and expand its capabilities.
              </Text>
              <Text fontSize="md" opacity={0.8} mt={2}>
                Connect your wallet to submit a project for funding consideration or explore existing 
                projects seeking support. Together, we're building the next generation of blockchain technology.
              </Text>
              <Button 
                size="lg" 
                bg="white" 
                color="blue.600" 
                _hover={{ bg: "gray.100" }} 
                onClick={handleAddProject}
                mt={4}
              >
                Submit Your Project
              </Button>
            </VStack>
            <Box 
              display={{ base: "none", lg: "block" }} 
              bg="whiteAlpha.200" 
              p={6} 
              borderRadius="xl" 
              boxShadow="xl" 
              mt={{ base: 8, md: 0 }}
              width={{ lg: "400px" }}
            >
              <Text fontSize="lg" fontWeight="medium" mb={4}>Featured Projects</Text>
              <VStack spacing={3} align="stretch">
                {projects.slice(0, 2).map((project, idx) => (
                  <Box key={idx} p={3} bg="whiteAlpha.200" borderRadius="md">
                    <Text fontWeight="bold">{project.name}</Text>
                    <Text fontSize="sm" noOfLines={2} opacity={0.8}>
                      {project.description}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={12} px={{ base: 4, md: 8 }}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h3" size="lg">
            Current Projects
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

        <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}} gap={6}>
          {projects.map((project, index) => (
            <Card 
              key={index} 
              borderWidth="1px" 
              borderColor={borderColor} 
              shadow="sm" 
              borderRadius="md"
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{ transform: "translateY(-5px)", boxShadow: "md" }}
            >
              <CardHeader pb={1}>
                <Flex justify="space-between" align="flex-start">
                  <Heading size="md">{project.name}</Heading>
                  <Badge colorScheme="blue" variant="solid" borderRadius="full" px={2}>
                    {index < 2 ? "Active" : "Submitted"}
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody pt={1}>
                <LinkBox mt={1} mb={3}>
                  <Flex align="center">
                    <Text mr={2}>🔗</Text>
                    <LinkOverlay href={project.githubLink} isExternal color="blue.500">
                      View on GitHub
                    </LinkOverlay>
                  </Flex>
                </LinkBox>
                <Box maxH="150px" overflow="auto" mb={4}>
                  <Text fontSize="sm" color="gray.600">
                    {project.description}
                  </Text>
                </Box>
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
              <CardFooter pt={0} borderTop="1px" borderColor="gray.100">
                <Button size="sm" colorScheme="blue" variant="ghost" width="full">
                  Support Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Grid>

        {/* How It Works Section */}
        <Box mt={16} mb={12}>
          <Heading as="h3" size="lg" mb={6}>
            How It Works
          </Heading>
          <Grid templateColumns={{base: "1fr", md: "repeat(3, 1fr)"}} gap={8}>
            <Card borderRadius="lg" bg="white" shadow="md">
              <CardBody>
                <Text fontSize="xl" fontWeight="bold" color={accentColor} mb={2}>01</Text>
                <Heading size="md" mb={3}>Submit Your Project</Heading>
                <Text color="gray.600">
                  Provide details about your open source project including its purpose, 
                  GitHub repository, and a Kepler address for receiving funds.
                </Text>
              </CardBody>
            </Card>
            <Card borderRadius="lg" bg="white" shadow="md">
              <CardBody>
                <Text fontSize="xl" fontWeight="bold" color={accentColor} mb={2}>02</Text>
                <Heading size="md" mb={3}>Community Review</Heading>
                <Text color="gray.600">
                  The Andromeda community and core team will review submissions based on
                  innovation, technical merit, and potential ecosystem impact.
                </Text>
              </CardBody>
            </Card>
            <Card borderRadius="lg" bg="white" shadow="md">
              <CardBody>
                <Text fontSize="xl" fontWeight="bold" color={accentColor} mb={2}>03</Text>
                <Heading size="md" mb={3}>Receive Funding</Heading>
                <Text color="gray.600">
                  Selected projects receive funding directly to their provided Kepler address,
                  along with technical support from the Andromeda team.
                </Text>
              </CardBody>
            </Card>
          </Grid>
        </Box>
      </Container>
      
      {/* Footer */}
      <Box as="footer" py={8} borderTop="1px" borderColor={borderColor} bg={headerBgColor}>
        <Container maxW="container.xl">
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "center", md: "flex-start" }}>
            <VStack align={{ base: "center", md: "flex-start" }} mb={{ base: 6, md: 0 }}>
              <Image src="logo.webp" h="2rem" alt="Andromeda Logo" mb={2} />
              <Text fontSize="sm" color="gray.500">
                Building the future of decentralized applications
              </Text>
            </VStack>
            
            <HStack spacing={8}>
              <VStack align="flex-start">
                <Text fontWeight="bold" mb={1}>Resources</Text>
                <Link href="#" fontSize="sm" color="gray.600">Documentation</Link>
                <Link href="#" fontSize="sm" color="gray.600">GitHub</Link>
                <Link href="#" fontSize="sm" color="gray.600">Developer Portal</Link>
              </VStack>
              
              <VStack align="flex-start">
                <Text fontWeight="bold" mb={1}>Community</Text>
                <Link href="#" fontSize="sm" color="gray.600">Discord</Link>
                <Link href="#" fontSize="sm" color="gray.600">Twitter</Link>
                <Link href="#" fontSize="sm" color="gray.600">Blog</Link>
              </VStack>
            </HStack>
          </Flex>
          
          <Divider my={6} />
          
          <Flex direction={{ base: "column", sm: "row" }} justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">
              © 2025 Andromeda Devnet. All rights reserved.
            </Text>
            <HStack spacing={4} mt={{ base: 4, sm: 0 }}>
              <Link href="#" fontSize="sm" color="gray.500">Privacy Policy</Link>
              <Link href="#" fontSize="sm" color="gray.500">Terms of Service</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Page;