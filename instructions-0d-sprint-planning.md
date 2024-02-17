# Sprint Planning

Scrum follows a specific process by which teams plan the work that will be done in a given sprint.

## Creating the Sprint Backlog

Each team will hold a [Sprint Planning session](https://knowledge.kitchen/content/courses/agile-development-and-devops/slides/scrum/#71) to decide which User Stories from the Product Backlog to include in the Sprint Backlog for the upcoming sprint. The team must follow the established procedure for holding sprint planning sessions.

### Elaborating the User Stories

Each User Story added to the Sprint Backlog must...

- follow the basic requirements for User Stories
- be assigned the `Sprint N` Milestone, where `N` is the number of the current sprint, in GitHub's Issue tracker

User stories may optionally also...

- include [Acceptance Criteria](https://knowledge.kitchen/content/courses/agile-development-and-devops/slides/scrum/#61) included in it [as a checklist](GitHub_for_team_collaboration#Creating_a_new_issue)
- include an Estimation of Effort, which teams calculate following the Planning Poker effort estimation processes

### Breaking User Stories into Tasks

Once the team has selected User Stories to include in the Sprint Backlog, the team must then create the individual Tasks and Spikes that are necessary to implement each the User Story.

A Task is the smallest unit of work. Together, the Tasks related to a single User Story are those things that must be done to complete the implementation of that User Story.

Tasks should typically be doable by, at most, one person in one day. But in a class setting, we will define Tasks as completable by at most one person between one Standup meeting and the next.

Each task must...

- be made its own Issue in GitHub's Issue tracker
- be assigned the '`Sprint N`' milestone, where `N` is the number of the current sprint.
- be labeled with the '`task`' label to differentiate it within GitHub's Issue tracker from '`user story`' Issues
- include in its initial description the Issue number of the User Story from which it was derived, e.g. `Related to user story #22`

### Spiking the backlog

This initial product backlog must include '`spikes`' for investigating which technologies to use for the project as well as setting up each team member's local development environment. Spikes follow the same guidelines as Spikes, except that they are not directly related to any one user story, but rather represent general work that must be done irrespective of any given user story.

- These spikes are highest priority and must be completed as soon as possible during the Sprint.

Spikes must be given the '`spike`' label and the '`Sprint N`' milestone, where `N` is the number of the current sprint, in GitHub's issue tracker

### Planning poker cards

Each team must agree on a way of estimating work. This can be any of the work estimation methods that we have discussed.

If a team chooses to go with the Planning Poker estimation method, the team must agree upon a deck of cards that they like and will use for work estimation

- it's ok to design your own cards if you have visually or conceptually creative team members
- it is not ok to use Planning Poker software in place of physical cards - doing so goes against the raison d'être of Scrum
- create a Spike for this task in GitHub's Issue tracker, by creating an Issue with the labels, 'spike' and the milestone 'Sprint N', where N is the number of the current sprint.
- assign this GitHub issue to one of the team members

### Setting up the task board

Each team will maintain a shared Task Board for each Sprint [using GitHub's Project Board functionality in the recommended fashion](https://knowledge.kitchen/content/courses/agile-development-and-devops/scrum/github-project-management). These boards are available under the '`Projects`' tab in GitHub - you will have to set up the Sprint task board in recommended fashion.

- Add all User Stories to be addressed during the Sprint into a "`Sprint N - Backlog`" table view.
- Add all Tasks and Spikes for each User Story into the "`To Do`" column of a `Sprint N - Task Board` board view.

Once you start working on tasks, you will move them to the other columns depending on their current status.
