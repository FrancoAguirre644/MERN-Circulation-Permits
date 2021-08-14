import jsPDF from "jspdf";
import "jspdf-autotable";

// define a generatePDF function that accepts a tickets argument
export const generatePDFProfile = profiles => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["ID", "Name", "Created At"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  profiles.forEach(profile => {
    const profileData = [
      profile._id,
      profile.name,
      new Date(profile.createdAt).toLocaleDateString()
    ];
    // push each tickcet's info into a row
    tableRows.push(profileData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Profile List", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_profiles_${dateStr}.pdf`);
};

