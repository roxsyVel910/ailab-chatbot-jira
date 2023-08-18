import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default async function handler(req, res) {
    // http://localhost:3000/api/issue?board=55

    const {board} = req.query;

    const apiUrl = `${process.env.NEXT_PUBLIC_JIRA_BASE_URL}/rest/agile/1.0/board/${board ?? '51'}/issue`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Authorization": `Basic ${process.env.NEXT_PUBLIC_JIRA_AUTH_TOKEN}`
        }
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        const issues = data.issues.map(issue => ({
            id: issue.id,
            key: issue.key,
            project: issue.fields?.project?.name,
            priority: issue.fields?.priority?.name,
            status: issue.fields?.status.name,
            summary: issue.fields?.summary,
            assignee: issue.fields?.assignee?.displayName,
            reporter: issue.fields?.reporter?.displayName,
            created: issue.fields?.created,
            updated: issue.fields?.updated,
            description: issue.fields?.description,
            comments: issue.fields?.comment?.comments,
            issueType: issue.fields?.issuetype?.name,
            resolution: issue.fields?.resolution?.name,
        }));

        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({error: `Error al consultar la API de Jira ${error}`});
    }
}
