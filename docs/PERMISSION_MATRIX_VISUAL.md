# 🔐 Permission Matrix - Visual Guide

## Complete Permission Matrix

| Module | Super Admin | Admin | Manager | Supervisor | Staff | Customer |
|--------|-------------|-------|---------|------------|-------|----------|
| **Warehouse** | ✅ Full | ✅ Full | 📋 View + Request | 📋 View + Request | 👤 Self Only | ❌ No Access |
| **Production** | ✅ Full | ✅ Full | 📋 View + Request | 📋 View + Request | 📝 Request | 📝 Request |
| **Client Ledger** | ✅ Full | ✅ Full | 📋 View + Request | 📋 View + Request | 👤 Self Only | ❌ No Access |
| **Customer Ledger** | ✅ Full | ✅ Full | 📋 View + Request | 📋 View + Request | 👁️ View | 👁️ View |
| **Division Ledger** | ✅ Full | ✅ Full | 📋 View + Request | 📋 View + Request | 👤 Self Only | ❌ No Access |
| **Office Expenses** | ✅ Full | ✅ Full | 📋 View + Request | 📋 View + Request | 📝 Request | ❌ No Access |
| **Reimbursement** | ✅ Full | ✅ Full | 📋 View + Request | 📋 View + Request | 👤 Self Only | ❌ No Access |
| **HR** | ✅ Full | ✅ Full | 📋 View + Request | 📋 View + Request | 👤 Self Only | ❌ No Access |
| **Audit** | ✅ Full | 👁️ View | 👁️ View | 👁️ View | ❌ No Access | ❌ No Access |
| **Admin Panel** | ✅ Full | ✅ Full | ❌ No Access | ❌ No Access | ❌ No Access | ❌ No Access |

## Legend

- ✅ **Full** = Complete access (Create, Read, Update, Delete, Approve)
- 📋 **View + Request** = Can view all data and create requests/orders
- 👁️ **View** = Read-only access
- 👤 **Self Only** = Can only access own data
- 📝 **Request** = Can only create requests
- ❌ **No Access** = Cannot access this module

## Permission Details by Type

### ✅ Full Access
**Capabilities:**
- ✅ Create new records
- ✅ Read all records
- ✅ Update all records
- ✅ Delete records
- ✅ Approve/reject requests
- ✅ Manage settings

**Who Has It:**
- Super Admin: All modules
- Admin: All modules except super admin functions

### 📋 View + Request
**Capabilities:**
- ✅ Read all records
- ✅ Create new requests/orders
- ✅ View own requests
- ✅ Update own requests
- ❌ Cannot update/delete others' data
- ❌ Cannot approve requests (unless manager)

**Who Has It:**
- Manager: Most modules
- Supervisor: Assigned modules

### 👁️ View Only
**Capabilities:**
- ✅ Read all records
- ❌ Cannot create/update/delete
- ❌ Cannot create requests

**Who Has It:**
- Manager: Audit module
- Supervisor: Audit module
- Admin: Audit module
- Staff: Customer Ledger
- Customer: Customer Ledger

### 👤 Self Only
**Capabilities:**
- ✅ Read own records only
- ✅ Create requests for self
- ✅ Update own records
- ❌ Cannot view others' data

**Who Has It:**
- Staff: Warehouse, Client Ledger, Division Ledger, Reimbursement, HR

### 📝 Request Only
**Capabilities:**
- ✅ Create requests/orders
- ✅ View own requests
- ❌ Cannot view other data
- ❌ Cannot update/delete

**Who Has It:**
- Staff: Production, Office Expenses
- Customer: Production

## Module-Specific Permissions

### Warehouse Module
- **Super Admin/Admin:** Full control over inventory, suppliers, purchases
- **Manager/Supervisor:** View inventory, create purchase requests
- **Staff:** View own requisitions only

### Production Module
- **Super Admin/Admin:** Full control over production orders
- **Manager/Supervisor:** View orders, create production orders
- **Staff/Customer:** Create order requests only

### Ledger Modules (Client/Customer/Division)
- **Super Admin/Admin:** Full control over financial records
- **Manager/Supervisor:** View records, create transactions
- **Staff:** View own assignments (Client/Division) or view all (Customer)
- **Customer:** View own account (Customer Ledger only)

### Office Expenses
- **Super Admin/Admin:** Full control
- **Manager/Supervisor:** View and create expense requests
- **Staff:** Create expense requests only

### Reimbursement
- **Super Admin/Admin:** Full control
- **Manager/Supervisor:** View and approve reimbursements
- **Staff:** View and create own reimbursements

### HR Module
- **Super Admin/Admin:** Full control
- **Manager/Supervisor:** View employees, approve leaves
- **Staff:** View own data, create leave requests

### Audit Module
- **Super Admin:** Full access
- **Admin/Manager/Supervisor:** View audit trails only
- **Staff/Customer:** No access

### Admin Panel
- **Super Admin/Admin:** Full access
- **All Others:** No access

---

**Use this matrix to understand and assign permissions!** 🔐
