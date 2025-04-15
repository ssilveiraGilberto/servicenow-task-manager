// ======================================================================================
// Script: GlideRecord Study with Task Manager App
// Table: x_12345_task_manager_tasks
// Goal: Understand how to query records using GlideRecord
// ======================================================================================


// ======================================================================================
// GlideRecord is a special object used to interact with the database in ServiceNow.
// It allows you to perform CRUD operations (Create, Read, Update, Delete).
// This line initializes a GlideRecord object for the custom table 'Tasks',
// meaning we’re preparing to work with records from that table.
// ======================================================================================
let glideRecord = new GlideRecord('x_1716651_task_m_0_tasks');

// ======================================================================================
// 1. Basic query using addQuery()
// Adds a single condition (status = Open)
// This is readable and commonly used in scripts (recommended for clarity)
// ======================================================================================
glideRecord.addQuery('status', 'Open');

// ======================================================================================
// 2. Adding OR condition with addOrCondition()
// This allows us to retrieve tasks with priority High OR Urgent
// Note: This must be chained with a queryCondition variable
// ======================================================================================
let glideRecordCondition = glideRecord.addQuery('priority', 'High');
glideRecordCondition.addOrCondition('priority', 'Urgent');

// ======================================================================================
// 3. Encoded query using addEncodedQuery()
// This is a compact version of multiple conditions
// Equivalent to: status = Open AND (priority = High OR Urgent)
// Use this when copying filters directly from the UI (list view)
// ======================================================================================
glideRecord.addEncodedQuery('status=Open^priority=High^ORpriority=Urgent');

// ======================================================================================
// Query execution
// This runs the SELECT under the hood and prepares the result set
// ======================================================================================
glideRecord.query();

// ======================================================================================
// Loop through all matching records
// Each .next() moves the pointer to the next record in the result set
// ======================================================================================
while (glideRecord.next()) {
	// getValue() returns the raw value (often sys_id for references)
	let taskName = glideRecord.getValue('task_name');
	let status = glideRecord.getValue('status');
	let priority = glideRecord.getValue('priority');
  
	// getDisplayValue() returns the user-friendly label (e.g., "Open", "High")
	let assignedTo = glideRecord.getDisplayValue('assigned_to'); // gets the full name, not sys_id
	
	gs.info("Task: " + taskName + " | Status: " + status + " | Priority: " + priority + " | Assigned To: " + assignedTo);
}