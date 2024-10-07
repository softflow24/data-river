# Input Block

The Input Block is a simple yet essential component in Data-River workflows. It takes a single value, which can come from the user or another source, and passes it to the next block in the workflow.

## Purpose

The Input Block’s primary role is to gather a "value" and pass it along to other blocks in the workflow. It's a straightforward way to provide dynamic input without additional configurations.

### Key Functions:

- **Value Collection**: Takes a single value from the user or predefined input.
- **Data Passing**: Passes the collected value to the next block for further processing.

## Example Use Case

Let’s say you’re building a workflow that fetches Pokémon information. The Input Block would allow the user to input a Pokémon name (like "Pikachu") and pass that value to the next block for processing.

### Example Workflow:

1. **Start Block**: Initiates the workflow.
2. **Input Block**: Collects the Pokémon name ("Pikachu").
3. **Output Block**: Displays the Pokémon’s information.
4. **End Block**: Finalizes the workflow.

In this example, the Input Block simply takes the Pokémon name entered by the user and passes it to the next block, where the data will be processed.

## How to Use the Input Block

1. **Drag and Drop**: Drag the Input Block from the block library onto the canvas.
2. **Connect It**: Connect the output from the Start Block to the Input Block.
3. **Set a Value**: Define the value either from user input or predefined data.
4. **Connect to Next Block**: After the Input Block collects the value, connect it to the next block (such as an Output Block) to process or display the data.
5. **Run the Workflow**: Once all blocks are connected, run the workflow to see how the input value flows through the process.

---

## Key Details

- **Single Value**: The Input Block only handles one value, which is passed to the next block.
- **No Labels**: There are no label fields or complex configurations—it's designed to be simple and direct.

---

## Best Practices

- **Simple Inputs**: Use the Input Block for straightforward value collection, like entering a name,number or environment variable by `json {{VARIABLE_NAME}} `.
- **Basic Workflow Logic**: Keep your workflows simple by passing the Input Block’s value to Output Blocks or other processing blocks.

---

## What's Next?

Now that you've learned how to use the Input Block, check out how other blocks fit into your workflow:

- [Start Block](guides/building-workflows/start.md)
- [Output Block](guides/building-workflows/output.md)
- [End Block](guides/building-workflows/end.md)
