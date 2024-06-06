import fs from "fs";
import path from "path";

export async function GET(request) {
  // Handle GET request to fetch tasks
  const tasksFilePath = path.join(process.cwd(), "tasks.json");
  if (fs.existsSync(tasksFilePath)) {
    const tasksData = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(tasksData);
    return new Response(JSON.stringify(tasks), { status: 200 });
  } else {
    return new Response(JSON.stringify([]), { status: 200 });
  }
}

export async function POST(request) {
  // Handle POST request to save tasks
  const tasksFilePath = path.join(process.cwd(), "tasks.json");
  const tasks = await request.json();
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks), "utf8");
  return new Response(JSON.stringify({ message: "Tasks saved successfully" }), {
    status: 200,
  });
}
