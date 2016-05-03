/**
 * @author: hujiulin
 * Call content api: CURD content and element
 */
/*
* Config params
* */
api_host = "/";

api_getnode = "viewNode";
api_getelement = "getElement";
api_updateelement = "updateElement";
api_updateelements = "updateElements";
api_editreason = "editReason";
split_char = "_";
/*
* Status params
* */
country = true;
province = "";
city = "";
channel = "web";

/*
*  Get node: whole page
* */
function getNode(params) {
    var node_data = null;
    $.ajax({
            type:'get',
            url:api_host + api_getnode,
            data:{ nodename:params["nodename"], country:params["country"], province:params["province"], city:params["city"], channel:params["channel"] },
            cache:false,
            dataType:'json',
            async:false,
            success:function(data){
                //console.log(data.elements);
                node_data =  data.content;
            },
            error:function(data){
                //console.log(data);
            }
    });
    return node_data;
}

/*
 *  Get element: single element
 * */
function getElement(params) {
    $.ajax({
        type:'get',
        url: api_host + api_getelement,
        data:{ nodename:params["nodename"], country:params["country"] , province:params["province"], city:params["city"], channel:params["channel"], path:params["path"]},
        cache:false,
        dataType:'json',
        success:function(data){
            //console.log(data.elements);
        },
        error:function(data){
            //console.log(data);
        }
    });
}

/*
 *  Update element: single element
 * */
function updateElement(params) {
    $.ajax({
        type:'post',
        url: api_host + api_updateelement,
        data:{ nodename:params["nodename"], country:params["country"] , province:params["province"], city:params["city"], channel:params["channel"], path:params["path"], content:params["content"]},
        cache:false,
        dataType:'json',
        success:function(data){
            //console.log(data);
        },
        error:function(data){
            //console.log(data);
        }
    });
}
/*
 *  Update elements: muilt element
 * */
function updateElements(elements) {
    $.ajax({
        type:'post',
        url: api_host + api_updateelements,
        data:{elements:elements},
        cache:false,
        dataType:'json',
        success:function(data){
            console.log(data);
            alert("保存成功");
        },
        error:function(error){
            console.log(error);
        }
    });
}

/*
 * Generate node page from getNode api.
*/
var tpl_footer = '<div class="operationBigBtn"><button id="previewHtmlBtn">预览</button><button id="saveHtmlBtn">保存</button><button>发布</button></div>';
function getType(obj) {
    return typeof(obj);
}
function getValue(obj) {
    for (var key in obj) {
        return obj[key];
    }
}
var content = "";
function genSubContent(subLevelCon,div_classname, classname,titTag,noleaf) {
    if (!noleaf) {
        var subLevelContent='<div class="knowledgeCon_cont_main"  key="'+ div_classname+'"><div class="clearfix knowledgeCon_cont_mainHead"><'+titTag+' class="fl '+classname+'">'+subLevelCon+'</'+titTag+'>'+
            '<a href="javascript:;" class="fl copyBtn"></a><div class="choseArea clearfix fl"><a href="javascript:;" class="nationalTag fl ' + (country == true ? "flag" : "") + '" >全国统一</a>'+
            '<div class="customSel"><div class="customSelTit province"><span class="choseVal">' + province + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (province == "" || city != ""?"#eeeeee":"#3388ff") + ';">省</a></div><ul class="customSelList"></ul></div>'+
            '<div class="customSel"><div class="customSelTit city"><span class="choseVal">' + city + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (city == ""?"#eeeeee":"#3388ff") + ';">市</a></div><ul class="customSelList"></ul></div></div>'+
            '<p class="operation clearfix seondBtn"><span class="pcIcon"></span><span class="megIcon"></span><span class="fetionIcon"></span> </p></div></div>';
    }
    else {
        var subLevelContent='<div class="knowledgeCon_cont_main"   key="'+ div_classname + '">'+
            '<div class="clearfix knowledgeCon_cont_mainHead">'+
            '<'+titTag+' class="fl '+classname+'">'+subLevelCon+'</'+titTag+'>'+
            '</div></div>';
    }
    return subLevelContent;
}
function keyInEditorCache(key) {
    for (var i = 0; i < editorCache.length; i++) {
        if (editorCache[i].path == key) {
            return i;
        }
    }
    return -1;
}
function genEditorCache(key) {
    var tmp_content = "";
    for (var i = 0; i < editorCache.length; i++) {
        if (editorCache[i].path == key) {
            var obj = editorCache[i];
            var title_array = obj.path.split('_');
            var title = title_array[title_array.length - 1];
            tmp_content += '<div class="knowledgeCon_cont_main"  key="' + obj.path + '"><div class="clearfix knowledgeCon_cont_mainHead"><h4 class="fl subLevelChose">' + title + '</h4>' +
                '<a href="javascript:;" class="fl copyBtn"></a><div class="choseArea clearfix fl"><a href="javascript:;" class="nationalTag fl  ' + (obj.country == true ? "flag" : "") + '" >全国统一</a>' +
                '<div class="customSel"><div class="customSelTit province"><span class="choseVal">' + obj.province + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (obj.province == "" || obj.city != "" ? "#eeeeee" : "#3388ff") + ';">省</a></div><ul class="customSelList"></ul></div>' +
                '<div class="customSel"><div class="customSelTit city"><span class="choseVal">' + obj.city + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (obj.city == "" ? "#eeeeee" : "#3388ff") + ';">市</a></div><ul class="customSelList"></ul></div></div>' +
                '<p class="operation clearfix seondBtn"><span class="pcIcon"></span><span class="megIcon"></span><span class="fetionIcon"></span> </p></div></div>';
            tmp_content += '<div class="editorWrap" key="' + obj.path + '_editor">' +
                '<div class="ue-editor editor" id="editor-' + editorId + '" style="display: none;"></div>' +
                '<div class="editor-plain editor" id="editor-plain-' + editorId + '">' + obj.content + '</div>' +
                '<p class="partOperation"><span class="previewIcon"></span><span class="saveIcon"></span><span class="pushlishIcon"></span></p></div>';
            editorId++;
        }
    }
    return tmp_content;
}
function searchTreeTemplate(treeNode, keyList) {
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
        content = content +
            '<div class="editorWrap" key="' + key + '_editor">' +
            '<div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
            '<div class="editor-plain editor" id="editor-plain-' + editorId +'">'+ editor_content +'</div>' +
            '<p class="partOperation"><span class="previewIcon"></span><span class="saveIcon"></span><span class="pushlishIcon"></span></p></div>';
        editorId++;
        /*
        var index = keyInEditorCache(key);
        if (-1 != index) {
            content = content + genEditorCache(key);
        }*/
        keyList.pop();
        return;
    }
    else {
        if (key != "") {
            content = content + genSubContent(treeNode.title, key, "subLevelChose","h3",true);
        }
        for (var i = 0; i < treeNode.children.length; i++) {
            searchTreeTemplate(treeNode.children[i], keyList);
        }
    }
    keyList.pop();
}
function searchTree(treeNode, keyList) {
    var key = "";
    if (treeNode.title != "") {
        keyList.push(treeNode.title);
        for(var i = 0; i < keyList.length - 1; i++) {
            key += keyList[i] + "_";
        }
        key += keyList[keyList.length - 1];
    }
    if (0 == treeNode.children.length) {
        var editor_content = treeNode.content == null ? "" : treeNode.content;
        editor_content = eval("(" + editor_content + ")");
        for (var i = 0; i < editor_content.length; i++) {
            var obj = editor_content[i];
            var subLevelContent='<div class="knowledgeCon_cont_main"  key="'+ key+'"><div class="clearfix knowledgeCon_cont_mainHead"><h4 class="fl subLevelChose">'+treeNode.title+'</h4>'+
                '<a href="javascript:;" class="fl copyBtn"></a><div class="choseArea clearfix fl"><a href="javascript:;" class="nationalTag fl ' + (obj.country == true ? "flag" : "") + '" >全国统一</a>'+
                '<div class="customSel"><div class="customSelTit province"><span class="choseVal">' + obj.province + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (obj.province == "" || obj.city != ""?"#eeeeee":"#3388ff") + ';">省</a></div><ul class="customSelList"></ul></div>'+
                '<div class="customSel"><div class="customSelTit city"><span class="choseVal">' + obj.city + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (obj.city == ""?"#eeeeee":"#3388ff") + ';">市</a></div><ul class="customSelList"></ul></div></div>'+
                '<p class="operation clearfix seondBtn"><span class="pcIcon"></span><span class="megIcon"></span><span class="fetionIcon"></span> </p></div></div>';
            content = content + subLevelContent;
            obj.content = obj.content == null ? "":obj.content;
            content = content +
                '<div class="editorWrap" key="' + key + '_editor">' +
                '<div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
                '<div class="editor-plain editor" id="editor-plain-' + editorId +'">'+ obj.content +'</div>' +
                '<p class="partOperation"><span class="previewIcon"></span><span class="saveIcon"></span><span class="pushlishIcon"></span></p></div>';
            editorId++;
        }
        if (editor_content.length <= 0) {
            var obj = {};
            obj.country = true;
            obj.province = "";
            obj.city = "";
            obj.content = "";
            var subLevelContent='<div class="knowledgeCon_cont_main" style="display: none;"  key="'+ key+'"><div class="clearfix knowledgeCon_cont_mainHead"><h4 class="fl subLevelChose">'+treeNode.title+'</h4>'+
                '<a href="javascript:;" class="fl copyBtn"></a><div class="choseArea clearfix fl"><a href="javascript:;" class="nationalTag fl ' + (obj.country == true ? "flag" : "") + '" >全国统一</a>'+
                '<div class="customSel"><div class="customSelTit province"><span class="choseVal">' + obj.province + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (obj.province == "" || obj.city != ""?"#eeeeee":"#3388ff") + ';">省</a></div><ul class="customSelList"></ul></div>'+
                '<div class="customSel"><div class="customSelTit city"><span class="choseVal">' + obj.city + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (obj.city == ""?"#eeeeee":"#3388ff") + ';">市</a></div><ul class="customSelList"></ul></div></div>'+
                '<p class="operation clearfix seondBtn"><span class="pcIcon"></span><span class="megIcon"></span><span class="fetionIcon"></span> </p></div></div>';
            content = content + subLevelContent;
            content = content +
                '<div class="editorWrap" style="display: none;" key="' + key + '_editor">' +
                '<div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
                '<div class="editor-plain editor" id="editor-plain-' + editorId +'">'+ obj.content +'</div>' +
                '<p class="partOperation"><span class="previewIcon"></span><span class="saveIcon"></span><span class="pushlishIcon"></span></p></div>';
            editorId++;
        }
        /*
        var index = keyInEditorCache(key);
        if (-1 != index) {
            content = content + genEditorCache(key);
        }
        */
        keyList.pop();
        return;
    }
    else {
        if (key != "") {
            var subLevelContent='<div class="knowledgeCon_cont_main"   key="'+ key + '"' + (treeNode.empty==true?'style="display:none;"':'') + '>'+
                '<div class="clearfix knowledgeCon_cont_mainHead">'+
                '<h3 class="fl subLevelChose">'+treeNode.title+'</h3>'+
                '</div></div>';
            content = content + subLevelContent;
        }
        for (var i = 0; i < treeNode.children.length; i++) {
            searchTree(treeNode.children[i], keyList);
        }
    }
    keyList.pop();
}
function getTplDataTreeJson(data, template) {
    var template = arguments[1] ? arguments[1] : false;
    content = '<div class="knowledgeCon_tit clearfix"><div class="clearfix">'+
        '<input type="text" name="knowledge_point_name" placeholder="知识点名称" class="fl" readonly>'+
        '<a href="javascript:;" class="nationalTag fl ' + (country == true ? "flag" : "") + '">全国统一</a>'+
        '<div class="customSel"><div class="customSelTit province"><span class="choseVal">' + province + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (province == "" || city != ""?"#eeeeee":"#3388ff") + ';">省</a></div><ul class="customSelList"></ul></div>'+
        '<div class="customSel"><div class="customSelTit city"><span class="choseVal">' + city + '</span><a href="javascript:;" class="choseBtn" style="background: ' + (city == ""?"#eeeeee":"#3388ff") + ';">市</a></div><ul class="customSelList"></ul></div>'+
        '<input type="button" id="editKb" name="editKb" value="更新" style="margin: 0px;padding: 0px;min-width: 80px;height: 28px;color:#000;"/><p class="operation clearfix seondBtn"><span class="pcIcon"></span><span class="megIcon"></span><span class="fetionIcon"></span></p>'+
        '</div></div>';
    if (template == false) {
        // 遍历树
        searchTree(data, []);
    }
    else {
        searchTreeTemplate(data, []);
    }
    content = content + tpl_footer;
    $(".knowledgeCon").html(content);
    //编辑添加理由
    isEdit = false;
    $("#editKb").live("click", function() {
        if (isEdit == true) {
            return;
        }
        $('#editReason_pop').show();
        $("#kb_nodename").html(nodename);
        $("#editReasonNextBtn").live("click", function () {
            var reason = $("#edit_reason").val();
            if ("" == reason) {
                alert("请先输入更新理由.");
                return false;
            }
            closePop();
            $(this).css("background-color", "#3388ff");
            isEdit = true;
            $.ajax({
                url:api_host + api_editreason,
                type:'post',
                data:{nodename:nodename, reason:reason},
                sync:false,
                success: function(data) {
                    console.log(data);
                },
                error: function(error) {
                    console.log(error)
                }
            });
        })
    });
    // 渠道
    if ("web" == channel) {
        $(".pcIcon").css("background-image", "url('../images/pc2.png')");
        $(".megIcon").css("background-image", "url('../images/meg.png')");
        $(".fetionIcon").css("background-image", "url('../images/fetion.png')");
    }
    if ("message" == channel) {
        $(".pcIcon").css("background-image", "url('../images/pc.png')");
        $(".megIcon").css("background-image", "url('../images/meg2.png')");
        $(".fetionIcon").css("background-image", "url('../images/fetion.png')");
    }
    if ("fetion" == channel) {
        $(".pcIcon").css("background-image", "url('../images/pc.png')");
        $(".megIcon").css("background-image", "url('../images/meg.png')");
        $(".fetionIcon").css("background-image", "url('../images/fetion2.png')");
    }
}
/*
 * get node page by getElement api
 * */
function genNodePage(template) {
    var template = arguments[0] ? arguments[0] : false;
    params = {nodename:nodename,country:country,province:province,city:city,channel:channel};
    var data = getNode(params);
    templateRead(JSON.stringify(data));
    getTplDataTreeJson(data, false);
    return data;
}

/*
* Save node page by updateElement api
* */
function saveNodePage() {
    var elements = $(".knowledgeCon")
    var sub_level = $(elements.find(".knowledgeCon_cont_main")[0]);
    var list = new Array();
    while (null != sub_level.html()) {
        //console.log(path);
        if (sub_level.attr('class') == "editorWrap") {
            var content = sub_level.find(".editor-plain").html();
            var path = sub_level.attr("key");
            path = path.replace("_editor", "");
            //updateElement({ nodename:nodename, country:country, province:province, city:city, channel:channel, path:path, content:content});
            var obj = {};
            obj.nodename = nodename;
            obj.country = country;
            obj.province = province;
            obj.city = city;
            obj.channel = channel;
            obj.path = path;
            obj.content = content;
            list.push(obj);
        }
        sub_level = sub_level.next();
    }
    list = JSON.stringify(list);
    updateElements(list);
    //console.log(list);
}
/*
 *  Get single content by getElement
 * */
function Getcontent(Element){
    var country,province,city,channel,path;
    var ParentElement = $(Element).parent("div[class*='customSelTit']");
    var classes = ParentElement.attr('class');
    if(classes === 'customSelTit province'){
        province = $(Element).prev().html();
        city =$(Element).parents("div[class='customSel']").next().children("div[class='customSelTit city']").children("span").html() ;
    }
    if(classes === 'customSelTit city'){
        city = $(Element).prev().html();
        province = ParentElement.parent("div[class='customSel']").prev().children("div[class='customSelTit city']").children("span").html();
    }
    country = $(Element).parents("div[class='choseArea clearfix fl']").children('a').attr('class');
    city = city != null ? city :"";
    province = province != null ? province :"";
    country = /.*flag$/.test(country) ? true : false;
    channel = 'web';
    path = $(Element).parents("div[class='knowledgeCon_cont_main']").attr('key');
    $.ajax({
        type:'get',
        url: api_host + api_getelement,
        data:{ nodename:nodename, country:country , province:province, city:city, channel:channel, path:path},
        cache:false,
        dataType:'json',
        success:function(data){
            $(Element).parents("div[class='knowledgeCon_cont_main']").next().find(".editor-plain").html(data.ele_content);
            var id = $(Element).parents("div[class='knowledgeCon_cont_main']").next().find(".editor-plain").attr("id").split("-")[2];
            var ue = UE.getEditor("editor-"+id);
            ue.ready(function() {
                if (!existInIds(id)) {
                    editor_id_array.push(id);
                }
                var innerHtml = $("#editor-plain-"+id).html();
                ue.setContent(innerHtml);
            });

        },
        error:function(error){
            console.log(error);
        }
    });
}
/*
 * Save single content  by  updateElement api
 * */
$(".saveIcon").live('click',function(){
    // 切换editor
    slideEditorToDiv();

    var nodename,country,province,city,channel,path,content;
    nodename = $("input[name=knowledge_point_name]").val();
    content = $(this).parents("p[class='partOperation']").prev().html();
    path = $(this).parents("div[class='editorWrap']").prev().attr('key');
    channel = 'web';
    city =  $(this).parents("div[class='editorWrap']").prev().find("span[class='choseVal']").eq(1).html();
    province =  $(this).parents("div[class='editorWrap']").prev().find("span[class='choseVal']").eq(0).html();
    country =  $(this).parents("div[class='editorWrap']").prev().find("a[class^='nationalTag']").attr('class');
    city = city != null ? city :"";
    province = province != null ? province :"";
    country = /.*flag$/.test(country) ? true : false;
    params = {
        nodename : nodename,
        province : province,
        city : city,
        country : country,
        channel : channel,
        path : path,
        content : content

    }
    console.log(params);
    $.ajax({
        type:'post',
        url: api_host + api_updateelement,
        data:{ nodename:params["nodename"], country:params["country"] , province:params["province"], city:params["city"], channel:params["channel"], path:params["path"], content:params["content"]},
        cache:false,
        dataType:'json',
        success:function(data){
            alert("保存成功!");
        },
        error:function(error){
            console.log(error);
        }
    });
})