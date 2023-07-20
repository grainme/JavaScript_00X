document.addEventListener("DOMContentLoaded", function () {
  const posts = [
    {
      title: "Binary Search",
      body: "A logarithmic method to lookup things in a sorted array",
    },
    {
      title: "Linear Search",
      body: "A Linear method to lookup things in an array",
    },
  ];

  const post3 = {
    title: "Ternary Search",
    body: "I don't know what does ternary search means!",
  };

  function getPost() {
    setTimeout(() => {
      let output = "";
      let postList = document.createElement("ol");

      posts.forEach((post) => {
        output += `<li><h2>${post.title}</h2><p>${post.body}</p></li>`;
      });

      postList.innerHTML = output;
      document.body.appendChild(postList);
    }, 1000);
  }

  function createPost(newPost) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        posts.push(newPost);
        const error = true;
        if (error) {
          resolve();
        } else {
          reject("error : something went wrong!");
        }
      }, 2000);
    });
  }

  createPost(post3)
    .then(getPost)
    .catch((err) => {
      console.log(err);
    });
});
