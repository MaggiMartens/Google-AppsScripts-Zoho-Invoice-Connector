# Google-AppsScripts-Zoho-Invoice-Connector

Regularly pulling data from Zoho Invoice into a Spreadsheet for further analysis. Prepared for items endpoint but easily convertible for timeentries, projects, etc.

# How to Use

Step 1 and 2 are out of the scope of this script for the moment

1. Get a token (clientID & Secret) from developer https://api-console.zoho.com/
2. generate a refresh token via API call
3. Insert the tokens of 1 and the received token from step 2 into the script. Sections where you need to add anything are marked with "todo"
4. run the script
5. create a schedule via the google scripts UI for any needed recurrences of the flow

## Errorhandling

Since I needed this script as a quick help it does not contain much errorhandling. Therefore in any case of errors during http calls etc. you need to insert your own log entries. I might extend this in the future.

# Extending the script

Feel free to do any PR with extended script functionality. I'd be happy about any recommendations or feature request in the issues as well. Thank you!
