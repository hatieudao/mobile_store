$(".dropdown-item").click(function (e){
    const value = $(this).text();
    console.log(value);
    console.log($(this).closest('.dropdown-menu-group').find("input").val(value));
})

$("#selectAll").click(function(){
    $('.select-row-checkbox').not(this).prop('checked', this.checked);
});

$('#resetBtn').click(function (){
    console.log("sang");
    $('input[type=text]').val("");
    $('input[type=number]').val("");
    $('#limit').val('10');
})