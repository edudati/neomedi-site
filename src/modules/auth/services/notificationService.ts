import { toast } from 'react-toastify';

export const notificationService = {
  success: (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1500, // Reduzido de 3000ms para 1500ms
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  error: (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2500, // Reduzido de 5000ms para 2500ms
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  info: (message: string) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 1500, // Reduzido de 3000ms para 1500ms
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  warning: (message: string) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 2000, // Reduzido de 4000ms para 2000ms
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};