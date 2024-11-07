import { Link, Form } from "@remix-run/react";
import { Button, Input, Label, Separator } from "@data-river/shared/ui";
import { GithubButton } from "./github-button";

interface SignUpFormProps {
  error?: string;
  success?: string;
}

export const SignUpForm = ({ error, success }: SignUpFormProps) => {
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

      <Form method="post" className="space-y-5">
        {error && (
          <div className="text-sm text-red-500 text-center">{error}</div>
        )}
        {success && (
          <div className="text-sm text-green-500 text-center">{success}</div>
        )}

        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm">
            Email
          </Label>
          <Input
            id="email"
            name="email"
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
            name="password"
            type="password"
            placeholder="········"
            required
            className="h-11 text-base placeholder:font-extrabold"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-focus text-focus-foreground hover:bg-focus/80 text-base"
        >
          Sign Up
        </Button>
      </Form>

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
