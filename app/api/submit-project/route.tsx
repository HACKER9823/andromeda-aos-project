import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, githubLink, description, keplerAddress } = await request.json();

    // Basic validation
    if (!name || !githubLink || !description || !keplerAddress) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate GitHub link format
    const githubRegex = /^https:\/\/github\.com\/.+\/.+$/;
    if (!githubRegex.test(githubLink)) {
      return NextResponse.json(
        { error: "Invalid GitHub repository link." },
        { status: 400 }
      );
    }

    // Validate Kepler address format (example: starts with "kepler")
    if (!keplerAddress.startsWith("kepler")) {
      return NextResponse.json(
        { error: "Invalid Kepler address." },
        { status: 400 }
      );
    }

    // Call Together AI API to check for spam or inappropriate content
    const togetherResponse = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        messages: [
          {
            role: "system",
            content:
              "Analyze the following project submission for spam or inappropriate content. Respond with 'valid' if it is acceptable, or 'invalid' if it contains spam or inappropriate content.",
          },
          {
            role: "user",
            content: `Project Name: ${name}\nGitHub Link: ${githubLink}\nDescription: ${description}`,
          },
        ],
        max_tokens: 10,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stop: ["<|eot_id|>", "<|eom_id|>"],
      }),
    });

    const togetherData = await togetherResponse.json();
    const aiResponse = togetherData.choices[0].message.content?.toLowerCase();

    if (aiResponse?.includes("invalid")) {
      return NextResponse.json(
        { error: "Submission contains spam or inappropriate content." },
        { status: 400 }
      );
    }

    // Add the project to the in-memory storage (replace with a database in production)
    const newProject = { name, githubLink, description, keplerAddress };
    // projects.push(newProject); // Uncomment if using in-memory storage

    return NextResponse.json(
      { message: "Project submitted successfully!", project: newProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting project:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}