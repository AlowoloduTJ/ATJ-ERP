# Data Isolation Test Guide

## 🎯 Quick Test (3 Steps)

### Step 1: Create Test Data as User A

1. **Open your app** at `http://localhost:3000`
2. **Navigate to** `/test-rls` (or click the link if available)
3. **Sign in** as `user-a@test.com` (or create this account if it doesn't exist)
4. **Create a few tasks:**
   - Click "Create Task"
   - Enter a task name (e.g., "User A's Secret Task")
   - Add a description (optional)
   - Click "Create Task"
   - Repeat 2-3 times with different task names

5. **Note what you created:**
   - Write down the task names you created
   - You should see them listed in "Your Tasks" section

---

### Step 2: Switch to User B

1. **Sign out completely:**
   - Click the UserButton (avatar) in the header
   - Click "Sign out"
   - Confirm you're signed out

2. **Sign in as User B:**
   - Go to `/sign-in`
   - Sign in as `user-b@test.com` (or create this account)
   - Complete onboarding if prompted

3. **Navigate to test page:**
   - Go to `/test-rls`
   - Look at the "Your Tasks" section

---

### Step 3: Verify Isolation

**Check these questions:**

1. ❌ **Can User B see User A's tasks?** 
   - Should be **NO** - User B should NOT see any tasks created by User A

2. ✅ **Can User B see only their own data?**
   - Should be **YES** - User B should only see tasks they create (or see nothing if they haven't created any)

3. ✅ **Isolation working?**
   - **YES** if User B cannot see User A's tasks
   - **NO** if User B can see User A's tasks (this means RLS is not working)

---

## 📊 Test Report Template

Fill this out after testing:

```
**User A Created:**
- Task 1: [name]
- Task 2: [name]
- Task 3: [name]

**User B Sees:**
- [List what User B can see - should be empty or only User B's tasks]

**Isolation Working?** YES / NO

**Notes:**
[Any observations or issues]
```

---

## 🔍 What to Look For

### ✅ **Success Indicators:**
- User A sees only their own tasks
- User B sees only their own tasks (or nothing)
- Each user's User ID is different
- Tasks show the correct `user_id` matching the logged-in user

### ❌ **Failure Indicators:**
- User B can see User A's tasks
- Tasks show wrong `user_id`
- Error messages about permissions
- 401 Unauthorized errors when authenticated

---

## 🛠️ Troubleshooting

### If User B can see User A's tasks:

1. **Check RLS policies are applied:**
   - Go to Supabase Dashboard
   - Navigate to Authentication → Policies
   - Verify `user_tasks` table has RLS enabled
   - Check policies use `(auth.jwt()->>'sub') = user_id`

2. **Check Supabase integration:**
   - Verify Clerk is configured as third-party auth in Supabase
   - Check that session tokens are being passed correctly

3. **Check API route:**
   - Verify `/api/test-rls` uses `createSupabaseClient()` from server.ts
   - Check that Clerk token is being passed to Supabase

### If you get errors:

- **401 Unauthorized:** Check that you're signed in
- **500 Internal Server Error:** Check browser console and server logs
- **Module not found:** Run `npm install` to ensure all packages are installed

---

## 📝 Additional Tests

### Test 4: Create Task as User B
1. While signed in as User B
2. Create a new task
3. Verify it appears in User B's task list
4. Verify it does NOT appear when you sign in as User A

### Test 5: Check User IDs
1. Note User A's User ID (shown on the test page)
2. Sign in as User B
3. Note User B's User ID
4. Verify they are different
5. Verify each task's `user_id` matches the logged-in user

---

## ✅ Expected Result

**If everything is working correctly:**
- Each user can only see and manage their own tasks
- Data is completely isolated between users
- RLS policies are enforcing security at the database level
- No user can access another user's data, even by manipulating API calls

**This confirms:**
- ✅ Row Level Security (RLS) is working
- ✅ Clerk authentication is properly integrated
- ✅ Supabase client is passing user context correctly
- ✅ Your app is secure and ready for production
