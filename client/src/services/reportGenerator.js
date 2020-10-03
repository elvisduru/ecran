import jsPDF from "jspdf";
import "jspdf-autotable";

// define a generatePDF function that accepts an atms argument
const generatePDF = (atms) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    "Terminal ID",
    "Last Txn Date",
    "Status",
    "Current Campaign",
    "Old Campaign",
    "No Campaign",
    "Incomplete Screens",
    "No Screen",
    "State",
    "Region",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each atm pass all its data into an array
  atms.forEach((atm) => {
    const atmData = [
      atm["Terminal ID"],
      atm["Last Txn Date"],
      atm["Status"],
      atm["Current Campaign"],
      atm["Old Campaign"],
      atm["No Campaign"],
      atm["Incomplete Screens"],
      atm["No Screen"],
      atm["State"],
      atm["Region"],
    ];
    // push each atm's info into a row
    tableRows.push(atmData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text(`Ecran ATM Report. ${date[2]}-${date[3]}-${date[4]}`, 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
