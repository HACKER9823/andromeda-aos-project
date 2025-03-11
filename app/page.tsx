"use client";

import { ConnectWallet } from "@/modules/wallet";
import { Center, Image, Link, Text, VStack, Input, Button, Box } from "@chakra-ui/react";
import React, { useState } from "react";

const Page = () => {
    const [projectLink, setProjectLink] = useState("");
    const [addedProject, setAddedProject] = useState<string | null>(null);

    const handleAddProject = () => {
        if (projectLink.trim() !== "") {
            setAddedProject(projectLink);
            setProjectLink(""); // Clear input after adding
        }
    };

    return (
        <Center minH="100vh">
            <VStack spacing={4}>
                <Image src="/logo.png" w='6rem' />
                <Text fontSize="3xl" fontWeight='bold'>
                    Andromeda Next.js Starter Template
                </Text>
                <Text>
                    Click button to connect <b>Andromeda Devnet</b>.
                </Text>
                <Text fontWeight='light' mb='4'>
                    Learn more about Andromeda&nbsp;
                    <Link isExternal href="https://docs.andromedaprotocol.io" color='blue' textDecoration="underline">
                        here
                    </Link>
                </Text>
                
                <ConnectWallet />

                {/* Add Project Section */}
                <Box mt={6} w="full" textAlign="center">
                    <Text fontSize="lg" fontWeight="medium">Add Your GitHub Project</Text>
                    <Input 
                        placeholder="Enter GitHub Repo Link" 
                        value={projectLink} 
                        onChange={(e) => setProjectLink(e.target.value)} 
                        mt={2}
                    />
                    <Button mt={2} colorScheme="blue" onClick={handleAddProject}>
                        Add Project
                    </Button>

                    {/* Display Added Project */}
                    {addedProject && (
                        <Box mt={4} p={3} border="1px solid gray" borderRadius="md">
                            <Text fontSize="md">Added Project:</Text>
                            <Link isExternal href={addedProject} color="blue" textDecoration="underline">
                                {addedProject}
                            </Link>
                        </Box>
                    )}
                </Box>
            </VStack>
        </Center>
    );
};

export default Page;
