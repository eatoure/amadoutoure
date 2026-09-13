/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// gatsby-plugin-offline was removed when /admin started being proxied to a separate Next.js app:
// the plugin registers its own NavigationRoute, which no workboxConfig option can exclude a path
// from. Removing the plugin does not remove service workers already installed in visitors'
// browsers, so this tears down any leftover one and drops its caches. Safe to delete once
// returning visitors have all had a chance to load the site again.
export const onClientEntry = () => {
  if (!(`serviceWorker` in navigator)) {
    return;
  }

  navigator.serviceWorker
    .getRegistrations()
    .then(registrations => registrations.forEach(registration => registration.unregister()))
    .catch(() => {});

  if (`caches` in window) {
    caches
      .keys()
      .then(keys => keys.forEach(key => caches.delete(key)))
      .catch(() => {});
  }
};
