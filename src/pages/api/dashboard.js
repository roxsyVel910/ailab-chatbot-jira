export default async function dashboard(req, res) {
    const apiUrl = `${process.env.NEXT_PUBLIC_JIRA_BASE_URL}/rest/api/2/dashboard`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Authorization": `Basic ${process.env.NEXT_PUBLIC_JIRA_AUTH_TOKEN}`
        }
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar la API de Jira" });
    }

}