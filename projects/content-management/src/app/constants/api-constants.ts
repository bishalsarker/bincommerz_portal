import { environment } from "projects/content-management/src/environments/environment";

export var API_HOST: string = environment.api_host;
export var AUTH_HOST: string = environment.auth_host;

export var STATIC_FILES_ENDPOINT: string = 
   "https://bincommerzstaticstorage.blob.core.windows.net"
