function main() {
  let token = getAuthToken();
  let arrayData = getItems(token);
  writeDataToSheet(arrayData);
}

//function to write the data to a selected sheet. All content will be overridden
function writeDataToSheet(data) {
  // blank array to hold the data for Sheet
  var sheetArray = [];

  //Add the arrayProperties to the array.
  //All standard item values are included
  data.forEach(function (element) {
    sheetArray.push([
      element.item_id,
      element.name,
      element.item_name,
      element.unit,
      element.status,
      element.source,
      element.is_linked_with_zohocrm,
      element.zcrm_product_id,
      element.description,
      element.rate,
      element.tax_id,
      element.tax_name,
      element.tax_percentage,
      element.product_type,
      element.has_attachment,
      element.sku,
      element.image_name,
      element.image_type,
      element.image_document_id,
      element.created_time,
      element.last_modified_time,
      element.show_in_storefront,
    ]);
  });

  // select the output sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ToDoSheet1"); // replace 'Sheet1' with the name of your Sheet

  // calculate the number of rows and columns needed
  var numRows = sheetArray.length;
  var numCols = sheetArray[0].length;

  // output the numbers to the sheet
  sheet.getRange(2, 1, numRows, numCols).setValues(sheetArray.reverse());
}

//call Zoho API to receive all Items present in your current Zoho Invoice environment
//as a Parameter you need to pass a valid auth Token from the funtion getAuthToken()
//easily changeble to other endpoints of zoho invoice
function getItems(authToken) {
  let page = "1";

  let nextPageExists = true;
  var arrayData = [];

  //todo add your OrgID
  headers = {
    "X-com-zoho-invoice-organizationid": "ToDoyourOrgID",
    Authorization: authToken,
  };

  var options = {
    method: "get",
    contentType: "multipart/form-data",
    headers: headers,
    muteHttpExceptions: true,
  };

  while (nextPageExists) {
    url =
      "https://invoice.zoho.com/api/v3/items?page=" +
      page +
      "&per_page=200&sort_column=name";
    let response = UrlFetchApp.fetch(url, options);
    var jsonConverted = JSON.parse(response);
    var arrayData = arrayData.concat(jsonConverted["items"]);

    //is more data to be fetched on the next page?
    nextPageExists = jsonConverted.page_context.has_more_page;
    page++;
  }

  return arrayData;
}

// requesting a valid access token from the zoho auth endpoint.
// insert your own values in the marked locations
// you can get the refresh token from: https://api-console.zoho.com/
// returns the access token with Zoho-oauthtoken to be used inside request header
function getAuthToken() {
  //might need to change your domain to .eu or different
  let url = "https://accounts.zoho.com/oauth/v2/token";

  //todo add your own Values
  let formData = {
    client_id: "todoYourClientID",
    client_secret: "todoyourClientSecret",
    redirect_uri: "http://www.zoho.com/invoice",
    grant_type: "todorefresh_token",
    refresh_token: "todoyourRefreshToken",
  };

  let options = {
    method: "post",
    contentType: "application/x-www-form-urlencoded",
    payload: formData,
  };

  let result = UrlFetchApp.fetch(url, options);
  let converted = JSON.parse(result);
  let accessToken = "Zoho-oauthtoken " + converted.access_token;
  return accessToken;
}
