const ZOMATO_API_KEY = 'ZOMATO_API_KEY';
const ZOMATO_BASE_URI = "https://developers.zomato.com/api/v2.1/search";
const DEFAULT_QUERY_PARAM = {count: 20, sort: "real_distance", order: "asc"};

function fetchRestaurantsInCircle(lat, lng, radius, callbackFn, statusChangeHandlerFn){
  /* This function calls zomato API to fetch the nearest restaurants
  within a radius of given lat lng.
  arguments:
  lat(float): latitude of the center location
  lng(float): longitude of the center location
  radius(float): radius of search
  callbackFn: function to call on successfull completion of Ajax request
  statusChangeHandlerFn: function to call on each Ajax status changes
  */

  //create copy of DEFAULT_QUERY_PARAM
  let queryParam = Object.assign({},DEFAULT_QUERY_PARAM);
  queryParam.radius = encodeURIComponent(radius);
  queryParam.lat = encodeURIComponent(lat);
  queryParam.lon = encodeURIComponent(lng);
  $.ajax({
    type: 'GET',
    url: ZOMATO_BASE_URI,
    headers: {"user-key": ZOMATO_API_KEY},
    data: queryParam,
    beforeSend: requestInitiated,
}).done(successfulResponse).fail(handleAjaxError);

  function requestInitiated(xhr,setting){
    //allows application to display "loading.." message within statusChangeHandlerFn
    console.log('loading data...'+xhr.status);
    statusChangeHandlerFn(xhr, null);
  }

  function successfulResponse(data, textStatus, xhr){
    //called on successful Ajax response
    callbackFn(data);
    statusChangeHandlerFn(xhr, null);
  }

  function handleAjaxError(xhr, textStatus, error) {
    statusChangeHandlerFn(xhr, error);
  }

}
