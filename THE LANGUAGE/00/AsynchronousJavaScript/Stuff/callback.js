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

getPosts = () => {
  setTimeout(() => {
    let output = "";
    posts.forEach((post, index) => {
      output += `<li>${post.title} : ${post.body}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
};

getPosts();
