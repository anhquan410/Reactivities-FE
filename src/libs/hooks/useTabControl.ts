import { SyntheticEvent, useCallback } from "react";
import { useSearchParams } from "react-router";

type UseTabControlOptions = {
  paramName?: string;
  defaultTab?: number;
};

export const useTabControl = (options: UseTabControlOptions = {}) => {
  const { paramName = "tab", defaultTab = 0 } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = parseInt(
    searchParams.get(paramName) || defaultTab.toString(),
    10
  );

  const handleTabChange = useCallback(
    (_: SyntheticEvent, newValue: number) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(paramName, newValue.toString());
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams, paramName]
  );

  const setTab = useCallback(
    (tabIndex: number) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(paramName, tabIndex.toString());
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams, paramName]
  );

  return {
    currentTab,
    handleTabChange,
    setTab,
  };
};
