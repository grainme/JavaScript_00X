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

  // Fetch Posts from posts List!
  const getPost = () => {
    setTimeout(() => {
      let postList = document.createElement("ol");
      let output = "";
      posts.forEach((post) => {
        output += `<li><h2>${post.title}</h2><p>${post.body}</p></li>`;
      });
      postList.innerHTML = output;
      document.body.appendChild(postList);
    }, 1000);
  };

  // Add post to Posts List
  const createPost = (post) => {
    setTimeout(() => {
      posts.push(post), 1000;
    });
  };

  getPost();
  createPost();
});
