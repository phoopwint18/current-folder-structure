export const PATHS = {
  home: "/",
  ui_kit: "/ui-kit",
  profile: "/profile",
  login: "/login",
};

export function withSearch(path: string, query = "") {
  return query ? `${path}?${query}` : path;
}
