
const pathname = location.pathname;
let urlParams = new URLSearchParams(location.search);


function loadPageLink(){
    //Lấy ra current page
    const currentPage = urlParams.get("page") || 1;
    $('#pagination li a').each((index, item) => {

        //itemPage là giá trị của page mà page-link nắm giữ
        let itemPage = $(item).attr('href').split('=')[1];

        //urlParams là url của page hiện tại (bao gồm các giá trị đã filter)
        urlParams.set("page", itemPage);

        //sửa lại href cho page-link = pathname + '?' + urlParams.toString();
        //Lúc này trong href của page-link sẽ ko bị mất các filter ta đã chọn
        const itemHref = pathname + '?' + urlParams.toString();
        $(item).attr('href', itemHref);
    })

    //Sửa lại page cho urlParams về lại giá trị currentPage
    urlParams.set("page", currentPage);

}


$(document).ready(function() {
    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');
    loadPageLink();
});


$("#pagination").on('click', '.page-link', function(e) {

    //Ngăn chặn load lại trang khi click vào page-link
    e.preventDefault();

    //item là page-link element
    const item = $(e.target).closest("li").find("a");;

    const pageHref = item.attr('href');
    console.log('pageHref:', pageHref);


    const clickPageNum = pageHref.split("page=")[1];
    const page = clickPageNum.split("&")[0];

    console.log("clickPageNum: ", clickPageNum);
    console.log("page: ", page);
    selectParam('page', page);
})

