    var email = "yourmail@yourisp.com";
    var row = "", count=0;

function monitorDaily() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheet = ss.getActiveSheet();

      
  var timezone = ss.getSpreadsheetTimeZone();
  
  var today     = new Date();
  var oneDayAgo = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);  
  var startTime = oneDayAgo.toISOString();
  
  var search = '(trashed = true or trashed = false) and (modifiedDate > "' + startTime + '")';
  var files  = DriveApp.searchFiles(search);
  

  
  while( files.hasNext() ) {
    
    var file = files.next();
    
    var fileName = file.getName();
    var fileURL  = file.getUrl();
    var editors = file.getEditors().map(function(e){return [e.getEmail(), e.getName()]}).join(",");
    var viewers = file.getViewers().map(function(e){return [e.getEmail(), e.getName()]}).join(",");
    var access = file.getSharingAccess();
    var lastUpdated =  Utilities.formatDate(file.getLastUpdated(), timezone, "yyyy-MM-dd HH:mm");
    var dateCreated =  Utilities.formatDate(file.getDateCreated(), timezone, "yyyy-MM-dd HH:mm")
    
    row += "<li>" + editors + " " + viewers + " " + access + " " + lastUpdated + " <a href='" + fileURL + "'>" + fileName + " </a></li>";
    
    sheet.appendRow([dateCreated, lastUpdated, fileName, fileURL, editors, viewers, access]);
    
    count++;

  }
    if (row !== "") {
    row = "<p>See the list of " + count + " files which changed in your Google Drive in the past 24 hours:</p><ol>" + row + "</ol>";
    MailApp.sendEmail(email, "monitorDaily", "", {htmlBody: row});
  }
 ScriptApp.newTrigger("monitorDaily").timeBased().everyDays(1).create(); 
  
}
