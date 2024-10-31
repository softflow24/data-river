import { NavBar } from "./nav-bar";
import { Testimonial } from "../marketing/testimonial";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-row bg-background">
        <div className="flex w-full flex-col justify-center px-6 lg:px-10 xl:px-14">
          {children}
        </div>
        <Testimonial />
      </div>
    </>
  );
};
