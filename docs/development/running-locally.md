# Running Data-River Locally

To contribute to Data-River or experiment with its features, you can run the platform locally on your machine. This guide will walk you through the steps to get Data-River up and running.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 20 or higher)
- **pnpm** (package manager)
- **Git**

## Steps to Run Locally

1. **Clone the Repository**  
   Start by cloning the Data-River repository to your local machine:

   ```bash
   git clone https://github.com/softflow24/data-river.git
   cd data-river
   ```

2. **Install Dependencies**
   Install the required dependencies using `pnpm` (we use pnpm workspaces so you need to install it):

   ```bash
   pnpm install
   ```

3. **Run the Development Server**
   Once the dependencies are installed, you can start the development server:

   ```bash
   pnpm run dev
   ```

   This will start the local server, and you can access Data-River by navigating to `http://localhost:5173/` in your browser.

4. **Build the Project** (Optional)
   If you need to build the project for production or testing, you can use:

   ```bash
   pnpm run build
   ```

## Troubleshooting

- **Missing Dependencies**: Ensure that all dependencies are installed properly by running `pnpm install`.
- **Port Conflicts**: If you encounter port conflicts, make sure `http://localhost:5173/` is not already in use.

---

## What's Next?

Once you have Data-River running locally, check out our guide on block development to start creating or modifying blocks.

- [Block Development](development/block-development.md)

---
