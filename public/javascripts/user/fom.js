// $.fn.editable.defaults.mode = 'inline';
$(function () {
    var $table = $('#table');
    window.operator = {
        'click [title=离职]': function (e, value, row, index) {
            $('#dimission').modal('show');
            $('#dimission form input.sid').val(row.sid);
        },
        'click [title=调转]': function (e, value, row, index) {
            $('#change').modal('show');
            $('#change form input.sid').val(row.sid);
            $('select[name=centre]').val('');
            $('select[name=dept] option:gt(0)').remove();
            $('select[name=office] option:gt(0)').remove();
        }
    };
    $table.bootstrapTable({
        url: '/user/fom/bootstrapTable',
        height: window.innerHeight - 130,
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
        striped: true,
        pageNumber: 1,
        pageSize: 20,
        pageList: '[30, 50, ALL]',
        pagination: true,
        paginationLoopz: true,
        search: true,
        idField: 'sid',
        showColumns: true,
        showExport: true,
        showRefresh: true,
        toolbar: '#toolbar',
        cache: false,
        detailView: true,
        detailFormatter: function (value, row , index) {
            return '<p><b>' + row.postType + '</b></p>' +
            '<p>' + row.postDescribe.replace(new RegExp('\n','gm'),'<br/>') + '</p>'; // 将从excel导入的数据换行
        },
        columns: [{
            field: 'rid',
            title: '#',
            align: 'center',
            valign: 'middle',
            width: '5',
            // visible: false
        }, {
            field: 'dept',
            title: '部门',
            align: 'center',
            valign: 'middle',
            visible: false
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
            formatter: function(value, row, index){
                if(value){
                    return '<a href="/user/fom/show?userid=' + row.userid + '">' + value + '</a>';
                }else{
                    return value;
                }
            }
        },{
            field: 'gender',
            title: '性别',
            align: 'center',
            valign: 'middle'
        },{
            field: 'grade',
            title: '职级',
            align: 'center',
            valign: 'middle',
            // editable: {
            //     type: 'select',
            //     title: '职级',
            //     source: [
            //         {value: '专家', text: '专家'},
            //         {value: '资深', text: '资深'},
            //         {value: '高级', text: '高级'},
            //         {value: '中级', text: '中级'},
            //         {value: '初级', text: '初级'},
            //         {value: '助理', text: '助理'},
            //     ],
            //     url: '/user/fom/update/grade'
            // }
        },{
            field: 'duty',
            title: '职务',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'mainPost',
            title: '主岗',
            align: 'center',
            valign: 'middle',
            // editable: {    // 问题：当加载列数据的时候，每一行都会触发一次该请求，N行就触发N次
            //     type: 'select',
            //     source: function () {
            //             var result = [];
            //             $.ajax({
            //                 url: '/user/fom/get/postList',
            //                 async: false,
            //                 type: "get",
            //                 data: {},
            //                 success: function (data, status) {
            //                     $.each(data, function (key, value) {
            //                         result.push({ value: value.post, text: value.post });
            //                     });
            //                 }
            //             });
            //             return result;
            //         }
            //     // url: '/todo/update'
            // }
        },{
            field: 'subPost',
            title: '次岗',
            align: 'center',
            valign: 'middle',
            // editable: {
            //     type: 'text',
            //     // url: '/todo/update'
            // }
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
            visible: false,
            // editable: {
            //     type: 'textarea',
            //     url: '/todo/update'
            // }
        },{
            field: 'state',
            title: '状态',
            align: 'center',
            valign: 'middle'
        },{  
            field: 'sbz',
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
            width: '100',
            formatter: function (value, row, index) {
                return '<div class="btn-group" role="btn-group">' +
                    '<button class="op btn btn-default btn-sm" title="离职">' +
                    '<i class="glyphicon glyphicon-remove"></i></button>' +
                    '<button class="op btn btn-default btn-sm" title="调转" ' +
                    'data-target="#editModal" data-toggle="modal">' +
                    '<i class="glyphicon glyphicon-repeat"></i></button>' +
                    // '<button class="op btn btn-default btn-sm" title="更改">' +
                    // '<i class="glyphicon glyphicon-pencil"></i></button>' +
                    '</div>';
            }
        }]
    });
    // 获取当前人数
    $table.on('load-success.bs.table', function(){
        var staffNum = $table.bootstrapTable('getData').length;
        $('#staffNum').html(staffNum);
    });
});