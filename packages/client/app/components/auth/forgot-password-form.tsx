import { Link } from "@remix-run/react";
import { Button, Input, Label } from "@data-river/shared/ui";

export const ForgotPasswordForm = () => {
  return (
    <div className="space-y-6 mx-auto">
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

        <Button
          type="submit"
          className="w-full h-11 bg-focus text-focus-foreground hover:bg-focus/80 text-base"
        >
          Send reset email
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="font-medium text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};
