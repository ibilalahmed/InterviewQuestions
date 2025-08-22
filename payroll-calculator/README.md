**PAYROLL CALCULATOR** 

This is a simple program is part of an assignment for eBacon that calculates weekly pay for employees.

It reads employee work hours from a JSON file and figures out their total pay based on the rules for regular hours, overtime, and double-time.

**WHAT THIS PROGRAM DOES**

- Reads employee work data from the `/data/input.json` file.
- Calculates pay for regular hours (up to 40 hours).
- Calculates overtime pay at 1.5x the rate (for hours between 40 and 48).
- Calculates double-time pay at 2x the rate (for hours over 48).
- Figures out the total benefits earned.
- Prints the final results as a clean JSON object in the terminal.

**HOW TO GET STARTED**

Follow these steps to run the project on your computer.

1. CLONE THE PROJECT
First, clone the project from GitHub onto your machine using the git clone command.

2. GO INTO THE PROJECT FOLDER
Navigate into the folder you just cloned.
Example: `cd payroll-calculator`

3. INSTALL THE TOOLS
Important: Once you are inside the `payroll-calculator` folder, run this command. It will automatically download and install all the tools the project needs to run (like Jest for testing).
Command: `npm install`


**HOW TO USE THE CALCULATOR**

To run the program and calculate the payroll, use this command from the `payroll-calculator` folder:
Command: `npm start`

The final pay report for all employees will be printed directly in your terminal.


**HOW TO TEST THE CODE**

This project includes tests to make sure all the pay calculations are accurate.

To run these tests, use this command:
Command: `npm test`

You will see a "PASS" message if all the math is correct.

**APPLICATION FLOW DIAGRAM**

<img width="603" height="776" alt="image" src="https://github.com/user-attachments/assets/182857f1-5872-4fc7-a178-361806457191" />


**TEST RESULTS**

<img width="576" height="308" alt="image" src="https://github.com/user-attachments/assets/668f659a-806b-460f-9801-87cf0b392fea" />
