import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom";
import { getAccessToken, setAccessToken } from "./accessToken";
import { App } from "./App";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField : 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAccessToken()

        if(!token) {
          console.log(token)
          return true
        }

        try {
          const data = jwtDecode(token) as any
          const exp = data.exp
          console.log(data)
          if(Date.now() >= exp * 1000){
            console.log('NOT EXPIRED')
            return false
          } else {
            console.log(' EXPIRED')
            return true
          }
        } catch  {
          console.log('CATCH FAILED')
          return false
        }
      },
      fetchAccessToken: () => {
        return  fetch("http://localhost:5000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: accessToken => {
       setAccessToken(accessToken);
      },
      handleError: err => {
         // full control over handling token fetch Error
         console.warn('Your refresh token is invalid. Try to relogin');
         console.error(err);
      }
    }),
    authLink,
    httpLink,
    
  ]),
  credentials: "include",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
