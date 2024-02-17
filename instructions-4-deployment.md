# Deployment

Each team must deploy their completed software applications to a [Digital Ocean Droplet](https://www.digitalocean.com/products/droplets/).

## Specific requirements

- Credentials for logging into databases, APIs, or other remote services, must never be shared in version control. They are usually stored in private settings files, such as `.env` or similar, which are not included in the version control repository.
- Each project must deploy their application front-and-back-ends using Digital Ocean. Use the Digital Ocean referral link shared by the instructor, which should grant you far more than enough credits to use Digital Ocean without cost.
- Submit a link to your front-end code live on the web, and include that link on your `README.md` document.

## Extra credit opportunities

Include a note when submitting, if you have done any of the extra credit.

- Extra credit is given to teams that have deployed to a [Docker container](https://knowledge.kitchen/content/courses/software-engineering/slides/containers/#49), although a non-containerized deployment is fine.
- Extra credit is given to teams that have a functioning [Continuous Integration](https://knowledge.kitchen/content/courses/software-engineering/slides/continuous-integration/#1) workflow, where an automation server, such as [GitHub Actions](https://github.com/features/actions), runs a build and test cycle every time a branch is pushed to GitHub or a new pull request is issued.
- Extra credit is given to teams that have a [Continuous Deployment](https://knowledge.kitchen/content/courses/software-engineering/slides/deployment/#54) setup, although a manual deployment is fine.

## Grading

Individuals will be graded, in part, according to...

- individual code contributions, as visible through [git logs](https://github.com/bloombar/git-developer-contribution-analysis) - make sure you commit your own work!
- proper adherence to the [Feature Branch git workflow](https://knowledge.kitchen/content/courses/agile-development-and-devops/slides/feature-branch-workflow/)
- the [proper setup and maintenance of a GitHub repository](./instructions-0c-project-setup.md)
- the quality of the work as a whole
