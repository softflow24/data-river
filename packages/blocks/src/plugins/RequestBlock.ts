import { IBlockConfig } from "@data-river/shared/interfaces";
import { Block } from "../block";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import fetch from "node-fetch";
import { z } from "zod";

export class RequestBlock extends Block {
  constructor(config: IBlockConfig, logger: ILogger) {
    super(config, logger);
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const urlSchema = z.string().url();
    const methodSchema = z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]);
    const headersSchema = z.record(z.string(), z.string());
    const queryParamsSchema = z.record(z.string(), z.string());
    const bodySchema = z.object({}).passthrough();

    try {
      const url = urlSchema.parse(inputs.url);
      const method = methodSchema.parse(inputs.method);
      const headers = headersSchema.parse(inputs.headers || {});
      const queryParams = queryParamsSchema.parse(inputs.queryParams || {});
      const body = bodySchema.parse(inputs.body || {});

      const queryString = new URLSearchParams(queryParams).toString();
      const fullUrl = `${url}?${queryString}`;

      const response = await fetch(fullUrl, {
        method,
        headers,
        body: method !== "GET" ? JSON.stringify(body) : undefined,
      });

      const jsonResponse = await response.json();
      return { response: jsonResponse };
    } catch (error) {
      this.logger.error("RequestBlock execution failed:", error);
      throw new Error("RequestBlock execution failed");
    }
  }
}
