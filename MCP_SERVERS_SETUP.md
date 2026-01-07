# 🔧 MCP Servers Setup Guide

## 📋 Current Status

### ✅ Configured
- **Supabase MCP:** Configured in `.cursor/mcp.json`
  - Project: `svtlzyfmzeizkxeigbzc`
  - Read-only mode enabled

### ⏳ To Configure
- **Linear MCP:** Needs configuration
- **Chrome DevTools MCP:** Needs configuration

---

## 🔧 Configuration Guide

### 1. Supabase MCP (Already Done ✅)

**File:** `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp?project_ref=svtlzyfmzeizkxeigbzc&read_only=true"
    }
  }
}
```

**Status:** ✅ Configured

---

### 2. Linear MCP (To Configure)

**Requirements:**
- Linear API key
- Linear workspace ID

**Configuration:**
```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": [
        "-y",
        "@linear/mcp-server"
      ],
      "env": {
        "LINEAR_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**How to Get API Key:**
1. Go to Linear Settings → API
2. Create Personal API Key
3. Copy the key
4. Add to `.cursor/mcp.json`

**Test:**
```
"Show me my current sprint tasks"
```

---

### 3. Chrome DevTools MCP (To Configure)

**Requirements:**
- Chrome/Chromium installed
- Chrome DevTools Protocol enabled

**Configuration:**
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-chrome-devtools"
      ]
    }
  }
}
```

**Test:**
```
"Open localhost:3000 and take a screenshot"
```

---

## 🧪 Testing All Three Together

### Test Workflow

1. **Linear Test:**
   ```
   "Show me the first task in my current sprint"
   ```

2. **Supabase Test:**
   ```
   "List all tables in my database and show their relationships"
   ```

3. **Chrome DevTools Test:**
   ```
   "Open localhost:3000 and take a screenshot of the homepage"
   ```

---

## 📚 Documentation

- **Workflow Guide:** `MCP_SERVERS_WORKFLOW_GUIDE.md`
- **This Setup Guide:** `MCP_SERVERS_SETUP.md`

---

**Configure Linear and Chrome DevTools MCP to complete the setup!** 🚀
