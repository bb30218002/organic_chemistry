$(function () {
    $.pjax({
        area: "#container",
        load: {
            head: true,
            script: true
        },
        link: "a.pjax"
    });
});

$(document).bind('pjax:fetch', () => {
    try {
        $("#btn_target").remove();
        $('#inlinescript').remove();
        $("#searchSC").remove();
    } catch {
        console.log("error");
    }
});

