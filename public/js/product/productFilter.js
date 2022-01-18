
const urlParamFilter = new URLSearchParams(location.search);

let params = {
    page: 1,
    brandId: 0,
    price: 0,
    sort: 0,
    search: ''
};


for (let key in params) {
    if (!urlParamFilter.has(key)) {
        urlParamFilter.append(key, params[key]);
    }
}


$(document).ready(() =>{
    for (let key in params){
        const control = $(`#${key}${urlParamFilter.get(key)}`);
        if (control){
            $(control).prop('checked', true);
        }
    }

    const full_url = location.href;
    const start_price = full_url.lastIndexOf('price');
    if (start_price > 0) {
        const priceId = parseInt(full_url.slice(start_price + 6, start_price + 7));
        document.getElementsByName('price')[priceId].checked = true;
    }

    const start_sort = full_url.lastIndexOf('sort');
    if (start_sort > 0){
        const sortId = parseInt(full_url.slice(start_sort + 5, start_sort + 6));
        document.getElementsByName('sort')[sortId].checked = true;
    }
})

function selectParamResetPageNum(key, value, reset = false) {
    selectParam(key, value);
    selectParam('page', 1);
}

function selectParam(key, value, reset = false) {
    //if (reset) {
    //    for (let key in params) {
    //        urlParams.set(key, params[key]);
    //    }
    //}

    urlParamFilter.set(key, value);
    let url = `/product?${urlParamFilter.toString()}`;
    location.href = url;
}

