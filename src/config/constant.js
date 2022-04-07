//type's of api's
export const GET = 'get';
export const POST = 'post';

// User auth API'S
export const LOGIN = '/api/v1/auth/login/user';
export const COMPANYDETAILS = '/api/v1/access/user';


// report API'S
export const RETURN_ANLYSIS = '/api/v1/returns_analysis';
export const RETURN_FILTER = '/api/v1/filter_analysis';

// inventory API'S
export const INVENTORY_AGEING = '/api/v1/inventory_ageing_analysis';
export const INVENTORY_AGEING_AVG = '/api/v1/inventory_ageing_ageband_analysis';
export const INVENTORY_AGEING_AVG_AGE = '/api/v1/inventory_ageing_avg_age';
export const INVENTORY_AGEING_TREND = '/api/v1/inventory_ageing_trend';
export const INVENTORY_AGEING_ASSOCIATE_COST = '/api/v1/inventory_ageing_associated_costs';
export const INVENTORY_FILTER = '/api/v1/inventory_ageing_filter_analysis';


//Admin
export const ADD_COMPANY = '/api/v1/add/company';
// export const DELETE_COMPANY = '/api/v1/delete/company';



// export const getReturnAnlysisFilter = (companyId,filters='') => `${RETURN_ANLYSIS}?companyid=${companyId}${filters==''?'':`&${filters}`}` 