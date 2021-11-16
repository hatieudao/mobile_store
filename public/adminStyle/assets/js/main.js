const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const adminSidebarCollapse = $("#adminSidebarCollapse");
const adminSidebar = $("#adminSidebar");

adminSidebarCollapse.onclick = function(){
    adminWrapper.classList.toggle('admin-sidebar--hide');
}

// adminSidebarCollapse.onclick = function(){
//     adminSidebar.classList.toggle('admin-sidebar--hide');
// }

// $(document).ready(function () {
//     $('#adminSidebarCollapse').on('click', function () {
//         console.log("add class")
//         $('#adminSidebar').classList.add('admin-sidebar--hide');
//     });
// });

