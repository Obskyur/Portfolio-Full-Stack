
function request(url, options = {
    method: 'GET',
    headers: {
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
    }
}) {
    return fetch(url, options).then(handleResponse);
  }
  
function handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}
  
function getStarredRepos() {
    return request('https://api.github.com/users/Obskyur/starred');
}

function getMyRepos() {
    return request('https://api.github.com/users/Obskyur/repos');
}

async function getLanguages() {
    let repos = await getMyRepos();
    repos = repos.filter(repo => repo.fork === false);
    console.log("repos: ", repos);
    const languages = new Map();
    const langURLs = repos.map(repo => repo.languages_url)
    const responses = await Promise.all(langURLs.map(url => request(url)));

    console.log("responses: ", responses);

    for (const languagesData of responses) {
        console.log("languageData: ", languagesData);
        for (const language in languagesData) {
            if (languages.has(language)) {
                languages.set(language, languages.get(language) + languagesData[language]);
            } else {
                languages.set(language, languagesData[language]);
            }
        }
    }
    const sortedLanguages = Array.from(languages.entries()).sort((a, b) => b[1] - a[1]);
    console.log("sortedLanguages: ", sortedLanguages);
    return sortedLanguages;
}

export {
    getLanguages,
}