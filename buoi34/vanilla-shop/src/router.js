// Custom SPA Router using History API

let routes = [];
let currentCleanup = null;

export function addRoute(path, handler) {
  routes.push({ path, handler });
}

export function navigateTo(url) {
  history.pushState(null, null, url);
  handleRoute();
}

export function handleRoute() {
  // Reset scroll on navigation
  window.scrollTo(0, 0);

  const path = window.location.pathname;

  // Clean up previous page if needed
  if (currentCleanup && typeof currentCleanup === "function") {
    currentCleanup();
    currentCleanup = null;
  }

  // Try to match routes
  for (const route of routes) {
    const match = matchRoute(route.path, path);
    if (match) {
      currentCleanup = route.handler(match.params) || null;
      return;
    }
  }

  // No route matched → 404
  const notFoundRoute = routes.find((r) => r.path === "*");
  if (notFoundRoute) {
    currentCleanup = notFoundRoute.handler({}) || null;
  }
}

function matchRoute(routePath, actualPath) {
  if (routePath === "*") return null;

  const routeParts = routePath.split("/").filter(Boolean);
  const actualParts = actualPath.split("/").filter(Boolean);

  if (routeParts.length !== actualParts.length) return null;

  const params = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      params[routeParts[i].slice(1)] = actualParts[i];
    } else if (routeParts[i] !== actualParts[i]) {
      return null;
    }
  }

  return { params };
}

// Setup link interception for SPA navigation
export function setupLinkInterception() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (link) {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href !== window.location.pathname) {
        navigateTo(href);
      }
    }
  });
}

// Listen for browser back/forward
window.addEventListener("popstate", handleRoute);
