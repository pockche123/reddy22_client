# Floro App

The Floro App is a front-end application that leverages the Floro API to allow for:

- The completion of recycling quizzes
- The viewing, creation and deletion of normal posts
  - Posts can only be deleted by an admin or the post author
- The viewing, creation, updating and deletion of community posts
  - Community posts can only be made by council members, where all users can update the number of enrolls assigned to a specific community post

## Setup

1. Clone the repository and `cd` into the `api` directory:

   ```sh
   git clone git@github.com:pockche123/reddy22_client.git && cd reddy22_client
   ```

2. Install required `npm` dependencies:

   ```sh
   npm install #install dependencies from package.json
   ```

3. Run the application with:

   ```sh
   npm run dev #live-server listens for file changes
   ```

## Technologies

- JavaScript
- HTML
- CSS

## Process

- Started by constructing user stories, which allowed for ERDs to be constructed to ensure all the data modelling required was catered for
- Began constructing SQL tables with simple abstractions of Users, Posts, Bins and Materials, where models, controllers, routers were implemented to be able to interact with the database data
- Tests were then created on these simple abstractions, ensuring that the implemented logic was sound, where with every expansion of the codebase, tests would then be added to ensure solidity in production
- The User and Post tables were then expanded upon, incorporating Tokens to ensure only logged in users could see posts
- Admin and Council Member boolean flags were added into the User table, implementing roles in a simplistic manner
- The Community Post boolean flag was added to the Post table, as to separate between normal posts and community posts, where the `enrolls` column was added to monitor the number of users interested in a specific event
- A final round of testing was carried out to ensure a high level of test coverage was met (93.37%)

## Wins & Challenges

### Wins

- Managed to implement all of the intended functionalities (posts, community posts withb enrolls, bins and materials info)
- Learned how to thoroughly test the API with unit and integration tests using Jest
- Managed to properly implement user roles (isAdmin, isCouncilMember), where they can carry out privileged actions (deleting any post, creating community posts)
- Ensured there were no bugs at all in the running of the API, with all routes being functional

### Challenges

- Extending upon the initial framework for Users and Posts, where this caused repetitive bugs within models and controllers, leading to a considerable debugging step being required
- Implementing the enroll system in a manner that would be deliverable within the project timelines, even if it meant carving out a simplified abstraction for the MVP

## Future Features

- Creating an Enrolls table where a reference would be made to the specific user and community post that was enrolled to, where this would properly persist enrolment data
- Adding a Likes table specifically for normal posts, where this would function similarly to the completely realised Enrolls table, allowing users to see which posts are getting interacted with the most
