import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do consumers pay online?",
    answer:
      "No, consumers do not pay online. Payment is only for Business Owner subscription via the website. Consumer bookings are free and do not require payment through the platform.",
  },
  {
    question: "How do I get LINE notifications?",
    answer:
      "LINE notifications are integrated through your Official LINE account. Once you connect your LINE OA to NailBooking, automatic reminders and updates will be sent to your clients. The Starter plan includes limited notifications, while Pro offers unlimited messaging based on your LINE OA plan quota.",
  },
  {
    question: "Can I switch accounts or manage a team?",
    answer:
      "Yes! The Pro plan includes team accounts for up to 2 partners. You can easily switch between accounts and manage team members through the dashboard. This is perfect for salons with multiple beauty professionals.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "You can cancel your subscription at any time with no penalties or fees. Your account will remain active until the end of your current billing period, and you can always restart your subscription later.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="container py-20 md:py-28">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently asked questions
        </h2>
        <p className="text-lg text-muted-foreground">
          Everything you need to know
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-pretty">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
