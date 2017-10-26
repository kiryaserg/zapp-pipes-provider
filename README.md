# zapp-pipes-provider-wordpress
This repository is a [WordPress](www.wordpress.org) data source provider for [Applicaster](www.applicaster.com) Zapp Platform. 

It includes a [step by step tutorial](https://github.com/applicaster/zapp-pipes-provider-wordpress/blob/master/tutorial/provider-stepbystep.md) that will guide you how to create a new data source provider for Zapp.

### Installing
1. Clone this repo;
2. Navigate to the project folder;
3. Run `npm install`;

## Running the tests
We're using [https://github.com/avajs/ava](AVA) as our test runner.
Tests should be placed in the `test` folder which is following project folder structure.

## Deployment
Provider is an npm package which is part of our applicaster private npm account 

### Deploying to npm
1. Change version number inside `package.json`
2. Build bundle: `npm run build`;
2. Publish bundle to npm `npm publish`.

### Updating plugin-manifest
1. Install zappifest if you don't have it yet. [https://github.com/applicaster/zappifest](Instllation instructions)
2. Update npm package version number inside `plugin-manifest.json` file. `dependency_version: x.x.xx`
3. run `zappifest publish --plugin-id 781 --manifest plugin-manifest.json --access-token yourAccessToken`

## Development
### Testing locally in the browser
In order to test provider locally in the browser, please go to this repo and read README file
[https://github.com/applicaster/zapp-pipes-provider-starter-kit](zapp-pipes-provider-starter-kit)