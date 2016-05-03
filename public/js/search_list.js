function getUrlParam(name){
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r!=null) return decodeURI(r[2]);
    return null;
}
$(document).ready(function () {
    var country = true;
    var province = "";
    var city = "";
    var channel = "web";
    if (getUrlParam("country") == true || getUrlParam("country") == 'true') {
        $(".provinces_span").html("全国");
        $(".city_span").html("全国");
    }
    else {
        $(".provinces_span").html(getUrlParam("province"));
        $(".city_span").html(getUrlParam("city"));

        country = false;
        province = getUrlParam("province");
        city = getUrlParam("city");
    }
    $("#search").val(getUrlParam("search"));
    var keywords = getUrlParam("search");
    $.ajax({
        url: "/searchList",
        async: false,
        data:{country:country, province:province, city:city, channel:channel, keywords:keywords},
        success: function(data) {
            data = eval('(' + data + ')');
            var list_items = "";
            for (var i = 0; i < data.total_hits;i++) {
                var obj = data.res[i];
                list_items += '<div class="filter_con_list_item "><div class="filter_con_list_item_wrapper">' +
                    '<a href="/search_list_item.html?nodename=' + obj.nodename + '&search=' + keywords + '&country=' + obj.country + '&province=' + obj.province + '&city=' + obj.city + '" target="_blank" >' +
                    '<h4>' + obj.nodename + '</h4>' +
                    '<div class="list_conDetail">' + obj.docfragment +
                    '</div><div class="list_tag_wrapper">' +
                    '<span class="list_tagIcon"></span><ul class="clearfix"></ul><div class="clears"></div></div>' +
                    '</a></div></div>';
                list_items += '<div class="clears"></div>';
            }
            $(".filter_con_wrapper").html(list_items);
        },
        error: function(error) {
            console.log(error);
        }
    });
});