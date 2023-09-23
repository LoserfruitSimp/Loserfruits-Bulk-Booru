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
  if (settings.proxy === "On") {
    return `https://${hostURL}/files?url=${url}`;
  } else {
    return url;
  }
}

var tagData = [];

async function webResponces() {
  for (let i = 0; i < urls.length; i++) {
    async function getAll(index) {
      console.log(
        `Getting data from ${urls[i]} ... Run number ${
          Math.floor(index / 100) + 1
        }`
      );
      console.log(`Total Items so far: ${tagData.length}`);
      console.log(
        `-------------------------------------------------------------------------`
      );
      const data = await getData(urls[i], tagsQ, index);
      tagData = tagData.concat(data);
      if (data.length === 100) {
        await getAll(index + 100);
      }
    }
    await getAll(0);
  }

  console.log(`Booru Data:`);
  console.log(tagData);
  for (var i = 0; i < tagData.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");

    if (
      tagData[i].file_url.endsWith(".webm") ||
      tagData[i].file_url.endsWith(".mp4")
    ) {
      img.style = "border: solid red; border-width: medium;";
    }

    img.src = convertURL(tagData[i].preview_url);
    img.classList.add("galleryItem");
    img.onclick = function () {
      window.open(convertURL(tagData[img.id].file_url), "_blank");
    };
    img.id = i;

    figure.classList.add("hover");
    figure.appendChild(img);
    gallery.appendChild(figure);
  }
}

async function getData(url, tags, PID) {
  const response = await fetch(
    `https://${hostURL}/posts?tags=${tags}&sourse=${url}&pid=${PID}`
  );

  let data = await response.json();
  if (data === "" || data.error) {
    return [];
  }

  if (Array.isArray(data)) {
    return data;
  } else {
    data.post = data.post || [];
    return data.post;
  }
}
webResponces();
