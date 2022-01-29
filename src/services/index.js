export async function validatePhoneNumber(number, callback) {
  number = `+7` + number.join("");
  let url = `https://phonevalidation.abstractapi.com/v1/?api_key=054c94018977472a8fc90a351d114306&phone=${number}`;
  function requesting(method, url) {
    return new Promise((resolve) => {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(JSON.parse(xhr.responseText));
          resolve(JSON.parse(xhr.responseText).valid);
        }
      };
      xhr.send();
    });
  }
  let requestInProcess = await requesting("GET", url)
    .then((data) => {
      console.log(data);
      callback(data);
    })
    .catch(function (err) {
      console.error(err.statusText);
    });
}
