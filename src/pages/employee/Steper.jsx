// import * as React from "react";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";

// const steps = ["Personal Information", "Address Details", "Job Details"];

// export default function EmployeeRegistrationStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());
//   const [formData, setFormData] = React.useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     department: "",
//     jobTitle: "",
//     salary: "",
//   });

//   const isStepOptional = (step) => step === 1;
//   const isStepSkipped = (step) => skipped.has(step);

//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       throw new Error("You can't skip a step that isn't optional.");
//     }
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = () => {
//     console.log("Employee Data Submitted:", formData);
//     // Here you would typically handle form submission (e.g., send data to an API)
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//           if (isStepOptional(index)) {
//             labelProps.optional = (
//               <Typography variant="caption">Optional</Typography>
//             );
//           }
//           if (isStepSkipped(index)) {
//             stepProps.completed = false;
//           }
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       {activeStep === steps.length ? (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Button onClick={handleReset}>Reset</Button>
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//           {activeStep === 0 && (
//             <Box>
//               <TextField
//                 name="name"
//                 label="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 name="email"
//                 label="Email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 name="phone"
//                 label="Phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//             </Box>
//           )}
//           {activeStep === 1 && (
//             <Box>
//               <TextField
//                 name="address"
//                 label="Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>City</InputLabel>
//                 <Select
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="New York">New York</MenuItem>
//                   <MenuItem value="Los Angeles">Los Angeles</MenuItem>
//                   <MenuItem value="Chicago">Chicago</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           )}
//           {activeStep === 2 && (
//             <Box>
//               <TextField
//                 name="department"
//                 label="Department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 name="jobTitle"
//                 label="Job Title"
//                 value={formData.jobTitle}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 name="salary"
//                 label="Salary"
//                 type="number"
//                 value={formData.salary}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//             </Box>
//           )}
//           <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Box sx={{ flex: "1 1 auto" }} />
//             {isStepOptional(activeStep) && (
//               <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                 Skip
//               </Button>
//             )}
//             <Button
//               onClick={
//                 activeStep === steps.length - 1 ? handleSubmit : handleNext
//               }
//             >
//               {activeStep === steps.length - 1 ? "Finish" : "Next"}
//             </Button>
//           </Box>
//         </React.Fragment>
//       )}
//     </Box>
//   );
// }
