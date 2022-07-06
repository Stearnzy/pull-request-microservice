# Pull Request Microservice

### Gain insights on GitHub pull requests!

## Libraries & Tools Used
* Express
* Nodemon: restart server with each code change
* Dotenv: so that environment variables can be read
* Axios: to make API calls to GitHub
* Jest: testing
* Supertest
* Cors: allow for future security configuration (not configured)
* Babel: allow for ES6 import/export syntax

## Setup
Ensure that `node` and `npm` are installed and up to date. Also use a GitHub account to create a new personal access token to add to a `.env` file so that successful GitHub API requests can be made.  No need to define a particular scope for the token.

1. Run `git clone git@github.com:Stearnzy/pull-request-microservice.git` in a new directory
2. `cd` into `pull-request-microservice`
3. `touch` a `.env` file at the project's root and add `PORT=<desiredPortNumber>` and `GITHUB_ACCESS_TOKEN=<yourGHAccessToken>`
4. Run `npm install`
5. Run `npm test -- --coverage` to run tests with code coverage reporting
6. Start server with `npm start` and start hitting endpoints!  The endpoint is structured as follows:
```
http://localhost:5000/api/github/:organization/:repository/open-pull-requests
```

### Decisions
1. ES6 imports syntax for a more modern application.
2. Chose a funcitonal path instead of a class-oriented path due to my previous experience working in Hapi.js, with our API structured in more of a functional way.
3. Though not necessary to call the GitHub endpoints for the necessary data for this task, I decided to add Authorization headers to the GitHub service methods to prevent rate limiting.

### Wins
* This was my first time testing with Jest.
  * Learned about using mock functions and using them in place of functions nested within the current function to test (see the test for [collectOpenPullRequestGeneralData](./src/helpers/collectOpenPullRequestGeneralData.test.js) utilizing `jest.mock('../services/getOpenPullRequests.js');` to use the mock [getOpenPullRequests](./src/services/__mocks__/getOpenPullRequests.js) function nested within the `collectOpenPullRequestGeneralData` function).
  * Was able to test solely on mocked data, including integration tests
  * Project has high code coverage percentage
* Scalability: Utilized a recursive function to iterate through pages of pull requests (in the event that there were more than 100) to ensure all pull requests for a repository are returned.

### Places to Improve
1. Being my first time using Express since my brief interaction with it at Turing, my file naming and structure could be improved.  I saw there are many different approaches to file naming conventions, so I went with a template that made sense to me.
2. If this was a bigger project, I would have a more effective error logging/handling system in place.  One example would be having a logger for each of the GitHub service methods so that I could provide a more detailed error message to the user, such as if the organization or repository name that was provided does not exist.
3. Reflecting on this project, perhaps a class-oriented, OOP approach may have had benefits over the functional style I chose.  Perhaps naming conventions such as for route and controllers could have been improved by this.
4. A particular style guide could be added to this project.
5. In terms of testing, I did not know how to test `app.listen` within the `index.js` file, so I would add that in the future once I figured out how.  As in most cases, more edge case testing is always better, but I wanted to focus on demonstrating mocking with Jest and accounting for multiple-page responses from the GitHub API, while providing happy-path unit and integration tests.

Thank you so much for seeing my work!
