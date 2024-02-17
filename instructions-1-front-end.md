# Front-End Development

Each team must have completed and [demo'd](https://knowledge.kitchen/content/courses/agile-development-and-devops/slides/scrum/#91) the working front-end of their group project by the end of the corresponding Sprint.

## Technical requirements

The following requirements outline what must be, must not be, and may be done during the front-end development sprint.

### Musts...

- All front-end code must be generated using React.js.
- All component definitions must be written as **functions**, not as classes.
- All component content must be written using **JSX**, not only plain Javascript.
- Front-end screens must be custom-designed to look clean, contemporary, and sharp, not like a wireframe.
- Any user-generated images that will be displayed by your app must be temporarily mocked with a random image API service, such as [Picsum](https://picsum.photos/).
- Front-ends must include all screens in the completed application and should closely match the clickable prototypes created previously, unless the team believes an alternate user experience is beneficial.
- Ay mismatch between the clickable prototypes and the front-end app code delivered must be explained during the stakeholder demo.
- Any front-end dynamic functionality, such as buttons that change something on the screen when clicked, or search fields that filter results as they are typed into, must be implemented in the front-end.
- If your app will eventually have user registration and login functionality, all front-end screens to support this must be created, although they can be non-functional for now.
- Instructions on how to set up and run the project must be included in the `README.md` file in version control. It must be possible for anybody to follow the instructions on the `README.md` to build and run the entire project on their local machines.

### May...

- You **may** use [React Context](https://react.dev/learn/passing-data-deeply-with-context) for sharing state among multiple components.
- You **may** use the front-end framework, [Tailwind](https://tailwindcss.com/) to streamline your CSS styling.
- You **may** use [mockaroo](https://mockaroo.com/mock_apis), [picsum](https://picsum.photos/) and [other mocking/faking tools](https://www.npmjs.com/search?q=fake%20data) to mock any data that will eventually come from your application's back-end or other external source.

### Must nots...

- You **must not** any 3rd-party state manager tools, such as [Redux](https://react-redux.js.org/) or [Mobx](https://mobx.js.org/README.html#introduction)
- You **must not** use [next.js](https://nextjs.org/) or any other server-side rendering framework.
- You **must not** use the front-end frameworks [Material UI](https://material-ui.com/) or [Bootstrap](https://react-bootstrap.github.io/).
- You **must not** hard-code any data in your front-end code that will eventually be provided by your application's back-end or other external source.

## Grading

Individuals will be graded, in part, according to...

- individual code contributions, as visible through git logs - make sure you commit your own work!
- proper adherence to the [Feature Branch git workflow](https://knowledge.kitchen/content/courses/agile-development-and-devops/slides/feature-branch-workflow/)
- the [proper setup and maintenance of a GitHub repository](./instructions-0c-project-setup.md)
- the quality of the work as a whole
