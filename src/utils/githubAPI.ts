'use server'

function request(url, options = {
    method: 'GET',
    headers: {
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
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

async function getLanguagesPromise() {
    let repos = await getMyRepos();
    repos = repos.filter(repo => repo.fork === false);
    const langURLs = repos.map(repo => repo.languages_url)
    const responses = await Promise.all(langURLs.map(url => request(url)));
    const languages = new Map();
    
    for (const languagesData of responses) {
        for (const language in languagesData) {
            if (languages.has(language)) {
                languages.set(language, languages.get(language) + languagesData[language]);
            } else {
                languages.set(language, languagesData[language]);
            }
        }
    }
    const sortedLanguages = Array.from(languages, ([name, lines]) => ({ name, lines }));
    return sortedLanguages;
}

export {
    getLanguagesPromise,
}