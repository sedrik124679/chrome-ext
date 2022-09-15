const loginButton = document.getElementById('loginButton')
const loginTitle = document.getElementById('loginTitle')
const loginDescr = document.getElementById('loginDescr')
const createIssueButton = document.getElementById('createIssueButton')

if (localStorage.getItem('apiKey')) {
    loginTitle.innerHTML = `Exit`
    loginDescr.innerHTML = `Exit from your Jira account`
}

createIssueButton.addEventListener('click', () => {
    chrome.windows.create({
        url: chrome.runtime.getURL('./pages/CreateIssuePage/CreateIssuePage.html'),
        type: 'popup',
        width: 600,
        height: 600
    })
})

loginButton.addEventListener('click', () => {
    if (!localStorage.getItem('apiKey')) {
        chrome.windows.create({
            url: chrome.runtime.getURL('./pages/Login/LoginPage.html'),
            type: 'popup',
            width: 600,
            height: 600
        })
    } else {
        localStorage.removeItem('apiKey')
        localStorage.removeItem('domainName')
        localStorage.removeItem('email')
    }
})

