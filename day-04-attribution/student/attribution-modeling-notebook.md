# Multi-Touch Attribution Modeling - Python Notebook
## Day 4: Social Media Analytics - Hands-On Exercise

---

## 📋 Overview

In this notebook, you will:
1. Load and explore multi-channel marketing data
2. Transform single-touch data into multi-touch customer journeys
3. Implement 5 attribution models (First-Touch, Last-Touch, Linear, Time-Decay, Position-Based)
4. Compare attribution results across models
5. Calculate channel ROI and make budget recommendations

**Estimated Time:** 2-3 hours  
**Difficulty:** Intermediate  
**Prerequisites:** Basic Python, pandas knowledge

---

## 🚀 Setup Instructions

### Step 1: Upload Your Data to Google Colab

1. Open Google Colab: https://colab.research.google.com/
2. Create a new notebook
3. Upload `multi_touch_attribution_data.csv` to Colab:
   - Click the folder icon on the left sidebar
   - Click the upload icon
   - Select your CSV file

---

## 📦 Part 1: Import Libraries and Load Data

### Code Cell 1: Install and Import Libraries

```python
# Import required libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# Set display options
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', 100)

# Set visualization style
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")

print("✅ Libraries imported successfully!")
```

**📖 Explanation:**
- `pandas`: For data manipulation and analysis
- `numpy`: For numerical operations
- `matplotlib` & `seaborn`: For data visualization
- `datetime`: For handling timestamps
- We set display options to see more data at once
- We configure visualization styles for better-looking charts

---

### Code Cell 2: Load the Data

```python
# Load the dataset
df = pd.read_csv('multi_touch_attribution_data.csv')

# Display basic information
print("📊 Dataset Shape:", df.shape)
print("\n📋 First 10 rows:")
print(df.head(10))
print("\n🔍 Data Types:")
print(df.dtypes)
print("\n📈 Basic Statistics:")
print(df.describe())
```

**📖 Explanation:**
- `pd.read_csv()`: Loads CSV file into a pandas DataFrame
- `shape`: Shows (rows, columns) - you should see ~10,000 rows
- `head(10)`: Displays first 10 rows to inspect data
- `dtypes`: Shows data type of each column
- `describe()`: Provides statistical summary of numerical columns

---

### Code Cell 3: Data Quality Check

```python
# Check for missing values
print("🔍 Missing Values:")
print(df.isnull().sum())
print(f"\nTotal missing values: {df.isnull().sum().sum()}")

# Check unique values in each column
print("\n📊 Unique Values:")
for col in df.columns:
    print(f"{col}: {df[col].nunique()} unique values")

# Check conversion distribution
print("\n✅ Conversion Distribution:")
print(df['Conversion'].value_counts())
print(f"\nConversion Rate: {(df['Conversion'] == 'Yes').sum() / len(df) * 100:.2f}%")
```

**📖 Explanation:**
- `isnull().sum()`: Counts missing values per column
- `nunique()`: Counts unique values (helps understand data variety)
- `value_counts()`: Shows distribution of conversions (Yes/No)
- Conversion rate calculation: percentage of users who converted

---

## 📊 Part 2: Exploratory Data Analysis

### Code Cell 4: Channel Performance Analysis

```python
# Analyze channel performance
channel_stats = df.groupby('Channel').agg({
    'User ID': 'count',
    'Conversion': lambda x: (x == 'Yes').sum()
}).rename(columns={'User ID': 'Total_Touchpoints', 'Conversion': 'Conversions'})

channel_stats['Conversion_Rate'] = (channel_stats['Conversions'] / channel_stats['Total_Touchpoints'] * 100).round(2)

print("📊 Channel Performance:")
print(channel_stats.sort_values('Conversions', ascending=False))

# Visualize
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Chart 1: Touchpoints by Channel
channel_stats['Total_Touchpoints'].sort_values().plot(kind='barh', ax=axes[0], color='skyblue')
axes[0].set_title('Total Touchpoints by Channel', fontsize=14, fontweight='bold')
axes[0].set_xlabel('Number of Touchpoints')

# Chart 2: Conversion Rate by Channel
channel_stats['Conversion_Rate'].sort_values().plot(kind='barh', ax=axes[1], color='coral')
axes[1].set_title('Conversion Rate by Channel (%)', fontsize=14, fontweight='bold')
axes[1].set_xlabel('Conversion Rate (%)')

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- `groupby('Channel')`: Groups data by marketing channel
- `agg()`: Applies multiple aggregation functions
- We count total touchpoints and conversions per channel
- Conversion rate = (Conversions / Total Touchpoints) × 100
- Two horizontal bar charts show volume vs. efficiency

**🤔 Questions to Consider:**
- Which channel has the most touchpoints?
- Which channel has the highest conversion rate?
- Are high-volume channels also high-converting?

---

### Code Cell 5: Campaign Performance Analysis

```python
# Analyze campaign performance (excluding '-' which means no campaign)
campaign_stats = df[df['Campaign'] != '-'].groupby('Campaign').agg({
    'User ID': 'count',
    'Conversion': lambda x: (x == 'Yes').sum()
}).rename(columns={'User ID': 'Total_Touchpoints', 'Conversion': 'Conversions'})

campaign_stats['Conversion_Rate'] = (campaign_stats['Conversions'] / campaign_stats['Total_Touchpoints'] * 100).round(2)

print("🎯 Campaign Performance:")
print(campaign_stats.sort_values('Conversions', ascending=False))

# Visualize
plt.figure(figsize=(12, 6))
campaign_stats.sort_values('Conversions')['Conversions'].plot(kind='barh', color='mediumseagreen')
plt.title('Conversions by Campaign', fontsize=14, fontweight='bold')
plt.xlabel('Number of Conversions')
plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Filters out rows where Campaign is '-' (no campaign)
- Groups by campaign name
- Calculates same metrics as channel analysis
- Horizontal bar chart shows which campaigns drive most conversions

---

### Code Cell 6: Time-Based Analysis

```python
# Convert timestamp to datetime
df['Timestamp'] = pd.to_datetime(df['Timestamp'])
df['Hour'] = df['Timestamp'].dt.hour
df['Day'] = df['Timestamp'].dt.day_name()

# Conversions by hour
hourly_conversions = df[df['Conversion'] == 'Yes'].groupby('Hour').size()

# Conversions by day
daily_conversions = df[df['Conversion'] == 'Yes'].groupby('Day').size()

# Visualize
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Chart 1: Conversions by Hour
hourly_conversions.plot(kind='line', marker='o', ax=axes[0], color='purple', linewidth=2)
axes[0].set_title('Conversions by Hour of Day', fontsize=14, fontweight='bold')
axes[0].set_xlabel('Hour (24-hour format)')
axes[0].set_ylabel('Number of Conversions')
axes[0].grid(True, alpha=0.3)

# Chart 2: Conversions by Day
day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
daily_conversions = daily_conversions.reindex(day_order, fill_value=0)
daily_conversions.plot(kind='bar', ax=axes[1], color='teal')
axes[1].set_title('Conversions by Day of Week', fontsize=14, fontweight='bold')
axes[1].set_xlabel('Day of Week')
axes[1].set_ylabel('Number of Conversions')
axes[1].tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- `pd.to_datetime()`: Converts string timestamps to datetime objects
- `.dt.hour`: Extracts hour (0-23) from timestamp
- `.dt.day_name()`: Extracts day name (Monday, Tuesday, etc.)
- Line chart shows conversion patterns throughout the day
- Bar chart shows which days have most conversions

**🤔 Questions to Consider:**
- What time of day has the most conversions?
- Which day of the week performs best?
- How might this inform posting schedules?

---

## 🔄 Part 3: Create Multi-Touch Customer Journeys

**⚠️ IMPORTANT:** Your current data shows single touchpoints. For attribution modeling, we need multi-touch journeys. We'll simulate realistic customer journeys based on your data patterns.

### Code Cell 7: Generate Multi-Touch Journeys

```python
# Set random seed for reproducibility
np.random.seed(42)

# Function to create multi-touch journeys
def create_customer_journeys(df, num_journeys=2000):
    """
    Creates realistic multi-touch customer journeys from single-touch data.
    
    Parameters:
    - df: Original dataframe with single touchpoints
    - num_journeys: Number of customer journeys to generate
    
    Returns:
    - DataFrame with multi-touch journeys
    """
    journeys = []
    channels = df['Channel'].unique()
    
    for journey_id in range(1, num_journeys + 1):
        # Randomly decide if this journey converts (based on original conversion rate)
        original_conv_rate = (df['Conversion'] == 'Yes').sum() / len(df)
        converts = np.random.random() < original_conv_rate
        
        # Determine journey length (2-6 touchpoints)
        # Longer journeys for converters
        if converts:
            num_touchpoints = np.random.choice([3, 4, 5, 6], p=[0.2, 0.3, 0.3, 0.2])
        else:
            num_touchpoints = np.random.choice([2, 3, 4], p=[0.5, 0.3, 0.2])
        
        # Generate touchpoints
        journey_channels = []
        for position in range(num_touchpoints):
            # First touchpoint: favor awareness channels
            if position == 0:
                channel = np.random.choice(
                    ['Social Media', 'Display Ads', 'Search Ads', 'Email', 'Referral'],
                    p=[0.3, 0.25, 0.25, 0.15, 0.05]
                )
            # Last touchpoint: favor conversion channels
            elif position == num_touchpoints - 1 and converts:
                channel = np.random.choice(
                    ['Search Ads', 'Direct Traffic', 'Email', 'Social Media', 'Referral'],
                    p=[0.35, 0.25, 0.2, 0.15, 0.05]
                )
            # Middle touchpoints: balanced
            else:
                channel = np.random.choice(channels)
            
            journey_channels.append(channel)
        
        # Create journey record
        journeys.append({
            'Journey_ID': journey_id,
            'Touchpoints': ' → '.join(journey_channels),
            'Num_Touchpoints': num_touchpoints,
            'First_Touch': journey_channels[0],
            'Last_Touch': journey_channels[-1],
            'Converted': 'Yes' if converts else 'No',
            'Conversion_Value': 100 if converts else 0  # $100 per conversion
        })
    
    return pd.DataFrame(journeys)

# Generate journeys
journeys_df = create_customer_journeys(df, num_journeys=2000)

print("✅ Generated Multi-Touch Customer Journeys!")
print(f"\n📊 Total Journeys: {len(journeys_df)}")
print(f"✅ Converted Journeys: {(journeys_df['Converted'] == 'Yes').sum()}")
print(f"❌ Non-Converted Journeys: {(journeys_df['Converted'] == 'No').sum()}")
print(f"\n💰 Total Revenue: ${journeys_df['Conversion_Value'].sum():,}")
print(f"\n📋 Sample Journeys:")
print(journeys_df.head(10))
```

**📖 Explanation:**
- **Why we need this:** Attribution requires seeing the full customer journey, not just single touchpoints
- **Journey length:** Converters typically have 3-6 touchpoints; non-converters have 2-4
- **Channel selection logic:**
  - First touch: Favors awareness channels (Social Media, Display Ads)
  - Last touch: Favors conversion channels (Search Ads, Direct Traffic)
  - Middle touches: Balanced mix
- **Conversion value:** Set at $100 per conversion (you can adjust this)
- **Result:** 2,000 realistic customer journeys with multiple touchpoints

---

### Code Cell 8: Analyze Journey Patterns

```python
# Journey length distribution
print("📏 Journey Length Distribution:")
print(journeys_df['Num_Touchpoints'].value_counts().sort_index())

# Average journey length by conversion status
print("\n📊 Average Journey Length:")
print(journeys_df.groupby('Converted')['Num_Touchpoints'].mean())

# Most common journey patterns (top 10)
print("\n🔝 Top 10 Most Common Journey Patterns:")
print(journeys_df['Touchpoints'].value_counts().head(10))

# Visualize journey length distribution
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Chart 1: Journey length distribution
journeys_df['Num_Touchpoints'].value_counts().sort_index().plot(
    kind='bar', ax=axes[0], color='steelblue'
)
axes[0].set_title('Distribution of Journey Lengths', fontsize=14, fontweight='bold')
axes[0].set_xlabel('Number of Touchpoints')
axes[0].set_ylabel('Number of Journeys')
axes[0].tick_params(axis='x', rotation=0)

# Chart 2: Journey length by conversion status
journeys_df.groupby(['Num_Touchpoints', 'Converted']).size().unstack().plot(
    kind='bar', ax=axes[1], stacked=False
)
axes[1].set_title('Journey Length by Conversion Status', fontsize=14, fontweight='bold')
axes[1].set_xlabel('Number of Touchpoints')
axes[1].set_ylabel('Number of Journeys')
axes[1].legend(title='Converted')
axes[1].tick_params(axis='x', rotation=0)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Analyzes the distribution of journey lengths
- Compares journey lengths between converters and non-converters
- Shows most common journey patterns
- Visualizes journey length distributions

**🤔 Questions to Consider:**
- Do converters have longer journeys than non-converters?
- What are the most common journey patterns?
- How many touchpoints do most customers need before converting?

---

## 🎯 Part 4: Implement Attribution Models

Now we'll implement all 5 attribution models!

### Code Cell 9: Helper Function - Parse Journey

```python
def parse_journey(touchpoints_str):
    """
    Parses a journey string into a list of channels.
    
    Example: "Social Media → Email → Search Ads" 
    Returns: ['Social Media', 'Email', 'Search Ads']
    """
    return [channel.strip() for channel in touchpoints_str.split('→')]

# Test the function
test_journey = "Social Media → Email → Search Ads"
print(f"Original: {test_journey}")
print(f"Parsed: {parse_journey(test_journey)}")
```

**📖 Explanation:**
- Converts journey string into a list of channels
- `.split('→')`: Splits string at arrow symbols
- `.strip()`: Removes extra whitespace
- This makes it easier to work with individual touchpoints

---

### Code Cell 10: Model 1 - First-Touch Attribution

```python
def first_touch_attribution(journey_channels, conversion_value):
    """
    First-Touch Attribution: 100% credit to the first touchpoint.
    
    Parameters:
    - journey_channels: List of channels in the journey
    - conversion_value: Value of the conversion (e.g., $100)
    
    Returns:
    - Dictionary with channel credits
    """
    attribution = {}
    if len(journey_channels) > 0:
        first_channel = journey_channels[0]
        attribution[first_channel] = conversion_value
    return attribution

# Apply to all converted journeys
converted_journeys = journeys_df[journeys_df['Converted'] == 'Yes'].copy()

first_touch_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = first_touch_attribution(channels, row['Conversion_Value'])
    
    for channel, credit in attribution.items():
        first_touch_results[channel] = first_touch_results.get(channel, 0) + credit

# Convert to DataFrame and sort
first_touch_df = pd.DataFrame(list(first_touch_results.items()), 
                               columns=['Channel', 'First_Touch_Credit'])
first_touch_df = first_touch_df.sort_values('First_Touch_Credit', ascending=False)

print("🥇 FIRST-TOUCH ATTRIBUTION RESULTS")
print("="*50)
print(first_touch_df)
print(f"\nTotal Credit Allocated: ${first_touch_df['First_Touch_Credit'].sum():,.2f}")

# Visualize
plt.figure(figsize=(10, 6))
plt.barh(first_touch_df['Channel'], first_touch_df['First_Touch_Credit'], color='gold')
plt.xlabel('Attribution Credit ($)', fontsize=12)
plt.title('First-Touch Attribution: Credit by Channel', fontsize=14, fontweight='bold')
plt.gca().invert_yaxis()
for i, v in enumerate(first_touch_df['First_Touch_Credit']):
    plt.text(v + 100, i, f'${v:,.0f}', va='center')
plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- **Logic:** First touchpoint gets 100% of the credit
- **Why:** Values channels that create initial awareness
- **Process:**
  1. Filter to only converted journeys
  2. For each journey, give all credit to first channel
  3. Sum up credits across all journeys
- **Visualization:** Horizontal bar chart shows total credit per channel

**🤔 Questions to Consider:**
- Which channel gets the most credit under first-touch?
- Does this make sense for your business?
- What channels might be undervalued?

---

### Code Cell 11: Model 2 - Last-Touch Attribution

```python
def last_touch_attribution(journey_channels, conversion_value):
    """
    Last-Touch Attribution: 100% credit to the last touchpoint.
    
    Parameters:
    - journey_channels: List of channels in the journey
    - conversion_value: Value of the conversion
    
    Returns:
    - Dictionary with channel credits
    """
    attribution = {}
    if len(journey_channels) > 0:
        last_channel = journey_channels[-1]
        attribution[last_channel] = conversion_value
    return attribution

# Apply to all converted journeys
last_touch_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = last_touch_attribution(channels, row['Conversion_Value'])
    
    for channel, credit in attribution.items():
        last_touch_results[channel] = last_touch_results.get(channel, 0) + credit

# Convert to DataFrame and sort
last_touch_df = pd.DataFrame(list(last_touch_results.items()), 
                              columns=['Channel', 'Last_Touch_Credit'])
last_touch_df = last_touch_df.sort_values('Last_Touch_Credit', ascending=False)

print("🏁 LAST-TOUCH ATTRIBUTION RESULTS")
print("="*50)
print(last_touch_df)
print(f"\nTotal Credit Allocated: ${last_touch_df['Last_Touch_Credit'].sum():,.2f}")

# Visualize
plt.figure(figsize=(10, 6))
plt.barh(last_touch_df['Channel'], last_touch_df['Last_Touch_Credit'], color='crimson')
plt.xlabel('Attribution Credit ($)', fontsize=12)
plt.title('Last-Touch Attribution: Credit by Channel', fontsize=14, fontweight='bold')
plt.gca().invert_yaxis()
for i, v in enumerate(last_touch_df['Last_Touch_Credit']):
    plt.text(v + 100, i, f'${v:,.0f}', va='center')
plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- **Logic:** Last touchpoint gets 100% of the credit
- **Why:** Values channels that close the deal
- **Default model:** This is what most analytics tools use by default
- **Problem:** Ignores all the awareness and consideration touchpoints

**🤔 Questions to Consider:**
- How different is this from first-touch?
- Which channels benefit from last-touch attribution?
- Is this fair to awareness channels?

---

### Code Cell 12: Model 3 - Linear Attribution

```python
def linear_attribution(journey_channels, conversion_value):
    """
    Linear Attribution: Equal credit to all touchpoints.
    
    Parameters:
    - journey_channels: List of channels in the journey
    - conversion_value: Value of the conversion
    
    Returns:
    - Dictionary with channel credits
    """
    attribution = {}
    if len(journey_channels) > 0:
        credit_per_channel = conversion_value / len(journey_channels)
        for channel in journey_channels:
            attribution[channel] = attribution.get(channel, 0) + credit_per_channel
    return attribution

# Apply to all converted journeys
linear_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = linear_attribution(channels, row['Conversion_Value'])
    
    for channel, credit in attribution.items():
        linear_results[channel] = linear_results.get(channel, 0) + credit

# Convert to DataFrame and sort
linear_df = pd.DataFrame(list(linear_results.items()), 
                         columns=['Channel', 'Linear_Credit'])
linear_df = linear_df.sort_values('Linear_Credit', ascending=False)

print("⚖️ LINEAR ATTRIBUTION RESULTS")
print("="*50)
print(linear_df)
print(f"\nTotal Credit Allocated: ${linear_df['Linear_Credit'].sum():,.2f}")

# Visualize
plt.figure(figsize=(10, 6))
plt.barh(linear_df['Channel'], linear_df['Linear_Credit'], color='mediumseagreen')
plt.xlabel('Attribution Credit ($)', fontsize=12)
plt.title('Linear Attribution: Credit by Channel', fontsize=14, fontweight='bold')
plt.gca().invert_yaxis()
for i, v in enumerate(linear_df['Linear_Credit']):
    plt.text(v + 100, i, f'${v:,.0f}', va='center')
plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- **Logic:** Every touchpoint gets equal credit
- **Formula:** Credit per touchpoint = Conversion Value / Number of Touchpoints
- **Example:** $100 conversion with 5 touchpoints = $20 per touchpoint
- **Why:** Democratic approach - values entire journey equally
- **Problem:** Assumes all touchpoints are equally important (rarely true)

**🤔 Questions to Consider:**
- How does this compare to first/last-touch?
- Which channels benefit from equal distribution?
- Is this more fair than first/last-touch?

---

### Code Cell 13: Model 4 - Time-Decay Attribution

```python
def time_decay_attribution(journey_channels, conversion_value, half_life=7):
    """
    Time-Decay Attribution: More credit to recent touchpoints.
    
    Uses exponential decay: credit = 2^(-days_ago / half_life)
    
    Parameters:
    - journey_channels: List of channels in the journey
    - conversion_value: Value of the conversion
    - half_life: Number of days for credit to decay by half (default: 7)
    
    Returns:
    - Dictionary with channel credits
    """
    attribution = {}
    if len(journey_channels) > 0:
        num_touchpoints = len(journey_channels)
        
        # Calculate days ago for each touchpoint (assuming equal spacing)
        # Most recent = 0 days ago, oldest = (num_touchpoints-1) days ago
        weights = []
        for position in range(num_touchpoints):
            days_ago = num_touchpoints - position - 1
            weight = 2 ** (-days_ago / half_life)
            weights.append(weight)
        
        # Normalize weights to sum to 1
        total_weight = sum(weights)
        normalized_weights = [w / total_weight for w in weights]
        
        # Assign credit
        for channel, weight in zip(journey_channels, normalized_weights):
            credit = conversion_value * weight
            attribution[channel] = attribution.get(channel, 0) + credit
    
    return attribution

# Apply to all converted journeys
time_decay_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = time_decay_attribution(channels, row['Conversion_Value'], half_life=7)
    
    for channel, credit in attribution.items():
        time_decay_results[channel] = time_decay_results.get(channel, 0) + credit

# Convert to DataFrame and sort
time_decay_df = pd.DataFrame(list(time_decay_results.items()), 
                              columns=['Channel', 'Time_Decay_Credit'])
time_decay_df = time_decay_df.sort_values('Time_Decay_Credit', ascending=False)

print("⏰ TIME-DECAY ATTRIBUTION RESULTS")
print("="*50)
print(time_decay_df)
print(f"\nTotal Credit Allocated: ${time_decay_df['Time_Decay_Credit'].sum():,.2f}")

# Visualize
plt.figure(figsize=(10, 6))
plt.barh(time_decay_df['Channel'], time_decay_df['Time_Decay_Credit'], color='darkorange')
plt.xlabel('Attribution Credit ($)', fontsize=12)
plt.title('Time-Decay Attribution: Credit by Channel (7-day half-life)', 
          fontsize=14, fontweight='bold')
plt.gca().invert_yaxis()
for i, v in enumerate(time_decay_df['Time_Decay_Credit']):
    plt.text(v + 100, i, f'${v:,.0f}', va='center')
plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- **Logic:** Recent touchpoints get more credit than older ones
- **Formula:** Credit = 2^(-days_ago / half_life)
- **Half-life:** Time it takes for credit to decay by 50% (we use 7 days)
- **Example:** 
  - Touchpoint 0 days ago: 100% weight
  - Touchpoint 7 days ago: 50% weight
  - Touchpoint 14 days ago: 25% weight
- **Why:** Reflects reality - recent interactions are more influential
- **Normalization:** Weights are scaled so they sum to 100%

**🤔 Questions to Consider:**
- How does this compare to linear attribution?
- Which channels benefit from time-decay?
- Does 7-day half-life make sense for your business?

---

### Code Cell 14: Model 5 - Position-Based (U-Shaped) Attribution

```python
def position_based_attribution(journey_channels, conversion_value, 
                                first_pct=0.4, last_pct=0.4, middle_pct=0.2):
    """
    Position-Based Attribution: 40% first, 40% last, 20% middle.
    
    Parameters:
    - journey_channels: List of channels in the journey
    - conversion_value: Value of the conversion
    - first_pct: Percentage for first touchpoint (default: 0.4)
    - last_pct: Percentage for last touchpoint (default: 0.4)
    - middle_pct: Percentage for middle touchpoints (default: 0.2)
    
    Returns:
    - Dictionary with channel credits
    """
    attribution = {}
    num_touchpoints = len(journey_channels)
    
    if num_touchpoints == 0:
        return attribution
    elif num_touchpoints == 1:
        # Single touchpoint gets 100%
        attribution[journey_channels[0]] = conversion_value
    elif num_touchpoints == 2:
        # Two touchpoints: 50% each
        attribution[journey_channels[0]] = conversion_value * 0.5
        attribution[journey_channels[1]] = attribution.get(journey_channels[1], 0) + conversion_value * 0.5
    else:
        # Three or more touchpoints: 40/20/40 split
        first_channel = journey_channels[0]
        last_channel = journey_channels[-1]
        middle_channels = journey_channels[1:-1]
        
        # First touchpoint
        attribution[first_channel] = conversion_value * first_pct
        
        # Last touchpoint
        attribution[last_channel] = attribution.get(last_channel, 0) + conversion_value * last_pct
        
        # Middle touchpoints (split 20% equally)
        if len(middle_channels) > 0:
            credit_per_middle = (conversion_value * middle_pct) / len(middle_channels)
            for channel in middle_channels:
                attribution[channel] = attribution.get(channel, 0) + credit_per_middle
    
    return attribution

# Apply to all converted journeys
position_based_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = position_based_attribution(channels, row['Conversion_Value'])
    
    for channel, credit in attribution.items():
        position_based_results[channel] = position_based_results.get(channel, 0) + credit

# Convert to DataFrame and sort
position_based_df = pd.DataFrame(list(position_based_results.items()), 
                                  columns=['Channel', 'Position_Based_Credit'])
position_based_df = position_based_df.sort_values('Position_Based_Credit', ascending=False)

print("🏆 POSITION-BASED ATTRIBUTION RESULTS")
print("="*50)
print(position_based_df)
print(f"\nTotal Credit Allocated: ${position_based_df['Position_Based_Credit'].sum():,.2f}")

# Visualize
plt.figure(figsize=(10, 6))
plt.barh(position_based_df['Channel'], position_based_df['Position_Based_Credit'], color='mediumpurple')
plt.xlabel('Attribution Credit ($)', fontsize=12)
plt.title('Position-Based Attribution: Credit by Channel (40/20/40)', 
          fontsize=14, fontweight='bold')
plt.gca().invert_yaxis()
for i, v in enumerate(position_based_df['Position_Based_Credit']):
    plt.text(v + 100, i, f'${v:,.0f}', va='center')
plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- **Logic:** 40% to first, 40% to last, 20% split among middle touchpoints
- **Why:** Values both awareness (first) and conversion (last)
- **U-Shaped:** High credit at both ends, lower in middle
- **Special cases:**
  - 1 touchpoint: Gets 100%
  - 2 touchpoints: 50% each
  - 3+ touchpoints: 40/20/40 split
- **Most balanced:** Recognizes importance of both ends of the journey

**🤔 Questions to Consider:**
- How does this compare to other models?
- Which channels benefit from position-based attribution?
- Is 40/20/40 the right split for your business?

---

## 📊 Part 5: Compare All Attribution Models

### Code Cell 15: Combine All Results

```python
# Merge all attribution results
comparison_df = first_touch_df.copy()
comparison_df = comparison_df.merge(last_touch_df, on='Channel', how='outer')
comparison_df = comparison_df.merge(linear_df, on='Channel', how='outer')
comparison_df = comparison_df.merge(time_decay_df, on='Channel', how='outer')
comparison_df = comparison_df.merge(position_based_df, on='Channel', how='outer')

# Fill NaN with 0
comparison_df = comparison_df.fillna(0)

# Rename columns for clarity
comparison_df.columns = ['Channel', 'First-Touch', 'Last-Touch', 'Linear', 
                         'Time-Decay', 'Position-Based']

# Sort by Linear (middle ground)
comparison_df = comparison_df.sort_values('Linear', ascending=False)

print("📊 ATTRIBUTION MODEL COMPARISON")
print("="*80)
print(comparison_df.to_string(index=False))
print("\n" + "="*80)
print("TOTALS:")
for col in comparison_df.columns[1:]:
    print(f"{col:20s}: ${comparison_df[col].sum():,.2f}")
```

**📖 Explanation:**
- Merges all 5 attribution results into one table
- `merge(..., how='outer')`: Keeps all channels from all models
- `fillna(0)`: Replaces missing values with 0
- Shows side-by-side comparison of all models
- Totals should all equal total conversion value

---

### Code Cell 16: Visualize Model Comparison

```python
# Prepare data for visualization
channels = comparison_df['Channel'].tolist()
models = ['First-Touch', 'Last-Touch', 'Linear', 'Time-Decay', 'Position-Based']

# Create grouped bar chart
fig, ax = plt.subplots(figsize=(14, 8))

x = np.arange(len(channels))
width = 0.15

colors = ['gold', 'crimson', 'mediumseagreen', 'darkorange', 'mediumpurple']

for i, model in enumerate(models):
    offset = width * (i - 2)
    ax.bar(x + offset, comparison_df[model], width, label=model, color=colors[i], alpha=0.8)

ax.set_xlabel('Channel', fontsize=12, fontweight='bold')
ax.set_ylabel('Attribution Credit ($)', fontsize=12, fontweight='bold')
ax.set_title('Attribution Model Comparison: Credit by Channel', fontsize=14, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(channels, rotation=45, ha='right')
ax.legend(loc='upper right', fontsize=10)
ax.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Grouped bar chart shows all 5 models side-by-side
- Each channel has 5 bars (one per model)
- Easy to see which channels benefit from which models
- Colors match previous individual charts

**🤔 Questions to Consider:**
- Which channels have the most variation across models?
- Which channels are consistently high/low?
- Which model seems most fair for your business?

---

### Code Cell 17: Calculate Percentage Differences

```python
# Calculate percentage of total for each model
percentage_df = comparison_df.copy()

for col in models:
    total = percentage_df[col].sum()
    percentage_df[f'{col}_Pct'] = (percentage_df[col] / total * 100).round(2)

# Show percentage comparison
pct_cols = ['Channel'] + [f'{m}_Pct' for m in models]
pct_comparison = percentage_df[pct_cols].copy()
pct_comparison.columns = ['Channel'] + models

print("📊 ATTRIBUTION MODEL COMPARISON (Percentage of Total)")
print("="*80)
print(pct_comparison.to_string(index=False))

# Visualize as stacked bar chart
fig, ax = plt.subplots(figsize=(12, 6))

pct_comparison.set_index('Channel')[models].T.plot(
    kind='bar', stacked=False, ax=ax, colormap='tab10', width=0.8
)

ax.set_xlabel('Attribution Model', fontsize=12, fontweight='bold')
ax.set_ylabel('Percentage of Total Credit (%)', fontsize=12, fontweight='bold')
ax.set_title('Channel Credit Distribution by Attribution Model', fontsize=14, fontweight='bold')
ax.legend(title='Channel', bbox_to_anchor=(1.05, 1), loc='upper left')
ax.tick_params(axis='x', rotation=45)
ax.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Converts dollar amounts to percentages
- Shows each channel's share of total credit
- Stacked bar chart shows distribution across models
- Easier to compare relative importance

---

### Code Cell 18: Identify Biggest Winners and Losers

```python
# Calculate difference between max and min attribution for each channel
comparison_df['Max_Credit'] = comparison_df[models].max(axis=1)
comparison_df['Min_Credit'] = comparison_df[models].min(axis=1)
comparison_df['Difference'] = comparison_df['Max_Credit'] - comparison_df['Min_Credit']
comparison_df['Difference_Pct'] = (comparison_df['Difference'] / comparison_df['Max_Credit'] * 100).round(2)

# Sort by difference
volatility_df = comparison_df[['Channel', 'Min_Credit', 'Max_Credit', 'Difference', 'Difference_Pct']].copy()
volatility_df = volatility_df.sort_values('Difference', ascending=False)

print("🎯 ATTRIBUTION VOLATILITY: Which Channels Are Most Affected by Model Choice?")
print("="*80)
print(volatility_df.to_string(index=False))

# Visualize
fig, ax = plt.subplots(figsize=(12, 6))

x = np.arange(len(volatility_df))
ax.barh(x, volatility_df['Max_Credit'], label='Max Credit', color='lightgreen', alpha=0.7)
ax.barh(x, volatility_df['Min_Credit'], label='Min Credit', color='lightcoral', alpha=0.7)

ax.set_yticks(x)
ax.set_yticklabels(volatility_df['Channel'])
ax.set_xlabel('Attribution Credit ($)', fontsize=12, fontweight='bold')
ax.set_title('Attribution Range: Min vs Max Credit by Channel', fontsize=14, fontweight='bold')
ax.legend()
ax.grid(axis='x', alpha=0.3)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Calculates the range (max - min) for each channel across all models
- **High difference:** Channel credit varies a lot depending on model choice
- **Low difference:** Channel credit is consistent across models
- Shows which channels are most sensitive to attribution model selection

**🤔 Questions to Consider:**
- Which channel has the biggest swing?
- Which channels are most stable?
- What does this tell you about channel roles?

---

## 💰 Part 6: Calculate ROI and Budget Recommendations

### Code Cell 19: Add Channel Costs (Simulated)

```python
# Simulate monthly channel costs (you would use real data)
channel_costs = {
    'Social Media': 5000,
    'Search Ads': 8000,
    'Display Ads': 6000,
    'Email': 2000,
    'Referral': 1000,
    'Direct Traffic': 0  # No direct cost
}

# Add costs to comparison dataframe
comparison_df['Monthly_Cost'] = comparison_df['Channel'].map(channel_costs)

print("💰 Channel Costs:")
print(comparison_df[['Channel', 'Monthly_Cost']].to_string(index=False))
```

**📖 Explanation:**
- Adds simulated monthly costs for each channel
- In real analysis, you'd use actual spend data
- Direct Traffic has $0 cost (organic)

---

### Code Cell 20: Calculate ROI for Each Model

```python
# Calculate ROI for each attribution model
# ROI = (Revenue - Cost) / Cost * 100

roi_df = comparison_df[['Channel', 'Monthly_Cost']].copy()

for model in models:
    revenue_col = model
    roi_col = f'{model}_ROI'
    
    # Calculate ROI (handle division by zero for Direct Traffic)
    roi_df[roi_col] = roi_df.apply(
        lambda row: ((comparison_df.loc[comparison_df['Channel'] == row['Channel'], revenue_col].values[0] - row['Monthly_Cost']) / row['Monthly_Cost'] * 100) 
        if row['Monthly_Cost'] > 0 
        else float('inf'),  # Infinite ROI for zero cost
        axis=1
    )

# Replace inf with a large number for display
roi_df = roi_df.replace([np.inf, -np.inf], 999999)

print("📊 ROI COMPARISON BY ATTRIBUTION MODEL")
print("="*100)
print(roi_df.to_string(index=False))

# Visualize ROI comparison (excluding Direct Traffic for scale)
roi_viz = roi_df[roi_df['Channel'] != 'Direct Traffic'].copy()

fig, ax = plt.subplots(figsize=(14, 8))

x = np.arange(len(roi_viz))
width = 0.15

for i, model in enumerate(models):
    offset = width * (i - 2)
    roi_col = f'{model}_ROI'
    ax.bar(x + offset, roi_viz[roi_col], width, label=model, color=colors[i], alpha=0.8)

ax.set_xlabel('Channel', fontsize=12, fontweight='bold')
ax.set_ylabel('ROI (%)', fontsize=12, fontweight='bold')
ax.set_title('ROI Comparison by Attribution Model', fontsize=14, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(roi_viz['Channel'], rotation=45, ha='right')
ax.legend(loc='upper right')
ax.axhline(y=0, color='red', linestyle='--', linewidth=1, alpha=0.5)
ax.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- **ROI Formula:** (Revenue - Cost) / Cost × 100
- Calculates ROI for each channel under each attribution model
- **Positive ROI:** Channel is profitable
- **Negative ROI:** Channel is losing money
- **High variation:** Model choice significantly affects ROI assessment
- Direct Traffic excluded from chart (infinite ROI distorts scale)

**🤔 Questions to Consider:**
- Which channels have positive ROI under all models?
- Which channels' ROI changes dramatically by model?
- How would this affect your budget decisions?

---

### Code Cell 21: Budget Recommendations

```python
# Calculate recommended budget allocation based on Linear model (most balanced)
total_budget = sum(channel_costs.values())
total_revenue = comparison_df['Linear'].sum()

print("💼 BUDGET ALLOCATION RECOMMENDATIONS")
print("="*80)
print(f"Current Total Budget: ${total_budget:,}")
print(f"Total Revenue (Linear Attribution): ${total_revenue:,.2f}")
print(f"Overall ROI: {((total_revenue - total_budget) / total_budget * 100):.2f}%")
print("\n" + "="*80)

# Recommend budget based on Linear attribution performance
comparison_df['Recommended_Budget'] = (comparison_df['Linear'] / total_revenue * total_budget).round(0)
comparison_df['Budget_Change'] = comparison_df['Recommended_Budget'] - comparison_df['Monthly_Cost']
comparison_df['Budget_Change_Pct'] = (comparison_df['Budget_Change'] / comparison_df['Monthly_Cost'] * 100).round(2)

budget_recommendation = comparison_df[['Channel', 'Monthly_Cost', 'Linear', 
                                        'Recommended_Budget', 'Budget_Change', 'Budget_Change_Pct']].copy()
budget_recommendation.columns = ['Channel', 'Current Budget', 'Linear Revenue', 
                                  'Recommended Budget', 'Change ($)', 'Change (%)']

print("\n📊 BUDGET REALLOCATION RECOMMENDATIONS (Based on Linear Attribution):")
print(budget_recommendation.to_string(index=False))

# Visualize budget changes
fig, axes = plt.subplots(1, 2, figsize=(16, 6))

# Chart 1: Current vs Recommended Budget
budget_viz = budget_recommendation[budget_recommendation['Channel'] != 'Direct Traffic'].copy()
x = np.arange(len(budget_viz))
width = 0.35

axes[0].bar(x - width/2, budget_viz['Current Budget'], width, label='Current Budget', color='lightblue')
axes[0].bar(x + width/2, budget_viz['Recommended Budget'], width, label='Recommended Budget', color='lightgreen')
axes[0].set_xlabel('Channel', fontsize=12, fontweight='bold')
axes[0].set_ylabel('Budget ($)', fontsize=12, fontweight='bold')
axes[0].set_title('Current vs Recommended Budget', fontsize=14, fontweight='bold')
axes[0].set_xticks(x)
axes[0].set_xticklabels(budget_viz['Channel'], rotation=45, ha='right')
axes[0].legend()
axes[0].grid(axis='y', alpha=0.3)

# Chart 2: Budget Change Percentage
colors_change = ['green' if x > 0 else 'red' for x in budget_viz['Change (%)']]
axes[1].barh(budget_viz['Channel'], budget_viz['Change (%)'], color=colors_change, alpha=0.7)
axes[1].set_xlabel('Budget Change (%)', fontsize=12, fontweight='bold')
axes[1].set_title('Recommended Budget Change', fontsize=14, fontweight='bold')
axes[1].axvline(x=0, color='black', linestyle='-', linewidth=1)
axes[1].grid(axis='x', alpha=0.3)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Recommends budget allocation based on Linear attribution (most balanced)
- **Logic:** Allocate budget proportional to revenue contribution
- **Green bars:** Channels that should get more budget
- **Red bars:** Channels that should get less budget
- Shows both dollar and percentage changes

**🤔 Questions to Consider:**
- Which channels should get more budget?
- Which channels should get less?
- How would this change your marketing strategy?

---

## 📈 Part 7: Key Insights and Recommendations

### Code Cell 22: Generate Summary Report

```python
print("="*80)
print(" " * 20 + "ATTRIBUTION ANALYSIS SUMMARY REPORT")
print("="*80)

print("\n📊 KEY FINDINGS:\n")

# 1. Total conversions and revenue
total_conversions = (journeys_df['Converted'] == 'Yes').sum()
total_revenue = journeys_df['Conversion_Value'].sum()
print(f"1. OVERALL PERFORMANCE")
print(f"   • Total Customer Journeys: {len(journeys_df):,}")
print(f"   • Total Conversions: {total_conversions:,}")
print(f"   • Conversion Rate: {(total_conversions / len(journeys_df) * 100):.2f}%")
print(f"   • Total Revenue: ${total_revenue:,}")

# 2. Top performing channels (by Linear attribution)
print(f"\n2. TOP PERFORMING CHANNELS (Linear Attribution)")
top_3 = comparison_df.nlargest(3, 'Linear')[['Channel', 'Linear']]
for idx, row in top_3.iterrows():
    pct = (row['Linear'] / total_revenue * 100)
    print(f"   • {row['Channel']}: ${row['Linear']:,.0f} ({pct:.1f}% of revenue)")

# 3. Most volatile channels
print(f"\n3. MOST ATTRIBUTION-SENSITIVE CHANNELS")
top_volatile = volatility_df.head(3)[['Channel', 'Difference', 'Difference_Pct']]
for idx, row in top_volatile.iterrows():
    print(f"   • {row['Channel']}: ${row['Difference']:,.0f} range ({row['Difference_Pct']:.1f}% variation)")

# 4. ROI leaders
print(f"\n4. HIGHEST ROI CHANNELS (Linear Attribution)")
roi_leaders = roi_df[roi_df['Channel'] != 'Direct Traffic'].nlargest(3, 'Linear_ROI')[['Channel', 'Linear_ROI']]
for idx, row in roi_leaders.iterrows():
    print(f"   • {row['Channel']}: {row['Linear_ROI']:.1f}% ROI")

# 5. Budget recommendations
print(f"\n5. BUDGET REALLOCATION RECOMMENDATIONS")
increase = budget_recommendation[budget_recommendation['Change (%)'] > 10].sort_values('Change (%)', ascending=False)
decrease = budget_recommendation[budget_recommendation['Change (%)'] < -10].sort_values('Change (%)')

if len(increase) > 0:
    print(f"   INCREASE BUDGET:")
    for idx, row in increase.iterrows():
        print(f"   • {row['Channel']}: +{row['Change (%)']:.1f}% (${row['Change ($)']:,.0f})")

if len(decrease) > 0:
    print(f"   DECREASE BUDGET:")
    for idx, row in decrease.iterrows():
        print(f"   • {row['Channel']}: {row['Change (%)']:.1f}% (${row['Change ($)']:,.0f})")

print("\n" + "="*80)
print(" " * 25 + "END OF REPORT")
print("="*80)
```

**📖 Explanation:**
- Generates a comprehensive summary report
- Highlights key findings across all analyses
- Provides actionable recommendations
- Easy to share with stakeholders

---

## 📊 Part 8: Create Visualizations

Now let's create meaningful visualizations to better understand the attribution differences!

### Code Cell 23: Plot 1 - Attribution Model Comparison

```python
# Set up plotting style
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['axes.facecolor'] = 'white'

# Create grouped bar chart comparing all models
fig, ax = plt.subplots(figsize=(14, 8))

channels = comparison_df['Channel'].tolist()
models = ['First-Touch', 'Last-Touch', 'Linear', 'Time-Decay', 'Position-Based']
colors = ['gold', 'crimson', 'mediumseagreen', 'darkorange', 'mediumpurple']

x = np.arange(len(channels))
width = 0.15

for i, model in enumerate(models):
    offset = width * (i - 2)
    ax.bar(x + offset, comparison_df[model], width, label=model, color=colors[i], alpha=0.8)

ax.set_xlabel('Channel', fontsize=12, fontweight='bold')
ax.set_ylabel('Attribution Credit ($)', fontsize=12, fontweight='bold')
ax.set_title('Attribution Model Comparison: Credit by Channel', fontsize=14, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(channels, rotation=45, ha='right')
ax.legend(loc='upper right', fontsize=10)
ax.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Grouped bar chart shows all 5 models side-by-side for each channel
- Easy to see which channels benefit from which attribution models
- Colors are consistent with previous individual model charts
- Notice how dramatically different the credit allocation is!

---

### Code Cell 24: Plot 2 - Percentage Distribution

```python
# Calculate percentages for each model
pct_df = comparison_df.copy()
for col in models:
    pct_df[col] = (pct_df[col] / pct_df[col].sum() * 100)

# Create stacked bar chart
fig, ax = plt.subplots(figsize=(12, 6))

pct_df.set_index('Channel')[models].T.plot(
    kind='bar', stacked=False, ax=ax, colormap='tab10', width=0.8
)

ax.set_xlabel('Attribution Model', fontsize=12, fontweight='bold')
ax.set_ylabel('Percentage of Total Credit (%)', fontsize=12, fontweight='bold')
ax.set_title('Channel Credit Distribution by Attribution Model', fontsize=14, fontweight='bold')
ax.legend(title='Channel', bbox_to_anchor=(1.05, 1), loc='upper left')
ax.tick_params(axis='x', rotation=45)
ax.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Shows each channel's percentage share of total credit
- Easier to compare relative importance across models
- Notice how channel rankings change by model

---

### Code Cell 25: Plot 3 - ROI Comparison

```python
# Create ROI comparison chart (excluding Direct Traffic for scale)
fig, ax = plt.subplots(figsize=(12, 6))

roi_viz = roi_df[roi_df['Channel'] != 'Direct Traffic'].copy()
roi_viz = roi_viz.sort_values('Linear_ROI', ascending=True)

colors_roi = ['green' if x > 100 else 'orange' if x > 0 else 'red' for x in roi_viz['Linear_ROI']]

ax.barh(roi_viz['Channel'], roi_viz['Linear_ROI'], color=colors_roi, alpha=0.7)
ax.set_xlabel('ROI (%)', fontsize=12, fontweight='bold')
ax.set_title('Channel ROI (Linear Attribution)', fontsize=14, fontweight='bold')
ax.axvline(x=100, color='black', linestyle='--', linewidth=1, alpha=0.5, label='Break-even (100%)')
ax.legend()
ax.grid(axis='x', alpha=0.3)

# Add value labels
for i, v in enumerate(roi_viz['Linear_ROI']):
    ax.text(v + 10, i, f'{v:.1f}%', va='center', fontweight='bold')

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Green bars: Highly profitable channels (>100% ROI)
- Orange bars: Profitable but lower ROI (0-100%)
- Red bars: Losing money (negative ROI)
- Dashed line shows break-even point
- Direct Traffic excluded (infinite ROI distorts scale)

---

### Code Cell 26: Plot 4 - Budget Recommendations

```python
# Create budget recommendation visualizations
fig, axes = plt.subplots(1, 2, figsize=(16, 6))

# Chart 1: Current vs Recommended Budget
budget_viz = budget_recommendation[budget_recommendation['Channel'] != 'Direct Traffic'].copy()
x = np.arange(len(budget_viz))
width = 0.35

axes[0].bar(x - width/2, budget_viz['Current Budget'], width, label='Current Budget', color='lightblue', alpha=0.8)
axes[0].bar(x + width/2, budget_viz['Recommended Budget'], width, label='Recommended Budget', color='lightgreen', alpha=0.8)
axes[0].set_xlabel('Channel', fontsize=12, fontweight='bold')
axes[0].set_ylabel('Budget ($)', fontsize=12, fontweight='bold')
axes[0].set_title('Current vs Recommended Budget', fontsize=14, fontweight='bold')
axes[0].set_xticks(x)
axes[0].set_xticklabels(budget_viz['Channel'], rotation=45, ha='right')
axes[0].legend()
axes[0].grid(axis='y', alpha=0.3)

# Chart 2: Budget Change Percentage
budget_viz_sorted = budget_viz.sort_values('Change (%)')
colors_change = ['green' if x > 0 else 'red' for x in budget_viz_sorted['Change (%)']]
axes[1].barh(budget_viz_sorted['Channel'], budget_viz_sorted['Change (%)'], color=colors_change, alpha=0.7)
axes[1].set_xlabel('Budget Change (%)', fontsize=12, fontweight='bold')
axes[1].set_title('Recommended Budget Change', fontsize=14, fontweight='bold')
axes[1].axvline(x=0, color='black', linestyle='-', linewidth=1)
axes[1].grid(axis='x', alpha=0.3)

# Add value labels
for i, v in enumerate(budget_viz_sorted['Change (%)']):
    axes[1].text(v + 2 if v > 0 else v - 2, i, f'{v:.1f}%', va='center', 
                 ha='left' if v > 0 else 'right', fontweight='bold')

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Left chart: Shows current budget vs recommended budget
- Right chart: Shows percentage change needed
- Green bars: Increase budget (underinvested)
- Red bars: Decrease budget (overinvested)
- Based on Linear attribution (most balanced model)

---

### Code Cell 27: Plot 5 - Journey Length Analysis

```python
# Analyze journey length patterns
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Chart 1: Overall journey length distribution
journey_length_counts = journeys_df['Num_Touchpoints'].value_counts().sort_index()
axes[0].bar(journey_length_counts.index, journey_length_counts.values, color='steelblue', alpha=0.8)
axes[0].set_xlabel('Number of Touchpoints', fontsize=12, fontweight='bold')
axes[0].set_ylabel('Number of Journeys', fontsize=12, fontweight='bold')
axes[0].set_title('Distribution of Journey Lengths', fontsize=14, fontweight='bold')
axes[0].grid(axis='y', alpha=0.3)

# Add value labels
for i, v in enumerate(journey_length_counts.values):
    axes[0].text(journey_length_counts.index[i], v + 10, str(v), ha='center', fontweight='bold')

# Chart 2: Journey length by conversion status
journey_conv = journeys_df.groupby(['Num_Touchpoints', 'Converted']).size().unstack(fill_value=0)
journey_conv.plot(kind='bar', ax=axes[1], color=['lightcoral', 'lightgreen'], alpha=0.8)
axes[1].set_xlabel('Number of Touchpoints', fontsize=12, fontweight='bold')
axes[1].set_ylabel('Number of Journeys', fontsize=12, fontweight='bold')
axes[1].set_title('Journey Length by Conversion Status', fontsize=14, fontweight='bold')
axes[1].legend(title='Converted', labels=['No', 'Yes'])
axes[1].tick_params(axis='x', rotation=0)
axes[1].grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Left chart: Shows how many touchpoints most journeys have
- Right chart: Compares converters vs non-converters
- Notice: Converters typically have longer journeys
- Insight: More touchpoints = higher conversion likelihood

---

### Code Cell 28: Plot 6 - Attribution Volatility

```python
# Show which channels are most affected by model choice
fig, ax = plt.subplots(figsize=(12, 6))

# Calculate min and max for each channel
comparison_df['Max_Credit'] = comparison_df[models].max(axis=1)
comparison_df['Min_Credit'] = comparison_df[models].min(axis=1)
comparison_df['Range'] = comparison_df['Max_Credit'] - comparison_df['Min_Credit']

volatility_sorted = comparison_df.sort_values('Range', ascending=True)

y_pos = np.arange(len(volatility_sorted))

# Plot ranges
ax.barh(y_pos, volatility_sorted['Max_Credit'], color='lightgreen', alpha=0.7, label='Max Credit')
ax.barh(y_pos, volatility_sorted['Min_Credit'], color='lightcoral', alpha=0.7, label='Min Credit')

ax.set_yticks(y_pos)
ax.set_yticklabels(volatility_sorted['Channel'])
ax.set_xlabel('Attribution Credit ($)', fontsize=12, fontweight='bold')
ax.set_title('Attribution Volatility: Min vs Max Credit by Channel', fontsize=14, fontweight='bold')
ax.legend()
ax.grid(axis='x', alpha=0.3)

# Add range labels
for i, (min_val, max_val, range_val) in enumerate(zip(volatility_sorted['Min_Credit'], 
                                                        volatility_sorted['Max_Credit'], 
                                                        volatility_sorted['Range'])):
    ax.text(max_val + 500, i, f'Range: ${range_val:,.0f}', va='center', fontsize=9)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Shows minimum and maximum credit each channel receives across all models
- Large gap = channel credit is very sensitive to model choice
- Small gap = channel credit is consistent across models
- Helps identify which channels need careful attribution consideration

---

### Code Cell 29: Plot 7 - First-Touch vs Last-Touch

```python
# Compare the two extreme models
fig, ax = plt.subplots(figsize=(12, 6))

x = np.arange(len(comparison_df))
width = 0.35

ax.bar(x - width/2, comparison_df['First-Touch'], width, label='First-Touch', color='gold', alpha=0.8)
ax.bar(x + width/2, comparison_df['Last-Touch'], width, label='Last-Touch', color='crimson', alpha=0.8)

ax.set_xlabel('Channel', fontsize=12, fontweight='bold')
ax.set_ylabel('Attribution Credit ($)', fontsize=12, fontweight='bold')
ax.set_title('First-Touch vs Last-Touch Attribution: The Extremes', fontsize=14, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(comparison_df['Channel'], rotation=45, ha='right')
ax.legend()
ax.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Compares the two most extreme attribution models
- First-Touch favors awareness channels (Social Media, Display Ads)
- Last-Touch favors conversion channels (Search Ads, Direct Traffic)
- Shows why model choice matters so much!

---

### Code Cell 30: Plot 8 - Revenue vs Cost Scatter

```python
# Analyze efficiency: revenue vs cost
fig, ax = plt.subplots(figsize=(12, 8))

# Exclude Direct Traffic (zero cost)
scatter_df = comparison_df[comparison_df['Channel'] != 'Direct Traffic'].copy()

# Create scatter plot
scatter = ax.scatter(scatter_df['Monthly_Cost'], scatter_df['Linear'], 
                     s=300, alpha=0.6, c=range(len(scatter_df)), cmap='viridis')

# Add channel labels
for idx, row in scatter_df.iterrows():
    ax.annotate(row['Channel'], 
                (row['Monthly_Cost'], row['Linear']),
                xytext=(5, 5), textcoords='offset points',
                fontsize=10, fontweight='bold')

# Add break-even line (y = x)
max_val = max(scatter_df['Monthly_Cost'].max(), scatter_df['Linear'].max())
ax.plot([0, max_val], [0, max_val], 'r--', linewidth=2, alpha=0.5, label='Break-even line')

ax.set_xlabel('Monthly Cost ($)', fontsize=12, fontweight='bold')
ax.set_ylabel('Revenue (Linear Attribution) ($)', fontsize=12, fontweight='bold')
ax.set_title('Revenue vs Cost by Channel (Linear Attribution)', fontsize=14, fontweight='bold')
ax.legend()
ax.grid(True, alpha=0.3)

# Add quadrant labels
ax.text(max_val * 0.8, max_val * 0.2, 'Low Revenue\nHigh Cost', 
        ha='center', va='center', fontsize=10, alpha=0.5, style='italic')
ax.text(max_val * 0.2, max_val * 0.8, 'High Revenue\nLow Cost', 
        ha='center', va='center', fontsize=10, alpha=0.5, style='italic')

plt.tight_layout()
plt.show()
```

**📖 Explanation:**
- Scatter plot shows cost vs revenue for each channel
- Red dashed line = break-even (revenue = cost)
- **Above the line:** Profitable channels
- **Below the line:** Unprofitable channels
- **Top-left quadrant:** Best channels (high revenue, low cost)
- **Bottom-right quadrant:** Worst channels (low revenue, high cost)

---

## 🎓 Part 9: Reflection Questions

### Discussion Questions

Answer these questions based on your analysis:

**1. Model Selection:**
- Which attribution model do you think is most appropriate for this business? Why?
- What are the trade-offs of your chosen model?

**2. Channel Strategy:**
- Which channels are undervalued by last-click attribution?
- Which channels would you invest more in based on your analysis?
- Which channels would you reduce budget for?

**3. Business Impact:**
- How much would budget allocation change if you switched from last-click to linear attribution?
- What's the potential revenue impact of better attribution?

**4. Limitations:**
- What are the limitations of rule-based attribution models?
- What additional data would improve this analysis?
- How might privacy changes (cookie deprecation) affect attribution?

**5. Next Steps:**
- What would you recommend to the marketing team?
- How would you present these findings to stakeholders?
- What experiments would you run to validate your recommendations?

---

## 🚀 Part 10: Extensions and Advanced Exercises

### Optional Challenges

**Challenge 1: Custom Attribution Model**
Create your own attribution model with custom weights. For example:
- 30% first touch
- 50% last touch
- 20% middle touches

**Challenge 2: Time-Based Analysis**
Analyze how attribution changes over time:
- Compare weekday vs weekend journeys
- Analyze by hour of day
- Look at seasonal patterns

**Challenge 3: Campaign-Level Attribution**
Extend the analysis to campaign level:
- Which campaigns drive the most conversions?
- How do campaigns work together?
- What's the ROI by campaign?

**Challenge 4: Markov Chain Attribution**
Implement a basic Markov chain attribution model:
- Calculate transition probabilities
- Compute removal effects
- Compare to rule-based models

**Challenge 5: Visualization Dashboard**
Create an interactive dashboard using Plotly:
- Model comparison sliders
- Channel performance drill-down
- ROI calculator

---

## 📚 Additional Resources

**Learn More About Attribution:**
- Google Analytics Attribution Documentation
- "Marketing Attribution" by Avinash Kaushik
- "Measuring Marketing" by John Davis

**Python Libraries for Advanced Attribution:**
- `lifetimes`: Customer lifetime value
- `pymc3`: Bayesian attribution modeling
- `networkx`: Markov chain implementation

**Industry Tools:**
- Google Analytics 4 (Data-Driven Attribution)
- Adobe Analytics
- Segment
- Mixpanel

---

## ✅ Checklist: Did You Complete Everything?

- [ ] Loaded and explored the data
- [ ] Analyzed channel and campaign performance
- [ ] Created multi-touch customer journeys
- [ ] Implemented First-Touch attribution
- [ ] Implemented Last-Touch attribution
- [ ] Implemented Linear attribution
- [ ] Implemented Time-Decay attribution
- [ ] Implemented Position-Based attribution
- [ ] Compared all 5 models
- [ ] Calculated ROI for each model
- [ ] Generated budget recommendations
- [ ] Created visualizations
- [ ] Answered reflection questions

---

## 🎉 Congratulations!

You've completed the Multi-Touch Attribution modeling exercise! You now know how to:
- Transform single-touch data into multi-touch journeys
- Implement 5 different attribution models
- Compare attribution results
- Calculate channel ROI
- Make data-driven budget recommendations

**Next Steps:**
- Apply this to your own marketing data
- Experiment with different attribution models
- Present findings to your team
- Implement attribution in your analytics stack

---

**Questions? Need Help?**  
Contact: [Instructor Email]

**Course:** ITX4513 - Social Media Analytics  
**Institution:** Assumption University - SIMBA  
**Day:** 4 - Multi-Touch Attribution

---
