"""
Multi-Touch Attribution Analysis
Day 4: Social Media Analytics - ITX4513
Assumption University - SIMBA

This script implements 5 attribution models and analyzes marketing channel performance.
"""

import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
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

print("="*80)
print(" " * 20 + "MULTI-TOUCH ATTRIBUTION ANALYSIS")
print("="*80)
print("\n✅ Libraries imported successfully!\n")


# ============================================================================
# PART 1: LOAD AND EXPLORE DATA
# ============================================================================

print("📊 PART 1: Loading Data...")
print("-" * 80)

# Load the dataset
df = pd.read_csv('multi_touch_attribution_data.csv')

print(f"Dataset Shape: {df.shape}")
print(f"\nFirst 5 rows:")
print(df.head())
print(f"\nData Types:")
print(df.dtypes)
print(f"\nMissing Values: {df.isnull().sum().sum()}")
print(f"\nConversion Rate: {(df['Conversion'] == 'Yes').sum() / len(df) * 100:.2f}%")


# ============================================================================
# PART 2: CREATE MULTI-TOUCH CUSTOMER JOURNEYS
# ============================================================================

print("\n" + "="*80)
print("📊 PART 2: Creating Multi-Touch Customer Journeys...")
print("-" * 80)

# Set random seed for reproducibility
np.random.seed(42)

def create_customer_journeys(df, num_journeys=2000):
    """Creates realistic multi-touch customer journeys from single-touch data."""
    journeys = []
    channels = df['Channel'].unique()
    original_conv_rate = (df['Conversion'] == 'Yes').sum() / len(df)
    
    for journey_id in range(1, num_journeys + 1):
        # Decide if this journey converts
        converts = np.random.random() < original_conv_rate
        
        # Determine journey length
        if converts:
            num_touchpoints = np.random.choice([3, 4, 5, 6], p=[0.2, 0.3, 0.3, 0.2])
        else:
            num_touchpoints = np.random.choice([2, 3, 4], p=[0.5, 0.3, 0.2])
        
        # Generate touchpoints
        journey_channels = []
        for position in range(num_touchpoints):
            if position == 0:
                # First touchpoint: favor awareness channels
                channel = np.random.choice(
                    ['Social Media', 'Display Ads', 'Search Ads', 'Email', 'Referral'],
                    p=[0.3, 0.25, 0.25, 0.15, 0.05]
                )
            elif position == num_touchpoints - 1 and converts:
                # Last touchpoint: favor conversion channels
                channel = np.random.choice(
                    ['Search Ads', 'Direct Traffic', 'Email', 'Social Media', 'Referral'],
                    p=[0.35, 0.25, 0.2, 0.15, 0.05]
                )
            else:
                # Middle touchpoints: balanced
                channel = np.random.choice(channels)
            
            journey_channels.append(channel)
        
        journeys.append({
            'Journey_ID': journey_id,
            'Touchpoints': ' → '.join(journey_channels),
            'Num_Touchpoints': num_touchpoints,
            'First_Touch': journey_channels[0],
            'Last_Touch': journey_channels[-1],
            'Converted': 'Yes' if converts else 'No',
            'Conversion_Value': 100 if converts else 0
        })
    
    return pd.DataFrame(journeys)

# Generate journeys
journeys_df = create_customer_journeys(df, num_journeys=2000)

print(f"✅ Generated {len(journeys_df)} customer journeys")
print(f"   Converted: {(journeys_df['Converted'] == 'Yes').sum()}")
print(f"   Non-Converted: {(journeys_df['Converted'] == 'No').sum()}")
print(f"   Total Revenue: ${journeys_df['Conversion_Value'].sum():,}")
print(f"\nSample Journeys:")
print(journeys_df.head(10))


# ============================================================================
# PART 3: IMPLEMENT ATTRIBUTION MODELS
# ============================================================================

print("\n" + "="*80)
print("📊 PART 3: Implementing Attribution Models...")
print("-" * 80)

# Helper function
def parse_journey(touchpoints_str):
    """Parses a journey string into a list of channels."""
    return [channel.strip() for channel in touchpoints_str.split('→')]

# Filter to converted journeys only
converted_journeys = journeys_df[journeys_df['Converted'] == 'Yes'].copy()

# --- MODEL 1: FIRST-TOUCH ATTRIBUTION ---
print("\n🥇 Model 1: First-Touch Attribution")

def first_touch_attribution(journey_channels, conversion_value):
    """100% credit to the first touchpoint."""
    attribution = {}
    if len(journey_channels) > 0:
        first_channel = journey_channels[0]
        attribution[first_channel] = conversion_value
    return attribution

first_touch_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = first_touch_attribution(channels, row['Conversion_Value'])
    for channel, credit in attribution.items():
        first_touch_results[channel] = first_touch_results.get(channel, 0) + credit

first_touch_df = pd.DataFrame(list(first_touch_results.items()), 
                               columns=['Channel', 'First_Touch_Credit'])
first_touch_df = first_touch_df.sort_values('First_Touch_Credit', ascending=False)
print(first_touch_df)


# --- MODEL 2: LAST-TOUCH ATTRIBUTION ---
print("\n🏁 Model 2: Last-Touch Attribution")

def last_touch_attribution(journey_channels, conversion_value):
    """100% credit to the last touchpoint."""
    attribution = {}
    if len(journey_channels) > 0:
        last_channel = journey_channels[-1]
        attribution[last_channel] = conversion_value
    return attribution

last_touch_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = last_touch_attribution(channels, row['Conversion_Value'])
    for channel, credit in attribution.items():
        last_touch_results[channel] = last_touch_results.get(channel, 0) + credit

last_touch_df = pd.DataFrame(list(last_touch_results.items()), 
                              columns=['Channel', 'Last_Touch_Credit'])
last_touch_df = last_touch_df.sort_values('Last_Touch_Credit', ascending=False)
print(last_touch_df)


# --- MODEL 3: LINEAR ATTRIBUTION ---
print("\n⚖️ Model 3: Linear Attribution")

def linear_attribution(journey_channels, conversion_value):
    """Equal credit to all touchpoints."""
    attribution = {}
    if len(journey_channels) > 0:
        credit_per_channel = conversion_value / len(journey_channels)
        for channel in journey_channels:
            attribution[channel] = attribution.get(channel, 0) + credit_per_channel
    return attribution

linear_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = linear_attribution(channels, row['Conversion_Value'])
    for channel, credit in attribution.items():
        linear_results[channel] = linear_results.get(channel, 0) + credit

linear_df = pd.DataFrame(list(linear_results.items()), 
                         columns=['Channel', 'Linear_Credit'])
linear_df = linear_df.sort_values('Linear_Credit', ascending=False)
print(linear_df)


# --- MODEL 4: TIME-DECAY ATTRIBUTION ---
print("\n⏰ Model 4: Time-Decay Attribution")

def time_decay_attribution(journey_channels, conversion_value, half_life=7):
    """More credit to recent touchpoints."""
    attribution = {}
    if len(journey_channels) > 0:
        num_touchpoints = len(journey_channels)
        weights = []
        for position in range(num_touchpoints):
            days_ago = num_touchpoints - position - 1
            weight = 2 ** (-days_ago / half_life)
            weights.append(weight)
        
        total_weight = sum(weights)
        normalized_weights = [w / total_weight for w in weights]
        
        for channel, weight in zip(journey_channels, normalized_weights):
            credit = conversion_value * weight
            attribution[channel] = attribution.get(channel, 0) + credit
    
    return attribution

time_decay_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = time_decay_attribution(channels, row['Conversion_Value'], half_life=7)
    for channel, credit in attribution.items():
        time_decay_results[channel] = time_decay_results.get(channel, 0) + credit

time_decay_df = pd.DataFrame(list(time_decay_results.items()), 
                              columns=['Channel', 'Time_Decay_Credit'])
time_decay_df = time_decay_df.sort_values('Time_Decay_Credit', ascending=False)
print(time_decay_df)


# --- MODEL 5: POSITION-BASED ATTRIBUTION ---
print("\n🏆 Model 5: Position-Based Attribution (40/20/40)")

def position_based_attribution(journey_channels, conversion_value, 
                                first_pct=0.4, last_pct=0.4, middle_pct=0.2):
    """40% first, 40% last, 20% middle."""
    attribution = {}
    num_touchpoints = len(journey_channels)
    
    if num_touchpoints == 0:
        return attribution
    elif num_touchpoints == 1:
        attribution[journey_channels[0]] = conversion_value
    elif num_touchpoints == 2:
        attribution[journey_channels[0]] = conversion_value * 0.5
        attribution[journey_channels[1]] = attribution.get(journey_channels[1], 0) + conversion_value * 0.5
    else:
        first_channel = journey_channels[0]
        last_channel = journey_channels[-1]
        middle_channels = journey_channels[1:-1]
        
        attribution[first_channel] = conversion_value * first_pct
        attribution[last_channel] = attribution.get(last_channel, 0) + conversion_value * last_pct
        
        if len(middle_channels) > 0:
            credit_per_middle = (conversion_value * middle_pct) / len(middle_channels)
            for channel in middle_channels:
                attribution[channel] = attribution.get(channel, 0) + credit_per_middle
    
    return attribution

position_based_results = {}
for _, row in converted_journeys.iterrows():
    channels = parse_journey(row['Touchpoints'])
    attribution = position_based_attribution(channels, row['Conversion_Value'])
    for channel, credit in attribution.items():
        position_based_results[channel] = position_based_results.get(channel, 0) + credit

position_based_df = pd.DataFrame(list(position_based_results.items()), 
                                  columns=['Channel', 'Position_Based_Credit'])
position_based_df = position_based_df.sort_values('Position_Based_Credit', ascending=False)
print(position_based_df)


# ============================================================================
# PART 4: COMPARE ALL MODELS
# ============================================================================

print("\n" + "="*80)
print("📊 PART 4: Comparing All Attribution Models...")
print("-" * 80)

# Merge all results
comparison_df = first_touch_df.copy()
comparison_df = comparison_df.merge(last_touch_df, on='Channel', how='outer')
comparison_df = comparison_df.merge(linear_df, on='Channel', how='outer')
comparison_df = comparison_df.merge(time_decay_df, on='Channel', how='outer')
comparison_df = comparison_df.merge(position_based_df, on='Channel', how='outer')
comparison_df = comparison_df.fillna(0)

comparison_df.columns = ['Channel', 'First-Touch', 'Last-Touch', 'Linear', 
                         'Time-Decay', 'Position-Based']
comparison_df = comparison_df.sort_values('Linear', ascending=False)

print("\n📊 ATTRIBUTION MODEL COMPARISON")
print("="*80)
print(comparison_df.to_string(index=False))
print("\n" + "="*80)
print("TOTALS:")
for col in comparison_df.columns[1:]:
    print(f"{col:20s}: ${comparison_df[col].sum():,.2f}")


# ============================================================================
# PART 5: CALCULATE ROI
# ============================================================================

print("\n" + "="*80)
print("📊 PART 5: Calculating ROI...")
print("-" * 80)

# Simulated channel costs
channel_costs = {
    'Social Media': 5000,
    'Search Ads': 8000,
    'Display Ads': 6000,
    'Email': 2000,
    'Referral': 1000,
    'Direct Traffic': 0
}

comparison_df['Monthly_Cost'] = comparison_df['Channel'].map(channel_costs)

# Calculate ROI for Linear model
comparison_df['Linear_ROI'] = comparison_df.apply(
    lambda row: ((row['Linear'] - row['Monthly_Cost']) / row['Monthly_Cost'] * 100) 
    if row['Monthly_Cost'] > 0 else float('inf'),
    axis=1
)

roi_df = comparison_df[['Channel', 'Monthly_Cost', 'Linear', 'Linear_ROI']].copy()
roi_df = roi_df.replace([np.inf, -np.inf], 999999)

print("\n💰 ROI ANALYSIS (Linear Attribution)")
print(roi_df.to_string(index=False))


# ============================================================================
# PART 6: BUDGET RECOMMENDATIONS
# ============================================================================

print("\n" + "="*80)
print("📊 PART 6: Budget Recommendations...")
print("-" * 80)

total_budget = sum(channel_costs.values())
total_revenue = comparison_df['Linear'].sum()

comparison_df['Recommended_Budget'] = (comparison_df['Linear'] / total_revenue * total_budget).round(0)
comparison_df['Budget_Change'] = comparison_df['Recommended_Budget'] - comparison_df['Monthly_Cost']
comparison_df['Budget_Change_Pct'] = (comparison_df['Budget_Change'] / comparison_df['Monthly_Cost'] * 100).round(2)

budget_recommendation = comparison_df[['Channel', 'Monthly_Cost', 'Linear', 
                                        'Recommended_Budget', 'Budget_Change', 'Budget_Change_Pct']].copy()

print(f"\nCurrent Total Budget: ${total_budget:,}")
print(f"Total Revenue (Linear): ${total_revenue:,.2f}")
print(f"Overall ROI: {((total_revenue - total_budget) / total_budget * 100):.2f}%")
print("\n📊 BUDGET REALLOCATION RECOMMENDATIONS:")
print(budget_recommendation.to_string(index=False))


# ============================================================================
# PART 7: SUMMARY REPORT
# ============================================================================

print("\n" + "="*80)
print(" " * 20 + "ATTRIBUTION ANALYSIS SUMMARY REPORT")
print("="*80)

print("\n📊 KEY FINDINGS:\n")

# 1. Overall performance
total_conversions = (journeys_df['Converted'] == 'Yes').sum()
print(f"1. OVERALL PERFORMANCE")
print(f"   • Total Customer Journeys: {len(journeys_df):,}")
print(f"   • Total Conversions: {total_conversions:,}")
print(f"   • Conversion Rate: {(total_conversions / len(journeys_df) * 100):.2f}%")
print(f"   • Total Revenue: ${journeys_df['Conversion_Value'].sum():,}")

# 2. Top performing channels
print(f"\n2. TOP PERFORMING CHANNELS (Linear Attribution)")
top_3 = comparison_df.nlargest(3, 'Linear')[['Channel', 'Linear']]
for idx, row in top_3.iterrows():
    pct = (row['Linear'] / total_revenue * 100)
    print(f"   • {row['Channel']}: ${row['Linear']:,.0f} ({pct:.1f}% of revenue)")

# 3. ROI leaders
print(f"\n3. HIGHEST ROI CHANNELS (Linear Attribution)")
roi_leaders = roi_df[roi_df['Channel'] != 'Direct Traffic'].nlargest(3, 'Linear_ROI')[['Channel', 'Linear_ROI']]
for idx, row in roi_leaders.iterrows():
    print(f"   • {row['Channel']}: {row['Linear_ROI']:.1f}% ROI")

# 4. Budget recommendations
print(f"\n4. BUDGET REALLOCATION RECOMMENDATIONS")
increase = budget_recommendation[budget_recommendation['Budget_Change_Pct'] > 10].sort_values('Budget_Change_Pct', ascending=False)
decrease = budget_recommendation[budget_recommendation['Budget_Change_Pct'] < -10].sort_values('Budget_Change_Pct')

if len(increase) > 0:
    print(f"   INCREASE BUDGET:")
    for idx, row in increase.iterrows():
        print(f"   • {row['Channel']}: +{row['Budget_Change_Pct']:.1f}% (${row['Budget_Change']:,.0f})")

if len(decrease) > 0:
    print(f"   DECREASE BUDGET:")
    for idx, row in decrease.iterrows():
        print(f"   • {row['Channel']}: {row['Budget_Change_Pct']:.1f}% (${row['Budget_Change']:,.0f})")

print("\n" + "="*80)
print(" " * 25 + "ANALYSIS COMPLETE!")
print("="*80)
print("\n✅ All attribution models executed successfully!")


# ============================================================================
# PART 8: VISUALIZATIONS
# ============================================================================

print("\n" + "="*80)
print("📊 PART 8: Generating Visualizations...")
print("-" * 80)

# Set up the plotting style
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['axes.facecolor'] = 'white'

# --- PLOT 1: Attribution Model Comparison (Grouped Bar Chart) ---
print("\n📊 Creating Plot 1: Attribution Model Comparison...")

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
plt.savefig('plot1_attribution_comparison.png', dpi=300, bbox_inches='tight')
print("   ✅ Saved: plot1_attribution_comparison.png")
plt.close()


# --- PLOT 2: Model Comparison - Percentage Distribution ---
print("\n📊 Creating Plot 2: Percentage Distribution by Model...")

fig, ax = plt.subplots(figsize=(12, 6))

# Calculate percentages
pct_df = comparison_df.copy()
for col in models:
    pct_df[col] = (pct_df[col] / pct_df[col].sum() * 100)

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
plt.savefig('plot2_percentage_distribution.png', dpi=300, bbox_inches='tight')
print("   ✅ Saved: plot2_percentage_distribution.png")
plt.close()


# --- PLOT 3: ROI Comparison by Channel ---
print("\n📊 Creating Plot 3: ROI Comparison...")

fig, ax = plt.subplots(figsize=(12, 6))

# Exclude Direct Traffic for better scale
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
plt.savefig('plot3_roi_comparison.png', dpi=300, bbox_inches='tight')
print("   ✅ Saved: plot3_roi_comparison.png")
plt.close()


# --- PLOT 4: Budget Recommendations ---
print("\n📊 Creating Plot 4: Budget Recommendations...")

fig, axes = plt.subplots(1, 2, figsize=(16, 6))

# Chart 1: Current vs Recommended Budget
budget_viz = budget_recommendation[budget_recommendation['Channel'] != 'Direct Traffic'].copy()
x = np.arange(len(budget_viz))
width = 0.35

axes[0].bar(x - width/2, budget_viz['Monthly_Cost'], width, label='Current Budget', color='lightblue', alpha=0.8)
axes[0].bar(x + width/2, budget_viz['Recommended_Budget'], width, label='Recommended Budget', color='lightgreen', alpha=0.8)
axes[0].set_xlabel('Channel', fontsize=12, fontweight='bold')
axes[0].set_ylabel('Budget ($)', fontsize=12, fontweight='bold')
axes[0].set_title('Current vs Recommended Budget', fontsize=14, fontweight='bold')
axes[0].set_xticks(x)
axes[0].set_xticklabels(budget_viz['Channel'], rotation=45, ha='right')
axes[0].legend()
axes[0].grid(axis='y', alpha=0.3)

# Chart 2: Budget Change Percentage
budget_viz_sorted = budget_viz.sort_values('Budget_Change_Pct')
colors_change = ['green' if x > 0 else 'red' for x in budget_viz_sorted['Budget_Change_Pct']]
axes[1].barh(budget_viz_sorted['Channel'], budget_viz_sorted['Budget_Change_Pct'], color=colors_change, alpha=0.7)
axes[1].set_xlabel('Budget Change (%)', fontsize=12, fontweight='bold')
axes[1].set_title('Recommended Budget Change', fontsize=14, fontweight='bold')
axes[1].axvline(x=0, color='black', linestyle='-', linewidth=1)
axes[1].grid(axis='x', alpha=0.3)

# Add value labels
for i, v in enumerate(budget_viz_sorted['Budget_Change_Pct']):
    axes[1].text(v + 2 if v > 0 else v - 2, i, f'{v:.1f}%', va='center', ha='left' if v > 0 else 'right', fontweight='bold')

plt.tight_layout()
plt.savefig('plot4_budget_recommendations.png', dpi=300, bbox_inches='tight')
print("   ✅ Saved: plot4_budget_recommendations.png")
plt.show()


# --- PLOT 5: Journey Length Distribution ---
print("\n📊 Creating Plot 5: Journey Length Analysis...")

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
plt.savefig('plot5_journey_length.png', dpi=300, bbox_inches='tight')
print("   ✅ Saved: plot5_journey_length.png")
plt.show()


# --- PLOT 6: Attribution Volatility (Min vs Max) ---
print("\n📊 Creating Plot 6: Attribution Volatility...")

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
plt.savefig('plot6_attribution_volatility.png', dpi=300, bbox_inches='tight')
print("   ✅ Saved: plot6_attribution_volatility.png")
plt.show()


# --- PLOT 7: First Touch vs Last Touch Comparison ---
print("\n📊 Creating Plot 7: First-Touch vs Last-Touch Comparison...")

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
plt.savefig('plot7_first_vs_last_touch.png', dpi=300, bbox_inches='tight')
print("   ✅ Saved: plot7_first_vs_last_touch.png")
plt.show()


# --- PLOT 8: Revenue vs Cost Scatter Plot ---
print("\n📊 Creating Plot 8: Revenue vs Cost Analysis...")

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
plt.savefig('plot8_revenue_vs_cost.png', dpi=300, bbox_inches='tight')
print("   ✅ Saved: plot8_revenue_vs_cost.png")
plt.show()


print("\n" + "="*80)
print("✅ All 8 visualizations generated and saved!")
print("="*80)
print("\nGenerated files:")
print("  1. plot1_attribution_comparison.png")
print("  2. plot2_percentage_distribution.png")
print("  3. plot3_roi_comparison.png")
print("  4. plot4_budget_recommendations.png")
print("  5. plot5_journey_length.png")
print("  6. plot6_attribution_volatility.png")
print("  7. plot7_first_vs_last_touch.png")
print("  8. plot8_revenue_vs_cost.png")
print("\n📊 Analysis complete with visualizations!")
