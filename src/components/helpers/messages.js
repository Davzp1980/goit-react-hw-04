import toast from 'react-hot-toast';
export const errorMessage = () => {
  toast('Internal server error', {
    duration: 4000,
    position: 'top-left',
    style: {
      backgroundColor: 'red',
    },
  });
};
export const blankSearchFieldMessage = () => {
  toast('The search field must be filled in', {
    duration: 4000,
    position: 'top-right',
    style: {
      backgroundColor: 'chartreuse',
    },
  });
};
export const badSearchRequestMessage = () => {
  toast('No photos were found for your request', {
    duration: 4000,
    position: 'top-right',
    style: {
      backgroundColor: 'teal',
    },
  });
};
