import { Link } from "@remix-run/react";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src="/assets/images/logo.svg" alt="Data River" className="h-8 w-8" />
    </Link>
  );
};

export default Logo;
