/**
 * Created by 118663 on 2017/6/12.
 */

;
$(function () {
  $('#message div.alert').fadeOut(5000);
});

//  异步获取选择列表选项  /ajax/get/***
function getSelectList(table) {
  var $table = $('#' + table);
  $.get('/ajax/get/' + table, function (data, status) {
    if (status == 'success') {
      $('#' + table + ' option:gt(0)').remove();
      for (var i = 0; i < data.length; i++) {
        var $optionHTML = $('<option value="' + data[i].id + '">' + data[i].title + '</option>');
        $table.append($optionHTML);
      }
    }
  });
}