/**
 * @author: hujiulin
 * Onclick plain div -> show content in UEditor
 * On mouse out UEditor -> show plain div
 */

var editor_id_array = new Array();
/*
* @planDiv: plan div show html
* @editorDiv: html content in editor
* @editor: UEditor instance
* */
function slideDivToEditor(event) {
    var innerHtml = event.data.planDiv.html();
    slideEditorToDiv();
    event.data.planDiv.css("display", "none");
    event.data.editor.setContent(innerHtml);
    event.data.editorDiv.css("display","block");
    return false;
}
/*
 * @planDiv: plan div show html
 * @editorDiv: html content in editor
 * @editor: UEditor instance
 * */
function slideEditorToDiv() {
    for(var i in editor_id_array) {
        $("#editor-"+ editor_id_array[i]).css("display", "none");
        var innerHtml = UE.getEditor("editor-"+editor_id_array[i]).getContent();
        $("#editor-plain-"+ editor_id_array[i]).html(innerHtml);
        $("#editor-plain-"+ editor_id_array[i]).css("display", "block");
    }
}

/*
* stop propagation
* */
function blockDom() {
    return false;
}

function existInIds(id) {
    for (var i = 0; i < editor_id_array.length; i++) {
        if (id == editor_id_array[i]) {
            return true;
        }
    }
    return false;
}

$(".editor-plain").live("click",function() {
    if (false == isEdit) {
        alert("请先点击更新按钮并输入修改理由.")
        return false;
    }
    var id = $(this).attr("id").split("-")[2];
    var ue = UE.getEditor("editor-"+id);
    ue.ready(function() {
    slideEditorToDiv();
    if (!existInIds(id)) {
        editor_id_array.push(id);
    }
    var innerHtml = $("#editor-plain-"+id).html();
    $("#editor-plain-"+id).css("display", "none");
    ue.setContent(innerHtml);
    $("#editor-"+id).css("display","block");
    });
    blockDom();
});

$(document).ready(function() {
    // Blank part in HMTL to close editor
    $("#kba_page").live("click", slideEditorToDiv);
    $('[class^="edui"]').live("click", blockDom);
    $('[class^="editor"]').live("click", blockDom);
});
