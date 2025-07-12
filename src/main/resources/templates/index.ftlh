<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Employee Directory</title>
  <link rel="stylesheet" href="../static/css/style.css">
</head>

<body>
  <header class="main-header">
    <h1>Employee Directory</h1>
    <div class="search-section">
      <input type="text" placeholder="Search by name or email" id="search-input" />
      <button id="filter-btn">Filter</button>
    </div>
  </header>

  <section class="controls">
    <label>Sort:
      <select id="sort-select">
        <option>--Select--</option>
        <option value="firstName">First Name</option>
        <option value="department">Department</option>
      </select>
    </label>

    <label>Show:
      <select id="show-select">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </label>

    <button class="add-btn" id="add-btn">Add Employee</button>
  </section>
  <!-- Centered Add/Edit Form (hidden by default) -->
  <!-- ================= Add / Edit Employee Form ================= -->
  <div id="form-container" style="display:none;">
    <h2 id="form-title">Add Employee</h2>

    <form id="employee-form" novalidate>
      <label>
        First Name
        <input type="text" id="firstName" required />
        <span class="error" id="firstNameErr"></span>
      </label>

      <label>
        Last Name
        <input type="text" id="lastName" required />
        <span class="error" id="lastNameErr"></span>
      </label>

      <label>
        Email
        <input type="email" id="email" required />
        <span class="error" id="emailErr"></span>
      </label>

      <label>
        Department
        <select id="department" required>
          <option value="">-- Select Department --</option>
          <option>HR</option>
          <option>IT</option>
          <option>Sales</option>
          <option>Finance</option>
          <option>Marketing</option>
        </select>
        <span class="error" id="departmentErr"></span>
      </label>

      <label>
        Role
        <input type="text" id="role" required />
        <span class="error" id="roleErr"></span>
      </label>

      <div class="form-actions">
        <button type="submit" id="save-btn">Save</button>
        <button type="button" id="cancel-btn">Cancel</button>
      </div>
    </form>
  </div>

  <main id="employee-list-container">
    <!-- Cards will be inserted here by JavaScript -->
  </main>
  <!-- Pagination Controls -->
  <div class="pagination" id="pagination-controls">
    <button id="prev-page">Prev</button>
    <span id="page-numbers"></span>
    <button id="next-page">Next</button>
  </div>


  <footer>
    <p>© 2025 Employee Directory App. All rights reserved.</p>
  </footer>

  <!-- ===== Filter Pop‑up ===== -->
  <div id="filter-overlay" style="display:none;">
    <div id="filter-popup">
      <h3>Filter Employees</h3>
      <form id="filter-form">
        <label>
          First Name:
          <input type="text" id="filter-firstName" />
        </label>

        <label>
          Department:
          <select id="filter-department">
            <option value="">All</option>
            <option>HR</option>
            <option>IT</option>
            <option>Sales</option>
            <option>Finance</option>
          </select>
        </label>

        <label>
          Role:
          <input type="text" id="filter-role" />
        </label>

        <div class="filter-actions">
          <button type="submit">Apply</button>
          <button type="button" id="filter-cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
  <script src="../static/js/data.js"></script>
  <script src="../static/js/app.js"></script>
</body>

</html>