import { Checkbox, Label } from "@data-river/shared/ui";

interface LegalAgreementsProps {
  agreements: {
    terms: boolean;
    privacy: boolean;
  };
  onAgreementChange: (type: "terms" | "privacy", checked: boolean) => void;
}

export function LegalAgreements({
  agreements,
  onAgreementChange,
}: LegalAgreementsProps) {
  return (
    <div className="space-y-6 rounded-lg border p-4 bg-muted/50">
      <h3 className="font-medium">Legal Agreements</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreements.terms}
            onCheckedChange={(checked: boolean) =>
              onAgreementChange("terms", checked === true)
            }
            required
          />
          <Label
            htmlFor="terms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I accept the{" "}
            <a
              href="/terms"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="privacy"
            checked={agreements.privacy}
            onCheckedChange={(checked) =>
              onAgreementChange("privacy", checked === true)
            }
            required
          />
          <Label
            htmlFor="privacy"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I accept the{" "}
            <a
              href="/privacy"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </Label>
        </div>
      </div>
    </div>
  );
}
