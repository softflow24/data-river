import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // If not client-side yet, render nothing or a fallback (like a loader or empty div)
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
