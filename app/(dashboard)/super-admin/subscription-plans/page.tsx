"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Crown,
  Shield,
  Calendar,
  Bell,
  Users,
  BarChart3,
  Palette,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PackageModal from "@/components/super-admin/modals/package-modal";
import { IconType } from "react-icons";

type Feature = {
  id: string;
  name: string;
  category: string;
  icon?: IconType;
};

const features: Feature[] = [
  { id: "basic", name: "Basic", category: "Basic", icon: Shield },
  { id: "unlimited-member", name: "Unlimited Member Limit", category: "Basic" },
  { id: "backlist", name: "Backlist Management", category: "Basic" },
  { id: "booking", name: "Booking", category: "Booking", icon: Calendar },
  { id: "booking-management", name: "Booking Management", category: "Booking" },
  { id: "vip-booking", name: "VIP Priority Booking", category: "Booking" },
  { id: "service", name: "Service", category: "Service", icon: Shield },
  {
    id: "service-gallery",
    name: "Service Gallery (Multiple images)",
    category: "Service",
  },
  {
    id: "service-pricing",
    name: "Service & Pricing Menu",
    category: "Service",
  },
  {
    id: "notifications",
    name: "Notifications",
    category: "Notifications",
    icon: Bell,
  },
  {
    id: "notification-system",
    name: "Notification System",
    category: "Notifications",
  },
  { id: "message-center", name: "Message Center", category: "Notifications" },
  { id: "operations", name: "Operations", category: "Operations", icon: Users },
  { id: "team-system", name: "Team System", category: "Operations" },
  {
    id: "analytics",
    name: "Analytics",
    category: "Analytics",
    icon: BarChart3,
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    category: "Analytics",
  },
  { id: "branding", name: "Branding", category: "Branding", icon: Palette },
  { id: "custom-logo", name: "Custom Logo", category: "Branding" },
  { id: "custom-banner", name: "Custom Banner", category: "Branding" },
];

type Plan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
};

export default function PackageManagement() {
  const { addToast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "free",
      name: "Free",
      price: "0",
      description: "Free forever\nPerfect for getting started",
      features: ["basic", "service-pricing"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "380",
      description: "NT$ 380/mo\nFull-feature enterprise solution",
      features: [
        "unlimited-member",
        "backlist",
        "booking-management",
        "vip-booking",
        "service-gallery",
        "service-pricing",
        "notification-system",
        "message-center",
        "team-system",
        "analytics-dashboard",
        "custom-logo",
        "custom-banner",
      ],
    },
  ]);

  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const toggleFeature = (planId: string, featureId: string) => {
    setPlans(
      plans.map((plan) => {
        if (plan.id === planId) {
          const hasFeature = plan.features.includes(featureId);
          return {
            ...plan,
            features: hasFeature
              ? plan.features.filter((f) => f !== featureId)
              : [...plan.features, featureId],
          };
        }
        return plan;
      })
    );
  };

  const enableAll = (planId: string) => {
    setPlans(
      plans.map((plan) => {
        if (plan.id === planId) {
          return {
            ...plan,
            features: features.map((f) => f.id),
          };
        }
        return plan;
      })
    );
  };

  const disableAll = (planId: string) => {
    setPlans(
      plans.map((plan) => {
        if (plan.id === planId) {
          return {
            ...plan,
            features: [],
          };
        }
        return plan;
      })
    );
  };

  const resetChanges = () => {
    setPlans([
      {
        id: "free",
        name: "Free",
        price: "0",
        description: "Free forever\nPerfect for getting started",
        features: ["basic", "service-pricing"],
      },
      {
        id: "pro",
        name: "Pro",
        price: "380",
        description: "NT$ 380/mo\nFull-feature enterprise solution",
        features: [
          "unlimited-member",
          "backlist",
          "booking-management",
          "vip-booking",
          "service-gallery",
          "service-pricing",
          "notification-system",
          "message-center",
          "team-system",
          "analytics-dashboard",
          "custom-logo",
          "custom-banner",
        ],
      },
    ]);
    addToast({
      title: "Changes Reset",
      description: "All changes have been reset to default values.",
    });
  };

  const saveChanges = () => {
    setIsPackageModalOpen(true);
  };

  const startEditingPlan = (plan: Plan) => {
    setEditingPlan(plan.id);
    setEditName(plan.name);
    setEditPrice(plan.price);
  };

  const savePlanDetails = () => {
    setIsPackageModalOpen(true);
    if (editingPlan) {
      setPlans(
        plans.map((plan) => {
          if (plan.id === editingPlan) {
            return {
              ...plan,
              name: editName,
              price: editPrice,
            };
          }
          return plan;
        })
      );
      setEditingPlan(null);
      addToast({
        title: "Plan Updated",
        description: "Plan details have been saved.",
      });
    }
  };

  const getCategoryFeatures = (category: string) => {
    return features.filter((f) => f.category === category);
  };

  const categories = Array.from(new Set(features.map((f) => f.category)));

  if (editingPlan) {
    const plan = plans.find((p) => p.id === editingPlan);
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingPlan(null)}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="mb-8 text-center text-2xl font-semibold text-foreground">
            {plan?.name} package
          </h1>

          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm text-muted-foreground">
                Name
              </Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter here"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-sm text-muted-foreground">
                Price
              </Label>
              <Input
                id="price"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                placeholder="Enter here"
                className="mt-2"
              />
            </div>

            <Button
              onClick={savePlanDetails}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className=" bg-card">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={resetChanges}>
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset
            </Button>
            <Button
              size="sm"
              onClick={saveChanges}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto  py-8 ">
        {/* Plans Header */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-lg border border-border bg-card p-6 text-center"
            >
              {plan.id === "pro" && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8096CE] hover:bg-[#315ed1]">
                  Most Popular
                </Badge>
              )}

              <div className="mb-4 flex justify-center">
                {plan.id === "free" ? (
                  <Shield className="h-12 w-12 text-muted-foreground" />
                ) : (
                  <Crown className="h-12 w-12 text-purple-500" />
                )}
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                {plan.name}
              </h2>
              <p className="whitespace-pre-line text-sm text-muted-foreground">
                {plan.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Features Enabled
                  </span>
                  <span className="font-semibold text-foreground">
                    {plan.features.length}/{features.length}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
                    style={{
                      width: `${
                        (plan.features.length / features.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Enable/Disable All Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => enableAll(plan.id)}
                  className="text-xs"
                >
                  Enable All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => disableAll(plan.id)}
                  className="text-xs"
                >
                  Disable All
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Permissions */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Feature Permissions
            </h3>
          </div>

          <div className="p-6">
            {/* Features Table Header */}
            <div className="mb-4 grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border pb-4">
              <div className="text-sm font-semibold text-foreground">
                Features
              </div>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex w-20 items-center justify-center text-sm font-semibold text-foreground"
                >
                  {plan.id === "free" ? (
                    <Shield className="h-5 w-5" />
                  ) : (
                    <Crown className="h-5 w-5 text-purple-500" />
                  )}
                  <span className="ml-2">{plan.name}</span>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {categories.map((category) => {
                const categoryFeatures = getCategoryFeatures(category);
                const mainFeature = categoryFeatures.find((f) => f.icon);

                return (
                  <div key={category}>
                    {mainFeature && (
                      <div className="mb-3 grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border pb-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          {mainFeature.icon && (
                            <mainFeature.icon className="h-4 w-4 text-muted-foreground" />
                          )}
                          {mainFeature.name}
                        </div>
                        {plans.map((plan) => (
                          <div
                            key={plan.id}
                            className="flex w-20 items-center justify-center"
                          >
                            <Checkbox
                              checked={plan.features.includes(mainFeature.id)}
                              onCheckedChange={() =>
                                toggleFeature(plan.id, mainFeature.id)
                              }
                              className="h-5 w-5 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {categoryFeatures
                      .filter((f) => !f.icon)
                      .map((feature) => (
                        <div
                          key={feature.id}
                          className="grid grid-cols-[1fr_auto_auto] gap-4 py-2"
                        >
                          <div className="pl-6 text-sm text-muted-foreground">
                            {feature.name}
                          </div>
                          {plans.map((plan) => (
                            <div
                              key={plan.id}
                              className="flex w-20 items-center justify-center"
                            >
                              <Checkbox
                                checked={plan.features.includes(feature.id)}
                                onCheckedChange={() =>
                                  toggleFeature(plan.id, feature.id)
                                }
                                className="h-5 w-5 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <PackageModal
        isOpen={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
      />
    </div>
  );
}
