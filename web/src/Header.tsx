import React from "react";
import { Link } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { useLogoutMutation, useSelfQuery } from "./generated/graphql";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data, loading } = useSelfQuery();
  const [logout, {client}] = useLogoutMutation();
  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.self) {
    body = <div>you are logged in as {data.self.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }
  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/me">me</Link>
      </div>
      <div>
        {!loading && data && data.self && <button
          onClick={async () => {
            await logout();
            setAccessToken('')
            await client.resetStore()
          }}
        >
          logout
        </button>}
      </div>
      {body}
    </header>
  );
};
