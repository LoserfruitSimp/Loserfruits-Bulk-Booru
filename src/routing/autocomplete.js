const express = require("express");
const https = require("https");
const fileRouter = express.Router({ mergeParams: true });
const axios = require("axios").default;
const urls = [
  "rule34.xxx",
  "hypnohub.net",
  "safebooru.org",
  "realbooru.com",
  "xbooru.com",
  "gelbooru.com",
];

fileRouter.get("/", async function (req, res) {
  var autoResponce = [];
  for (let urlIndex = 0; urlIndex < urls.length; urlIndex++) {
    if (urls[urlIndex] === "gelbooru.com") {
      const response = await axios.get(
        "https://" +
          urls[urlIndex] +
          "/index.php?page=autocomplete2&term=" +
          req.query.q +
          "&type=tag_query&limit=10"
      );

      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          label:
            response.data[i].label + " (" + response.data[i].post_count + ")",
          value: response.data[i].value,
        });
      }
      
      autoResponce = autoResponce.concat(data)
    } else if (
      urls[urlIndex] === "hypnohub.net" ||
      urls[urlIndex] === "rule34.xxx"
    ) {
      axios
        .get(
          "https://" +
            urls[urlIndex] +
            "/public/autocomplete.php?q=" +
            req.query.q
        )
        .then(function (response) {
          autoResponce = autoResponce.concat(response.data)
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else {
      axios
        .get("https://" + urls[urlIndex] + "/autocomplete.php?q=" + req.query.q)
        .then(function (response) {
          autoResponce = autoResponce.concat(response.data)
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  }
  
  const filtResponce = autoResponce.filter(function(element) {
  return autoResponce.indexOf(element) === oldArray.lastIndexOf(element);
});
  
  res.json(filtResponce)
});

module.exports = fileRouter;
