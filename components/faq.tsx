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
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">Everything you need to know</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="item-1"
            className="bg-white rounded-lg px-6 border-0 shadow-sm"
          >
            <AccordionTrigger className="text-left">
              Do consumers pay online?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              No. Bookings require no payment from consumers. They simply book
              appointments through your booking page, and payment is handled
              directly at your salon according to your preferred method.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="bg-white rounded-lg px-6 border-0 shadow-sm"
          >
            <AccordionTrigger className="text-left">
              How do I get LINE notifications?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              One-click connect in the app. Simply link your LINE Official
              Account, and we'll automatically send booking confirmations,
              reminders, and updates to both you and your clients.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="bg-white rounded-lg px-6 border-0 shadow-sm"
          >
            <AccordionTrigger className="text-left">
              Can I switch accounts or manage a team?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, with Team Accounts (Pro plan). You can add multiple staff
              members, assign different permissions, and manage everything from
              one central dashboard while each team member has their own login.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="bg-white rounded-lg px-6 border-0 shadow-sm"
          >
            <AccordionTrigger className="text-left">
              Can I cancel anytime?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, absolutely. You can cancel your subscription at any time with
              no cancellation fees. Your account will remain active until the
              end of your current billing period.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
