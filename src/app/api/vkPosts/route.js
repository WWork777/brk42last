import { revalidatePath } from 'next/cache';

export async function GET(req) {
    const groupId = "-223497651"; // ID группы ВКонтакте
    const accessToken = process.env.VK_ACCESS_TOKEN; // Токен доступа из .env

    if (!accessToken) {
        return new Response(JSON.stringify({ error: "Отсутствует VK_ACCESS_TOKEN в .env" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        revalidatePath('/api/vkPosts');
        const response = await fetch(
            `https://api.vk.com/method/wall.get?owner_id=${groupId}&count=5&access_token=${accessToken}&v=5.131`
        );

        

        if (!response.ok) {
            throw new Error(`Ошибка API VK: ${response.status}`);
        }

        const data = await response.json(); 
        

        if (data.error) {
            throw new Error(`VK API Error: ${data.error.error_msg}`);
        }

        revalidatePath(data);

        // Добавляем заголовки для отключения кэширования
        return new Response(JSON.stringify(data.response.items), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });
    } catch (error) {
        console.error("Ошибка при запросе к VK API:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

