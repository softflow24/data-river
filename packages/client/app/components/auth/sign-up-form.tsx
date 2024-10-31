import { Link } from "@remix-run/react";
import { Button, Input, Label, Separator } from "@data-river/shared/ui";
import { GithubButton } from "./github-button";

export const SignUpForm = () => {
  return (
    <div className="space-y-6 mx-auto">
      <GithubButton />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-sm uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>

      <form className="space-y-5">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-11 text-base"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            className="h-11 text-base"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-focus text-focus-foreground hover:bg-focus/80 text-base"
        >
          Sign Up
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Have an account?{" "}
        <Link
          to="/sign-in"
          className="font-medium text-primary hover:underline"
        >
          Sign In Now
        </Link>
      </p>
    </div>
  );
};
