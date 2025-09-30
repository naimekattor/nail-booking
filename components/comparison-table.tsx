import { Check, X } from "lucide-react";

const features = [
  { name: "Booking page", starter: true, pro: true },
  { name: "LINE auto reminders", starter: "Limited", pro: "Unlimited*" },
  { name: "Team Accounts", starter: false, pro: true },
  { name: "Analytics", starter: "Basic", pro: "Advanced" },
  { name: "Affiliate Dashboard", starter: false, pro: true },
  { name: "Priority Support", starter: false, pro: true },
];

export function ComparisonTable() {
  return (
    <section className="container py-20 md:py-28">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare plans</h2>
        <p className="text-lg text-muted-foreground">
          Choose the right plan for your business
        </p>
      </div>

      <div className="max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 font-semibold">Feature</th>
              <th className="text-center py-4 px-6 font-semibold">Starter</th>
              <th className="text-center py-4 px-6 font-semibold">Pro</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.name}
                className={index % 2 === 0 ? "bg-muted/30" : ""}
              >
                <td className="py-4 px-6 font-medium">{feature.name}</td>
                <td className="py-4 px-6 text-center">
                  {typeof feature.starter === "boolean" ? (
                    feature.starter ? (
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {feature.starter}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {typeof feature.pro === "boolean" ? (
                    feature.pro ? (
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {feature.pro}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          *Message quota is managed in your LINE OA plan.
        </p>
      </div>
    </section>
  );
}
