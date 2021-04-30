import React from "react";
import { useMeQuery } from "../generated/graphql";

export const Me: React.FC = () => {
  const { data, loading, error } = useMeQuery({fetchPolicy: 'network-only'});
  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return <div>{data.me}</div>;
};
