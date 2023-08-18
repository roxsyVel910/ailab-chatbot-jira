export default async function Dashboard(req, res) {
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
        const dashboards = data.dashboards.map(dashboard =>({
            id: dashboard.id,
            name: dashboard.name,
            owner: dashboard.owner.displayName,
            url: dashboard.view,
            project: dashboard.sharePermissions?.project?.name || 'Sin proyecto',
        }))
        res.status(200).json(dashboards);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar la API de Jira" });
    }

}