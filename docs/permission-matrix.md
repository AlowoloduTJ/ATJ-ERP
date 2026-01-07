# 🔐 Permission Matrix - ATJ-ERP

## 📊 Permission Types

| Permission | Description | Capabilities |
|------------|-------------|--------------|
| **Full** | Full access | Create, Read, Update, Delete all data |
| **View + Request** | View and create requests | Read all data, create requests/orders |
| **View** | Read-only access | Read data only, no modifications |
| **Self Only** | Own data only | Access only data related to self |
| **Request** | Request only | Can only create requests, no view |

## 📋 Permission Matrix by Module

### Warehouse Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All warehouse operations |
| Admin | Full | All warehouse operations |
| Manager | View + Request | View inventory, create purchase requests |
| Supervisor | View + Request | View inventory, create transfer requests |
| Staff | Self Only | View own requisitions only |
| Customer | - | No access |

### Production Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All production operations |
| Admin | Full | All production operations |
| Manager | View + Request | View orders, create production orders |
| Supervisor | View + Request | View orders, create material requisitions |
| Staff | Request | Create material requisitions only |
| Customer | Request | Create order requests only |

### Client Ledger Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All client ledger operations |
| Admin | Full | All client ledger operations |
| Manager | View + Request | View clients, create invoices |
| Supervisor | View + Request | View clients, create transactions |
| Staff | Self Only | View own client assignments only |
| Customer | - | No access |

### Customer Ledger Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All customer ledger operations |
| Admin | Full | All customer ledger operations |
| Manager | View + Request | View customers, create invoices |
| Supervisor | View + Request | View customers, process payments |
| Staff | View | View customer data only |
| Customer | View | View own account only |

### Division Ledger Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All division ledger operations |
| Admin | Full | All division ledger operations |
| Manager | View + Request | View divisions, create budgets |
| Supervisor | View + Request | View divisions, create expenses |
| Staff | Self Only | View own division expenses only |
| Customer | - | No access |

### Office Expenses Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All expense operations |
| Admin | Full | All expense operations |
| Manager | View + Request | View expenses, approve requests |
| Supervisor | View + Request | View expenses, create requests |
| Staff | Request | Create expense requests only |
| Customer | - | No access |

### Reimbursement Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All reimbursement operations |
| Admin | Full | All reimbursement operations |
| Manager | View + Request | View reimbursements, approve |
| Supervisor | View + Request | View reimbursements, create |
| Staff | Self Only | View and create own reimbursements |
| Customer | - | No access |

### HR Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All HR operations |
| Admin | Full | All HR operations |
| Manager | View + Request | View employees, approve leaves |
| Supervisor | View + Request | View team, create requests |
| Staff | Self Only | View own data, create leave requests |
| Customer | - | No access |

### Audit Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All audit operations |
| Admin | View | View audit trails only |
| Manager | View | View audit trails only |
| Supervisor | View | View audit trails only |
| Staff | - | No access |
| Customer | - | No access |

### Admin Panel Module

| Role | Permission | Access Level |
|------|------------|--------------|
| Super Admin | Full | All admin operations |
| Admin | Full | All admin operations |
| Manager | - | No access |
| Supervisor | - | No access |
| Staff | - | No access |
| Customer | - | No access |

## 🎯 Permission Assignment

### How Admins Grant Permissions

1. **Via Role Assignment** (Recommended)
   - Assign user to a role
   - Role has predefined permissions
   - User inherits role permissions

2. **Via Direct Permission** (Advanced)
   - Grant specific permissions to user
   - Override role permissions if needed
   - Use for custom access requirements

### Permission Hierarchy

1. **Super Admin** - Highest level, all access
2. **Admin** - Most access, limited super admin functions
3. **Manager** - Department/team oversight
4. **Supervisor** - Team management
5. **Staff** - Individual contributor
6. **Customer** - External access only

---

**Use this matrix to understand permission structure!** 🔐
