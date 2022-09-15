const loginBtn = document.getElementById('loginButton');
const emailInput = document.getElementById('emailInput');
const domainNameInput = document.getElementById('domainNameInput');
const apiKeyInput = document.getElementById('apiKeyInput');

loginBtn.addEventListener('click', async () => {
    const onEmptyFields = !emailInput.value || !domainNameInput.value || !apiKeyInput.value;
    if (onEmptyFields) alert('Please, fill all fields')

    const correctInfo = await getProjects(domainNameInput.value, emailInput.value, apiKeyInput.value)
    if (correctInfo.errorMessage) alert('Incorrect data')

    localStorage.setItem('apiKey', apiKeyInput.value)
    localStorage.setItem('domainName', domainNameInput.value)
    localStorage.setItem('email', emailInput.value)
    alert('Authorization success')
})

async function getProjects(domainName, email, apiKey) {
    try {
        return fetch(`${domainName.split('.atlassian.net')[0]}.atlassian.net/rest/api/3/project`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${btoa(`${email}:${apiKey}`)}`,
            }
        })
            .then(res => res.json())
            .then(project => project)
            .catch(e => alert('Incorrect data'))
    } catch (error) {
        alert(error)
    }
}