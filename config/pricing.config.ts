// config/pricing.config.ts

export type Role = "client" | "freelancer";
export type Billing = "monthly" | "yearly";

export type PlanFeature =
  | "browse"
  | "apply"
  | "chat"
  | "priority"
  | "projects"
  | "team"
  | "analytics"
  | "profileBoost";

export const PRICING = {
  client: {
    plans: [
      {
        name: "Free",
        price: { monthly: 0, yearly: 0 },
        credits: 10,
        permissions: ["browse"],
        features: ["Browse freelancers", "Basic support"],
      },
      {
        name: "Pro",
        price: { monthly: 29, yearly: 279 },
        credits: 100,
        permissions: ["browse", "chat", "priority", "projects"],
        features: [
          "Priority matching",
          "Unlimited chat",
          "Project management tools",
        ],
        highlight: true,
      },
      {
        name: "Enterprise",
        price: { monthly: null, yearly: null },
        credits: "Custom",
        permissions: [
          "browse",
          "chat",
          "priority",
          "projects",
          "team",
          "analytics",
        ],
        features: [
          "Dedicated account manager",
          "Custom workflows",
          "Team hiring & analytics",
        ],
      },
    ],
  },

  freelancer: {
    plans: [
      {
        name: "Free",
        price: { monthly: 0, yearly: 0 },
        credits: 5,
        permissions: ["browse", "apply"],
        features: ["Browse jobs", "Apply to limited jobs"],
      },
      {
        name: "Pro",
        price: { monthly: 19, yearly: 179 },
        credits: 50,
        permissions: ["browse", "apply", "chat", "profileBoost"],
        features: [
          "Apply to more jobs",
          "Client chat access",
          "Profile boost",
        ],
        highlight: true,
      },
      {
        name: "Enterprise",
        price: { monthly: null, yearly: null },
        credits: "Custom",
        permissions: [
          "browse",
          "apply",
          "chat",
          "profileBoost",
          "analytics",
        ],
        features: [
          "Agency & team tools",
          "Advanced analytics",
          "Priority visibility",
        ],
      },
    ],
  },
};
