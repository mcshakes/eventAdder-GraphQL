# Events with GraphQL

## Objective
To learn different programming concepts and practices through a tried and true CRUD paradigm. In this case, an app where users can create events and attend (make a booking) on other users' events. 

### Current work:
**1) Reorganizing frontent (client) code to follow Presentational and Container components:** 

  Kind of like what he speaks of [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) though I appreciate that I won't be a fundamentalist about it.
  
**2) More jest testing on the front end:**

This has been painful once I am forced to mock any sort of UI responses. From looking at usage with MockedProvider, to using cypress; it's all just annoying and I understand why some dev teams would just forego testing and have QA build a separate codebase of Selenium automation.

**3) Modernize GraphQL API calls with Apollo:**

Previously, I was just calling `fetch` against the API endpoints, which works and I understand it. But, might as well follow the conventions of all the cool kids.

### Future Work:
**1) Move backend promises to async-await.**

**2) More automated tests for API on backend:**

Much easier than the front end, I can use chai, sinon, etc. Again, mocking and stubbing has been a pain.
