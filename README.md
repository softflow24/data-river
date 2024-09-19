# **data-river** 🌊

[![Discord Follow](https://dcbadge.vercel.app/api/server/GjrVyZH9?style=flat)](https://discord.gg/GjrVyZH9)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Empowering Everyone to Code & Automate Visually**

Welcome to **data-river**, an open-source framework that makes programming and automation accessible to everyone—from kids just learning to code to business professionals looking to streamline workflows. Whether you're building educational tools, automating business processes, or integrating AI models, **data-river** allows you to create powerful workflows with an intuitive visual interface and a marketplace of reusable components.

[Here](https://github.com/softflow24/data-river/blob/main/USE_CASE_EXAMPLES.md) you can find some example of the use cases.

**No screenshots yet, no code yet. Just a bold idea.** 🎉

---

## **Why data-river?**

### A Platform for All Ages & Skill Levels

**data-river** is designed to be flexible and adaptive:

- **For Kids**: Start with visual blocks that teach programming basics, inspired by tools like Scratch. Kids can create simple logic, experiment with coding concepts, and feel empowered by building their first workflows. 
- **For Business Professionals**: Automate processes like email workflows, approval chains, and API integrations using a drag-and-drop interface, without writing code.
- **For Developers**: Build and customize workflows by using **JavaScript-based nodes** available in the marketplace. Developers can focus on creating efficient automation without reinventing the wheel.

---

## **Key Features**:

- **Visual Nodes**: Drag, drop, and customize visual elements to create logic and workflows.
- **Dynamic UI**: Tailored experiences for kids, professionals, and developers. From cartoon-like elements for children to sleek professional UIs for businesses.
- **Stateful Execution (Server-Side)**: Handle long-running workflows and complex business processes with built-in state management running on the server. These server nodes can be written in **any language**, by default written in **JavaScript** but we should have a port to other languages such as **python**, making the platform adaptable to different developer preferences.
- **Run Anywhere**: Simple flows can run directly in any browser, thanks to **JavaScript-based nodes**. This allows for flexibility in building and testing workflows locally without needing server resources for basic tasks.
- **Asynchronous Processing**: Perform async operations like API calls effortlessly, managing inputs and outputs seamlessly.
- **Scheduled Workflows**: Thanks to **Temporal**, **data-river** can support scheduled workflows, making it easy to set up recurring processes or delayed executions for tasks like notifications or data updates.
- **Modular & Plugin-Based**: A marketplace filled with JavaScript-based nodes, enabling users to quickly build and integrate complex workflows from pre-built modules.

---

## **Not Just for AI—But AI-Ready** 🤖

While **data-river** isn't built solely for AI, it's designed to make integrating AI features a breeze. If you're working with **generative AI** models or need to add AI-based tasks to your workflows, **data-river** supports easy integrations for:

- **Generative AI Applications**: Create and manage AI apps such as chatbots, agents, and workflows using **data-river**. The platform supports popular LLMs like **OpenAI, Hugging Face**, and even **local models**.
- **AI Workflow Automation**: Visually create AI workflows without needing extensive coding. Connect your AI models to tools like **Google Search, Stable Diffusion**, and **WolframAlpha** for more dynamic applications.
- **Backend-as-a-Service (BaaS)**: **data-river** also simplifies backend deployment, providing the necessary infrastructure for operating AI or non-AI applications alike. Integrate the platform easily into your custom business processes via APIs.

---

## **Who is it For?**

1. **Kids & Educators**: Introduce coding in a fun, visual way that scales as students grow.
2. **Businesses**: Automate approval processes, categorize data, and streamline workflows—without writing a single line of code.
3. **AI Enthusiasts**: Quickly integrate LLMs and other AI tools into your workflows for intelligent automation and dynamic apps.
4. **Developers**: Use JavaScript classes for building or extending workflows with custom logic from the marketplace, and for more complex server-side logic, nodes can be built in **Python** or any language you prefer.

---

## **How to Contribute**

Right now, we’re laying the foundation. This means there’s no code to clone or build just yet, but you can still contribute!

### Ways to Help:

- **Join the Discussion**: We’ve created a [![Discord](https://dcbadge.vercel.app/api/server/GjrVyZH9?style=flat)](https://discord.gg/GjrVyZH9) channel where you can share ideas, give feedback, and help shape the platform before we even release a single line of code.
- **Roadmap Feedback**: Check out the [Roadmap](https://github.com/orgs/softflow24/projects/2/views/4) to see where we're headed. Share your thoughts on upcoming features and priorities.
- **Become a Champion**: Be one of the first to advocate for **data-river** in your community. Help us grow by sharing the vision on social media or at meetups.
- **Suggest Nodes/Features**: Think of nodes you’d want to build or see in the marketplace—whether it's a basic math operation, an API call, or something creative like a chatbot builder. Suggest ideas and help us define the node library!

---

## **The Vision: Empower, Automate, Simplify**

**data-river** isn't just a tool. It’s a platform designed to democratize programming and automation. We want to empower anyone, from young kids to seasoned professionals, to create, automate, and innovate without the steep learning curve of traditional coding.

### Future Plans:

- **Marketplace for Nodes**: An ecosystem where users can share or sell pre-built JavaScript-based nodes and workflows, building a thriving community of contributors.
- **Stateful Workflow Management**: Advanced features for businesses to automate complex workflows with approval mechanisms and error handling.
- **AI & Observability Tools**: Potential integrations with observability tools to track and optimize performance, model accuracy, and application logs, especially for AI-based workflows.
- **Educational Initiatives**: Support from educators and governments to use **data-river** as a teaching tool in schools, making programming accessible to all.

---

## **Join Us on the Journey** 🚀

We’re at the start of something big, and we want you to be a part of it.

### Let’s build this together!

- **Discord**: [![Discord](https://dcbadge.vercel.app/api/server/GjrVyZH9?style=flat)](https://discord.gg/GjrVyZH9)

Together, we can shape the future of programming and automation, making it simpler, more accessible, and more fun.

---

**data-river** – Flow into the Future of Automation 🌊

## Getting Started

To contribute to **Data-river**, follow these steps to get the project running locally on your machine:

1. **Fork the repository**:  
   Visit the Data-River repository and click the "Fork" button to create your own copy.

2. **Clone the fork**:  
   Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/YOUR_USERNAME/data-river.git
   cd data-river

   ```
3. Switch to ```development``` branch. You will create your PR against this branch, not ```main```.
4. ```cd data-river/packages/client```
5. ```pnpm install```
6. ```pnpm run dev```
7. navigate to http://localhost:5173/dashboard
