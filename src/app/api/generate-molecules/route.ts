import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const API_KEY = process.env.NVIDIA_API_KEY;
  const invokeUrl =
    "https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate";

  try {
    const payload = await req.json();

    const response = await fetch(invokeUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const generatedMolecules = JSON.parse(data.molecules).map((mol: any) => ({
      structure: mol.sample,
      score: mol.score,
    }));

    return NextResponse.json(generatedMolecules);
  } catch (error) {
    console.error("Error generating molecules:", error);
    return NextResponse.json(
      { error: "Failed to generate molecules" },
      { status: 500 },
    );
  }
}
