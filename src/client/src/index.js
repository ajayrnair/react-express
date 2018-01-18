import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

class Login extends React.Component {
    render() {
        const user = this.props.user;
        return (
            user != null ?
                <div>
                    <div>
                        <img src={user.image} />
                    </div>
                    <div>
                        <span>Welcome {user.name}</span>
                        <div>
                            <a href = "/login/signout">Logout</a>
                        </div>
                    </div>
                </div>
                :
                <a href = "/login/google">
                    Login
                </a>

        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckingIfLoggedIn: true,
            loggedInUser: null
        }
    }
    componentDidMount() {
        Axios.get("/login/user")
        .then((response) => {
            const user = response && response.data && response.data.user;
            this.setState(() => {
                return {
                    isCheckingIfLoggedIn: false,
                    loggedInUser: user && user.name? user : null
                }
            });
        })
    }
    render() {
        const fetchingLoggedInInformation = this.state.isCheckingIfLoggedIn;

        return (
            <div>
                Hello React Express!
                {!fetchingLoggedInInformation &&
                    <Login
                        user = {this.state.loggedInUser}
                    />
                }
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector(".app-root")
);