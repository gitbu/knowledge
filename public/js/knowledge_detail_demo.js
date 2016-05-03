var editorId = 1;
var nodename = "";
var backup_data = {};
var nodeCity="";
var nodeProvince="全国统一";
var nodeCity2="";
var nodeProvince2="全国统一";
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
    if(treeNode.category!=2){
        return;
    }
    nodename = treeNode.name;
    //backup_data = genNodePage();

    genNodePage();
    $('input[name="knowledge_point_name"]').val(nodename);
    //console.log(backup_data);
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
//加载数据
function readTree(){
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
        }
    })
}
// 转换知识栏目树
var  LoadDataTree=(function(){
    var arr=[];
    return function(data){
        len = data.length;
        for(var t = 0; t < len; t++){
            for(var a in data[t]) {
                arr[t]={};
                arr[t].name = a;
                if (data[t][a] instanceof Object) {
                    arr[t].children=[];
                    for(var i= 0,lena =data[t][a].length;i<lena;i++){
                        for(var b in data[t][a][i]){
                            arr[t].children.push({name:b})
                            if(data[t][a][i][b] instanceof Object ){
                                (arr[t].children)[i].children=[];
                                for(var j = 0,lenb=data[t][a][i][b].length;j<lenb;j++){
                                    for(var c in data[t][a][i][b][j]){
                                        (arr[t].children)[i].children.push({name:c});
                                        if(data[t][a][i][b][j][c] instanceof Object){
                                            arr[t].children[i].children[j].children=[];
                                            for(var k= 0,lenc=data[t][a][i][b][j][c].length;k<lenc;k++){
                                                for(var d in data[t][a][i][b][j][c][k]){
                                                    arr[t].children[i].children[j].children.push({name:d})
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }

                }
            }
        }
        return arr;
    }

})();

// 读取知识点模板树
function templateRead(data){
    var zNodes = LoadDataTree(data);
    setting.check={enable: true};
    setting.data={simpleData: {
        enable: true
    }}
    $.fn.zTree.init($("#treeDemo"), setting,zNodes);
    zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.checkAllNodes(true);
    zTree.expandAll(true);
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
var cityData2 = {
    '全国统一':[],
    '山东': ['济南', '滨州', '德州', '东营', '菏泽', '济宁', '莱芜', '临沂', '聊城', '青岛', '日照', '泰安', '威海', '潍坊', '烟台', '淄博', '枣庄'],
    '江苏': ['南京', '常州', '淮安', '连云港', '南通', '苏州', '宿迁', '泰州', '无锡', '徐州', '盐城', '扬州', '镇江'],
    '浙江': ['杭州', '湖州', '嘉兴', '金华', '丽水', '宁波', '衢州', '绍兴', '台州', '温州', '舟山'],
    '上海': ['上海'],
    '安徽': ['合肥', '安庆', '蚌埠', '巢湖', '池州', '滁州', '阜阳', '亳州', '淮北', '淮南', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城'],
    '江西': ['南昌', '抚州', '赣州', '吉安', '景德镇', '九江', '萍乡', '上饶', '新余', '鹰潭', '宜春'],
    '福建': ['福州', '龙岩', '南平', '宁德', '莆田', '泉州', '三明', '厦门', '漳州'],
    '广东': ['广州', '潮州', '东莞', '佛山', '河源', '惠州', '江门', '揭阳', '茂名', '梅州', '清远', '深圳', '汕头', '汕尾', '韶关', '阳江', '云浮', '肇庆', '湛江', '珠海', '中山'],
    '广西': ['南宁', '百色', '北海', '崇左', '防城港', '贵港', '桂林', '河池', '贺州', '来宾', '柳州', '钦州', '梧州', '玉林'],
    '海南': ['海口', '三亚'],
    '湖南': ['长沙', '郴州', '常德', '衡阳', '怀化', '吉首', '娄底', '邵阳', '湘潭', '益阳', '永州', '岳阳', '张家界', '株洲'],
    '湖北': ['武汉', '鄂州', '黄冈', '黄石', '荆门', '荆州', '十堰', '随州', '咸宁', '襄樊', '孝感', '宜昌'],
    '河南': ['郑州', '安阳', '鹤壁', '焦作', '开封', '漯河', '洛阳', '南阳', '平顶山', '濮阳', '商丘', '三门峡', '新乡', '信阳', '许昌', '周口', '驻马店'],
    '北京': ['北京'],
    '天津': ['天津'],
    '河北': ['石家庄', '保定', '承德', '沧州', '衡水', '邯郸', '廊坊', '秦皇岛', '唐山', '邢台', '张家口'],
    '山西': ['太原', '长治', '大同', '晋城', '晋中', '临汾', '吕梁', '朔州', '忻州', '阳泉', '运城'],
    '内蒙古': ['呼和浩特', '阿拉善盟', '巴彦淖尔', '包头', '鄂尔多斯', '呼伦贝尔', '通辽', '乌海', '乌兰察布', '锡林郭勒盟', '兴安盟', '赤峰'],
    '宁夏': ['银川', '固原', '石嘴山', '吴忠', '中卫'],
    '青海': ['西宁'],
    '陕西': ['西安', '安康', '宝鸡', '汉中', '商洛', '铜川', '渭南', '咸阳', '延安', '榆林'],
    '甘肃': ['兰州', '白银', '定西', '嘉峪关', '金昌', '酒泉', '陇南', '平凉', '庆阳', '天水', '武威', '张掖'],
    '新疆': ['乌鲁木齐', '阿克苏', '阿勒泰', '哈密', '和田', '喀什', '克拉玛依', '塔城', '吐鲁番'],
    '四川': ['成都', '巴中', '达州', '德阳', '广安', '广元', '乐山', '泸州', '眉山', '绵阳', '南充', '内江', '攀枝花', '遂宁', '雅安', '宜宾', '自贡', '资阳'],
    '重庆': ['重庆'],
    '贵州': ['贵阳', '安顺', '六盘水', '遵义'],
    '云南': ['昆明', '保山', '丽江', '临沧', '普洱', '曲靖', '玉溪', '昭通'],
    '西藏': ['拉萨'],
    '辽宁': ['沈阳', '鞍山', '本溪', '朝阳', '大连', '丹东', '抚顺', '阜新', '葫芦岛', '锦州', '辽阳', '盘锦', '铁岭', '营口'],
    '吉林': ['长春', '白城', '白山', '吉林', '辽源', '四平', '松原', '通化'],
    '黑龙江': ['哈尔滨', '大庆', '鹤岗', '黑河', '鸡西', '佳木斯', '牡丹江', '齐齐哈尔', '七台河', '双鸭山', '绥化', '伊春']
};
//批量添加模板
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
                alert('添加失败');
                removeEventHandler(kbBtn,'click',nextTwo);
                addEventHandler(kbBtn,'click',nextTwo);
                zTree.removeNode(newNodes);
                closePop();

            }
        }
    });
}
//注册  添加知识点执行的第二个事件  和  添加模板下一步的事件
function nextTwo(){
    var type = $("select option:selected").html();
    if ("业务类" == type) {
        // genTplData(LevelDataBusy)
        //genTplDataJson(LevelDataBusyJson);
        getTplDataTreeJson(testJson);
        templateRead(LevelDataBusyJson);
    } else if("套餐" == type) {
        // genTplData(LevelDataPackage)
        genTplDataJson(LevelDataPackageJson);
        templateRead(LevelDataPackageJson);
    } else if ("营销活动" == type) {
        // genTplData(LevelDataMarket)
        genTplDataJson(LevelDataMarketJson);
        templateRead(LevelDataMarketJson);
    }
    $('input[name="knowledge_point_name"]').val($("#add_kb").val());
    // 数据同步，先保存一下
    saveNodePage();
    closePop();
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
                    alert('修改失败');
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
// 关闭弹出框
function closePop(){
    $(".creatPop").hide();
}
$(".popClose").live("click",function(){
    closePop();
});
//预览
function previewHtml(con,falg){
    var dom =con;
    var newWindowPreview = window.open();
    var previewDom = dom.clone();
    var previewDomName=previewDom.find(".knowledgeCon_tit input").val();
    previewDom.append('<link rel="stylesheet" href="../css/knowledge_detail_demo.css"/><link rel="stylesheet" href="../css/index.css">'+
        '<link rel="stylesheet" href="../css/reset.css"><link rel="stylesheet" href="../css/content.css">');
    previewDom.find(".editor").attr("contenteditable", false).end().find('div.operationBtn').remove().end().find(".knowledgeCon_tit input").before('<span class="selectReplace fl">'+previewDomName+'</span>').remove().end().find(".operationBigBtn").remove();
    previewDom.find(".ue-editor").css("display","none").end().find(".editor-plain").css("display","block")
    newWindowPreview.onload = new function() {
        newWindowPreview.document.title = '预览';
        if(falg==1){
            var oT=con.prev(".knowledgeCon_cont_main").clone();
            newWindowPreview.document.write(oT.html() +'<div class="editorWrap">'+previewDom.html()+'</div>');
        }else{
            newWindowPreview.document.write('<div class="knowledgeCon_cont">'+previewDom.html()+'<div>');
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
    previewHtml($(".knowledgeCon"));
});
$(".partOper .previewHtmlBtn").live("click",function(){
    previewHtml($(this).parents(".operationBtn").prev(".editorWrap"),1);
});
$(".Oper .previewHtmlBtn ").live("click",function(){
    previewHtml($(this).parents(".operationBtn").prev(".knowledgeCon_cont"),0);
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
//    demo_add
        if( $(target).parents(".customSelList").siblings(".city").length!=0){
        }
        if($(target).parents(".AllchoseCity").length!=0){
            if($(target).parents(".customSelList").siblings(".province").length!=0){
                nodeProvince2=nodeProvince=choseVal;
                nodeCity2=nodeCity="";
            }else{
                nodeProvince="";
                nodeCity2=nodeCity=choseVal;
                nodeProvince2=$(target).parents(".customSel").siblings(".customSel").find(".choseVal").html();
            }
        }else if($(target).parents(".secondchoseCity").length!=0){
            if($(target).parents(".customSelList").siblings(".province").length!=0){
                nodeProvince=choseVal;
                nodeCity="";
                $(".knowledgeCon_cont .province .choseVal").html(choseVal);
                $(".knowledgeCon_cont .city .choseVal").html("")
            }else{
                nodeProvince="";
                nodeCity=choseVal;
                $(".knowledgeCon_cont .city .choseVal").html(choseVal)
            }
        }
    }
});
/*$(".province").live("click", function(ev) {
    ev.stopPropagation();
    var oEvent=ev||event;
    var target=oEvent.srcElement || oEvent.target;
    if(target.className=="choseBtn"){
        return false;
    }else{
        var p="";
        for(var i in cityData2){
            p+='<li>'+i+'</li>'
        }
        $(".customSel .province").siblings(".customSelList").html(p);
        $(this).siblings(".customSelList").toggle();
    }
});
$(".city").live("click", function(ev) {
    ev.stopPropagation();
    var oEvent=ev||event;
    var target=oEvent.srcElement || oEvent.target;
    if(target.className=="choseBtn"){
        return false;
    }else{
        var p= $(this).parents(".customSel").siblings(".customSel").find(".choseVal").html();
        var c="";
        if(p==""){
            alert("请选择正确的省份！")
        }else{
            for(var i in cityData2[p]){
                c+='<li>'+cityData2[p][i]+'</li>';
            }
        }
        $(this).siblings(".customSelList").html(c);
        $(this).siblings(".customSelList").toggle();
    }
});

document.onclick=function(ev){
    var oEvent=ev||event;
    var target=oEvent.srcElement || oEvent.target;
    if(target.className=="customSelTit" || target.className=="customSelTit province" || target.className=="customSelTit city" || target.className=="choseVal"){
        return false;
    }else{
        $(".customSelList").hide();
    }
};
$(".customSelList li").live("click",function(){
    var choseVal=$(this).html();
    $(this).parents(".customSelList").siblings(".customSelTit").find(".choseVal").html(choseVal);
    $(this).parents(".customSel").siblings(".customSel").find(".city .choseVal").html("");
    $(".customSelList").hide();
//    demo_add
    if( $(this).parents(".customSelList").siblings(".city").length!=0){
//        $(this).parents(".customSel").siblings(".customSel").find(".choseVal").html("");
    }
    if($(this).parents(".AllchoseCity").length!=0){
       if($(this).parents(".customSelList").siblings(".province").length!=0){
         nodeProvince2=nodeProvince=choseVal;
         nodeCity2=nodeCity="";
       }else{
         nodeProvince="";
         nodeCity2=nodeCity=choseVal;
         nodeProvince2=$(this).parents(".customSel").siblings(".customSel").find(".choseVal").html();
       }
    }else if($(this).parents(".secondchoseCity").length!=0){
        if($(this).parents(".customSelList").siblings(".province").length!=0){
            nodeProvince=choseVal;
            nodeCity="";
            $(".knowledgeCon_cont .province .choseVal").html(choseVal);
            $(".knowledgeCon_cont .city .choseVal").html("")
        }else{
            nodeProvince="";
            nodeCity=choseVal;
//            $(".knowledgeCon_cont .province .choseVal").html("");
            $(".knowledgeCon_cont .city .choseVal").html(choseVal)
        }
    }

})*/
//头部全国统一切换
/*$(".knowledgeCon_tit .nationalTag").live("click",function(){
    $(".nationalTag").css("background","#3388ff");
    $(".city .choseVal").html("");
    $(".province .choseVal").html("");
    $(this).siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    country = true;
    province = "全国";
    city = "全省";
});
$(".knowledgeCon_cont .nationalTag").live("click",function(){
    $(this).css("background","#3388ff");
    $(this).siblings(".customSel").find(".choseVal").html("");
    $(this).siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    country = true;
    province = "全国";
    city = "全省";
});*/

//头部省份切换
/*$(".knowledgeCon_tit .province .choseBtn").live("click",function(){
    var p=$(this).prev(".choseVal").html();
    $(".knowledgeCon_cont .province .choseVal").html(p);
    $(".city .choseVal").html("");
    $(".knowledgeCon_cont .choseBtn").css("background","#eeeeee");
    $(".nationalTag").css("background","#eeeeee");
    $(this).css("background","#3388ff");
    $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    province = p;
    country = false;
    city = "";
//    genNodePage();

});
$(".knowledgeCon_cont .province .choseBtn").live("click",function(){
    var p=$(this).prev(".choseVal").html();
    $(this).parents(".customSel").siblings(".customSel").find(".city .choseVal").html("");
    $(this).parents(".choseArea").find(".nationalTag").css("background","#eeeeee");
    $(this).css("background","#3388ff");
    $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    province = p;
    country = false;
    city = "";
//    genNodePage();
});*/
//头部城市切换
/*$(".knowledgeCon_tit .city .choseBtn").live("click",function(){
    var c=$(this).prev(".choseVal").html();
    $(".knowledgeCon_cont .city .choseVal").html(c);
    $(".province .choseVal").html("");
//    $(".nationalTag").css("background","#eeeeee");
    $(this).css("background","#3388ff");
    $(".knowledgeCon_cont .choseBtn").css("background","#eeeeee");
    $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    province = "";
    country = false;
    city = c;
//    genNodePage();
});
$(".knowledgeCon_cont .city .choseBtn").live("click",function(){
    var c=$(this).prev(".choseVal").html();
    $(this).parents(".customSel").siblings(".customSel").find(".province .choseVal").html("");
//    $(this).parents(".choseArea").find(".nationalTag").css("background","#eeeeee");
    $(this).css("background","#3388ff");
    $(this).parents(".customSel").siblings(".customSel").find(".choseBtn").css("background","#eeeeee");
    province = "";
    country = false;
    city = c;
//    genNodePage();
});*/
//局部复制
$(".copyBtn").live("click",function(){
    var newTit=$(this).parents(".knowledgeCon_cont_main").clone(true).html();
    var editor_content=$(this).parents(".knowledgeCon_cont_main").next(".editorWrap").find(".editor-plain").html();;
    var newEditor='<div class="editorWrap"><div class="editorConWrap"><div class="editorCon">' +
        '<div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
        '<div class="editor-plain editor" id="editor-plain-' + editorId +'">'+editor_content+'</div>' +
        '</div></div>'+
        '<p class="operation "><span class="weixinIcon"></span><span class="timeIcon"></span><span class="mapIcon"></span><span class="pcIcon"></span>'+
        '<span class="megIcon"></span><span class="fetionIcon"></span></p></div>';
    editorId++;
    var oP='<div class="operationBtn partOper"><a class="previewHtmlBtn blue_btn"><img src="../images/preview.png"/>预览</a>' +
    '<a class="saveHtmlBtn blue_btn"><img src="../images/save.png"/>保存</a> <a class="pushHtmlBtn blue_btn"><img src="../images/push.png"/>发布</a></div>';
    var oP2='<div class="operationBtn Oper"><a class="previewHtmlBtn blue_btn"><img src="../images/preview.png"/>预览</a>' +
        '<a class="saveHtmlBtn blue_btn"><img src="../images/save.png"/>保存</a> <a class="pushHtmlBtn blue_btn"><img src="../images/push.png"/>发布</a></div>'
   if($(this).parents(".knowledgeCon_cont_main").nextAll(".operationBtn").eq(0).length==0){
       $(this).parents(".knowledgeCon_cont").nextAll(".operationBtn").eq(0).after('<div class="knowledgeCon_cont">'+newTit+newEditor+'</div>'+oP2)
   }else{
       $(this).parents(".knowledgeCon_cont_main").nextAll(".operationBtn").eq(0).after(newTit+newEditor+oP);
   }
});




/////////add_demo.js

var LevelDataBusyJson=[{"业务介绍":[{"常用别名":""},{"业务简介":""},{"业务功能":""},{"业务上线时间":""},{"业务下线时间":""},{"业务卖点":""},{"适用范围":""},{"互斥知识":""},{"FAQ":""}]},
    {"业务资费":[{"资费标准":[{"月功能费":""},{"通信费":""},{"流量费":""},{"信息费":""},{"季费":""},{"年费":""}]},{"扣费方式":""},{"FAQ":""}]},
    {"业务办理":[{"业务开通":[{"营业厅开通方式":[{"个人":""},{"集团":""}]},{"短信营业厅开通方式":""},{"掌上营业厅开通方式":""},{"WAP营业厅开通方式":""},{"客户端开通方式":""},{"客户经理开通方式":""},{"其他渠道开通方式":""}]},
        {"业务变更":[{"营业厅变更方式":[{"个人":""},{"集团":""}]},{"网上营业厅变更方式":""},{"短信营业厅变更方式":""},{"掌上营业厅变更方式":""},{"WAP营业厅变更方式":""},{"客户端变更方式":""},{"客户经理变更方式":""},{"其他渠道变更方式":""}]},
        {"业务退订":[{"营业厅退订方式":[{"个人":""},{"集团":""}]},{"网上营业厅退订方式":""},{"短信营业厅退订方式":""},{"掌上营业厅退订方式":""},{"WAP营业厅退订方式":""},{"客户端退订方式":""},{"客户经理退订方式":""},{"其他渠道退订方式":""}]},
        {"业务增加":[{"营业厅增加方式":[{"个人":""},{"集团":""}]},{"网上营业厅增加方式":""},{"短信营业厅增加方式":""},{"掌上营业厅增加方式":""},{"WAP营业厅增加方式":""},{"客户端增加方式":""},{"客户经理增加方式":""},{"其他渠道增加方式":""}]},
        {"业务删除":[{"营业厅删除方式":[{"个人":""},{"集团":""}]},{"网上营业厅删除方式":""},{"短信营业厅删除方式":""},{"掌上营业厅删除方式":""},{"WAP营业厅删除方式":""},{"客户端删除方式":""},{"客户经理删除方式":""},{"其他渠道删除方式":""}]},
        {"业务暂停":[{"营业厅暂停方式":[{"个人":""},{"集团":""}]},{"网上营业厅暂停方式":""},{"短信营业厅暂停方式":""},{"掌上营业厅暂停方式":""},{"WAP营业厅暂停方式":""},{"客户端暂停方式":""},{"客户经理暂停方式":""},{"其他渠道暂停方式":""}]},
        {"业务恢复":[{"营业厅恢复方式":[{"个人":""},{"集团":""}]},{"网上营业厅恢复方式":""},{"短信营业厅恢复方式":""},{"掌上营业厅恢复方式":""},{"WAP营业厅恢复方式":""},{"客户端恢复方式":""},{"客户经理恢复方式":""},{"其他渠道恢复方式":""}]},
        {"业务修改":[{"营业厅修改方式":[{"个人":""},{"集团":""}]},{"网上营业厅修改方式":""},{"短信营业厅修改方式":""},{"掌上营业厅修改方式":""},{"WAP营业厅修改方式":""},{"客户端修改方式":""},{"客户经理修改方式":""},{"其他渠道修改方式":""}]},
        {"业务重置":[{"营业厅重置方式":[{"个人":""},{"集团":""}]},{"网上营业厅重置方式":""},{"短信营业厅重置方式":""},{"掌上营业厅重置方式":""},{"WAP营业厅重置方式":""},{"客户端重置方式":""},{"客户经理重置方式":""},{"其他渠道重置方式":""}]},
        {"业务激活":[{"营业厅激活方式":[{"个人":""},{"集团":""}]},{"网上营业厅激活方式":""},{"短信营业厅激活方式":""},{"掌上营业厅激活方式":""},{"WAP营业厅激活方式":""},{"客户端激活方式":""},{"客户经理激活方式":""},{"其他渠道激活方式":""}]},
        {"业务查询":[{"营业厅查询方式":[{"个人":""},{"集团":""}]},{"网上营业厅查询方式":""},{"短信营业厅查询方式":""},{"掌上营业厅查询方式":""},{"WAP营业厅查询方式":""},{"客户端查询方式":""},{"客户经理查询方式":""},{"其他渠道查询方式":""}]},
        {"协议单据":""},{"FAQ":""}]},
    {"业务使用":[{"客户端下载":""},{"客户端安装":""},{"客户端登录":""},{"客户端设置":""},{"客户端保存":""},{"PC下载":""},{"PC安装":""},{"PC登录":""},{"PC设置":""},{"PC保存":""},{"FAQ":""}]},
    {"内部知晓":[{"10086相关":""},{"营业厅相关":""},{"二线客服":""},{"主管部门":""}]}
];
function nodeListCon(){
    var nodeListCon='<div class="choseCity clearfix AllchoseCity">' +
        '<div class="customSel"><div class="customSelTit province"><span class="choseVal">'+nodeProvince2+'</span><a href="javascript:;" class="choseBtn"></a></div><ul class="customSelList"></ul></div>' +
        '<div class="customSel"><div class="customSelTit city"><span class="choseVal">'+nodeCity2+'</span><a href="javascript:;" class="choseBtn"></a></div><ul class="customSelList"></ul></div></div>' +
        '<div class="nodeOneListWrap"><ul class="nodeOneList">' +
        '<li key="业务介绍"><div class="icon"><img src="../images/b_introduce.png" alt=""/></div><p class="name">业务介绍</p></li>' +
        '<li key="业务资费"><div class="icon"><img src="../images/b_postage.png" alt=""/></div><p class="name">业务资费</p></li>' +
        '<li key="业务办理"><div class="icon"><img src="../images/b_handle.png" alt=""/></div><p class="name">业务办理</p></li>' +
        '<li key="业务使用"><div class="icon"><img src="../images/b_use.png" alt=""/></div><p class="name">业务使用</p></li>' +
        '<li key="内部知晓"><div class="icon"><img src="../images/b_know.png" alt=""/></div><p class="name">内部知晓</p></li>' +
        '<li key="内部知晓"><div class="icon"><img src="../images/b_postage.png" alt=""/></div><p class="name">业务资费</p></li>' +
        '</ul></div>';
    return nodeListCon;
}

function nodeHeader(){
    if(nodeProvince==""){
        nodeProvince2;
    }else{
        nodeProvince2=nodeProvince;
    }
    var listNode_header ='<div class="knowledgeCon_tit clearfix ">' +
        '<div class="choseCity clearfix secondchoseCity"><div class="customSel"><div class="customSelTit province"><span class="choseVal">'+nodeProvince2+'</span><a href="javascript:;" class="choseBtn"></a></div><ul class="customSelList"></ul></div>'+
        '<div class="customSel"><div class="customSelTit city"><span class="choseVal">'+nodeCity+'</span><a href="javascript:;" class="choseBtn"></a></div><ul class="customSelList"></ul></div>'+
        '</div></div>';
    return listNode_header;

}
function genSubContent2(con,className,noleaf) {
    if(nodeProvince==""){
        nodeProvince2;
    }else{
        nodeProvince2=nodeProvince;
    }
    if (!noleaf) {
        var subLevelContent='<div class="knowledgeCon_cont_main "><div class="clearfix knowledgeCon_cont_mainHead '+className+'">'+
            '<div class="fl cont_mainHead"><span class="h_icon"></span><b>'+con+'</b></div></div></div>';
    }
    else {
        var subLevelContent='<div class="knowledgeCon_cont_main "><div class="clearfix knowledgeCon_cont_mainHead '+className+'">' +
            '<div class="fl cont_mainHead"><span class="h_icon"></span><b>'+con+'</b></div>'+
            '<a class="fl copyBtn" href="javascript:;"></a>'+
            '<div class="choseArea clearfix fl"><div class="customSel"><div class="customSelTit province"><span class="choseVal">'+nodeProvince2+'</span><a href="javascript:;" class="choseBtn"></a></div><ul class="customSelList"></ul></div>'+
            '<div class="customSel"><div class="customSelTit city"><span class="choseVal">'+nodeCity+'</span><a href="javascript:;" class="choseBtn"></a></div><ul class="customSelList"></ul></div></div>'+
            '<div class="oper_tit fr">渠道</div></div></div>';
    }
    return subLevelContent;
}


//一级知识点list点击
$(".nodeOneList li").live("click",function(){
    $(this).find(".icon").addClass("on").end().siblings().find(".icon").removeClass("on");
    var oKey=$(this).attr("key");
    var content = nodeHeader();
    for(var i=0;i<LevelDataBusyJson.length;i++){
        for(var m in LevelDataBusyJson[i][oKey]){
            content =content+'<div class="knowledgeCon_cont">'
           for(var j in LevelDataBusyJson[i][oKey][m]){
               if(LevelDataBusyJson[i][oKey][m][j]==""){
                   content =content + genSubContent2(j,"twoLevel",true);//没有子节点
                   content = content +'<div class="editorWrap" style="margin:0; border:0"><div class="editorConWrap"><div class="editorCon">' +
                       '<div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
                   '<div class="editor-plain editor" id="editor-plain-' + editorId +'">编辑器内容</div>' +
                   '</div></div>'+
                   '<p class="operation"><span class="weixinIcon"></span><span class="timeIcon"></span><span class="mapIcon"></span><span class="pcIcon"></span>'+
                   '<span class="megIcon"></span><span class="fetionIcon"></span></p></div>'

                   editorId++;
                   continue;
               }else{
                   content =content + genSubContent2(j,"twoLevel",false);
                   for(var k=0;k<LevelDataBusyJson[i][oKey][m][j].length;k++){
                       for(var t in LevelDataBusyJson[i][oKey][m][j][k]){
                           if(LevelDataBusyJson[i][oKey][m][j][k][t]==""){
                               content =content + genSubContent2(t,"threeLevel",true);//没有子节点
                               content = content +'<div class="editorWrap"><div class="editorConWrap"><div class="editorCon">' +
                                   '<div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
                                   '<div class="editor-plain editor" id="editor-plain-' + editorId +'">编辑器内容</div>' +
                                   '</div></div>'+
                                   '<p class="operation"><span class="weixinIcon"></span><span class="timeIcon"></span><span class="mapIcon"></span><span class="pcIcon"></span>'+
                                   '<span class="megIcon"></span><span class="fetionIcon"></span></p></div>'+
                                   '<div class="operationBtn partOper"><a class="previewHtmlBtn blue_btn"><img src="../images/preview.png"/>预览</a>' +
                                   '<a class="saveHtmlBtn blue_btn"><img src="../images/save.png"/>保存</a> <a class="pushHtmlBtn blue_btn"><img src="../images/push.png"/>发布</a></div>'

                               editorId++;
                               continue;
                           }else{
                               content =content + genSubContent2(t,"threeLevel",false);
                               for(var four=0;four<LevelDataBusyJson[i][oKey][m][j][k][t].length;four++){
                                   for(var f in LevelDataBusyJson[i][oKey][m][j][k][t][four]){
                                       var fourLevel=LevelDataBusyJson[i][oKey][m][j][k][t][four][f];
                                       if(fourLevel==""){
                                           content =content + genSubContent2(f,"fourLevel",true);//没有子节点
                                           content = content +'<div class="editorWrap"><div class="editorConWrap"><div class="editorCon">' +
                                               '<div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
                                               '<div class="editor-plain editor" id="editor-plain-' + editorId +'">编辑器内容</div>' +
                                               '</div></div>'+
                                               '<p class="operation"><span class="weixinIcon"></span><span class="timeIcon"></span><span class="mapIcon"></span><span class="pcIcon"></span>'+
                                               '<span class="megIcon"></span><span class="fetionIcon"></span></p></div>'+
                                               '<div class="operationBtn partOper"><a class="previewHtmlBtn blue_btn"><img src="../images/preview.png"/>预览</a>' +
                                               '<a class="saveHtmlBtn blue_btn"><img src="../images/save.png"/>保存</a> <a class="pushHtmlBtn blue_btn"><img src="../images/push.png"/>发布</a></div>'

                                           editorId++;
                                           continue;
                                       }else{
                                           content =content + genSubContent2(f,"fourLevel",false);
                                       }
                                   }
                               }
                           }
                       }

                   }
               }

           }
            var op= '<div class="operationBtn Oper"><a class="previewHtmlBtn blue_btn"><img src="../images/preview.png"/>预览</a>' +
                '<a class="saveHtmlBtn blue_btn"><img src="../images/save.png"/>保存</a> <a class="pushHtmlBtn blue_btn"><img src="../images/push.png"/>发布</a></div>'
            content =content+'</div>'+op;

        }
    }
    $(".knowledgeCon").html(content);
});
//返回
$(".back ").live("click",function(){
    $(".knowledgeCon").html(nodeListCon());
});
//头部导航切换
$(".headerList  li").live("click",function(){
    $(this).addClass("on").siblings().removeClass("on").end();
    if($(this).hasClass("knowledgeList")){
        $(".knowledgeCon").html(nodeListCon());
        $("#breadcrumb").hide();
        $(".operationListWrap").show();
    }else{
        $(".knowledgeCon").html("");
        $("#breadcrumb").show();
        $(".operationListWrap").hide();
    }
});