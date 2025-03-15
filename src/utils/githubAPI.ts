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

async function fetchRepos() {
  let repos;
  try {
    repos = (await getMyRepos()).filter(repo => !repo.fork);
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    return [];
  }
  return repos;
}

async function fetchLanguages(langURLs) {
  let languages;
  try {
    languages = await Promise.all(langURLs.map(url => request(url)));
  } catch (error) {
    console.error('Failed to fetch languages:', error);
    return [];
  }
  return languages;
}

function calcLanguageUsage(languagesUsed) {
  const langUsageMap = new Map();
  for (const languagesData of languagesUsed) {
    for (const langData in languagesData) {
      if (langUsageMap.has(langData)) {
        langUsageMap.set(langData, langUsageMap.get(langData) + languagesData[langData]);
      } else {
        langUsageMap.set(langData, languagesData[langData]);
      }
    }
  }
  return Array.from(langUsageMap, ([name, lines]) => ({ name, lines }));
}

async function getLanguagesPromise() {
  const repos = await fetchRepos();
  if (!repos.length) return [];

  const langURLs = repos.map(repo => repo.languages_url)
  const languagesUsed = await fetchLanguages(langURLs);
  if (!languagesUsed.length) return [];
  
  return calcLanguageUsage(languagesUsed);
}

export {
    getLanguagesPromise,
}