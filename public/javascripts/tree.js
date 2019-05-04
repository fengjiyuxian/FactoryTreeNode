
$(function(){
    var socket = io('//localhost:3000');
    socket.on('generate', function (r) {
        $('#' + r.factoryId).empty();
        let children = r.children;
        let childHtml = '';
        for(let child of children){
            childHtml += '<li><span>' + child['value'] + '</span></li>';
        }
        $("#" + r.factoryId).html(childHtml);
    });

    socket.on('remove', function (r) {
        $('#li-' + r.factoryId).remove();
    });

    socket.on('add', function (r) {
        let factory = r.factory;
        let html = '<li id= "li-' + factory['factoryId'] + '">' +
                ' <div style="display:inline-block; width:15%;"> <span tabindex="0" class="factory" data-toggle="popover"  popflag="0" onclick="startPopover(' + factory['factoryId'] + ')" id="pop-' + factory['factoryId'] + '"><b>' + factory['name'] + '</b> </span> </div> <div class="badge badge-secondary" >' + factory['min'] + '/' + factory['max'] + '</div>'
                + '<ul id = "' + factory['factoryId'] + '" factoryName="' + factory['name'] +'" min="' + factory['min'] +'" max="' + factory['max'] + '">'
                + '</ul>'
            + '</li>';
        $("#tree_table").html($("#tree_table").html() + html);
    });

    socket.on('edit', function (r) {
        let factory = r.factory;
        let childHtml = $('#' + factory['factoryId']).html();
        let html = '<div style="display:inline-block; width:15%;"> <span tabindex="0" class="factory" data-toggle="popover" popflag="0" onclick="startPopover(' + factory['factoryId'] + ')" id="pop-' + factory['factoryId'] + '"><b>' + factory['name'] + '</b> </span> </div> <div class="badge badge-secondary">' + factory['min'] + '/' + factory['max'] + '</div>'
        + '<ul id = "' + factory['factoryId'] + '" factoryName="' + factory['name'] +'" min="' + factory['min'] +'" max="' + factory['max'] + '">'
        + '</ul>';
        $('#li-' + factory['factoryId']).html(html);
        $('#' + factory['factoryId']).html(childHtml);
    });
   

    $.get("factory/", {}, function(r){
        let factories = r.factory;
        let html = '';
        for(let factory of factories){
            html += '<li id= "li-' + factory['factoryId'] + '">' +
                '<div style="display:inline-block; width:15%;"><span tabindex="0" class="factory" data-toggle="popover" popflag="0" onclick="startPopover(' + factory['factoryId'] + ')" id="pop-' + factory['factoryId'] + '"><b>' + factory['name'] + '</b> </span> </div> <div class="badge badge-secondary">' + factory['min'] + '/' + factory['max'] + '</div>'
                + '<ul id = "' + factory['factoryId'] + '" factoryName="' + factory['name'] +'" min="' + factory['min'] +'" max="' + factory['max'] + '">'
                + '</ul>'
            + '</li>';
        }
        $("#tree_table").html(html);
        for(let factory of factories){
            $.get("/factory/child/" + factory['factoryId'], {}, function(r){
                let children = r.children;
                let childHtml = '';
                for(let child of children){
                    childHtml += '<li><span>' + child['value'] + '</span></li>';
                }
                $("#"+factory['factoryId']).html(childHtml);
            })
        }
    }) 
    
})


function generate(factoryId){
    let count = $('#count_'+factoryId+'').val();
    if(count == ""){
        alert('Please fill items count!');
    }else{
        $('.popover').popover("hide");
        $.post("factory/generate",{ factoryId: factoryId, count: $('#count_'+factoryId+'').val()}, function(r){
            console.log(r);
        })
    }
    
}

function remove(factoryId){
    $('.popover').popover("hide");
    $.ajax({
        url: 'factory/' + factoryId,
        type: 'DELETE',
        success: function(r) {
            console.log(r);
        }
    });
}

function add(){
    $('.popover').popover("hide");
}


function edit(factoryId){
    $('.popover').popover("hide");
    $('#editName').val($('#' + factoryId).attr("factoryName"));
    $('#editName').attr("factoryId", factoryId);
    $('#editMin').val($('#' + factoryId).attr("min"));
    $('#editMax').val($('#' + factoryId).attr("max"));
}

function addSubmit(){
    $('.popover').popover("hide");
    $.post("factory/",{ name: $('#addName').val(), min: $('#addMin').val(), max: $('#addMax').val(), status: 1}, function(r){
        console.log(r);
    })
    
}

function editSubmit(){
    var factoryId = $('#editName').attr("factoryId");
    $.ajax({
        url: 'factory/',
        type: 'PUT',
        data: { 
            factoryId: factoryId,
            name: $('#editName').val(), 
            min: $('#editMin').val(), 
            max: $('#editMax').val()
        },
        success: function(r) {
            console.log(r);
        }
    });
    
}
//start a popover
function startPopover(factoryId){
    $('.popover').popover("hide");
    $("#pop-"+ factoryId).popover({
        html: true,
        trigger: 'manual',
        content:    '<div class="row">'+
                        '<div class="input-group input-group-sm mb-3 col-sm">'+
                            '<div class="input-group-prepend">'+
                                '<span class="input-group-text" id="inputGroup-sizing-sm">Items Count</span>'+
                            '</div>'+
                            '<input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="0~15" id="count_' + factoryId +'">'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-sm">'+
                            '<button type="button" class="btn btn-outline-success btn-sm" onclick="generate(' + factoryId + ')"> Generate </button>'+
                        '</div>'+
                        '<div class="col-sm">'+
                        '<button type="button" class="btn btn-outline-danger btn-sm" onclick="remove(' + factoryId + ')"> Remove </button>'+
                        '</div>'+
                        '<div class="col-sm">'+                              
                            '<button type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="edit(' + factoryId + ')"> Edit </button>'+
                        '</div>'+
                    '</div>'
    })
    if($("#pop-"+ factoryId).attr("popflag")=="0"){ 
        $('.factory').attr("popflag", "0");            
        $("#pop-"+ factoryId).attr("popflag", "1");
        $("#pop-"+ factoryId).popover('show');
    }else{
        $('.factory').attr("popflag", "0");
    }

}

// start all popover
// function startPopover(){
//     $('[data-toggle="popover"]').each(function(){
//         $(this).popover({
//             html: true,
//             trigger: 'manual',
//             content:    '<div class="row">'+
//                             '<div class="input-group input-group-sm mb-3 col-sm">'+
//                                 '<div class="input-group-prepend">'+
//                                     '<span class="input-group-text" id="inputGroup-sizing-sm">Items Count</span>'+
//                                 '</div>'+
//                                 '<input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="0~15" id="count_' + $(this).attr("value") +'">'+
//                             '</div>'+
//                         '</div>'+
//                         '<div class="row">'+
//                             '<div class="col-sm">'+
//                                 '<button type="button" class="btn btn-outline-success btn-sm" onclick="generate(' + $(this).attr("value") + ')"> Generate </button>'+
//                             '</div>'+
//                             '<div class="col-sm">'+
//                             '<button type="button" class="btn btn-outline-danger btn-sm" onclick="remove(' + $(this).attr("value") + ')"> Remove </button>'+
//                             '</div>'+
//                             '<div class="col-sm">'+                              
//                                 '<button type="button" class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="edit(' + $(this).attr("value") + ')"> Edit </button>'+
//                             '</div>'+
//                         '</div>'
//         })
//     })
//     .click(function(){
//         $('.popover').popover("hide");
//         if($(this).attr("popflag")==="0"){   
//             $('[data-toggle="popover"]').attr("popflag", "0");            
//             $(this).attr("popflag", "1");
//             $(this).popover('show');
//         }else{
//             $('[data-toggle="popover"]').attr("popflag", "0");
//         }

//     })
// }