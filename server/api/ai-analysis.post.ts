import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const client = new OpenAI({
        apiKey: process.env.VITE_KOLOSAL_API_KEY,
        baseURL: 'https://api.kolosal.ai/v1'
    })

    try {
        const completion = await client.chat.completions.create({
            model: 'GLM 4.6',
            messages: [
                {
                    role: 'user',
                    content: body.prompt
                }
            ]
        })

        const aiResponse = completion.choices[0]?.message?.content
        if (!aiResponse) {
            throw new Error("Respons AI kosong")
        }

        const cleanJson = aiResponse.replace(/```json|```/g, '').trim()
        const jsonMatch = cleanJson.match(/\{[\s\S]*\}/)

        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        } else {
            throw new Error("Format JSON tidak ditemukan")
        }
    } catch (error) {
        console.error('AI Analysis Error:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to get AI analysis'
        })
    }
})