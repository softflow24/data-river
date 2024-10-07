# Block Development

In Data-River, blocks are the core components that enable workflow automation. Each block encapsulates a specific function, from handling input and output to interacting with external databases. This guide will walk you through how to create, register, and extend blocks within the Data-River platform.

## Understanding Blocks

Blocks in Data-River are defined as JavaScript classes that inherit from a base `Block` class. Each block defines its inputs, outputs, and logic for processing data. Blocks can be reused, customized, and registered as new block types.

### Key Components

- **Block Class**: The base class that all blocks extend.
- **Block Configuration**: Each block has an associated configuration (`IBlockConfig`) defining inputs, outputs, and other properties like retry logic and timeout settings.

### Example of Block Class

Here’s a simple example of an InputBlock:

```typescript
import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import { Block } from "../block";

export class InputBlock extends Block {
  constructor(config: IBlockConfig, logger: ILogger) {
    super(
      {
        ...config,
        inputConfigs: {
          trigger: { type: "boolean", required: false },
          input: { type: "string", required: true },
        },
        outputConfigs: {
          data: { type: "string" },
        },
      },
      logger,
    );
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return { data: inputs.input };
  }
}
```

### Registering a Block

To make your block available for use in workflows, it must be registered in the block registry. Here's an example:

```typescript
import { registerBlockType } from "../blockFactory";
import { InputBlock } from "../inputBlock";

registerBlockType("blocks/input@0.1", InputBlock);
```

This code snippet registers the `InputBlock` under the type `blocks/input@0.1`, making it available for use in workflows.

---

## Creating a New Block

### Step-by-Step Process

1. **Create the Block Class**

   - Define your block by extending the `Block` class. Include any custom inputs, outputs, and the `execute` function that contains the core logic of the block.

2. **Register the Block**

   - Once the block class is defined, register it using the `registerBlockType` function. This allows the block to be available in the visual editor and executable in workflows.

3. **Test the Block**
   - After registering your block, test it by creating a simple workflow. Ensure the inputs and outputs behave as expected.

### Example: Database Block

Here’s an example of a more complex block that interacts with a database:

```typescript
import { IBlockConfig } from "@data-river/shared/interfaces";
import { Block } from "../block";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

export class DatabaseBlock extends Block {
  constructor(config: IBlockConfig, logger: ILogger) {
    super(
      {
        ...config,
        inputConfigs: {
          query: { type: "string", required: true },
        },
        outputConfigs: {
          data: { type: "string" },
        },
      },
      logger,
    );
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    // The execution engine will check if inputs are correct, it will not execute the block if the inputs are invalid.

    // Implement database query logic
    const result = await queryDatabase(inputs.query as string);
    return { result };
  }
}

async function queryDatabase(query: string): Promise<{ data: string }> {
  // Simulate a database query for POC
  return { data: "Sample Database Data" };
}
```

---

## Block Configuration

Each block configuration is handled by the `IBlockConfig` interface, which includes:

- **`id`**: Unique identifier for the block.
- **`type`**: The type of block (e.g., `"blocks/input@0.1"`).
- **`inputConfigs`**: Defines the inputs expected by the block.
- **`outputConfigs`**: Defines the outputs the block will produce.
- **`inputs`**: The actual data passed into the block.
- **`retry` and `timeout`**: Optional settings for retry logic and execution timeouts.

For example, in the InputBlock above, the configuration looks like this:

```typescript
{
  id: "input-block-1",
  type: "blocks/input@0.1",
  inputConfigs: {
    input: { type: "string", required: true }
  },
  outputConfigs: {
    data: { type: "string" }
  },
  inputs: {
    input: "Pikachu" // Default value (optional)
  }
}
```

---

## Testing Blocks

Once you've created and registered your block, test it by running a simple workflow:

1. **Create a Workflow**: Use the block in a workflow by connecting it to other blocks (e.g., Start Block, Output Block).
2. **Run the Workflow**: Ensure that the block's inputs and outputs behave as expected.
3. **Handle Errors**: Use the `onError` method to handle any errors during block execution.

---

## Extending Blocks

You can extend existing blocks or create plugins by using the `registerBlockType` function to register new blocks or modify existing ones. For example, if you wanted to create a specialized version of the InputBlock, you could:

```typescript
import { InputBlock } from "../inputBlock";

export class CustomInputBlock extends InputBlock {
  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    // Custom logic here
    return { data: `Custom Processed: ${inputs.input}` };
  }
}
```

---

## Best Practices for Block Development

- **Modularity**: Keep each block focused on a single responsibility.
- **Reusability**: Design blocks that can be reused in various workflows.
- **Error Handling**: Ensure robust error handling with `onError` functions.

---

## What's Next?

- [Running Locally](development/running-locally.md)

---
