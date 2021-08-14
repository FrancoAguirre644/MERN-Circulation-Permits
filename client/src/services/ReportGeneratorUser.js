import jsPDF from "jspdf";
import "jspdf-autotable";

// define a generatePDF function that accepts a tickets argument
export const generatePDFUser = users => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["ID", "Username", "Email", "Profile", "Created At"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  users.forEach(user => {
    const userData = [
      user._id,
      user.username,
      user.email,
      user.profile,
      new Date(user.createdAt).toLocaleDateString()
    ];
    // push each tickcet's info into a row
    tableRows.push(userData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  doc.text("User List", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_users_${new Date().toLocaleDateString()}.pdf`);
};

