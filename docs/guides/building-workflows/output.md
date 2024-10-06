# Output Block

The Output Block is a key component in Data-River workflows. It is responsible for displaying or sending the results of a workflow to the user or an external system. Whether you're outputting data to a screen, sending an API response, or triggering another process, the Output Block is where the results are processed and made visible.

## Purpose

The primary role of the Output Block is to take the data passed to it from the previous block(s) and present it in a meaningful way. It acts as the final step before the workflow reaches its conclusion.

### Key Functions:

- **Display Results**: Outputs the results of the workflow to the user or another system.
- **Data Passing**: Receives data from previous blocks (e.g., an Input Block) and processes or displays it.

## Example Use Case

In a workflow that fetches Pokémon information, the Output Block will display the Pokémon's details that were retrieved from an API or another source.

### Example Workflow:

1. **Start Block**: Initiates the workflow.
2. **Input Block**: Collects the Pokémon name ("Pikachu").
3. **Output Block**: Displays the Pokémon’s information, such as its type, stats, and abilities.
4. **End Block**: Finalizes the workflow.

In this case, the Output Block takes the data passed from the Input Block (Pokémon name) and displays the corresponding Pokémon details.

## How to Use the Output Block

1. **Drag and Drop**: Drag the Output Block from the block library onto the canvas.
2. **Connect It**: Connect the previous block (such as the Input Block) to the Output Block.
3. **Define Output**: The Output Block will automatically handle the data passed to it, displaying or sending the results.
4. **Run the Workflow**: After configuring the workflow, run it to see how the data flows into the Output Block and is displayed.

---

## Key Details

- **Single Value Output**: The Output Block processes the value passed to it and outputs it, whether it's a message, data, or result from an API.
- **Simple Display**: There are no complex formatting options; the Output Block is designed to output data directly as it is received.

---

## Best Practices

- **Simple Output**: Use the Output Block to display or return results directly. For complex outputs, consider breaking the output into multiple steps if necessary.
- **Check Data Flow**: Ensure the previous block is passing the correct data to the Output Block to avoid issues with the final output.

---

## What's Next?

Now that you know how to use the Output Block, check out the other essential blocks for building workflows:

- [Start Block](guides/building-workflows/start.md)
- [Input Block](guides/building-workflows/input.md)
- [End Block](guides/building-workflows/end.md)
