var editorId = 1;
var nodename = "";
var isEdit = false;
var editorCache = [];
var setting = {
    view: {
        dblClickExpand: true
    },
    callback: {
        onRightClick: OnRightClick,
        onClick: OnClick,
        beforeRename: OnBeforeRename,
        onCheck:OnCheck
    },
    edit: {
        enable: true,
        showRenameBtn: false,
        renameTitle: "重命名",
        showRemoveBtn: false,

    }
};
zTree = $.fn.zTree.getZTreeObj("treeDemo");
rMenu = $("#rMenu");

$(".ztree").height($(window).height() - 144);
function OnCheck(event, treeId, treeNode) {
    var path = [],tmpNode = treeNode;
    while (null != tmpNode) {
        path.push(tmpNode);
        tmpNode = tmpNode.getParentNode();
    }
    var path_str = "";
    for (var i = path.length - 1; i >= 1; i--) {
        path_str += path[i].name;
       if (path[i].checked == false) {
           $('[key^="' + path_str + '"]').css("display", "none");
       }
        path_str += "_";
    }
    path_str += path[i].name;
    if (treeNode.checked == true) {
        path_str_tmp = "";
        for (var i = path.length - 1; i >= 1; i--) {
            path_str_tmp += path[i].name;
            $('[key="' + path_str_tmp + '"]').css("display", "block");
            path_str_tmp += "_";
        }
        $('[key^="' + path_str + '"]').css("display", "block");
    }
    else {
        $('[key^="' + path_str + '"]').css("display", "none");
    }
}
function OnClick(event, treeId, treeNode) {
    if(treeNode.category!=2){ // 知识点栏目树 移动到指定位置
        var path = [];
        var tmpNode = treeNode;
        while (null != tmpNode) {
            path.push(tmpNode);
            tmpNode = tmpNode.getParentNode();
        }
        var path_str = "";
        for (var i = path.length - 1; i >= 1; i--) {
            path_str += path[i].name + "_";
        }
        path_str += path[i].name;

        $("html,body").stop(true);
        $("html,body").animate({scrollTop: $("div[key='"+ path_str +"_editor']").offset().top - 90}, 500);
        return;
    }
    nodename = treeNode.name;
    editorCache = [];
    genNodePage();
    $('input[name="knowledge_point_name"]').val(nodename);
}
function OnRightClick(event, treeId, treeNode) {
    //判断是否为ie
    if(window.attachEvent){
        $("#Left")[0].oncontextmenu=function(e){
            var e = e || window.event;
            if(e.preventDefault){
                e.preventDefault();
            }

            if (e.stopPropagation){
                e.stopPropagation();
            }else{
                e.returnValue = false; // 解决IE8右键弹出
                e.cancelBubble = true;
            }
        }
    }

    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(e.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode.category==0) {
        zTree.selectNode(treeNode);
        showRMenu("folder", event.clientX, event.clientY);
        //$("#rMenu > ul > li").show();
    } else if (treeNode && treeNode.category === 1) {
        zTree.selectNode(treeNode);
        showRMenu("node", event.clientX, event.clientY, treeNode);
    } else if(treeNode && treeNode.category === 2){
        zTree.selectNode(treeNode);
        showRMenu("kn-point", event.clientX, event.clientY, treeNode);
    }

}
var FalseData=null;
// 重置全局参数环境
function resetGlobalEnv() {
    $(".knowledgeCon").html("");
    for(var i in editor_id_array) {
        console.log(editor_id_array[i]);
        UE.getEditor("editor-"+editor_id_array[i]).destroy();
    }
    editor_id_array = new Array();
    editorId = 1;
    nodename = "";
    country = true;
    province = "";
    city = "";
    channel = "web";
    editorCache = [];
}
//加载数据
function readTree(){
    $("#typeCheck").remove();
    $.ajax({
        type: "get",
        url: "/readTree?nodename=root",
        data: {},
        async:false,
        success: function(data) {
            var result = eval('(' + data + ')');
            FalseData = result.root.children;
            //数据整理
            for (var i = 0, lena = FalseData.length; i < lena; i++) {
                if (FalseData[i].category == 0 || FalseData[i].category == 1) {
                    FalseData[i].isParent = true;
                    if (FalseData[i]['children'].length != 0) {
                        for (var j = 0, lenb = FalseData[i]['children'].length; j < lenb; j++){
                            if (FalseData[i]['children'][j].category == 0 || FalseData[i]['children'][j].category == 1) {
                                FalseData[i]['children'][j].isParent = true;
                            }
                        }
                    }
                }
            }
            setting.check={enable: false};
            $.fn.zTree.init($("#treeDemo"), setting, FalseData);
            zTree = $.fn.zTree.getZTreeObj("treeDemo");
            resetGlobalEnv();
        }
    })
}
// 读取知识点模板树
function templateRead(result){
    var str='<section id="typeCheck"><div class="checkboxThree"><input type="checkbox" value="1" style="display: none;" onclick="typeCheck(this)" id="checkboxThreeInput" name="" /> <label for="checkboxThreeInput"></label> </div></section>'
    $(".zTreeDemoBackground").prepend(str);
    var newstr = result.replace(/title/g,"name");
    var newstrs = newstr.replace(/"empty":true/g,"'checked':false");
    var newstrss = newstrs.replace(/"empty":false/g,"'checked':true");
    var zNodes = eval('(' + newstrss + ')');
    setting.check={enable: true};
    setting.data={simpleData: {
        enable: true
    }}
    $.fn.zTree.init($("#treeDemo"), setting,zNodes.children);
    zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.expandAll(true);

}
//知识点类型全选和反选
function typeCheck(obj){
    var checking = $(obj).attr("checked");
    var nodes = zTree.getNodes();
    for (var i = 0; i < nodes.length; i++) {
        zTree.checkNode(nodes[i], checking, true, true);
    }
    //zTree.checkAllNodes(checking);
    zTree.refresh();
}
//鼠标右击事件
function showRMenu(type, x, y, node) {
    $("#rMenu ul").show();
    var privilege = $("#hidden_privilege").val();
    if (type == "root") {
        $("#m_add_folder").show();
        $("#add_ken").hide();
        $("#del_ken").hide();
        $("#m_rename").hide();
        $("#add_module").hide();
    } else if (type == "folder") {
        $("#m_add_folder").show();
        $("#m_rename").show();
        $("#del_ken").hide();
        $("#add_ken").hide();
        $("#add_module").hide();
    } else if(type == "node") {
        $("#add_ken").show();
        $("#del_ken").show();
        $("#m_rename").show();
        $("#m_add_folder").hide();
        $("#add_module").hide();
    } else if(type == "kn-point"){
        $("#del_ken").show();
        $("#m_rename").show();
        $("#add_module").show();
        $("#m_add_folder").hide();
        $("#add_ken").hide();
    }
    $("#rMenu").css({"top": y + "px", "left": x + "px", "visibility": "visible"});
    $("body").bind("mousedown", onBodyMouseDown);
}
//隐藏右击菜单
function hideRMenu() {
    $("#rMenu").css({"visibility": "hidden"});
    $("body").unbind("mousedown");
}
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        $("#rMenu").css({"visibility": "hidden"});
    }
}

//添加模板
function addModule(){
    hideRMenu();
    $("#creatMb_pop").show();
    $(".knowledgeCon").html("");
}
//新增知识点
function addTreeNode(){
    $('#creatKen_pop').show();
    $(".knowledgeCon").html("");

}
//注册事件封装方法
function addEventHandler(target,type,func){
        if(target.addEventListener){
        //监听IE9，谷歌和火狐
        target.addEventListener(type, func, false);
    }else if(target.attachEvent){
        target.attachEvent("on" + type, func);
    }
}
//移除事件封装
function removeEventHandler(target,type,func){
    if(target.removeEventListener){
        //监听IE9，谷歌和火狐
        target.removeEventListener(type, func, false);
    }else if(target.detachEvent){
        target.detachEvent("on" + type, func);
    }
}
// 新增知识点下一步
var kbBtn = document.getElementById('creatKenNextBtn');
addEventHandler(kbBtn,'click',nextOne);
addEventHandler(kbBtn,'click',nextTwo);
//新建模板下一步
var mbBtn = document.getElementById('creatMbNextBtn');
addEventHandler(mbBtn,'click',nextTwo);
//注册 新增知识点下一步中执行的事件
function nextOne(){
    var nodes = zTree.getSelectedNodes(),
            newNode,newNodes;
    hideRMenu();
    var kb=$("#add_kb").val();
    var newNode={nodename:nodes[0].name,subnodename:kb,category:2};
    //增加节点
    $.ajax({
        type: "post",
        url: "/addKb",
        datatype: "json",
        data: newNode,
        async:false,
        success: function(data){
            var result=eval('('+data+')');
            if(result.success){
                nodename=kb;
                newNodes = zTree.addNodes(nodes[0],{name:kb,category:2});
                zTree.updateNode(newNodes);
            }else{
                removeEventHandler(kbBtn,'click',nextTwo);
                addEventHandler(kbBtn,'click',nextTwo);
                zTree.removeNode(newNodes);
                closePop();
                alert('该知识点已存在');

            }
        }
    });
}
//注册  添加知识点执行的第二个事件  和  添加模板下一步的事件
function nextTwo(){
    var type = $("#chose_mb").val();
    var add_kb = $("#add_kb").val();
    $.ajax({
        type : 'post',
        url : '/readTemplate',
        data : {nodename:add_kb,templateType:type},
        datatype: "json",
        success : function(result){
            var data = eval("(" + result + ")");
            getTplDataTreeJson(eval("(" + data.template + ")"), true);
            templateRead(data.template);
            $('input[name="knowledge_point_name"]').val($("#add_kb").val());
            $("#editKb").css("display", "none");
            isEdit = true;
            closePop();
        },
        error: function(error) {
            console.log(error);
            alert("新增知识点失败，请联系管理员.");
        }
    })
}
//添加文件夹
function addFolder(){
    var nodes = zTree.getSelectedNodes(),
            newNode;
    hideRMenu();
    type=0;
    if(nodes.length<=0){
        nodes[0]=null;
        var type=1;
    }
    newNode={name:'新建文件夹',category:type,isParent:true,addTag:true};
    var newNodes = zTree.addNodes(nodes[0],newNode);
    zTree.editName(newNodes[0]);
}
//重命名
function renameTreeNode() {
    hideRMenu();
    var nodes = zTree.getSelectedNodes();
    zTree.editName(nodes[0])

}
//重命名回调函数
function OnBeforeRename(treeId, treeNode, newName, isCancel) {
    //判断是否为添加后的节点
    if(treeNode.addTag){
        var flag=false;
        var parentName=treeNode.getParentNode();
        var newNode={nodename:parentName.name,subnodename:newName,category:treeNode.category+1};
        delete treeNode.addTag;
        treeNode.category++;
        $.ajax({
            type: "post",
            url: "/addKb",
            datatype: "json",
            data: newNode,
            async:false,
            success: function(data){
                var result=eval('('+data+')');
                if(result.success){
                    alert('添加成功');
                    zTree.updateNode(treeNode);
                    flag=true;
                }else{
                    alert('添加失败');
                    flag=true;
                    zTree.removeNode(treeNode);

                }
            },
        });
    }
    if(flag){
        return;
    }
    if ((!isCancel) && treeNode.name != newName) {
        var node_id = treeNode.id,
                oldName = treeNode.name,
                level = treeNode.level,
                nodeName = [],
                bool = true,
                parentId = '';
        var thisNode = treeNode.getParentNode();
        if (thisNode) {
            parentId = thisNode.id;
            while (thisNode) {
                nodeName.unshift(thisNode.name);
                thisNode = thisNode.getParentNode();
            }
        }
        var nodeData = nodeName.join("/");
        $.ajax({
            url: "/treeRename",
            type: "post",
            async: false,
            data: {oldname: oldName, newname: newName},
            datatype: "json",
            success: function (data) {
                var result=eval('('+data+')');
                if (result.success) {
                    alert('修改成功');
                } else {
                    alert('不能和其他知识点重名');
                }
            }
        })
    }
}
//删除节点
function removeTreeNode(){
    hideRMenu();
    var nodes = zTree.getSelectedNodes(),
            thisNode = nodes[0],
            nodeName = [], isDel;
    while (thisNode) {
        nodeName.unshift(thisNode.name);
        thisNode = thisNode.getParentNode();
    }
    var nodeData = nodeName.join("/");
    //弹出提示
    if (nodes && nodes.length > 0) {
        if (nodes[0].children && nodes[0].children.length > 0 && confirm(treeAlertMsg.del[1]) == true) {
            isDel = true;
        } else if (confirm(treeAlertMsg.del[2]) == true) {
            isDel = true;
        }
    }
    //删除节点
    if (isDel) {
        $.post("delNode", {nodename: nodes[0].name}, function(data) {
            var result=eval('('+data+')');
            if (result.success) {
                zTree.removeNode(nodes[0]);
                return false;
            } else {
                alert(treeAlertMsg.del[0]);
            }
        });
    };
}
// 关闭弹出框
function closePop(){
    $(".creatPop").hide();
}
$(".popClose").live("click",function(){
    closePop();
});

// 切换渠道
$(".pcIcon").live("click", function(){
    $(".pcIcon").css("background-image", "url('../images/pc2.png')");
    $(".megIcon").css("background-image", "url('../images/meg.png')");
    $(".fetionIcon").css("background-image", "url('../images/fetion.png')");
    channel = "web";
    genNodePage();
});
$(".megIcon").live("click", function(){
    $(".pcIcon").css("background-image", "url('../images/pc.png')");
    $(".megIcon").css("background-image", "url('../images/meg2.png')");
    $(".fetionIcon").css("background-image", "url('../images/fetion.png')");
    channel = "message";
    genNodePage();
});
$(".fetionIcon").live("click", function(){
    $(".pcIcon").css("background-image", "url('../images/pc.png')");
    $(".megIcon").css("background-image", "url('../images/meg.png')");
    $(".fetionIcon").css("background-image", "url('../images/fetion2.png')");
    channel = "fetion";
    genNodePage();
});
//预览
function previewHtml(con,falg){
    var dom =con;
    var newWindowPreview = window.open();
    var previewDom = dom.clone();
    var previewDomName=previewDom.find(".knowledgeCon_tit input").val();
    previewDom.append('<link rel="stylesheet" href="../css/knowledge_detail.css"/><link rel="stylesheet" href="../css/index.css">'+
        '<link rel="stylesheet" href="../css/reset.css"><link rel="stylesheet" href="../css/content.css">');
    previewDom.find(".editor").attr("contenteditable", false).end().find('div.operationBtn').remove().end().find(".knowledgeCon_tit input").before('<span class="selectReplace fl">'+previewDomName+'</span>').remove().end().find(".operationBigBtn").remove();
    previewDom.find(".ue-editor").css("display","none").end().find(".editor-plain").css("display","block")
    newWindowPreview.onload = new function() {
        newWindowPreview.document.title = '预览';
        if(falg==1){
            console.log(con.prev(".knowledgeCon_cont_main").length)
            var oT=con.prev(".knowledgeCon_cont_main").clone()
            newWindowPreview.document.write(oT.html()+previewDom.html());
        }else{
            newWindowPreview.document.write(previewDom.html());
        }


        newWindowPreview.document.close();
        var newHead = newWindowPreview.document.head,
                newBody = newWindowPreview.document.body;
        $(newBody).css({
            width: '960px',
            margin: '0 auto'
        });
    };
}
$("#previewHtmlBtn").live("click",function(){
    previewHtml($(".knowledgeCon"),0);
});
$(".operationBtn .previewHtmlBtn").live("click",function(){
    previewHtml($(this).parents(".knowledgeCon_cont"));
});
$(".partOperation .previewIcon").live("click",function(){
    previewHtml($(this).parents(".editorWrap"),1);
});
//保存
$("#saveHtmlBtn").live("click",function(){
    saveNodePage();
});
//自定义下拉框
$(".knowledgeCon").live("click", function(ev) {
    var oEvent = ev||event;
    var target = oEvent.srcElement || oEvent.target;
    //切换省份
    if(target.className == "customSelTit province"){
        var p="";
        for(var i in cityData2){
            p+='<li>'+i+'</li>'
        }
        $(target).siblings(".customSelList").html(p);
        $(target).siblings(".customSelList").toggle();
    }
    //切换城市
    if(target.className == "customSelTit city"){
        var p = $(target).parents(".customSel").siblings(".customSel").find(".choseVal").html();
        var c = "";
        if(p == ""){
            alert("请选择正确的省份！")
        }else{
            for(var i in cityData2[p]){
                c+='<li>'+cityData2[p][i]+'</li>';
            }
        }
        $(target).siblings(".customSelList").html(c);
        $(target).siblings(".customSelList").toggle();
    }
    //选择省市
    if(target.parentNode.className == "customSelList"){
        var choseVal=$(target).html();
        $(target).parents(".customSelList").siblings(".customSelTit").find(".choseVal").html(choseVal);
        $(target).parents(".customSel").siblings(".customSel").find(".city .choseVal").html("");
        $(".customSelList").hide();
    }
});
document.onclick=function(ev){
    var oEvent=ev||event;
    var target=oEvent.srcElement || oEvent.target;
    if(target.className=="customSelTit" || target.className=="customSelTit province" || target.className=="customSelTit city"){
        return false;
    }else{
        $(".customSelList").hide();
    }
};
//头部全国统一切换
$(".knowledgeCon_tit .nationalTag").live("click",function(){
    $(this).css("background","#3388ff");
    $(".nationalTag").addClass('flag');
    $(this).siblings(".customSel").find(".choseVal").html("");
    $(this).siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    // 使内容为空的所有元素变为全国统一
    $(".knowledgeCon_cont_main .nationalTag").each(function() {
        var content = $(this).parents(".knowledgeCon_cont_main").next(".editorWrap").find(".editor-plain").html();
        if (content.length <= 0) {
            $(this).css("background","#3388ff");
            $(this).addClass('flag');
            $(this).siblings(".customSel").find(".choseVal").html("");
            $(this).siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
            Getcontent(this);
        }
    });
});
$(".knowledgeCon_cont_main .nationalTag").live("click",function(){
    $(this).css("background","#3388ff");
    $(".nationalTag").addClass('flag');
    $(this).siblings(".customSel").find(".choseVal").html("");
    $(this).siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    Getcontent(this);
});
//头部省份切换
$(".knowledgeCon_tit .province .choseBtn").live("click",function(){
    // 获取整个NodePage
    $(this).parents(".customSel").siblings(".customSel").find(".city .choseVal").html("");
    $(this).parents(".customSel").siblings(".nationalTag").css("background","#eeeeee");
    $(this).parents(".customSel").siblings(".nationalTag").removeClass('flag');
    $(this).css("background","#3388ff");
    $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    // 使内容为空的所有元素变为头部省份
    $(".knowledgeCon_cont_main .province").each(function() {
        var content = $(this).parents(".knowledgeCon_cont_main").next(".editorWrap").find(".editor-plain").html();
        var p = $(".knowledgeCon_tit .province").find('.choseVal').html();
        if (content.length <= 0) {
            $(this).parents(".customSel").siblings(".customSel").find(".city .choseVal").html("");
            $(this).parents(".choseArea").find(".nationalTag").css("background","#eeeeee");
            $(this).parents(".choseArea").find(".nationalTag").removeClass('flag');
            $(this).find(".choseBtn").css("background","#3388ff");
            $(this).find(".choseVal").html(p);
            $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
            if($(this).parents(".knowledgeCon_cont_main").next(".editorWrap").css("display") != "none") {
                Getcontent(this);
            }
        }
    });
});
$(".knowledgeCon_cont_main .province .choseBtn").live("click",function(){
    var p=$(this).prev(".choseVal").html();
    $(this).parents(".customSel").siblings(".customSel").find(".city .choseVal").html("");
    $(this).parents(".choseArea").find(".nationalTag").css("background","#eeeeee");
    $(this).parents(".choseArea").find(".nationalTag").removeClass('flag');
    $(this).css("background","#3388ff");
    $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    Getcontent(this);
});
//头部城市切换
$(".knowledgeCon_tit .city .choseBtn").live("click",function(){
    $(this).parents(".customSel").siblings(".nationalTag").css("background","#eeeeee");
    $(this).parents(".customSel").siblings(".nationalTag").removeClass('flag');
    $(this).css("background","#3388ff");
    $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    $(".knowledgeCon_cont_main .city").each(function() {
        var content = $(this).parents(".knowledgeCon_cont_main").next(".editorWrap").find(".editor-plain").html();
        if (content.length <= 0) {
            var p = $(".knowledgeCon_tit .province").find('.choseVal').html();
            var c = $(".knowledgeCon_tit .city").find('.choseVal').html();
            $(this).parents(".choseArea").find(".nationalTag").css("background","#eeeeee");
            $(this).parents(".choseArea").find(".nationalTag").removeClass('flag');
            $(this).find(".choseBtn").css("background","#3388ff");
            $(this).find(".choseVal").html(c);
            $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
            $(this).parents(".customSel").siblings(".customSel").find(".choseVal").html(p);
            if($(this).parents(".knowledgeCon_cont_main").next(".editorWrap").css("display") != "none") {
                Getcontent(this);
            }
        }
    });
});
$(".knowledgeCon_cont_main .city .choseBtn").live("click",function(){
    var c=$(this).prev(".choseVal").html();
    //$(this).parents(".customSel").siblings(".customSel").find(".province .choseVal").html("");
    $(this).parents(".choseArea").find(".nationalTag").css("background","#eeeeee");
    $(this).parents(".choseArea").find(".nationalTag").removeClass('flag');
    $(this).css("background","#3388ff");
    $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    province = "";
    country = false;
    city = c;
    Getcontent(this);
});

//局部复制
$(".copyBtn").live("click",function(){
    var key = $(this).parents(".knowledgeCon_cont_main").attr("key");
    var newTit= '<div class="knowledgeCon_cont_main" key="'+ key +'">' +
                $(this).parents(".knowledgeCon_cont_main").clone(true).html() + "</div>";
    var editor_content=$(this).parents(".knowledgeCon_cont_main").next(".editorWrap").find(".editor-plain").html();;
    var newEditor='<div class="editorWrap" key="' + key + '_editor">' +
    '<div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
    '<div class="editor-plain editor" id="editor-plain-' + editorId +'">'+ editor_content +'</div>' +
    '<p class="partOperation"><span class="previewIcon"></span><span class="saveIcon"></span><span class="pushlishIcon"></span></p></div>';
    editorId++;
    $(this).parents(".knowledgeCon_cont_main").next(".editorWrap").after(newTit+newEditor);

});
// 城市全局切换，保留当前有内容的editor
function cacheContent(country_all, province_all, city_all) {
    editorCache = [];
    var elements = $(".knowledgeCon")
    var sub_level = $(elements.find(".knowledgeCon_cont_main")[0]);
    while (null != sub_level.html()) {
        //console.log(path);
        if (sub_level.attr('class') == "editorWrap") {
            var content = sub_level.find(".editor-plain").html();
            var path = sub_level.attr("key");
            path = path.replace("_editor", "");
            if ("" != content) {
                var city =  sub_level.prev().find("span[class='choseVal']").eq(1).html();
                var province =  sub_level.prev().find("span[class='choseVal']").eq(0).html();
                var country =  sub_level.prev().find("a[class^='nationalTag']").attr('class');
                city = city != null ? city :"";
                province = province != null ? province :"";
                country = /.*flag$/.test(country) ? true : false;

                if (country_all != country || province_all != province || city_all !=city) {
                    var obj = {}
                    obj.path = path;
                    obj.country = country;
                    obj.province = province;
                    obj.city = city;
                    obj.content = content;
                    editorCache.push(obj);
                }
            }
        }
        sub_level = sub_level.next();
    }
}