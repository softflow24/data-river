interface TableOfContentsProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState({}, "", `#${sectionId}`);
    }
  };

  return (
    <nav className="space-y-2">
      <h2 className="text-xl font-semibold">Contents</h2>
      <ul className="list-decimal list-inside space-y-1 text-muted-foreground">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="hover:underline"
              onClick={scrollToSection(id)}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
