document.addEventListener("DOMContentLoaded", function () {
    // Initialize a multi-dimensional array with sample employees
    let employees = [
        ["Sally Smith", "Quality Assurance", "3423"],
        ["Mark Martin", "VP Sales", "3346"],
        ["John Johnson", "Marketing", "3232"]
    ];

    const nameInput = document.getElementById("name");
    const titleInput = document.getElementById("title");
    const extensionInput = document.getElementById("extension");
    const employeeTableElement = document.getElementById("employeeTable");
    const employeeCount = document.getElementById("employeeCount");

    // Check if employeeTableElement exists and get tbody
    const employeeTable = employeeTableElement ? employeeTableElement.getElementsByTagName("tbody")[0] : null;
    if (!employeeTable) {
        console.error("Error: employeeTable or tbody not found in the HTML.");
        return;
    }

    // Render the initial employee table and count
    function renderTable() {
        employeeTable.innerHTML = ""; // Clear the table before re-rendering

        employees.forEach((employee, index) => {
            const row = employeeTable.insertRow();
            employee.forEach(data => {
                const cell = row.insertCell();
                cell.textContent = data;
            });

            // Add a delete button for each employee
            const deleteCell = row.insertCell();
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteEmployee(index));
            deleteCell.appendChild(deleteButton);
        });

        // Update employee count
        employeeCount.textContent = `Showing ${employees.length} Employees`;
    }

    // Add Employee
    function addEmployee() {
        // Clear previous error messages
        document.getElementById("nameError").textContent = "";
        document.getElementById("titleError").textContent = "";
        document.getElementById("extensionError").textContent = "";

        // Get input values and trim spaces
        const name = nameInput.value.trim();
        const title = titleInput.value.trim();
        const extension = extensionInput.value.trim();

        let isValid = true;

        // Validate inputs
        if (name === "") {
            document.getElementById("nameError").textContent = "Name is required.";
            isValid = false;
        }
        if (title === "") {
            document.getElementById("titleError").textContent = "Title is required.";
            isValid = false;
        }
        if (extension === "") {
            document.getElementById("extensionError").textContent = "Extension is required.";
            isValid = false;
        }

        if (!isValid) return;

        // Add new employee to the array
        employees.push([name, title, extension]);

        // Clear input fields
        nameInput.value = "";
        titleInput.value = "";
        extensionInput.value = "";

        // Re-render the table to include the new employee
        renderTable();
    }

    // Delete Employee
    function deleteEmployee(index) {
        // Remove employee from array
        employees.splice(index, 1);

        // Re-render the table
        renderTable();
    }

    // Event listener for Add Employee button
    document.getElementById("addEmployeeButton").addEventListener("click", addEmployee);

    // Initial table render on page load
    renderTable();
});
