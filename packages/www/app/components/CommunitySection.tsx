import { Card, CardContent } from "~/components/ui/card";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Core Contributor",
    quote: "data-river has revolutionized how I think about automation.",
  },
  {
    name: "Bob Smith",
    role: "Documentation Lead",
    quote: "The community here is incredibly supportive and innovative.",
  },
  {
    name: "Carol Williams",
    role: "Node Developer",
    quote:
      "I love how easy it is to create and share new nodes with data-river.",
  },
];

export default function CommunitySection() {
  return (
    <section className="bg-secondary">
      <div className="container py-24 sm:py-32 m-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-secondary-foreground">
          Meet the River Guardians
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://i.pravatar.cc/100?img=${index + 1}`}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-foreground">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
