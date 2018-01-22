// $.fn.editable.defaults.mode = 'inline';
$(function () {
    var $table = $('#table');
    // add 字段
    var $title = $('#title');
    var $content = $('#content');
    var $result = $('#result');
    var $priority = $('#priority');
    var $state = $('#state');
    var $owner = $('#owner');
    var $startDate = $('#startDate');
    var $planFinishDate = $('#planFinishDate');
    // eidt 字段
    var $etitle = $('#etitle');
    var $econtent = $('#econtent');
    var $eresult = $('#eresult');
    var $eowner = $('#eowner');
    var $estartDate = $('#estartDate');
    var $eplanFinishDate = $('#eplanFinishDate');
    var $erealFinishDate = $('#erealFinishDate');
    var $epriority = $('#epriority');
    var $ebz = $('#ebz');
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
                        $table.bootstrapTable('refresh');
                    }
                });
            }
        },
        'click [title=邮件]': function (e, value, row, index) {
            if (!row.owner) { // 当owner为空时，阻止modal弹出
                e.stopPropagation();
                alert('执行担当不存在，请先指定担当');
            }
            // $('#mailModal').modal('show');
        },
        'click [title=编辑]': function (e, value, row, index) {
            console.log('id:%d,title:%s,content:%s,startDate:%s', row.id, row.title, row.content, row.startDate);
            $('#listId').val(row.id);
            $ebz.val(row.bz);
            $etitle.val(row.title);
            $econtent.val(row.content);
            $eresult.val(row.result);
            $epriority.val(row.priority);
            $estartDate.val(row.startDate);
            $eplanFinishDate.val(row.planFinishDate);
            $erealFinishDate.val(row.realFinishDate);
            $eowner.val(row.owner);
        }
    };
    $table.bootstrapTable({
        url: '/todo/bootstrapTable',
        height: window.innerHeight - 60,
        responseHandler: function (res) {
            for (var i = 0; i < res.length; i++) {
                res[i].rid = i + 1;
            }
            return res;
        },
        queryParams: function (params) {
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
        detailFormatter: function () {
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
            // editable: {
            //     type: 'textarea',
            //     url: '/todo/update'
            // }
        }, {
            field: 'content',
            title: '内容',
            align: 'center',
            valign: 'middle',
            visible: false,
            // editable: {
            //     type: 'textarea',
            //     url: '/todo/update'
            // }
        }, {
            field: 'result',
            title: '方向',
            align: 'center',
            valign: 'middle',
            visible: false,
            // editable: {
            //     type: 'textarea',
            //     url: '/todo/update'
            // }
        }, {
            field: 'priority',
            title: '级别',
            align: 'center',
            valign: 'middle',
            sortable: true,
            width: '3%',
            formatter: function (value, row, index) {
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
            align: 'center',
            valign: 'middle',
            editable: {
                type: 'text',
                url: '/todo/update'
            }
        }, {
            field: 'state',
            title: '状态',
            align: 'center',
            valign: 'middle',
            width: '3%',
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
            // editable: {
            //     type: 'text',
            //     url: '/todo/update'
            // }
        }, {
            field: 'planFinishDate',
            title: '计划完成时间',
            class: 'selfDate',
            align: 'center',
            valign: 'middle',
            // editable: {
            //     type: 'text',
            //     url: '/todo/update'
            // }
        }, {
            field: 'realFinishDate',
            title: '实际完成时间',
            class: 'selfDate',
            align: 'center',
            valign: 'middle',
            editable: {
                type: 'text',
                url: '/todo/update',
                success: function (r) {
                    $table.bootstrapTable('refresh');
                }
            }
        }, {
            field: 'bz',
            title: '备注',
            visible: false,
            align: 'center',
            valign: 'middle',
            // editable: {
            //     type: 'textarea',
            //     url: '/todo/update'
            // }
        }, {
            field: 'operator',
            title: '操作',
            events: operator,
            align: 'center',
            valign: 'middle',
            width: '12%',
            formatter: function (value, row, index) {
                var ownerMail = 'lupeng_ot@boe.com.cn';
                return '<div class="btn-group" role="btn-group">' +
                    '<button class="op btn btn-default btn-sm" title="删除">' +
                    '<i class="glyphicon glyphicon-trash"></i></button>' +
                    '<a class="op btn btn-default btn-sm" title="邮件" href=mailto:' +
                    ownerMail + '?cc=' + ownerMail + '&subject=【代办】' + row.title.split(' ').join('%20') + '&body=' + row.content.split(' ').join('%20') + '>' +
                    '<i class="glyphicon glyphicon-send"></i></a>' +
                    '<button class="op btn btn-default btn-sm" title="编辑" ' +
                    'data-target="#editModal" data-toggle="modal">' +
                    '<i class="glyphicon glyphicon-pencil"></i></button>' +
                    '</div>';
            }
        }]
    });
    // --------------------- modal -------------------
    // 点击add按钮，显示addModal
    $('#add').click(function () {
        $('#errMessage').html('');
    });
    // 点击add confirm，提交表单
    $('#addConfirm').click(function () {
        var titleValue = $title.val().trim();
        var contentValue = $content.val().trim() || '';
        var resultValue = $result.val().trim() || '';
        var priorityValue = $priority.val().trim();
        var startDateValue = $startDate.val().trim();
        var planFinishDateValue = $planFinishDate.val().trim();
        var ownerValue = $owner.val().trim() || '';
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
                    owner: ownerValue
                },
                success: function (r) {
                    $('#addModal').modal('hide');
                    $title.val('');
                    $content.val('');
                    $result.val('');
                    $priority.val('');
                    $startDate.val('');
                    $planFinishDate.val('');
                    $table.bootstrapTable('refresh');
                }
            });
        } else {
            $('#errMessage').html('请填写完整');
        }
    });
    // 点击更新按钮
    $('#editConfirm').click(function () {
        var etitleValue = $etitle.val().trim();
        var econtentValue = $econtent.val().trim() || '';
        var eresultValue = $eresult.val().trim() || '';
        var epriorityValue = $epriority.val().trim();
        var estartDateValue = $estartDate.val().trim();
        var eplanFinishDateValue = $eplanFinishDate.val().trim();
        var eownerValue = $eowner.val().trim() || '';
        var erealFinishDateValue = $erealFinishDate.val().trim();
        var ebzValue = $ebz.val().trim() || '-';
        var id = $('#listId').val();
        $.ajax({
            url: '/todo/updateAll',
            method: 'POST',
            data: {
                id: id,
                title: etitleValue,
                content: econtentValue,
                result: eresultValue,
                priority: epriorityValue,
                startDate: estartDateValue,
                planFinishDate: eplanFinishDateValue,
                realFinishDate: erealFinishDateValue,
                bz: ebzValue,
                owner: eownerValue
            },
            success: function (r) {
                $('#editModal').modal('hide');
                $table.bootstrapTable('refresh');
            }
        });
    });
    // --------------------- datepicker -------------------
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
    }).on('show', function (e) {
        e.preventDefault();
        e.stopPropagation(); // 禁止触发父元素事件
    }).on('hide', function (e) {
        e.stopPropagation(); // 禁止触发父元素事件
    });
    // 日期选择
    $table.on('editable-shown.bs.table', function (editable, field, row, $el) {
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