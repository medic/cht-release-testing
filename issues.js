const config = require('./config'),
  octokit = require('@octokit/rest')({ headers: config.headers });

async function issues() {
  octokit.authenticate({
    type: 'token',
    token: config.token
  });
  data = {
    owner: config.owner,
    repo: config.repoName,
    labels: config.labels,
    state: 'all'
  };
  issues = [];

  try {
    var response = await octokit.issues.listForRepo(data);
    issues.push.apply(issues, response.data);
    while (octokit.hasNextPage(response)) {
      response = await octokit.getNextPage(response);
      issues.push.apply(issues, response.data);
    }
    return issues.filter(issue => {
      return (
        !issue.labels.filter(label => {
          return label.name === config.excludeLabel;
        }).length > 0
      );
    });
  } catch (err) {
    console.error('An error occured getting issues' + err.stack);
  }
}

module.exports = issues;
