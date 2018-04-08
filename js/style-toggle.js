$(function() {
  $("#switch-checkbox").click(function() {
    if ($("#switch-checkbox").is(":checked")) {
      $("#switch-checkbox").attr("checked", false);
      localStorage.setItem("style", 0);
      $("link[href='css/alternative-bg.css']").attr("href", "css/original-bg.css");
    } else {
      $("#switch-checkbox").attr("checked", true);
      localStorage.setItem("style", 1);
      $("link[href='css/original-bg.css']").attr("href", "css/alternative-bg.css");
    }
  });
});
