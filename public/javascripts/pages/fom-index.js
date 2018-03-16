// $.fn.editable.defaults.mode = 'inline';
$(function () {
    var $table = $('#table');
    var deptId = $('#dataSpan').data('deptid');
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
        url: '/fom/bootstrapTable/centre',
        height: window.innerHeight - 250,
        // height: 300,
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
        pageSize: 15,
        pageList: '[7, 15, 30, 50, ALL]',
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
        detailFormatter: function (value, row , index) {
             return '<p><b>' + row.postType + '</b></p>' +
            '<p>' + row.postDescribe.replace(new RegExp('\n','gm'),'<br/>') + '</p>';
        },
        columns: [{
            field: 'rid',
            title: '#',
            align: 'center',
            valign: 'middle',
            // visible: false
        }, {
            field: 'dept',
            title: '部门',
            align: 'center',
            valign: 'middle',
            // visible: false
        }, {
            field: 'office',
            title: '科室',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'name',
            title: '姓名',
            align: 'center',
            valign: 'middle',
        },{
            field: 'userid',
            title: '员工号',
            align: 'center',
            valign: 'middle',
        },{
            field: 'gender',
            title: '性别',
            align: 'center',
            valign: 'middle'
        },{
            field: 'grade',
            title: '职级',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'mainPost',
            title: '主岗',
            align: 'center',
            valign: 'middle'
        },{
            field: 'subPost',
            title: '次岗',
            align: 'center',
            valign: 'middle'
        },{
            field: 'postType',
            title: '岗位类别',
            align: 'center',
            valign: 'middle',
            visible: false
        },{
            field: 'postDescribe',
            title: '岗位描述',
            align: 'center',
            valign: 'middle',
            visible: false
        },{
            field: 'state',
            title: '状态',
            align: 'center',
            valign: 'middle'
        },{  
            field: 'bz',
            title: '备注',
            visible: false,
            align: 'center',
            valign: 'middle',
            // editable: {
            //     type: 'textarea',
            //     url: '/todo/update'
            // }
        },{
            field: 'operator',
            title: '操作',
            events: operator,
            align: 'center',
            valign: 'middle',
            width: '12%',
            visible: false,
            formatter: function (value, row, index) {
                return '<div class="btn-group" role="btn-group">' +
                    '<button class="op btn btn-default btn-sm" title="离职">' +
                    '<i class="glyphicon glyphicon-window"></i></button>' +
                    '<button class="op btn btn-default btn-sm" title="内部调转" ' +
                    'data-target="#editModal" data-toggle="modal">' +
                    '<i class="glyphicon glyphicon-refresh"></i></button>' +
                    '</div>';
            }
        }]
    });
    // 获取当前人数
    $table.on('load-success.bs.table', function(){
        var staffNum = $table.bootstrapTable('getData').length;
        $('#staffNum').html(staffNum);
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