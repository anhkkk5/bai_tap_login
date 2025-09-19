import React from "react";
import { routes } from "../routes";
import { useRoutes } from "react-router-dom";

function AllRouter() {
  const elements = useRoutes(routes);
  return <>{elements}</>;
}
export default AllRouter;
