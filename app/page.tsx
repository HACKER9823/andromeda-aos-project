"use client";

import { ConnectWallet } from "@/modules/wallet";
import { Center, Image, Link, Text, VStack, Input, Button, Box, Textarea } from "@chakra-ui/react";
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

    const handleAddProject = () => {
        setIsAdding(true);
    };

    const handleSaveProject = () => {
        if (projectName.trim() && githubLink.trim() && description.trim() && keplerAddress.trim()) {
            const newProject: Project = {
                name: projectName,
                githubLink,
                description,
                keplerAddress,
            };
            setProjects([...projects, newProject]); // Add new project without removing old ones
            setProjectName("");
            setGithubLink("");
            setDescription("");
            setKeplerAddress("");
            setIsAdding(false);
        }
    };

    return (
        <Center minH="100vh">
            <VStack spacing={4} w="full" maxW="500px">
                <Image src="logo.webp" w='6rem' />
                <Text>Click button to connect <b>Andromeda Devnet</b>.</Text>
                <Text fontWeight='light' mb='4'>
                    
                </Text>

                <ConnectWallet />

                <Button mt={6} colorScheme="blue" onClick={handleAddProject}>
                    Add Project
                </Button>

                {isAdding && (
                    <Box p={4} border="1px solid gray" borderRadius="md" w="full">
                        <Text fontSize="lg" fontWeight="medium">Enter Project Details</Text>
                        <Input 
                            placeholder="Project Name" 
                            value={projectName} 
                            onChange={(e) => setProjectName(e.target.value)} 
                            mt={2}
                        />
                        <Input 
                            placeholder="GitHub Repo Link" 
                            value={githubLink} 
                            onChange={(e) => setGithubLink(e.target.value)} 
                            mt={2}
                        />
                        <Textarea 
                            placeholder="Project Description / Purpose" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            mt={2}
                        />
                        <Input 
                            placeholder="Kepler Address for Funding" 
                            value={keplerAddress} 
                            onChange={(e) => setKeplerAddress(e.target.value)} 
                            mt={2}
                        />
                        <Button mt={3} colorScheme="green" onClick={handleSaveProject}>
                            Save Project
                        </Button>
                    </Box>
                )}

                {/* Display Added Projects */}
                {projects.length > 0 && (
                    <Box mt={6} w="full">
                        <Text fontSize="lg" fontWeight="bold">Added Projects</Text>
                        {projects.map((project, index) => (
                            <Box key={index} mt={4} p={3} border="1px solid gray" borderRadius="md">
                                <Text fontSize="md" fontWeight="bold">{project.name}</Text>
                                <Link isExternal href={project.githubLink} color="blue" textDecoration="underline">
                                    {project.githubLink}
                                </Link>
                                <Text mt={2}>{project.description}</Text>
                                <Text mt={2} fontWeight="bold">Kepler Address:</Text>
                                <Text>{project.keplerAddress}</Text>
                            </Box>
                        ))}
                    </Box>
                )}
            </VStack>
        </Center>
    );
};

export default Page;
