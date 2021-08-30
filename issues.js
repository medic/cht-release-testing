const config = require('./config'),
  octokit = require('@octokit/rest')({ headers: config.headers });


const removeExcludedLabels = (issues) => {
  return issues.filter(issue => {
    return !issue.labels.some(label => config.excludeLabels.includes(label.name.toLocaleLowerCase()));
  })
};
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
  issues = []

  try {
    var response = await octokit.issues.listForRepo(data);
    issues.push.apply(issues, response.data);
    while (octokit.hasNextPage(response)) {
      response = await octokit.getNextPage(response)
      issues.push.apply(issues, response.data);
    }
    return removeExcludedLabels(issues);
  } catch (err) {
    console.error("An error occured getting issues" + err.stack);
  };
}

function clearAssignee(owner, repo, issueIds, assignees) {
  console.log(issueIds);
  let data = {
    owner: owner,
    repo: repo,
    assignees: assignees
  };
  issueIds.forEach(num => {
    data.number = num;
    octokit.issues.removeAssignees(data);
  })
}

module.exports = {
  issues: issues,
  clearAssignee: clearAssignee
};