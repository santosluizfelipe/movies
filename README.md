# Cohire Coding Challenge (Frontend)

## Last Updated
18-06-2024

### Introduction 
Welcome! This coding challenge is designed to explore your React & SCSS frontend skills. You will have to create a simple SPA based off the provided mockup and make a few API calls to a public web API.

### The challenge
You have to complete the test and write any necessary code so that the search page looks like this [mockup]. All the images/icons you need are already imported into this repository. 

The discover page should enable the user to search for movies as keywords are typed into the search bar. Functionality for filtering does not need to be implemented, however the filter categories should still be expandable upon clicking. On mobile devices, the navigation bar should slide in from left to right when the user clicks on the hamburger icon. 

As you may have noticed, there are a few TypeScript errors that need to be fixed. Also, there are some UI bugs that you should spot and fix. If time permits, you would want to add responsive stylesheets for the app to run smoothly on mobile devices.

Movie data can be queried via: 
- [theMovieDB]

Packages & Technologies used in the repo:
- `axios`
- `node-sass`
- `react-router-dom`
- `styled-components`
- `typescript`

### Setup guide
1. Clone this repo
2. `npm i --legacy-peer-deps` to install dependencies. Node v16^ preferable

### Submission guide
Please create a git repository of your solution and send the link to your contact person once you are done.

### How we review
- **Design**: Were you able to translate the mockup into a web application that works well on various browsers and devices? Does the output match the mockup? This is the most important aspect. Weight: 50%
- **Functionality**: Does the search function work? Do the results load instantly as the user types? If the API backend has rate limiting enforced, how do you implement the aforementioned while also taking rate limiting into account? Weight: 25%
- **Code quality**: Is the code easy to understand and maintain? Is the coding style consistent with the language's best practices? Do you demonstrate a good grasp of JavaScript, especially ES6? Weight: 15%
- **Performance**: Does the UI render quickly? Are the choice of libraries etc appropriate for the web page? Weight: 10%

### Bonus points
- **Documentation** - Is the README well written? Are the commit messages clear?
- **Automated Tests** - Are there any automated frontend tests?
- **Reporting** - React Profiler report with demonstrated knowledge of reading / reporting performance data 
- **Production-readiness** - Is there proper error handling? Is the code ready to put into production? Code-Splitting?
- **Future-readiness** - React Hooks? Web workers? PWA? Client-side caching?

[mockup]: <https://cord-coding-challenges.s3-eu-west-1.amazonaws.com/frontend-test-mockups.zip>
[theMovieDB]: <https://www.themoviedb.org/documentation/api>


### Introduction
This project is a React application built with TypeScript to provide type safety and better development experience. The project leverages modern React features such as hooks, including useState, useEffect, and useContext. Styling is managed with styled-components for a clean and modular approach to CSS.


### Features
React with TypeScript: Benefit from type safety and a better development experience.
React Hooks: Use modern React hooks like useState, useEffect, and useContext for state and side-effect management.
Styled Components: Modular and scoped styling with styled-components.
Responsive Design: Ensure a great user experience across different devices and screen sizes.

### Technologies Used
- React (version 16.8.6)
- TypeScript
- Styled Components
- React Hooks


## Installation
1. Clone this repo

2. install dependencies
```
npm install
# or
yarn install

npm start
# or
yarn start
```

- This will start the application on http://localhost:3000


### Usage

## components

- SideNavBar: Navigation sidebar component that includes links and filter options.
- SearchBar: Component for the search input field.
- ExpandableFilters: Component for expandable filter options.

## State Management
- useState: Used for managing component state.
- useEffect: Used for handling side effects such as data fetching.
- useContext: Used for sharing state across components with SearchContext.

## Styling
Styled Components: CSS-in-JS approach for defining component styles.
```import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
`;

```


### API integration
The project includes integration with external APIs for fetching genres and other data. The API calls are managed in the fetcher.ts file using axios.

### Environment Variables
Store sensitive information such as API keys in a .env file at the root of your project. Example:

.enf file:
```
REACT_APP_API_KEY=your_api_key
REACT_APP_ACCESS_TOKEN=your_access_token
```