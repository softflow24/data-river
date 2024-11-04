import { Link } from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@data-river/shared/ui/components/ui/table";

export function CookieTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Service</TableHead>
            <TableHead className="w-[150px]">Type</TableHead>
            <TableHead className="w-[200px]">When is it set?</TableHead>
            <TableHead className="w-[120px]">Duration</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead className="w-[150px]">Privacy Notice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Supabase</TableCell>
            <TableCell>Strictly necessary</TableCell>
            <TableCell>When you sign in to the application</TableCell>
            <TableCell>1 hour - 1 year</TableCell>
            <TableCell>
              Authentication session management and token refresh
            </TableCell>
            <TableCell>
              <a
                href="https://supabase.com/privacy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Supabase
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GitHub</TableCell>
            <TableCell>Strictly necessary</TableCell>
            <TableCell>When initiating GitHub authentication</TableCell>
            <TableCell>15 minutes</TableCell>
            <TableCell>OAuth authentication process security</TableCell>
            <TableCell>
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Application</TableCell>
            <TableCell>Strictly necessary</TableCell>
            <TableCell>When you sign in or set preferences</TableCell>
            <TableCell>Session - 1 year</TableCell>
            <TableCell>
              Session management and user preferences storage
            </TableCell>
            <TableCell>
              <Link to="/privacy" className="text-primary hover:underline">
                Our Policy
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Google Analytics</TableCell>
            <TableCell>Analytics</TableCell>
            <TableCell>When you first visit the site</TableCell>
            <TableCell>2 years</TableCell>
            <TableCell>User tracking and website usage analysis</TableCell>
            <TableCell>
              <a
                href="https://policies.google.com/privacy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cloudflare</TableCell>
            <TableCell>Strictly necessary</TableCell>
            <TableCell>When you first access the site</TableCell>
            <TableCell>30 minutes</TableCell>
            <TableCell>Security and bot protection</TableCell>
            <TableCell>
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
