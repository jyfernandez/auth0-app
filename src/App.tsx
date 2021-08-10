import React from "react";
import "./App.css";
import * as auth0 from "auth0-js";
import params from "./auth0-param.json";

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [response, setResponse] = React.useState();

  const webAuth = new auth0.WebAuth({
    domain: params.domain,
    clientID: params.clientID,
    audience: params.audience,
    redirectUri: params.redirectUri,
    scope: params.scope,
    responseType: params.responseType,
  });

  const submitForm = (e: any) => {
    e.preventDefault();
    webAuth.client.login(
      {
        realm: params.realm,
        username,
        password,
      },
      (err, authResult) => {
        if (err) {
          alert(err.description);
          return;
        }
        if (authResult) {
          console.log(authResult);
          setResponse(authResult);
          // window.origin = window.location.origin;
        }
      }
    );
  };
  return (
    <div className="App">
      {response ? (
        <div className="App-form">
          <p className="results">Access Token: {response!["accessToken"]}</p>
          <p className="results">Expires in: {response!["expiresIn"]}</p>
          <p className="results">ID Token: {response!["idToken"]}</p>
          <p className="results">Scope: {response!["scope"]}</p>
          <p className="results">Token Type: {response!["tokenType"]}</p>
        </div>
      ) : (
        <form className="App-form" onSubmit={submitForm}>
          <label>
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default App;
