import * as core from '@actions/core'
const { Octokit } = require("@octokit/action");
// import {wait} from './wait'

async function run(): Promise<void> {
  try {
    console.log('Hello world!');
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}


async function run2(): Promise<void> {
  try {

    // if token is github token and organization isn't the current org, throw an error







    const copilotOrganization: string = core.getInput('organization') || (process.env.GITHUB_REPOSITORY || '').split('/')[0];
    core.debug(`Organization: ${copilotOrganization}`);

    const currentOrganization: string = (process.env.GITHUB_REPOSITORY || '').split('/')[0];

    const daysToDeallocate: number = parseInt(core.getInput('daysToDeallocate'));
    core.debug(`Days to deallocate: ${daysToDeallocate}`);

    
    // if (process.env.GITHUB_TOKEN && copilotOrganization != currentOrganization) {
    //   throw new Error('If using GitHub Token, organization must be the same as the current repository');
    // }

    const octokit = new Octokit();

    const {data} = await octokit.request('GET /organizations/{org}/copilot/billing', {
      org: 'octodemo',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    console.log(data);


    // const ms: string = core.getInput('milliseconds')
    // core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString())

    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
