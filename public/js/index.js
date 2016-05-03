var images_url = '/images/';
//按钮关闭--页面弹出层
function closebtn() {
    $(".layer").hide();
    $(".chose_box").hide();
}
$(".chose_box_closebtn").live("click", function() {
    closebtn();
});
 $("#intellqa_menu").hide();
//权限切换
$("#oper_chose").change(function(){
    if($("#activity").length!=0){
        var res = checkHtml('pro');
        if(!res){
            return false;
        }
    }
    var oper_chose_con='<div id="content"></div> <div class="rightMain_con" style="display: none;"></div><div class="qaRightMain_con"></div><div class="gg_tab notice_add"></div><div class="gg_tab notice_lists"></div>';
    $(".rightMain_con").html("").hide();
    $(".gg_tab .notice_add").html("").hide();
    $(".gg_tab .notice_lists").html("").hide();
    $("#content").html("");
    $("#navUl").hide();
    $("#Cen div").hide();
    $("#intellqa_menu").hide();
    $("#Cen").attr("style","");
    $(".center").html(oper_chose_con);
    $("#breadcrumb").html("");
    $("#activity").remove();
   /* if($("#content").length==0){
         
         $("#Cen").append(oper_chose_con);
    }*/
    $(".content_wrap").hide();


    if($(this).val()=="权限设置"){
        $("#per_set").trigger("click");
    }else if($(this).val()=="编辑"){
        $("#per_editor").trigger("click");
        $(".content_wrap").show();
    }else if($(this).val()=="公告"){
        $("#per_notice").trigger("click");
    }else if($(this).val()=="智能问答"){
        $("#intellqa").trigger("click");
    }

     if($(this).val()=="权限设置"){
        $("#Left").hide();
        $("#Right").css("margin-left","0");
     }else{
        $("#Left").show();
        $("#Right").css("margin-left","200px");
     }
     
   
})
 var cityData = {
//        '--': ['--'],
        '全国': ['全省'],
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
    var selCity_data = "";
//    $.ajax({
//        url: "/Admin/UserProvinceAndCity",
//        type: 'POST',
//        async: false,
//        dataType:'json',
//        success:function (result) {
//            selCity_data=result;
//        }
//    });
    var selP="";
    var selC = "";
    for (var i in selCity_data) {
        selP += '<li cityName='+i+'>' + i + '</li>';
    }
    $(".userpro_con ul").html(selP);
      $("#userpro").html($(".userpro_con ul li:eq(0)").html());
//      $("#usercityName").html(selCity_data[$("#userpro").html()][0]);
      $(".userpro_con").bind("click",function(event){
            
            event.stopPropagation();
            $(this).children("ul").toggle();
            var dis = $(this).children("ul").css("display");
            if(dis == "none"){
                $(this).removeClass("on");
            }else{
                $(this).addClass("on");
            }   
             var $target = $(event.target);
            if( $target.is("li") ) {
                if($("#activity").length!=0){
                    var res = checkHtml('pro');
                    if(!res){
                        return false;
                    }
                } 
               $("#userpro").html($target.html());
               $("#usercityName").html(selCity_data[$("#userpro").html()][0]);
               if($("#activity").contents().find("#provinces").length!=0){
                    $("#activity").contents().find("#provinces .provinces_span").html($("#userpro").html());
                    $("#activity").contents().find("#city .provinces_span").html($("#usercityName").html());
                    var selC = "";
                     for(var i in selCity_data[$("#userpro").html()]){
                        selC += '<li>' + selCity_data[$("#userpro").html()][i] + '</li>';
                     }
                       $("#activity").contents().find("#cityList").html(selC);                 
               }
            }
      });
    $(document).click(function(){
        $(".userpro_con ul").hide()
        $(".userpro_con").removeClass("on")
    })
   
    //type  可以为 city   和 pro   根据不同，可以选择关闭不同的下拉列表
    function checkHtml(type) {
        var nodeName = '';
        var tempNodeName = $.trim($('#content').find('h1').html());
        if (tempNodeName != '' && tempNodeName != '<br data-mce-bogus="1">' && tempNodeName != '附件：') {
            nodeName = tempNodeName;
        }
        var h3Con = $.trim($('#content').find('h3').html()) == '&nbsp;<br>' ? '' : $.trim($('#content').find('h3').html());
        var tdContent = '';
        $('#content').find('tbody tr:eq(1)').find('td').each(function() {
            var temp = $.trim($(this).html());
            if (temp != '' && temp != '&nbsp;') {
                tdContent = temp;
                return false;
            }
        });
        //nodeName != '' || tdContent != '' || h3Con != ''
        if (1 === 1) {
            if (confirm("是否放弃本次编辑")) {
                return true
            } else {
                if (type == 'city') {
                    $('#city .provinces_cen').hide();
                    $('#city .provinces_vle').removeClass("on").find("img").attr("src", "../images/arrowDown.png");
                    return false
                }
                else {
                    //切换省份
                    $('#provinces .provinces_cen').hide();
                    $('#provinces .provinces_vle').removeClass("on").find("img").attr("src", "../images/arrowDown.png");
                    return false
                }
                return false
            }
        }
        return true
    }
//知识点编辑
//liumingren 2014.10.22
var treeAlertMsg = {
    "rename": {//节点重命名
        0: "重命名失败！" //重命名操作失败
    },
    "moveError": {//移动节点错误提示
        0: "移动节点后台存储失败，请重试", //移动节点数据库存储失败信息
        1: "文件夹节点不可以移动", //移动的节点为文件夹
        2: "移动不合法!不可以移动节点作为目标知识点的子节点", //目标节点是知识点,移动类型是内部"inner"
        3: "知识点不可以与文件夹处于同一级别", //目标节点是文件夹，移动类型是前一个(prev)或后一个(next)
        4: "目标节点不合法", //目标节点的等级大于移动节点的父级的等级时
        5: "当前存在相同知识点,确定要覆盖该知识点吗？"//移动节点与目标父节点的子节点重名时
    },
    "add": {//增加节点
        1: "已存在！",
        2: "增加失败！"
    },
    "del": {//删除节点
        0: "删除失败！", //删除节点操作失败
        1: "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！", //删除包含子节点的父节点的确认信息
        2: "确定删除吗？" //删除无子节点的节点的确认信息
    }
}
var zTree, rMenu;

function hideRMenu() {
    if (rMenu)
        rMenu.css({"visibility": "hidden"});
    $("body").unbind("mousedown", onBodyMouseDown);
}

function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({"visibility": "hidden"});
    }
}

function addTreeNode(type) {
    var nodes = zTree.getSelectedNodes(),
            newNode,
            newNodes,
            thisNode = nodes[0],
            nodeName = [];
    hideRMenu();
    while (thisNode) {
        nodeName.unshift(thisNode.name);
        thisNode = thisNode.getParentNode();
    }

    var nodeData = nodeName.join("/");

    //获取mysql节点最大自增长id
    $.post("/Folder/GetMaxId", {new_node: newNode}, function(result) {
        if (result == "NotLoggedIn") {
            window.parent.location.href = "/Login/Login";
            return false;
        }

        if (!nodes[0]) {
            newNode = {name: "新知识点" + (result + 1), iconSkin: "folder", parentId: 0, path: nodeData, url: "baidu"};
        } else if (type) {
            newNode = {name: "新知识点" + (result + 1), iconSkin: "folder", parentId: nodes[0].id, path: nodeData, url: "baidu"};
        } else {
            newNode = {name: "新知识点" + (result + 1), parentId: nodes[0].id, path: nodeData};
        }

        //增加节点
        $.post("/Folder/AddFolder", {new_node: newNode}, function(result) {
            if (result == 1 || result == 2) {//liu 2015.3.2
                alert(treeAlertMsg.add[result]);
                return false;
            } else if (result == "NotLoggedIn") {
                window.parent.location.href = "/Login/Login";
                return false;
            } else if (result == 3) { //无权限
                alert("无权限！");
                return false;
            } else {
                if (nodes[0]) {
                    newNodes = zTree.addNodes(nodes[0], newNode);
                    //newNode.checked = nodes[0].checked;
                } else {
                    newNodes = zTree.addNodes(null, newNode);
                }
                // zTree.editName(newNodes[0]);
                newNodes[0].id = result.data;
                zTree.updateNode(newNodes);
                zTree.editName(newNodes[0]);
            }
        }, "json");
    });
}

function removeTreeNode() {//liu 2015.3.2
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
        var province = $("#userpro").html();
        $.post("/Folder/DeleteFolder", {node_id: nodes[0].id, path: nodeData, level: nodes[0].level, province:province}, function(result) {
            if (result == 0) {
                alert(treeAlertMsg.del[0]);
                return false;
            } else if (result == "NotLoggedIn") {
                window.parent.location.href = "/Login/Login";
                return false;
            } else if (result == "NoPermission") { //无权限
                alert("无权限！");
                return false;
            } else if(result == 2) { //部分省份知识点被删除
                alert('所属省份的知识点删除成功');
                return false;
            }else if(result == 1){
                zTree.removeNode(nodes[0]);
            }else{}
        });
    };
}
function renameTreeNode() {
    hideRMenu();
    var nodes = zTree.getSelectedNodes();

    zTree.editName(nodes[0]);
}

$("#per_editor").bind("click", function() {
    closebtn();
    $("#intellqa_menu").hide();

    //树配置
    var setting = {
        view: {
            dblClickExpand: true
        },
        callback: {
            onClick: OnClick,
            onRightClick: OnRightClick,
            beforeRename: OnBeforeRename,
            onRename: OnRename,
            beforeDrop: OnMoveNode //add by sunying
                    // beforeDrag:OnbeforeDrag, //add by sunying
        },
        edit: {
            enable: true,
            showRenameBtn: false,
            renameTitle: "重命名",
            showRemoveBtn: false,
            drag: {
                inner: canInner
            }
        }
    };

    var _nodeOldPath = "";
    var Cen = $("#Cen"),
            oldName;
    var Content = $("#content");

    $("#MbUl li").live("click", function(e) {
        e.stopPropagation();
        var htmlName = $(this).attr('name');
        Cen.html("<iframe style=\"width:100%;height:99%;\" name=\"MbIframe\" src=\"/List/Template?type=" + htmlName + "\" scrolling=\"yes\" class=\"demo-iframe\" frameborder=0 id=\"activity\"></iframe>");
    });
    /*$("#MbUl li:not(:last-child)").live("click", function(e) {
        e.stopPropagation();
        var htmlName = $(this).attr('name');
        Cen.html("<iframe style=\"width:100%;height:99%;\" name=\"MbIframe\" src=\"/List/Template?type=" + htmlName + "\" scrolling=\"yes\" class=\"demo-iframe\" frameborder=0 id=\"activity\"></iframe>");
    });*/
    //自定义模板
    $("#MbUl > li:last-child").live("click", function(e) {
        //判断是否是管理员  0代表管理员
        var level = $("#hidden_level").val();
        if (level == 1) {
            e.stopPropagation();
            Cen.html("<iframe style=\"width:100%;height:99%;\" name=\"MbIframe\" src=\"/List/DiyTemplate\" scrolling=\"yes\" class=\"demo-iframe\" frameborder=0 id=\"activity\"></iframe>");
           /*$("#MbUl li[name='智能问答类']").trigger("click");  
              $("#activity").contents().html("2222") 
            setTimeout(function(){

                $("#activity").contents().find(".editor").attr("contenteditable", false).end().find('div#file-btn').remove().end().find('div.sec-line').remove().end().find(".attach").parents("div.detail_name").remove().end().find("#publish-html").hide();
            },600)*/
        } else {
            alert("无权限");
            return false;
        }
    });

    /**
     * 是否可以拖拽成为子节点
     */
    function canInner(treeId, nodes, targetNode) {
        return targetNode.iconSkin === "folder";
    }

    //单击事件回调函数
    function OnClick(event, treeId, treeNode) {
        if (treeNode.level === 2) {
            if($("#activity").length!=0){
                var res = checkHtml('pro');
                if(!res){
                    return false;
                }
            } 
        }
        zTree.expandNode(treeNode);
        //获得面包屑
        var thisNode = treeNode;
        var nodeName = [],
                nodeType = [];
        while (thisNode) {
            nodeName.push("<span>" + thisNode.name + "</span>");
            nodeType.unshift(thisNode.name);
            // nodeType.unshift(thisNode.id);
            thisNode = thisNode.getParentNode();
        }
        nodeName.reverse();
        nodeType.push(treeNode.iconSkin || "file");
        var nodeData = nodeType.join();

        //存放文件路径和文件名
        var file = nodeData.substr(0, nodeData.lastIndexOf(","));
        var fileArr = file.split(",");
        var fileName = fileArr[fileArr.length - 1];
        var fileStr = fileArr.join("/");
        var filePath = fileStr.substr(0, fileStr.lastIndexOf("/"));



        //若当前节点未关联url，显示新建页面
        if (!treeNode.url) {
            var flag = 0;
            $("#breadcrumb").html(nodeName.join(">"));

            $("#hidden_path").val(filePath);
            $("#hidden_name").val(fileName);
            var pro=$(window.top.document).find("#userpro").html();

            //判断是否有数据
            // return false;
            $.post("/List/DecideShow", {path: filePath, name: fileName,province:pro}, function(result) {
                if (typeof(result) == "object") { //知识点被占用
                    Cen.css("background", "#fff");
                    var knowProvince = result["province"];
                    var knowCity = result["city"];
                    var knowType = result["type"];
                    Cen.html("<iframe style=\"width:100%;height:99%;\" name=\"MbIframe\" src=\"/KnowOcuppy/ShowOcuppy?pro=" + knowProvince + "&city=" + knowCity + "&type=" + knowType + "\" scrolling=\"yes\" class=\"demo-iframe\" frameborder=0 id=\"activity\"></iframe>");
                } else if (result == 0) {//没有数据 显示新建页面
                    $.post("/List/GetTemplateType", {}, function(data) {
                        if (data == "NotLoggedIn") {
                            window.parent.location.href = "/Login/Login";
                            return false;
                        }
                        var h = "<p class='Tit'>请选择你要的模板</p><ul class='Mb clear' id='MbUl'>";

                        // data = eval('('+data+')');
                        var current_temp = '';
                        for (var i = data.length - 1; i >= 0; i--) {
                            // 隐藏以前自定义模板，显示智能问答之后模板
                            if(data[i]=='智能问答类'){
                                current_temp = i;
                            }
                            if(i<=current_temp){
                                h += "<li name='" + data[i] + "'><div class='mbdel'></div><p>" + data[i].replace("类", "") + "</p></li>";
                            }
                            
                        }
                        h += "<li><img src='/images/xbg.png'></li></ul><p id='MbLiTips'></p>";

                        Cen.css("background", "#fff");
                        Cen.html(h);
                        // 模板提示
                         for(var i=0;i<$("#MbUl li").length-1;i++){
                            if($("#MbUl li").eq(i).attr("name").length>10){
                                var str=$("#MbUl li").eq(i).attr("name");
                                var conStr=str.replace("类", "").substring(0,7);
                                $("#MbUl li").eq(i).find("p").html(conStr+"...")
                            }
                         }
                        $("#MbUl li:not(:last-child)").live("mouseover",function(){
                            var t = $(this).offset().top+94;
                            var l = $(this).offset().left+5;
                             var str=$(this).attr("name");
                            var conStr=str.replace("类","");
                            if(conStr!=$(this).find("p").html()){
                                $("#MbLiTips").html($(this).attr("name").replace("类", "")).show().css({"top":t,"left":l});
                            }
                        });
                        $("#MbUl li").live("mouseout",function(){
                            $("#MbLiTips").html("").hide();
                        });

                        $(".mbdel").unbind("click").click(function(e) {
                            e.stopPropagation();
                            var _this = $(this);
                            if (confirm("确定删除吗？")) {
                                var type = _this.parent("li").attr("name");
                                $.post("/List/DeleteTemplate", {type: type}, function(val) {
                                    if (val == 0) {
                                        alert("删除失败");
                                        return false;
                                    } else if (val == 2) {
                                        alert("无权限");
                                        return false;
                                    } else if (val == "NotLoggedIn") { //未登录
                                        window.parent.location.href = "/Login/Login";
                                        return false;
                                    } else {
                                        _this.parent("li").remove();
                                    }
                                }, "json");
                            }
                        })
                    }, "json");
                } else if (result == "NotLoggedIn") { //未登录
                    window.parent.location.href = "/Login/Login";
                    return false;
                } else if (result == "NoPermission") { //无权限
                    alert("无权限！");
                    return false;
                } else { //有数据 显示编辑页面

                    Cen.css("background", "#fff");
                    Cen.html("<iframe style=\"width:100%;height:99%;\" name=\"MbIframe\" src=\"/List/Show?path=" + filePath + "&name=" + fileName +"&province=" + pro + "\" scrolling=\"yes\" class=\"demo-iframe\" frameborder=0 id=\"activity\"></iframe>");
                }
            }, "json");
        }
    }

    //右键单击回调函数
    function OnRightClick(event, treeId, treeNode) {
        if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
            zTree.cancelSelectedNode();
            showRMenu("root", event.clientX, event.clientY);
            //$("#rMenu > ul > li").show();
        } else if (treeNode && treeNode.iconSkin === "folder") {
            if (treeNode.level === 0) {
                zTree.selectNode(treeNode);
                showRMenu("folderFirst", event.clientX, event.clientY);
             }else{
                zTree.selectNode(treeNode);
                showRMenu("folder", event.clientX, event.clientY, treeNode);
             }
        } else if (treeNode) {
            zTree.selectNode(treeNode);
            showRMenu("node", event.clientX, event.clientY);
        }
    }

    //重命名回调函数
    function OnBeforeRename(treeId, treeNode, newName, isCancel) {
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
                url: "/Folder/UpdateFolder",
                type: "post",
                async: false,
                data: {node_id: node_id, old_name: oldName, new_name: newName, node_path: nodeData, pid: parentId, level: level},
                datatype: "json",
                success: function(result) {
                    if (result != 1) {
                        if (result == 0) {
                            alert(treeAlertMsg.rename[0]);
                            bool = false;
                            zTree.cancelEditName();
                            // return false;
                        } else if (result == "NotLoggedIn") {
                            window.parent.location.href = "/Login/Login";
                            return false;
                        } else if (result == "NoPermission") { //无权限
                            alert("无权限！");
                            return false;
                        } else {
                        }
                    }
                }
            });
            return bool;
        } else {
            // zTree.editName(treeNode[0]);
            return true;
        }
        ;
    }
    ;
    function OnRename(event, treeId, treeNode) {
    }
    ;

    //导出节点文件
    $("#m_export a").live("click", function(e) {
        //alert("h3");
        //获得所选中的节点
        hideRMenu(); //隐藏弹出框
        e.preventDefault();
        var userProvince = $("#userpro").html();
        var nodes = zTree.getSelectedNodes(),
                thisNode = nodes[0],
                nodename = thisNode.name,
                nodeid = thisNode.id,
                nodeNames = [];
        //获得节点所在的path
        var nodePath;
        var NodeParent = thisNode.getParentNode();
        while (NodeParent) {
            nodeNames.unshift(NodeParent.name);
            NodeParent = NodeParent.getParentNode();
        }
        nodePath = nodeNames ? nodeNames.join("/") : "";
        $.ajax({
            type: "POST",
            url: "/Folder/Exportfolder",
            data: {nid: nodeid, node: nodename, path: nodePath, uProvince: userProvince},
            dataType: "json",
            success: function(data) {
                //data为2时 是压缩下载时出现异常，异常内容参考日志
                if (data == 1) {
                    alert("您所在的省份没有该知识点信息或没有发布");
                    return false;
                } else if (data == 2) {
                    alert("导出失败");
                    return false;
                } else if (data == "NotLoggedIn") {
                    window.location.href = "/Login/Login";
                } else {
                    window.location.href = "/folder/downLoadNode?file=" + data;
                }
            }
        })
    });

    //移动节点 sunying
    function OnMoveNode(treeId, treeNodes, targetNode, moveType) {

        var flag = false; //更新是否成功标志
        var isMove; //是否可以移动标志
        var isUpdate; //是否可以更新到数据库的标志

        if (targetNode != null) {
            var nodeId = treeNodes[0].id;
            var targetId = targetNode.id;
            //nodeOldpath
            var nodeNames = [];
            var thisNode = treeNodes[0].getParentNode();
            while (thisNode) {
                nodeNames.unshift(thisNode.name);
                thisNode = thisNode.getParentNode();
            }
            if (nodeNames.length > 2) {
                nodeNames.pop();
            }
            var nodename = treeNodes[0].name;  //移动节点的name
            var nodeOldpath = nodeNames.join("/");

            //nodeNewpath
            var newName = [];
            var nodeNewpath = "";
            var newNodeParent = targetNode.getParentNode();
            while (newNodeParent) {
                newName.unshift(newNodeParent.name);
                newNodeParent = newNodeParent.getParentNode();
            }
            if (newName.length == 1) {
                nodeNewpath = newName[0] + "/" + targetNode.name;
            } else {
                nodeNewpath = newName.join("/");
            }
            $.ajax({
                type: "POST",
                url: "/folder/movenodeType",
                data: {tid: targetId, nid: nodeId, name: nodename, oldpath: nodeOldpath, moveType: moveType},
                dataType: "json",
                async: false,
                success: function(d) {//liu 2015.3.2
                    if (d == 1 || d == 2 || d == 3 || d == 4) {
                        alert(treeAlertMsg.moveError[d]);
                    } else if (d == "NotLoggedIn") {
                        window.parent.location.href = "/Login/Login";
                        return false;
                    } else {
                        isMove = true; //节点可以移动
                    }
                }
            });
            if (isMove) {
                $.ajax({
                    type: "POST",
                    url: "/folder/isexistsknow",
                    data: {tid: targetId, name: nodename, oldpath: nodeOldpath, newpath: nodeNewpath, moveType: moveType},
                    dataType: "json",
                    async: false,
                    success: function(data) {
                        if (data == 0 || confirm(treeAlertMsg.moveError[5]) == true) {
                            isUpdate = true;//可以更新节点
                        }
                    }
                });
            }
            if (isUpdate) {
                $.ajax({
                    type: "POST",
                    url: "/folder/updateparent",
                    data: {nid: nodeId, pid: targetId, name: nodename, oldpath: nodeOldpath, newpath: nodeNewpath, moveType: moveType},
                    dataType: "json",
                    async: false,
                    success: function(result) {
                        flag = true;
                        if (result == 2) {
                            alert(treeAlertMsg.moveError[0]);
                            flag = false;
                        } else if (result == "NotLoggedIn") {
                            window.parent.location.href = "/Login/Login";
                            return false;
                        } else if (result !== 1) {
                            var coveredNode = zTree.getNodeByParam("id", result, targetNode);
                            zTree.removeNode(coveredNode);
                        }
                    }
                });
            }

            return flag;
        }

    }

    function showRMenu(type, x, y, node) {
        $("#rMenu ul").show();
        var level = $("#hidden_level").val();
        if (type == "root") {
            $("#m_del").hide();
            $("#m_add").hide();
            $("#m_rename").hide();
            $("#m_export").hide();
            if (level == 1) {
                $("#m_add_folder").show();
            } else {
                $("#m_add_folder").hide();
            }
        } else if (type == "folder") {
            $("#m_add").show();
            $("#m_add_folder").hide();
            $("#m_export").show();
            if (level == 1) {
                $("#m_del").show();
                $("#m_rename").show();
            } else {
                $("#m_del").hide();
                $("#m_rename").hide();
            }
        }else if(type == "folderFirst"){
            $("#m_add").hide();
            $("#m_add_folder").show();
            $("#m_export").show();
            if (level == 1) {
                $("#m_del").show();
                $("#m_rename").show();
            } else {
                $("#m_del").hide();
                $("#m_rename").hide();
            }
        } else {
            $("#m_add").hide();
            $("#m_add_folder").hide();
            $("#m_export").show();
            if (level == 1) {
                $("#m_del").show();
                $("#m_rename").show();
            } else {
                $("#m_del").hide();
                $("#m_rename").hide();
            }
        }
        rMenu.css({"top": y + "px", "left": x + "px", "visibility": "visible"});

        $("body").bind("mousedown", onBodyMouseDown);
    }

//    $.post("/Folder/ShowFolder", {}, function(result) {
//        result[0].open = true;
//
//
//        $.fn.zTree.init($("#treeDemo"), setting, result);
//        zTree = $.fn.zTree.getZTreeObj("treeDemo");
//        rMenu = $("#rMenu");
//    }, "json");

    var FalseData=[
        { id:1, pId:0, name:"浙江省", open:true,drag:false},
        { id:111, pId:1, name:"唐僧"},
        { id:112, pId:1, name:"孙悟空"},
        { id:113, pId:1, name:"猪八戒"},
        { id:114, pId:1, name:"沙和尚"},
        { id:12, pId:1, name:"嘉兴"},
        { id:121, pId:1, name:"张无忌"},
        { id:122, pId:1, name:"赵敏"},
        { id:123, pId:1, name:"周芷若"},
        { id:124, pId:1, name:"小昭"},
        { id:2, pId:0, name:"贵州省",drag:false},
        { id:211, pId:2, name:"诸葛亮"},
        { id:212, pId:2, name:"曹操"},
        { id:213, pId:2, name:"周瑜"},
        { id:214, pId:2, name:"刘备"},
        { id:221, pId:2, name:"貂蝉"},
        { id:222, pId:2, name:"吕布"},
        { id:223, pId:2, name:"孙尚香"},
        { id:224, pId:2, name:"小乔"},
        { id:3, pId:0, name:"北京市",drag:false},
        { id:311, pId:3, name:"鲁迅"},
        { id:312, pId:3, name:"老舍"},
        { id:313, pId:3, name:"钱学森"},
        { id:4, pId:0, name:"备用库",drag:false,noR:true},
    ];

    $.fn.zTree.init($("#treeDemo"), setting, FalseData);
    zTree = $.fn.zTree.getZTreeObj("treeDemo");
    rMenu = $("#rMenu");
    $(".ztree").height($(window).height() - 144);
    $("#Right").height($(window).height() - 60);
    $(".center").height($(window).height() - 120);

});


$(".rightMain_con").hide();
// 人员增加
//搜索文字提示
$(".searInput").live("focus", function() {
    if (this.value == this.defaultValue) {
        this.value = ''
    }
});
$(".searInput").live("blur", function() {
    if (!this.value) {
        this.value = this.defaultValue
    }
});

//增加人员提交按钮
$("#addPersonSubmit").live("click", function() {
    var addPersonTable =$("#add_tabtBody");
    var addPersonTableLength =$("#add_tabtBody").find("tr").length;
    var personData = [];
    if (addPersonTableLength == 0) {
        alert('人员信息为空');
        return false;
    }
    for (var i = 0; i < addPersonTableLength; i++) {
        var json = {};
        for(var j=0;j<$("#add_tabtBody").find("tr").eq(i).find("td").length-1;j++){ 
            json["name"] =$("#add_tabtBody").find("tr").eq(i).find("td").eq(0).find("input").val();
            json["job_number"] = $("#add_tabtBody").find("tr").eq(i).find("td").eq(1).find("input").val();;
            json["position"] = $("#add_tabtBody").find("tr").eq(i).find("td").eq(2).find("input").val();;
            json["area"] = $("#add_tabtBody").find("tr").eq(i).find("td").eq(3).find("input").attr("thisvalue");
            json["second_department"] = $("#add_tabtBody").find("tr").eq(i).find("td").eq(4).find("input").val();;
            json["third_department"] = $("#add_tabtBody").find("tr").eq(i).find("td").eq(5).find("input").val();;
            json["team_group"] = $("#add_tabtBody").find("tr").eq(i).find("td").eq(6).find("input").val();;
            json["telephone"] =$("#add_tabtBody").find("tr").eq(i).find("td").eq(7).find("input").val();;
        }
        personData.push(json);
    }

    $.post('/Permission/AddUser', {person_data: personData}, function(result) {
        if (result == 0) {
            alert('操作失败！');
            return false;
        }

        alert('操作成功！');
        jurPop_close();
        page_type = 'permission';
        getUserId();
        ajaxChangeData(1);
    });
});

//批量导入人员
$("#bacthSubmit").live('click', function() {
    $("form#batchImportForm").ajaxSubmit({
        type: "post",
        url: "/Permission/BatchAddUser",
        success: function(result) {
            if(result == 0){
                alert('导入失败！');
                return false;
            }

            alert('导入成功！');
            jurPop_close();
            page_type = 'permission';
            getUserId();
            ajaxChangeData(1);
        },
        error: function(result) {
            alert('导入失败！');
            return false;
        }
    }, 'json');
});


// 分页
/**
 * [paging 动态生成分页]
 * @param  {[int]} total [总记录数量]
 * @param  {[int]} limit [每页显示数量]
 * @param  {[int]} num   [到第几页]
 * @return {[type]}      [description]
 */
// 生成页码
function paging(total, limit, num) {
    var all_page = Math.ceil(total / limit);   //总页数
    var up_not = num == 1 ? 'not' : '';
    var down_not = (all_page == num) ? 'not' : '';
    var page_str = '<input type="button" id="page_up" class="ipt ' + up_not + '" value="上一页" />';
    a_str = '';
    num = parseInt(num);
    var count = 0;
    for (var i = num - 8; i <= num; i++)
    {
        if (i <= 0 || i > all_page)
            continue;
        if (i == num) {
            a_str += '<a href="javascript:;" class="a_page_num on">' + i + '</a>';
        } else {
            a_str += '<a href="javascript:;" class="a_page_num">' + i + '</a>';
        }
        count++;
    }
    for (var i = num + 1; i <= all_page; i++)
    {
        if (count >= 10)
        {
            break;
        }
        a_str += '<a href="javascript:;" class="a_page_num">' + i + '</a>';
        count++;
    }
    page_str += a_str;
    page_str += '<input type="button" id="page_down" class="ipt ' + down_not + '" value="下一页" />';
    //计算页面区间
    var now_num = (num * limit) > total ? total : (num * limit);
    var now = ((num - 1) * limit + 1) + '~<b id="section">' + now_num + '</b>';
    page_str += '<span>（' + now + '/<b id="all_count">' + total + '</b>）</span>';
    page_str += '<span>到第</span>';
    page_str += '<select  name="sele_page">';
    op_str = '';
    for (var i = 1; i <= all_page; i++)
    {
        if (num != i) {
            op_str += '<option>' + i + '</option>';
        }
        else {
            op_str += '<option selected>' + i + '</option>';
        }
    }
    page_str += op_str + '</select>';
    page_str += '<input type="button" class="confirm" value="确定" />';
    $("div.pages").html(page_str);
}
//翻页--跳转
$(".confirm").live('click', function() {
    $('body,html').animate({scrollTop: 100}, 500);
    var go_page = $("select[name='sele_page'] option:selected").val();
    var page_number = (parseInt(go_page));
    ajaxChangeData(page_number);
});
//翻页--正常翻页
$("a.a_page_num").live('click', function() {
    $(this).addClass('on').siblings().removeClass('on');
    var index = $(this).index();
    $('body,html').animate({scrollTop: 100}, 500);
    var page_number = $(this).text();   //翻页页数
    ajaxChangeData(page_number);
});
//翻页--上一页/下一页
$("div.pages input.ipt").live('click', function() {
    var btn_val = $(this).val();
    var now_page = parseInt($("div.pages a.on").text());  //当前页数
    if (btn_val == '上一页') {
        if (now_page != 1) {
            var page_number = now_page - 1;
            $('body,html').animate({scrollTop: 100}, 500);
            ajaxChangeData(page_number);
            $(this).removeClass('not');
        }
    }
    else if (btn_val == '下一页') {
        var showNum = $("#showNum").val();
        var all_count = Math.ceil(parseInt($("#all_count").text()) / showNum);   //总记录数/showNum = 总页数
        if (now_page != all_count) {//如果当前页不是最后一页
            var page_number = now_page + 1;
            $('body,html').animate({scrollTop: 100}, 500);
            ajaxChangeData(page_number);
        }
    }
});

var checkedArr = [];
var checkedDefault = [];
//获取当前条件下所有人员Id
function getUserId() {
    $.ajax({
        type: "POST",
        url: "/Permission/AllFilterUserId",
        data: {searchVal: searchVal, province: filter_province, city: filter_city, second_department: filter_second, third_department: filter_third, position: filter_position, team_group: filter_team_group},
        async: false,
        success: function(data) {
            checkedDefault = eval('(' + data + ')');
            checkedArr = eval('(' + data + ')');
        }
    }, "json");
}

//ajax翻页
function ajaxChangeData(page_number) {

    var query = {};
    query.page_number = page_number != '' ? page_number : '';   //页数
    if(page_type == 'permission'){
        $.post('/Permission/AllFilterUser', {page: page_number, searchVal: searchVal, province: filter_province, city: filter_city, second_department: filter_second, third_department: filter_third, position: filter_position, team_group: filter_team_group}, function(result) {
            var userData = result['userData'];
            add_personData = userData;
            var totalNum = result['totalNum'];
            var showNum = result['showNum'];
            paging(totalNum, showNum, page_number);
            checkedOn(userData, newHtml);
            $("#userTbody").html(newHtml);
        }, 'json');
    }else{
        $.get('/Permission/PermissTemplateData', {page: page_number}, function(result) {
            var replaceHtml = "";
            var tempData = result['tempData'];
            var totalNum = result['totalNum'];
            var showNum = result['showNum'];
            paging(totalNum, showNum, page_number);

            for (var i in tempData) {
                var j = parseInt(i)+parseInt(1);
                replaceHtml += '<tr><td>'+j+'</td><td>'+tempData[i]['name']+'</td><td>'+tempData[i]['permission']+'</td><td>'+tempData[i]['notice']+'</td><td><a href="javascript:;" class="modify del templateDel" tempId="'+tempData[i]['id']+'">删除</a><a href="javascript:;" class="modify templateUpdate" tempId="'+tempData[i]['id']+'">修改</a></td></tr>';
            };
            $("#tempTbody").html(replaceHtml);
        }, 'json');
    }
}

var page_type = '';
//权限设置
$("#per_set").bind("click", function() {
    closebtn();
    $("#Left").hide();
    $("#Right").css("margin-left","0");

    //获取当前条件下所有人员Id
    getUserId();

    $.ajax({
        url: "/Permission/Index",
        type: 'GET',
        async: false,
        success:function (result) {
            $(".center").html(result);
            page_type = 'permission';
            var totalNum=$("#totalNum").val();
            var showNum=$("#showNum").val();
            paging(totalNum, showNum, 1);
        }
    });

    //tian jia sheng fen
    var pH = '';
    for(var i in cityData){
        pH += '<option value="'+i+'">'+i+'</option>';
    }
    $("#provinces").html(pH);

    // tian jia cheng shi
    $("#provinces").live("change",function(){
        var h = $(this).val();
        var cH = '';
        for(var i in cityData[h]){
            cH += '<option value="'+cityData[h][i]+'">'+cityData[h][i]+'</option>';
        }
        $("#city").html(cH);
        changFilterData();
    });
});

//获取目录树的数据
function getTreeData(){
    $.ajax({
        type: "POST",
        url: "/Permission/ShowFolderTree",
        data: {},
        async: false,
        success: function(result) {
            if (result) {
                if (result == "NotLoggedIn")
                    window.parent.location.href = "/Login/Login";
                else
                    treeData = eval('(' + result + ')');
            }
        }
    }, "json");

    return treeData;
}

function set_tree(treeData){
    var setting1 = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onCheck: zTreeOnCheck
        }
    };
    var setting2 = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onCheck: zTreeOnCheck
        }
    };

     var zNodes1=[];
      var zNodes2=[];
    for(var i in treeData){
        zNodes1.push(treeData[i]);
        zNodes2.push(treeData[i]);
    }
    $.fn.zTree.init($("#tree1"), setting1, zNodes1);
    $.fn.zTree.init($("#tree2"), setting2, zNodes2);
}

function zTreeOnCheck(event, treeId, treeNode){
    var tf = treeNode.checked;
     if(tf==false){
        $("#"+treeId).parent().siblings().find("input[name='all']").attr("checked",false);
     }
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var nodes = treeObj.getNodes();   
        var i = 0;
        for(var node in treeObj.transformToArray(nodes)){    
             i++;
        } 

        var chk_treeObj = $.fn.zTree.getZTreeObj(treeId);
        var chk_nodes = chk_treeObj.getCheckedNodes(true);

        if(i == chk_nodes.length){
            $("#"+treeId).parent().siblings().find("input[name='all']").attr("checked",true);
        }
}

//预设置模版管理
$("#persetTemplate").live("click", function(){
    $.ajax({
        url: "/Permission/PermissionAndTemplateIndex",
        type: 'GET',
        data: {type: 'perset'},
        async: false,
        success:function (result) {
            check_all=1;
            $(".center").html(result);
            page_type = 'template';
            var totalNum=$("#totalNum").val();
            var showNum=$("#showNum").val();
            paging(totalNum, showNum, 1);

            getTreeData();
            //console.log(treeData);
            set_tree(treeData);

        }
    });
    $("#breadcrumb").html("<div class='per_breadcrumb'><span id='per_breadFirst'>权限首页</span>><span>预设置模版管理</span></div>")
});
$("#per_breadFirst").live("click",function(){
    $("#per_set").trigger("click");
    $("#breadcrumb").html("");
})

var searchVal = '';
// 搜索查询
$(".searchBtn").live("click", function() {
    if ($("#search").val() == "Search") {
        alert("请输入您要查找的内容");
        return false;
    }

    searchVal = $("#search").val();
    getUserId();
    ajaxChangeData(1);

    $(".per_checkAllBox span").addClass("on");
});
// 按回车搜索
$("#search").live('keypress', function(event) {
    if (event.keyCode == 13) {
        if ($(this).val() == "Search") {
            alert("请输入您要查找的内容");
            return false;
        }

        searchVal = $(this).val();
        getUserId();
        ajaxChangeData(1);

        $(".per_checkAllBox span").addClass("on");
    }
});
$("#search").live('focus', function(event){
    if ($(this).val() == "Search") {
            $(this).val('');
    }
});

//下拉列表插件
(function($) {
    $.fn.extend({
        DropDownList: function(options) {
            var op = $.extend({width: "85px", height: "250px", data: ""}, options);
            this.each(function() {
                var $this = $(this);
                var $ListArr = [];
                var $List = $('<div class="perDrowlist" name="' + $this.attr("name") + '"></div>');
                $List.css({"width": op.width, "height": op.height});
                $List.append('<ul></ul>');
                var $ul = $List.find("ul");
                var listData = op.data;
                for (var i in listData) {
                    $ul.append('<li>' + listData[i] + '</li>')
                }
                $("body").append($List)
                $ListArr.push($List);
                $this.click(function(e) {
                    $List.css("left", $this.offset().left);
                    $List.css("top", $this.offset().top + $this.outerHeight());
                    $List.toggle();
                    e.stopPropagation();
                    var dis2 = $List.css("display");
                    if (dis2 == "block") {
                        $this.find("img").attr("src", "../images/arrowUp.png");
                    } else {
                        $this.find("img").attr("src", "../images/arrowDown.png");
                    }
                });
                $(document).click(function() {
                    $List.hide();
                    var dis2 = $List.css("display");
                    if (dis2 == "block") {
                        $this.find("img").attr("src", "../images/arrowUp.png");
                    } else {
                        $this.find("img").attr("src", "../images/arrowDown.png");
                    }
                });
                $("li", $ul).click(function() {
                    $List.hide();
                    $this.find("span").html($(this).html());
                    var dis2 = $List.css("display");
                    if (dis2 == "block") {
                        $this.find("img").attr("src", "../images/arrowUp.png");
                    } else {
                        $this.find("img").attr("src", "../images/arrowDown.png");
                    }
                });
            })

        }
    })
})(jQuery);
//权限设置筛选下拉框
//权限设置筛选下拉框---省份
var provinceDataArr = [];
for (var i in cityData) {
    provinceDataArr.push(i);
}
provinceDataArr.push("--");
var provinceListData = provinceDataArr;

//权限设置筛选下拉框---城市
$('div[name="省份选择"]').live("click", function() {
    var cityDataArr = [];
    var n = $(".province_list span").html();
    for (var i = 0; i < cityData[n].length; i++) {
        cityDataArr.push(cityData[n][i]);
    }
    cityDataArr.push("--");
    var cityListData = cityDataArr;
    $(".city_list").DropDownList({data: cityListData});
});

function findArr(n,arr){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==n){
            return true;
        }
    }
    return false;
}
//下拉列表选择输入判断
$(".position_list span").live("blur", function() {
    var positionVal = $(".position_list span");
   if(!findArr(positionVal.html(),positionListData)){
       alert("请输入正确职位名称");
        positionVal.html("--");
        return false;
   }
});

var add_personData = [];
//变态跨页全选
$(".Jurisdiction .chk").live("click", function() {
    var checkIndex = ($(this).attr("id"));
    if ($(this).is(":checked")) {
        //alert(1);
        checkedArr.push(checkIndex);
    } else {
        //alert(2);
        if (checkedIdFn(checkIndex, checkedArr)) {
            checkedArr.splice(checkedArr.indexOf(checkIndex), 1);
        }
    }

    if (checkedArr.length == checkedDefault.length) {
        check_all = 1;
        $("#filter_all").attr("checked",true);
    } else {
        check_all = '';
        $("#filter_all").attr("checked",false);
    }
});
$("#filter_all").live("change", function() {
    if ($(this).is(":checked")) {
        check_all = 1;
        checkedArr = [];
        $(".Jurisdiction .chk").attr("checked",true);
        for (var i in checkedDefault) {
            checkedArr.push(checkedDefault[i]);
        }
        checkedOn();
    } else {
        check_all = '';
        $(".Jurisdiction .chk").attr("checked",false);
        checkedArr = [];
        checkedOn();
    }
});
var newHtml;
function checkedIdFn(uid, checkArr) {
    var spanClass = '';
    for (var i in checkArr) {
        if (checkArr[i] == uid)
            spanClass = 1;
    }

    return spanClass;
}
function checkedOn(userData, replaceHtml) {
    var replaceHtml = "";
    for (var i in userData) {
        var htmlSpan = '<td><input type="checkbox" class="chk" id="' + userData[i]["id"] + '"/></td>';
        if (checkedIdFn(userData[i]["id"], checkedArr)) {
            htmlSpan = '<td><input type="checkbox" class="chk" checked="checked" id="' + userData[i]["id"] + '"/></td>';
        }

        replaceHtml += '<tr>' + htmlSpan +'<td  class="short_pc" pc="' + userData[i]["province"] + '">' + userData[i]["short_province"] + '</td><td  class="short_pc" pc="' + userData[i]['city'] + '">' + userData[i]["short_city"] + '</td><td>' + userData[i]["second_department"] + '</td><td>' + userData[i]["third_department"] + '</td><td>' + userData[i]["team_group"] + '</td><td>' + userData[i]["position"] + '</td><td>' + userData[i]["username"] + '</td><td>' + userData[i]["job_number"] + '</td><td>' + userData[i]["telephone"] + '</td><td>' + userData[i]["permiss_type"] + '</td></tr>';
    }
    newHtml = replaceHtml;
}


var filter_province = '';
var filter_city = '';
var filter_second = '';
var filter_third = '';
var filter_position = '';
// var filter_job_number = '';
var filter_team_group = '';
//切换城市
$("#city").live("change", function() {
    changFilterData();
});
//切换二级部门
$("#second").live("change", function() {
    changFilterData();
});
//切换三级部门
$("#third").live("change", function() {
    changFilterData();
});
//切换职位
$("#position").live("change", function() {
    changFilterData();
});
//切换班组 
$("#team").live("change", function() {
    changFilterData();
});
//切换筛选数据调用方法
function changFilterData(){
    searchVal = '';
    filter_province = $("#provinces").val();
    filter_city = $("#city").val();
    filter_second = $("#second").val();
    filter_third = $("#third").val();
    filter_position = $("#position").val();
    filter_team_group = $("#team").val();

    getUserId();
    ajaxChangeData(1);

    check_all = 1;
    $("#filter_all").attr("checked",true);
}

$("#filter_yeOrNo").live("change", function() {
    var SetModelSel = $(this).val();
    if (SetModelSel == "预设置权限选择") {
        $("#per_setupBtn").val("权限设置").attr("name","set");
    } else {
        $("#per_setupBtn").val("保存").attr("name","save");
    }
});

var tempId = '',
    template_id = '',
    // template_save_type = 1;
    user_arr = [];
$("#persetTempPermiss").live("click", function() {
    var persetTempName = $("#persetTempName").val();
    if (persetTempName == "") {
        alert("名称不能为空！");
        return false;
    }

    $(".popbox-bg").hide();
    $(".popbox-box").hide();
    $.ajax({
        type: "POST",
        url: "/Permission/TemplateNameSave",
        data: {name: persetTempName},
        async: false,
        success: function(data) {
            if (data) {
                if (data == "NotLoggedIn") {
                    window.parent.location.href = "/Login/Login";
                } else if (data == 2) {
                    alert('名称不能重复');
                    return false;
                } else {
                    tempId = template_id = eval('(' + data + ')');
                    // template_save_type = '';

                    $.ajax({
                        url: "/Permission/PermissionAndTemplateIndex",
                        type: 'GET',
                        async: false,
                        success:function (result) {
                            check_all=1;
                            $(".center").html(result);
                            page_type = 'template';
                            var totalNum=$("#totalNum").val();
                            var showNum=$("#showNum").val();
                            paging(totalNum, showNum, 1);

                            getTreeData();
                            set_tree(treeData);
                        }
                    });
                }
            } else {
                alert('操作失败！');
                return false;
            }
        }
    }, "json");
     $("#breadcrumb").html("<div class='per_breadcrumb'><span id='per_breadFirst'>权限首页</span>><span>权限预设置</span></div>")
});

$("#model_closeBtn").live("click", function() {
    $(".popbox-bg").toggle();
    $(".popbox-box").remove();

})

var templateData = '';
$(".templateUpdate").live("click",function(){
        var ztree1 = $.fn.zTree.getZTreeObj("tree1");
        var ztree2 = $.fn.zTree.getZTreeObj("tree2");
    $(".Jurisdiction_tree_cont").find('input[type="checkbox"]').attr("checked",false);
     ztree1.checkAllNodes(false);
    ztree2.checkAllNodes(false);
    template_id = $(this).attr('tempid');
    //获取模板的权限数据和目录数据
    $.ajax({
        url: '/Permission/TemplatePermissAndFolder',
        type: 'POST',
        data: {template_id: template_id},
        async: false,
        success: function(result) {
            if (result) {
                if (result == "NotLoggedIn")
                    window.parent.location.href = "/Login/Login";
                else
                    templateData = eval('(' + result + ')');
            } else {
                alert('操作失败！');
                return false;
            }
        }
    }, "json");

    $(".set_tab a:eq(0)").addClass("on").siblings().removeClass("on");
    $("#Jurisdiction_tab>div:eq(0)").show().siblings().hide();

    //add ztree checked
    ztree1.expandAll(true);
    ztree2.expandAll(true);

    var chk_on = templateData.permData.split(",");
    for(var i in chk_on){
        $("#Jurisdiction_tab .tree_main").find("input[permid='"+chk_on[i]+"']").attr("checked",true);
    }

    for (var i = 0; i < templateData.lookFolder.length; i++) {
        $("#tree1").find("li a[title=" + templateData.lookFolder[i] + "]").siblings("span.chk").trigger("click");
    }

    for (var i = 0; i < templateData.updateFolder.length; i++) {
        $("#tree2").find("li a[title=" + templateData.updateFolder[i] + "]").siblings("span.chk").trigger("click");
    }
})

var check_all = '';
//权限设置按钮 / 预设置权限模板保存提交
$("#per_setupBtn").live("click", function() {

    //没勾选用户
    if(checkedArr.length == 0){
        alert("请选择人员");
        return false;
    }
    //预设置权限模板保存提交
    if($(this).attr('name') == 'save'){
        var templateId = $("#filter_yeOrNo").val();
        $.post('/Permission/PersetTemplateSave', {user_id: checkedArr, template_id: templateId}, function(result) {
            if (result == 1) {
                alert('操作成功！');
            }else if (result == 0) {
                alert('操作失败！');
                return false;
            } else if (result == "NotLoggedIn") {
                window.location.href = "/Login/Login";
            } else {
            }
        });
    }else{//权限设置
        //全选状态
        if ($('#filter_all').is(':checked')){
            check_all = 1;
        }

        $.ajax({
            url: "/Permission/PermissionAndTemplateIndex",
            type: 'GET',
            data: {user_id: checkedArr},
            async: false,
            success:function (result) {
                template_id = '';
                $(".center").html(result);
                page_type = 'template';
                var totalNum=$("#totalNum").val();
                var showNum=$("#showNum").val();
                paging(totalNum, showNum, 1);

                getTreeData();
                set_tree(treeData);
            }
        });
    }
    $("#breadcrumb").html("<div class='per_breadcrumb'><span id='per_breadFirst'>权限首页</span>><span>权限设置</span></div>")
});
//权限设置取消按钮
$("#per_CancleBtn").live("click", function() {
    $(".per_checkAllBox span").addClass("on");
    $("#pre_settingTb .per_checkbox span").addClass("on")
        for (var i in checkedDefault) {
            checkedArr.push(checkedDefault[i]);
        }
        // checkedArr=checkedDefault;
        checkedOn();
});

//权限保存提交
$("#jurSet_btn").live('click', function() {

    //没勾选用户
    if(checkedArr.length == 0){
        alert("请选择人员");
        return false;
    }

    //目录树
    var zTree_Menu1 = $.fn.zTree.getZTreeObj("tree1");
    var zTree_Menu2 = $.fn.zTree.getZTreeObj("tree2");
    var nodes = zTree_Menu1.getNodesByParam("checked", true, null);
    var nodes2 = zTree_Menu2.getNodesByParam("checked", true, null);
    var parent = zTree_Menu1.getNodesByParam("check_Child_State", 1, null);
    var parent2 = zTree_Menu2.getNodesByParam("check_Child_State", 1, null);
    var checkedFolder = new Array();
    var checkedFolder2 = new Array();
    
    function twoTree(n,p,c){
            for (var i = 0; i < n.length; i++) {
                var flag = true;
                for (var j = 0; j < p.length; j++) {
                    if (n[i] == p[j])
                        flag = false;
                }

                if (flag) {
                    var parentName = '';
                    var parentNode = n[i].getParentNode();
                    if (parentNode) {
                        var topParentNode = parentNode.getParentNode();
                        if (topParentNode)
                            parentName = topParentNode['name'] + '/' + parentNode['name'];
                        else
                            parentName = parentNode['name'];
                    }
                    if(parentName=="undefind" || parentName=="" ){
                        n[i]['parent_name'] = n[i]['name'];
                    }else{
                        n[i]['parent_name'] = parentName + '/' + n[i]['name'];
                    } 
                    c.push(n[i]['parent_name']);
                }
            }
    }

    twoTree(nodes,parent,checkedFolder);
    twoTree(nodes2,parent2,checkedFolder2);

    //权限
    var permIdStr=[];
    $("#Jurisdiction_tab .Jurisdiction_tree input[name='part']").each(function(){
        if($(this).is(":checked")){
            permIdStr.push($(this).attr("permid"));
        }
    });

    $.post('/Permission/PermissFolderSave', {user_id: checkedArr, perm_id: permIdStr, look_folder: checkedFolder, update_folder: checkedFolder2, template_id: template_id, check_all: check_all}, function(result) {
        if (result == 1) {
            alert('操作成功！');
        }else if(result == 0){
            alert('操作失败！');
            return false;
        } else if (result == "NotLoggedIn") {
            window.parent.location.href = "/Login/Login";
        } else {
        }
    });
});

$("#ztreeAllCheck").live("click",function(){
    var zTree_Menu1 = $.fn.zTree.getZTreeObj("tree1");
   if($(this).attr("checked")==true){ 
         zTree_Menu1.checkAllNodes(true);
   }else{
        zTree_Menu1.checkAllNodes(false);
   }
});
$("#ztreeAllCheck2").live("click",function(){
    var zTree_Menu2 = $.fn.zTree.getZTreeObj("tree2");
   if($(this).attr("checked")==true){ 
         zTree_Menu2.checkAllNodes(true);
   }else{
        zTree_Menu2.checkAllNodes(false);
   }
});



/************************15-9-9 下午12:19   以下为 公告部分******************************************/
/*
 * 15-8-25 下午2:18    公告保存以及 发布
 */
//公告
$("#per_notice").bind("click", function() {
    closebtn();
    $("#intellqa_menu").hide()
    $("#navUl").show();
    $(".content_wrap").hide();
     $(".rightMain_con").show();
    $('#navUl').find("li[name='noticeList']").trigger("click");//直接刷新一下
//    $(".rightMain_con").css("display", "block").find(".gg_tab").show();
    
    $("#lefttreeBox").hide();
});
$('#notice_form').find(".gg_admin_btn a:lt(2)").live("click", function() {
//    alert('save');
    var notice_query = '';
//    调用函数 检查 各个数据
    var res = check_notice_form();//返回json  数据  status:0,msg:'某个失败'  
//    console.log(res.status);
//res.status==0
    if (res.status == 0) {
        alert(res.msg);
        return false;
        exit;
    }
    else {
        //提交ajax 请求
        if ($(this).attr('name') == 'publish') {
//        alert('pub');
            $('#notice_form').find("input[name='status']").val(1);//发布的状态
        }
        var url = $('#notice_form').attr('action');
        $("#notice_form").find("input[name='" + $("#notice_form div[name='content']").attr("id") + "']").remove();
        notice_query = $('#notice_form').serialize();
//    公告追加内容
        var notice_con = $.trim($("#notice_form div[name='content']").html());
        var notice_city = $.trim($("#notice_form .gg_checkedCity").html());
        notice_query += '&content=' + notice_con+'&city=' + notice_city ;
        $.ajax({
            type: "POST",
            url: url,
            data: notice_query,
            async: true,
            dataType: 'json',
            success: function(data) {
                if (data) {
                    if (data == "NotLoggedIn")
                        window.parent.location.href = "/Login/Login";
                    else if (data.status == 1) {
                        $('#notice_form').find("input[name='status']").val(0);//将状态还原
                        $('#notice_form').find("input[name='notice_id']").val(data.notice_id);//写入存入的notice_id
                        alert(data.msg);
                        $('#navUl').find("li[name='noticeList']").trigger("click");//直接刷新一下

                    }
                    else {
                        alert(data.msg);
                    }
                }
            }
        }, "json");
    }
//    notice_query = $('#notice_form').serialize();
//   console.log(notice_query);
});

function check_notice_form() {
    var data = new Array();
    //检查每一个输入项
    //1.省份
    var pro = $('#gg_sheng').val();
    if (pro == '') {
        data['status'] = 0;
        data['msg'] = '省份不能为空';
        return data;
        exit;
    }
    //2. 城市
    var city = $('#gg_shi').html();
    if (city == '') {
        data['status'] = 0;
        data['msg'] = '城市不能为空';
        return data;
        exit;
    }
    //3标题
    var title = $.trim($('#notice_form').find("input[name='title']").val());
    title = title.replace(/\s+/g, ' ');//去除连续的空格
    if (title.length > 30 || title.length < 1) {
        data['status'] = 0;
        data['msg'] = '标题长度应在1-30个字之间';
        return data;
        exit;
    }
    //15-9-6 上午9:57  判断 同一省市  标题是否重复
    /*
     var notice_id = $.trim($('#notice_form').find("input[name='notice_id']").val());
     var res_title = only_one(pro, city, title,notice_id);
     if (!res_title) {
     data['status'] = 0;
     data['msg'] = '公告标题重复';
     return data;
     exit;
     }
     */

    //4类型选择
    var type = $('#gg_type').val();
    if (type == '') {
        data['status'] = 0;
        data['msg'] = '类型不能为空';
        return data;
        exit;
    }

    //5开始时间
    var power_time = $.trim($('#notice_form').find("input[name='power_time']").val());
    if (power_time == '') {
        data['status'] = 0;
        data['msg'] = '开始时间不能为空';
        return data;
        exit;
    }
    //6结束时间
    var invalid_time = $.trim($('#notice_form').find("input[name='invalid_time']").val());
    if (invalid_time == '') {
        data['status'] = 0;
        data['msg'] = '失效时间不能为空';
        return data;
        exit;
    }
    //7判断起止时间的大小关系，失效时间 大于 开始时间
    var d1 = new Date(power_time.replace(/\-/g, "\/"));
    var d2 = new Date(invalid_time.replace(/\-/g, "\/"));
    if (d2 < d1) {
        data['status'] = 0;
        data['msg'] = '失效时间不应小于开始时间';
        return data;
        exit;
    }
    //8超链接

    //9 紧急程度
    var emergency_style = $('#gg_emergency_style').val();
    if (emergency_style == '') {
        data['status'] = 0;
        data['msg'] = '紧急程度不能为空';
        return data;
        exit;
    }
    //10 关于 弹框的判断
    var bomb_screen = $('#gg_bomb_screen').val();
    if (bomb_screen == '') {
        data['status'] = 0;
        data['msg'] = '弹框内容不能为空';
        return data;
        exit;
    }
    if (bomb_screen == 1) {
        //判断起止时间是否为正常
        var bomb_begin_time = $.trim($('#notice_form').find("input[name='bomb_begin_time']").val());
        if (bomb_begin_time == '') {
            data['status'] = 0;
            data['msg'] = '弹框开始时间不能为空';
            return data;
            exit;
        }
        var bomb_end_time = $.trim($('#notice_form').find("input[name='bomb_end_time']").val());
        if (bomb_end_time == '') {
            data['status'] = 0;
            data['msg'] = '弹框结束时间不能为空';
            return data;
            exit;
        }
        var bt1 = new Date(bomb_begin_time.replace(/\-/g, "\/"));
        var bt2 = new Date(bomb_end_time.replace(/\-/g, "\/"));
        if (bt2 < bt1) {
            data['status'] = 0;
            data['msg'] = '弹框结束时间不应小于弹框开始时间';
            return data;
            exit;
        }
    }
    //公告内容
//     var content = $.trim($('#notice_form').find("textarea[name='content']").val());
//     var con_length = content.length;
    var notice_con = $.trim($("#notice_form div[name='content']").html());
    if (notice_con == '<p><br data-mce-bogus="1"></p>') {
        data['status'] = 0;
        data['msg'] = '公告内容不能为空';
        return data;
        exit;
    }

    //15-8-20 下午3:52  若没有问题，则
    data['status'] = 1;
    return data;
    exit;
}

//弹框
function bombScreen() {
    $("#gg_bomb_screen").change(function() {
        var s = $(this).val();
        if (s == 1) {
            $("#bomb_time").show();
        } else {
            $("#bomb_time").hide();
        }
    });
}

// bombScreen();


//15-8-24 下午2:21  标题重复性检验
function only_one(pro, city, title, notice_id) {
    var res = 0;
    var query_condition = 'province=' + pro + '&city=' + city + '&title=' + title + '&notice_id=' + notice_id;
    $.ajax({
        type: "POST",
        url: "/Notice/Check_title",
        data: query_condition,
        async: false,
        dataType: 'json',
        success: function(data) {
            if (data > 0) {
                res = false;//title  不可用
            }
            else {
                res = true;
            }
        }
    }, "json");
    return res;
}
//公告列表侧边栏点击 
$('#navUl').find("li[name='noticeList']").live("click", function() {
    $.ajax({
        type: "POST",
        url: '/Notice/List',
        async: true,
        dataType: 'html',
        success: function(data) {
            $('.notice_lists').html(data);
            $('.notice_lists').show().siblings().hide();

        }
    }, "json");


})
//$("#navUl").find("li").live("click",function(){
//    var ThisIndex=$(this).index();
//    $(this).addClass("onCol").siblings().removeClass("onCol");
//    $(".rightMain_con").find("div.gg_tab").eq(ThisIndex).show().siblings().hide()
//    
//})

//公告列表侧边栏点击 
$('#navUl').find("li[name='noticeAdd']").live("click", function() {
    $.ajax({
        type: "POST",
        url: '/Notice/Add',
        async: true,
        dataType: 'html',
        success: function(data) {
            $('.notice_add').html(data);
            $('.notice_add').show().siblings().hide();
            bombScreen();
        }
    }, "json");
//   bombScreen();
})


/*
 * 15-8-26 下午2:50   点击编辑按钮  操作
 */

$('.gg_ad_notice_list').find("a[name='gg_ad_edit']").live('click', function() {
    var notice_id = $(this).parent().attr('notice_id');//获取id
    $.ajax({
        type: "POST",
        url: '/Notice/Update',
        data: {notice_id: notice_id},
        async: false,
        dataType: 'html',
        success: function(data) {
            $('.notice_add').html(data);
            $('.notice_add').show().siblings().hide();
        }
    }, "json");
    var p = $("#gg_sheng").attr("sheng");
    var cityValue = $("#gg_shi").attr("cityValue");
    var bombScreen = $("#gg_bomb_screen").attr("bombScreen");
    var ggType = $("#gg_type").attr("ggType");
    var EmergencyStyle = $("#gg_emergency_style").attr("emergency");
    var bombGun = $("#gg_bomb_gun").attr("bombGun");
    var newCity = "";
    /*for(var i in cityData[p]){
        newCity+="<option value='"+cityData[p][i]+"'>"+cityData[p][i]+"</option>";
    }*/
    //$("#gg_shi").html(newCity);
    $("#gg_sheng").find("option[value='" + p + "']").attr("selected", "selected");
   // $("#gg_shi").find("option[value='"+cityValue+"']").attr("selected","selected");
    $("#gg_bomb_screen").find("option[bombScreen='" + bombScreen + "']").attr("selected", "selected");
    $("#gg_type").find("option[value='" + ggType + "']").attr("selected", "selected");
    $("#gg_emergency_style").find("option[value='" + EmergencyStyle + "']").attr("selected", "selected");
    $("#gg_bomb_gun").find("option[bombGun='" + bombGun + "']").attr("selected", "selected");
//     bombScreen();
   /*  $("#gg_sheng").change(function(){
        var p=$(this).val();
        var c="";
        if(p=="全国"){
            newCity="";
           newCity="<option value='全省'>全省</option>";
           $("#gg_shi").html(newCity);
           $("#gg_shi").find("option[value='"+p+"']").attr("selected","selected");
        }else if(p == "天津" || p=="北京" || p=="重庆" ||p=="上海"){
             newCity="";
            for(var i in cityData[p]){
                newCity+="<option value='"+cityData[p][i]+"'>"+cityData[p][i]+"</option>";
            }
            $("#gg_shi").html(newCity);
           $("#gg_shi").find("option[value='"+p+"']").attr("selected","selected");
        }else{
             newCity="";
            for(var i in cityData[p]){
                newCity+="<option value='"+cityData[p][i]+"'>"+cityData[p][i]+"</option>";
            }
             $("#gg_shi").html(newCity);
            $("#gg_shi").find("option[value='全省']").attr("selected","selected");
        }
    })*/
})



/*
 * 15-8-27 上午11:06  关于操作的 其他选择
 */

$('.gg_ad_notice_list').find("a[name='gg_ad_pub']").live('click', function() {
    var notice_id = $(this).parent().attr('notice_id');//获取id
    var status = 1;
    noticeExecute(notice_id, status);
})

$('.gg_ad_notice_list').find("a[name='gg_ad_cannel']").live('click', function() {
    var notice_id = $(this).parent().attr('notice_id');//获取id
    var status = 2;
    noticeExecute(notice_id, status);
})


$('.gg_ad_notice_list').find("a[name='gg_ad_del']").live('click', function() {
    var notice_id = $(this).parent().attr('notice_id');//获取id
    var status = 3;
    if (confirm('确认删除吗?')) {
        noticeExecute(notice_id, status);
    }
    else
        return false;
})


function noticeExecute(notice_id, status) {
    $.ajax({
        type: "POST",
        url: '/Notice/NoticeExecute',
        data: {notice_id: notice_id, status: status},
        async: true,
        dataType: 'json',
        success: function(data) {
            if (data.status == 1) {
                alert(data.msg);
                if (data.flag == 3) {
                    $('#navUl').find("li[name='noticeList']").trigger("click");//直接刷新一下
                }
            }
            else {
                alert(data.msg);
            }
        }
    }, "json");
}


$('form[name="notice_search"]').find("select").live("change", function() {
//    notice_search_input = '';
    search_ajax(1, 'form');
});
function cDayFunc() {
//    notice_search_input = '';
    search_ajax(1, 'form');
}
//公告省份更换
$('form[name="notice_search"]').find("select[name='province']").die().live("change", function() {
        var p=$(this).val();
        var c="";
        var c2="";
        var NoticesearchCity=$('form[name="notice_search"]').find("select[name='city']");
        NoticesearchCity.val("全省");
        for(var i in cityData[p]){
            c+='<option value="'+cityData[p][i]+'">'+cityData[p][i]+'</option>';
        }
        c2='<option value="">不限</option>'+c
        NoticesearchCity.html(c2);

});
function search_ajax3() {
    var search_con = $('form[name="notice_search"]').serialize();
//    console.log(search_con);
    $.ajax({
        type: "POST",
        url: '/Notice/Search',
        data: search_con,
        async: true,
        dataType: 'json',
        success: function(data) {
//            return false
            if (data.status == 'no') {
                alert('无数据');
            }
            else {
                alert(data.total);
            }

        }
    }, "json");

}

/************************15-11-26    以下为 智能问答部分******************************************/
//智能问答模块点击
var qaHtml="";
$("#intellqa").bind("click", function() {
    closebtn();
    $("#intellqa_menu").show();
    $(".content_wrap").hide();
    $(".rightMain_con").hide();
    $(".qaRightMain_con").show();
     qaHtml='<div class="mframe" id="qaIframe"><iframe name="qamain" id="main" src="" frameborder="falseright" scrolling="no" style="border:none; padding:0"  width="100%" height="100%" ></iframe> </div>'
    $(".qaRightMain_con").html(qaHtml)
});
