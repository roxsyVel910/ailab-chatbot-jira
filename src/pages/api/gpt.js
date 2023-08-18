import OpenAI from 'openai';

export default async function handler(req, res) {
    const {prompt} = req.query;
    try {
        if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
            throw Error("OpenAI API key not configured, please follow instructions in README.md");
        }

        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });


        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt ?? 'Say this is a test' }],
            model: 'gpt-3.5-turbo',
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 0,
        });

        res.status(200).json(completion.choices[0].message);
    } catch (error) {
        res.status(500).json({error: `Error al consultar la API de Jira ${error}`});
    }

}