export const hrefIsActive = (href: string, selected: string, data?: object) => {
  if (href === selected) {
    return true;
  }

  if (href === "/") {
    if (data) {
      for (const i in data) {
        const value = data[i];
        if (value !== href && selected.startsWith(value)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  return selected.startsWith(href);
};
