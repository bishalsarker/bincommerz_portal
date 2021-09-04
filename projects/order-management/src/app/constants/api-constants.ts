import { environment } from "projects/order-management/src/environments/environment";


export var API_HOST: string = 
    window.location.hostname.includes("localhost") ? 
    "https://localhost:5001/" : environment.api_host;

export var AUTH_HOST: string = 
    window.location.hostname.includes("localhost") ? 
    "https://localhost:5001/" : environment.auth_host;
