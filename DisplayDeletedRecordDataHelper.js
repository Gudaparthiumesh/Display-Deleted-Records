({
    getAllRecord: function(cmp,evt){
        var action = cmp.get("c.getResults");
        action.setCallback(this, function(response) {
            var state = response.getState();
            var result = response.getReturnValue();
            var delRecArr= [];
            var actualResArr= [];
            if (state === "SUCCESS") 
            {
                var today = new Date();
                for(var n in result){
                    if(result[n].IsDeleted == true){
                        delRecArr.push(result[n]);
                    }
                    else{
                        actualResArr.push(result[n]);
                    }
                }
                cmp.set("v.displayAfterInit",true); 
                cmp.set("v.spinner",false);
                cmp.set("v.deletedRecordsResults",delRecArr); 
                cmp.set("v.actualResults",actualResArr); 
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "Error in retrieving results",
                    "type" :"error",
                    "duration":"2000"
                });
                toastEvent.fire();
                cmp.set("v.spinner",false);
            }
        });
        $A.enqueueAction(action);  
    },
    confirmDeleteRecord : function(cmp,evt) {
        var action = cmp.get("c.deleteAccRecord");
        action.setParams({"recId":cmp.get('v.deleteRecordId')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state=='SUCCESS'){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Record deleted successfully",
                    "type":"success"
                });
                toastEvent.fire();
                this.getAllRecord(cmp,evt);
            }
            else{
                var errors = response.getError();
                var message = 'Unknown error';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": message,
                    "type" :"error",
                    "duration":"2000"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
})