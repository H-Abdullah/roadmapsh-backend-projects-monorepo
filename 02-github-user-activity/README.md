
## GITHUB USER ACTIVITY API
This is a simple API that can fetch latest activity from any GitHub user. This script uses GitHub REST API that can be found [here](https://docs.github.com/en/rest/activity/events?apiVersion=2026-03-10). Be mindful when using this script to prevent yourself from get blocked or even IP-banned. There are more better GitHub Event API other than this(obviously..duh). This is just my attempt to make myself an API and learn something from it.

## PREREQUISITES
- Node version 18.9.1 (i tested on this version)
- Linux terminal (tested in linux only)

## HOW TO INSTALL
Copy this repo into your system by using git clone
```shell 
    git clone https://github.com/H-Abdullah/roadmapsh-backend-projects-monorepo
```

## HOW TO USE
In order to use the API, follow the steps below:
1. Open a terminal at the root of the cloned repo then type:
```shell
    cd 02-github-user-activity
```
2. You will find the API inside the directory then you make it executeable by using below command:
```shell
    chmod +x ./user-activity-api.js
```
3. You can start using the api by running the command below:
```shell
    node user-activity-api.js <enter-valid-username-here>
```

## FEATURES
What does this API provides:
- It does filtering all events and present it visually as list

## CONTRIBUTIONS
Nah, this is just my newbie attempt to learn programming and to make simple project. No need. In fact, im suggesting you not even use or clone this repo.

## PROJECT SOURCE
This is a project from [Roadmap](https://www.roadmap.sh). Click this [link](https://roadmap.sh/projects/github-user-activity) to checkout the project