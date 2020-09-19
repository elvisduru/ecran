// app.get("/readfiles", async (req, res) => {
//   try {
//     const files = await dir.files(path.join(__dirname, "uploads"), {
//       sync: true,
//       shortName: true,
//     });
//     res.json({ files });
//   } catch (err) {
//     console.log("err reading files: ", err);
//     res.send("err reading files");
//   }
// });

// (async function () {
//   try {
//     // const directory = path.join(__dirname, "uploads/screens");
//     // const screens = Array.from(
//     //   new Set(
//     //     await dir.files(directory, {
//     //       sync: true,
//     //       shortName: true,
//     //     })
//     //   )
//     // );

//     const screens = {
//       PIC000: {
//         title: "Do you want more time?",
//         lastModified: Date.now(),
//         fileName: "PIC000",
//         type: "default",
//       },
//       PIC002: {
//         title: "Out of Service",
//         lastModified: Date.now(),
//         fileName: "PIC002",
//         type: "default",
//       },
//       PIC003: {
//         title: "Service in Progress",
//         lastModified: Date.now(),
//         fileName: "PIC003",
//         type: "default",
//       },
//       PIC010: {
//         title: "Idle Screen",
//         lastModified: Date.now(),
//         fileName: "PIC010",
//         type: "default",
//       },
//       PIC016: {
//         title: "Please Enter your PIN",
//         lastModified: Date.now(),
//         fileName: "PIC016",
//         type: "default",
//       },
//       PIC017: {
//         title: "Wrong PIN Please Enter your PIN",
//         lastModified: Date.now(),
//         fileName: "PIC017",
//         type: "default",
//       },
//       PIC018: {
//         title: "What would you like to do?",
//         lastModified: Date.now(),
//         fileName: "PIC018",
//         type: "default",
//       },
//       PIC019: {
//         title: "Choose Amount",
//         lastModified: Date.now(),
//         fileName: "PIC019",
//         type: "default",
//       },
//       PIC022: {
//         title: "What would you like to do?",
//         lastModified: Date.now(),
//         fileName: "PIC022",
//         type: "default",
//       },
//       PIC023: {
//         title: "Choose Account",
//         lastModified: Date.now(),
//         fileName: "PIC023",
//         type: "default",
//       },
//       PIC024: {
//         title: "Choose Account",
//         lastModified: Date.now(),
//         fileName: "PIC024",
//         type: "default",
//       },
//       PIC025: {
//         title: "Which Account Are You Transfering From?",
//         lastModified: Date.now(),
//         fileName: "PIC025",
//         type: "default",
//       },
//       PIC026: {
//         title: "Which Account Are You Transfering To?",
//         lastModified: Date.now(),
//         fileName: "PIC026",
//         type: "default",
//       },
//       PIC028: {
//         title: "Choose Account",
//         lastModified: Date.now(),
//         fileName: "PIC028",
//         type: "default",
//       },
//       PIC031: {
//         title: "Please Enter the Amount in Multiples of N1000",
//         lastModified: Date.now(),
//         fileName: "PIC031",
//         type: "default",
//       },
//       PIC034: {
//         title: "Enter the Amount to Transfer",
//         lastModified: Date.now(),
//         fileName: "PIC034",
//         type: "default",
//       },
//       PIC046: {
//         title: "Transaction in Progress",
//         lastModified: Date.now(),
//         fileName: "PIC046",
//         type: "default",
//       },
//       PIC049: {
//         title: "Temporary Unable to Dispense card",
//         lastModified: Date.now(),
//         fileName: "PIC049",
//         type: "default",
//       },
//       PIC051: {
//         title: "Transaction Cancelled",
//         lastModified: Date.now(),
//         fileName: "PIC051",
//         type: "default",
//       },
//       PIC053: {
//         title: "Transaction Completed",
//         lastModified: Date.now(),
//         fileName: "PIC053",
//         type: "default",
//       },
//       PIC054: {
//         title: "Account Balance",
//         lastModified: Date.now(),
//         fileName: "PIC054",
//         type: "default",
//       },
//       PIC065: {
//         title: "Thank you",
//         lastModified: Date.now(),
//         fileName: "PIC065",
//         type: "default",
//       },
//       PIC067: {
//         title: "Invalid Card",
//         lastModified: Date.now(),
//         fileName: "PIC067",
//         type: "default",
//       },
//       PIC068: {
//         title: "Thank you",
//         lastModified: Date.now(),
//         fileName: "PIC068",
//         type: "default",
//       },
//       PIC079: {
//         title: "Issuer or Switch Inoperative",
//         lastModified: Date.now(),
//         fileName: "PIC079",
//         type: "default",
//       },
//       PIC081: {
//         title: "Please enter your new PIN",
//         lastModified: Date.now(),
//         fileName: "PIC081",
//         type: "default",
//       },
//       PIC082: {
//         title: "Please re-enter your new PIN",
//         lastModified: Date.now(),
//         fileName: "PIC082",
//         type: "default",
//       },
//       PIC086: {
//         title: "Take your cash",
//         lastModified: Date.now(),
//         fileName: "PIC086",
//         type: "default",
//       },
//       PIC128: {
//         title: "Do you want receipt?",
//         lastModified: Date.now(),
//         fileName: "PIC128",
//         type: "default",
//       },
//       PIC154: {
//         title: "Transfer to...",
//         lastModified: Date.now(),
//         fileName: "PIC154",
//         type: "default",
//       },
//       PIC301: {
//         title: "Please wait",
//         lastModified: Date.now(),
//         fileName: "PIC301",
//         type: "advert",
//       },
//       PIC527: {
//         title: "Please Choose An Option_VAS",
//         lastModified: Date.now(),
//         fileName: "PIC527",
//         type: "default",
//       },
//       PIC531: {
//         title: "Please Choose Your Account_VAS",
//         lastModified: Date.now(),
//         fileName: "PIC531",
//         type: "default",
//       },
//       PIC539: {
//         title: "Choose What you are paying for_VAS",
//         lastModified: Date.now(),
//         fileName: "PIC539",
//         type: "default",
//       },
//       PIC660: {
//         title: "Enter Account Number you are sending to_VAS",
//         lastModified: Date.now(),
//         fileName: "PIC660",
//         type: "default",
//       },
//     };

//     await db.collection("atms").updateMany({}, { $set: { screens } });
//     // while (await atmsCursor.hasNext()) {
//     //   const atm = await atmsCursor.next();
//     //   const terminal = atm["Terminal ID"];
//     //   console.log(terminal);

//     //   // await Promise.all(
//     //   //   screens.map(async (screen) => {
//     //   //     try {
//     //   //       const file = bucket.file(`screens/${screen}`);
//     //   //       await file.copy(`atms/${terminal}/S4PICT/${screen}`);
//     //   //     } catch (error) {
//     //   //       console.log(error);
//     //   //     }
//     //   //   })
//     //   // );
//     // }

//     console.log("FINISHED UPLOADING FILES");
//   } catch (error) {
//     console.log(error);
//   }
// })();
