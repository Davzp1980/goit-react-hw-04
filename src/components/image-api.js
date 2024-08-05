import axios from 'axios';

// axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.baseURL =
  'https://api.unsplash.com/search/photos?client_id=dK4U751t746RMEKhHobdZsagkm8tZHVF6ixL84Bktvg';

export async function fetchImages(searchRequest, currentPage) {
  const params = {
    page: currentPage,
    query: searchRequest,
    orientation: 'squarish',
    per_page: 20,
  };
  const res = await axios.get('', {
    params,
    headers: {
      'Accept-Version': 'v1',
    },
  });

  return res.data;
}
