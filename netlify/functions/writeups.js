const GITHUB_API = 'https://api.github.com';

function config() {
  return {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER || 'Oso00Luffy',
    repo: process.env.GITHUB_REPO || 'portofolio',
    branch: process.env.GITHUB_BRANCH || 'main',
    adminKey: process.env.WRITEUPS_ADMIN_KEY
  };
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(body)
  };
}

async function githubRequest(path, options = {}) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config().token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { message: text };
  }
  if (!response.ok) {
    const error = new Error(body?.message || `GitHub request failed with ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return body;
}

async function readWriteups() {
  try {
    const file = await githubRequest(`/repos/${config().owner}/${config().repo}/contents/data/writeups.json?ref=${encodeURIComponent(config().branch)}`);
    return {
      posts: JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')),
      sha: file.sha
    };
  } catch (error) {
    if (error.status === 404) return { posts: [], sha: null };
    throw error;
  }
}

exports.handler = async (event) => {
  const settings = config();
  if (!settings.token) return json(500, { error: 'GITHUB_TOKEN is not configured in Netlify.' });

  try {
    if (event.httpMethod === 'GET') {
      const { posts } = await readWriteups();
      return json(200, { posts });
    }

    if (event.httpMethod !== 'POST') {
      return json(405, { error: 'Method not allowed.' });
    }

    const body = JSON.parse(event.body || '{}');
    if (!settings.adminKey || body.password !== settings.adminKey) {
      return json(401, { error: 'Invalid publishing credentials.' });
    }
    if (!Array.isArray(body.posts)) {
      return json(400, { error: 'Posts must be an array.' });
    }

    const current = await readWriteups();
    const content = Buffer.from(`${JSON.stringify(body.posts, null, 2)}\n`, 'utf8').toString('base64');
    const commit = await githubRequest(`/repos/${settings.owner}/${settings.repo}/contents/data/writeups.json`, {
      method: 'PUT',
      body: JSON.stringify({
        message: body.message || 'Update portfolio writeups',
        content,
        branch: settings.branch,
        ...(current.sha ? { sha: current.sha } : {})
      })
    });

    return json(200, { ok: true, commit: commit.commit?.sha || null });
  } catch (error) {
    console.error('Writeup publishing failed:', error);
    return json(500, { error: error.message || 'Unable to publish writeups.' });
  }
};
