# Start Block

The Start Block is the foundation of any workflow in Data-River. It signals the beginning of the workflow and serves as the entry point for the entire process. The Start Block is always present by default and cannot be deleted from the workflow.

## Purpose

The primary purpose of the Start Block is to initialize the workflow and set the flow of actions in motion. While it doesn’t take any input itself, it connects to other blocks to initiate the data flow.

### Key Functions:

- **Initialization**: The Start Block triggers the beginning of a workflow.
- **Always Present**: The Start Block is automatically included in every workflow and cannot be removed.
- **No Inputs**: It is the only block that does not require any input connections.
- **Essential Block**: Every workflow requires one (and only one) Start Block.

## Example Use Case

Imagine you're building a workflow that fetches Pokémon information based on the user's input. The Start Block would serve as the trigger for the entire process.

### Example Workflow:

1. **Start Block**: Initiates the workflow.
2. **Input Block**: Collects the Pokémon name from the user.
3. **Output Block**: Displays the fetched Pokémon information.
4. **End Block**: Finalizes the workflow.

In this case, the Start Block is where the process begins, and without it, the user would never be able to input the Pokémon name.

## How to Use the Start Block

1. **Already on the Canvas**: The Start Block is automatically placed on the workflow canvas, so you don't need to drag it from the library.
2. **Connect It**: The Start Block doesn't require an input connection, but you need to connect its output to the next block in your workflow (usually an Input Block).
3. **Configure**: There's no configuration needed for the Start Block—it simply signals the workflow's start.
4. **Run the Workflow**: Once all blocks are connected and configured, run the workflow. The Start Block will trigger the sequence of actions.

---

## Best Practices

- **One Start Block Per Workflow**: The Start Block will always be included, and you only need one per workflow.
- **Placement**: Place the subsequent blocks logically after the Start Block to keep the workflow organized.
- **Simple Connection**: The Start Block should immediately connect to the next actionable block, typically an Input Block or a preconfigured block with default values.

---

## What's Next?

Now that you understand the Start Block, check out how to work with other essential blocks:

- [Input Block](guides/building-workflows/input.md)
- [Output Block](guides/building-workflows/output.md)
- [End Block](guides/building-workflows/end.md)
