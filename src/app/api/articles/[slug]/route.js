import fs from "fs/promises";
import path from "path";

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export async function GET(req, { params }) {
  try {
    const { slug } = params;
    const filePath = path.join(
      process.cwd(),
      "public/data/articles_content.json"
    );
    const jsonData = await fs.readFile(filePath, "utf8");
    const articles = JSON.parse(jsonData);

    const article = articles.find(
      (article) => createSlug(article.title) === slug
    );

    if (!article) {
      return new Response(JSON.stringify({ error: "Статья не найдена" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify(article), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Ошибка загрузки статьи:", error.message);
    return new Response(JSON.stringify({ error: "Ошибка загрузки статьи" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
