# Data River Client Docker Guide

This README provides instructions for building and running the Data River Client application using Docker.

## Prerequisites

- Docker installed on your machine
- Git (to clone the repository)

## Building the Docker Image

1. Clone the repository:

   ```
   git clone https://github.com/your-repo/data-river-client.git
   cd data-river-client
   ```

2. Build the Docker image:

   ```
   docker build -t data-river-client:latest .
   ```

   This process may take a few minutes as it installs dependencies and builds the application.

## Running the Docker Container

1. Run the container:

   ```
   docker run -p 3000:3000 -e NODE_ENV=production data-river-client:latest
   ```

   This command:

   - Maps port 3000 of the container to port 3000 on your host machine
   - Sets the NODE_ENV to production
   - Uses the latest version of the data-river-client image

2. Access the application by opening a web browser and navigating to:
   ```
   http://localhost:3000
   ```

## Environment Variables

You can pass environment variables to the container using the `-e` flag. For example:

```bash
docker run -p 3000:3000 -e NODE_ENV=production -e CUSTOM_VAR=value data-river-client:latest
```

## Exposed Ports

The application exposes port 3000 by default. If you need to use a different port, you can modify the `EXPOSE` instruction in the Dockerfile and update your `docker run` command accordingly.

## Rebuilding the Image

If you make changes to the application, you'll need to rebuild the Docker image:

1. Make your changes to the application code
2. Rebuild the Docker image:

   ```bash
   docker build -t data-river-client:latest .
   ```

3. Run the new container as described in the "Running the Docker Container" section

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are correctly listed in your package.json files
2. Check that the .npmrc file contains `shamefully-hoist=true`
3. Verify that the Dockerfile is in the root of your project
4. Make sure your .dockerignore file is correctly configured

If problems persist, try building with the `--no-cache` flag:

```bash
docker build --no-cache -t data-river-client:latest .
```

## Additional Information

For more detailed information about the application structure, available scripts, or configuration options, please refer to the main project documentation.
