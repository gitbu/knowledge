var country = true;
var province = "";
var city = "";
var channel = "web";
var content = "";
function getUrlParam(name){
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r!=null) return decodeURI(r[2]);
    return null;
}
function genSubContent(subLevelCon,div_classname, classname,titTag,noleaf) {
    if (!noleaf) {
        var subLevelContent='<div class="knowledgeCon_cont_main"  key="'+ div_classname+'"><div class="clearfix knowledgeCon_cont_mainHead"><'+titTag+' class="fl '+classname+'">'+subLevelCon+'</'+titTag+'>'+
            '</div></div>';
    }
    else {
        var subLevelContent='<div class="knowledgeCon_cont_main"   key="'+ div_classname + '">'+
            '<div class="clearfix knowledgeCon_cont_mainHead">'+
            '<'+titTag+' class="fl '+classname+'">'+subLevelCon+'></'+titTag+'>'+
            '</div></div>';
    }
    return subLevelContent;
}
function searchTree(treeNode, keyList) {
    if (treeNode.empty == true) return;
    var key = "";
    if (treeNode.title != "") {
        keyList.push(treeNode.title);
        for(var i = 0; i < keyList.length - 1; i++) {
            key += keyList[i] + "_";
        }
        key += keyList[keyList.length - 1];
    }
    if (0 == treeNode.children.length) {
        content = content + genSubContent(treeNode.title, key, "subLevelChose","h4",false);
        var editor_content = treeNode.content == null ? "" : treeNode.content;
        editor_content = eval("(" + editor_content + ")");
        var fill_content = "";
        for (var i = 0; i < editor_content.length; i++) {
            var obj = editor_content[i];
            var tmp_country = obj.country == true ? "全国":"";
            var tmp_province = obj.province;
            var tmp_city = obj.city;
            if (tmp_country != "")
                fill_content += "<span class='location'>" + tmp_country + "</span>";
            if (tmp_province != "")
                fill_content += "<span class='location'>" + tmp_province + "</span>";
            if (tmp_city != "")
                fill_content += "<span class='location'>" + tmp_city + "</span>";
            fill_content += "<div class='content'>";
            fill_content += obj.content == null ? "":obj.content;
            fill_content += "</div>";
            fill_content +=  "<div style='clear:both;height: 0px;'></div>";
        }
        content = content +
            '<div class="editorWrap" key="' + key + '_editor">' +
            '<div class="editor-plain editor">'+ fill_content +'</div>' +
            '<p class="partOperation"><span class="previewIcon"></span><span class="saveIcon"></span><span class="pushlishIcon"></span></p></div>';
        keyList.pop();
        return;
    }
    else {
        if (key != "") {
            content = content + genSubContent(treeNode.title, key, "subLevelChose","h3",true);
        }
        for (var i = 0; i < treeNode.children.length; i++) {
            searchTree(treeNode.children[i], keyList);
        }
    }
    keyList.pop();
}
$(document).ready(function () {
    if (getUrlParam("country") == true || getUrlParam("country") == 'true') {
        $(".provinces_span").html("全国");
        $(".city_span").html("全国");
    }
    else {
        $(".provinces_span").html(getUrlParam("province"));
        $(".city_span").html(getUrlParam("city"));

        province = getUrlParam("province");
        city = getUrlParam("city");
    }
    $("#search").val(getUrlParam("search"));
    country = getUrlParam("country");
    var nodename = getUrlParam("nodename");
    $(".filter_sort_new").html(nodename);
    $.ajax({
        url: "/viewNode",
        type: "get",
        async: "false",
        dataType: "json",
        data: {nodename:nodename, country:country, province:province, city:city, channel:channel},
        success: function(data) {
            // var data = test_data;
            content = "";
            searchTree(data.content, []);
            $(".detail_cont").html(content);
        },
        error: function(error) {
            console.log(error);
        }
    });
});
