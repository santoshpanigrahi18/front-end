import Environments from './environments.json';
export const defaultEnvironments = 'development'

export const getBaseUrl = () => {
    switch (defaultEnvironments) {
        case 'local':
          return Environments.local.BASE_URL;
            break;
        case 'development':
            return Environments.development.BASE_URL;
        break; 
        case 'production':
            return Environments.production.BASE_URL;
            break;
        default:
            break;
    }
}