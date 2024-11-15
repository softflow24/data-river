import { type ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { EnvironmentVariableForm } from "~/components/settings/environment-variable-form";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const value = formData.get("value") as string;

  // TODO: Implement your save logic here
  // await saveEnvironmentVariable({ name, value });

  return redirect("/settings/environment-variables");
}

export default function NewEnvironmentVariable() {
  return (
    <div className="w-full max-w-[1400px]">
      <div className="px-16">
        <h2 className="text-2xl font-bold mb-6">Add Environment Variable</h2>
      </div>
      <EnvironmentVariableForm />
    </div>
  );
}