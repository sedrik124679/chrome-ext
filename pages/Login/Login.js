const loginBtn = document.getElementById('loginButton');
const emailInput = document.getElementById('emailInput');
const domainNameInput = document.getElementById('domainNameInput');
const apiKeyInput = document.getElementById('apiKeyInput');

loginBtn.addEventListener('click', async () => {
    const onEmptyFields = !emailInput.value || !domainNameInput.value || !apiKeyInput.value;
    if (onEmptyFields) alert('Please, fill all fields')

    const correctInfo = await getProjects(domainNameInput.value, emailInput.value, apiKeyInput.value)
    console.log(correctInfo)
    if (correctInfo.errorMessage) alert('Incorrect data')

    localStorage.setItem('apiKey', apiKeyInput.value)
    localStorage.setItem('domainName', domainNameInput.value)
    localStorage.setItem('email', emailInput.value)
    alert('Authorization success')
})

async function getProjects(domainName, email, apiKey) {
    try {
        return fetch(`${domainName.split('.atlassian.net/')[0]}.atlassian.net/rest/api/3/project`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic c2VkcmlrMTI0Njc5QGdtYWlsLmNvbTp0WW5GeEw2QXpnSTlNUk16WXg0VDM0Qzc=`,
            }
        })
            .then(res => res.json())
            .then(project => project)
    } catch (error) {
        alert(error)
    }
}