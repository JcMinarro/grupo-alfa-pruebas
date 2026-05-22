// @ts-nocheck
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const resolveFromRoot = (...segments: string[]) =>
  path.resolve(process.cwd(), ...segments);

const readFile = (...segments: string[]) =>
  fs.readFileSync(resolveFromRoot(...segments), "utf-8");

describe("Membership platform foundation", () => {
  it("switches Astro to portable SSR and registers Clerk", () => {
    const astroConfig = readFile("astro.config.mjs");
    const packageJson = readFile("package.json");
    const baseLayout = readFile("src", "layouts", "BaseLayout.astro");

    expect(astroConfig).toContain("@astrojs/node");
    expect(astroConfig).not.toContain("@astrojs/vercel");
    expect(astroConfig).toContain("@clerk/astro");
    expect(astroConfig).toContain("output: 'server'");
    expect(packageJson).toContain('"astro": "^6.');
    expect(packageJson).toContain('"@astrojs/node"');
    expect(packageJson).not.toContain('"@astrojs/vercel"');
    expect(packageJson).toContain('"@clerk/astro"');
    expect(packageJson).toContain('"@supabase/supabase-js"');
    expect(packageJson).toContain('"stripe"');
    expect(baseLayout).toContain("ClientRouter");
    expect(baseLayout).not.toContain("ViewTransitions");
  });

  it("adds middleware and shared membership server utilities", () => {
    const middlewarePath = resolveFromRoot("src", "middleware.ts");
    const envPath = resolveFromRoot("src", "lib", "server", "env.ts");
    const authPath = resolveFromRoot("src", "lib", "server", "auth.ts");
    const membershipPath = resolveFromRoot("src", "lib", "server", "membership.ts");

    expect(fs.existsSync(middlewarePath)).toBe(true);
    expect(fs.existsSync(envPath)).toBe(true);
    expect(fs.existsSync(authPath)).toBe(true);
    expect(fs.existsSync(membershipPath)).toBe(true);

    expect(readFile("src", "middleware.ts")).toContain("clerkMiddleware");
    expect(readFile("src", "lib", "server", "auth.ts")).toContain("requireSignedInUser");
    expect(readFile("src", "lib", "server", "membership.ts")).toContain("requireActiveMembership");
  });

  it("adds public onboarding routes and member-only routes in English", () => {
    const pagePaths = [
      ["src", "pages", "sign-in.astro"],
      ["src", "pages", "sign-in", "[...signIn].astro"],
      ["src", "pages", "sign-up.astro"],
      ["src", "pages", "sign-up", "[...signUp].astro"],
      ["src", "pages", "join.astro"],
      ["src", "pages", "checkout", "success.astro"],
      ["src", "pages", "checkout", "cancel.astro"],
      ["src", "pages", "members", "index.astro"],
      ["src", "pages", "members", "profile.astro"],
      ["src", "pages", "members", "membership.astro"],
      ["src", "pages", "members", "benefits.astro"],
      ["src", "pages", "members", "resources.astro"],
      ["src", "pages", "members", "events.astro"],
      ["src", "pages", "members", "expert-sessions.astro"],
      ["src", "pages", "members", "referrals.astro"],
    ];

    pagePaths.forEach((segments) => {
      expect(fs.existsSync(resolveFromRoot(...segments))).toBe(true);
    });

    expect(readFile("src", "pages", "join.astro")).toContain("discountCode");
    expect(readFile("src", "pages", "join.astro")).toContain("readonly");
    expect(readFile("src", "pages", "members", "index.astro")).toContain("requireActiveMembership");
    expect(readFile("src", "styles", "theme.css")).toContain(".cl-otpCodeFieldInput");
  });

  it("updates Club Alfa conversion to point at the sign-up flow", () => {
    const clubPageSource = readFile("src", "pages", "club.astro");

    expect(clubPageSource).toContain('href="/sign-up"');
    expect(clubPageSource).not.toContain('href="/contacto"');
  });

  it("adds member navigation entry points to the shared header", () => {
    const headerSource = readFile("src", "components", "Header.astro");

    expect(headerSource).toContain('href: "/sign-in"');
    expect(headerSource).toContain('href: "/members"');
    expect(headerSource).toContain("MembershipLink");
  });

  it("adds server routes for checkout, billing portal, and Stripe webhook handling", () => {
    const apiPaths = [
      ["src", "pages", "api", "checkout.ts"],
      ["src", "pages", "api", "discount-code.ts"],
      ["src", "pages", "api", "billing-portal.ts"],
      ["src", "pages", "api", "stripe-webhook.ts"],
    ];

    apiPaths.forEach((segments) => {
      expect(fs.existsSync(resolveFromRoot(...segments))).toBe(true);
    });

    expect(readFile("src", "pages", "api", "checkout.ts")).toContain("createCheckoutSession");
    expect(readFile("src", "pages", "api", "checkout.ts")).toContain("export async function GET");
    expect(readFile("src", "pages", "api", "discount-code.ts")).toContain("previewDiscountCode");
    expect(readFile("src", "pages", "api", "billing-portal.ts")).toContain("createBillingPortalSession");
    expect(readFile("src", "lib", "server", "billing.ts")).toContain("checkout.session.completed");
  });

  it("handles billing lifecycle webhook states for membership access", () => {
    const billingSource = readFile("src", "lib", "server", "billing.ts");
    const membershipSource = readFile("src", "lib", "server", "membership.ts");

    expect(billingSource).toContain("invoice.paid");
    expect(billingSource).toContain("invoice.payment_failed");
    expect(billingSource).toContain("customer.subscription.deleted");
    expect(billingSource).toContain("status: 'active'");
    expect(billingSource).toContain("status: 'past_due'");
    expect(billingSource).toContain("status: 'canceled'");
    expect(billingSource).toContain("membership.clerk_user_id");
    expect(membershipSource).toContain("select('*')");
  });

  it("defines the phase 1 membership persistence model", () => {
    const schemaPath = resolveFromRoot("supabase", "migrations", "001_membership_platform.sql");

    expect(fs.existsSync(schemaPath)).toBe(true);

    const schema = fs.readFileSync(schemaPath, "utf-8");
    [
      "membership_users",
      "memberships",
      "billing_events",
      "organizations",
      "promo_codes",
      "referral_codes",
      "referral_usages",
    ].forEach((tableName) => {
      expect(schema).toContain(`create table if not exists ${tableName}`);
    });
    expect(schema).toContain("initial_acquisition_source");
    expect(schema).toContain("clerk_user_id");
    expect(schema).toContain("stripe_customer_id");
    expect(schema).toContain("stripe_subscription_id");
  });

  it("separates initial membership creation from subscription status updates", () => {
    const membershipSource = readFile("src", "lib", "server", "membership.ts");
    const billingSource = readFile("src", "lib", "server", "billing.ts");

    expect(membershipSource).toContain("upsertMembershipUser");
    expect(membershipSource).toContain("updateMembershipBySubscription");
    expect(billingSource).toContain("updateMembershipBySubscription");
    expect(membershipSource).toContain("onConflict: 'stripe_event_id'");
  });

  it("syncs derived membership metadata back to Clerk", () => {
    const membershipSource = readFile("src", "lib", "server", "membership.ts");
    const billingSource = readFile("src", "lib", "server", "billing.ts");

    expect(membershipSource).toContain("syncClerkMembershipMetadata");
    expect(membershipSource).toContain("updateUserMetadata");
    expect(billingSource).toContain("syncClerkMembershipMetadata");
  });

  it("uses one customer-facing discount code and resolves attribution server-side", () => {
    const joinSource = readFile("src", "pages", "join.astro");
    const checkoutSource = readFile("src", "pages", "api", "checkout.ts");
    const billingSource = readFile("src", "lib", "server", "billing.ts");

    expect(joinSource).toContain('name="discountCode"');
    expect(joinSource).toContain("Apply code");
    expect(joinSource).toContain("data-discount-form");
    expect(joinSource).toContain("data-astro-reload");
    expect(joinSource).toContain("data-discounted-price");
    expect(joinSource).toContain("checkout_error");
    expect(joinSource).not.toContain('name="promoCode"');
    expect(joinSource).not.toContain('name="referralCode"');
    expect(checkoutSource).toContain("discountCode");
    expect(checkoutSource).toContain("checkout_error=invalid_code");
    expect(billingSource).toContain("resolveDiscountCode");
    expect(billingSource).toContain("previewDiscountCode");
    expect(billingSource).toContain("allow_promotion_codes: false");
    expect(billingSource).toContain("AGENCIA-");
    expect(billingSource).toContain("REF-");
    expect(billingSource).toContain("isInitialPurchase: 'true'");
  });

  it("defines transactional email triggers from backend lifecycle events", () => {
    const emailPath = resolveFromRoot("src", "lib", "server", "email.ts");

    expect(fs.existsSync(emailPath)).toBe(true);

    const emailSource = fs.readFileSync(emailPath, "utf-8");
    const billingSource = readFile("src", "lib", "server", "billing.ts");

    expect(emailSource).toContain("Resend");
    expect(emailSource).toContain("membership_welcome");
    expect(emailSource).toContain("membership_renewal");
    expect(emailSource).toContain("payment_failed");
    expect(emailSource).toContain("membership_canceled");
    expect(billingSource).toContain("sendMembershipEmail");
  });

  it("defines reporting/admin readiness and legal onboarding disclosures", () => {
    const schema = readFile("supabase", "migrations", "001_membership_platform.sql");
    const adminDocPath = resolveFromRoot("docs", "membership-admin-readiness.md");
    const signUpSource = readFile("src", "pages", "sign-up.astro");
    const joinSource = readFile("src", "pages", "join.astro");

    expect(schema).toContain("organization_membership_report");
    expect(schema).toContain("referral_membership_report");
    expect(schema).toContain("suspicious_activity_notes");
    expect(fs.existsSync(adminDocPath)).toBe(true);
    expect(signUpSource).toContain("Membership terms");
    expect(signUpSource).toContain("Privacy policy");
    expect(joinSource).toContain("transactional membership emails");
    expect(joinSource.toLowerCase()).toContain("optional marketing");
    expect(joinSource).not.toContain("DNI");
  });
});
