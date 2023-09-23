const tagsQ = new URLSearchParams(window.location.search).get("tags");

const urls = [
  "rule34.xxx",
  "hypnohub.net",
  "safebuooru.org",
  "realbooru.com",
  "xbooru.com",
  "gelbooru.com",
];

var gallery = document.getElementsByClassName("gallery")[0];

function convertURL(url) {
  return `https://${hostURL}/files?url=${url}`;
}

var tagData = [];
getData(tagsQ, 0);

async function getData(tags, PID) {
  for (let urlI = 0; urlI < urls.length; urlI++) {
    const response = await fetch(
      `https://${hostURL}/posts?tags=${tags}&sourse=${urls[urlI]}&pid=${PID}`
    );

    const data = await response.json();

    if (Array.isArray(data)) {
      tagData = data;
    } else {
      tagData = data.post;
    }

    console.log(tagData);

    for (var i = 0; i < tagData.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");

      if (
        tagData[i].file_url.endsWith(".webm") ||
        tagData[i].file_url.endsWith(".mp4")
      ) {
        img.style = "border: solid red; border-width: thin;";
      }

      img.src = convertURL(tagData[i].preview_url);
      img.classList.add("galleryItem");
      img.onclick = function () {
        click(img);
      };
      img.id = i;

      figure.classList.add("hover");
      figure.appendChild(img);
      gallery.appendChild(figure);
    }
  }
}
