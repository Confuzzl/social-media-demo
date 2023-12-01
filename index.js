async function fetchUser(i) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${i}`
  );
  return response.json();
}

async function fetchRandomImage() {
  return (
    await fetch(
      `https://jsonplaceholder.typicode.com/photos/${Math.floor(
        Math.random() * 5000 + 1
      )}`
    )
  ).json();
}

function populateMain() {
  for (i = 1; i <= 10; i++) {
    const postElement = document.createElement("div");
    postElement.id = i;
    postElement.classList += "post";
    fetchUser(i).then((p) => {
      postElement.innerText = p["username"];

      const imageElement = new Image();
      fetchRandomImage().then((p) => {
        imageElement.src = p["url"];
        // postElement.appendChild(imageElement);
      });

      document.querySelector("main").appendChild(postElement);
    });
  }
}
