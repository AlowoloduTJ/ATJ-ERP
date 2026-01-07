# 🔧 MCP Servers Workflow Guide - ATJ-ERP

## 🎯 Overview

This guide explains how Linear, Supabase, and Chrome DevTools MCP servers work together in your daily development workflow for ATJ-ERP.

---

## 🔄 Realistic Development Workflow

### Scenario: Building a New Feature

**Example:** "Add user permission management UI"

#### Step 1: Linear MCP - Plan & Track Work
```
1. Check current sprint tasks
2. Create/assign task for "Permission Management UI"
3. Link to related issues
4. Track progress
```

**What Linear MCP Provides:**
- ✅ View current sprint tasks
- ✅ Create and update issues
- ✅ Track time and progress
- ✅ Link related work items
- ✅ Get task details and descriptions

#### Step 2: Supabase MCP - Understand Database
```
1. Query users table structure
2. Check roles and permissions tables
3. Understand relationships
4. Verify data exists for testing
```

**What Supabase MCP Provides:**
- ✅ Query database tables directly
- ✅ View table schemas and relationships
- ✅ Run SQL queries
- ✅ Check data without leaving Cursor
- ✅ Understand foreign key relationships

#### Step 3: Chrome DevTools MCP - Test & Verify
```
1. Open app at /admin/permissions
2. Take screenshot of current state
3. Test UI interactions
4. Verify changes work correctly
5. Check performance metrics
```

**What Chrome DevTools MCP Provides:**
- ✅ Open browser to specific URLs
- ✅ Take screenshots
- ✅ Analyze performance
- ✅ Test user interactions
- ✅ Debug issues visually

---

## 📊 How They Work Together

### Daily Development Cycle

```
┌─────────────────────────────────────────────────────────┐
│                   1. LINEAR MCP                          │
│  • Check what to work on today                          │
│  • Get task details and requirements                    │
│  • Update task status as you work                       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                   2. SUPABASE MCP                       │
│  • Understand database structure                        │
│  • Query existing data                                  │
│  • Verify relationships                                 │
│  • Test queries before coding                           │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                   3. CODE IMPLEMENTATION                 │
│  • Write code based on Linear task                      │
│  • Use Supabase insights for queries                    │
│  • Implement feature                                    │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                   4. CHROME DEVTOOLS MCP                │
│  • Open app and test feature                            │
│  • Take screenshots for documentation                   │
│  • Verify UI looks correct                              │
│  • Check performance                                    │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                   5. BACK TO LINEAR                     │
│  • Mark task as complete                                │
│  • Add screenshots/notes                                │
│  • Move to next task                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Unique Value of Each MCP Server

### 1. Linear MCP - Project Management

**What It Does:**
- Connects to your Linear workspace
- Manages tasks, issues, and sprints
- Tracks progress and time

**When to Use:**
- ✅ Start of day: Check what to work on
- ✅ Before coding: Get task requirements
- ✅ During work: Update progress
- ✅ After completion: Mark done, add notes
- ✅ Planning: Create new tasks

**Key Benefits:**
- **Context Switching:** No need to leave Cursor to check Linear
- **Task Details:** Get full requirements without opening browser
- **Progress Tracking:** Update status as you work
- **Documentation:** Link code changes to Linear issues

**Example Commands:**
```
"Show me tasks in current sprint"
"Create a task for permission management UI"
"Update task status to in progress"
"Link this code change to Linear issue XYZ"
```

---

### 2. Supabase MCP - Database Management

**What It Does:**
- Connects to your Supabase database
- Queries tables and views
- Understands schema and relationships
- Runs SQL queries

**When to Use:**
- ✅ Before coding: Understand database structure
- ✅ During development: Query data for testing
- ✅ Debugging: Check what data exists
- ✅ Planning: Understand relationships
- ✅ Verification: Confirm data changes

**Key Benefits:**
- **No SQL Editor Needed:** Query database from Cursor
- **Quick Insights:** Get table info instantly
- **Data Verification:** Check data without leaving editor
- **Relationship Mapping:** Understand foreign keys easily

**Example Commands:**
```
"Show me all tables in the database"
"What columns does the users table have?"
"Show me relationships for the permissions table"
"Query all active users"
"Check if role_permissions has any data"
```

---

### 3. Chrome DevTools MCP - Testing & Verification

**What It Does:**
- Controls Chrome browser
- Opens URLs and takes screenshots
- Analyzes performance
- Tests user interactions

**When to Use:**
- ✅ After coding: Test your changes
- ✅ Before commit: Verify UI looks correct
- ✅ Documentation: Take screenshots
- ✅ Debugging: See visual issues
- ✅ Performance: Check load times

**Key Benefits:**
- **Visual Verification:** See actual UI without manual testing
- **Screenshots:** Document changes automatically
- **Performance:** Check metrics quickly
- **Automation:** Test workflows programmatically

**Example Commands:**
```
"Open localhost:3000 and take a screenshot"
"Navigate to /admin/permissions and screenshot"
"Check performance metrics for the homepage"
"Test the login form submission"
```

---

## 🔄 Integrated Workflow Examples

### Example 1: Building a New Feature

**Task:** "Add inventory search functionality"

1. **Linear MCP:**
   ```
   "Show me the inventory search task"
   → Get requirements: "Add search bar to inventory list"
   ```

2. **Supabase MCP:**
   ```
   "Show me the inventory table structure"
   → Understand: name, sku, category_id columns
   "Query inventory items to see sample data"
   → See what data exists for testing
   ```

3. **Code Implementation:**
   - Build search component
   - Add filtering logic
   - Connect to Supabase queries

4. **Chrome DevTools MCP:**
   ```
   "Open /warehouse and take screenshot"
   → Verify search bar appears
   "Test searching for 'widget'"
   → Verify results show correctly
   ```

5. **Back to Linear:**
   ```
   "Mark inventory search task as complete"
   "Attach screenshot to task"
   ```

---

### Example 2: Debugging an Issue

**Issue:** "Users can't see their permissions"

1. **Linear MCP:**
   ```
   "Show me the permission visibility bug"
   → Get issue details and steps to reproduce
   ```

2. **Supabase MCP:**
   ```
   "Query users table for test user"
   → Check user exists
   "Query role_permissions for user's role"
   → Verify permissions are assigned
   "Check if permissions table has data"
   → Verify permissions exist
   ```

3. **Code Investigation:**
   - Check permission query logic
   - Verify role assignment
   - Fix bug in permission check

4. **Chrome DevTools MCP:**
   ```
   "Open /admin/permissions as test user"
   → See what user actually sees
   "Take screenshot of permission page"
   → Document the issue
   "Test after fix"
   → Verify permissions now show
   ```

5. **Linear:**
   ```
   "Update bug status: fixed"
   "Add fix details and screenshot"
   ```

---

### Example 3: Performance Optimization

**Task:** "Improve homepage load time"

1. **Linear MCP:**
   ```
   "Show me performance optimization tasks"
   → Get requirements and target metrics
   ```

2. **Chrome DevTools MCP:**
   ```
   "Open localhost:3000 and analyze performance"
   → Get current metrics:
     - FCP: 2.5s
     - LCP: 3.0s
     - TTI: 4.0s
   "Take screenshot of performance report"
   → Document baseline
   ```

3. **Code Optimization:**
   - Convert to Server Components
   - Optimize images
   - Reduce bundle size

4. **Chrome DevTools MCP (After):**
   ```
   "Re-analyze performance"
   → Verify improvements:
     - FCP: 1.8s (improved!)
     - LCP: 2.2s (improved!)
     - TTI: 2.8s (improved!)
   "Take screenshot of new metrics"
   → Document improvement
   ```

5. **Linear:**
   ```
   "Mark optimization task complete"
   "Add before/after screenshots"
   "Note: 30% improvement in load times"
   ```

---

## 📋 Quick Reference: When to Use Each Tool

### Use Linear MCP When:
- ✅ Starting work (check tasks)
- ✅ Planning features (create tasks)
- ✅ Tracking progress (update status)
- ✅ Documenting work (add notes/screenshots)
- ✅ Reviewing sprint (see what's done)

### Use Supabase MCP When:
- ✅ Understanding database (table structure)
- ✅ Writing queries (test before coding)
- ✅ Debugging data issues (check what exists)
- ✅ Verifying changes (confirm data updates)
- ✅ Planning features (understand relationships)

### Use Chrome DevTools MCP When:
- ✅ Testing changes (verify UI works)
- ✅ Taking screenshots (documentation)
- ✅ Performance analysis (check metrics)
- ✅ Visual debugging (see actual UI)
- ✅ User experience testing (test interactions)

---

## 🎯 Best Practices

### 1. Start with Linear
Always check Linear first to know what to work on.

### 2. Understand with Supabase
Before coding, query the database to understand the data.

### 3. Test with Chrome DevTools
After coding, verify visually and check performance.

### 4. Document in Linear
Attach screenshots and notes to Linear tasks.

### 5. Iterate Quickly
Use all three tools in rapid cycles for fast development.

---

## 🚀 Getting Started

### Setup Checklist

- [ ] Linear MCP configured in `.cursor/mcp.json`
- [ ] Supabase MCP configured (already done: `svtlzyfmzeizkxeigbzc`)
- [ ] Chrome DevTools MCP configured
- [ ] Test each MCP server individually
- [ ] Practice integrated workflow

### Test Each MCP

**Linear:**
```
"Show me my current sprint tasks"
```

**Supabase:**
```
"List all tables in my database"
```

**Chrome DevTools:**
```
"Open localhost:3000 and take a screenshot"
```

---

## 💡 Pro Tips

1. **Use Linear for Context:** Always know what you're working on
2. **Use Supabase for Data:** Understand your database before coding
3. **Use Chrome for Verification:** See actual results, not just code
4. **Document Everything:** Screenshots in Linear help later
5. **Iterate Fast:** Use all three tools in quick cycles

---

**These three MCP servers create a powerful development workflow that keeps you in Cursor while managing projects, understanding data, and verifying results!** 🚀
