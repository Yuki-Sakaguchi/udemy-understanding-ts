import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyBl_ktfLUPTsUZsaTetc4v_UK1V_gxGrQM';

type GoogleGeocodingResponce = {
  results: { geometry: { location: { lat: number, lng: number }}}[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler (event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`;

  // Google APIに送信
  axios
    .get<GoogleGeocodingResponce>(url)
    .then((res) => {
      if (res.data.status !== 'OK') {
        throw new Error('座標が取得できませんした');
      }
      const coordinates = res.data.results[0].geometry.location;

      const map = new google.maps.Map(document.getElementById('map')!, {
        center: coordinates,
        zoom: 16,
      });

      new google.maps.Marker({ position: coordinates, map: map });

    }).catch(err => {
      alert(err.message);
      console.log(err)
    });
}

form.addEventListener('submit', searchAddressHandler);