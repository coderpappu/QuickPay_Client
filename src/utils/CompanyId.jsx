// // Save companyId to localStorage
// let companyId = localStorage.getItem("companyId");

// // Function to remove companyId from localStorage
// function removeCompanyId() {
//   localStorage.removeItem("companyId");
//   companyId = null; // Update your variable to reflect the change
// }

// // Example: Attach this function to an event listener, like a button click
// document
//   .getElementById("removeCompanyIdButton")
//   .addEventListener("click", removeCompanyId);

// // Listen for changes in localStorage
// window.addEventListener("storage", function (event) {
//   if (event.key === "companyId" && event.newValue === null) {
//     console.log("companyId has been removed from localStorage.");
//     companyId = null;
//     // You can add additional logic here if needed
//   }
// });

// // Export the companyId
// export default companyId;
