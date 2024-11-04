import { Link } from "lucide-react";

interface SectionHeaderProps {
  id: string;
  children: React.ReactNode;
}

export function SectionHeader({ id, children }: SectionHeaderProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState({}, "", `#${id}`);
    }
  };

  return (
    <h2 className="text-xl font-semibold group flex items-center gap-2">
      {children}
      <a
        href={`#${id}`}
        onClick={handleClick}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Link to ${id} section`}
      >
        <Link className="h-4 w-4" />
      </a>
    </h2>
  );
}
