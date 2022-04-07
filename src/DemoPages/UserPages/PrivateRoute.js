import { Route, Redirect } from 'react-router-dom';


export { PrivateRoute };

function PrivateRoute({component: Component, details, ...rest }) {
    let dataCheck = details.hasOwnProperty('firstName')
   
    console.log("print redirect value ekta",details,dataCheck)
    return (
        <Route {...rest} render={props => {
            if (!dataCheck) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login'}} />
            }

            // authorized so return component
            return<Redirect to={{ pathname: '/dashboards'}} />
        }} />
    );
}