import { useLayoutEffect } from "react";

interface Theme {
    [name: string]: string;
}

export function useTheme(theme: Theme): void {
  useLayoutEffect(
    (): void => {
      for (const key in theme) {
        document.documentElement.style.setProperty(`${key}`, theme[key]);
      }
    },
    [theme]
  );
}