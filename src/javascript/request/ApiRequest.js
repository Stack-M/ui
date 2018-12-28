import UriNotFoundError from "./UriNotFoundError";

class ApiRequest {
    static API_SERVER_HOST = "http://localhost:8050";

    static URIS = {
        serverStatus: {
            path: '/server/status',
            auth: false,
            vars: []
        },
        serverLibraries: {
            path: '/server/libraries',
            auth: false,
            vars: []
        },
        rootFs: {
            path: '/fs/root',
            auth: false,
            vars: []
        },
        fsTraverse: {
            path: '/fs/traverse',
            auth: false,
            vars: ['path']
        },
        setup: {
            path: '/setup',
            auth: false,
            vars: ['path', 'libraryName']
        },
        scanLibraryRoot: {
            path: '/scan/root',
            auth: false,
            vars: ['path']
        },
        scanMedia: {
            path: '/scan/media',
            auth: false,
            vars: ['path']
        },
        scanEpisodes: {
            path: '/scan/episodes',
            auth: false,
            vars: ['path', 'name']
        },
        watch: {
            path: '/watch',
            auth: false,
            vars: ['path', 'anime', 'episode']
        },
        watchSubtitle: {
            path: '/watch/subtitle',
            auth: false,
            vars: ['path', 'anime', 'episode']
        }
    };

    getRequestUri(field, vars = {}) {
        const uri = ApiRequest.URIS[field];
        let requestUri = uri.path;

        if(uri.vars.length > 0) {
            uri.vars.forEach(uriVar => {
                requestUri += `/${vars[uriVar]}`
            });
        }

        return `${ApiRequest.API_SERVER_HOST}${requestUri}`;
    }

    async get(field, vars = {}) {
        const uri = ApiRequest.URIS[field];
        let requestUri = uri.path;

        if(!uri) {
            throw new UriNotFoundError(`Cannot find field ${field} for the API.`);
        }

        if(!uri.auth) {
            if(uri.vars.length > 0) {
                uri.vars.forEach(uriVar => {
                    requestUri += `/${vars[uriVar]}`
                });
            }

            return fetch(`${ApiRequest.API_SERVER_HOST}${requestUri}`, {
                headers: {
                    "Accept": "application/json"
                }
            });
        }
    }

    async post(field, data) {
        const uri = ApiRequest.URIS[field];
        if(!uri) {
            throw new UriNotFoundError(`Cannot find field ${field} for the API.`);
        }
        
        if(!uri.auth) {
            return fetch(`${ApiRequest.API_SERVER_HOST}${uri.path}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });
        }
    }
}

export default ApiRequest;