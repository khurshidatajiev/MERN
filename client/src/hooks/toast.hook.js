import { useCallback } from "react";

const useToast = () => {
  return useCallback((text) => {
    if(window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
};

export default useToast;
