const projectDropdown = document.getElementById('projectDropdown')
const domainName = localStorage.getItem('domainName')
const email = localStorage.getItem('email')
const apiKey = localStorage.getItem('apiKey')

const state = {
    projects: []
}

function getProjects(domainName, email, apiKey) {
    try {
        return fetch(`${domainName?.split('.atlassian.net')[0]}.atlassian.net/rest/api/3/project`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${btoa(`${email}:${apiKey}`)}`,
            }
        })
            .then(res => res.json())
            .then(projects => projects)
            .catch(e => alert('Incorrect data'))
    } catch (error) {
        alert(error)
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    state.projects = await getProjects(domainName, email, apiKey)

    if(state.projects.length) {
        state.projects?.forEach(project => {
            projectDropdown.options[projectDropdown.options.length] = new Option(`${project.key} [${project.key}]`, project.id);

        })
    }
})