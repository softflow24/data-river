import {
  RequestFormData,
  RequestFormSchema,
} from "@data-river/shared/contracts/blocks/request";
import axios, { AxiosRequestConfig, Method } from "axios";
import { Block } from "..";
import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

export class RequestBlock extends Block {
  private config: RequestFormData;

  constructor(config: IBlockConfig, logger: ILogger) {
    super(config, logger);
    const result = RequestFormSchema.safeParse({
      ...config.config,
      ...config.inputs,
    });
    if (!result.success) {
      throw new Error(`Invalid request configuration: ${result.error}`);
    }
    this.config = result.data;
  }

  async execute(): Promise<any> {
    const { httpMethod, url, headers, queryParams, bodyType, body } =
      this.config;

    const axiosConfig: AxiosRequestConfig = {
      method: httpMethod as Method,
      url,
      headers: headers?.reduce(
        (acc, { key, value }) => ({ ...acc, [key]: value }),
        {},
      ),
      params: queryParams,
    };

    if (body) {
      let contentType: string | undefined = undefined;

      switch (bodyType) {
        case "json":
          contentType = "application/json";
          axiosConfig.data = JSON.parse(body);
          break;
        case "form-data":
          contentType = "multipart/form-data";
          axiosConfig.data = body;
          break;
        case "x-www-form-urlencoded":
          contentType = "application/x-www-form-urlencoded";
          axiosConfig.data = new URLSearchParams(body);
          break;
      }

      if (contentType) {
        axiosConfig.headers = {
          ...axiosConfig.headers,
          "Content-Type": contentType,
        };
      }
    }

    try {
      const response = await axios(axiosConfig);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText || "OK",
      };
    } catch (error) {
      // TODO: Add option in config to accept error and handle it manually if needed.
      if (axios.isAxiosError(error)) {
        throw new Error(`Request failed: ${error.message}`);
      }
      throw error;
    }
  }
}
