import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { EnvironmentVariableForm } from "~/components/settings/environment-variable-form";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const entries = Array.from(formData.entries());
  const variables = [];
  
  // Process form data
  for (let i = 0; entries[i * 2]; i++) {
    variables.push({
      key: formData.get(`variables[${i}].key`),
      value: formData.get(`variables[${i}].value`)
    });
  }

  // TODO: Save variables
  // await saveEnvironmentVariables(variables);

  return redirect("/settings/environment-variables");
}

export default function NewEnvironmentVariable() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Environment Variable</h2>
      <EnvironmentVariableForm 
        onCancel={() => window.history.back()}
        onSave={(data) => {
          // Form submission is handled automatically by Remix
          // The action function above will process the data
        }}
      />
    </div>
  );
}