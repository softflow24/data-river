import { Button } from "@data-river/shared/ui/components/ui/button";
import { ArrowUpRight, Copy, Share2, Star, X } from "lucide-react";
import { Link } from "@remix-run/react";
import { DialogClose } from "@data-river/shared/ui/components/ui/dialog";

interface ActionButtonsProps {
  workflowId: string;
}

export function ActionButtons({ workflowId }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon">
        <Share2 className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Star className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
      <Button asChild>
        <Link to={`/editor/${workflowId}`}>
          Open in Editor
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <DialogClose asChild>
        <Button variant="outline" size="icon">
          <X className="w-4 h-4" />
        </Button>
      </DialogClose>
    </div>
  );
}
