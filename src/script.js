// Acrobat PDF Field Automation Script
// This script adds signature, date, and text fields to PDF documents using Adobe Acrobat's JavaScript API.
// Intended for use with Acrobat's Action Wizard (Guided Actions) for batch processing.
//
// Usage:
// 1. Edit the 'fieldPositions' object below to match your PDF template and field requirements.
// 2. Use Acrobat's Action Wizard to run this script on one or more PDFs (see README.md for instructions).
//
// Field definition format: [field_name, x, y, width, height]
//   - field_name: '!signature' for signature fields, '!date' for date fields, any other string for text fields
//   - x, y: top-left corner of the field (in points)
//   - width, height: dimensions of the field (in points)

function addFields(fieldPositions) {
    for (var pageNum in fieldPositions) {
        var fields = fieldPositions[pageNum];
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var fieldName = field[0];
            var index = pageNum - 1; // Acrobat pages are zero-based
            var x = field[1], y = field[2], w = field[3], h = field[4];
            var boxDimensions = [x, y, x + w, y + h]; // [left, top, right, bottom]

            if (fieldName === "!signature") {
                // Add a signature field
                var sigField = this.addField(fieldName + "_" + pageNum, "signature", index, boxDimensions);
                sigField.readonly = false;
            } else if (fieldName === "!date") {
                // Add a text field with today's date
                var currentDate = util.printd("yyyy-mm-dd", new Date());
                var dateField = this.addField(fieldName + "_" + pageNum, "text", index, boxDimensions);
                dateField.value = currentDate;
            } else {
                // Add a generic text field with the field name as its value
                var textField = this.addField(fieldName + "_" + pageNum, "text", index, boxDimensions);
                textField.value = fieldName;
            }
            // Add more field types here if needed
        }
    }
}

// Define the fields to add for each page
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
    ],
    7: [
        ["!signature", 200, 100, 150, 25],
        ["!date", 425, 100, 150, 25]
    ]
};

// Run the field addition process
addFields.call(this, fieldPositions);