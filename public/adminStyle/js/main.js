const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const adminSidebarCollapse = $("#adminSidebarCollapse");
const adminSidebar = $("#adminSidebar");

adminSidebarCollapse.onclick = function(){
    adminWrapper.classList.toggle('admin-sidebar--hide');
}
