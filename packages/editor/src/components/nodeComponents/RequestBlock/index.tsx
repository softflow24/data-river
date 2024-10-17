import { RequestFormData } from "@data-river/shared/contracts/blocks/request";
import { Badge } from "@data-river/shared/ui";
import InputWithLabel from "../InputWithLabel";

const methodColorClasses = {
  GET: "text-blue-500 border-blue-500",
  POST: "text-green-500 border-green-500",
  PUT: "text-yellow-500 border-yellow-500",
  PATCH: "text-orange-500 border-orange-500",
  DELETE: "text-red-500 border-red-500",
};

const RequestBlock = ({
  config,
  nodeId,
  isSelected,
}: {
  config: RequestFormData;
  nodeId: string;
  isSelected: boolean;
}) => {
  const colorClass =
    methodColorClasses[config.httpMethod] || methodColorClasses.DELETE;

  return (
    <div className="flex flex-col max-w-96">
      <div className="flex justify-end">
        <Badge
          variant="outline"
          className={`px-2 py-1 rounded text-xs font-semibold max-w-16 ${colorClass}`}
        >
          <span className="text-ellipsis overflow-hidden whitespace-nowrap mx-auto">
            {config.httpMethod}
          </span>
        </Badge>
      </div>
      <InputWithLabel
        label="URL"
        name="url"
        value={config.url || "/path"}
        inputClassName="max-w-96"
      />
    </div>
  );
};

export default RequestBlock;
