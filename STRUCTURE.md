# ATJ-ERP Project Structure

This document outlines the complete folder structure for the ATJ-ERP project, adapted for Next.js 15 with TypeScript and App Router.

## 📁 Project Structure

```
atj-erp/
├── 📁 public/
│   └── 📁 assets/
│       ├── 📁 images/
│       └── 📁 fonts/
│
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 api/                # API Routes
│   │   │   ├── 📁 auth/
│   │   │   ├── 📁 warehouse/
│   │   │   ├── 📁 production/
│   │   │   ├── 📁 ledger/
│   │   │   ├── 📁 hr/
│   │   │   ├── 📁 audit/
│   │   │   └── 📁 admin/
│   │   ├── 📁 dashboard/          # Dashboard pages
│   │   ├── 📁 warehouse/          # Warehouse pages
│   │   ├── 📁 production/         # Production pages
│   │   ├── 📁 ledger/             # Ledger pages
│   │   ├── 📁 hr/                 # HR pages
│   │   ├── 📁 audit/              # Audit pages
│   │   ├── 📁 admin/              # Admin pages
│   │   ├── 📁 login/              # Login page
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Landing page
│   │   └── globals.css            # Global styles
│   │
│   ├── 📁 components/
│   │   ├── 📁 ui/                 # shadcn/ui components
│   │   ├── 📁 common/              # Common components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterDropdown.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── AlertMessage.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   └── PrintButton.tsx
│   │   ├── 📁 auth/               # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── LogoutButton.tsx
│   │   │   ├── PasswordReset.tsx
│   │   │   ├── SessionTimeout.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── 📁 dashboard/           # Dashboard components
│   │   ├── 📁 warehouse/           # Warehouse components
│   │   ├── 📁 production/           # Production components
│   │   ├── 📁 ledger/              # Ledger components
│   │   │   ├── 📁 clients/
│   │   │   ├── 📁 customers/
│   │   │   ├── 📁 office-divisions/
│   │   │   ├── 📁 office-expenses/
│   │   │   ├── 📁 reimbursements/
│   │   │   └── 📁 general/
│   │   ├── 📁 hr/                  # HR components
│   │   │   ├── 📁 employees/
│   │   │   ├── 📁 attendance/
│   │   │   ├── 📁 leave/
│   │   │   ├── 📁 payroll/
│   │   │   ├── 📁 departments/
│   │   │   └── 📁 reports/
│   │   ├── 📁 audit/               # Audit components
│   │   │   ├── 📁 trails/
│   │   │   ├── 📁 reports/
│   │   │   ├── 📁 reviews/
│   │   │   └── 📁 compliance/
│   │   └── 📁 admin/               # Admin components
│   │       ├── 📁 users/
│   │       ├── 📁 roles/
│   │       ├── 📁 settings/
│   │       ├── 📁 approvals/
│   │       └── 📁 data-management/
│   │
│   ├── 📁 hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   ├── usePagination.ts
│   │   ├── useForm.ts
│   │   ├── useTable.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useSessionTimeout.ts
│   │   └── useNetworkStatus.ts
│   │
│   ├── 📁 context/                 # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── PermissionContext.tsx
│   │
│   ├── 📁 services/                # API service layer
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── warehouseService.ts
│   │   ├── productionService.ts
│   │   ├── ledgerService.ts
│   │   ├── hrService.ts
│   │   ├── auditService.ts
│   │   └── adminService.ts
│   │
│   ├── 📁 utils/                   # Utility functions
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── dateUtils.ts
│   │   ├── currencyUtils.ts
│   │   ├── permissions.ts
│   │   └── printUtils.ts
│   │
│   ├── 📁 types/                    # TypeScript type definitions
│   │   └── index.ts
│   │
│   └── 📁 lib/                      # Library code
│       ├── utils.ts                 # shadcn/ui utils
│       └── api.ts                   # API utilities
│
├── 📁 docs/                         # Documentation
│   └── concept.md
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── README.md
```

## 🚀 Next Steps

### Components to Create

The following components need to be created (stubs are in place):

1. **Warehouse Components** - Inventory management, bulk purchases, suppliers, stock transfers
2. **Production Components** - Production orders, material requisitions, WIP tracking
3. **Ledger Components** - Client/customer ledgers, expenses, reimbursements, general ledger
4. **HR Components** - Employee management, attendance, leave, payroll
5. **Audit Components** - Audit trails, reports, reviews, compliance
6. **Admin Components** - User management, roles, settings, approvals

### API Routes to Implement

Create API route handlers in `src/app/api/` for:
- Authentication endpoints
- CRUD operations for each module
- Report generation endpoints
- File upload/download endpoints

### Services to Complete

Implement service methods in `src/services/` for:
- Warehouse operations
- Production management
- Ledger transactions
- HR operations
- Audit logging
- Admin functions

### Hooks to Add

Create additional hooks:
- `useForm.ts` - Form state management
- `useTable.ts` - Table operations
- `useDebounce.ts` - Debounced values
- `useLocalStorage.ts` - Local storage management
- `useSessionTimeout.ts` - Session management
- `useNetworkStatus.ts` - Network status detection

## 📝 Notes

- All components use TypeScript
- Components are client-side by default (use "use client" directive)
- API routes use Next.js App Router API route handlers
- Authentication is handled via AuthContext and ProtectedRoute
- shadcn/ui components are used for consistent UI
- The structure follows Next.js 15 best practices
