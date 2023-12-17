import { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";



export const ErrorPage: FunctionComponent = () => {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Сожалеем, но страница не найдена</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}