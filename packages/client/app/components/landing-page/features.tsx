import React from "react";
import { Play } from "lucide-react";

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Designed for developers, teams, and creators
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              data-river removes the bottlenecks of repetitive tasks. With
              powerful logic, easily accessible blocks, and a marketplace for
              reusable components, it enables rapid creation, collaboration, and
              deployment of automated workflows.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <div className="relative aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Play className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mt-24">
          <div className="flex-1 space-y-4 text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Design workflows visually
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Drag, drop, and connect blocks to bring your logic to life. Our
              intuitive visual editor makes it easy to create complex workflows
              without writing code. Visualize your data flow and iterate
              quickly.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative aspect-video w-full">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Play className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mt-24">
          <div className="flex-1">
            <div className="relative aspect-video w-full">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Play className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Configure blocks with precision
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Customize inputs and settings to fit your needs. Fine-tune each
              block's behavior with our intuitive configuration interface.
              Create powerful workflows that match your exact requirements.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mt-24">
          <div className="flex-1 space-y-4 text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Discover pre-built blocks in the marketplace
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Accelerate your workflow creation with our extensive marketplace
              of pre-built blocks. Find, install, and customize components
              created by the community. Share your own blocks and contribute to
              the ecosystem.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative aspect-video w-full">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Play className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mt-24">
          <div className="flex-1">
            <div className="relative aspect-video w-full">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Play className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Build your own Custom block
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              If you didn't find a block that fits your needs, you can build
              your own block without coding skills. Our block builder interface
              guides you through the process, making it easy to create custom
              functionality tailored to your workflow.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mt-24">
          <div className="flex-1">
            <div className="relative aspect-video w-full">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Play className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Discover and remix public workflows
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Explore a growing collection of community-created workflows. Learn
              from others, remix existing workflows to fit your needs, and share
              your own creations. Join a vibrant community of automation
              enthusiasts and accelerate your learning journey.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mt-24">
          <div className="flex-1 space-y-4 text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Enhance workflows with AI
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Supercharge your automation with AI capabilities. Leverage
              powerful language models for content generation, data analysis,
              and intelligent decision-making. Our AI blocks make it easy to
              integrate artificial intelligence into your workflows without any
              machine learning expertise.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative aspect-video w-full">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Play className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
