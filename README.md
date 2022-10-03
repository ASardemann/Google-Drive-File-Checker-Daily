# Google-Drive-File-Checker-Daily
Checks the changed files in your Google Drive and sends you an email.



This is an enhancement of Amit Argawals Google Drive - File Activity Script for Google Apps Scripts. 
https://www.labnol.org/internet/google-drive-activity-report/13857/
It also checks the permissions and returns the viewers and editors of a document/file. 
It is set to report the changes within the last 24 hours. You can modify this by modifing the getTime value. 
Please be aware of the regular Google Apps Scripts runtime quotas. 
https://developers.google.com/apps-script/guides/services/quotas

To set the script up:
1. Open up a spreadsheet in Google Drive
2. Select Extensions and Apps Script
3. Copy the code into the Apps Scripts Editor and replace the email var with your email
4. Allow the Script to run by clicking on Execute

The script will now print all files which changed in the last 24 hours to the spreadsheet and will send an email to the given recipient.
