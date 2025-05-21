# Acrobat PDF Field Automation

**Version: 1.0.0**

This project provides a JavaScript solution for automating the addition of signature fields, text fields, and date fields to PDF documents using Adobe Acrobat's JavaScript API.

## Overview

The script located in `src/script.js` allows users to modify PDF files by adding various fields at specified positions. This functionality is particularly useful for creating forms that require signatures and dates.

## Prerequisites

- Adobe Acrobat Pro (not Reader) installed on your machine.
- Basic familiarity with Acrobat's Action Wizard (Guided Actions).

## Batch Processing with Guided Actions (Action Wizard)

You can automate running this script on one or multiple PDF documents using Acrobat's **Action Wizard** (also called "Guided Actions"). This is the recommended way to use the script.

### Steps to Create a Custom Action

1. **Open Adobe Acrobat Pro**.

2. **Go to the Action Wizard**:
   - In the right pane, click on `Action Wizard`.
   - If you don't see it, go to `Tools` > `Action Wizard` and add it to your tools.

3. **Create a New Action**:
   - Click `New Action`.
   - Under `Choose tools to add:`, select `Execute JavaScript` and click the `+` button to add it to your action steps.

4. **Configure the JavaScript Step**:
   - Click on `Specify Settings` for the `Execute JavaScript` step.
   - Open the `src/script.js` file in a text editor and copy its entire contents.
   - Paste the copied script into the JavaScript editor in Acrobat.
   - Click `OK`.

5. **Add Save Step (Optional)**:
   - You can add a `Save` step to automatically save the modified PDFs.

6. **Save and Name Your Action**:
   - Click `Save`.
   - Give your action a name, e.g., "Add PDF Fields".

7. **Run the Action**:
   - In the Action Wizard pane, select your new action.
   - Click `Start`.
   - Select one or more PDF files or an entire folder.
   - Click `Next` and follow the prompts to process all selected PDFs.

---

### Notes

- **Field Position Units:** All coordinates in the `fieldPositions` object are specified in points (1 point = 1/72 inch). You can determine these values using Acrobat's form editor (by checking field properties) or a PDF measurement tool.
- The script will add fields to each PDF as defined in the `fieldPositions` object in `src/script.js`.
- If you want to use different field positions for different PDFs, you must edit the script before running the action, or create separate actions for each template.
- Always test your action on sample files before running it on important documents.
- Ensure that the PDF documents are not secured or restricted from editing.
- You can modify the `fieldPositions` object in the script to match your specific field requirements and page numbers.

#### Example: Customizing `fieldPositions`

In `src/script.js`, you will find a section like this:

```js
// The object keys are page numbers (1-based)
var fieldPositions = {
  1: [
    ["!signature", 190, 95, 150, 25],
    ["!date", 415, 95, 150, 25]
  ],
  4: [
    ["John Doe", 60, 115, 150, 20],
    ["MD", 315, 115, 150, 20],
    ["Department A", 60, 80, 150, 25],
    ["!signature", 300, 70, 150, 25],
    ["!date", 505, 80, 75, 25]
  ]
};
```

To add or change a field, simply edit the arrays. For example, to add a signature field to page 2 at a different location:

```js
var fieldPositions = {
  2: [
    ["!signature", 50, 100, 180, 40]
  ]
  // ...other pages and fields...
};
```

- `"!signature"` creates a signature field
- `"!date"` creates a date field (auto-filled with today's date)
- Any other string creates a text field with that value

For further details, refer to the comments within the `src/script.js` file, which provide additional context on the functions and their parameters.

---

### Security Note

> **Warning:** Running JavaScript in Acrobat can have security implications. Only use scripts from trusted sources and review the code before running it on sensitive documents.

For more information, see [Adobe's documentation on Action Wizard](https://helpx.adobe.com/acrobat/using/action-wizard-acrobat-pro.html).

---

## Reference

- [Adobe Acrobat JavaScript API Reference](https://opensource.adobe.com/dc-acrobat-sdk-docs/library/jsapiref/JS_API_AcroJS.html)

---

## License

This project is licensed under the MIT License. See below for details.

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```