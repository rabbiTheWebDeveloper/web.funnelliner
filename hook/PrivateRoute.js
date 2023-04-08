import { withRouter } from "next/router";
import React from "react";
import Cookies from 'js-cookie'
const withAuth = (Component = null, options = {}) => {
    class WithAuthComponent extends React.Component {
        state = {
            pageLoading: true,
            redirectIfNotAuthenticated: options.redirectIfAuthenticated ?? "/login",
            redirectIfAuthenticated: options.redirectIfAuthenticated ?? "/",
        };

        componentDidMount() {
            const token = Cookies.get('token');
            const cookiesToken = Cookies.get('token')
            // Route is protected but not authenticated. SO redirect to loginpage
            if (options.isProtectedRoute && !cookiesToken) {
                console.log("You are going to be logged out as no token is found");
                this.props.router.replace(this.state.redirectIfNotAuthenticated);
                return null;
            }

            // Route is not protected but authenticated. So redirect to Dashboard or provided url
            if (!options.isProtectedRoute && token) {
                console.log(
                    "You are going to dashboard url as you are already authenticated"
                );
                this.props.router.replace(this.state.redirectIfAuthenticated);
                return null;
            }

            this.setState({ pageLoading: false });
        }

        render() {
            const { pageLoading } = this.state;

            if (pageLoading) {
                return "";
            }
            return <Component {...this.props} />;
        }
    }

    return withRouter(WithAuthComponent);
};

export default withAuth;