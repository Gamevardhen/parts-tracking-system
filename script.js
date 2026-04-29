const db = window.supabase.createClient(
  "https://oicyguvhemegbnovpach.supabase.co",
  "sb_publishable_ce6CLn7vax8OypFWU5kGkA_XbAZPzGW"
);

async function addRecord() {
  const record = {
    machine: document.getElementById("machine").value,
    operator: document.getElementById("operator").value,
    part: document.getElementById("part").value,
    qty: parseInt(document.getElementById("qty").value),
    status: document.getElementById("status").value
  };

  const { error } = await db.from("Parts").insert([record]);

  if (error) {
    alert("Error: " + error.message);
    console.error(error);
    return;
  }

  alert("Saved successfully!");

  document.getElementById("machine").value = "";
  document.getElementById("operator").value = "";
  document.getElementById("part").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("status").value = "Needed";

  loadData();
}

async function loadData() {
  const { data, error } = await db
    .from("Parts")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  const table = document.getElementById("table");

  table.innerHTML = `
    <tr>
      <th>No</th>
      <th>Machine</th>
      <th>Operator</th>
      <th>Part</th>
      <th>Qty</th>
      <th>Status</th>
    </tr>
  `;

  data.forEach((r, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${r.machine}</td>
        <td>${r.operator}</td>
        <td>${r.part}</td>
        <td>${r.qty}</td>
        <td>${r.status}</td>
      </tr>
    `;
  });
}

loadData();