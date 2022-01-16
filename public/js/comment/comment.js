
const paginationSource = $("#paginationTemplate").html();
const paginationTemplate = Handlebars.compile(paginationSource);


let rated = 5;
$(document).ready(function () {

    $("#s1").click(function () {
        $("#s1").css("color", "#FFCC36");
        $("#s2,#s3,#s4,#s5").css("color", "#CCC");
        rated = 1;
    })
    $("#s2").click(function () {
        $("#s1,#s2").css("color", "#FFCC36");
        $("#s3,#s4,#s5").css("color", "#CCC");
        rated = 2;
    })
    $("#s3").click(function () {
        $("#s1,#s2,#s3").css("color", "#FFCC36");
        $("#s4,#s5").css("color", "#CCC");
        rated = 3;
    })
    $("#s4").click(function () {
        $("#s1,#s2,#s3,#s4").css("color", "#FFCC36");
        $("#s5").css("color", "#CCC");
        rated = 4;
    })
    $("#s5").click(function () {
        $("#s1,#s2,#s3,#s4,#s5").css("color", "#FFCC36");
        rated = 5;
    })


    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');

    loadPageLink();

})

$('#postcomment').on('click', e => {
    e.preventDefault();
    // let content = $('input[name=content]').val();
    let content = $('textarea#content').val();
    $('textarea#content').val(null);
    let mobileId = $('input[name=mobileId]').val();
    let userid = $('input[name=userId]').val();
    $.ajax({
        url: '/api/product/addComment',
        method: 'POST',
        data: {
            user_id: userid,
            mobile_id: mobileId,
            rating: rated,
            content: content
        },
        success: function (data) {
            console.log(data);

            const arrHrefs =  $('a[href*="?page=1"]')
            console.log("arrHrefs: ",arrHrefs.html());
            arrHrefs.trigger('click');

        }
    })
});


const pathname = location.pathname;
let urlParams1 = new URLSearchParams(location.search);

function loadPageLink() {
    //Lấy ra current page
    const currentPage = urlParams1.get("page") || 1;
    $('#pagination li a').each((index, item) => {

        //itemPage là giá trị của page mà page-link nắm giữ
        let itemPage = $(item).attr('href').split('=')[1];

        //urlParams1 là url của page hiện tại (bao gồm các giá trị đã filter)
        urlParams1.set("page", itemPage);

        //sửa lại href cho page-link = pathname + '?' + urlParams1.toString();
        //Lúc này trong href của page-link sẽ ko bị mất các filter ta đã chọn
        const itemHref = pathname + '?' + urlParams1.toString();
        $(item).attr('href', itemHref);
    })

    //Sửa lại page cho urlParams1 về lại giá trị currentPage
    urlParams1.set("page", currentPage);

}


const ratingsSource = $("#ratingsTemplate").html();
const ratingsTemplate = Handlebars.compile(ratingsSource);


$("#pagination").on('click', '.page-link', function (e) {

    //Ngăn chặn load lại trang khi click vào page-link
    e.preventDefault();

    //item là page-link element
    const item = $(e.target).closest("li").find("a");
    console.log("page link click");

    const pageHref = item.attr('href');

    //filter là params cùa filter mà ta chọn
    //ta cách ra sau "?" của page-link href
    const filter = pageHref.split("?")[1]
    console.log("filter", filter);

    //Url của API
    // const urlApi = "/api" + "/product" + "?" + filter;
    const urlApi = `/api/product/${$('input[name=mobileId]').val()}/comment` + "?" + filter;
    console.log(urlApi);


    const clickPageNum = pageHref.split("page=")[1];
    console.log("clickPageNum: ", clickPageNum);


    $.ajax({
        url: urlApi,
        // url: `/api/product/${$('input[name=mobileId]').val()}/comment`,
        success: function (data) {
            console.log("data rating:", data);
            const comments = data.comments;
            const pagination = data.pagination;

            console.log("ajax page click");
            console.log("comments", comments);
            console.log("pagination", pagination);

            const ratings = $("#ratings");

            let itemPage = $(item).attr('href').split('=')[1];
            urlParams1.set("page", itemPage);
            pagination.page = clickPageNum;

            console.log("pagination now", pagination);
            ratings.html(ratingsTemplate({comments}));
            console.log("ratings: ", ratings);
            console.log("ratings html: ", ratings.html());

            $("#pagination").html(paginationTemplate({pagination, paginationClass: "pagination"}));
            console.log("pagi html: ", $("#pagination").html());
        }
    })
})
