({
    doInit : function(cmp, evt, hlp) {
        cmp.set("v.spinner",true);
        hlp.getAllRecord(cmp,evt);
    },
    deleteRecord: function(cmp, evt, hlp) {
        cmp.set("v.isOpenDeleteRecordModal", true);
        cmp.set("v.deleteRecordId", evt.target.id);
    },
    confirmDelete:function(cmp, evt, hlp) {
        cmp.set("v.isOpenDeleteRecordModal", false);
        hlp.confirmDeleteRecord(cmp,evt);
    },
    cancelDelete:function(cmp, evt, hlp) {
        cmp.set("v.isOpenDeleteRecordModal", false);
    },
    editRecord : function(cmp, evt, hlp) {
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": evt.target.id
        });
        editRecordEvent.fire();
    },
    viewRecord : function (cmp, evt, hlp) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": evt.target.id,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
})