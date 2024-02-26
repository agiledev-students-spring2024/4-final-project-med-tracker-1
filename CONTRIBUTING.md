# Contributing to Med Tracker
Welcome to Med Tracker! We're excited to have you here and appreciate your interest in contributing. 
## Team values
- Teamwork: We value the importance of working together through mutual support and open communication, helping others when needed. 
- Efficiency: We value completing work in a timely manner by clearly outlining next steps and milestones.
- Creativity: We value an environment where team members are open to sharing new ideas. 
- Responsibility: We take ownership of our work and hold ourselves accountable for our contributions and commitments.

### Conflict Resolution
We agree on communicating clearly and respectfully when addressing a disagreement. 
When a team member falls behind, we agree on reaching out to them to offer assistance
Team members are expected to respond within 24 hrs. 

### Team norms
Our team will use Discord to work together and hold standup meetings
In the case members need to work in smaller groups, we will schedule meetings and update the progress in our discord channel.

### Sprint Cadence 
Sprints should be around 1-3 weeks. 

### Daily Standups
Meetings should last between 15-30 mins. 
It should take place where all four members of the team are free. 
Everyone must be present whether on Zoom/Discord or in-person. 
A Member won’t get covered by another if they don’t participate.
A Member making no progress for more than 1 meeting will be reported to management. 

### Coding standards 
Only push code that works
Make small commits for fixes and features, committing regularly
Write descriptive and clear commit messages

## Git workflow
Members will adopt a feature branching strategy, where each branch is dedicated to a specific bug, fix, or feature, to be later merged onto the main branch
Pull requests and code merged onto the main branch must be peer-evaluated. 

### Instructions for contribution
1. clone the repository locally.
    ```
    git clone https://github.com/agiledev-students-spring2024/4-final-project-med-tracker-1.git
    ```
2. Create a new branch and checkout to that branch.
    ```
    git branch <Your-branch>
    git checkout <Your-branch>
    ```
    Or create and navigate to a new branch.
    ```
    git checkout -b  <Your-branch>
    ```
3. Make changes to the code, and add the specific file changes to the staging area with
    ```   
    git add <Changed-file>
    ```
    Or add all saved changes with 
    ```
    git add .
    ```
    commit, and push them to your branch 
    ```
     git commit -m "Commit message"
     git push origin <your branch name>
    ```
4. Return to this repo and raise a pull request. 


