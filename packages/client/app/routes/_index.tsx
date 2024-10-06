import { redirect } from "@remix-run/node";

export const loader = async () => {
  return redirect("/editor");
};

const IndexRoute = () => {
  return null; // No need to render anything, the redirect happens in the loader
};

export default IndexRoute;
