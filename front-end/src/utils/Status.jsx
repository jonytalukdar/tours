import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Status = () => {
  const { error, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'success') {
      toast.success(<h2 style={{ textAling: 'center' }}>Success !</h2>);
    }

    if (status === 'rejected') {
      toast.error(<h2 style={{ textAling: 'center' }}>{error}</h2>);
    }
  }, [status, error]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Status;
