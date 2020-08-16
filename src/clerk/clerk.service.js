import { endpoints } from '../endpoints';
import { environment } from '../environment';

export class ClerkService {

    // The key needed to access the Clerk API
    API_KEY = environment.API_KEY;

    /**
     * Encode the url params
     * @param data - data to pass to the API that needs to be encoded
     * @returns {string}
     */
    buildUrlParams(data = {}) {
        const keys = Object.keys(data);
        const urlParams = keys.map(key => `${key}=${encodeURI(data[key])}`);
        return urlParams.join('&');
    }

    /**
     * Fetch the list of members
     * @params data - optional query parameters
     * @returns {any}
     */
    async getMembers(data = {}) {
        const { membersUrl } = endpoints;
        const urlParams = this.buildUrlParams(data);
        const response = await fetch(`${membersUrl}/?key=${this.API_KEY}&${urlParams}`);
        return response.json();
    }

    /**
     * Get a member by id
     * @params {string} - member id
     * @returns {any}
     */
    async getMemberDetails(id) {
        const { membersUrl } = endpoints;
        const urlParams = `$filter=_id eq '${id}'`;
        const response = await fetch(`${membersUrl}/?key=${this.API_KEY}&${urlParams}`);
        return response.json();
    }

    /**
     * Fetch the vote information
     * @returns {any}
     */
    async getMembersVoteInfo() {
        const { votesUrl } = endpoints;
        const response = await fetch(`${votesUrl}&key=${this.API_KEY}`);
        return response.json();
    }
}
