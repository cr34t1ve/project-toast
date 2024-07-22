import React from "react";
import useKeydown from "../../hooks/use-keydown";
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function addToast(toastInfo) {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toastInfo, id }]);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", handleEscape);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
