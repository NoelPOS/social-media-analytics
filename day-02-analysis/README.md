# Day 2: YouTube Performance Analytics Workshop

##  Instructor Guide — Read This First

> **This document is written exclusively for the instructor.** Students receive a separate workbook. All code examples are meant to be typed live in Google Colab while students follow along on their own screens. Do not distribute this file to students.

---

##  Quick Reference Card

| Field | Details |
|---|---|
| **Day** | 2 of 3 |
| **Title** | YouTube Performance Analytics: From Data Collection to Business Insights |
| **Duration** | 5 hours total |
| **Morning** | 10:00 AM – 12:00 PM |
| **Lunch Break** | 12:00 PM – 1:30 PM |
| **Afternoon** | 1:30 PM – 4:30 PM |
| **Format** | Live coding + Discussion + Dashboard creation |
| **Student Level** | Beginner Python, Intermediate Social Media Theory |
| **Primary Tool** | Google Colab (browser-based, no install required) |
| **Secondary Tool** | Google Looker Studio (for dashboards) |

---

##  Workshop Learning Objectives

By the end of this workshop, students will be able to:

1. Extract real YouTube data via the YouTube Data API v3
2. Convert raw JSON API responses into structured pandas DataFrames
3. Clean, type-convert, and prepare data for analysis
4. Compute engagement metrics and engineer analytical features
5. Perform exploratory data analysis (EDA) with 6+ chart types
6. Diagnose performance patterns using correlation and groupby analysis
7. Build a business-ready reporting dashboard in Google Looker Studio
8. Translate data findings into concrete, actionable recommendations

---

##  Teaching Philosophy: Three Roles

This workshop intentionally progresses students through **three professional roles**. Make this progression explicit — announce each transition aloud.

| Phase | Role Students Play | Focus |
|---|---|---|
| **Morning** | Data Collector | API, extraction, cleaning, engineering |
| **Afternoon (1:30–3:00)** | Data Analyst | EDA, visualization, pattern discovery |
| **Afternoon (3:00–4:30)** | Social Media Strategist | Dashboard, insights, recommendations |

> **Instructor Note:** At the start of each phase, say: *"We are now switching roles. Put on your analyst hat."* This framing is pedagogically powerful — it helps students understand why the work changes character throughout the day.

---

##  Pre-Workshop Instructor Checklist

### One Week Before
- [ ] Create your own Google Cloud Project and generate a working API key
- [ ] Choose a target YouTube channel to analyze (public, 50+ videos recommended)
- [ ] Run **all code blocks** end-to-end in a private Colab notebook — verify no errors
- [ ] Generate the backup synthetic dataset (see **Backup Plan** section)
- [ ] Upload backup CSV to Google Drive; get a shareable link
- [ ] Prepare a student Colab notebook template (starter code, no solutions filled in)
- [ ] Test the full Looker Studio dashboard flow with the exported CSV

### Day Before
- [ ] Confirm classroom projector and screen sharing are working
- [ ] Share student Colab template link (read-only) via class communication channel
- [ ] Verify all students have active Google accounts
- [ ] Print or distribute the student workbook
- [ ] Prepare "5 Business Questions" slide or board display

### Morning of Workshop
- [ ] Open your **instructor Colab notebook** and verify the API key is live
- [ ] Have the backup dataset file accessible and ready to share
- [ ] Set up a visible timer for each session
- [ ] Write the 5 Business Questions on the board before students arrive

---

##  Environment Setup

### What Students Need
- [ ] Laptop with modern browser (Chrome or Firefox recommended)
- [ ] Active Google account (for Colab, Drive, and Looker Studio)
- [ ] No software installation required — everything runs in the browser

### Opening Google Colab

1. Go to [colab.research.google.com](https://colab.research.google.com)
2. Sign in with a Google account
3. Click **File → New notebook**
4. Rename the notebook: `YouTube_Analytics_Workshop.ipynb`

> **Share your instructor notebook as read-only.** Tell students: *"Go to File → Save a copy in Drive to get your own editable version. Never work directly in the shared link."*

### Installing Required Libraries

This is the **first cell** every student runs:

```python
# Install the Google API client library (not pre-installed in Colab)
!pip install google-api-python-client --quiet

print(" Installation complete!")
```

> **What to say:** *"Google Colab already has pandas and matplotlib. We only need to install the Google API client, which gives Python a way to communicate with YouTube."*

---

##  Google Cloud API Setup

> **Instructor Note:** Walk through this live at the start of Session 2 (approximately 10 minutes). Students follow along on their own screens. This is frequently the trickiest part of the day — move slowly and check for hands.

### Step 1: Create a Google Cloud Project

1. Open [console.cloud.google.com](https://console.cloud.google.com)
2. Click the project dropdown at the top (next to "Google Cloud" logo)
3. Click **New Project**
4. Project name: `YouTube-Analytics-Workshop`
5. Click **Create** and wait ~30 seconds
6. Select the new project from the dropdown

### Step 2: Enable the YouTube Data API v3

1. In the left sidebar → **APIs & Services → Library**
2. Search: `YouTube Data API v3`
3. Click the result → Click the blue **Enable** button
4. Wait for activation (~10 seconds)

### Step 3: Generate an API Key

1. Left sidebar → **APIs & Services → Credentials**
2. Click **+ Create Credentials** → Select **API key**
3. Your API key appears — **copy it immediately**
4. Optional: Click **Restrict Key** → Under API Restrictions, select **YouTube Data API v3** → Save

> **Security note to say aloud:** *"Never share your API key publicly. Never commit it to GitHub with your code. Today, storing it directly in Colab is acceptable since we are not publishing this notebook. In a professional setting, you would use environment variables."*

### Step 4: Test the Connection

```python
from googleapiclient.discovery import build

API_KEY = "PASTE_YOUR_API_KEY_HERE"  # Students replace this

try:
    youtube = build("youtube", "v3", developerKey=API_KEY)
    print(" Connected to YouTube API successfully!")
except Exception as e:
    print(f" Connection failed: {e}")
```

---

##  Morning Session: Data Collection & Preparation

### Morning Schedule

| Time | Session | Duration | Format |
|---|---|---|---|
| 10:00 – 10:20 | Session 1: Case Study Introduction | 20 min | Presentation + Discussion |
| 10:20 – 11:00 | Session 2: API Setup & Data Extraction | 40 min | Live coding |
| 11:00 – 11:40 | Session 3: Data Cleaning & Feature Engineering | 40 min | Live coding |
| 11:40 – 12:00 | Session 4: Quick Data Inspection | 20 min | Coding + Discussion |
| 12:00 – 1:30 | Lunch Break | 90 min | — |

---

##  Session 1: Case Study Introduction

**Time:** 10:00 – 10:20 | **Duration:** 20 minutes
**Format:** Presentation + Discussion | **No coding**

### Learning Objective

Students understand the business context, the 5 guiding analytical questions, and the full day's workflow before writing a single line of code.

### Open With This Scenario

> *"Imagine you are a freelance data analyst. A YouTube channel manager contacts you. They have been posting videos for two years. They have a few thousand subscribers. But they honestly do not know what is working. They say: 'We post videos, some do well, most do okay. Help us figure out what we should make more of, and when we should post it.'"*

Write this on the board and leave it visible all day.

### The 5 Business Questions

Display prominently — these anchor every analysis in the workshop:

```
1. Which videos drive the most engagement?
2. Does video length affect performance?
3. What upload patterns correlate with higher views?
4. Which day of the week produces the best results?
5. What content strategy should this channel pursue going forward?
```

> **Instructor Note:** Tell students: *"Every single chart we make today is answering one of these five questions. When you are building a chart, ask yourself: which question does this answer? If you cannot answer that, reconsider whether to make the chart."*

### The Day's Workflow (Draw on board)

```
YouTube API → Raw JSON → pandas DataFrame → Cleaning → Feature Engineering
     → EDA Charts → Correlation Analysis → Dashboard → Business Recommendations
```

### Key Teaching Points

- Analytics always starts with a business question — never with data
- Raw data has no meaning until it is shaped and interpreted
- The best analysts translate numbers into decisions that a non-technical manager can act on
- Today's workflow mirrors what professional analysts do daily

### Discussion Questions to Ask Students

1. *"What YouTube channels do you personally follow? What makes some videos stand out from others in the same channel?"*
2. *"If you ran a small YouTube channel, what three things would you most want to know about your videos?"*
3. *"A video has 2 million views but only 5,000 likes. Is that good or bad? Why does context matter?"*

### Session 1 Deliverable

Students leave this segment with:
- Clear understanding of the business scenario
- The 5 guiding questions visible in their workbook
- Mental model of the full-day workflow
- Genuine curiosity about what the data will show

---

##  Session 2: YouTube API Setup & Data Extraction

**Time:** 10:20 – 11:00 | **Duration:** 40 minutes
**Format:** Live coding — instructor types, students follow
**Colab required for all students**

### Learning Objective

Students successfully connect to the YouTube Data API and extract raw video data into a pandas DataFrame.

### Instructor Setup Before Session Begins

- API key visible in your secure notes (not on screen yet)
- Chosen channel ID ready (see Appendix for recommendations)
- Colab notebook open on projector

### Cell 2: Import Libraries

```python
# Import all required libraries
from googleapiclient.discovery import build
import pandas as pd
import re
import warnings

warnings.filterwarnings("ignore")

print(" Libraries loaded!")
```

> **What to say:** *"pandas handles our data table — it is the workhorse of data analysis in Python. The `re` module handles text pattern matching, which we need to parse video durations. `googleapiclient` is what lets Python talk to YouTube's servers."*

### Cell 3: API Connection

```python
# Replace with your actual API key
API_KEY = "YOUR_API_KEY_HERE"

youtube = build("youtube", "v3", developerKey=API_KEY)

print(" YouTube API connection established!")
```

> **Common mistake:** Students forget to replace the placeholder string. Watch for `HttpError 400`. Tell them: *"If you see a 400 error, your API key is still the placeholder text. Replace the entire string inside the quotes."*

### Cell 4: Retrieve Video IDs from a Channel

```python
def get_channel_video_ids(channel_id, max_videos=100):
    """
    Retrieve video IDs from a YouTube channel's upload history.

    How it works:
    1. Every channel has a hidden 'uploads' playlist containing all public videos.
    2. We first fetch that playlist ID from the channel data.
    3. Then we loop through the playlist page by page (50 results max per page).
    """

    # Step 1: Get the 'uploads' playlist ID for this channel
    channel_request = youtube.channels().list(
        part="contentDetails",
        id=channel_id
    )
    channel_response = channel_request.execute()

    uploads_playlist_id = (
        channel_response["items"][0]
        ["contentDetails"]["relatedPlaylists"]["uploads"]
    )

    print(f" Uploads playlist found: {uploads_playlist_id}")

    # Step 2: Paginate through the playlist to collect video IDs
    video_ids = []
    next_page_token = None

    while len(video_ids) < max_videos:
        playlist_request = youtube.playlistItems().list(
            part="snippet",
            playlistId=uploads_playlist_id,
            maxResults=50,          # API hard maximum is 50 per request
            pageToken=next_page_token
        )
        playlist_response = playlist_request.execute()

        for item in playlist_response["items"]:
            video_id = item["snippet"]["resourceId"]["videoId"]
            video_ids.append(video_id)

        # Check if there is a next page
        next_page_token = playlist_response.get("nextPageToken")

        if not next_page_token:
            break   # No more pages; we have all available videos

    print(f" Collected {len(video_ids)} video IDs")
    return video_ids[:max_videos]


# Replace with your chosen channel ID
CHANNEL_ID = "UCAuUUnT6oDeKwE6v1NGQxug"   # Example: TED

video_ids = get_channel_video_ids(CHANNEL_ID, max_videos=100)
```

> **What to explain:** *"Think of a YouTube channel like a filing cabinet. Inside, there is a special folder called 'uploads' that holds every public video. YouTube doesn't give us all 500 videos in one response — it pages them in groups of 50. So we ask for page 1, then page 2, and so on, until we have enough."*

### Cell 5: Fetch Detailed Stats for Each Video

```python
def get_video_statistics(video_ids):
    """
    For each video ID, retrieve title, publication date, statistics,
    and content details. Batches 50 IDs per API request (API limit).
    """

    all_video_data = []

    # Process in batches of 50
    for batch_start in range(0, len(video_ids), 50):
        batch = video_ids[batch_start : batch_start + 50]

        video_request = youtube.videos().list(
            part="snippet,statistics,contentDetails",
            id=",".join(batch)
        )
        video_response = video_request.execute()

        for item in video_response["items"]:
            video_data = {
                # Identification
                "video_id":       item["id"],

                # Content information
                "title":          item["snippet"]["title"],
                "description":    item["snippet"].get("description", ""),
                "tags":           item["snippet"].get("tags", []),
                "published_at":   item["snippet"]["publishedAt"],

                # Performance statistics
                "view_count":     item["statistics"].get("viewCount", 0),
                "like_count":     item["statistics"].get("likeCount", 0),
                "comment_count":  item["statistics"].get("commentCount", 0),

                # Video properties
                "duration":       item["contentDetails"]["duration"],
                "definition":     item["contentDetails"].get("definition", ""),
            }
            all_video_data.append(video_data)

        print(f"  Processed batch {batch_start // 50 + 1} "
              f"({len(all_video_data)} videos collected so far)")

    df = pd.DataFrame(all_video_data)
    print(f"\n Total videos collected: {len(df)}")
    return df


# Fetch all video statistics
df_raw = get_video_statistics(video_ids)

# Preview the raw DataFrame
print("\nRaw DataFrame shape:", df_raw.shape)
df_raw.head(3)
```

> **What to explain:** *"The API returns JSON — a nested dictionary structure. We are pulling specific pieces out of each 'item' object and placing them into a flat row. Notice we use `.get('key', 0)` — that means 'if this key exists, return its value; if not, return 0'. This prevents crashes when a field is missing, like when a channel disables comments."*

### Key Teaching Points

- APIs return JSON; Python reads it as nested dictionaries
- Pagination: APIs never return all data at once — you request page by page
- Batching: sending 50 IDs in one request is far more efficient than 50 separate calls
- `.get("key", default)` is the safe way to extract optional fields

### Common Student Mistakes

| Mistake | What Happens | Fix |
|---|---|---|
| Did not replace `YOUR_API_KEY_HERE` | `HttpError 400: Bad Request` | Replace the entire placeholder string |
| Wrong channel ID format | Empty `items` list, index error | Channel IDs start with `UC` — verify in channel URL |
| Daily API quota exceeded | `HttpError 403: quotaExceeded` | Switch immediately to backup dataset |
| Running cells out of order | `NameError: 'youtube' is not defined` | Restart runtime, run cells top to bottom |
| Shared API key with a neighbor | Quota doubles and fails for both | Each student must create their own key |

### Questions to Ask Students

1. *"Why do we collect video IDs first, then fetch statistics separately? Why not do it in one step?"*
2. *"What does `.get('likeCount', 0)` do? What would happen without the `0`?"*
3. *"If a channel has 500 videos and we request max_videos=100, which 100 do we get — the oldest or newest?"*
4. *"What data type is `tags`? Why is it different from `view_count`?"*

---

##  Session 3: Data Cleaning & Feature Engineering

**Time:** 11:00 – 11:40 | **Duration:** 40 minutes
**Format:** Live coding | **Difficulty:** Medium

### Learning Objective

Students transform raw, messy API data into a clean, analysis-ready DataFrame with engineered features that answer real business questions.

### Frame This Session for Students

> *"Real-world data is never clean. The API gives us view counts as strings, not numbers. Dates are formatted in a way Python cannot sort. Durations are encoded in a cryptic text format. A professional data analyst spends 60–80% of their time on exactly this work. It is unglamorous but absolutely essential — garbage in, garbage out."*

### Cell 6: Numeric Type Conversion

```python
# Check what types we currently have
print("Data types BEFORE conversion:")
print(df_raw[["view_count", "like_count", "comment_count"]].dtypes)
print()

# Always work on a copy — never mutate the original
df_clean = df_raw.copy()

# Convert counts from strings to integers
# errors='coerce' turns anything that cannot convert into NaN (not a crash)
df_clean["view_count"] = (
    pd.to_numeric(df_clean["view_count"], errors="coerce")
    .fillna(0)
    .astype(int)
)

df_clean["like_count"] = (
    pd.to_numeric(df_clean["like_count"], errors="coerce")
    .fillna(0)
    .astype(int)
)

df_clean["comment_count"] = (
    pd.to_numeric(df_clean["comment_count"], errors="coerce")
    .fillna(0)
    .astype(int)
)

print("Data types AFTER conversion:")
print(df_clean[["view_count", "like_count", "comment_count"]].dtypes)
```

> **What to say:** *"Two important techniques here: `errors='coerce'` means 'if you cannot convert this to a number, replace it with NaN instead of crashing'. Then `.fillna(0)` replaces all NaN with 0. This combination is a professional, production-grade way to handle type conversion safely."*

> **Teaching point — say this clearly:** *"We used `df_raw.copy()` first. This is critical. Never modify your original data. If you corrupt a column and need to start over, you can always go back to df_raw. Think of it like making a photocopy before writing on a document."*

### Cell 7: Date Parsing and Feature Extraction

```python
# The API returns dates as strings: "2023-04-15T14:30:00Z"
# pd.to_datetime converts these to proper datetime objects

df_clean["published_at"] = pd.to_datetime(df_clean["published_at"])

# Extract individual date components
df_clean["publish_date"]         = df_clean["published_at"].dt.date
df_clean["publish_year"]         = df_clean["published_at"].dt.year
df_clean["publish_month"]        = df_clean["published_at"].dt.month
df_clean["publish_month_name"]   = df_clean["published_at"].dt.strftime("%b")  # "Jan", "Feb", etc.
df_clean["publish_day_of_week"]  = df_clean["published_at"].dt.day_name()       # "Monday", etc.
df_clean["publish_quarter"]      = df_clean["published_at"].dt.quarter

# Preview the result
print("Date features created:")
print(df_clean[[
    "published_at", "publish_date", "publish_year",
    "publish_month_name", "publish_day_of_week"
]].head(3))
```

> **What to say:** *"Once we convert that string to a datetime object, pandas gives us superpowers. We can extract the year, month, day of week — anything we want. This is how we will later answer: 'Which day of the week does the channel perform best?'"*

### Cell 8: Parse ISO 8601 Duration Format

```python
def parse_iso_duration(duration_str):
    """
    Convert ISO 8601 duration string to total seconds.

    Examples:
    - "PT5M30S"      → 5 min 30 sec → 330 seconds
    - "PT1H2M15S"    → 1 hr 2 min 15 sec → 3735 seconds
    - "PT45S"        → 45 seconds
    - "P0D"          → 0 seconds (live stream artifact)
    """
    if not duration_str or duration_str in ("P0D", "PT0S", ""):
        return 0

    # Pattern: PT(hours)H(minutes)M(seconds)S — each part is optional
    pattern = r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?"
    match = re.match(pattern, str(duration_str))

    if not match:
        return 0

    hours   = int(match.group(1) or 0)
    minutes = int(match.group(2) or 0)
    seconds = int(match.group(3) or 0)

    return (hours * 3600) + (minutes * 60) + seconds


# Apply to every row
df_clean["duration_seconds"] = df_clean["duration"].apply(parse_iso_duration)
df_clean["duration_minutes"] = (df_clean["duration_seconds"] / 60).round(2)

print("Duration parsing examples:")
print(df_clean[["title", "duration", "duration_seconds", "duration_minutes"]].head(5))
```

> **What to say:** *"The API encodes duration as 'PT5M30S'. PT means Period of Time. H, M, S stand for Hours, Minutes, Seconds. The `?` in our pattern means 'this part is optional' — not every video is over an hour. We use a regular expression to find the numbers before each letter."*

> **Instructor Note:** Do not spend time teaching regex in depth. Say: *"Regular expressions are a pattern-matching language. We will not go deep on them today — just understand that this function reliably converts that cryptic format into a usable number."*

### Cell 9: Compute Engagement Metrics

```python
# ── ENGAGEMENT RATE ─────────────────────────────────────────────────────────
# Measures how much the audience interacts relative to total viewers
# Formula: (Likes + Comments) / Views
#
# Why add Likes AND Comments?
# Both are deliberate audience actions. Together they capture
# passive appreciation (likes) and active participation (comments).

df_clean["engagement_rate"] = (
    (df_clean["like_count"] + df_clean["comment_count"])
    / df_clean["view_count"].replace(0, 1)   # replace(0,1) prevents division by zero
)

# ── LIKE RATIO ───────────────────────────────────────────────────────────────
# What fraction of viewers actively approved of the video?
df_clean["like_ratio"] = (
    df_clean["like_count"]
    / df_clean["view_count"].replace(0, 1)
)

# ── COMMENT RATIO ────────────────────────────────────────────────────────────
# How conversational / discussion-generating is the video?
df_clean["comment_ratio"] = (
    df_clean["comment_count"]
    / df_clean["view_count"].replace(0, 1)
)

# ── TAG COUNT ────────────────────────────────────────────────────────────────
# Number of tags used — a proxy for discoverability optimization
df_clean["tag_count"] = df_clean["tags"].apply(
    lambda x: len(x) if isinstance(x, list) else 0
)

print("Engagement metrics created successfully!")
print("\nSample output:")
print(df_clean[[
    "title", "view_count", "like_count", "comment_count",
    "engagement_rate", "like_ratio", "comment_ratio"
]].head(3).to_string())
```

> **Key concept to stress:** *"Derived metrics are almost always more valuable than raw counts. A video with 10,000 views and 1,000 likes has a 10% like ratio — exceptional. A video with 1 million views and 5,000 likes has 0.5% — that is poor. Raw numbers are deceptive. Ratios reveal the truth."*

> **Why `.replace(0, 1)`?** *"If a video has 0 views and we divide by 0, Python throws an error. Replacing 0 with 1 keeps the math intact while producing a near-zero rate for those videos. We do not delete them — they may still matter for upload frequency analysis."*

### Cell 10: Create Duration Categories

```python
# Group continuous duration into labelled bins for easier analysis
df_clean["duration_category"] = pd.cut(
    df_clean["duration_minutes"],
    bins=[0, 5, 10, 20, 60, float("inf")],
    labels=[
        "Short (< 5 min)",
        "Medium (5–10 min)",
        "Long (10–20 min)",
        "Extended (20–60 min)",
        "Marathon (60+ min)"
    ],
    right=True
)

print("Duration distribution:")
print(df_clean["duration_category"].value_counts().sort_index())
```

> **What to say:** *"pd.cut is a powerful function that turns a continuous number into a category. Instead of asking 'is 7.3 minutes better than 8.1 minutes?', we can ask 'do Medium videos outperform Short videos?' Binning makes groupby analysis cleaner."*

### Cell 11: Data Quality Report

```python
print("=" * 45)
print("       FINAL DATA QUALITY REPORT")
print("=" * 45)

print(f"\n Total videos:        {len(df_clean)}")
print(f" Date range:          {df_clean['published_at'].min().date()} "
      f"→ {df_clean['published_at'].max().date()}")
print(f" Avg engagement rate: {df_clean['engagement_rate'].mean() * 100:.2f}%")
print(f" Avg views:           {df_clean['view_count'].mean():,.0f}")

print("\n Missing values in key columns:")
key_cols = ["view_count", "like_count", "comment_count",
            "engagement_rate", "duration_minutes"]
print(df_clean[key_cols].isnull().sum().to_string())

print("\n Duration categories:")
print(df_clean["duration_category"].value_counts().sort_index().to_string())

print("\n Data is clean and ready for analysis!")
```

### Key Teaching Points

- `df.copy()` before any modification — always protect raw data
- `errors='coerce'` + `.fillna(0)` is production-grade type handling
- Derived metrics (ratios) are more meaningful than raw counts
- `.replace(0, 1)` before division prevents errors without removing data
- Feature engineering creates analytical value that does not exist in raw data

### Common Student Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Modifying `df_raw` directly | Cannot recover original data | Always assign to `df_clean = df_raw.copy()` |
| Dividing by `view_count` without protection | `inf` values, division errors | Use `.replace(0, 1)` |
| Running Cell 9 before Cell 8 | Wrong duration columns | Run cells strictly in order |
| `isinstance` not used for tags | `TypeError` on some rows | Always check type before calling `len()` |

### Questions to Ask Students

1. *"Why do we use `.replace(0, 1)` instead of just filtering out zero-view videos?"*
2. *"What is the difference between `view_count` and `engagement_rate`? Which is more useful for strategy?"*
3. *"If we have 95 videos after cleaning but started with 100, where did the 5 go?"*
4. *"What does 'feature engineering' mean? Can you name another derived metric we could create from the data we have?"*

---

##  Session 4: Quick Data Inspection

**Time:** 11:40 – 12:00 | **Duration:** 20 minutes
**Format:** Live coding + Discussion
**Goal:** Students see their first meaningful insights before lunch

### Learning Objective

Students run `.describe()`, check correlations, and create a simple chart — experiencing their first analytical rewards before the break.

### Cell 12: Descriptive Statistics

```python
# Summary statistics for all numeric columns
pd.set_option("display.float_format", "{:,.2f}".format)

print("=== DESCRIPTIVE STATISTICS ===\n")
stats = df_clean[[
    "view_count", "like_count", "comment_count",
    "engagement_rate", "duration_minutes", "tag_count"
]].describe()

print(stats)
```

> **What to say:** *"describe() gives eight statistics: count, mean, standard deviation, minimum, and the four quartiles (25th, 50th, 75th percentile, max). Pay special attention to the 50th percentile — the median. If the mean views are much higher than the median, it means a few viral videos are pulling the average up. Most videos probably perform closer to the median."*

### Cell 13: Top 5 Most Viewed Videos

```python
print("=== TOP 5 MOST VIEWED VIDEOS ===\n")

top5 = (
    df_clean[["title", "view_count", "like_count", "comment_count", "engagement_rate"]]
    .sort_values("view_count", ascending=False)
    .head(5)
    .reset_index(drop=True)
)

for i, row in top5.iterrows():
    print(f"{i + 1}. {row['title'][:60]}")
    print(f"   Views: {row['view_count']:>12,} | Engagement: {row['engagement_rate'] * 100:.2f}%")
    print()
```

### Cell 14: Quick Correlation Check

```python
print("=== CORRELATION MATRIX ===\n")

corr_cols = [
    "view_count", "like_count", "comment_count",
    "engagement_rate", "duration_minutes"
]
corr = df_clean[corr_cols].corr()

print(corr.round(2))
print("\nKey: 1.0 = perfect positive | 0.0 = no relationship | -1.0 = perfect inverse")
```

> **What to say:** *"Correlation tells us whether two things move together. We will build a proper heatmap of this after lunch, but even here you can spot interesting patterns. Look at whether engagement_rate and view_count are strongly correlated — or not. What would it mean for your strategy if they are not?"*

### Cell 15: First Quick Bar Chart

```python
import matplotlib.pyplot as plt

# Top 10 most viewed videos — simple horizontal bar chart
top10 = df_clean.sort_values("view_count", ascending=True).tail(10)
labels = [t[:45] + "…" if len(t) > 45 else t for t in top10["title"]]

plt.figure(figsize=(12, 6))
plt.barh(labels, top10["view_count"], color="steelblue")
plt.xlabel("View Count", fontsize=12)
plt.title("Top 10 Most Viewed Videos (First Look)", fontsize=14, fontweight="bold")
plt.tight_layout()
plt.show()

print("First chart complete! We will build much more after lunch.")
```

### Close the Morning — Say This

> *"Look at this chart on the screen. Two hours ago, you started with zero lines of code. You have now connected to a real API, collected live YouTube data, cleaned it, and visualized it. After lunch, we make this analysis much deeper and start seriously answering those five business questions."*

### Questions to Ask Before Lunch Break

1. *"Looking at the correlation numbers: is the most viewed video also the most engaging?"*
2. *"What surprised you most in the descriptive statistics?"*
3. *"Come back after lunch with one question about this data that you want to answer."*

---

##  Lunch Break: Instructor Actions (12:00 – 1:30)

### Before Students Leave

Run this export code so students have a file for the afternoon:

```python
# Quick export before lunch
df_clean.to_csv("youtube_prelunch_backup.csv", index=False)
print(" Saved! Files panel (left sidebar) → right-click file → Download")
```

### Instructor Lunch Checklist

- [ ] Confirm all students have data loaded in their DataFrames
- [ ] Identify students who had API issues — prepare to give them the backup CSV
- [ ] Save your own instructor notebook to Drive
- [ ] Prepare a brief (2 minute) re-framing for the afternoon role switch

---

##  Afternoon Session: Analysis, Visualization & Reporting

### Afternoon Schedule

| Time | Session | Duration | Format |
|---|---|---|---|
| 1:30 – 2:15 | Session 5: Exploratory Data Analysis | 45 min | Live coding |
| 2:15 – 3:00 | Session 6: Deeper Insight Generation | 45 min | Live coding + Discussion |
| 3:00 – 3:15 | Break | 15 min | — |
| 3:15 – 4:00 | Session 7: Dashboard Creation | 45 min | Demo + Guided Activity |
| 4:00 – 4:30 | Session 8: Insight Presentation | 30 min | Student Presentations |

### Open the Afternoon With This

> *"This morning, you were a Data Collector. You gathered raw material. This afternoon, you are a Data Analyst. Your job is to find patterns that answer real questions. And in the final hour, you become a Social Media Strategist — the person who tells the client what to do next."*

---

##  Session 5: Exploratory Data Analysis (EDA)

**Time:** 1:30 – 2:15 | **Duration:** 45 minutes
**Format:** Live coding | **Goal:** Build 6 charts answering the business questions

### Learning Objective

Students create professional-quality visualizations using matplotlib that directly address the 5 business questions established in Session 1.

### Frame EDA for Students

> *"EDA is about asking questions of data visually. We are not decorating a report — we are investigating. Every chart we build today should answer one clear question. If you cannot state what question a chart answers, reconsider whether to make it."*

### Cell 16: Global Chart Style Configuration

```python
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import numpy as np

# Configure consistent chart aesthetics
plt.rcParams.update({
    "figure.figsize":     (12, 6),
    "font.size":          11,
    "axes.titlesize":     14,
    "axes.titleweight":   "bold",
    "axes.spines.top":    False,
    "axes.spines.right":  False,
    "figure.dpi":         100,
})

print(" Chart style configured.")
```

### Chart 1: Top 10 Most Viewed Videos

**Business Question Answered:** Which videos drive the most reach?

```python
fig, ax = plt.subplots(figsize=(13, 7))

top10_views = df_clean.sort_values("view_count", ascending=True).tail(10)
labels = [t[:50] + "…" if len(t) > 50 else t for t in top10_views["title"]]

bars = ax.barh(labels, top10_views["view_count"], color="steelblue", height=0.6)
ax.bar_label(
    bars,
    labels=[f"{v / 1e6:.1f}M" if v >= 1e6 else f"{v / 1e3:.0f}K"
            for v in top10_views["view_count"]],
    padding=4, fontsize=9
)

ax.set_xlabel("Total Views")
ax.set_title("Top 10 Most Viewed Videos")
ax.xaxis.set_major_formatter(
    plt.FuncFormatter(lambda x, _: f"{x/1e6:.1f}M" if x >= 1e6 else f"{x/1e3:.0f}K")
)

plt.tight_layout()
plt.savefig("chart1_top10_views.png", dpi=150, bbox_inches="tight")
plt.show()
print("Chart 1 saved.")
```

> **Teaching point:** *"We used horizontal bars so long titles are readable. We formatted numbers as K and M — you should never show a 7-digit raw number to a stakeholder. And we saved the chart as a PNG file, because these go into the final report."*

### Chart 2: Top 10 Highest Engagement Rate

**Business Question Answered:** Which videos connect most deeply with the audience?

```python
fig, ax = plt.subplots(figsize=(13, 7))

top10_eng = df_clean.sort_values("engagement_rate", ascending=True).tail(10)
labels = [t[:50] + "…" if len(t) > 50 else t for t in top10_eng["title"]]

bars = ax.barh(labels, top10_eng["engagement_rate"] * 100, color="coral", height=0.6)
ax.bar_label(
    bars,
    labels=[f"{v * 100:.2f}%" for v in top10_eng["engagement_rate"]],
    padding=4, fontsize=9
)

ax.set_xlabel("Engagement Rate (%)")
ax.set_title("Top 10 Highest Engagement Rate Videos")

plt.tight_layout()
plt.savefig("chart2_top10_engagement.png", dpi=150, bbox_inches="tight")
plt.show()
print("Chart 2 saved.")
```

> **Discussion prompt:** *"Are the top 10 viewed videos the same as the top 10 engaged videos? If they are different lists, what does that tell us about what 'success' means?"*

### Chart 3: Upload Frequency Over Time

**Business Question Answered:** How consistent is the channel's publishing schedule?

```python
monthly_uploads = (
    df_clean
    .groupby(["publish_year", "publish_month"])
    .size()
    .reset_index(name="upload_count")
)

monthly_uploads["date"] = pd.to_datetime(
    monthly_uploads
    .assign(day=1)
    [["publish_year", "publish_month", "day"]]
    .rename(columns={"publish_year": "year", "publish_month": "month"})
)

fig, ax = plt.subplots(figsize=(14, 5))

ax.plot(
    monthly_uploads["date"], monthly_uploads["upload_count"],
    marker="o", linewidth=2, color="mediumseagreen", markersize=5
)
ax.fill_between(
    monthly_uploads["date"], monthly_uploads["upload_count"],
    alpha=0.15, color="mediumseagreen"
)

ax.set_xlabel("Month")
ax.set_ylabel("Videos Published")
ax.set_title("Upload Frequency Over Time")
ax.xaxis.set_major_formatter(mdates.DateFormatter("%b %Y"))
plt.xticks(rotation=45, ha="right")

plt.tight_layout()
plt.savefig("chart3_upload_frequency.png", dpi=150, bbox_inches="tight")
plt.show()
print("Chart 3 saved.")
```

### Chart 4: Monthly Average Views Trend

**Business Question Answered:** Is the channel's reach growing, declining, or flat over time?

```python
monthly_avg = (
    df_clean
    .groupby(["publish_year", "publish_month"])["view_count"]
    .mean()
    .reset_index()
)

monthly_avg["date"] = pd.to_datetime(
    monthly_avg
    .assign(day=1)
    [["publish_year", "publish_month", "day"]]
    .rename(columns={"publish_year": "year", "publish_month": "month"})
)

fig, ax = plt.subplots(figsize=(14, 5))

ax.plot(
    monthly_avg["date"], monthly_avg["view_count"],
    marker="s", linewidth=2, color="darkorange", markersize=5
)

ax.set_xlabel("Month")
ax.set_ylabel("Average Views per Video")
ax.set_title("Monthly Average Views Trend")
ax.yaxis.set_major_formatter(
    plt.FuncFormatter(lambda x, _: f"{x/1e6:.1f}M" if x >= 1e6 else f"{x/1e3:.0f}K")
)
ax.xaxis.set_major_formatter(mdates.DateFormatter("%b %Y"))
plt.xticks(rotation=45, ha="right")

plt.tight_layout()
plt.savefig("chart4_monthly_avg_views.png", dpi=150, bbox_inches="tight")
plt.show()
print("Chart 4 saved.")
```

### Chart 5: Views vs. Engagement Rate (Scatter Plot)

**Business Question Answered:** Do popular videos also engage deeply, or are they different audiences?

```python
fig, ax = plt.subplots(figsize=(10, 7))

scatter = ax.scatter(
    df_clean["view_count"],
    df_clean["engagement_rate"] * 100,
    c=df_clean["duration_minutes"],
    cmap="plasma",
    alpha=0.65,
    s=70,
    edgecolors="white",
    linewidths=0.4
)

cbar = plt.colorbar(scatter, ax=ax)
cbar.set_label("Duration (minutes)", fontsize=10)

ax.set_xlabel("View Count")
ax.set_ylabel("Engagement Rate (%)")
ax.set_title("Views vs. Engagement Rate\n(color = video duration)")
ax.xaxis.set_major_formatter(
    plt.FuncFormatter(lambda x, _: f"{x/1e6:.1f}M" if x >= 1e6 else f"{x/1e3:.0f}K")
)

plt.tight_layout()
plt.savefig("chart5_scatter_views_engagement.png", dpi=150, bbox_inches="tight")
plt.show()
print("Chart 5 saved.")
```

> **Teaching point:** *"This scatter plot encodes three variables simultaneously: X-axis is views, Y-axis is engagement, and color represents duration. This is called a multivariate visualization. Look for clusters — do videos of a certain length tend to cluster in a particular part of the chart?"*

### Chart 6: Engagement Rate Distribution (Histogram)

**Business Question Answered:** What does a 'typical' video for this channel look like?

```python
mean_er   = df_clean["engagement_rate"].mean() * 100
median_er = df_clean["engagement_rate"].median() * 100

fig, ax = plt.subplots(figsize=(10, 6))

ax.hist(df_clean["engagement_rate"] * 100, bins=30,
        color="mediumpurple", edgecolor="white", alpha=0.85)

ax.axvline(mean_er,   color="red",    linestyle="--", linewidth=2,
           label=f"Mean:   {mean_er:.2f}%")
ax.axvline(median_er, color="orange", linestyle="-.", linewidth=2,
           label=f"Median: {median_er:.2f}%")

ax.set_xlabel("Engagement Rate (%)")
ax.set_ylabel("Number of Videos")
ax.set_title("Distribution of Engagement Rates Across All Videos")
ax.legend()

plt.tight_layout()
plt.savefig("chart6_engagement_distribution.png", dpi=150, bbox_inches="tight")
plt.show()
print("Chart 6 saved.")
```

> **Teaching point:** *"If the mean is much higher than the median, the distribution is right-skewed — a few viral videos are pulling the average up. The median tells you what a typical video actually achieves. Which number would you quote to the channel manager?"*

### Key Teaching Points for Session 5

- Choose chart type based on the question: comparison → bar, trend → line, relationship → scatter, distribution → histogram
- Always label axes and format numbers (K, M, %) — raw 7-digit numbers confuse stakeholders
- Save every chart as PNG — they go into the final report
- Every chart must answer exactly one question from the list on the board

### Questions to Ask Students

1. *"Which chart surprised you most? What does it change about your initial assumptions?"*
2. *"If you could show only ONE chart to the channel manager, which would you choose and why?"*
3. *"Chart 5: does high view count always mean high engagement? What are the business implications if those two things are unrelated?"*
4. *"Why do we show both mean AND median on the histogram? Which number is more honest?"*

---

##  Session 6: Deeper Insight Generation

**Time:** 2:15 – 3:00 | **Duration:** 45 minutes
**Format:** Live coding + facilitated discussion
**Goal:** Move from descriptive analytics → diagnostic insights

### Learning Objective

Students use correlation analysis, day-of-week comparison, and duration groupby to diagnose *why* performance patterns exist — not just what they are.

### Frame the Shift for Students

> *"Session 5 was descriptive analytics — we described what happened. Now we do diagnostic analytics — we investigate why. We are moving from 'what' to 'so what'."*

### Cell 23: Correlation Heatmap

```python
corr_cols = [
    "view_count", "like_count", "comment_count",
    "engagement_rate", "duration_minutes", "tag_count"
]
corr_matrix = df_clean[corr_cols].corr()

fig, ax = plt.subplots(figsize=(9, 7))

im = ax.imshow(corr_matrix, cmap="RdYlGn", vmin=-1, vmax=1, aspect="auto")
plt.colorbar(im, ax=ax, shrink=0.8)

clean_labels = ["Views", "Likes", "Comments",
                "Engagement Rate", "Duration (min)", "Tag Count"]
ax.set_xticks(range(len(corr_cols)))
ax.set_yticks(range(len(corr_cols)))
ax.set_xticklabels(clean_labels, rotation=45, ha="right", fontsize=10)
ax.set_yticklabels(clean_labels, fontsize=10)

for i in range(len(corr_matrix)):
    for j in range(len(corr_matrix.columns)):
        val = corr_matrix.iloc[i, j]
        text_color = "white" if abs(val) > 0.65 else "black"
        ax.text(j, i, f"{val:.2f}", ha="center", va="center",
                fontsize=9, fontweight="bold", color=text_color)

ax.set_title("Correlation Heatmap: YouTube Performance Metrics")
plt.tight_layout()
plt.savefig("chart7_correlation_heatmap.png", dpi=150, bbox_inches="tight")
plt.show()
```

> **What to say:** *"Green = strong positive relationship. Red = inverse relationship. White = no relationship. Look at the row for engagement_rate. Is it strongly correlated with views? If the correlation is weak, it means you can have a viral video with low engagement — and a low-view video with incredibly engaged fans. Which type of video is more valuable to a brand?"*

### Cell 24: Performance by Day of Week

```python
day_order = ["Monday", "Tuesday", "Wednesday", "Thursday",
             "Friday", "Saturday", "Sunday"]

day_stats = (
    df_clean
    .groupby("publish_day_of_week")
    .agg(
        avg_views=("view_count", "mean"),
        avg_engagement=("engagement_rate", "mean"),
        video_count=("video_id", "count")
    )
    .reindex(day_order)
    .fillna(0)
)

fig, axes = plt.subplots(1, 2, figsize=(16, 6))

# Left: Average views by day
weekday_colors = ["#90CAF9"] * 5 + ["#1565C0"] * 2   # Weekend highlighted
bars1 = axes[0].bar(day_order, day_stats["avg_views"], color=weekday_colors)
axes[0].set_title("Average Views by Publish Day")
axes[0].set_ylabel("Average Views")
axes[0].tick_params(axis="x", rotation=30)
axes[0].yaxis.set_major_formatter(
    plt.FuncFormatter(lambda x, _: f"{x/1e3:.0f}K" if x >= 1000 else str(int(x)))
)

# Right: Average engagement by day
eng_colors = ["#FFAB91"] * 5 + ["#BF360C"] * 2
bars2 = axes[1].bar(day_order, day_stats["avg_engagement"] * 100, color=eng_colors)
axes[1].set_title("Average Engagement Rate by Publish Day")
axes[1].set_ylabel("Engagement Rate (%)")
axes[1].tick_params(axis="x", rotation=30)

# Annotate with sample count (n=)
for ax in axes:
    for j, day in enumerate(day_order):
        count = int(day_stats.loc[day, "video_count"]) if day in day_stats.index else 0
        ax.annotate(f"n={count}", xy=(j, 0), xytext=(0, 4),
                    textcoords="offset points", ha="center", fontsize=8, color="gray")

plt.suptitle("Performance by Day of Week", fontsize=14, fontweight="bold")
plt.tight_layout()
plt.savefig("chart8_day_of_week.png", dpi=150, bbox_inches="tight")
plt.show()
```

> **Key teaching point:** *"Notice the n= labels under each bar — the sample size. If Saturday only has 2 videos, a high Saturday average is statistically meaningless. Always report sample sizes alongside averages. This is the difference between honest reporting and misleading reporting."*

### Cell 25: Engagement Rate by Video Duration

```python
duration_data  = df_clean.dropna(subset=["duration_category"])

duration_stats = (
    duration_data
    .groupby("duration_category", observed=True)
    .agg(
        avg_engagement=("engagement_rate", "mean"),
        avg_views=("view_count", "mean"),
        count=("video_id", "count")
    )
)

fig, ax = plt.subplots(figsize=(11, 6))

colors = ["#4CAF50", "#8BC34A", "#FFC107", "#FF9800", "#F44336"]
bars = ax.bar(
    duration_stats.index,
    duration_stats["avg_engagement"] * 100,
    color=colors[:len(duration_stats)],
    width=0.55
)

ax.bar_label(
    bars,
    labels=[f"{v * 100:.2f}%\n(n={int(c)})"
            for v, c in zip(duration_stats["avg_engagement"], duration_stats["count"])],
    padding=5, fontsize=10
)

ax.set_xlabel("Video Duration Category")
ax.set_ylabel("Average Engagement Rate (%)")
ax.set_title("Does Video Duration Affect Audience Engagement?")
ax.tick_params(axis="x", labelsize=10)

plt.tight_layout()
plt.savefig("chart9_duration_vs_engagement.png", dpi=150, bbox_inches="tight")
plt.show()
```

### Cell 26: Upload Consistency vs. Average Views (Dual-Axis)

```python
monthly_summary = (
    df_clean
    .groupby(["publish_year", "publish_month"])
    .agg(
        uploads=("video_id", "count"),
        avg_views=("view_count", "mean"),
        avg_engagement=("engagement_rate", "mean")
    )
    .reset_index()
)

monthly_summary["date"] = pd.to_datetime(
    monthly_summary.assign(day=1)
    [["publish_year", "publish_month", "day"]]
    .rename(columns={"publish_year": "year", "publish_month": "month"})
)

fig, ax1 = plt.subplots(figsize=(14, 6))
ax2 = ax1.twinx()

ax1.bar(monthly_summary["date"], monthly_summary["uploads"],
        width=20, alpha=0.5, color="steelblue", label="Uploads per Month")
ax2.plot(monthly_summary["date"], monthly_summary["avg_views"],
         color="firebrick", linewidth=2, marker="o", markersize=4, label="Avg Views")

ax1.set_xlabel("Month")
ax1.set_ylabel("Uploads per Month", color="steelblue")
ax2.set_ylabel("Average Views per Video", color="firebrick")
ax1.set_title("Upload Consistency vs. Average Views Over Time")
ax1.xaxis.set_major_formatter(mdates.DateFormatter("%b %Y"))
plt.xticks(rotation=45, ha="right")

lines1, labels1 = ax1.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax1.legend(lines1 + lines2, labels1 + labels2, loc="upper left")

plt.tight_layout()
plt.savefig("chart10_consistency_vs_views.png", dpi=150, bbox_inches="tight")
plt.show()
```

> **What to say:** *"A dual-axis chart lets us overlay two different scales on the same timeline. Does posting more videos in a month correlate with higher or lower average views per video? Some channels cannibalize themselves by posting too often — each video gets less attention. Others grow by staying consistent. What does your data say?"*

### Key Teaching Points for Session 6

- Correlation is not causation — always discuss alternative explanations
- Sample size is always relevant — n=2 means nothing, n=50 is meaningful
- `groupby().agg()` is the analyst's most versatile pandas tool
- Diagnostic analytics asks *why* — descriptive analytics asks *what*
- Honest analysts report sample sizes alongside every aggregated statistic

### Facilitation Questions for Discussion

1. *"What correlation surprised you the most? Can you think of a reason WHY that relationship exists?"*
2. *"If longer videos have lower engagement, does that definitely mean the channel should make shorter videos? What are other possible explanations?"*
3. *"What is the ONE finding from this session you would tell the channel manager first? And how would you explain it in plain English?"*
4. *"Which of the 5 business questions have we answered confidently? Which still feels unclear?"*

---

##  Break (3:00 – 3:15)

### Before Students Leave for Break — Run This

```python
# Export final clean dataset for dashboard creation
export_columns = [
    "video_id", "title", "published_at", "publish_date",
    "publish_year", "publish_month", "publish_month_name",
    "publish_day_of_week", "publish_quarter",
    "view_count", "like_count", "comment_count",
    "duration_minutes", "duration_category", "tag_count",
    "engagement_rate", "like_ratio", "comment_ratio"
]

df_export = df_clean[export_columns].copy()

# Convert rates to percentages for easier dashboard formatting
df_export["engagement_rate"] = (df_export["engagement_rate"] * 100).round(4)
df_export["like_ratio"]      = (df_export["like_ratio"]      * 100).round(4)
df_export["comment_ratio"]   = (df_export["comment_ratio"]   * 100).round(4)

df_export.to_csv("youtube_analytics_final.csv", index=False)
print(f" Exported {len(df_export)} videos to youtube_analytics_final.csv")
print(" Files panel (left sidebar in Colab) → right-click → Download")
```

> Tell students: *"Download this file before you leave. We need it for the dashboard. Go to the Files panel on the left sidebar, right-click the file, and download."*

---

##  Session 7: Dashboard Creation

**Time:** 3:15 – 4:00 | **Duration:** 45 minutes
**Format:** Demo + Guided Activity
**Two options — choose based on student access**

### Learning Objective

Students create a business-ready dashboard that translates raw analysis into an executive-facing view of the channel's performance.

### Frame This Session for Students

> *"You have done the analysis. Now you need to communicate it. Analysts write for analysts. Dashboards are written for managers. The dashboard should answer the most common questions a non-technical manager would ask — without requiring the analyst in the room to explain every number."*

---

### Option A: Matplotlib Summary Dashboard

Use this option when students have internet issues or cannot access Looker Studio.

```python
fig = plt.figure(figsize=(20, 15))
fig.suptitle("YouTube Channel Performance Dashboard",
             fontsize=20, fontweight="bold", y=0.99)

# ── Panel 1 (top-left): Top 5 Videos by Views ───────────────────────────────
ax1 = fig.add_subplot(3, 3, (1, 2))
top5v = df_clean.sort_values("view_count", ascending=True).tail(5)
labels_v = [t[:38] + "…" if len(t) > 38 else t for t in top5v["title"]]
ax1.barh(labels_v, top5v["view_count"], color="#1565C0", height=0.5)
ax1.set_title("Top 5 Videos by Views", fontweight="bold")
ax1.xaxis.set_major_formatter(
    plt.FuncFormatter(lambda x, _: f"{x/1e6:.1f}M" if x >= 1e6 else f"{x/1e3:.0f}K")
)

# ── Panel 2 (top-right): KPI Summary ────────────────────────────────────────
ax2 = fig.add_subplot(3, 3, 3)
ax2.axis("off")
kpi_text = (
    f"CHANNEL KPIs\n"
    f"{'─' * 22}\n"
    f"Videos Analyzed:  {len(df_clean)}\n"
    f"Total Views:  {df_clean['view_count'].sum():>12,.0f}\n"
    f"Total Likes:  {df_clean['like_count'].sum():>12,.0f}\n"
    f"Avg Engagement: {df_clean['engagement_rate'].mean() * 100:.2f}%\n"
    f"Avg Duration: {df_clean['duration_minutes'].mean():.1f} min\n"
    f"Date Range:\n  {df_clean['published_at'].min().strftime('%b %Y')} → "
    f"{df_clean['published_at'].max().strftime('%b %Y')}"
)
ax2.text(0.05, 0.9, kpi_text, transform=ax2.transAxes,
         fontsize=10, verticalalignment="top", fontfamily="monospace",
         bbox=dict(boxstyle="round,pad=0.6", facecolor="#E3F2FD", alpha=0.9))

# ── Panel 3 (middle-left): Upload Frequency ─────────────────────────────────
ax3 = fig.add_subplot(3, 3, (4, 5))
monthly_u = (df_clean.groupby(["publish_year", "publish_month"])
             .size().reset_index(name="count"))
monthly_u["date"] = pd.to_datetime(
    monthly_u.assign(day=1)
    [["publish_year", "publish_month", "day"]]
    .rename(columns={"publish_year": "year", "publish_month": "month"}))
ax3.plot(monthly_u["date"], monthly_u["count"], marker="o",
         color="#2E7D32", linewidth=1.8, markersize=4)
ax3.fill_between(monthly_u["date"], monthly_u["count"], alpha=0.15, color="#2E7D32")
ax3.set_title("Upload Frequency Over Time", fontweight="bold")
ax3.xaxis.set_major_formatter(mdates.DateFormatter("%b %y"))
plt.setp(ax3.xaxis.get_majorticklabels(), rotation=40, ha="right")

# ── Panel 4 (middle-right): Engagement by Duration ──────────────────────────
ax4 = fig.add_subplot(3, 3, 6)
dur_g = (df_clean.dropna(subset=["duration_category"])
         .groupby("duration_category", observed=True)["engagement_rate"]
         .mean() * 100)
ax4.bar(range(len(dur_g)), dur_g.values,
        color=["#4CAF50", "#8BC34A", "#FFC107", "#FF9800", "#F44336"][:len(dur_g)])
ax4.set_xticks(range(len(dur_g)))
ax4.set_xticklabels(dur_g.index, rotation=30, ha="right", fontsize=8)
ax4.set_title("Engagement by Duration", fontweight="bold")
ax4.set_ylabel("Avg Engagement (%)")

# ── Panel 5 (bottom): Views vs Engagement Scatter ────────────────────────────
ax5 = fig.add_subplot(3, 3, (7, 9))
sc = ax5.scatter(df_clean["view_count"], df_clean["engagement_rate"] * 100,
                 c=df_clean["duration_minutes"], cmap="viridis",
                 alpha=0.6, s=55, edgecolors="white", lw=0.3)
plt.colorbar(sc, ax=ax5, label="Duration (min)")
ax5.set_xlabel("View Count")
ax5.set_ylabel("Engagement Rate (%)")
ax5.set_title("Views vs. Engagement Rate (color = duration)", fontweight="bold")
ax5.xaxis.set_major_formatter(
    plt.FuncFormatter(lambda x, _: f"{x/1e6:.1f}M" if x >= 1e6 else f"{x/1e3:.0f}K")
)

plt.tight_layout(rect=[0, 0, 1, 0.97])
plt.savefig("dashboard_summary.png", dpi=150, bbox_inches="tight")
plt.show()
print(" Dashboard saved as dashboard_summary.png")
```

---

### Option B (Recommended): Google Looker Studio Dashboard

Use when all students have downloaded the CSV and have Google accounts.

#### Step 1: Upload CSV to Google Sheets

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **Blank spreadsheet**
3. Click **File → Import**
4. Click **Upload** → select `youtube_analytics_final.csv`
5. Import settings: **Replace current sheet** → Click **Import data**
6. Rename the sheet tab if desired

#### Step 2: Connect to Looker Studio

1. Go to [lookerstudio.google.com](https://lookerstudio.google.com)
2. Click **+ Blank Report**
3. In the **Add data to report** panel, click **Google Sheets**
4. Authorize access → Select your spreadsheet → Select the worksheet tab
5. Click **Add** → **Add to report**

#### Step 3: Build the Dashboard — Element by Element

**KPI Scorecard Cards (create 3 side by side)**

1. Click **Insert → Scorecard**
2. Data panel (right): Set **Metric** = `view_count`, Aggregation = **Sum**
3. Label it **"Total Views"**
4. Repeat for `like_count` → **"Total Likes"** and `comment_count` → **"Total Comments"**
5. For Avg Engagement: Metric = `engagement_rate`, Aggregation = **Average**

**Time Series Chart — Monthly Views**

1. **Insert → Time series chart**
2. Dimension: `published_at` → Date granularity: **Month**
3. Metric: `view_count` → Aggregation: **Sum**
4. Style: Line, show data points

**Top Videos Table**

1. **Insert → Table**
2. Dimensions: `title`, `publish_date`
3. Metrics: `view_count` (Sum), `engagement_rate` (Average), `like_count` (Sum)
4. Sort: `view_count` Descending
5. Row limit: 10

**Engagement by Day of Week — Bar Chart**

1. **Insert → Bar chart**
2. Dimension: `publish_day_of_week`
3. Metric: `engagement_rate` → Aggregation: **Average**
4. Sort: Metric, Descending

**Duration vs. Engagement — Scatter Chart**

1. **Insert → Scatter chart**
2. Dimension: `title`
3. X-axis: `duration_minutes` (Average)
4. Y-axis: `engagement_rate` (Average)
5. Bubble size: `view_count` (Sum)

**Add Filters for Interactivity**

1. **Insert → Date range control** (allows filtering by time period)
2. **Insert → Filter control** → Field: `duration_category`
3. **Insert → Filter control** → Field: `publish_year`

#### Step 4: Polish and Share

1. Add a title text box: `[Channel Name] — YouTube Performance Dashboard`
2. Set color theme: **Theme and Layout** panel → choose a professional palette
3. Confirm view access: **Share → Manage access → Anyone with the link → Viewer**
4. Copy the share link for submission

> **What to say:** *"This is what you hand to a client or your manager. The filters let them explore the data themselves. A good dashboard replaces 10 emails asking 'can you send me the number for X?' — the answer is always in the dashboard."*

### Key Teaching Points for Session 7

- Dashboard audience = executives, not analysts
- Less is more: 5 great panels beat 20 mediocre ones
- KPI scorecards at the top give instant context before any chart is read
- Filters enable self-service — your stakeholder should not need you present to use the dashboard
- Every panel should trace back to one of the 5 business questions

---

##  Session 8: Insight Presentation & Recommendations

**Time:** 4:00 – 4:30 | **Duration:** 30 minutes
**Format:** Individual writing + Student presentations + Group debrief

### Learning Objective

Students articulate data-backed business recommendations in plain, non-technical language appropriate for a channel manager.

### The Executive Brief Template

Give students 8 minutes to write this individually (in their workbook or a Google Doc):

```
╔══════════════════════════════════════════════════════════╗
║         YOUTUBE CHANNEL PERFORMANCE BRIEF                ║
╠══════════════════════════════════════════════════════════╣
║ Channel:         [Channel Name]                          ║
║ Analysis Period: [Start Date] → [End Date]               ║
║ Videos Analyzed: [N]                                     ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  TOP FINDINGS:                                           ║
║  1. [Finding + supporting number/percentage]             ║
║  2. [Finding + supporting number/percentage]             ║
║  3. [Finding + supporting number/percentage]             ║
║                                                          ║
║  CONTENT STRATEGY RECOMMENDATION:                        ║
║  [1-2 sentences: what type of content to make more of]   ║
║                                                          ║
║  POSTING STRATEGY RECOMMENDATION:                        ║
║  [1-2 sentences: when and how frequently to post]        ║
║                                                          ║
║  GROWTH OPPORTUNITY:                                     ║
║  [1 insight about what the channel should try next]      ║
║                                                          ║
║  HONEST CAVEAT:                                          ║
║  [1 limitation of your analysis the manager should know] ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### Student Presentations

- Ask for 3–4 volunteers to present (2 minutes each)
- Students speak directly to the class as if presenting to the channel manager
- After each presentation, ask 1 follow-up question from the list below

### Instructor Facilitation Questions

Use these to push analytical depth during presentations:

1. *"You mentioned videos with higher engagement tend to be shorter. What is your sample size for that finding? Should we act on it?"*
2. *"You recommended posting on Tuesdays. What does that mean in practice — what should the channel manager change starting next week?"*
3. *"What is one thing your analysis could not tell you? What extra data would make your recommendation stronger?"*
4. *"If the channel had a budget of $3,000, where would you direct it based on your data?"*
5. *"Is there anything the data showed that seemed counterintuitive? How would you explain it?"*

### Closing the Workshop

> *"This morning you were a data collector. This afternoon you became an analyst. Just now you were a strategist. That progression — collect, clean, analyze, visualize, recommend — is exactly the workflow that professional analysts at agencies, brands, and in-house marketing teams follow every single day. The tools change. The API might be TikTok or Instagram next time. The platform might be Tableau instead of Looker Studio. But the thinking process — starting from a business question and ending with a concrete recommendation backed by data — that never changes."*

### Final Deliverables Checklist

Students should submit:

- [ ] **Google Colab notebook** (.ipynb) saved to Drive — share link with instructor
- [ ] **Clean CSV file** (`youtube_analytics_final.csv`) — downloaded and uploaded to submission
- [ ] **Dashboard link** (Looker Studio, shared as "Anyone with link can view") OR `dashboard_summary.png`
- [ ] **Executive brief** (written in workbook or Google Doc — 1 page maximum)

---

##  Assessment Rubric

### Workshop Assessment: YouTube Analytics Analysis

**Total: 100 points**

| Component | Points | Excellent (90–100%) | Proficient (70–89%) | Developing (50–69%) | Needs Work (< 50%) |
|---|---|---|---|---|---|
| **Data Collection** | 20 | API connected, 50+ videos, code documented with comments | API connected, 30–50 videos, minimal comments | Used backup CSV, partial code present | No data collected, no code |
| **Data Cleaning** | 15 | All data types correct, missing values handled, rationale explained in comments | Most types correct, minor issues remain | Partial cleaning, some columns still wrong type | Raw uncleaned data used for analysis |
| **Feature Engineering** | 15 | All 5 features correct: engagement_rate, like_ratio, comment_ratio, date features, duration category | 3–4 features correct | 1–2 features present | No derived features created |
| **Visualizations** | 20 | 5+ charts, all labelled (title, axis labels, units), correct chart type per question | 3–4 charts, mostly labelled, minor type mismatches | 1–2 charts, minimal labels | No charts produced |
| **Dashboard** | 10 | Looker Studio: 4+ panels, filters, KPI scorecards, shareable link | Matplotlib dashboard: 3+ panels with labels | Single chart called a dashboard | No dashboard |
| **Executive Brief** | 20 | 3 specific findings with data, concrete recommendations with specifics, honest caveat stated | 2 findings, general recommendations, no caveat | 1 finding, vague recommendations | No written brief submitted |

### Grading Notes

- **API unavailable + backup dataset used with full code:** Deduct maximum 5 points from Data Collection only
- **Charts missing axis labels or titles:** -2 points per chart
- **Engagement rate formula incorrect** (e.g., Likes only, omitting Comments): Flag in feedback and ask student to revise
- **Executive brief recommending "just post more" without specifics:** Return for revision with prompt: "What specifically should they post more of, and on which days?"

---

##  Backup Plan: API Unavailable

> Activate this plan if more than 30% of students cannot complete API setup within 20 minutes, if you receive `quotaExceeded` errors, or if internet is unstable.

### When to Switch

| Signal | Response |
|---|---|
| Most students get `HttpError 400` | Walk through API key setup again; if still failing, switch |
| You see `HttpError 403: quotaExceeded` | Switch immediately — quota resets at midnight PST |
| Network too slow to load Colab | Move to downloaded backup CSV approach |

### Generate the Backup Dataset (Run on Your Machine in Advance)

```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

np.random.seed(42)
random.seed(42)

n_videos = 120
base_date = datetime(2022, 1, 1)

video_topics = [
    "Python Tutorial", "Machine Learning Explained", "Data Science Tips",
    "Excel for Analysts", "SQL Basics", "Career in Data Science",
    "Statistics 101", "Power BI Guide", "Tableau Dashboard",
    "Google Sheets Tricks", "Data Cleaning in Python", "Pandas Tutorial",
    "Matplotlib Visualization", "EDA Walkthrough", "API for Beginners",
    "pandas groupby", "Feature Engineering", "Dashboard Design",
]

titles = [
    f"{random.choice(video_topics)} - Part {random.randint(1, 8)}"
    for _ in range(n_videos)
]

# Simulate realistic log-normal view distribution (a few outliers, many mid-range)
view_counts    = np.random.lognormal(mean=10.5, sigma=1.2, size=n_videos).astype(int)
like_counts    = (view_counts * np.random.uniform(0.01, 0.08,  size=n_videos)).astype(int)
comment_counts = (view_counts * np.random.uniform(0.001, 0.015, size=n_videos)).astype(int)

# Simulate duration distribution: mostly medium videos
duration_pool = (
    [random.uniform(3, 5)   for _ in range(36)] +   # Short
    [random.uniform(7, 12)  for _ in range(48)] +   # Medium
    [random.uniform(15, 25) for _ in range(24)] +   # Long
    [random.uniform(30, 50) for _ in range(12)]     # Extended
)
random.shuffle(duration_pool)
durations_min = duration_pool[:n_videos]

published_dates = [
    base_date + timedelta(days=random.randint(0, 730))
    for _ in range(n_videos)
]

df_backup = pd.DataFrame({
    "video_id":      [f"vid_{i:04d}" for i in range(n_videos)],
    "title":         titles,
    "published_at":  pd.to_datetime(published_dates),
    "view_count":    view_counts,
    "like_count":    like_counts,
    "comment_count": comment_counts,
    "duration_minutes": [round(d, 1) for d in durations_min],
    "tag_count":     np.random.randint(5, 20, size=n_videos),
})

# Apply cleaning and feature engineering
df_backup["publish_year"]        = df_backup["published_at"].dt.year
df_backup["publish_month"]       = df_backup["published_at"].dt.month
df_backup["publish_month_name"]  = df_backup["published_at"].dt.strftime("%b")
df_backup["publish_day_of_week"] = df_backup["published_at"].dt.day_name()
df_backup["publish_quarter"]     = df_backup["published_at"].dt.quarter
df_backup["publish_date"]        = df_backup["published_at"].dt.date

df_backup["engagement_rate"] = (
    (df_backup["like_count"] + df_backup["comment_count"])
    / df_backup["view_count"].replace(0, 1)
)
df_backup["like_ratio"]    = df_backup["like_count"]    / df_backup["view_count"].replace(0, 1)
df_backup["comment_ratio"] = df_backup["comment_count"] / df_backup["view_count"].replace(0, 1)

df_backup["duration_category"] = pd.cut(
    df_backup["duration_minutes"],
    bins=[0, 5, 10, 20, 60, float("inf")],
    labels=["Short (< 5 min)", "Medium (5–10 min)",
            "Long (10–20 min)", "Extended (20–60 min)", "Marathon (60+ min)"]
)

df_backup.to_csv("youtube_backup_dataset.csv", index=False)
print(f" Backup dataset generated: {len(df_backup)} videos")
df_backup.head()
```

### Distribute the Backup Dataset

**Option A — Google Drive:**

1. Upload `youtube_backup_dataset.csv` to your Google Drive
2. Right-click → Share → Anyone with the link → Viewer
3. Copy the file ID from the URL (the long alphanumeric string)

Students load it with:

```python
import pandas as pd

# Instructor provides the FILE_ID
file_id = "PASTE_FILE_ID_HERE"
url = f"https://drive.google.com/uc?id={file_id}&export=download"

df_clean = pd.read_csv(url)
print(f" Loaded {len(df_clean)} videos from backup dataset")
df_clean.head()
```

**Option B — Direct Colab Upload:**
Share the file via classroom platform; students drag-and-drop it into the Colab Files panel, then:

```python
df_clean = pd.read_csv("youtube_backup_dataset.csv")
```

### What to Say to Students

> *"APIs sometimes hit rate limits or quota issues — this is completely normal in professional data work. Real analysts always have a contingency. Today we are using a synthetic dataset that accurately mirrors what a real educational YouTube channel looks like. Every analysis step is identical to what you would do with live data."*

**Skip Session 2's API code steps.** Resume directly at Session 3, noting that `df_clean` is already loaded and that Cells 6–10 can be verified quickly rather than run from scratch.

---

##  Appendix

### A. Complete Colab Cell Reference

| Cell | Content |
|---|---|
| 1 | `!pip install google-api-python-client --quiet` |
| 2 | Import libraries (googleapiclient, pandas, re, warnings) |
| 3 | API key + `youtube = build(...)` |
| 4 | `get_channel_video_ids()` function + call |
| 5 | `get_video_statistics()` function + call → `df_raw` |
| 6 | Numeric type conversion → `df_clean` |
| 7 | Date parsing + date feature extraction |
| 8 | `parse_iso_duration()` function + apply |
| 9 | engagement_rate, like_ratio, comment_ratio, tag_count |
| 10 | `duration_category` binning |
| 11 | Data quality report |
| 12 | `.describe()` statistics |
| 13 | Top 5 most viewed preview |
| 14 | Correlation matrix |
| 15 | First quick bar chart |
| 16 | Matplotlib style configuration |
| 17 | Chart 1 — Top 10 by views |
| 18 | Chart 2 — Top 10 by engagement rate |
| 19 | Chart 3 — Upload frequency over time |
| 20 | Chart 4 — Monthly average views trend |
| 21 | Chart 5 — Scatter: views vs. engagement |
| 22 | Chart 6 — Histogram: engagement distribution |
| 23 | Chart 7 — Correlation heatmap |
| 24 | Chart 8 — Day of week analysis |
| 25 | Chart 9 — Duration vs. engagement |
| 26 | Chart 10 — Consistency vs. views (dual-axis) |
| 27 | Multi-panel matplotlib dashboard (Option A) |
| 28 | CSV export: `youtube_analytics_final.csv` |

---

### B. Key Metric Formulas

```
Engagement Rate  = (Likes + Comments) / Views × 100
Like Ratio       = Likes / Views × 100
Comment Ratio    = Comments / Views × 100
Duration (min)   = Total Seconds / 60
```

---

### C. Recommended YouTube Channels for Live Demo

| Channel | Channel ID | Why Use It |
|---|---|---|
| TED | `UCAuUUnT6oDeKwE6v1NGQxug` | Large dataset, consistent format, varied topics |
| Kurzgesagt | `UCsXVk37bltHxD1rDPwtNM8Q` | Strong engagement patterns, clean data |
| Veritasium | `UCHnyfMqiRRG1u-2MsSQLbXA` | Mix of viral and niche, interesting outliers |
| Mark Rober | `UCY1kMZp36IQSyNx_9h4mpCg` | Clear viral patterns, good scatter plot data |

> **Before workshop day:** verify the channel ID is still valid. IDs can change. Check via the channel's About page URL.

---

### D. Common API Errors Quick Reference

| Error Code | Typical Cause | Resolution |
|---|---|---|
| `HttpError 400` | Invalid or malformed API key | Verify key; no trailing spaces |
| `HttpError 403 quotaExceeded` | Daily quota (10,000 units) hit | Use backup dataset immediately |
| `HttpError 403 keyInvalid` | Key not active or wrong project | Re-check Cloud Console |
| `KeyError: 'items'` | Wrong or non-existent channel ID | Verify ID starts with `UC` |
| `IndexError: list index out of range` | Channel has 0 public videos | Choose a different channel |
| `ModuleNotFoundError: googleapiclient` | Install cell not run | Re-run Cell 1 |
| `NameError: 'youtube' is not defined` | Cells run out of order | Restart runtime, run top to bottom |

---

### E. Student Submission Template

Share this with students at the start of Session 8:

```
YOUTUBE ANALYTICS WORKSHOP — SUBMISSION CHECKLIST
===================================================

Student Name:    ________________________________
Date:            ________________________________
Channel Analyzed: ______________________________
Videos in Dataset: ______________________________

DELIVERABLES:
[ ] Colab Notebook link: ________________________
    (Must be shared: "Anyone with link → Viewer")

[ ] Clean CSV file uploaded to: _________________

[ ] Dashboard link: _____________________________
    (Looker Studio URL OR dashboard_summary.png)

[ ] Executive Brief:
    [ ] 3 findings with data
    [ ] Content strategy recommendation
    [ ] Posting strategy recommendation
    [ ] Growth opportunity identified
    [ ] Honest caveat / limitation stated
```

---

*Day 2 of 3 | Social Media Analytics Workshop | Instructor Edition*

*For student materials, refer to: [student/workbook.md](student/workbook.md)*

*Connection from Day 1: Day 1 covered what metrics matter. Day 2 covers how to collect and analyze them with real data.*

*Connection to Day 3: Day 3 applies competitive analysis, ROI calculation, and executive reporting to synthesize all three days.*
