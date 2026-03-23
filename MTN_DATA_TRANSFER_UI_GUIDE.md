# 🎯 Where to See MTN Data Transfer Plans in the UI

## 📍 Exact Routes & Pages

### 1. **View All Plans (Pricing Page)**
**Route:** `/packages`  
**Component:** `ViewPricing.js` → `Pricing.js`  
**URL:** `http://localhost:3000/packages` or `https://your-domain.com/packages`

**What you'll see:**
- Table showing all available data plans
- Columns: Network, Size, Validity, Price
- MTN plans will show as "MTN" in the network column

**How to access:**
1. Login to your dashboard
2. Navigate to **"Packages"** or **"Pricing"** in the menu
3. OR directly visit: `http://localhost:3000/packages`

---

### 2. **Buy/Allocate Data Page**
**Route:** `/allocate`  
**Component:** `AllocateData.js`  
**URL:** `http://localhost:3000/allocate` or `https://your-domain.com/allocate`

**What you'll see:**
- Dropdown to select network provider
- Options include:
  - Airtel
  - GLO
  - **MTN SME** ← Your MTN Data Transfer plans
  - **MTN GIFTING**
  - 9MOBILE

**How to access:**
1. Login to your dashboard
2. Navigate to **"Allocate Data"** or **"Buy Data"** in the menu
3. OR directly visit: `http://localhost:3000/allocate`

**Steps to buy MTN Data Transfer:**
1. Select **"MTN SME"** or **"MTN GIFTING"** from Network Provider dropdown
2. Select data plan from the dropdown (will show available plans)
3. Enter phone number
4. Click "Allocate" button

---

### 3. **For Mega/Agent Users**
**Route:** `/allocate`  
**Component:** `AllocateDataMA.js` (different component for mega users)  
**URL:** Same as above

**User Types:**
- `mega` - Mega dealers
- `agent` - Agents
- `glo_dealer` - GLO dealers
- `glo_agent` - GLO agents
- Regular users

---

### 4. **Admin View**
**Route:** `/admin/packages` or `/admin/allocate`  
**Component:** Admin-specific components  
**URL:** `http://localhost:3000/admin/...`

---

## 🔍 Current Issue: Plans Not Showing?

### Why MTN Data Transfer Plans Might Not Appear:

The plans are fetched from your **database**, not directly from Autopilot API. You need to:

1. **Add MTN Data Transfer plans to your database**
2. **Set pricing for each plan**
3. **Assign plans to users**

---

## 📝 How to Add MTN Data Transfer Plans to Database

### Option 1: Via Admin Panel (if available)

Look for an admin route like:
- `/admin/pricing`
- `/admin/plans`
- `/admin/packages`

### Option 2: Via API Endpoint

Check if you have an endpoint to create plans:
```bash
POST /api/plans
{
  "plan_id": 1001,
  "network": "mtn",
  "plan_type": "data_transfer",
  "price": 135,
  "volume": 500,
  "unit": "mb",
  "validity": "30 days"
}
```

### Option 3: Direct Database Insert

You need to add plans to your MongoDB `plans` collection:

```javascript
// Example plan document
{
  "plan_id": 1001,
  "network": "mtn",
  "plan_type": "data_transfer",
  "price": 135,
  "volume": 500,
  "unit": "mb",
  "validity": "30 days"
}
```

---

## 🎯 Quick Test to See Current Plans

### Method 1: Check API Response

```bash
# Login first
curl -X POST http://localhost:YOUR_PORT/login \
  -H "Content-Type: application/json" \
  -d '{"username":"your_username","password":"your_password"}'

# Get plans (check your API for exact endpoint)
curl -X GET http://localhost:YOUR_PORT/api/plans \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Method 2: Check Browser Console

1. Open your dashboard: `http://localhost:3000/packages`
2. Open browser DevTools (F12)
3. Go to Console tab
4. Type: `localStorage.getItem('plans')` or check Network tab for API calls

### Method 3: Check Database Directly

```bash
# Connect to MongoDB
mongo

# Use your database
use your_database_name

# Find all plans
db.plans.find({ network: "mtn" })
```

---

## 🚀 Next Steps to See MTN Data Transfer in UI

### Step 1: Find How Plans Are Added

Look for these files:
- `wisper-reseller-api/src/controllers/plans.controller.js`
- `wisper-reseller-api/src/routes/plans.route.js`
- `wisper-reseller-api/src/services/plan.service.js`

### Step 2: Check Current Plans in Database

```javascript
// In your API, run this query
const plans = await Plan.find({ network: "mtn" });
console.log(plans);
```

### Step 3: Add MTN Data Transfer Plans

Based on Autopilot test results, add these plans:

| Plan ID | Network | Type | Size | Price | Validity |
|---------|---------|------|------|-------|----------|
| 1001 | mtn | data_transfer | 50MB | TBD | 30 days |
| 1002 | mtn | data_transfer | 100MB | TBD | 30 days |
| 1003 | mtn | data_transfer | 200MB | TBD | 30 days |
| 1004 | mtn | data_transfer | 500MB | TBD | 30 days |
| 1005 | mtn | data_transfer | 1GB | TBD | 30 days |
| 1006 | mtn | data_transfer | 2GB | TBD | 30 days |
| 1007 | mtn | data_transfer | 3GB | TBD | 30 days |
| 1008 | mtn | data_transfer | 5GB | TBD | 30 days |

---

## 📱 UI Navigation Summary

```
Dashboard Home
├── Packages (/packages) ← VIEW ALL PLANS HERE
├── Allocate Data (/allocate) ← BUY DATA HERE
│   └── Select Network: MTN SME or MTN GIFTING
│   └── Select Plan: (dropdown shows available plans)
│   └── Enter Phone Number
│   └── Click Allocate
├── Transactions (/transactions) ← VIEW PURCHASE HISTORY
├── Wallet (/wallet) ← CHECK BALANCE
└── Settings (/settings)
```

---

## 🔧 Troubleshooting

### Issue: "No plans available" or dropdown is empty

**Cause:** Plans not in database  
**Solution:** Add MTN Data Transfer plans to database

### Issue: "MTN SME" option not showing

**Cause:** Frontend hardcoded options  
**Solution:** Already there! Check line 217-221 in `AllocateData.js`

### Issue: Plans show but purchase fails

**Cause:** Backend integration issue  
**Solution:** Already fixed! Autopilot integration is working

### Issue: Price shows ₦0

**Cause:** Price not set in database  
**Solution:** Update plan prices in database

---

## 📞 Need Help Adding Plans?

Let me know and I can:
1. Find the exact endpoint/method to add plans
2. Create a script to bulk-add all MTN Data Transfer plans
3. Show you how to update the database directly

---

**Current Status:**
- ✅ Backend integration: WORKING
- ✅ API connection: WORKING  
- ✅ Frontend routes: EXIST
- ⏳ Database plans: NEED TO BE ADDED
- ⏳ Pricing: NEED TO BE SET

Once you add the plans to your database, they will automatically appear in the UI!
