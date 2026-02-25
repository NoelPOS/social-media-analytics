# Multi-Touch Attribution in Multi-Channel Marketing
## Day 4: Social Media Analytics - ITX4513

---

# Title Slide

**SOCIAL MEDIA ANALYTICS**  
**ITX4513**

**Day 4: Multi-Touch Attribution in Multi-Channel Marketing**

Assumption University - SIMBA  
[Instructor Name]  
[Date]

---

# Today's Agenda

**MORNING (10:00 AM - 12:00 PM)**
- The Marketing Attribution Problem (20 min)
- Understanding the Customer Journey (25 min)
- Rule-Based Attribution Models (30 min)
- BREAK (10 min)
- Data-Driven Attribution (20 min)
- Practical Implications & Strategy (15 min)

**AFTERNOON (1:30 PM - 4:30 PM)**
- Python Implementation
- Hands-On Exercises
- Model Comparison Activities

---

# Learning Objectives

By the end of today, you will:

1. Explain the marketing attribution problem and why last-click attribution is misleading
2. Implement 5 rule-based attribution models in Python
3. Compare attribution model outputs and interpret results
4. Calculate attribution weights for multi-channel campaigns
5. Select appropriate attribution models based on business goals
6. Understand advanced concepts: Markov chains & Shapley values

---

# Connection to Previous Days

**DAY 1: Foundations** → We learned to measure metrics

**DAY 2: Analysis** → We learned to analyze data

**DAY 3: Application** → We applied analytics to campaigns

**DAY 4: Attribution** → We answer: "Which channel deserves credit?"

---

# SECTION 1: THE MARKETING ATTRIBUTION PROBLEM

---

# The Modern Marketing Reality

**The Explosion of Digital Channels**

**2010:**
- Website
- Email
- Maybe Facebook

**2024:**
- Website, Email, Blog
- Facebook, Instagram, Twitter, LinkedIn, TikTok
- Google Ads, Display Ads, YouTube Ads
- Influencer partnerships, Podcasts, Webinars
- SMS, WhatsApp, Affiliate marketing

**PROBLEM:** Customer sees 5-10+ touchpoints before buying

---

# The Attribution Question

**Scenario:**  
A customer sees your brand 5 times before buying:

1. Sees Instagram ad
2. Clicks Facebook post
3. Reads blog article
4. Gets email reminder
5. Searches Google → Buys

**WHO GETS CREDIT FOR THE SALE?**

---

# Why Last-Click is Misleading

**LAST-CLICK ATTRIBUTION:**  
100% credit goes to the final touchpoint

**In our example:**
- Google Search gets 100% credit
- Instagram, Facebook, Blog, Email get 0%

**WHY THIS IS WRONG:**
- Ignores awareness-building channels
- Undervalues early touchpoints
- Leads to poor budget decisions
- Kills top-of-funnel marketing

**Yet... it's the default in most analytics tools!**

---

# The 80/20 Revenue Rule

**RESEARCH FINDING:**  
80% of conversions involve multiple touchpoints  
Only 20% are single-touch conversions

**WHAT THIS MEANS:**
- Most customers don't buy on first visit
- Journey involves multiple interactions
- Attribution matters for 80% of your revenue!

*Source: Google Analytics Multi-Channel Funnels Report*

---

# Business Consequences

**SCENARIO: E-commerce company**

**LAST-CLICK SHOWS:**
- Google Ads: 70% of conversions
- Social Media: 5% of conversions

**DECISION:** Cut social media budget

**REALITY:**
- Social media drives awareness
- Customers discover brand on Instagram
- Later search Google to buy
- Cutting social → fewer Google searches!

**RESULT:** Revenue drops 30%

*Real story from retail client*

---

# The Attribution Challenge

**WHY ATTRIBUTION IS HARD**

1. **MULTIPLE TOUCHPOINTS** - Average: 6-8 touchpoints before purchase
2. **CROSS-DEVICE BEHAVIOR** - See ad on phone, buy on laptop
3. **TIME LAG** - Days or weeks between first touch and conversion
4. **OFFLINE + ONLINE** - See billboard, search online, buy in store
5. **DARK SOCIAL** - WhatsApp, private messages (untrackable)
6. **PRIVACY CHANGES** - Cookie deprecation, iOS tracking limits

---

# Think About Your Own Behavior

**Raise your hand if you've ever:**

- Seen an ad, then searched for the product later?
- Discovered a brand on social media, bought from their website?
- Saw something on your phone, purchased on your computer?
- Took days/weeks to decide before buying?

**YOU are a multi-touch customer!**

---

# SECTION 2: UNDERSTANDING THE CUSTOMER JOURNEY

---

# What is a Touchpoint?

**TOUCHPOINT = Any interaction between a customer and your brand**

**EXAMPLES:**
- Sees Instagram ad
- Clicks Facebook post
- Visits website
- Opens email
- Watches YouTube video
- Reads blog article
- Clicks Google ad
- Engages with influencer post

**EACH TOUCHPOINT = One step in the journey**

---

# What is a Conversion?

**CONVERSION = The desired action you want customers to take**

**EXAMPLES:**
- Purchase (e-commerce)
- Sign up (SaaS)
- Download app
- Fill out form (lead generation)
- Book appointment
- Subscribe to newsletter

**YOUR GOAL:** Understand which touchpoints lead to conversions

---

# The Customer Journey

**AWARENESS → CONSIDERATION → DECISION → PURCHASE**

**Example Journey:**

| Day | Touchpoint | Stage |
|-----|------------|-------|
| Day 1 | Instagram Ad | Awareness |
| Day 3 | Facebook Post | Consideration |
| Day 5 | Blog Article | Consideration |
| Day 7 | Email | Decision |
| Day 10 | Google Search → Purchase | Purchase |

**5 touchpoints across 10 days**

---

# Assisted Conversions

**ASSISTED CONVERSION = A touchpoint that helped but wasn't the last click**

**In our example:**
- Instagram Ad: **ASSISTED**
- Facebook Post: **ASSISTED**
- Blog Article: **ASSISTED**
- Email: **ASSISTED**
- Google Search: **LAST CLICK** (gets all credit)

**PROBLEM:** Assisted conversions are invisible in last-click attribution!

---

# Multi-Session Journeys

**SINGLE SESSION (Rare):**  
See ad → Click → Buy immediately

**MULTI-SESSION (Common):**
- **Session 1:** See Instagram ad, visit site, leave
- **Session 2:** Get email, click, browse, leave
- **Session 3:** Search Google, return, add to cart, leave
- **Session 4:** Get retargeting ad, return, purchase

**AVERAGE:** 3-5 sessions before purchase  
**TIME SPAN:** 1-30+ days

---

# Cross-Device Behavior

**TYPICAL SCENARIO:**

| Day | Device | Action |
|-----|--------|--------|
| Monday | Phone | See Instagram ad |
| Tuesday | Tablet | Read blog article |
| Wednesday | Laptop | Search Google |
| Thursday | Laptop | Purchase |

**PROBLEM:** Tracking across devices is difficult
- Different cookies
- Different sessions
- Looks like 4 different people!

---

# Funnel vs. Journey Thinking

**OLD THINKING: LINEAR FUNNEL**  
Awareness → Interest → Desire → Action  
(Everyone follows same path)

**NEW THINKING: CUSTOMER JOURNEY**
- Non-linear
- Multiple entry points
- Back-and-forth movement
- Different paths for different people

**ATTRIBUTION:** Must handle non-linear journeys

---

# Real Customer Journey Example

**Customer: Sarah, buying running shoes**

| Day | Touchpoint |
|-----|------------|
| Day 1 | Sees Instagram ad for Nike shoes |
| Day 2 | Clicks Facebook ad for Adidas |
| Day 3 | Searches "best running shoes 2024" |
| Day 5 | Reads blog review comparing brands |
| Day 7 | Gets email from Nike (abandoned cart) |
| Day 8 | Sees YouTube ad for Asics |
| Day 10 | Searches "Nike running shoes discount" |
| Day 12 | Clicks Google Shopping ad → Purchases Nike |

**QUESTION:** Which channel deserves credit?

---

# Customer Journey Key Points

1. Journeys are **MULTI-TOUCH** (not single-touch)
2. Journeys are **MULTI-SESSION** (not one visit)
3. Journeys are **CROSS-DEVICE** (phone, tablet, laptop)
4. Journeys are **NON-LINEAR** (not a straight funnel)
5. Journeys take **TIME** (days to weeks)
6. **EVERY touchpoint plays a role**

**Attribution = Giving credit fairly across the journey**

---

# SECTION 3: RULE-BASED ATTRIBUTION MODELS

---

# What are Rule-Based Models?

**DEFINITION:** Pre-defined rules that assign credit to touchpoints

**CHARACTERISTICS:**
- Simple to understand
- Easy to implement
- Consistent and predictable
- Based on assumptions (not data)
- Same rule applies to all journeys

**TODAY WE'LL LEARN 5 MODELS:**
1. First-Touch
2. Last-Touch
3. Linear
4. Time-Decay
5. Position-Based (U-Shaped)

---

# Example Journey for All Models

**Customer Journey:**

| Touchpoint | Channel |
|------------|---------|
| 1 | Instagram Ad |
| 2 | Facebook Post |
| 3 | Blog Article |
| 4 | Email |
| 5 | Google Search → SALE |

**SALE VALUE:** $100

**QUESTION:** How do we split the $100 credit?

Let's see what each model says...

---

# Model 1: First-Touch Attribution

**RULE:** 100% credit to the FIRST touchpoint

**EXAMPLE:**
- Instagram Ad: **$100 (100%)**
- Facebook Post: $0
- Blog Article: $0
- Email: $0
- Google Search: $0

**FORMULA:**  
Credit = 100% if first touchpoint, else 0%

---

# First-Touch: When It Works

**BEST FOR:**
- Brand awareness campaigns
- Top-of-funnel focus
- New customer acquisition
- Long sales cycles

**STRENGTHS:**
- Simple to understand
- Values awareness channels
- Good for measuring reach

**WEAKNESSES:**
- Ignores nurturing touchpoints
- Undervalues conversion channels
- Biased toward awareness channels

**USE CASE:** "We want to know which channel brings in NEW customers"

---

# Model 2: Last-Touch Attribution

**RULE:** 100% credit to the LAST touchpoint

**EXAMPLE:**
- Instagram Ad: $0
- Facebook Post: $0
- Blog Article: $0
- Email: $0
- Google Search: **$100 (100%)**

**FORMULA:**  
Credit = 100% if last touchpoint, else 0%

**⚠️ This is the DEFAULT in most analytics tools!**

---

# Last-Touch: When It Works

**BEST FOR:**
- Short sales cycles
- Single-session purchases
- Conversion optimization focus

**STRENGTHS:**
- Simple to understand
- Easy to implement
- Values conversion channels

**WEAKNESSES:**
- Ignores awareness touchpoints
- Undervalues early channels
- Biased toward bottom-of-funnel
- Leads to poor budget decisions

**USE CASE:** "We want to know which channel closes the deal"

**REALITY:** Usually NOT the best choice!

---

# Model 3: Linear Attribution

**RULE:** Equal credit to ALL touchpoints

**EXAMPLE:**
- Instagram Ad: **$20 (20%)**
- Facebook Post: **$20 (20%)**
- Blog Article: **$20 (20%)**
- Email: **$20 (20%)**
- Google Search: **$20 (20%)**

**FORMULA:**  
Credit = 100% / Number of Touchpoints  
= 100% / 5 = 20% each

---

# Linear: When It Works

**BEST FOR:**
- Full-funnel campaigns
- When all touchpoints matter equally
- Maintaining consistent messaging

**STRENGTHS:**
- Fair to all channels
- Simple to calculate
- No bias toward any stage

**WEAKNESSES:**
- Assumes all touchpoints equal (rarely true)
- Doesn't account for timing
- Doesn't account for position

**USE CASE:** "We want to value the entire journey equally"

**REALITY:** More fair than first/last-touch, but still oversimplified

---

# Model 4: Time-Decay Attribution

**RULE:** More credit to RECENT touchpoints

**EXAMPLE (7-day half-life):**
- Instagram Ad (Day 1): **$6.25 (6.25%)**
- Facebook Post (Day 3): **$12.50 (12.5%)**
- Blog Article (Day 5): **$18.75 (18.75%)**
- Email (Day 7): **$25.00 (25%)**
- Google Search (Day 10): **$37.50 (37.5%)**

**FORMULA:**  
Credit = 2^(-days_ago / half_life)  
Normalized to 100%

**Closer to conversion = More credit**

---

# Time-Decay: When It Works

**BEST FOR:**
- Short sales cycles
- Promotional campaigns
- When recent interactions matter most

**STRENGTHS:**
- Values recency
- Gives some credit to all touchpoints
- Reflects reality (recent = more influential)

**WEAKNESSES:**
- Undervalues awareness touchpoints
- Requires choosing half-life parameter
- Still somewhat arbitrary

**USE CASE:** "Recent touchpoints are more influential in our sales"

**COMMON IN:** E-commerce, retail

---

# Model 5: Position-Based (U-Shaped)

**RULE:** 40% first, 40% last, 20% middle

**EXAMPLE:**
- Instagram Ad (First): **$40 (40%)**
- Facebook Post: **$6.67 (6.67%)**
- Blog Article: **$6.67 (6.67%)**
- Email: **$6.67 (6.67%)**
- Google Search (Last): **$40 (40%)**

**FORMULA:**
- First touchpoint: 40%
- Last touchpoint: 40%
- Middle touchpoints: 20% / (n-2)

**Also called "U-Shaped" or "Bathtub"**

---

# Position-Based: When It Works

**BEST FOR:**
- Valuing both awareness AND conversion
- Balanced approach
- When first and last matter most

**STRENGTHS:**
- Values customer acquisition (first)
- Values conversion (last)
- Gives some credit to middle
- More realistic than first/last alone

**WEAKNESSES:**
- 40/20/40 split is arbitrary
- Undervalues middle touchpoints
- Assumes first and last are equally important

**USE CASE:** "We want to value both discovery and conversion equally"

**POPULAR IN:** B2B marketing, SaaS

---

# All 5 Models Compared

**Journey: IG → FB → Blog → Email → Google**

| MODEL | IG | FB | Blog | Email | Google |
|-------|----|----|------|-------|--------|
| First-Touch | 100% | 0% | 0% | 0% | 0% |
| Last-Touch | 0% | 0% | 0% | 0% | 100% |
| Linear | 20% | 20% | 20% | 20% | 20% |
| Time-Decay | 6% | 13% | 19% | 25% | 37% |
| Position-Based | 40% | 7% | 7% | 7% | 40% |

**NOTICE:** Wildly different results!  
Same journey, different credit allocation

---

# 10-MINUTE BREAK

☕ Stretch break!

Back at 11:25 AM for:
- Data-Driven Attribution
- Practical Strategy

---

# SECTION 4: DATA-DRIVEN ATTRIBUTION

---

# Why Rule-Based Models Are Limited

**PROBLEM: They're ARBITRARY**
- Why 40/20/40 and not 50/10/40?
- Why 7-day half-life and not 5-day?
- Why equal credit in linear?

**PROBLEM: They're ONE-SIZE-FITS-ALL**
- Same rule for all customers
- Same rule for all products
- Doesn't learn from your data

**PROBLEM: They're ASSUMPTION-BASED**
- Assume first/last matter most
- Assume recency matters
- But do they? In YOUR business?

**SOLUTION:** Let the DATA decide!

---

# What is Data-Driven Attribution?

**DEFINITION:**  
Use machine learning and statistics to determine credit based on ACTUAL customer behavior

**HOW IT WORKS:**
1. Analyze thousands of customer journeys
2. Compare converting vs. non-converting paths
3. Calculate: "What's the incremental impact of each channel?"
4. Assign credit based on actual contribution

**RESULT:** Credit allocation based on YOUR data, not arbitrary rules

**EXAMPLES:** Markov Chains, Shapley Values

---

# Markov Chain Attribution (Concept)

**CONCEPT:**  
Model customer journey as a series of states

**STATES:**
- Start
- Instagram
- Facebook
- Blog
- Email
- Google
- Conversion
- Null (didn't convert)

**QUESTION:** What's the probability of conversion if we REMOVE a channel?

**CREDIT:** Based on how much conversion probability drops without that channel

---

# Markov Chain Example

**SCENARIO:** Remove Facebook from all journeys

**WITH Facebook:**  
Conversion Rate = 10%

**WITHOUT Facebook:**  
Conversion Rate = 7%

**IMPACT:** Facebook contributes 3% to conversions

**CREDIT:** Facebook gets credit proportional to its removal effect

Do this for ALL channels → Attribution weights

**ADVANTAGE:** Based on actual impact, not assumptions

---

# Shapley Value Attribution (Concept)

**ORIGIN:** Game theory (Nobel Prize-winning concept)

**QUESTION:** How to fairly distribute payoff among players in a cooperative game?

**APPLIED TO MARKETING:**
- "Players" = Marketing channels
- "Payoff" = Conversion
- "Cooperation" = Channels working together

**CALCULATION:**
- Consider ALL possible orderings of channels
- Calculate marginal contribution in each ordering
- Average across all orderings = Shapley value

**RESULT:** Fair credit allocation

---

# Shapley Value Example

**3 Channels: A, B, C**

**ALL POSSIBLE ORDERINGS:**
- A → B → C
- A → C → B
- B → A → C
- B → C → A
- C → A → B
- C → B → A

**For each ordering:**  
Calculate marginal contribution of each channel

**Average contributions = Shapley values**

**ADVANTAGE:** Considers all possible combinations  
**DISADVANTAGE:** Computationally expensive (2^n orderings)

---

# Data-Driven vs. Rule-Based

**RULE-BASED:**
- ✅ Simple to understand
- ✅ Easy to implement
- ✅ Predictable
- ✅ No data requirements
- ❌ Arbitrary assumptions
- ❌ One-size-fits-all
- ❌ Doesn't learn

**DATA-DRIVEN:**
- ✅ Based on YOUR data
- ✅ Learns from behavior
- ✅ More accurate
- ✅ Adapts over time
- ❌ Complex to understand
- ❌ Requires lots of data
- ❌ "Black box" feeling
- ❌ Computationally expensive

**RECOMMENDATION:** Start with rule-based, graduate to data-driven

---

# Attribution vs. Prediction

**ATTRIBUTION MODELING:**  
"Which past touchpoints led to this conversion?"
- Looking backward
- Assigning credit
- Understanding what happened

**CONVERSION PREDICTION:**  
"Will this customer convert in the future?"
- Looking forward
- Predicting outcomes
- Understanding what will happen

**DIFFERENT QUESTIONS!**  
Both use ML, but different goals

**TODAY:** We focus on ATTRIBUTION

---

# Correlation vs. Incrementality

**CORRELATION:**  
"Customers who see Facebook ads convert more"
- But does Facebook CAUSE conversions?
- Or do high-intent customers see more ads?

**INCREMENTALITY:**  
"What additional conversions happen BECAUSE of Facebook ads?"
- Causal question
- Requires experimentation (A/B tests)

**ATTRIBUTION CHALLENGE:**  
Most models show correlation, not causation

**GOLD STANDARD:** Incrementality testing  
(But expensive and time-consuming)

---

# SECTION 5: PRACTICAL IMPLICATIONS & STRATEGY

---

# Budget Reallocation Impact

**SCENARIO:** $100K monthly marketing budget

**LAST-CLICK ATTRIBUTION SHOWS:**
- Google Ads: 70% of conversions → $70K budget
- Social Media: 10% of conversions → $10K budget
- Email: 20% of conversions → $20K budget

**POSITION-BASED ATTRIBUTION SHOWS:**
- Google Ads: 40% of credit → $40K budget
- Social Media: 35% of credit → $35K budget
- Email: 25% of credit → $25K budget

**DIFFERENCE:** $30K budget shift!

**REAL IMPACT:** Millions of dollars in large companies

---

# Channel ROI Distortion

**CHANNEL: Instagram Ads**

**LAST-CLICK ROI:**
- Spend: $10,000
- Last-click conversions: 50
- Revenue: $5,000
- ROI: **-50% (LOOKS TERRIBLE!)**

**POSITION-BASED ROI:**
- Spend: $10,000
- Attributed conversions: 200
- Revenue: $20,000
- ROI: **+100% (LOOKS GREAT!)**

**SAME CHANNEL, DIFFERENT STORY!**

**DANGER:** Wrong attribution = killing profitable channels

---

# Privacy Challenges

**CHALLENGES:**
- Cookie deprecation (Chrome 2024)
- iOS App Tracking Transparency
- GDPR/CCPA restrictions
- Users blocking trackers

**IMPACT ON ATTRIBUTION:**
- ❌ Can't track cross-device
- ❌ Can't track cross-site
- ❌ Missing touchpoints
- ❌ Incomplete journeys

**SOLUTIONS:**
- First-party data (logins)
- Server-side tracking
- Probabilistic matching
- Aggregate reporting
- Marketing Mix Modeling (MMM)

**REALITY:** Attribution is getting harder

---

# Attribution in GA4

**GA4 OFFERS:**
- Last Click (default)
- First Click
- Linear
- Position-Based
- Data-Driven (if enough data)

**HOW TO ACCESS:**  
Advertising → Attribution → Model Comparison

**REQUIREMENTS FOR DATA-DRIVEN:**
- 400+ conversions per month
- 15,000+ clicks per month
- Sufficient data volume

**TIP:** Compare models side-by-side in GA4!

---

# Multi-Touch Attribution vs. MMM

**MULTI-TOUCH ATTRIBUTION (MTA):**
- User-level tracking
- Digital channels
- Short-term (days/weeks)
- Requires tracking
- Answers: "Which touchpoints?"

**MARKETING MIX MODELING (MMM):**
- Aggregate data
- All channels (TV, radio, digital)
- Long-term (months/years)
- No tracking needed
- Answers: "Which channels overall?"

**WHEN TO USE EACH:**
- **MTA:** Digital-first, user-level optimization
- **MMM:** Multi-channel, privacy-friendly, strategic

**TREND:** Moving toward MMM due to privacy

---

# Which Model Should You Use?

**QUESTIONS TO ASK:**

**1. WHAT'S YOUR GOAL?**
- Awareness → First-Touch
- Conversion → Last-Touch
- Full journey → Linear or Position-Based

**2. WHAT'S YOUR SALES CYCLE?**
- Short → Last-Touch or Time-Decay
- Long → Position-Based or Data-Driven

**3. HOW MUCH DATA DO YOU HAVE?**
- Limited → Rule-Based
- Lots → Data-Driven

**4. WHAT'S YOUR TECHNICAL CAPABILITY?**
- Basic → Simple models
- Advanced → Markov/Shapley

**5. WHAT'S YOUR INDUSTRY STANDARD?**
- B2C E-commerce → Time-Decay
- B2B SaaS → Position-Based

---

# Attribution Best Practices

**1. START SIMPLE**  
Begin with Last-Click, then Linear

**2. COMPARE MODELS**  
Run multiple models side-by-side

**3. ALIGN WITH GOALS**  
Choose model that matches objectives

**4. EDUCATE STAKEHOLDERS**  
Explain why attribution matters

**5. TEST AND ITERATE**  
Try different models, measure impact

**6. DON'T OVER-OPTIMIZE**  
Attribution is imperfect - use judgment

**7. COMBINE WITH OTHER DATA**  
Surveys, incrementality tests, qualitative feedback

**"All models are wrong, but some are useful"**

---

# Morning Session Summary

**WE COVERED:**
- ✅ The attribution problem (last-click is misleading)
- ✅ Customer journey concepts (touchpoints, conversions)
- ✅ 5 Rule-Based Models (First, Last, Linear, Time-Decay, Position)
- ✅ Data-Driven Attribution (Markov, Shapley)
- ✅ Practical implications (budgets, ROI, privacy)

**KEY TAKEAWAY:**  
Attribution is about fairly distributing credit across the customer journey to make better marketing decisions

**NEXT:** Lunch, then Python implementation!

---

# LUNCH BREAK

🍽️ 90-MINUTE BREAK

**Lunch: 12:00 PM - 1:30 PM**

**AFTERNOON SESSION:**
- Implement attribution models in Python
- Work with real campaign data
- Compare model outputs
- Calculate attribution weights

Bring your laptops charged!  
See you at 1:30 PM sharp!

---

# Afternoon Overview

**WHAT WE'LL BUILD:**

1. **LOAD CAMPAIGN DATA** - Multi-channel customer journey data
2. **IMPLEMENT 5 ATTRIBUTION MODELS** - First-Touch, Last-Touch, Linear, Time-Decay, Position-Based
3. **COMPARE RESULTS** - See how models differ
4. **CALCULATE CHANNEL ROI** - Based on different attributions
5. **VISUALIZE RESULTS** - Charts and comparisons

**GOAL:** Working attribution calculator!

---

# Key Concepts Review

**REMEMBER:**
- Touchpoint = One interaction
- Journey = Sequence of touchpoints
- Conversion = Desired action
- Attribution = Assigning credit

**MODELS:**
- First-Touch: 100% to first
- Last-Touch: 100% to last
- Linear: Equal to all
- Time-Decay: More to recent
- Position-Based: 40/20/40

**READY TO CODE? Let's go!**

---

# Discussion Questions

**Before we code, discuss with your neighbor:**

1. Which attribution model do you think is most fair? Why?

2. If you were a social media manager, which model would you use to report to your boss?

3. How might attribution change your marketing strategy?

4. What questions do you still have about attribution?

(3 minutes, then we'll share)

---

# Let's Build!

**NEXT STEPS:**
1. Open Jupyter Notebook / Python IDE
2. Load the attribution dataset
3. Follow along with exercises
4. Ask questions anytime!

**FILES YOU'LL NEED:**
- customer_journeys.csv
- attribution_functions.py (starter code)
- exercises.md (instructions)

**INSTRUCTOR WILL DEMO FIRST, THEN YOU'LL PRACTICE!**

Ready? Let's code! 💻

---

# END OF LECTURE SLIDES

Continue with:
- Hands-On Exercises
- Python Implementation
- Group Activities

(See activity-guide.md and exercises.md)

---

# Thank You!

Questions?

[Instructor Contact Information]

---
