/* ==== DOM Shortcuts ==== */
const container      = document.getElementById('employee-list-container');
const addBtn         = document.getElementById('add-btn');
const searchInput    = document.getElementById('search-input');
const sortSelect     = document.getElementById('sort-select');
const showSelect     = document.getElementById('show-select');
const pageNumbersBox = document.getElementById('page-numbers');
const prevBtn        = document.getElementById('prev-page');
const nextBtn        = document.getElementById('next-page');

/* ===== Form refs ===== */
const formContainer = document.getElementById('form-container');
const formTitle     = document.getElementById('form-title');
const formElement   = document.getElementById('employee-form');
const $             = (id) => document.getElementById(id);

let editId = null;           // null → add mode
let currentPage   = 1;       // pagination
let itemsPerPage  = 10;      // default (Show dropdown)
let filteredList  = [];      // holds search/sort/filter result

/* ===== Build one card ===== */
const buildCard = (emp) => `
  <article class="employee-card">
    <h3>${emp.firstName} ${emp.lastName}</h3>
    <p>Email: ${emp.email}</p>
    <p>Department: ${emp.department}</p>
    <p>Role: ${emp.role}</p>
    <div class="emp-actions">
      <button class="edit-btn"   data-id="${emp.id}">Edit</button>
      <button class="delete-btn" data-id="${emp.id}">Delete</button>
    </div>
  </article>`;

/* ===== RENDER LIST with pagination ===== */
function renderEmployees() {
  // 1. calculate slice indexes
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filteredList.slice(start, start + itemsPerPage);

  // 2. paint
  container.innerHTML = pageItems.map(buildCard).join('');

  // 3. build page buttons
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  pageNumbersBox.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active-page');
    btn.addEventListener('click', () => { currentPage = i; renderEmployees(); });
    pageNumbersBox.appendChild(btn);
  }
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

/* ===== SEARCH / SORT / SHOW / FILTER combo ===== */
function applyFilters() {
  const text   = searchInput.value.toLowerCase();
  const sortBy = sortSelect.value;           // '', 'firstName', 'department'
  itemsPerPage = parseInt(showSelect.value); // 10,25,50

  // initial filter (search)
  filteredList = mockEmployees.filter((e) =>
    (`${e.firstName} ${e.lastName} ${e.email}`).toLowerCase().includes(text)
  );

  // optional sort
  if (sortBy) {
    filteredList.sort((a, b) => {
      const A = a[sortBy] || '';
      const B = b[sortBy] || '';
      return A.localeCompare(B);
    });
  }

  currentPage = 1;          // reset to first page
  renderEmployees();        // paginate & display
}

/* ===== Delete ===== */
const deleteEmployee = (id) => {
  const idx = mockEmployees.findIndex((e) => e.id === id);
  if (idx !== -1) mockEmployees.splice(idx, 1);
  applyFilters();           // refresh list & pagination
};

/* ===== Form helpers (Add/Edit) – unchanged ===== */
const openForm = (mode, emp = {}) => {
  editId = mode === 'edit' ? emp.id : null;
  formTitle.textContent = mode === 'edit' ? 'Edit Employee' : 'Add Employee';
  $('firstName').value  = emp.firstName  || '';
  $('lastName').value   = emp.lastName   || '';
  $('email').value      = emp.email      || '';
  $('department').value = emp.department || '';
  $('role').value       = emp.role       || '';
  clearErrors();
  formContainer.style.display = 'block';
};
const closeForm   = () => formContainer.style.display = 'none';
const clearErrors = () => ['firstName','lastName','email','department','role']
  .forEach(id => $(`${id}Err`).textContent = '');
const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const validate = () => {
  let ok = true;
  const checks = [
    ['firstName',  (v)=>v.trim()!=='',  'Required'],
    ['lastName',   (v)=>v.trim()!=='',  'Required'],
    ['email',      (v)=>emailRe.test(v),'Invalid'],
    ['department', (v)=>v.trim()!=='' , 'Select dept'],
    ['role',       (v)=>v.trim()!=='' , 'Required']
  ];
  checks.forEach(([id,test,msg])=>{
    const val = $(`${id}`).value;
    if(!test(val)){ $(`${id}Err`).textContent=msg; ok=false;}
  });
  return ok;
};

/* ===== Initial Render ===== */
window.addEventListener('DOMContentLoaded', () => {
  filteredList = [...mockEmployees];
  renderEmployees();
});

/* ===== Live search, sort, show ===== */
searchInput.addEventListener('input',   applyFilters);
sortSelect .addEventListener('change',  applyFilters);
showSelect .addEventListener('change',  applyFilters);

/* ===== Pagination Prev/Next ===== */
prevBtn.addEventListener('click', () => { if (currentPage>1) { currentPage--; renderEmployees(); }});
nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  if (currentPage < totalPages) { currentPage++; renderEmployees(); }
});

/* ===== Add button ===== */
addBtn.addEventListener('click', () => openForm('add'));

/* ===== Edit & Delete (delegation) ===== */
container.addEventListener('click', (e) => {
  const { target } = e;
  if (target.matches('.delete-btn')) {
    const id = Number(target.dataset.id);
    if (confirm('Delete this employee?')) deleteEmployee(id);
  }
  if (target.matches('.edit-btn')) {
    const id  = Number(target.dataset.id);
    const emp = mockEmployees.find((x)=>x.id === id);
    if (emp) openForm('edit', emp);
  }
});

/* ===== Cancel ===== */
$('cancel-btn').addEventListener('click', closeForm);

/* ===== Save ===== */
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) return;
  const data = {
    firstName : $('firstName').value.trim(),
    lastName  : $('lastName').value.trim(),
    email     : $('email').value.trim(),
    department: $('department').value,
    role      : $('role').value.trim()
  };
  if (editId === null) mockEmployees.push({ id: Date.now(), ...data });
  else {
    const emp = mockEmployees.find((e)=>e.id===editId);
    Object.assign(emp, data);
  }
  closeForm();
  applyFilters();
});

/* ===== Filter Pop‑up logic (unchanged) ===== */
const filterBtn     = document.getElementById('filter-btn');
const filterOverlay = document.getElementById('filter-overlay');
const filterForm    = document.getElementById('filter-form');
const filterCancel  = document.getElementById('filter-cancel');
const showFilter = () => filterOverlay.style.display = 'flex';
const hideFilter = () => filterOverlay.style.display = 'none';
filterBtn.addEventListener('click', showFilter);
filterCancel.addEventListener('click', hideFilter);

filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameVal = $('filter-firstName').value.trim().toLowerCase();
  const deptVal = $('filter-department').value;
  const roleVal = $('filter-role').value.trim().toLowerCase();

  filteredList = mockEmployees.filter(emp => {
    const matchName = emp.firstName.toLowerCase().includes(nameVal);
    const matchDept = deptVal ? emp.department === deptVal : true;
    const matchRole = emp.role.toLowerCase().includes(roleVal);
    return matchName && matchDept && matchRole;
  });
  hideFilter();
  currentPage = 1;
  renderEmployees();
});
