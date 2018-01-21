// $.fn.editable.defaults.mode = 'inline';
$(function () {
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
        // 'click [title=邮件]': function (e, value, row, index) {
        //     if (!row.owner) { // 当owner为空时，阻止modal弹出
        //         e.stopPropagation();
        //         alert('执行担当不存在，请先指定担当');
        //     }
        //     // $('#mailModal').modal('show');
        // },
        // 'click [title=编辑]': function (e, value, row, index) {
        //     console.log('id=%d,title=%s,startDate=%s', row.id, row.title, row.startDate);
        //     // $('#addModal').modal('show');

        // }
    };
    $table.bootstrapTable({
        url: '/todo/bootstrapTable',
        height: window.innerHeight - 100,
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
            width: '12%',
            formatter: function (value, row, index) {
                var ownerMail = 'lupeng_ot@boe.com.cn';
                return '<div class="btn-group" role="btn-group">' +
                    '<button class="op btn btn-default btn-sm" title="删除">' +
                    '<i class="glyphicon glyphicon-trash"></i></button>' +
                    '<a class="op btn btn-default btn-sm" title="邮件" href=mailto:' +
                    ownerMail + '?cc=' + ownerMail + '&subject=【代办】' + row.title.split(' ').join('%20') + '&body=' +
                    row.content.split(' ').join('%20') + '>' +
                    '<i class="glyphicon glyphicon-send"></i></a>' +
                    '<button class="op btn btn-default btn-sm" title="编辑" data-whatever="editModal" ' +
                    'data-target="#addModal" data-toggle="modal" ' +
                    'data-id=' + row.id + ' data-title="' + row.title + '" ' +
                    'data-content="' + row.content + '" data-state="' + row.state + '" ' +
                    'data-result="' + row.result + '" data-priority="' + row.priority + '" ' +
                    'data-owner="' + row.owner + '" data-startDate="' + row.startDate + '" ' +
                    'data-planFinishDate="' + row.planFinishDate + '" data-realFinishDate="' + row.realFinishDate + '">' +
                    '<i class="glyphicon glyphicon-pencil"></i></button>' +
                    '</div>';
            }
        }]
    });
    // --------------------- modal -------------------
    var $title = $('#title');
    var $content = $('#content');
    var $result = $('#result');
    var $priority = $('#priority');
    var $state = $('#state');
    var $owner = $('#owner');
    var $startDate1 = $('#startDate1');
    var $planFinishDate1 = $('#planFinishDate1');
    var $startDate2 = $('#startDate2');
    var $planFinishDate2 = $('#planFinishDate2');
    var $realFinishDate = $('#realFinishDate');
    var $bz = $('#bz');
    // addModal 个性化显示，当点击add时，显示少；当点击edit时，显示多
    $('#addModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        var modal = $(this);
        // console.log('when show.bs.modal: %s', recipient);
        if (recipient && recipient == 'addModal') {
            modal.find('.edit-modal').hide();
            modal.find('.add-modal').show();
            modal.find('.modal-title').html('添加任务清单');
            modal.find('.modal-footer').attr('data-what', 'add');
            modal.find('.modal-footer button[data-dismiss=modal]').attr('isedit', 0);
        } else {
            modal.find('.add-modal').hide();
            modal.find('.edit-modal').show();
            modal.find('.modal-title').html('更新任务清单');
            modal.find('.modal-footer').attr('data-what', 'edit');
            modal.find('.modal-footer button[data-dismiss=modal]').attr('isedit', '1');
            $title.val(button.data('title'));
            $content.val(button.data('content'));
            $result.val(button.data('result'));
            $priority.val(button.data('priority'));
            $owner.val(button.data('owner'));
            $startDate2.val(button.data('startdate'));
            $planFinishDate2.val(button.data('planfinishdate'));
            $realFinishDate.val(button.data('realfinishdate'));
        }
        // modal.find('.modal-title').text('New message to ' + recipient)
        // modal.find('.modal-body input').val(recipient)
    });
    $('#addModal').on('hide.bs.modal', function (e) {
        var isEdit = $(this).find('.modal-footer button[data-dismiss=modal]').attr('isedit');
        if (isEdit == '1') {
            $title.val('');
            $content.val('');
            $result.val('');
            $owner.val('');
            $startDate2.val('');
            $planFinishDate2.val('');
        }
    });
    // 点击add按钮，显示addModal
    $('#add').click(function () {
        $('#errMessage').html('');
        // getSelectList('priority');
        // getSelectList('state');
    });
    // 点击add confirm，提交表单
    $('#addConfirm').click(function () {
        var titleValue = $title.val().trim();
        var contentValue = $content.val().trim() || '';
        var resultValue = $result.val().trim() || '';
        var priorityValue = $priority.val().trim();
        var startDateValue = $startDate1.val().trim();
        var planFinishDateValue = $planFinishDate1.val().trim();
        var startDateValue2 = $startDate2.val().trim();
        var planFinishDateValue2 = $planFinishDate2.val().trim();
        var ownerValue = $owner.val().trim() || '';
        var bzValue = $bz.val().trim() || '';
        var $this = $('.modal-footer'); // 通过一个what属性来判断是添加modal还是更新modal
        if ($this.data('what') == 'add') {
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
                    success: function (r) {
                        $('#addModal').modal('hide');
                        $title.val('');
                        $content.val('');
                        $result.val('');
                        $priority.val('');
                        $startDate1.val('');
                        $planFinishDate1.val('');
                        $table.bootstrapTable('refresh');
                    }
                });
            } else {
                $('#errMessage').html('请填写完整');
            }
        } else if($this.data('what') == 'edit') {
            console.log('edit commit');
            // $.ajax({
            //     url: '/todo/updateAll',
            //     method: 'POST',
            //     data: {
            //         title: titleValue,
            //         content: contentValue,
            //         result: resultValue,
            //         priority: priorityValue,
            //         startDate: startDateValue2,
            //         planFinishDate: planFinishDateValue2,
            //         realFinishDate: realFinishDate,
            //         bz: bzValue,
            //         owner: ownerValue
            //     },
            //     success: function (r) {
            //         $title.val('');
            //         $content.val('');
            //         $result.val('');
            //         $owner.val('');
            //         $startDate2.val('');
            //         $planFinishDate2.val('');
            //         $table.bootstrapTable('refresh');
            //     }
            // });
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