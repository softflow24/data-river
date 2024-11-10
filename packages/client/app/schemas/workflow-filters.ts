export type WorkflowFilters = {
  search: string;
  public: boolean;
  runRange: [number, number];
  remixRange: [number, number];
  tags: string[];
  sort: "updated" | "created" | "name" | "runs" | "remixes";
  dateFrom?: string;
  dateTo?: string;
};

export function parseSearchParams(
  searchParams: URLSearchParams,
): WorkflowFilters {
  return {
    search: searchParams.get("search") || "",
    public: searchParams.get("public") === "true",
    runRange: parseArrayParam(searchParams.get("runRange"), [0, 1000]),
    remixRange: parseArrayParam(searchParams.get("remixRange"), [0, 100]),
    tags: parseArrayParam(searchParams.get("tags"), []),
    sort: (searchParams.get("sort") || "updated") as WorkflowFilters["sort"],
    dateFrom: searchParams.get("dateFrom") || undefined,
    dateTo: searchParams.get("dateTo") || undefined,
  };
}

function parseArrayParam(
  param: string | null,
  defaultValue: number[] | string[],
): any[] {
  if (!param) return defaultValue;
  try {
    return param.split(",").map((item) => {
      const num = Number(item);
      return isNaN(num) ? item : num;
    });
  } catch {
    return defaultValue;
  }
}

export function stringifyFilters(
  filters: Partial<WorkflowFilters>,
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (typeof filters.public === "boolean")
    params.set("public", String(filters.public));
  if (filters.runRange) params.set("runRange", filters.runRange.join(","));
  if (filters.remixRange)
    params.set("remixRange", filters.remixRange.join(","));
  if (filters.tags?.length) params.set("tags", filters.tags.join(","));
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);

  return params;
}
