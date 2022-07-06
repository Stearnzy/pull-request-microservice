# Pull Request Microservice

### Gain insights on GitHub pull requests!

## Libraries & Tools Used
* Express
* Nodemon: restart server with each code change
* Dotenv: so that environment variables can be read
* Axios: to make API calls to GitHub
* Jest: testing
* Supertest
* Cors: allow for future security configuration
* Babel: allow for ES6 import/export syntax

## Setup
Ensure that `node` and `npm` are installed and up to date.
1. Run `git clone git@github.com:Stearnzy/pull-request-microservice.git` in a new directory
2. cd into `pull-request-microservice`
3. Run `npm install`
4. Run `npm test -- --coverage` to run tests with code coverage reporting

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
1. Being my first time since attending code school working with Express, my file naming and structure could be improved.  I saw there are many different approaches to file naming conventions, so I went with a template that made sense to me.
2. If this was a bigger project, I would have a more effective error logging/handling system in place.  One example would be having a logger for each of the GitHub service methods so that I could provide a more detailed error message to the user, such as if the organization or repository name that was provided does not exist.
3. Reflecting on this project, perhaps a class-oriented, OOP approach would have been a better practice for things such as route and controllers.
4. A particular style guide could be added to this project.
5. In terms of testing, I did not know how to test `app.listen` within the `index.js` file
