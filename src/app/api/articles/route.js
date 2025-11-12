import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public/data/articles.json");
    const jsonData = await fs.readFile(filePath, "utf8");
    const articles = jsonData ? JSON.parse(jsonData) : [];

    return new Response(JSON.stringify(articles), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Ошибка загрузки статей:", error.message);
    return new Response(JSON.stringify({ error: "Ошибка загрузки статей" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
