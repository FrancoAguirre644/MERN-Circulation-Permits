import jsPDF from "jspdf";
import "jspdf-autotable";

// define a generatePDF function that accepts a tickets argument
export const generatePDFPPermit = (permits, description) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Date", "Person", "From", "To", "Vehicle", "Days", "Vacations", "Created At"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  permits.forEach(permit => {
    const permitPeriodData = [
      new Date(permit.date).toLocaleDateString(),
      permit.person.lastName,
      permit.from.site,
      permit.to.site,
      permit.vehicle.patent,
      permit.days,
      permit.vacations ? 'Yes' : 'No',
      new Date(permit.createdAt).toLocaleDateString()
    ];
    // push each tickcet's info into a row
    tableRows.push(permitPeriodData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 30 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Period List", 14, 15);
  doc.text(description, 14, 23);
  // we define the name of our PDF file.
  doc.save(`report_period_permits_${dateStr}.pdf`);
};

