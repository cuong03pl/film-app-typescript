import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number): string => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const clear = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(clear);
  }, [value]);
  return debounceValue;
};
