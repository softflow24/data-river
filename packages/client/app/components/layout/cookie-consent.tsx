import { useState, useEffect } from "react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Card, CardContent } from "@data-river/shared/ui/components/ui/card";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookie-consent");
    if (!cookieChoice) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <Card>
        <CardContent className="p-4 space-y-4">
          <p className="text-sm">
            We use cookies to improve your experience. By using our site, you
            agree to our use of cookies.
          </p>
          <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={handleAccept}>
              Accept
            </Button>
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Decline
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/privacy">Learn more</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
