import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default async function handler(req, res) {
    const apiUrl = `${process.env.NEXT_PUBLIC_JIRA_BASE_URL}/rest/api/2/project`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Authorization": `Basic ${process.env.NEXT_PUBLIC_JIRA_AUTH_TOKEN}`
        }
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        const projects = data.projects.map(project => ({
            id: project.id,
            key: project.key,
            name: project.name,
            projectTypeKey: project.projectTypeKey,
            
        }))
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar la API de Jira" });
    }
}
