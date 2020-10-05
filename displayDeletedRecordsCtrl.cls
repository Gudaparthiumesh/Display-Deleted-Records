public class displayDeletedRecordsCtrl {
    @Auraenabled
    public static List <Account> getResults(){
        List <Account> returnList = [select id, Name, Industry, Phone, Email_Address__c,Active__c,IsDeleted,LastModifiedDate from Account order by CreatedDate desc LIMIT 1000 ALL ROWS];
        return returnList;
    }
    @Auraenabled
    public static List <Account> deleteAccRecord(Id recId){
        try{
            Delete [Select Id from Account where Id =: recId];
            return getResults();
        }catch( exception e){
            UtilityCtrl.logException('displayDeletedRecordsCtrl.deleteAccRecord',userInfo.getName(),e.getTypeName(), e.getMessage(), e.getStackTraceString());
            throw new AuraHandledException('Error: '+ e.getMessage());
        }
    }
}