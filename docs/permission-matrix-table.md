# 🔐 Permission Matrix Table

## Complete Matrix: Modules × Roles

| Module | Super Admin | Admin | Manager | Supervisor | Staff | Customer |
|--------|-------------|-------|---------|------------|-------|----------|
| **Warehouse** | Full | Full | View + Request | View + Request | Self Only | - |
| **Production** | Full | Full | View + Request | View + Request | Request | Request |
| **Client Ledger** | Full | Full | View + Request | View + Request | Self Only | - |
| **Customer Ledger** | Full | Full | View + Request | View + Request | View | View |
| **Division Ledger** | Full | Full | View + Request | View + Request | Self Only | - |
| **Office Expenses** | Full | Full | View + Request | View + Request | Request | - |
| **Reimbursement** | Full | Full | View + Request | View + Request | Self Only | - |
| **HR** | Full | Full | View + Request | View + Request | Self Only | - |
| **Audit** | Full | View | View | View | - | - |
| **Admin Panel** | Full | Full | - | - | - | - |

## Legend

- **Full** = Full access (Create, Read, Update, Delete)
- **View + Request** = Can view all data and create requests
- **View** = Read-only access
- **Self Only** = Can only access own data
- **Request** = Can only create requests
- **-** = No access

## Permission Details

### Full Access
- ✅ Create new records
- ✅ Read all records
- ✅ Update all records
- ✅ Delete records
- ✅ Approve/reject requests

### View + Request
- ✅ Read all records
- ✅ Create new requests/orders
- ✅ View own requests
- ❌ Cannot update/delete others' data
- ❌ Cannot approve requests (unless manager)

### View Only
- ✅ Read all records
- ❌ Cannot create/update/delete
- ❌ Cannot create requests

### Self Only
- ✅ Read own records only
- ✅ Create requests for self
- ✅ Update own records
- ❌ Cannot view others' data

### Request Only
- ✅ Create requests/orders
- ✅ View own requests
- ❌ Cannot view other data
- ❌ Cannot update/delete

---

**Reference this table for permission assignments!** 📊
