# Component Stubs Reference

This document lists all component files that need to be created to complete the ERP structure. The folder structure is in place, and you can create these components as needed.

## Common Components ✅
- [x] Header.tsx
- [x] Sidebar.tsx
- [x] Footer.tsx
- [x] Navbar.tsx
- [x] LoadingSpinner.tsx
- [x] Modal.tsx
- [x] Table.tsx
- [x] Pagination.tsx
- [x] SearchBar.tsx
- [x] FilterDropdown.tsx
- [x] DatePicker.tsx
- [x] AlertMessage.tsx
- [x] ConfirmDialog.tsx
- [x] PrintButton.tsx

## Auth Components ✅
- [x] LoginForm.tsx
- [x] ProtectedRoute.tsx
- [ ] LogoutButton.tsx
- [ ] PasswordReset.tsx
- [ ] SessionTimeout.tsx

## Dashboard Components ✅
- [x] DashboardHome.tsx
- [ ] StatsCard.tsx
- [ ] RecentActivities.tsx
- [ ] QuickActions.tsx
- [ ] NotificationsPanel.tsx
- [ ] SystemHealth.tsx

## Warehouse Components ✅
- [x] WarehouseDashboard.tsx
- [ ] InventoryList.tsx
- [ ] InventoryDetails.tsx
- [ ] AddInventoryForm.tsx
- [ ] EditInventoryForm.tsx
- [ ] BulkPurchaseForm.tsx
- [ ] BulkPurchaseList.tsx
- [ ] BulkPurchaseDetails.tsx
- [ ] SupplierList.tsx
- [ ] SupplierForm.tsx
- [ ] StockTransferForm.tsx
- [ ] StockTransferHistory.tsx
- [ ] StockAlerts.tsx
- [ ] ReorderLevel.tsx
- [ ] WarehouseReports.tsx
- [ ] InventoryValuation.tsx

## Production Components ✅
- [x] ProductionDashboard.tsx
- [ ] ProductionOrderList.tsx
- [ ] ProductionOrderForm.tsx
- [ ] ProductionOrderDetails.tsx
- [ ] MaterialRequisition.tsx
- [ ] MaterialRequisitionList.tsx
- [ ] MaterialRequisitionApproval.tsx
- [ ] ProductionSchedule.tsx
- [ ] WorkInProgress.tsx
- [ ] FinishedGoods.tsx
- [ ] QualityControl.tsx
- [ ] ProductionReports.tsx
- [ ] WastageTracking.tsx
- [ ] ProductionEfficiency.tsx

## Ledger Components
### Clients
- [ ] ClientLedgerDashboard.tsx
- [ ] ClientList.tsx
- [ ] ClientForm.tsx
- [ ] ClientDetails.tsx
- [ ] ClientTransactions.tsx
- [ ] ClientInvoices.tsx
- [ ] ClientPayments.tsx
- [ ] ClientStatement.tsx
- [ ] ClientAgingReport.tsx

### Customers
- [ ] CustomerLedgerDashboard.tsx
- [ ] CustomerList.tsx
- [ ] CustomerForm.tsx
- [ ] CustomerDetails.tsx
- [ ] CustomerTransactions.tsx
- [ ] CustomerOrders.tsx
- [ ] CustomerPayments.tsx
- [ ] CustomerStatement.tsx
- [ ] CustomerAgingReport.tsx

### Office Divisions
- [ ] DivisionLedgerDashboard.tsx
- [ ] DivisionList.tsx
- [ ] DivisionForm.tsx
- [ ] DivisionBudget.tsx
- [ ] DivisionExpenses.tsx
- [ ] DivisionTransactions.tsx
- [ ] DivisionReports.tsx

### Office Expenses
- [ ] ExpenseDashboard.tsx
- [ ] ExpenseList.tsx
- [ ] ExpenseForm.tsx
- [ ] ExpenseCategories.tsx
- [ ] ExpenseApproval.tsx
- [ ] RecurringExpenses.tsx
- [ ] ExpenseReports.tsx
- [ ] BudgetVsActual.tsx

### Reimbursements
- [ ] ReimbursementDashboard.tsx
- [ ] ReimbursementRequestForm.tsx
- [ ] ReimbursementList.tsx
- [ ] ReimbursementApproval.tsx
- [ ] ReimbursementRetirement.tsx
- [ ] RetirementForm.tsx
- [ ] PendingRetirements.tsx
- [ ] RetirementHistory.tsx
- [ ] ReimbursementReports.tsx

### General Ledger
- [ ] GeneralLedger.tsx
- [ ] ChartOfAccounts.tsx
- [ ] JournalEntries.tsx
- [ ] TrialBalance.tsx
- [ ] IncomeStatement.tsx
- [ ] BalanceSheet.tsx
- [ ] CashFlowStatement.tsx

## HR Components
### Employees
- [ ] EmployeeList.tsx
- [ ] EmployeeForm.tsx
- [ ] EmployeeDetails.tsx
- [ ] EmployeeDocuments.tsx
- [ ] EmployeeHistory.tsx

### Attendance
- [ ] AttendanceDashboard.tsx
- [ ] AttendanceLog.tsx
- [ ] AttendanceReport.tsx
- [ ] OvertimeTracking.tsx

### Leave
- [ ] LeaveRequest.tsx
- [ ] LeaveApproval.tsx
- [ ] LeaveBalance.tsx
- [ ] LeaveCalendar.tsx

### Payroll
- [ ] PayrollDashboard.tsx
- [ ] SalaryStructure.tsx
- [ ] PayrollProcessing.tsx
- [ ] PayslipGeneration.tsx
- [ ] PayrollHistory.tsx
- [ ] TaxCalculations.tsx

### Departments
- [ ] DepartmentList.tsx
- [ ] DepartmentForm.tsx
- [ ] DepartmentStructure.tsx

### Reports
- [ ] HRReports.tsx
- [ ] HeadcountReport.tsx
- [ ] TurnoverReport.tsx

## Audit Components
### Trails
- [ ] AuditTrailList.tsx
- [ ] AuditTrailDetails.tsx
- [ ] AuditTrailFilter.tsx
- [ ] UserActivityLog.tsx
- [ ] SystemActivityLog.tsx
- [ ] LoginHistory.tsx

### Reports
- [ ] AuditReports.tsx
- [ ] ComplianceReport.tsx
- [ ] ExceptionReport.tsx
- [ ] ReconciliationReport.tsx
- [ ] AnomalyDetection.tsx

### Reviews
- [ ] PendingReviews.tsx
- [ ] ReviewDetails.tsx
- [ ] ReviewComments.tsx
- [ ] ReviewHistory.tsx

### Compliance
- [ ] ComplianceChecklist.tsx
- [ ] PolicyDocuments.tsx
- [ ] ComplianceCalendar.tsx

## Admin Components
### Users
- [ ] UserManagement.tsx
- [ ] UserList.tsx
- [ ] UserForm.tsx
- [ ] UserPermissions.tsx
- [ ] UserActivityLog.tsx

### Roles
- [ ] RoleManagement.tsx
- [ ] RoleList.tsx
- [ ] RoleForm.tsx
- [ ] RolePermissions.tsx

### Settings
- [ ] SystemSettings.tsx
- [ ] CompanyProfile.tsx
- [ ] EmailSettings.tsx
- [ ] NotificationSettings.tsx
- [ ] BackupSettings.tsx
- [ ] SecuritySettings.tsx

### Approvals
- [ ] PendingApprovals.tsx
- [ ] ApprovalWorkflow.tsx
- [ ] ApprovalHistory.tsx
- [ ] ApprovalSettings.tsx

### Data Management
- [ ] DataImport.tsx
- [ ] DataExport.tsx
- [ ] DataBackup.tsx
- [ ] DataRestore.tsx

## Notes
- All components should use TypeScript
- Use "use client" directive for client components
- Import shadcn/ui components from "@/components/ui/"
- Use the common components for consistency
- Follow the established patterns in existing components
