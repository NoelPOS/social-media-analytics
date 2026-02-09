# Day 3 Data Dictionary
## Social Media Analytics Course - Application & Reporting

This document explains all datasets provided for Day 3 hands-on exercises.

---

## 📁 DATASET 1: campaign-analysis-data.csv

**Purpose:** Multi-channel campaign performance data for tracking and attribution exercises

**Time Period:** January 1-28, 2024 (4 weeks)

**Campaigns Included:**
- Winter_Sale (Jan 1-7)
- Spring_Preview (Jan 8-14)
- Influencer_Collab (Jan 15-21)
- Valentine_Launch (Jan 22-28)

**Use Cases:**
- Practice campaign tracking
- Calculate attribution across channels
- Compare campaign performance
- Calculate ROI and ROAS
- Identify best-performing channels

---

### Column Definitions

| Column | Data Type | Description | Example Values |
|--------|-----------|-------------|----------------|
| **Date** | Date | Date of campaign activity | 2024-01-01 |
| **Channel** | Text | Marketing channel used | Instagram, Facebook, TikTok, Email, Google_Ads |
| **Campaign** | Text | Campaign name | Winter_Sale, Spring_Preview, Influencer_Collab, Valentine_Launch |
| **Content_Type** | Text | Format of content | Reel, Video, Image, Carousel, Story, Newsletter, Search, Display, Shopping |
| **Impressions** | Number | Times content was displayed | 15000 - 145000 |
| **Reach** | Number | Unique users who saw content | Always ≤ Impressions |
| **Clicks** | Number | Link clicks generated | 280 - 2650 |
| **Engagements** | Number | Total interactions (likes, comments, shares, saves) | 280 - 10600 |
| **Conversions** | Number | Purchases or desired actions | 15 - 100 |
| **Spend** | Currency | Amount spent on channel/content (USD) | 0 - 800 |
| **Revenue** | Currency | Revenue attributed to this activity (USD) | 900 - 6000 |

---

### Key Metrics You Can Calculate

**Engagement Rate:**
```
(Engagements / Impressions) × 100
or
(Engagements / Reach) × 100
```

**Click-Through Rate (CTR):**
```
(Clicks / Impressions) × 100
```

**Conversion Rate:**
```
(Conversions / Clicks) × 100
```

**Cost Per Click (CPC):**
```
Spend / Clicks
```

**Cost Per Acquisition (CPA):**
```
Spend / Conversions
```

**Return on Ad Spend (ROAS):**
```
Revenue / Spend
```

**Return on Investment (ROI):**
```
((Revenue - Spend) / Spend) × 100
```

---

### Sample Analysis Questions

1. **Which campaign had the highest ROI?**
   - Sum Revenue and Spend by Campaign
   - Calculate ROI for each
   - Compare

2. **Which channel is most cost-effective?**
   - Calculate CPA by Channel
   - Compare across all channels
   - Consider conversion quality

3. **What content type performs best on Instagram?**
   - Filter for Instagram only
   - Compare Reel vs. Carousel vs. Story vs. Image
   - Look at engagement rate and conversions

4. **How should we attribute the Influencer_Collab success?**
   - Look at all touchpoints during Jan 15-21
   - Consider first-click, last-click, linear models
   - Calculate revenue credit by model

5. **What's the best day of week for email campaigns?**
   - Group Email channel by day of week
   - Compare conversion rates
   - Identify pattern

---

## 📁 DATASET 2: competitive-landscape-data.csv

**Purpose:** Competitive social media performance comparison

**Brands Included:**
- **YourBrand** (you) - Emerging, authentic, mid-range
- **ActiveWear** - Market leader, energetic, mid-range
- **SportStyle** - Strong challenger, aspirational, premium
- **FitGear** - Challenger, professional, premium
- **FlexFit** - Niche player, friendly, budget

**Use Cases:**
- Competitive analysis
- SWOT analysis
- Positioning strategy
- Benchmark your performance
- Identify competitive gaps

---

### Column Definitions

| Column | Data Type | Description | Example Values |
|--------|-----------|-------------|----------------|
| **Brand** | Text | Brand name | YourBrand, ActiveWear, SportStyle, FitGear, FlexFit |
| **Platform** | Text | Social media platform | Instagram, Facebook, TikTok, LinkedIn |
| **Followers** | Number | Total follower count | 8,000 - 285,000 |
| **Avg_Likes** | Number | Average likes per post | 210 - 15,400 |
| **Avg_Comments** | Number | Average comments per post | 15 - 820 |
| **Avg_Shares** | Number | Average shares per post | 6 - 1,250 |
| **Posts_Per_Week** | Number | Posting frequency | 1 - 10 |
| **Content_Type_Video_Pct** | Percentage | % of content that's video | 15% - 98% |
| **Response_Time_Hours** | Number | Avg hours to respond to comments | 6 - 72 |
| **Brand_Voice** | Text | Brand personality | Professional, Energetic, Aspirational, Friendly, Authentic |
| **Price_Point** | Text | Price positioning | Budget, Mid-Range, Premium |
| **Market_Position** | Text | Competitive position | Leader, Strong, Challenger, Emerging, Niche |

---

### Key Metrics You Can Calculate

**Engagement Rate:**
```
((Avg_Likes + Avg_Comments + Avg_Shares) / Followers) × 100
```

**Engagement Per Post:**
```
Avg_Likes + Avg_Comments + Avg_Shares
```

**Weekly Total Engagement:**
```
Engagement_Per_Post × Posts_Per_Week
```

**Engagement Efficiency:**
```
(Engagement_Per_Post / Followers) × 100,000
(Engagement per 100K followers - normalizes for size)
```

---

### Sample Analysis Questions

1. **Who has the highest engagement rate?**
   - Calculate engagement rate for each brand on each platform
   - Compare YourBrand to competitors
   - Identify leaders

2. **What's the relationship between posting frequency and engagement?**
   - Plot Posts_Per_Week vs. Engagement_Rate
   - Look for patterns
   - Identify optimal frequency

3. **Does video content correlate with better performance?**
   - Compare Content_Type_Video_Pct to engagement metrics
   - Find correlation
   - Determine video strategy

4. **Where do you have competitive advantages?**
   - Find metrics where YourBrand outperforms competitors
   - Identify your strengths
   - Build on these

5. **What opportunities exist in the market?**
   - Find underutilized tactics (e.g., low video %, poor response time)
   - Identify gaps you can fill
   - Develop strategy

---

### Competitive Positioning Matrix Data

Use this data to create 2×2 positioning matrices:

**Size vs. Engagement:**
- X-axis: Followers (size)
- Y-axis: Engagement Rate (quality)
- Plot all 5 brands

**Price vs. Quality:**
- X-axis: Price_Point (Budget=1, Mid-Range=2, Premium=3)
- Y-axis: Engagement_Rate or Avg_Engagement_Per_Post
- Plot all 5 brands

**Video Investment vs. Results:**
- X-axis: Content_Type_Video_Pct
- Y-axis: Engagement_Rate
- Identify video ROI leaders

---

## 📁 DATASET 3: roi-scenarios-data.csv

**Purpose:** Investment scenarios for ROI calculation practice

**Investment Types:**
- **Software:** Tools and platforms
- **Hiring:** Team members
- **Content:** Production and creation
- **Training:** Education and development
- **Advertising:** Paid campaigns

**Use Cases:**
- Calculate ROI for different investments
- Compare investment options
- Prioritize budget allocation
- Build business cases
- Justify spending decisions

---

### Column Definitions

| Column | Data Type | Description | Example Values |
|--------|-----------|-------------|----------------|
| **Scenario** | Text | Investment name | Scheduling_Tool, Part_Time_Manager, Analytics_Course |
| **Investment_Type** | Text | Category of investment | Software, Hiring, Content, Training, Advertising |
| **Cost_Monthly** | Currency | Monthly cost (USD) | 29 - 5,000 |
| **Cost_Annual** | Currency | Annual cost (USD) | 348 - 60,000 |
| **Time_Saved_Hours_Monthly** | Number | Hours saved per month | 0 - 80 |
| **Revenue_Increase_Monthly** | Currency | Expected monthly revenue increase (USD) | 0 - 25,000 |
| **Engagement_Increase_Pct** | Percentage | Expected engagement increase | 0% - 40% |
| **Follower_Growth_Monthly** | Number | Expected new followers per month | 0 - 1,500 |
| **Other_Benefits** | Text | Qualitative benefits | Consistency, Better insights, Professional credibility |
| **Risk_Level** | Text | Risk assessment | Low, Medium, High |

---

### ROI Calculation Approaches

**Approach 1: Simple Financial ROI**
```
Monthly Benefit = Revenue_Increase_Monthly + (Time_Saved_Hours_Monthly × Your_Hourly_Rate)
Monthly ROI = ((Monthly_Benefit - Cost_Monthly) / Cost_Monthly) × 100
```

**Approach 2: Annual ROI**
```
Annual Benefit = (Revenue_Increase_Monthly × 12) + (Time_Saved_Hours_Monthly × 12 × Hourly_Rate)
Annual ROI = ((Annual_Benefit - Cost_Annual) / Cost_Annual) × 100
```

**Approach 3: Comprehensive Value**
```
Total Monthly Value = 
  Revenue_Increase_Monthly 
  + (Time_Saved_Hours_Monthly × Hourly_Rate)
  + (Follower_Growth_Monthly × Value_Per_Follower)
  + Value_of_Other_Benefits

ROI = ((Total_Monthly_Value - Cost_Monthly) / Cost_Monthly) × 100
```

---

### Sample Analysis Questions

1. **Which software tool has the best ROI?**
   - Filter for Investment_Type = "Software"
   - Calculate ROI for each
   - Consider time savings value
   - Compare

2. **Should we hire a part-time manager or use tools?**
   - Compare Part_Time_Manager to relevant software
   - Calculate ROI for both
   - Consider qualitative factors
   - Make recommendation

3. **What's the payback period for a training course?**
   - Payback Period = Cost / Monthly Benefit
   - Example: Analytics_Course
   - How many months to break even?

4. **How do you value follower growth?**
   - Research industry LTV (Lifetime Value)
   - Example: If follower worth $2
   - Multiply Follower_Growth_Monthly × $2
   - Add to revenue calculation

5. **How does risk affect investment decisions?**
   - Group by Risk_Level
   - Calculate average ROI by risk level
   - Determine risk-adjusted returns
   - Consider risk tolerance

---

### Risk-Adjusted ROI

**Formula:**
```
Risk-Adjusted ROI = Calculated_ROI × Risk_Multiplier

Risk Multipliers:
- Low Risk: 1.0 (use full ROI)
- Medium Risk: 0.8 (discount 20%)
- High Risk: 0.6 (discount 40%)
```

**Example:**

**Strategy_Consultant:**
- Calculated ROI: 300%
- Risk Level: High
- Risk-Adjusted ROI: 300% × 0.6 = 180%

**Scheduling_Tool:**
- Calculated ROI: 1,150%
- Risk Level: Low
- Risk-Adjusted ROI: 1,150% × 1.0 = 1,150%

Even after risk adjustment, might prefer high-ROI, low-risk option.

---

## 💡 HOW TO USE THESE DATASETS

### In Excel / Google Sheets

**Opening Files:**
1. Open Excel/Sheets
2. File → Open
3. Select .csv file
4. Data will auto-populate

**Analysis Tools:**
- Pivot Tables (Insert → PivotTable)
- SUMIF, AVERAGEIF, COUNTIF functions
- Charts and graphs
- Conditional formatting

**Tips:**
- Freeze top row for column headers
- Format currency columns as $
- Format percentages as %
- Use color coding for insights

---

### Sample Exercises

**Exercise 1: Campaign ROI Comparison**
```
Using campaign-analysis-data.csv:
1. Create pivot table with Campaign in Rows
2. Sum Revenue and Spend
3. Calculate ROI column: ((Revenue-Spend)/Spend)×100
4. Sort by ROI descending
5. Identify winner and explain why
```

**Exercise 2: Competitive Positioning Matrix**
```
Using competitive-landscape-data.csv:
1. Filter for Instagram only
2. Calculate engagement rate: ((Likes+Comments+Shares)/Followers)×100
3. Create scatter plot: X=Followers, Y=Engagement_Rate
4. Plot all 5 brands
5. Analyze your position and opportunities
```

**Exercise 3: Investment Prioritization**
```
Using roi-scenarios-data.csv:
1. Assume your hourly rate is $50
2. Calculate monthly benefit for each scenario
3. Calculate ROI for each
4. Filter for budget <$2,000/month
5. Recommend top 3 investments
```

---

## 📊 DATA QUALITY NOTES

**Realistic but Simplified:**
- Data has been simplified for teaching purposes
- Real campaigns are messier and more complex
- Use this to learn concepts, not as industry truth

**Assumptions Made:**
- All revenue is directly attributable (in reality, harder to track)
- Email channel has $0 spend (may have platform costs in reality)
- Conversion value is consistent ($60 average order)
- Follower counts are stable during period

**What's Not Included:**
- Brand awareness metrics
- Customer lifetime value variations
- Seasonality factors (except campaign themes)
- Competitive advertising spend
- Algorithm changes mid-period

**Best Practices:**
- Round financial calculations to nearest dollar
- Use percentages for rates (not decimals)
- Document your assumptions
- Explain your methodology
- Consider qualitative factors

---

## 🔍 ADVANCED ANALYSIS IDEAS

### Multi-Touch Attribution

Using campaign-analysis-data.csv, simulate customer journey:

**Scenario:** Customer sees Instagram ad (Day 1), clicks email (Day 3), converts via Facebook retargeting (Day 5)

**Calculate credit using different models:**
1. Last-click: 100% to Facebook
2. First-click: 100% to Instagram
3. Linear: 33.3% each
4. Time-decay: 20% / 30% / 50%
5. Position-based: 40% / 20% / 40%

Compare how channel performance looks under each model.

---

### Competitive Share of Voice

Using competitive-landscape-data.csv:

**Formula:**
```
Brand_SOV = (Brand_Total_Engagement / All_Brands_Total_Engagement) × 100
```

Calculate for each platform. Visualize as pie chart.

---

### Incremental ROI Analysis

Using roi-scenarios-data.csv:

**Question:** If you can only invest $5,000/month, what combination maximizes ROI?

**Approach:**
1. Calculate ROI for each scenario
2. Sort by ROI (highest first)
3. Select combinations within budget
4. Calculate combined impact
5. Recommend optimal portfolio

**Example Portfolio:**
- Scheduling_Tool: $49/month, 1,150% ROI
- Design_Tool_Pro: $29/month, 940% ROI
- Video_Editor: $79/month, 542% ROI
- Analytics_Platform: $199/month, 1,157% ROI
- Influencer_Platform: $299/month, 2,576% ROI
- Total: $655/month
- Remaining budget: $4,345 → Consider Part_Time_Manager ($3,000/month) + Professional_Photos ($800/month)

---

## 📚 REFERENCE

**Dataset Summary:**

| Dataset | Rows | Columns | Time Period | Primary Use |
|---------|------|---------|-------------|-------------|
| campaign-analysis-data.csv | 140 | 11 | Jan 1-28, 2024 | Campaign tracking, attribution |
| competitive-landscape-data.csv | 20 | 12 | Snapshot | Competitive analysis, SWOT |
| roi-scenarios-data.csv | 25 | 10 | Hypothetical | Investment decisions, ROI |

**Total Data Points:** 3,155 individual data points across all datasets

**Suggested Analysis Time:**
- Campaign analysis: 30-45 minutes
- Competitive analysis: 20-30 minutes
- ROI scenarios: 25-35 minutes

---

**Questions about the data?** Ask your instructor or refer to Day 3 resources document.

**Data Issues?** Check that:
- Files are saved as .csv
- No extra rows at top/bottom
- Columns are properly separated by commas
- Currency values don't have $ symbols (just numbers)
- Dates are formatted consistently
