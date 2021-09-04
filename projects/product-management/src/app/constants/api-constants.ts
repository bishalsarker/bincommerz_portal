import { environment } from "projects/product-management/src/environments/environment";

export var API_HOST: string = 
    window.location.hostname.includes("localhost") ? 
    "https://localhost:5001/" : environment.api_host;

export var AUTH_HOST: string = 
    window.location.hostname.includes("localhost") ? 
    "https://localhost:5001/" : environment.auth_host;


export var STATIC_FILES_ENDPOINT: string = 
   "https://bincommerzstaticstorage.blob.core.windows.net"
