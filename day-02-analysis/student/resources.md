# Day 2 Student Resources: Analysis and Visualization

## 📚 Comprehensive Reference Guide

This document serves as your complete reference for Day 2 concepts. Bookmark it and refer back often!

---

## 📊 TABLE OF CONTENTS

1. [Formula Reference](#formula-reference)
2. [Trend Analysis Guide](#trend-analysis-guide)
3. [Sentiment Analysis Framework](#sentiment-analysis-framework)
4. [Chart Selection Decision Tree](#chart-selection-decision-tree)
5. [Visualization Best Practices](#visualization-best-practices)
6. [Dashboard Design Principles](#dashboard-design-principles)
7. [Excel/Sheets Tips](#excelsheets-tips)
8. [Color Scheme Guide](#color-scheme-guide)
9. [Troubleshooting Common Issues](#troubleshooting-common-issues)
10. [Additional Learning Resources](#additional-learning-resources)

---

<a name="formula-reference"></a>
## 📐 SECTION 1: Formula Reference

### Essential Formulas

**Engagement Rate**
```
Engagement Rate = (Total Engagements / Reach) × 100

Where: Total Engagements = Likes + Comments + Shares + Saves

Example:
(855 / 12,000) × 100 = 7.125%
```

**Engagement per 1,000 Followers**
```
Eng. per 1K = (Total Engagements / Followers) × 1,000

Example:
(855 / 25,000) × 1,000 = 34.2 per 1K
```

**Weighted Engagement**
```
Weighted = (Likes × 1) + (Comments × 3) + (Shares × 5)

Example:
(100 × 1) + (20 × 3) + (5 × 5) = 185

Note: Weights can be adjusted based on business goals
```

**Growth Rate**
```
Growth Rate = (New Value - Old Value) / Old Value × 100

Example:
(6,800 - 6,200) / 6,200 × 100 = 9.68%
```

**Compound Annual Growth Rate (CAGR)**
```
CAGR = ((Ending Value / Beginning Value)^(1/Years)) - 1

Example (3 years):
((15,000 / 10,000)^(1/3)) - 1 = 0.1447 = 14.47%
```

**Sentiment Score**
```
Sentiment Score = (Positive - Negative) / Total × 100

Example:
(8 - 6) / 20 × 100 = +10

Interpretation Scale:
+50 to +100: Very Positive
+10 to +50:  Positive
-10 to +10:  Neutral/Mixed
-50 to -10:  Negative
-100 to -50: Very Negative
```

**Average (Mean)**
```
Average = Sum of All Values / Count of Values

Excel: =AVERAGE(A1:A10)
Sheets: =AVERAGE(A1:A10)
```

**Median (Middle Value)**
```
Median = Middle value when sorted

Excel: =MEDIAN(A1:A10)
Sheets: =MEDIAN(A1:A10)
```

**Percent Change**
```
% Change = ((New - Old) / Old) × 100

For decreases, result will be negative
```

**Conversion Rate**
```
Conversion Rate = (Conversions / Total Clicks) × 100

Example:
(45 / 500) × 100 = 9%
```

**Click-Through Rate (CTR)**
```
CTR = (Clicks / Impressions) × 100

Example:
(250 / 10,000) × 100 = 2.5%
```

---

<a name="trend-analysis-guide"></a>
## 📈 SECTION 2: Trend Analysis Guide

### Four Main Trend Types

#### 1. Linear Trend

**Characteristics:**
- Consistent growth or decline
- Same absolute change each period
- Straight line when graphed

**Example:**
```
Month 1: 1,000 (+100)
Month 2: 1,100 (+100)
Month 3: 1,200 (+100)
Month 4: 1,300 (+100)
```

**When You See It:**
- Mature, stable accounts
- Consistent posting strategy
- Predictable audience growth

**What to Do:**
- Continue current strategy
- Look for ways to accelerate
- Monitor for plateau signals

**Formula to Check:**
```
If (Month 2 - Month 1) ≈ (Month 3 - Month 2), it's linear
```

---

#### 2. Exponential Trend

**Characteristics:**
- Accelerating growth
- Each period grows faster than last
- Curved upward line when graphed

**Example:**
```
Month 1: 1,000 (+500 = 50%)
Month 2: 1,500 (+750 = 50%)
Month 3: 2,250 (+1,125 = 50%)
Month 4: 3,375 (+1,688 = 50%)
```

**When You See It:**
- Viral content
- Influencer mentions
- Algorithm boost
- Paid campaigns working

**What to Do:**
- Identify what's working
- Replicate successful content
- Prepare for inevitable slowdown
- Capture momentum while it lasts

**Warning:**
Exponential growth is rarely sustainable long-term. Enjoy it but plan for deceleration.

**Formula to Check:**
```
If % growth rate is consistent, it's exponential
```

---

#### 3. Seasonal Trend

**Characteristics:**
- Repeating pattern
- Cyclical highs and lows
- Pattern repeats at regular intervals

**Example:**
```
Q1 2024: 45,000 (low)
Q2 2024: 38,000 (low)
Q3 2024: 52,000 (high)
Q4 2024: 68,000 (high)
Q1 2025: 47,000 (low - repeat)
Q2 2025: 40,000 (low - repeat)
```

**Common Causes:**
- Holiday seasons (retail)
- School calendar (education)
- Weather (outdoor brands)
- Industry events (conferences)
- Day-of-week patterns

**What to Do:**
- Plan around the pattern
- Don't fight seasonality
- Budget accordingly
- Prepare content in advance for peaks
- Adjust expectations during valleys

**How to Identify:**
```
Look for repeating peaks and valleys
Compare year-over-year same periods
```

---

#### 4. Declining Trend

**Characteristics:**
- Decreasing over time
- Negative growth
- Downward sloping line

**Example:**
```
Month 1: 10,000 (-500)
Month 2: 9,500 (-700)
Month 3: 8,800 (-600)
Month 4: 8,200 (-700)
```

**Common Causes:**
- Algorithm changes
- Increased competition
- Content fatigue
- Inactive audience
- Negative sentiment

**What to Do:**
- URGENT: Investigate cause
- Audit content quality
- Check for negative sentiment
- Analyze competitor strategies
- Consider content refresh
- May need strategy overhaul

**Red Flags:**
- Decline > 10% month-over-month
- Consistent decline for 3+ months
- Accelerating decline

---

### Trend Analysis Checklist

When analyzing trends, ask:

**Data Quality:**
- [ ] Do I have enough data points? (minimum 6-12)
- [ ] Is the data consistent? (same measurement method)
- [ ] Are there any outliers? (one-time events)

**Pattern Identification:**
- [ ] What's the overall direction? (up/down/flat)
- [ ] Is growth rate consistent or changing?
- [ ] Are there repeating patterns?
- [ ] Any sudden spikes or drops?

**Context:**
- [ ] What was happening during this period?
- [ ] Any campaigns, events, or changes?
- [ ] External factors (holidays, news, competitors)?

**Action:**
- [ ] Is this sustainable?
- [ ] What should we do differently?
- [ ] What should we keep doing?
- [ ] What's the prediction for next period?

---

<a name="sentiment-analysis-framework"></a>
## 💬 SECTION 3: Sentiment Analysis Framework

### Sentiment Scoring System

#### Basic Three-Category System

**Positive Indicators:**
- Praise words: amazing, excellent, love, best, perfect
- Enthusiasm: exclamation marks, caps, emojis (😍, 🎉, ❤️)
- Recommendations: "highly recommend," "must try"
- Purchase intent: "just ordered," "buying this"
- Problem solved: "this fixed my issue"

**Neutral Indicators:**
- Questions (without complaint)
- Information seeking
- Statements without emotion
- "Interesting," "okay," "fine"
- Acknowledging receipt

**Negative Indicators:**
- Complaints: "disappointed," "waste," "regret"
- Problems: "broke," "didn't work," "poor quality"
- Anger: "worst," "terrible," "horrible"
- Warnings: "don't buy," "save your money"
- Negative emojis: 😞, 😡, 🙄

---

### Sentiment Intensity Scale

**5-Point Scale:**
```
+2: Very Positive ("AMAZING!!! Best ever!")
+1: Positive ("Good product, happy with it")
 0: Neutral ("When will this ship?")
-1: Negative ("Not great, expected better")
-2: Very Negative ("Terrible. Total waste of money.")
```

**When to Use:**
- Nuanced analysis needed
- Comparing similar products
- Tracking sentiment over time
- Weighted sentiment (intensity matters)

---

### Context Matters: Edge Cases

**Mixed Sentiment:**
```
"Love the design but hate the price"
→ Code as dominant (in this case, mixed or slight negative)
→ OR code both aspects separately
```

**Sarcasm:**
```
"Oh great, another delay 🙄"
→ Negative (despite "great")
→ Look for: eye-roll emoji, "Oh great," ellipses
```

**Conditional Positive:**
```
"It's good IF you follow instructions carefully"
→ Weakly positive (comes with caveat)
```

**Questions with Frustration:**
```
"Why is this so expensive???"
→ Negative (implied complaint)
vs.
"How much does this cost?"
→ Neutral (just asking)
```

**Polite Complaints:**
```
"I'm sure it's great for some people, just not for me"
→ Negative (disappointment despite politeness)
```

---

### Sentiment Analysis Workflow

**Step 1: Read Thoroughly**
- Don't skim
- Note tone and context
- Look for emojis and punctuation

**Step 2: Identify Primary Emotion**
- What's the dominant feeling?
- Positive, neutral, or negative?

**Step 3: Consider Intensity**
- How strong is the sentiment?
- Mild disappointment vs. outrage?

**Step 4: Note Context**
- Is this about product, service, shipping, price?
- Can be coded separately

**Step 5: Score Consistently**
- Use same criteria for all comments
- When in doubt, use neutral

**Step 6: Track Patterns**
- Are negative comments about same issue?
- Common themes in positive comments?

---

### Business Applications

**Customer Service Priority:**
```
Very Negative (-2): URGENT response needed
Negative (-1): Respond within 24 hours
Neutral (0): Respond with helpful info
Positive (+1): Thank and nurture
Very Positive (+2): Request testimonial, build relationship
```

**Product Development:**
- Cluster negative comments by theme
- Most mentioned issues = development priorities
- Positive themes = features to emphasize

**Marketing Messaging:**
- Use language from positive comments
- Address concerns from negative comments
- Neutral questions = education opportunities

---

### Sentiment Score Interpretation Guide

| Score | Classification | Action Required |
|-------|---------------|-----------------|
| +80 to +100 | Excellent | Maintain, amplify |
| +50 to +79 | Very Good | Continue strategy |
| +20 to +49 | Good | Minor improvements |
| +10 to +19 | Slightly Positive | Monitor closely |
| -9 to +9 | Mixed/Neutral | Investigate issues |
| -10 to -19 | Slightly Negative | Address problems |
| -20 to -49 | Negative | Significant action needed |
| -50 to -79 | Very Negative | Crisis response |
| -80 to -100 | Critical | Emergency intervention |

---

<a name="chart-selection-decision-tree"></a>
## 📊 SECTION 4: Chart Selection Decision Tree

### The Ultimate Chart Selector

```
START: What are you trying to show?

┌─ CHANGE OVER TIME?
│  └─ YES → LINE CHART
│     Examples: Follower growth, engagement trends, daily metrics
│     When: Continuous time data, looking for patterns
│
├─ COMPARING CATEGORIES?
│  └─ YES → BAR CHART (or COLUMN CHART)
│     Examples: Platform comparison, content type performance
│     When: Discrete categories, want to see which is highest
│     Tip: Horizontal bars if labels are long
│
├─ PARTS OF A WHOLE?
│  └─ YES → PIE CHART (if 3-5 categories) or BAR CHART
│     Examples: Demographics breakdown, traffic sources
│     When: Percentages add to 100%, limited categories
│     Warning: More than 5 slices? Use bar chart instead
│
├─ RELATIONSHIP BETWEEN TWO VARIABLES?
│  └─ YES → SCATTER PLOT
│     Examples: Posting frequency vs. engagement
│     When: Looking for correlation, each dot is a data point
│     Add: Trendline to show relationship
│
├─ PATTERNS ACROSS TWO DIMENSIONS?
│  └─ YES → HEATMAP
│     Examples: Best posting time (day × hour)
│     When: Grid of values, want to see hot/cold spots
│     Color: Red (high) → Yellow → Green (low) OR reversed
│
└─ CUMULATIVE OVER TIME?
   └─ YES → AREA CHART
      Examples: Total revenue over time, stacked categories
      When: Emphasizing volume, showing contribution
```

---

### Chart Type Detailed Guide

#### LINE CHART

**Best For:**
- Trends over time
- Continuous data
- Multiple series comparison

**Do:**
- ✅ Use for 3+ time periods
- ✅ Keep lines distinct (different colors)
- ✅ Label axes clearly
- ✅ Add data labels for key points

**Don't:**
- ❌ Use for non-time data
- ❌ Plot more than 5 lines (gets messy)
- ❌ Use 3D effects

**Example Use Cases:**
- Follower growth over 12 months
- Engagement rate daily for 30 days
- Website traffic weekly for a year

---

#### BAR/COLUMN CHART

**Best For:**
- Comparing discrete categories
- Showing differences in magnitude
- Rankings

**Do:**
- ✅ Sort bars (highest to lowest) usually
- ✅ Use horizontal bars for long labels
- ✅ Keep bars same width
- ✅ Use consistent colors or highlight key bar

**Don't:**
- ❌ Use too many bars (max ~10-12)
- ❌ Use different colors without meaning
- ❌ Start Y-axis at non-zero (misleading)

**Example Use Cases:**
- Engagement by platform (4-5 bars)
- Performance of 10 recent posts
- Sales by product category

---

#### PIE CHART

**Best For:**
- Parts of a whole (must add to 100%)
- Limited categories (3-5 max)
- Showing proportions

**Do:**
- ✅ Start largest slice at 12 o'clock
- ✅ Use for 3-5 categories only
- ✅ Label percentages
- ✅ Use distinct colors

**Don't:**
- ❌ Use for more than 5 categories
- ❌ Use 3D effects (distorts perception)
- ❌ Use for data that doesn't sum to 100%
- ❌ Make multiple pies to compare (use bar chart)

**When to Skip:**
If you're thinking "maybe a pie chart," probably use a bar chart instead. Pie charts are hard to read accurately.

**Example Use Cases:**
- Market share (3-4 companies)
- Age demographics (4 groups)
- Traffic sources (4-5 sources)

---

#### SCATTER PLOT

**Best For:**
- Correlation between two variables
- Finding patterns in data
- Identifying outliers

**Do:**
- ✅ Add trendline if correlation exists
- ✅ Label interesting points
- ✅ Use consistent dot size/color
- ✅ Label both axes clearly

**Don't:**
- ❌ Use when no relationship expected
- ❌ Overcrowd (too many points)
- ❌ Forget to add trendline

**Example Use Cases:**
- Posts per week vs. engagement rate
- Follower count vs. average likes
- Ad spend vs. conversions

**Reading the Results:**
- Upward slope = positive correlation
- Downward slope = negative correlation
- Scattered everywhere = no correlation

---

#### HEATMAP

**Best For:**
- Patterns across two dimensions
- Time-based analysis (day/hour)
- Volume comparison in grid

**Do:**
- ✅ Use intuitive color scheme (red=hot, blue=cold)
- ✅ Include legend
- ✅ Label both dimensions
- ✅ Use consistent scale

**Don't:**
- ❌ Use too many colors (3-5 is ideal)
- ❌ Use red/green only (colorblind issue)
- ❌ Make it too large (hard to read)

**Example Use Cases:**
- Best day/hour to post (7 days × 24 hours)
- Engagement by month and content type
- Website activity by source and page

---

#### AREA CHART

**Best For:**
- Volume over time
- Cumulative totals
- Stacked categories showing contribution

**Do:**
- ✅ Use for time series data
- ✅ Good for showing magnitude/volume
- ✅ Works well stacked

**Don't:**
- ❌ Use when line chart is clearer
- ❌ Stack too many categories (hard to read)

**Example Use Cases:**
- Revenue growth over time
- Traffic by source over time (stacked)
- Cumulative follower growth

---

### Quick Reference Table

| Question | Chart Type | 2nd Choice |
|----------|-----------|------------|
| How has X changed? | Line | Area |
| Which is biggest? | Bar | Column |
| What's the breakdown? | Pie (if 3-5) | Bar |
| Are X and Y related? | Scatter | N/A |
| When is best time? | Heatmap | Bar |
| How much total? | Area | Line |
| Who's winning? | Bar (sorted) | N/A |

---

<a name="visualization-best-practices"></a>
## 🎨 SECTION 5: Visualization Best Practices

### The 5 Core Principles

#### 1. Clarity Above All

**The 5-Second Rule:**
If someone can't understand your chart in 5 seconds, it's too complex.

**Checklist:**
- [ ] Clear, descriptive title
- [ ] Labeled axes (what and units)
- [ ] Legend if needed (but try to label directly)
- [ ] Readable font size (min 10pt)
- [ ] One main message per chart

**Bad Example:**
"Chart A" (title)
No axis labels
Tiny text (6pt)
10 different metrics

**Good Example:**
"Engagement Rate Increased 30% in Q2 2024" (title)
Y-axis: "Engagement Rate (%)"
X-axis: "Month"
Font: 12pt
Focus: One metric

---

#### 2. Data-Ink Ratio (Edward Tufte)

**Definition:**
Maximize the proportion of ink used for data vs. decoration.

**Remove:**
- ❌ 3D effects
- ❌ Unnecessary gridlines
- ❌ Heavy borders
- ❌ Background images
- ❌ Decorative elements
- ❌ Redundant labels
- ❌ Chart junk

**Keep:**
- ✅ Data points
- ✅ Essential labels
- ✅ Minimal gridlines (if helpful)
- ✅ Clean background (white/light gray)

**Before:** Chart with 3D bars, gridlines, border, gradient fill
**After:** Flat 2D bars, minimal gridlines, no border, solid colors

**Calculation:**
```
Data-Ink Ratio = Ink used for data / Total ink used
Goal: As close to 1.0 as possible
```

---

#### 3. Color With Purpose

**Color Rules:**

**DO Use Color To:**
- ✅ Highlight important data
- ✅ Group related items
- ✅ Show positive/negative (green/red)
- ✅ Create visual hierarchy
- ✅ Match brand guidelines

**DON'T:**
- ❌ Use rainbow colors randomly
- ❌ Rely on color alone (add labels)
- ❌ Use red/green only (colorblind people exist)
- ❌ Use too many colors (max 5-7)

**Color Schemes:**

**Sequential (Low to High):**
Light Blue → Dark Blue
Use for: Heatmaps, graduated data

**Diverging (Negative to Positive):**
Red → White → Green
Use for: Positive/negative comparison, changes

**Categorical (Distinct Groups):**
Blue, Orange, Green, Purple
Use for: Different categories/platforms

**Accessibility:**
- 8% of men are colorblind (red-green common)
- Use patterns + color
- Test with grayscale
- Use colorblind-friendly palettes

**Colorblind-Friendly Palette:**
```
Blue: #0072B2
Orange: #E69F00
Green: #009E73
Purple: #CC79A7
Yellow: #F0E442
```

---

#### 4. Honest Scales

**Y-Axis Best Practices:**

**For Bar Charts:**
- ✅ START AT ZERO
- This is critical for honest comparison
- Starting elsewhere exaggerates differences

**Example of Manipulation:**
```
Bad: Y-axis from 95-100
Makes 96 vs 100 look 10x different
It's only 4% different!

Good: Y-axis from 0-100
Shows true scale
```

**For Line Charts:**
- Can start at non-zero IF:
  - You clearly mark the break
  - Context requires focus on small changes
  - You're not comparing magnitudes

**Intervals:**
- Use consistent intervals (0, 10, 20, 30...)
- Not: 0, 10, 25, 35, 50 (confusing!)

**Truncation:**
If you must truncate:
- Show break in axis (wavy line)
- Explain in caption
- Use sparingly

---

#### 5. Add Context

**Make Data Meaningful:**

**Add:**
- ✅ Benchmarks (industry average)
- ✅ Targets/goals
- ✅ Previous period comparison
- ✅ Annotations for events
- ✅ Data source and date

**Example:**

**Without Context:**
"Engagement Rate: 6.8%"
Is this good? Bad? Who knows?

**With Context:**
"Engagement Rate: 6.8%
↑ 1.2% from last month
Industry avg: 3.8%
Above target (6.0%)"

Now we know: It's great!

**Annotations:**
Add notes for significant events:
- "Influencer campaign launched here →"
- "Algorithm change"
- "Product launch"

---

### Common Mistakes to Avoid

**Top 10 Visualization Sins:**

1. **Wrong Chart Type**
   - Pie chart with 15 slices → Use bar chart
   
2. **No Title or Labels**
   - Always explain what we're looking at

3. **3D Charts**
   - Distorts perception, looks dated
   - Always use 2D

4. **Misleading Scale**
   - Y-axis starting at 95 instead of 0
   - Makes small differences look huge

5. **Too Much Information**
   - 10 metrics on one chart
   - Focus on 1-3 key messages

6. **Poor Color Choices**
   - Rainbow colors with no meaning
   - Red/green only (colorblind issue)

7. **Tiny Text**
   - Can't read = useless
   - Min 10pt font

8. **No Source/Date**
   - Data from 2010 or 2024?
   - Always cite and date

9. **Inconsistent Formatting**
   - Different fonts, colors, styles
   - Be consistent throughout

10. **Dual Y-Axes**
    - Can mislead by scaling to make correlation look strong
    - Use carefully or avoid

---

<a name="dashboard-design-principles"></a>
## 📱 SECTION 6: Dashboard Design Principles

### The Dashboard Hierarchy

**F-Pattern Layout:**
Users scan in F-shape:
1. Top left → Top right (horizontal)
2. Down left side (vertical)
3. Middle sweep (horizontal)

**Placement Strategy:**
```
┌──────────────────────────────────────┐
│ MOST IMPORTANT METRIC      [HERO]    │ ← Top, largest
├──────────┬──────────┬────────────────┤
│ Metric 2 │ Metric 3 │ Metric 4       │ ← Supporting
├──────────┴──────────┴────────────────┤
│ [Chart: Main Visualization]          │ ← Primary chart
├──────────────────────────────────────┤
│ [Chart 2]    │    [Chart 3]          │ ← Secondary charts
└──────────────────────────────────────┘
```

---

### Design Principles

#### 1. Clear Visual Hierarchy

**Size = Importance:**
- Largest element = most important
- Progressive sizing downward
- Don't make everything same size

**Example:**
```
Hero Metric: 24pt bold
Supporting Metrics: 18pt bold
Chart Titles: 14pt bold
Labels: 10pt regular
```

#### 2. Logical Grouping

**Group related items:**
- Audience metrics together
- Engagement metrics together
- Revenue metrics together

**Use:**
- Borders/boxes to contain groups
- Background color to distinguish sections
- White space to separate groups

#### 3. Consistent Layout

**Maintain consistency:**
- Same fonts throughout
- Same color scheme
- Same icon style
- Aligned elements

**Grid System:**
- Use invisible grid for alignment
- Snap elements to grid
- Equal spacing between elements

#### 4. White Space

**Don't Cram:**
- Give metrics room to breathe
- Use margins and padding
- Easier to scan and understand

**Rule of Thumb:**
- 20-30% white space is good
- Less than 15% = too crowded
- More than 40% = too sparse

#### 5. Actionable Insights

**Don't Just Show Data:**
- Add context (vs. last period)
- Include benchmarks
- Highlight what's important
- Suggest next actions

**Example:**
```
❌ Bad: "Engagement Rate: 6.8%"

✅ Good: 
"Engagement Rate: 6.8%
↑ 15% vs. last month
Above target (6.0%)
→ Continue current content strategy"
```

---

### Dashboard Elements

#### Metric Cards

**Essential Components:**
- Label (what is it?)
- Value (the number)
- Context (change, comparison)
- Visual indicator (↑↓, color)

**Layout:**
```
┌─────────────────┐
│ Engagement Rate │ ← Label
│                 │
│     6.8%        │ ← Value (large)
│   ↑ 1.2%       │ ← Change
│ Above Avg (3.8%)│ ← Benchmark
└─────────────────┘
```

#### Charts

**Best Practices:**
- Keep it simple (one message per chart)
- Clear title explains insight
- Proper chart type for data
- Labeled axes
- Legend only if needed

#### Filters/Controls

**Common Controls:**
- Date range (last 7/30/90 days)
- Platform selector
- Content type filter
- Comparison period

**Placement:**
- Top of dashboard (visible)
- Consistent location
- Clear labels

#### Insights Section

**Include:**
- Key findings (bullet points)
- Trends identified
- Recommendations
- Next actions

---

### Dashboard Types

#### Executive Dashboard
**Audience:** Busy executives
**Focus:** High-level KPIs
**Elements:** 3-5 key metrics, 1-2 charts max
**Update:** Weekly or monthly

#### Operational Dashboard
**Audience:** Social media managers
**Focus:** Daily/weekly metrics
**Elements:** 10-15 metrics, 3-5 charts
**Update:** Daily

#### Analytical Dashboard
**Audience:** Analysts
**Focus:** Deep-dive data
**Elements:** Many metrics, multiple charts
**Update:** As needed

---

<a name="excelsheets-tips"></a>
## 💻 SECTION 7: Excel/Google Sheets Tips

### Essential Functions

**SUM:**
```
=SUM(A1:A10)
Adds all values in range
```

**AVERAGE:**
```
=AVERAGE(B1:B30)
Calculates mean
```

**COUNT / COUNTA:**
```
=COUNT(A1:A10)  → Counts numbers
=COUNTA(A1:A10) → Counts non-empty cells
```

**MAX / MIN:**
```
=MAX(C1:C100)  → Highest value
=MIN(C1:C100)  → Lowest value
```

**IF:**
```
=IF(A1>100, "High", "Low")
If A1 is greater than 100, return "High", else "Low"
```

**AVERAGEIF:**
```
=AVERAGEIF(A:A, "Reel", B:B)
Average of column B where column A = "Reel"
```

**COUNTIF:**
```
=COUNTIF(D:D, ">10")
Count cells in column D greater than 10
```

---

### Formatting Tips

**Conditional Formatting:**
1. Select cells
2. Home → Conditional Formatting
3. Choose rule type:
   - Color Scales (gradient)
   - Data Bars (in-cell bars)
   - Icon Sets (arrows, etc.)
   - Custom Rules

**Number Formatting:**
```
Percentage: Right-click → Format → Percentage → 1 decimal
Currency: Right-click → Format → Currency → $ symbol
Comma: Right-click → Format → Number → Use 1000 separator
```

**Custom Number Formats:**
```
0.0%    → Shows 6.8%
#,##0   → Shows 25,842
0.00    → Shows 3.14
```

---

### Chart Creation

**Quick Chart:**
1. Select data (include headers)
2. Insert → Recommended Charts
3. Choose appropriate type
4. Customize

**Chart Customization:**
- Click chart → Chart Design tab
- Add elements (title, labels, legend)
- Format (colors, fonts, style)
- Remove gridlines if not needed

**Chart Best Practices:**
- Always add title
- Label axes
- Remove legend if only one series
- Use consistent colors across dashboard

---

### Dashboard Building

**Freeze Panes:**
```
View → Freeze Panes → Freeze Top Row
Keeps headers visible when scrolling
```

**Remove Gridlines:**
```
View → Uncheck "Gridlines"
Cleaner look for dashboard
```

**Cell Borders:**
```
Home → Borders → All Borders
Creates defined sections
```

**Merge Cells (for titles):**
```
Select cells → Home → Merge & Center
Use sparingly!
```

**Color Fill:**
```
Home → Fill Color → Choose color
Use light colors for readability
```

---

### Keyboard Shortcuts

**Windows:**
```
Ctrl + C: Copy
Ctrl + V: Paste
Ctrl + Z: Undo
Ctrl + S: Save
Ctrl + A: Select all
Ctrl + Home: Go to A1
Ctrl + End: Go to last used cell
F2: Edit cell
```

**Mac:**
```
Cmd + C: Copy
Cmd + V: Paste
Cmd + Z: Undo
Cmd + S: Save
Cmd + A: Select all
Cmd + Home: Go to A1
Cmd + End: Go to last used cell
F2 or Enter: Edit cell
```

---

<a name="color-scheme-guide"></a>
## 🎨 SECTION 8: Color Scheme Guide

### Color Psychology

**Red:**
- Meaning: Urgency, danger, passion, negative
- Use for: Alerts, declines, errors, stop

**Green:**
- Meaning: Success, growth, positive, go
- Use for: Increases, achievements, positive metrics

**Blue:**
- Meaning: Trust, calm, professional, stable
- Use for: Primary brand color, neutral metrics

**Orange:**
- Meaning: Attention, warning, energy
- Use for: Moderate alerts, highlights

**Yellow:**
- Meaning: Caution, optimism, attention
- Use for: Warnings, moderate status

**Purple:**
- Meaning: Creative, luxury, unique
- Use for: Special features, premium

**Gray:**
- Meaning: Neutral, professional, subtle
- Use for: Secondary information, backgrounds

---

### Pre-Made Color Palettes

**Professional Blue:**
```
Primary:   #0066CC (Strong Blue)
Secondary: #99CCFF (Light Blue)
Accent:    #FF6600 (Orange)
Success:   #00AA00 (Green)
Warning:   #FFAA00 (Yellow)
Danger:    #CC0000 (Red)
Neutral:   #666666 (Dark Gray)
Background:#F5F5F5 (Light Gray)
```

**Corporate Green:**
```
Primary:   #007A33 (Forest Green)
Secondary: #90EE90 (Light Green)
Accent:    #4169E1 (Royal Blue)
Success:   #32CD32 (Lime Green)
Warning:   #FFA500 (Orange)
Danger:    #DC143C (Crimson)
```

**Modern Purple:**
```
Primary:   #6A0DAD (Royal Purple)
Secondary: #E6E6FA (Lavender)
Accent:    #FFD700 (Gold)
Success:   #228B22 (Forest Green)
Warning:   #FF8C00 (Dark Orange)
Danger:    #B22222 (Fire Brick)
```

**Colorblind-Friendly:**
```
Blue:   #0072B2
Orange: #E69F00
Green:  #009E73
Yellow: #F0E442
Purple: #CC79A7
Red:    #D55E00
Gray:   #999999
```

---

### Dashboard Color Strategy

**Option 1: Monochromatic**
- One color, different shades
- Clean, professional
- Good for corporate dashboards

**Option 2: Analogous**
- Colors next to each other on color wheel
- Harmonious, calm
- Blues and greens, oranges and reds

**Option 3: Complementary**
- Opposite colors (blue/orange, purple/yellow)
- High contrast
- Use sparingly for emphasis

**Option 4: Triadic**
- Three evenly spaced colors
- Vibrant, balanced
- Use one dominant, others as accents

---

<a name="troubleshooting-common-issues"></a>
## 🔧 SECTION 9: Troubleshooting Common Issues

### Excel/Sheets Errors

**#REF! Error**
- **Cause:** Reference to deleted cell
- **Fix:** Update formula to correct cell reference

**#DIV/0! Error**
- **Cause:** Dividing by zero
- **Fix:** Add IF statement: =IF(A1=0, "", B1/A1)

**#VALUE! Error**
- **Cause:** Wrong data type (text instead of number)
- **Fix:** Convert text to number or check data

**#NAME? Error**
- **Cause:** Excel doesn't recognize function name
- **Fix:** Check spelling of function

**Formula Not Calculating**
- **Cause:** Calculation set to manual
- **Fix:** Formulas → Calculation Options → Automatic

---

### Chart Issues

**Chart Shows Wrong Data**
- **Fix:** Right-click chart → Select Data → Adjust ranges

**Chart Looks Weird**
- **Fix:** Delete and recreate with correct data selection

**Can't Format Chart Elements**
- **Fix:** Click directly on element (bar, line, axis)
- May need to click twice (slowly)

**Chart Too Large/Small**
- **Fix:** Click and drag corner to resize
- Shift+drag to maintain proportions

---

### Dashboard Issues

**Elements Not Aligned**
- **Fix:** Turn on gridlines temporarily to align
- Use View → Gridlines
- Turn off when done

**Colors Look Different When Printed**
- **Fix:** Use Print Preview first
- Adjust colors if needed
- Test print one page

**Dashboard Too Cluttered**
- **Fix:** Remove 30% of elements
- Combine similar metrics
- Use tabs for different views

**Takes Too Long to Load**
- **Fix:** Reduce number of charts
- Simplify formulas
- Remove unnecessary formatting

---

<a name="additional-learning-resources"></a>
## 📚 SECTION 10: Additional Learning Resources

### Recommended Books

**Data Visualization:**
- "The Visual Display of Quantitative Information" - Edward Tufte
- "Storytelling with Data" - Cole Nussbaumer Knaflic
- "Information Dashboard Design" - Stephen Few

**Analytics:**
- "Lean Analytics" - Alistair Croll & Benjamin Yoskovitz
- "Web Analytics 2.0" - Avinash Kaushik

---

### Online Resources

**Free Tools:**
- [Coolors.co](https://coolors.co) - Color palette generator
- [Data Viz Project](https://datavizproject.com) - Chart type explorer
- [Color Brewer](https://colorbrewer2.org) - Colorblind-safe palettes

**Learning Platforms:**
- Coursera: "Data Visualization" courses
- DataCamp: "Introduction to Data Visualization"
- LinkedIn Learning: "Excel Data Visualization"

**Inspiration:**
- [Information is Beautiful](https://informationisbeautiful.net)
- [FlowingData](https://flowingdata.com)
- [The Pudding](https://pudding.cool)

---

### Practice Datasets

**Where to Find Data:**
- Your own social media accounts
- [Kaggle Datasets](https://kaggle.com/datasets) - Free datasets
- [Google Dataset Search](https://datasetsearch.research.google.com)
- Public social media data (with API access)

**Practice Projects:**
1. Analyze your personal Instagram for 30 days
2. Compare 3 brands in same industry
3. Track sentiment for major brand launch
4. Build dashboard for local business

---

## ✅ Quick Reference Checklist

**Before Submitting Any Analysis:**

**Data Quality:**
- [ ] Data is accurate and complete
- [ ] No obvious errors or outliers
- [ ] Time periods consistent
- [ ] Sources documented

**Calculations:**
- [ ] Formulas correct
- [ ] Percentages add up (if parts of whole)
- [ ] Growth rates calculated correctly
- [ ] Benchmarks included

**Visualization:**
- [ ] Appropriate chart type
- [ ] Clear title explains insight
- [ ] Axes labeled
- [ ] Readable text (min 10pt)
- [ ] Colors used meaningfully
- [ ] No 3D effects
- [ ] Honest scales

**Dashboard:**
- [ ] Clear hierarchy (most important = largest)
- [ ] Elements aligned
- [ ] Consistent formatting
- [ ] White space used well
- [ ] Context provided (vs. last period)
- [ ] Source and date included

**Insights:**
- [ ] Key findings stated clearly
- [ ] Backed by data
- [ ] Actionable recommendations
- [ ] Next steps outlined

---

**You now have a complete reference guide! Bookmark and use often! 📊✨**
