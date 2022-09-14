const loginButton = document.getElementById('loginButton')

loginButton.addEventListener('click', () => {
    chrome.windows.create({
        url: chrome.runtime.getURL('./pages/Login/LoginPage.html'),
        type: 'popup',
        width: 600,
        height: 600
    })
})