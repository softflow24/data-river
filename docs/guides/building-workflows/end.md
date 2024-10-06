# End Block

The End Block marks the conclusion of a workflow in Data-River. It signifies that no further actions will be taken, and the workflow has completed its execution. The End Block is automatically present in every workflow by default and cannot be removed.

## Purpose

The primary role of the End Block is to finalize the workflow, ensuring that all processes are completed, and no further actions will be executed. Every workflow must have an End Block, which serves as a clear indication that the workflow is complete.

### Key Functions:

- **Workflow Completion**: Signals the end of a workflow and stops the flow of execution.
- **Default Presence**: The End Block is automatically included in every workflow and cannot be deleted.

## Example Use Case

Consider a workflow that fetches Pokémon information and outputs it to the user. The End Block ensures that the workflow concludes after displaying the information.

### Example Workflow:

1. **Start Block**: Initiates the workflow.
2. **Input Block**: Collects the Pokémon name ("Pikachu").
3. **Output Block**: Displays the Pokémon’s information.
4. **End Block**: Finalizes the workflow, ensuring no further actions are taken.

In this example, the End Block ensures the workflow is completed after the output is displayed.

## How to Use the End Block

1. **Already on the Canvas**: The End Block is automatically placed in every workflow and cannot be removed.
2. **Connect It**: Connect the last actionable block (e.g., Output Block) to the End Block to finalize the workflow.
3. **No Configuration Needed**: The End Block doesn't require any configuration; it simply marks the end of the workflow.

---

## Key Details

- **Mandatory Block**: Every workflow must have an End Block, and it is always present by default.
- **No Input or Output**: The End Block doesn't process or pass data—its sole purpose is to signal the end of the workflow.

---

## Best Practices

- **Simple Connection**: Always connect the final block in your workflow (e.g., Output Block) to the End Block to ensure a clear conclusion.
- **Organize for Clarity**: Place the End Block logically at the end of your workflow for easy understanding and clean organization.

---

## What's Next?

Now that you've learned how to use the End Block, explore how other blocks can be connected in your workflow:

- [Start Block](guides/building-workflows/start.md)
- [Input Block](guides/building-workflows/input.md)
- [Output Block](guides/building-workflows/output.md)
