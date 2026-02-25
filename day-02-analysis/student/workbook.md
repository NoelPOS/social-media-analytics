# Day 2 Student Workbook: YouTube Performance Analytics

## 📚 From Data Collection to Business Insights

**Course:** Social Media Analytics
**Day:** 2 of 3 — Practical Workshop
**Your Name:** _________________________________
**Date:** _________________________________
**Channel You Are Analyzing:** _________________________________

---

## 🎯 Today's Learning Objectives

By the end of today, you will be able to:

- [ ] Connect to the YouTube Data API and extract real video data
- [ ] Clean and structure raw data using pandas in Python
- [ ] Calculate engagement metrics from raw counts
- [ ] Create 6+ data visualizations using matplotlib
- [ ] Identify performance patterns through exploratory analysis
- [ ] Build a reporting dashboard using Google Looker Studio
- [ ] Translate data findings into concrete business recommendations

---

## 🔑 Your Key Information (Fill in as you go)

| Item | Your Value |
|---|---|
| Google Colab notebook link | |
| YouTube Channel ID | |
| Videos collected | |
| Date range of data | |
| Avg. engagement rate | |
| Dashboard link | |

---

## 🌅 MORNING SESSION (10:00 AM – 12:00 PM)

### Theme: Data Collection & Preparation

---

## 🎬 Session 1: Case Study Introduction (10:00–10:20 AM)

**Format:** Discussion — no coding yet

---

### The Business Scenario

*Write the scenario in your own words:*

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

### The 5 Business Questions

These questions guide everything we do today. Write them below — we will answer each one with data.

| # | Business Question | Session That Answers It |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

### The Day's Workflow

Complete the workflow chain:

```
______________ → Raw JSON → ______________ → Cleaning → Feature Engineering
      ↓
______________ Charts → ______________ Analysis → Dashboard → ______________
```

### Key Concepts to Note

**What is an API?**

________________________________________________________________________________

________________________________________________________________________________

**What is a DataFrame?**

________________________________________________________________________________

**Raw data vs. clean data — why does it matter?**

________________________________________________________________________________

________________________________________________________________________________

### Opening Discussion

*Your answer to: "What would you want to know if you ran a YouTube channel?"*

1. ___________________________________________________________________________

2. ___________________________________________________________________________

3. ___________________________________________________________________________

---

## 📡 Session 2: YouTube API Setup & Data Extraction (10:20–11:00 AM)

**Format:** Live coding — follow along in Google Colab

---

### Setting Up Google Cloud

**Step-by-step checklist — check off as you complete each:**

- [ ] Opened [console.cloud.google.com](https://console.cloud.google.com)
- [ ] Created new project named: `YouTube-Analytics-Workshop`
- [ ] Enabled **YouTube Data API v3**
- [ ] Generated API key
- [ ] Copied API key to a secure note

**My API Key (last 4 characters only — do not write the full key here):**

Ends in: `__ __ __ __`

> ⚠️ **Security rule:** Never share your full API key. Never paste it into a public document. For this workshop, store it only in your Colab notebook.

---

### Code Cell 1: Install Library

*Write what this command does:*

```python
!pip install google-api-python-client --quiet
```

**This installs:** ________________________________________________________________

**Why do we need `--quiet`?** _____________________________________________________

---

### Code Cell 2: Import Libraries

*As the instructor types, note what each import is for:*

| Library | What It Does in This Project |
|---|---|
| `googleapiclient.discovery` | |
| `pandas` | |
| `re` | |
| `warnings` | |

---

### Code Cell 3: API Connection

*Complete the blank — what goes inside `build()`?*

```python
API_KEY = "_________________________________"   # your key here

youtube = build( _____________ , _____________ , developerKey=API_KEY)
```

**Test output you should see:**

________________________________________________________________________________

**If you see an error instead, write it here:**

________________________________________________________________________________

**What the error probably means:**

________________________________________________________________________________

---

### Concept Check: How the YouTube API Works

*Label each step in the diagram:*

```
Your Code  →  ____________  →  YouTube Servers  →  JSON Response  →  pandas DataFrame
```

**What is JSON?**

________________________________________________________________________________

**What does "pagination" mean?**

________________________________________________________________________________

---

### Code Cell 4: Get Video IDs

*As the instructor explains the `get_channel_video_ids()` function, answer:*

**What is an "uploads playlist"?**

________________________________________________________________________________

**Why does the API only return 50 results per request?**

________________________________________________________________________________

**What does `next_page_token` do?**

________________________________________________________________________________

**Channel ID you are using today:**

`UC______________________________________________`

**Number of video IDs collected:** __________

---

### Code Cell 5: Get Video Statistics

*The `get_video_statistics()` function fetches 3 types of data. Label each:*

| API Part | Data It Returns | Examples |
|---|---|---|
| `snippet` | | title, published_at, |
| `statistics` | | view_count, |
| `contentDetails` | | |

**Why do we use `.get("viewCount", 0)` instead of just `["viewCount"]`?**

________________________________________________________________________________

________________________________________________________________________________

**After running — record your raw DataFrame details:**

Shape (rows × columns): ______________ × ______________

Column names (list a few):

________________________________________________________________________________

**Preview — top 3 video titles in your raw data:**

1. ___________________________________________________________________________

2. ___________________________________________________________________________

3. ___________________________________________________________________________

---

### Session 2 Reflection

**One thing about APIs that surprised you:**

________________________________________________________________________________

________________________________________________________________________________

**One question you still have:**

________________________________________________________________________________

---

## 🧹 Session 3: Data Cleaning & Feature Engineering (11:00–11:40 AM)

**Format:** Live coding

---

### Why Cleaning Matters

*In your own words, explain "garbage in, garbage out":*

________________________________________________________________________________

________________________________________________________________________________

**What does "data type" mean in Python? Give two examples:**

1. ___________________________________________________________________________

2. ___________________________________________________________________________

---

### Code Cell 6: Convert Numeric Types

*Fill in the blanks based on what the instructor types:*

```python
df_clean = df_raw.____________()   # Always work on a ____________!

df_clean["view_count"] = pd.to_numeric(
    df_clean["view_count"], errors="____________"
).fillna(____________).astype(____________)
```

**What does `errors="coerce"` do?**

________________________________________________________________________________

**What does `.fillna(0)` do?**

________________________________________________________________________________

**Why do we use `.astype(int)` at the end?**

________________________________________________________________________________

**Before / After comparison — write the data type for `view_count`:**

Before cleaning: ______________ | After cleaning: ______________

---

### Code Cell 7: Parse Dates

*The API returns dates as strings, e.g.: `"2023-04-15T14:30:00Z"`*

**After `pd.to_datetime()`, we can extract:**

| Feature Created | Code Used | What It Gives Us |
|---|---|---|
| `publish_year` | `.dt.year` | |
| `publish_month` | | |
| `publish_month_name` | `.dt.strftime("%b")` | |
| `publish_day_of_week` | | |
| `publish_quarter` | | |

**Why do we want the day of the week as a feature?**

________________________________________________________________________________

---

### Code Cell 8: Parse Video Duration

*The API returns duration as ISO 8601 format, e.g.: `"PT5M30S"`*

**Decode each example:**

| API Duration String | Hours | Minutes | Seconds | Total Seconds |
|---|---|---|---|---|
| `PT5M30S` | 0 | 5 | 30 | |
| `PT1H2M15S` | | | | |
| `PT45S` | | | | |
| `PT12M` | | | 0 | |

**What does the `?` symbol do in a regular expression pattern?**

________________________________________________________________________________

**After running — what is the average video duration in your dataset?**

Average duration: __________ minutes

---

### Code Cell 9: Calculate Engagement Metrics

*Write the formulas from memory after the instructor explains them:*

**Engagement Rate:**

```
Engagement Rate = ( ______________ + ______________ ) / ______________
```

**Like Ratio:**

```
Like Ratio = ______________ / ______________
```

**Comment Ratio:**

```
Comment Ratio = ______________ / ______________
```

**Why do we use `.replace(0, 1)` before dividing?**

________________________________________________________________________________

**Why is engagement rate more useful than raw like count?**

________________________________________________________________________________

________________________________________________________________________________

**After running — record your dataset's engagement stats:**

| Metric | Your Dataset Value |
|---|---|
| Average engagement rate | % |
| Highest engagement rate | % |
| Lowest engagement rate | % |

---

### Code Cell 10: Duration Categories

*`pd.cut()` groups continuous numbers into labelled buckets.*

**Complete the category labels from the instructor's code:**

| Duration Range | Category Label |
|---|---|
| 0 – 5 minutes | |
| 5 – 10 minutes | |
| 10 – 20 minutes | |
| 20 – 60 minutes | |
| 60+ minutes | |

**Duration distribution in your dataset:**

| Category | Count |
|---|---|
| Short (< 5 min) | |
| Medium (5–10 min) | |
| Long (10–20 min) | |
| Extended (20–60 min) | |
| Marathon (60+ min) | |

---

### Code Cell 11: Data Quality Report

*Record the output from your data quality report:*

Total videos: ______________

Date range: ______________ → ______________

Missing values in any column? ☐ Yes   ☐ No

If yes, which column? _________________________________________

Average engagement rate: ______________%

---

### Feature Engineering Summary

*Check the features you successfully created:*

- [ ] `view_count` (integer)
- [ ] `like_count` (integer)
- [ ] `comment_count` (integer)
- [ ] `published_at` (datetime)
- [ ] `publish_year`, `publish_month`, `publish_day_of_week`
- [ ] `duration_seconds`, `duration_minutes`
- [ ] `engagement_rate`
- [ ] `like_ratio`, `comment_ratio`
- [ ] `tag_count`
- [ ] `duration_category`

---

### Session 3 Concept Check

**1. What is "feature engineering"? Give one example from today:**

________________________________________________________________________________

________________________________________________________________________________

**2. If a video has 50,000 views, 2,500 likes, and 300 comments — calculate its engagement rate:**

```
Engagement Rate = ( _______ + _______ ) / _______ = _______
                = _______ × 100 = _______  %
```

**3. Why should you always work on `df_raw.copy()` instead of `df_raw` directly?**

________________________________________________________________________________

________________________________________________________________________________

---

## 🔍 Session 4: Quick Data Inspection (11:40 AM–12:00 PM)

**Format:** Coding + Discussion

---

### Code Cell 12: Descriptive Statistics (`.describe()`)

*Record key values from your `.describe()` output:*

| Statistic | `view_count` | `engagement_rate` | `duration_minutes` |
|---|---|---|---|
| mean | | | |
| median (50%) | | | |
| min | | | |
| max | | | |
| std | | | |

**If mean views >> median views, what does that tell us?**

________________________________________________________________________________

________________________________________________________________________________

---

### Code Cell 13: Top 5 Most Viewed Videos

*Write the titles and key stats of your top 5:*

| Rank | Video Title (first 40 chars) | Views | Engagement Rate |
|---|---|---|---|
| 1 | | | % |
| 2 | | | % |
| 3 | | | % |
| 4 | | | % |
| 5 | | | % |

**Is the most viewed video also the most engaging?**  ☐ Yes   ☐ No

**What does that tell us?**

________________________________________________________________________________

---

### Code Cell 14: Correlation Matrix

*Record the correlation between each pair (from your output):*

| Pair | Correlation | Strong / Weak / None? |
|---|---|---|
| views ↔ likes | | |
| views ↔ engagement_rate | | |
| views ↔ duration_minutes | | |
| engagement_rate ↔ duration_minutes | | |

**Correlation reminder:**

- `1.0` = perfect positive relationship
- `0.0` = no relationship
- `-1.0` = perfect inverse relationship

**Which correlation surprised you most?**

________________________________________________________________________________

**What does it mean in practice?**

________________________________________________________________________________

---

### Code Cell 15: First Quick Chart

*Sketch or describe the chart you see:*

```
[Draw or describe your bar chart here]




```

**One observation from this chart:**

________________________________________________________________________________

---

### Pre-Lunch Discussion

*Answer these before lunch:*

**Which of the 5 business questions can you already partially answer from what you've seen?**

________________________________________________________________________________

________________________________________________________________________________

**One question you want to investigate after lunch:**

________________________________________________________________________________

---

## 🍽️ LUNCH BREAK (12:00–1:30 PM)

*Before you go:*
- [ ] Saved your Colab notebook (File → Save a copy in Drive)
- [ ] Noted your DataFrame shape: ______________ rows × ______________ columns

---

## 🌆 AFTERNOON SESSION (1:30–4:30 PM)

### Theme: Analysis, Visualization & Reporting

---

## 📊 Session 5: Exploratory Data Analysis (1:30–2:15 PM)

**Format:** Live coding — 6 charts

---

### Chart Selection Guide

*Fill in as the instructor introduces each chart type:*

| Chart Type | Best Used For | Today's Example |
|---|---|---|
| Horizontal bar | | Top 10 videos |
| Line chart | | |
| Scatter plot | | |
| Histogram | | |

---

### Code Cell 16: Style Configuration

**Why configure styles globally instead of per chart?**

________________________________________________________________________________

---

### Chart 1: Top 10 Most Viewed Videos

**Business question this answers:**

________________________________________________________________________________

*Record your top 3 from the chart:*

1. ___________________________________________________________________________
   Views: ______________

2. ___________________________________________________________________________
   Views: ______________

3. ___________________________________________________________________________
   Views: ______________

**Design choice note — why horizontal bars instead of vertical?**

________________________________________________________________________________

---

### Chart 2: Top 10 Highest Engagement Rate

**Business question this answers:**

________________________________________________________________________________

**Are these the same videos as Chart 1?**  ☐ Mostly yes   ☐ Mostly no   ☐ Completely different

**What does it mean if the two lists are different?**

________________________________________________________________________________

________________________________________________________________________________

*Your top 3 by engagement rate:*

1. ___________________________________________________________________________
   Engagement: ______________%

2. ___________________________________________________________________________
   Engagement: ______________%

3. ___________________________________________________________________________
   Engagement: ______________%

---

### Chart 3: Upload Frequency Over Time

**Business question this answers:**

________________________________________________________________________________

**Describe the pattern you see (consistent / spiky / declining / growing):**

________________________________________________________________________________

**Were there any months with zero uploads? If so, when?**

________________________________________________________________________________

**What could cause a gap in uploads?**

________________________________________________________________________________

---

### Chart 4: Monthly Average Views Trend

**Business question this answers:**

________________________________________________________________________________

**Is the channel's reach:**  ☐ Growing   ☐ Declining   ☐ Flat   ☐ Inconsistent

**What is the most recent month's average views?**

________________________________________________________________________________

**Describe any notable spike or drop and when it happened:**

________________________________________________________________________________

---

### Chart 5: Views vs. Engagement Rate (Scatter Plot)

**Business question this answers:**

________________________________________________________________________________

**In a scatter plot, what does each dot represent?**

________________________________________________________________________________

**What does the color (3rd variable) represent in this chart?**

________________________________________________________________________________

**Describe the overall pattern you see:**

☐ Strong positive trend (high views = high engagement)
☐ Strong negative trend (high views = low engagement)
☐ No clear pattern (scattered randomly)
☐ Clusters — describe: ___________________________________________________

**Analyst insight from Chart 5:**

________________________________________________________________________________

________________________________________________________________________________

---

### Chart 6: Engagement Rate Distribution (Histogram)

**Business question this answers:**

________________________________________________________________________________

**Record your channel's statistics:**

Mean engagement rate: ______________%

Median engagement rate: ______________%

**Is mean > median or mean < median?** ______________

**What does this tell us about the distribution?**

________________________________________________________________________________

**What range covers most of your videos? (eyeball estimate)**

Between _______% and _______% engagement rate

---

### Session 5 Chart Summary

*Rate each chart on how clearly it answers its business question (1 = unclear, 5 = very clear):*

| Chart | Business Question Answered | Clarity (1–5) |
|---|---|---|
| Chart 1: Top 10 Views | | |
| Chart 2: Top 10 Engagement | | |
| Chart 3: Upload Frequency | | |
| Chart 4: Monthly Avg Views | | |
| Chart 5: Scatter | | |
| Chart 6: Distribution | | |

**Which single chart would you show first to a YouTube channel manager? Why?**

________________________________________________________________________________

________________________________________________________________________________

---

## 🧠 Session 6: Deeper Insight Generation (2:15–3:00 PM)

**Format:** Live coding + Discussion

---

### The Shift: Descriptive → Diagnostic

*Fill in the blanks:*

- **Descriptive analytics** asks: "What ______________ ?"
- **Diagnostic analytics** asks: "Why ______________ ?"

---

### Chart 7: Correlation Heatmap

**How to read the heatmap:**

- Dark green cell = _____________________ (strong _________________ relationship)
- Dark red cell = _____________________ (strong _________________ relationship)
- Near-white cell = _____________________

*Record the 3 most interesting correlations from your heatmap:*

| Variables | Correlation Value | What It Means |
|---|---|---|
| | | |
| | | |
| | | |

**Important reminder — what is the difference between correlation and causation?**

________________________________________________________________________________

________________________________________________________________________________

**Example: "Videos with more tags get more views" — could this correlation be caused by something else?**

________________________________________________________________________________

---

### Chart 8: Performance by Day of Week

**Why do we highlight weekends with a different color?**

________________________________________________________________________________

**Why is the `n=` label on each bar important?**

________________________________________________________________________________

*Record your findings:*

| Day | Avg Views | Avg Engagement (%) | Sample Size (n) |
|---|---|---|---|
| Monday | | | |
| Tuesday | | | |
| Wednesday | | | |
| Thursday | | | |
| Friday | | | |
| Saturday | | | |
| Sunday | | | |

**Best day for average views:** ______________

**Best day for average engagement:** ______________

**Are these the same day?**  ☐ Yes   ☐ No

**If not — what strategy does this suggest?**

________________________________________________________________________________

________________________________________________________________________________

**Caution: If the best-performing day only has n=2 or n=3, should you trust that result? Why or why not?**

________________________________________________________________________________

________________________________________________________________________________

---

### Chart 9: Engagement Rate by Video Duration

*Record your findings:*

| Duration Category | Avg Engagement Rate | Count (n) |
|---|---|---|
| Short (< 5 min) | % | |
| Medium (5–10 min) | % | |
| Long (10–20 min) | % | |
| Extended (20–60 min) | % | |
| Marathon (60+ min) | % | |

**Which duration category has the highest engagement?** ______________

**Which has the lowest?** ______________

**Does this mean the channel should only make videos in the top-performing category?**

☐ Yes, definitely   ☐ No — explain why:

________________________________________________________________________________

________________________________________________________________________________

---

### Chart 10: Upload Consistency vs. Average Views

**What is a "dual-axis" chart?**

________________________________________________________________________________

**What does the bar height show?** __________________ per month

**What does the line show?** __________________ per video

**Do months with more uploads show higher or lower average views per video?**

☐ Higher (more uploads = more views per video)
☐ Lower (more uploads = fewer views per video)
☐ No clear relationship

**What could explain this pattern?**

________________________________________________________________________________

________________________________________________________________________________

---

### Diagnostic Insight Synthesis

*Based on Sessions 5 and 6, answer the 5 business questions as best you can:*

**Q1: Which videos drive the most engagement?**

________________________________________________________________________________

________________________________________________________________________________

**Q2: Does video length affect performance?**

________________________________________________________________________________

________________________________________________________________________________

**Q3: What upload patterns correlate with higher views?**

________________________________________________________________________________

________________________________________________________________________________

**Q4: Which day of the week performs best?**

________________________________________________________________________________

________________________________________________________________________________

**Q5: What content strategy should the channel pursue going forward?**

*(Save this for Session 8 — you'll refine it after building the dashboard)*

---

## ☕ BREAK (3:00–3:15 PM)

*Before break:*

- [ ] Download your CSV: `youtube_analytics_final.csv`
  - In Colab: Files panel (left sidebar) → right-click → Download
- [ ] Confirm the file downloaded successfully

**File downloaded?**  ☐ Yes   ☐ No — ask instructor for backup file

---

## 📈 Session 7: Dashboard Creation (3:15–4:00 PM)

**Format:** Guided activity

**Dashboard option you are building:**  ☐ Looker Studio (recommended)   ☐ Matplotlib

---

### What Makes a Good Dashboard?

*Write the key principle for each point:*

**Audience:** A dashboard is written for _________________, not for _________________.

**Quantity:** _________________ great panels beats _________________ mediocre ones.

**Top section:** Always put _________________ at the top for instant context.

**Interactivity:** _________________ let your stakeholder explore without asking you.

---

### Option A: Matplotlib Dashboard

*If building the Python dashboard, note which panels you included:*

- [ ] Panel 1: ______________________________________________
- [ ] Panel 2: ______________________________________________
- [ ] Panel 3: ______________________________________________
- [ ] Panel 4: ______________________________________________
- [ ] Panel 5: ______________________________________________
- [ ] KPI summary box

**Dashboard saved as:** `dashboard_summary.png`  ☐ Confirmed

---

### Option B: Google Looker Studio Dashboard

#### Step 1: Upload CSV to Google Sheets

- [ ] Opened Google Sheets
- [ ] Imported `youtube_analytics_final.csv` via File → Import
- [ ] Data is visible in the sheet

**Number of rows loaded:** ______________

**Spreadsheet URL:** _____________________________________________________________

#### Step 2: Connect to Looker Studio

- [ ] Opened Looker Studio
- [ ] Created blank report
- [ ] Connected to Google Sheets data source
- [ ] Data loaded correctly

#### Step 3: Dashboard Elements

*Check off each panel as you build it:*

**KPI Scorecards:**
- [ ] Total Views (Sum of view_count)
- [ ] Total Likes (Sum of like_count)
- [ ] Avg Engagement Rate (Avg of engagement_rate)
- [ ] Optional: Total Comments

**Charts:**
- [ ] Time series chart — monthly views over time
- [ ] Top videos table — title, views, engagement rate
- [ ] Bar chart — engagement rate by day of week
- [ ] Scatter chart — duration vs. engagement

**Filters:**
- [ ] Date range control
- [ ] Duration category filter

#### Dashboard Design Choices

**Color theme you chose:** _________________________________________

**Title of your dashboard:** _________________________________________

**One thing you changed from the default to make it clearer:**

________________________________________________________________________________

#### Step 4: Share

- [ ] Set access: "Anyone with the link → Viewer"
- [ ] Copied share link

**Dashboard link:** _____________________________________________________________

---

### Dashboard Peer Review

*Swap dashboard links with a neighbor. Write one piece of feedback:*

**Neighbor's name:** _____________________________

**One thing they did well:**

________________________________________________________________________________

**One suggestion for improvement:**

________________________________________________________________________________

---

## 🎤 Session 8: Insight Presentation & Recommendations (4:00–4:30 PM)

**Format:** Individual writing → Volunteer presentations → Group debrief

---

### Your Executive Brief

*You have 8 minutes to complete this. Write it for a YouTube channel manager — no jargon, no code, no charts. Plain, clear language.*

---

```
╔═══════════════════════════════════════════════════════════════╗
║              YOUTUBE CHANNEL PERFORMANCE BRIEF                ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Channel:          _______________________________________    ║
║  Analysis Period:  _________________ → _________________     ║
║  Videos Analyzed:  _____                                      ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  TOP FINDING 1:                                               ║
║                                                               ║
║  ____________________________________________________________  ║
║  ____________________________________________________________  ║
║  Supporting data: _________________________________________   ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  TOP FINDING 2:                                               ║
║                                                               ║
║  ____________________________________________________________  ║
║  ____________________________________________________________  ║
║  Supporting data: _________________________________________   ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  TOP FINDING 3:                                               ║
║                                                               ║
║  ____________________________________________________________  ║
║  ____________________________________________________________  ║
║  Supporting data: _________________________________________   ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  CONTENT STRATEGY RECOMMENDATION:                             ║
║                                                               ║
║  The channel should make more content about _____________     ║
║  because ________________________________________________     ║
║  ____________________________________________________________  ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  POSTING STRATEGY RECOMMENDATION:                             ║
║                                                               ║
║  The channel should post on ________________ (day/s) at a    ║
║  frequency of _____________ videos per week/month because    ║
║  ____________________________________________________________  ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  GROWTH OPPORTUNITY:                                          ║
║                                                               ║
║  One thing this channel has NOT yet tried that the data      ║
║  suggests could work: ___________________________________     ║
║  ____________________________________________________________  ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  HONEST CAVEAT:                                               ║
║                                                               ║
║  One limitation of this analysis: _______________________    ║
║  ____________________________________________________________  ║
║  What additional data would make this more reliable: ____    ║
║  ____________________________________________________________  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

### Listening Notes: Other Students' Presentations

*During the Q&A, note one insight from each presenter that you had not thought of:*

**Presenter 1** (name: ___________________):

________________________________________________________________________________

________________________________________________________________________________

**Presenter 2** (name: ___________________):

________________________________________________________________________________

________________________________________________________________________________

**Presenter 3** (name: ___________________):

________________________________________________________________________________

________________________________________________________________________________

---

### Instructor Follow-Up Questions

*Be ready to answer any of these:*

**Q: Your analysis shows X. What is your sample size for that finding?**

My answer: ____________________________________________________________________

**Q: If you could only recommend ONE change to the channel manager, what would it be?**

My answer: ____________________________________________________________________

________________________________________________________________________________

**Q: What data do you NOT have that would make your recommendation more confident?**

My answer: ____________________________________________________________________

________________________________________________________________________________

---

## 📊 Revisit: The 5 Business Questions

*Now that the day is done — answer each more fully:*

**Q1: Which videos drive the most engagement?**

________________________________________________________________________________

________________________________________________________________________________

**Q2: Does video length affect performance?**

________________________________________________________________________________

________________________________________________________________________________

**Q3: What upload patterns correlate with higher views?**

________________________________________________________________________________

________________________________________________________________________________

**Q4: Which day of the week performs best?**

________________________________________________________________________________

________________________________________________________________________________

**Q5: What content strategy should the channel pursue going forward?**

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

---

## 📋 End-of-Day Review

### Today's Workflow — Can You Trace It?

*Without looking at your notes, complete the workflow:*

```
Step 1: __________________________________ (10:20–11:00)
   ↓
Step 2: __________________________________ (11:00–11:40)
   ↓
Step 3: __________________________________ (11:40–12:00)
   ↓
[Lunch]
   ↓
Step 4: __________________________________ (1:30–2:15)
   ↓
Step 5: __________________________________ (2:15–3:00)
   ↓
Step 6: __________________________________ (3:15–4:00)
   ↓
Step 7: __________________________________ (4:00–4:30)
```

---

### Three Roles You Played Today

| Time | Role | What You Did |
|---|---|---|
| Morning | Data Collector | |
| Early Afternoon | | |
| Late Afternoon | | |

---

### Key Takeaways

**Three most important things I learned today:**

1. ___________________________________________________________________________

   ____________________________________________________________________________

2. ___________________________________________________________________________

   ____________________________________________________________________________

3. ___________________________________________________________________________

   ____________________________________________________________________________

**The most surprising finding from my data:**

________________________________________________________________________________

________________________________________________________________________________

**One concept I want to learn more about:**

________________________________________________________________________________

---

## 📝 Quick Self-Assessment Quiz

**1. What does the YouTube Data API return data as?**

________________________________________________________________________________

**2. Why do we use `df_raw.copy()` before cleaning?**

________________________________________________________________________________

**3. A video has 80,000 views, 3,200 likes, and 400 comments. Calculate its engagement rate:**

```
Engagement Rate = ( _______ + _______ ) / _______ × 100 = _______  %
```

**4. Name one advantage of a scatter plot over a bar chart:**

________________________________________________________________________________

**5. In a correlation heatmap, what does a value of -0.72 indicate?**

________________________________________________________________________________

**6. What is the difference between descriptive and diagnostic analytics?**

________________________________________________________________________________

________________________________________________________________________________

**7. Why should you always show sample size (n=) on a grouped bar chart?**

________________________________________________________________________________

**8. What does a right-skewed engagement distribution tell you about the channel?**

________________________________________________________________________________

**9. Name two interactive elements you can add to a Looker Studio dashboard:**

1. _________________________________ 2. _________________________________

**10. Complete this sentence: "A good executive brief leads with _______________, not _______________."**

---

## ✅ Submission Checklist

Before you leave, confirm you have everything:

- [ ] **Colab notebook** saved to Google Drive
  - Share link (anyone with link → Viewer): ___________________________________
- [ ] **CSV file** downloaded: `youtube_analytics_final.csv`
- [ ] **Dashboard** built and share link copied:
  - _____________________________________________________________
- [ ] **Executive brief** written in this workbook (the box above)
- [ ] **Self-assessment quiz** completed

---

## 🔢 Key Formulas Reference Card

*Cut out or photograph this section for future reference:*

```
┌──────────────────────────────────────────────────────────┐
│                  YOUTUBE ANALYTICS FORMULAS              │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Engagement Rate = (Likes + Comments) / Views × 100     │
│                                                          │
│  Like Ratio      = Likes / Views × 100                  │
│                                                          │
│  Comment Ratio   = Comments / Views × 100               │
│                                                          │
│  Duration (min)  = Total Seconds / 60                   │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  CHART TYPE GUIDE                                        │
│                                                          │
│  Compare categories  → Horizontal bar chart             │
│  Show trend over time → Line chart                      │
│  Show relationship   → Scatter plot                     │
│  Show distribution   → Histogram                        │
│  Multiple metrics    → Dual-axis chart                  │
├──────────────────────────────────────────────────────────┤
│  GOOD ENGAGEMENT RATE BENCHMARKS (YouTube)              │
│                                                          │
│  Below 1%     = Low engagement                          │
│  1% – 3.5%    = Average                                 │
│  3.5% – 6%    = Good                                    │
│  Above 6%     = Excellent                               │
└──────────────────────────────────────────────────────────┘
```

---

## 📚 Additional Notes & "Aha!" Moments

*Use this space for anything you want to remember:*

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

________________________________________________________________________________

---

## 🎯 Connection to Day 3

**What Day 3 builds on from today:**

- Today you analyzed ONE channel. Day 3 applies the same skills to **competitive benchmarking** — comparing multiple channels.
- Today you built recommendations. Day 3 teaches you how to **present** them to executives professionally.
- Today you measured views and engagement. Day 3 connects those numbers to **business ROI**.

**One question you're bringing into Day 3:**

________________________________________________________________________________

________________________________________________________________________________

---

## ✅ Before You Leave

- [ ] Colab notebook saved to Drive
- [ ] CSV downloaded
- [ ] Dashboard link copied
- [ ] Executive brief completed
- [ ] Self-assessment quiz done
- [ ] Workbook sections filled in throughout the day
- [ ] Questions written down for instructor follow-up

---

**Outstanding work today! You collected, cleaned, analyzed, visualized, and reported on real YouTube data. That is the complete workflow of a professional data analyst. See you on Day 3! 📊**

---

**Instructor:** _________________________________________________________________

**Email:** ______________________________________________________________________

**Office Hours:** _______________________________________________________________

---

*Social Media Analytics Course — Day 2 © 2026*
*Connect with Day 1: [day-01-foundations/student/workbook.md](../../day-01-foundations/student/workbook.md)*
*Continue with Day 3: [day-03-application/student/workbook.md](../../day-03-application/student/workbook.md)*
