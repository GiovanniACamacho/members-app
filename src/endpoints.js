import { environment as env } from './environment';

/**
 * API Endpoints
 */
export const endpoints = {
    membersUrl: `${env.clerkApi}/Members/v1/`,
    votesUrl: `${env.clerkApi}/Votes/v1/?$filter=superEvent/superEvent/congressNum%20eq%20%27116%27`
};
