
$(document).ready(function () {

    // get list of records via ajax:  NBrightRazorTemplate_nbxget({command}, {div of data passed to server}, {return html to this div} )
    nbxget('os_plugintemplate_getdata', '#selectparams', '#editdata');

    $('.actionbuttonwrapper #cmdsave').unbind('click');
    $('.actionbuttonwrapper #cmdsave').click(function () {
        nbxget('os_plugintemplate_savedata', '#editdata');
    });

    $('.actionbuttonwrapper #cmdreturn').unbind('click');
    $('.actionbuttonwrapper #cmdreturn').click(function () {
        $('#selecteditemid').val(''); // clear sleecteditemid.        
        nbxget('os_plugintemplate_getdata', '#selectparams', '#editdata');
    });

    $('.actionbuttonwrapper #cmddelete').unbind('click');
    $('.actionbuttonwrapper #cmddelete').click(function () {
        if (confirm($('#deletemsg').val())) {
            nbxget('os_plugintemplate_deleterecord', '#editdata');
        }
    });

    $('#addnew').unbind('click');
    $('#addnew').click(function () {
        $('.processing').show();
        $('#newitem').val('new');
        $('#selecteditemid').val('');
        nbxget('os_plugintemplate_addnew', '#selectparams', '#editdata');
    });

    $('.selecteditlanguage').unbind('click');
    $('.selecteditlanguage').click(function () {
        $('#nextlang').val($(this).attr('lang')); // alter lang after, so we get correct data record
        nbxget('os_plugintemplate_selectlang', '#editdata'); // do ajax call to save current edit form
    });


});

$(document).on("nbxgetcompleted", nbxgetCompleted); // assign a completed event for the ajax calls


function nbxgetCompleted(e) {

    if (e.cmd == 'os_plugintemplate_addnew') {
        $('#newitem').val(''); // clear item so if new was just created we don;t create another record
        $('#selecteditemid').val($('#itemid').val()); // move the itemid into the selecteditemid, so page knows what itemid is being edited
        OS_PluginTemplate_DetailButtons();
        $('.processing').hide(); 
    }

    if (e.cmd == 'os_plugintemplate_deleterecord') {
        $('#selecteditemid').val(''); // clear selecteditemid, it now doesn;t exists.
        nbxget('os_plugintemplate_getdata', '#selectparams', '#editdata');// relist after delete
    }

    if (e.cmd == 'os_plugintemplate_savedata') {
        $('#selecteditemid').val(''); // clear sleecteditemid.        
        nbxget('os_plugintemplate_getdata', '#selectparams', '#editdata');// relist after save
    }

    if (e.cmd == 'os_plugintemplate_selectlang') {
        $('#editlang').val($('#nextlang').val()); // alter lang after, so we get correct data record
        nbxget('os_plugintemplate_getdata', '#selectparams', '#editdata'); // do ajax call to get edit form
    }

    if (e.cmd == 'os_plugintemplate_getdata') {
        $('.processing').hide();
    }

    // check if we are displaying a list or the detail and do processing.
    if (($('#selecteditemid').val() != '') || (e.cmd == 'os_plugintemplate_addnew')) {
        // PROCESS DETAIL
        OS_PluginTemplate_DetailButtons();

        $('.processing').hide(); 

    } else {
        //PROCESS LIST
        OS_PluginTemplate_ListButtons();
        $('.edititem').unbind('click');
        $('.edititem').click(function () {
            $('.processing').show();
            $('#selecteditemid').val($(this).attr("itemid")); // assign the sleected itemid, so the server knows what item is being edited
            nbxget('os_plugintemplate_getdata', '#selectparams', '#editdata'); // do ajax call to get edit form
        });
        $('.processing').hide(); 
    }



}

function OS_PluginTemplate_DetailButtons() {
    $('#cmdsave').show();
    $('#cmddelete').show();
    $('#cmdreturn').show();
    $('#addnew').hide();
    $('input[datatype="date"]').datepicker(); // assign datepicker to any ajax loaded fields
}

function OS_PluginTemplate_ListButtons() {
    $('#cmdsave').hide();
    $('#cmddelete').hide();
    $('#cmdreturn').hide();
    $('#addnew').show();
}


