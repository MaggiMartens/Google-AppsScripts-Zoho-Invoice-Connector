const CONFIG = {
  ZOHO_API_BASE: "https://invoice.zoho.com/api/v3",
  ZOHO_AUTH_BASE: "https://accounts.zoho.com/oauth/v2/token",
  REDIRECT_URI: "http://www.zoho.com/invoice",
  SHEET_NAME: "ToDoSheet1",
  ORG_ID: "ToDoyourOrgID",
  CLIENT_ID: "todoYourClientID",
  CLIENT_SECRET: "todoyourClientSecret",
  REFRESH_TOKEN: "todoyourRefreshToken",
  GRANT_TYPE: "refresh_token",
};
/**
 * Main function to fetch data from Zoho API and write to Google Sheets.
 * Use this one together with a recurring trigger to keep the sheet up to date
 */
function main() {
  try {
    const token = getAuthToken();
    const items = getAllItems(token);
    writeDataToSheet(items);
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

/**
 * Writes the formatted Zoho data to the Google Sheet.
 * @param {Array} data - The data to write to the sheet.
 */
function writeDataToSheet(data) {
  const formattedData = data.map((item) => formatItemForSheet(item));

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    throw new Error(`Sheet with name ${CONFIG.SHEET_NAME} not found.`);
  }

  sheet
    .getRange(2, 1, formattedData.length, formattedData[0].length)
    .setValues(formattedData.reverse());
}
/**
 * Formats the individual Zoho item for Google Sheet insertion.
 * @param {Object} element - The Zoho item.
 * @returns {Array} - The formatted item.
 */
function formatItemForSheet(element) {
  return [
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
  ];
}

/**
 * Fetches all Zoho items using pagination.
 * @param {string} authToken - The authentication token.
 * @returns {Array} - The fetched items.
 * easily changeble to other endpoints of zoho invoice
 */
function getAllItems(authToken) {
  const headers = {
    "X-com-zoho-invoice-organizationid": CONFIG.ORG_ID,
    Authorization: authToken,
  };

  const options = {
    method: "get",
    contentType: "multipart/form-data",
    headers: headers,
    muteHttpExceptions: true,
  };

  let page = 1;
  let items = [];
  let hasMorePages = true;

  while (hasMorePages) {
    const response = UrlFetchApp.fetch(
      `${CONFIG.ZOHO_API_BASE}/items?page=${page}&per_page=200&sort_column=name`,
      options
    );
    const responseData = JSON.parse(response);
    items = items.concat(responseData["items"]);

    hasMorePages = responseData.page_context.has_more_page;
    page++;
  }

  return items;
}
/**
 * Requests and retrieves the Zoho authentication token.
 * you can get the refresh token from: https://api-console.zoho.com/
 * @returns {string} - The authentication token.
 */
function getAuthToken() {
  const formData = {
    client_id: CONFIG.CLIENT_ID,
    client_secret: CONFIG.CLIENT_SECRET,
    redirect_uri: CONFIG.REDIRECT_URI,
    grant_type: "refresh_token",
    refresh_token: CONFIG.REFRESH_TOKEN,
  };

  const options = {
    method: "post",
    contentType: "application/x-www-form-urlencoded",
    payload: formData,
  };

  const result = UrlFetchApp.fetch(CONFIG.ZOHO_AUTH_BASE, options);
  const converted = JSON.parse(result);

  return `Zoho-oauthtoken ${converted.access_token}`;
}
