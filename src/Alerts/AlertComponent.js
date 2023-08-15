// Importing Swal from 'sweetalert2' library
import Swal from 'sweetalert2';

// Helper function to get a customized toast instance
const getToast = (colorClass) => {
  return Swal.mixin({
    toast: true, // Display as a toast (notification)
    position: 'top-right', // Position of the toast on the screen
    showConfirmButton: false, // Hide the confirm button
    timer: 3000, // Auto close after 3 seconds (3000 milliseconds)
    showCloseButton: true, // Display the close button to manually close the toast
    customClass: {
      popup: colorClass, // Custom class to set the background color of the toast
    },
  });
};

// Show an error toast with the specified text
const ShowErrorAlert = (text) => {
  const errorToast = getToast('color-danger'); // Use 'color-danger' class for error toast
  errorToast.fire({
    title: text,
  });
};

// Show a success toast with the specified text
const ShowSuccessAlert = (text) => {
  const successToast = getToast('color-success'); // Use 'color-success' class for success toast
  successToast.fire({
    title: text,
  });
};

// Show an info toast with the specified text
const ShowInfoAlert = (text) => {
  const infoToast = getToast('color-info'); // Use 'color-info' class for info toast
  infoToast.fire({
    title: text,
  });
};

// Export the functions to be used in other parts of the application
export { ShowErrorAlert, ShowSuccessAlert, ShowInfoAlert };
