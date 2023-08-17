# Google-AppsScripts-Zoho-Invoice-Connector

This script provides a simple way to regularly pull data from Zoho Invoice into a Google Spreadsheet for further analysis. It's initially configured for the items endpoint, but can be easily adapted to work with time entries, projects, and other Zoho Invoice endpoints.

## 🚀 Getting Started

### Prerequisites

1. A Zoho Invoice account.
2. A Google account with access to Google Apps Script and Google Sheets.

### Setup

#### Step 1: Obtain Zoho Developer Tokens

- **Note**: This step is currently out of the scope of this script.
  1. Obtain a token (Client ID & Secret) from the Zoho Developer Console at [Zoho API Console](https://api-console.zoho.com/).
  2. Generate a refresh token via an API call.

#### Step 2: Configure the Script

1. Open the script and locate the `CONFIG` object at the beginning.
2. Insert the Client ID, Client Secret, and Refresh Token obtained in Step 1.
   - **Security Note**: Ensure restricted access to the script, as it contains sensitive information.

#### Step 3: Run the Script

1. Execute the script to start fetching data from Zoho Invoice.

#### Step 4: Schedule Automatic Runs (Optional)

1. Use the Google Apps Script UI to set up triggers and schedule recurrences for the script.

## ⚠️ Error Handling

This script was developed as a quick utility and does not include comprehensive error handling. If you encounter issues, especially during HTTP calls, consider adding custom log entries for debugging. Enhancements to error handling may be added in future iterations. You can ask for help in the issues section but i'm not sure that i can answer in time. Sorry!

## ✨ Contributing

Your contributions are always welcome! If you'd like to enhance the script's functionality or improve its features:

1. Fork the repository.
2. Make your changes.
3. Submit a pull request.

Feel free to open issues for feature requests, recommendations, or bug reports. Thank you for your support!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
