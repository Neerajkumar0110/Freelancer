export function track(event: string, props?: Record<string, any>) {
  console.log("[Analytics]", event, props);

  // Later:
  // window.gtag?.("event", event, props);
  // posthog.capture(event, props);
}
