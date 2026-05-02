function getGitUserName() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args[0].trim() === "") {
        console.log('Please input a username');
        process.exit(1);
    }

    return args[0];
}

function parseEvents(userEvents) {
    if (userEvents.length === 0) {
        console.log(`\nNo recent events from user '${userEvents[0].actor.login}'`);
        return;
    }

    console.log(`\nMost recent events from user '${userEvents[0].actor.login}':`);
    for (const event of userEvents) {
        switch (event.type) {
            case "CommitCommentEvent":
                console.log(`- commented a commit from ${event.repo.name}`);
                break;
            case "CreateEvent":
                console.log(`- created a ${event.payload.ref_type} for ${event.repo.name}`);
                break;
            case "DeleteEvent":
                console.log(`- deleted a ${event.payload.ref_type} from ${event.repo.name}`);
                break;
            case "DiscussionEvent":
                console.log(`- started a discussion for ${event.repo.name}`);
                break;
            case "ForkEvent":
                console.log(`- ${event.payload.action} ${event.repo.name}`);
                break;
            case "GollumEvent":
                console.log(`- create/edited a wikipage`);
                break;
            case "IssueCommentEvent":
                console.log(`- commenting an issue on ${event.repo.name}`);
                break;
            case "IssuesEvent":
                console.log(`- opened an issue in ${event.repo.name}`);
                break;
            case "MemberEvent":
                console.log(`- added a user as one of repository collaborators`);
                break;
            case "PublicEvent":
                console.log(`- ${event.repo.name} repository now publicly accessible`);
                break;
            case "PullRequestEvent":
                console.log(`- requested a pull request on ${event.repo.name}`);
                break;
            case "PullRequestReviewEvent":
                console.log(`- added a pull request review on ${event.repo.name}`);
                break;
            case "PullRequestReviewCommentEvent":
                console.log(`- added a comment for pull request review on ${event.repo.name}`);
                break;
            case "PushEvent":
                console.log(`- pushed commits for ${event.repo.name}`);
                break;
            case "ReleaseEvent":
                console.log(`- published a release for ${event.repo.name}`);
                break;
            case "WatchEvent":
                console.log(`- starred ${event.repo.name}`);
                break;
        };
    };
}

async function getGitUserEvents(username) {
    const url = `https://api.github.com/users/${username}/events`;
    
    const response = await fetch(url,{
        headers: {
            "User-Agent": "backend/learning-fetch",
            "Accept": "application/vnd.github+json",
        }
    });

    if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

async function run() {
    const username = getGitUserName();
    const userEvents = await getGitUserEvents(username);
    parseEvents(userEvents);
}

run().catch(err => {
    console.error(err.message);
    process.exit(1);
});