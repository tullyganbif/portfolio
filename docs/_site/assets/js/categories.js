const categories = { NextJS: [{ url: `/posts/tileforge/`, date: `2023-06-29 00:00:00 -0300`, title: `TileForge`},{ url: `/posts/tileforge-website/`, date: `2023-06-25 00:00:00 -0300`, title: `TileForge Website`},],React: [{ url: `/posts/tileforge/`, date: `2023-06-29 00:00:00 -0300`, title: `TileForge`},{ url: `/posts/protogen/`, date: `2023-06-27 00:00:00 -0300`, title: `Protogen`},{ url: `/posts/tileforge-website/`, date: `2023-06-25 00:00:00 -0300`, title: `TileForge Website`},],React_Redux: [{ url: `/posts/tileforge-website/`, date: `2023-06-25 00:00:00 -0300`, title: `TileForge Website`},],Contentful: [{ url: `/posts/tileforge-website/`, date: `2023-06-25 00:00:00 -0300`, title: `TileForge Website`},],TailwindCSS: [{ url: `/posts/tileforge-website/`, date: `2023-06-25 00:00:00 -0300`, title: `TileForge Website`},],TypeScript: [{ url: `/posts/tileforge/`, date: `2023-06-29 00:00:00 -0300`, title: `TileForge`},{ url: `/posts/protogen/`, date: `2023-06-27 00:00:00 -0300`, title: `Protogen`},],Django: [{ url: `/posts/protogen/`, date: `2023-06-27 00:00:00 -0300`, title: `Protogen`},],SQL: [{ url: `/posts/protogen/`, date: `2023-06-27 00:00:00 -0300`, title: `Protogen`},],Python: [{ url: `/posts/ottoplot/`, date: `2023-06-28 00:00:00 -0300`, title: `OttoPlot`},],VEX: [{ url: `/posts/ottoplot/`, date: `2023-06-28 00:00:00 -0300`, title: `OttoPlot`},],Houdini: [{ url: `/posts/ottoplot/`, date: `2023-06-28 00:00:00 -0300`, title: `OttoPlot`},],PixiJS: [{ url: `/posts/tileforge/`, date: `2023-06-29 00:00:00 -0300`, title: `TileForge`},],Supabase: [{ url: `/posts/tileforge/`, date: `2023-06-29 00:00:00 -0300`, title: `TileForge`},], }

console.log(categories)

window.onload = function () {
  document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", function (e) {
      const posts = categories[e.target.innerText.replace(" ","_")];
      let html = ``
      posts.forEach(post=>{
        html += `
        <a class="modal-article" href="${post.url}">
          <h4>${post.title}</h4>
          <small class="modal-article-date">${post.date}</small>
        </a>
        `
      })
      document.querySelector("#category-modal-title").innerText = e.target.innerText;
      document.querySelector("#category-modal-content").innerHTML = html;
      document.querySelector("#category-modal-bg").classList.toggle("open");
      document.querySelector("#category-modal").classList.toggle("open");
    });
  });

  document.querySelector("#category-modal-bg").addEventListener("click", function(){
    document.querySelector("#category-modal-title").innerText = "";
    document.querySelector("#category-modal-content").innerHTML = "";
    document.querySelector("#category-modal-bg").classList.toggle("open");
    document.querySelector("#category-modal").classList.toggle("open");
  })
};