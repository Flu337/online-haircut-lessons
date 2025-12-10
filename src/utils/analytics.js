// Mock analytics utility
export const trackEvent = (eventName, data) => {
  console.log(`Analytics Event: ${eventName}`, data);
  // In a real app, this would send data to Google Analytics, etc.
};

export const trackUTM = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");

  if (utmSource || utmMedium || utmCampaign) {
    trackEvent("UTM Tracked", { utmSource, utmMedium, utmCampaign });
  }
};

export const trackScrollDepth = () => {
  let maxScroll = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (scrollPercent % 25 === 0) {
        trackEvent("Scroll Depth", { depth: scrollPercent });
      }
    }
  });
};
