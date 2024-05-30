// Function to get students data from local storage
function getStudents() {
    const studentsJSON = localStorage.getItem("students");
    return studentsJSON? JSON.parse(studentsJSON) : [];
  }
  
  // Function to set students data in local storage
  function setStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
  }
  
  // Function to display student data in table
  function displayStudents(students) {
    const tableBody = document.getElementById("student-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear previous data
    students.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
          <button data-id="${student.id}" class="edit">Edit</button>
          <button data-id="${student.id}" class="delete">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Function to add new student
  function addStudent(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
  
    // Input validation
    if (!name ||!id ||!email ||!contact) {
      alert("Please fill in all fields!");
      return;
    }
  
    // Validate student ID and contact number (numbers only)
    if (isNaN(id) || isNaN(contact)) {
      alert("Student ID and Contact Number must be numbers!");
      return;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }
  
    const students = getStudents();
    students.push({ name, id, email, contact });
    setStudents(students);
    displayStudents(students);
    // Clear form fields
    document.getElementById("student-form").reset();
  }
  
  // Function to edit student
  function editStudent(studentId) {
    const students = getStudents();
    const studentIndex = students.findIndex((student) => student.id === studentId);
    if (studentIndex!== -1) {
      // Pre-fill form with existing data
      const nameInput = document.getElementById("name");
      const idInput = document.getElementById("id");
      const emailInput = document.getElementById("email");
      const contactInput = document.getElementById("contact");
      nameInput.value = students[studentIndex].name;
      idInput.value = students[studentIndex].id;
      emailInput.value = students[studentIndex].email;
      contactInput.value = students[studentIndex].contact;
  
      // Submit button functionality change to update student
      const submitButton = document.querySelector("#student-form button");
      submitButton.textContent = "Update Student";
      submitButton.onclick = () => {
        students[studentIndex] = { name: nameInput.value, id: idInput.value, email: emailInput.value, contact: contactInput.value };
        setStudents(students);
        displayStudents(students);
        // Reset button functionality back to add student
        submitButton.textContent = "Register Student";
        submitButton.onclick = addStudent;
      };
    }
  }
  
  // Function to delete student
  function deleteStudent(studentId) {
    const students = getStudents();
    const studentIndex = students.findIndex((student) => student.id === studentId);
    if (studentIndex!== -1) {
      students.splice(studentIndex, 1);
      setStudents(students);
      displayStudents(students);
    }
  }
  
  // Event listeners for adding, editing, and deleting students
  document.getElementById("student-form").addEventListener("submit", addStudent);
  
  document.getElementById("students").addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit")) {
      editStudent(target.dataset.id);
    } else if (target.classList.contains("delete")) {
      deleteStudent(target.dataset.id);
    }
  });