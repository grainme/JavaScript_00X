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

  getPost = () => {
    let postList = document.createComment("ol");
    let output = "";
    posts.forEach((post) => {
      output += `<li><h2>${post.title}</h2><p>${post.body}</p></li>`;
      console.log(output);
    });
    postList = output;
    let body = document.querySelector("body");
    body.appendChild(postList);
  };

  getPost();
});
