# Search for Kits

This app assists customers in finding tracking numbers for a kit's label ID.

## Overview

Customers receive a kit with tubes inside it, which the customer uses to collect samples, and later sends the kit back to the lab. Each kit has a label on it with a unique kit identifier and FedEx tracking number.

The interface is simple there is a single input where a customer can type in a label ID, and they will receive a filtered list of results matching the beginning of that label ID. 

## Development

### Architecture

This repository contains two projects: api and client. The api is an Express.js server app that serves up a single API endpoint and the client is a React app based on Create React App that is the UI component.

The Express API app loads [KITS_SHIPPING_DATA.json](api/KITS_SHIPPING_DATA.json) into memory when it starts up. 

The React Client app calls the API after the user types in the first three characters and retrieves a list of results. It then caches those results on the frontend to do further filtering. This reduces the number of API calls. If the number of characters goes back under three than the results are removed and the client issues another API call. 

### Setting up the projects

From each of the directories: root, api, client run `npm ci` to install dependencies.

### Running

You can run the API app from the `api` directory with `node app.js`. It runs on port 5000. 

You can run the Client app from the `client` directory with `npm start`. It runs on port 3000 and proxies requests to "/api" to http://localhost:5000 (the API app).


### Testing

You can run the API tests from the `api` directory with `node --experimental-vm-modules node_modules/jest/bin/jest.js`.

You can run the Client tests from the `client` directory with `npm test`.

## Thoughts

The last time I wrote Javascript was about 6 years ago. At that time our front-end application was based on jQuery and Django Templates. Shortly after becoming the team lead we decided to move from jQuery to React / Redux and GraphQL. So I was familiar with all of these concepts in principle, but not in practice. Our backend with Django on a Python framework, so I had no experience with Node. 

I hope this gives some context on this assignment. In particular, I didn't really know how to structure both the server app and the client app in the same project, so I split them up. 

I'm a big proponent of Test Driven Development and I succeeded at doing it in the API app, but with the API app I struggled to find a good, simple mocking framework for the Client app. I wanted to mock at the http layer, but [msw](https://mswjs.io) was tough to get setup and [nock](https://github.com/nock/nock) didn't work with Fetch API. All the other mocking basically monkey patched functions at the app layer, which I wasn't really into. 

I didn't quite get the autocomplete working how I wanted to (i.e. like a traditional autocomplete), because I ran out of time. I had already spent so much time struggling with simple things like importing modules, figuring out what mocking library to use, and my general lack of practical experience with Node.js and React.

The assignment also asked us to build it for scale. The way that I approach scale is to first measure the performance of the app. Then simulate increased load to see where it fails. Once the failure points are identified they can then be architected for scale. In my experience doing it before measuring the performance tends to lead to apps that are over-engineered-in-the-wrong-places. That being said, an area to watch out for is loading the ever-growing JSON file into memory. Deciding on the strategy for mitigating it depends on a lot of things. For example, is there a way we can periodically cull the file? To customers need to see their tracking number after, say, 3 months? We could also probably partition the data according to label_id using the first three characters and load with each API call. Again, it's unclear without measuring this would be helpful.

A note on code documentation. My personal preference is to avoid it whenever possible. I've found that it's often out of date. It's far better to name variables, functions, etc. descriptively and refactor hard-to-understand code into smaller functions with clear names. I am, however, a big proponent of well-written documentation that lives outside the code.