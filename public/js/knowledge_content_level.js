//一级目录
var editorId = 1;
var LevelData={"业务介绍":{"常用别名":"","业务简介":"","业务功能":"","业务上线时间":"","业务下线时间":"","业务卖点":"","适用范围":"","互斥知识":"","FAQ":""},
    "业务资费":{"资费标准":{"月功能费":["个人","集团"],"通信费":"","流量费":"","信息费":"","季费":"","年费":""},"扣费方式":"","FAQ":""},
    "业务办理":{"业务开通":{"营业厅开通方式":["个人","集团"],"短信营业厅开通方式":"","掌上营业厅开通方式":"","WAP营业厅开通方式":"","客户端开通方式":"","客户经理开通方式":"","其他渠道开通方式":""},
        "业务变更":{"营业厅变更方式":["个人","集团"],"网上营业厅变更方式":"","短信营业厅变更方式":"","掌上营业厅变更方式":"","WAP营业厅变更方式":"","客户端变更方式":"","客户经理变更方式":"","其他渠道变更方式":""},
        "业务退订":{"营业厅退订方式":["个人","集团"],"网上营业厅退订方式":"","短信营业厅退订方式":"","掌上营业厅退订方式":"","WAP营业厅退订方式":"","客户端退订方式":"","客户经理退订方式":"","其他渠道退订方式":""},
        "业务增加":{"营业厅增加方式":["个人","集团"],"网上营业厅增加方式":"","短信营业厅增加方式":"","掌上营业厅增加方式":"","WAP营业厅增加方式":"","客户端增加方式":"","客户经理增加方式":"","其他渠道增加方式":""},
        "业务删除":{"营业厅删除方式":["个人","集团"],"网上营业厅删除方式":"","短信营业厅删除方式":"","掌上营业厅删除方式":"","WAP营业厅删除方式":"","客户端删除方式":"","客户经理删除方式":"","其他渠道删除方式":""},
        "业务暂停":{"营业厅暂停方式":["个人","集团"],"网上营业厅暂停方式":"","短信营业厅暂停方式":"","掌上营业厅暂停方式":"","WAP营业厅暂停方式":"","客户端暂停方式":"","客户经理暂停方式":"","其他渠道暂停方式":""},
        "业务恢复":{"营业厅恢复方式":["个人","集团"],"网上营业厅恢复方式":"","短信营业厅恢复方式":"","掌上营业厅恢复方式":"","WAP营业厅恢复方式":"","客户端恢复方式":"","客户经理恢复方式":"","其他渠道恢复方式":""},
        "业务修改":{"营业厅修改方式":["个人","集团"],"网上营业厅修改方式":"","短信营业厅修改方式":"","掌上营业厅修改方式":"","WAP营业厅修改方式":"","客户端修改方式":"","客户经理修改方式":"","其他渠道修改方式":""},
        "业务重置":{"营业厅重置方式":["个人","集团"],"网上营业厅重置方式":"","短信营业厅重置方式":"","掌上营业厅重置方式":"","WAP营业厅重置方式":"","客户端重置方式":"","客户经理重置方式":"","其他渠道重置方式":""},
        "业务激活":{"营业厅激活方式":["个人","集团"],"网上营业厅激活方式":"","短信营业厅激活方式":"","掌上营业厅激活方式":"","WAP营业厅激活方式":"","客户端激活方式":"","客户经理激活方式":"","其他渠道激活方式":""},
        "业务查询":{"营业厅查询方式":["个人","集团"],"网上营业厅查询方式":"","短信营业厅查询方式":"","掌上营业厅查询方式":"","WAP营业厅查询方式":"","客户端查询方式":"","客户经理查询方式":"","其他渠道查询方式":""},
        "协议单据":"","FAQ":""},
    "业务使用":{"客户端下载":"","客户端安装":"","客户端登录":"","客户端设置":"","客户端保存":"","PC下载":"","PC安装":"","PC登录":"","PC设置":"","PC保存":"","FAQ":""},
    "内部知晓":{"10086相关":"","营业厅相关":"","二线客服":"","主管部门":""}
};
var oneLevelCon="";
var twoLevelCon="";
var twoLevelConStart="";
var firstLevelName="",seondLevelName="",thirdLevelName="";
for(var i in LevelData){
    oneLevelCon+='<li name="'+i+'">'+i+'</li>'
}
//二级初始
for(var i in LevelData["业务介绍"]){
    twoLevelConStart+='<option value="'+i+'">'+i+'</option>';
};
twoLevelConStart='<option value="请选择二级目录">请选择二级目录</option>'+twoLevelConStart;
// 生成二级栏目内容
function genDefaultLevelContent() {
    var secondLevelContent='<div class="knowledgeCon_cont_main ">'+
        '<div class="clearfix knowledgeCon_cont_mainHead">'+
        ' <div class="chose_city">'+
        '<select class="twoLevelChose">'+twoLevelConStart+'</select>'+
        ' <select>'+
        '<option value="全国统一">全国统一</option>'+
        '</select>'+
        ' <select class="province"></select>'+
        ' <select class="city"><option value="全省">全省</option></select>'+
        '</div>'+
        '<p class="operation clearfix seondBtn"><span class="pcIcon"></span><span class="megIcon"></span><span class="fetionIcon"></span><span class="delLevelIcon"></span></p></div>'+
        '<div class="thirdLevelWrap"></div>';
    secondLevelContent = secondLevelContent +
        '</div><div class="editorWrap"><div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
        '<div class="editor-plain editor" id="editor-plain-' + editorId +'">请在此编辑</div></div>';
    return secondLevelContent;
}
function genSubLevelContent(subLevelCon, classname) {
    var subLevelContent='<div class="knowledgeCon_cont_main ">'+
        '<div class="clearfix knowledgeCon_cont_mainHead">'+
        ' <div class="chose_city">'+
        '<select class="' + classname + '">'+subLevelCon+'</select>'+
        ' <select>'+
        '<option value="全国统一">全国统一</option>'+
        '</select>'+
        ' <select class="province"></select>'+
        ' <select class="city"><option value="全省">全省</option></select>'+
        '</div>'+
        '<p class="operation clearfix seondBtn"><span class="pcIcon"></span><span class="megIcon"></span><span class="fetionIcon"></span><span class="delLevelIcon"></span></p></div>'+
        '<div class="thirdLevelWrap"></div></div>';
    return subLevelContent;
}
function genSecondLevelContent() {
    var level_name_one = arguments[0] ? arguments[0] : "业务介绍";
    var level_name_two = arguments[1] ? arguments[1] : null;
    var level_name_three = arguments[2] ? arguments[2] : null;
    var level_name_four = arguments[3] ? arguments[3] : null;
    var editor_content = arguments[4] ? arguments[4] : null;
    if (null == level_name_two) {
        return genDefaultLevelContent();
    }
    subLevelContent = "";
    subLevelCon="";
    for(var i in LevelData[level_name_one]){
        subLevelCon+='<option value="'+i+'">'+i+'</option>';
    }
    subLevelContent = subLevelContent + genSubLevelContent(subLevelCon, "twoLevelChose");
    subLevelCon="";
    for(var i in LevelData[level_name_one][level_name_two]){
        subLevelCon+='<option value="'+i+'">'+i+'</option>';
    }
    subLevelContent = subLevelContent + genSubLevelContent(subLevelCon, "threeLevelChose");
    subLevelCon="";
    for(var i in LevelData[level_name_one][level_name_two][level_name_three]){
        subLevelCon+='<option value="'+i+'">'+LevelData[level_name_one][level_name_two][level_name_three][i]+'</option>';
    }
    subLevelContent = subLevelContent + genSubLevelContent(subLevelCon, "fourLevelChose");

    subLevelContent = subLevelContent +
        '</div><div class="editorWrap"><div class="ue-editor editor" id="editor-'+ editorId +'" style="display: none;"></div>'+
        '<div class="editor-plain editor" id="editor-plain-' + editorId +'">'+ editor_content +'</div></div>';
    editorId++;
    return subLevelContent;
}
function genFirstLevelContent() {
    var level_name_one = arguments[0] ? arguments[0] : "业务介绍";
    var level_name_two = arguments[1] ? arguments[1] : null;
    var level_name_three = arguments[2] ? arguments[2] : null;
    var level_name_four = arguments[3] ? arguments[3] : null;
    var editor_content = arguments[4] ? arguments[4] : null;

    var firstLevelContent='<div class="knowledgeCon_cont"> <div class="knowledgeCon_cont_tit clearfix "><div class="dropdownbox"><div class="dropdown_tit">'+
        ' <span class="choose_type">'+ level_name_one +'</span> <img alt="" src="../images/arrowUp.png"></div>'+
        '<ul class="dropdown">'+oneLevelCon+'</ul></div>'+
        '<p class="operation clearfix"><span class="pcIcon"></span><span class="megIcon"></span><span class="fetionIcon"></span><span class="delLevelIcon"></span></p></div>'
        + genSecondLevelContent(level_name_one,level_name_two, level_name_three, level_name_four, editor_content)
        +'<div class="addSecondBtn clearfix">'+
        '<button class="addBtn">添加二级栏目</button>'+
        '</div></div>';
    return firstLevelContent;
}
//    添加一级栏目
$(".addFirstBtn  .addBtn").live("click",function(){
    $("div.operationBtn").before(genFirstLevelContent());
    knowledgeChoseCity($(".knowledgeCon .province").last());
    twoLevelConStart="";
    for(var i in LevelData[$("div.knowledgeCon_cont:last").find(".choose_type ").html()]){
        twoLevelConStart+='<option value="'+i+'">'+i+'</option>';
    };
    twoLevelConStart='<option value="请选择二级目录">请选择二级目录</option>'+twoLevelConStart;
    editorId = editorId + 1;
});
//    添加二级栏目
$(".addSecondBtn .addBtn").live("click",function(){
    $(this).parent().before(genSecondLevelContent());
    knowledgeChoseCity($(this).parent().prev(".knowledgeCon_cont_main ").find(".province"));
    twoLevelConStart="";
    for(var i in LevelData[$(this).parents(".knowledgeCon_cont").find(".choose_type ").html()]){
        twoLevelConStart+='<option value="'+i+'">'+i+'</option>';
    };
    $(this).parent().prev(".knowledgeCon_cont_main ").find(".twoLevelChose").html("").end().find(".twoLevelChose").html('<option value="请选择三级目录">请选择三级目录</option>'+twoLevelConStart);
    editorId = editorId + 1;
});
//添加三级栏目
function genThirdLevelContent(threeChoseElm,thirdCon,levelBtn){
    var thirdLevelContent= '<div class="clearfix knowledgeCon_cont_mainHead">'+
        ' <div class="chose_city">'+
        '<select class='+threeChoseElm+'>'+thirdCon+'</select>'+
        ' <select>'+
        '<option value="全国统一">全国统一</option>'+
        '</select>'+
        ' <select class="province"></select>'+
        ' <select class="city"><option value="全省">全省</option></select>'+
        '</div>'+
        '<p class="operation clearfix '+levelBtn+'"><span class="pcIcon"></span><span class="megIcon"></span><span class="fetionIcon"></span><span class="delLevelIcon"></span></p></div>';
    return thirdLevelContent;

}
//    删除一级栏目
$(".knowledgeCon_cont_tit  .delLevelIcon").live("click",function(){
    $(this).parents("div.knowledgeCon_cont").remove();
});
//    删除二级栏目
$(".knowledgeCon_cont_main .seondBtn .delLevelIcon").live("click",function(){
    $(this).parents("div.knowledgeCon_cont_main").remove();

});
//  删除三级栏目
$(".knowledgeCon_cont_main .thirdBtn .delLevelIcon").live("click",function(){
    $(this).parents(".thirdLevelWrap").html("");
});
//  删除四级栏目
$(".knowledgeCon_cont_main .fourBtn .delLevelIcon").live("click",function(){
    $(this).parents(".fourLevelWrap").html("");
});
//一级栏目切换
$(".dropdown li").live("click",function(){
    twoLevelCon="";
    var one = $(this).html();
    for(var i in LevelData[one]){
        twoLevelCon+='<option value="'+i+'">'+i+'</option>';
    }
    $(this).parents(".knowledgeCon_cont_tit").siblings(".knowledgeCon_cont_main ").find(".twoLevelChose").html('<option value="请选择二级目录">请选择二级目录</option>'+twoLevelCon);
    $(this).parents(".knowledgeCon_cont").find(".thirdLevelWrap").html("");
});
//二级栏目切换
$(".twoLevelChose").live("change",function(){
    var thirdLevelCon="";
    firstLevelName=$(this).parents(".knowledgeCon_cont_main ").siblings(".knowledgeCon_cont_tit").find(".choose_type").html();
    seondLevelName=$(this).val();
    for(var i in LevelData[firstLevelName][seondLevelName]){
        thirdLevelCon+='<option value="'+i+'">'+i+'</option>';
    }
    $(this).parents(".knowledgeCon_cont_main ").find(".thirdLevelWrap").html("");
    if(thirdLevelCon!==""){
        var fourLevelContent='<div class="fourLevelWrap"></div>';
        $(this).parents(".knowledgeCon_cont_mainHead").siblings(".thirdLevelWrap").html(genThirdLevelContent("threeLevelChose",'<option value="请选择三级目录">请选择三级目录</option>'+thirdLevelCon,"thirdBtn")).append(fourLevelContent);
        knowledgeChoseCity($(this).parents(".knowledgeCon_cont_mainHead").siblings(".thirdLevelWrap ").find(".province"));
    }
});
//三级栏目切换
$(".threeLevelChose").live("change",function(){
    firstLevelName=$(this).parents(".knowledgeCon_cont_main ").siblings(".knowledgeCon_cont_tit").find(".choose_type").html();
    seondLevelName=$(this).parents(".thirdLevelWrap").prev(".knowledgeCon_cont_mainHead").find(".twoLevelChose").val();
    thirdLevelName=$(this).val();
    var fourlevelData=LevelData[firstLevelName][seondLevelName][thirdLevelName];
    var fourLevelCon="";
    for(var i in fourlevelData){
        fourLevelCon+='<option value="'+fourlevelData[i]+'">'+fourlevelData[i]+'</option>';
    }
    $(this).parents(".knowledgeCon_cont_main ").find(".fourLevelWrap").html("");
    if(fourLevelCon!==""){
        $(this).parents(".thirdLevelWrap").find(".fourLevelWrap").html(genThirdLevelContent("fourLevelChose",'<option value="请选择四级目录">请选择四级目录</option>'+fourLevelCon,"fourBtn"));
        knowledgeChoseCity($(this).parents(".knowledgeCon_cont_mainHead").siblings(".fourLevelWrap ").find(".province"));
    }
});
