$.fn.editable.defaults.mode = 'inline';
$(function() {
    var $table = $('#table');
    window.operator = {
        'click [title=删除]': function (e, value, row, index) {
            if (confirm('确定是否删除？')) {
                $.ajax({
                    url: '/todo/delete',
                    data: {
                        id: row.id
                    },
                    method: 'POST',
                    success: function (result) {
                        // alert(result);
                        $table.bootstrapTable('refresh');
                    }
                });
            }
        },
        'click [title=邮件]': function (e, value, row, index) {
            $('#mailModal').modal('show');
        }
    };
    $table.bootstrapTable({
        url: '/todo/bootstrapTable',
        height: window.innerHeight - 100,
        responseHandler: function(res) {
            for (var i = 0; i < res.length; i++) {
                res[i].rid = i + 1;
            }
            return res;
        },
        queryParams: function(params){
            return {
                uid: 1
            };
        },
        pageNumber: 1,
        pageSize: 10,
        pageList: '[10, 20, 50, ALL]',
        pagination: true,
        paginationLoopz: true,
        search: true,
        idField: 'id',
        showColumns: true,
        showExport: true,
        showRefresh: true,
        toolbar: '#toolbar',
        cache: false,
        detailView: true,
        detailFormatter: function() {
            return 'somethings';
        },
        columns: [{
            field: 'rid',
            title: '#',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'title',
            title: '标题',
            // align: 'center',
            valign: 'middle',
            editable: {
                type: 'textarea',
                url: '/todo/update'
            }
        }, {
            field: 'content',
            title: '内容',
            align: 'center',
            valign: 'middle',
            visible: false,
            editable: {
                type: 'textarea',
                url: '/todo/update'
            }
        }, {
            field: 'result',
            title: '方向',
            align: 'center',
            valign: 'middle',
            visible: false,
            editable: {
                type: 'textarea',
                url: '/todo/update'
            }
        }, {
            field: 'priority',
            title: '优先级',
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: function(value, row, index) {
                var msg = '';
                switch (value) {
                    case '重要紧急':
                        msg = '<lable class="label label-danger" title="' + value + '">1</lable>';
                        break;
                    case '重要不紧急':
                        msg = '<lable class="label label-primary" title="' + value + '">2</lable>';
                        break;
                    case '不重要紧急':
                        msg = '<lable class="label label-warning" title="' + value + '">3</lable>';
                        break;
                    case '不重要不紧急':
                        msg = '<lable class="label label-success" title="' + value + '">4</lable>';
                        break;
                }
                return msg;
            }
        }, {
            field: 'officer',
            title: '负责人',
            visible: false,
            align: 'center',
            valign: 'middle'
        }, {
            field: 'owner',
            title: '执行者',
            visible: true,
            editable: true,
            align: 'center',
            valign: 'middle'
        }, {
            field: 'state',
            title: '状态',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                    if (value == 1) {
                        // return row.id;
                    }
                }
                // editable: {
                //     type: 'select',
                //     source: function(){
                //         return ['备案中','on going','close'];
                //     },
                //     url: '/todo/update',
                //     success: function (response, newValue) {
                //         //            alert(response);
                //     }
                // }
        }, {
            field: 'startDate',
            title: '开始时间',
            class: 'selfDate',
            align: 'center',
            valign: 'middle',
            editable: {
                type: 'text',
                url: '/todo/update'
            }
        }, {
            field: 'planFinishDate',
            title: '计划完成时间',
            class: 'selfDate',
            align: 'center',
            valign: 'middle',
            editable: {
                type: 'text',
                url: '/todo/update'
            }
        }, {
            field: 'realFinishDate',
            title: '实际完成时间',
            class: 'selfDate',
            align: 'center',
            valign: 'middle',
            editable: {
                type: 'text',
                url: '/todo/update'
            }
        }, {
            field: 'bz',
            title: '备注',
            visible: false,
            align: 'center',
            valign: 'middle',
            editable: {
                type: 'textarea',
                url: '/todo/update'
            }
        }, {
            field: 'operator',
            title: '操作',
            events: operator,
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                return '<div class="btn-group" role="btn-group">' +
                    '<button class="op btn btn-default btn-sm" title="删除">' +
                    '<i class="glyphicon glyphicon-trash"></i></button>' +
                    '<button class="op btn btn-default btn-sm" title="邮件">' +
                    '<i class="glyphicon glyphicon-send"></i></button>' +
                    '</div>';
            }
        }]
    });
    
    // 点击add按钮，显示addModal
    $('#add').click(function () {
        $('#addModal').modal('show');
        $('#errMessage').html('');
        // getSelectList('priority');
        // getSelectList('state');
    });
    // 点击add confirm，提交表单
    var $title = $('#title');
    var $content = $('#content');
    var $result = $('#result');
    var $priority = $('#priority');
    // var $state = $('#state');
    // var $owner = $('#owner');
    var $startDate = $('#startDate');
    var $planFinishDate = $('#planFinishDate');
    // var $realFinishDate = $('#realFinishDate');
    $('#addConfirm').click(function() {
        var titleValue = $title.val().trim();
        var contentValue = $content.val().trim() || '-';
        var resultValue = $result.val().trim() || '-';
        var priorityValue = $priority.val().trim();
        var startDateValue = $startDate.val().trim();
        var planFinishDateValue = $planFinishDate.val().trim();
        if (titleValue && priorityValue && startDateValue) {
            $.ajax({
                url: '/todo/add',
                method: 'POST',
                data: {
                    title: titleValue,
                    content: contentValue,
                    result: resultValue,
                    priority: priorityValue,
                    startDate: startDateValue,
                    planFinishDate: planFinishDateValue,
                },
                success: function(r) {
                    $('#addModal').modal('hide');
                    $title.val('');
                    $content.val('');
                    $result.val('');
                    $priority.val('');
                    $startDate.val('');
                    $planFinishDate.val('');
                    $table.bootstrapTable('refresh');
                    // $table.bootstrapTable('resetSearch', titleValue);
                }
            });
        } else {
            $('#errMessage').html('请填写完整');
        }
    });
    // 日期选择框
    $('input.date').datepicker({
        format: "yyyy-mm-dd",
        weekStart: 7,
        maxViewMode: 1,
        language: "zh-CN",
        // daysOfWeekDisabled: "0,6",
        // daysOfWeekHighlighted: "0,6",
        autoclose: true,
        todayHighlight: true,
        // startDate: new Date()
    });
    // 日期选择
    $table.on('editable-shown.bs.table', function(editable, field, row, $el) {
        $('.selfDate .editable-input input').datepicker({
            format: "yyyy-mm-dd",
            weekStart: 7,
            maxViewMode: 1,
            language: "zh-CN",
            // daysOfWeekDisabled: "0,6",
            // daysOfWeekHighlighted: "0,6",
            autoclose: true,
            todayHighlight: true,
            // startDate: new Date()
        });
    });
});