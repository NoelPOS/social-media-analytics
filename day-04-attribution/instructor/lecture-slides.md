# Day 4 Lecture Slides: Multi-Touch Attribution in Multi-Channel Marketing

---

## 🎓 Presentation Guide for Instructors

**Total Slides:** ~40  
**Duration:** 2 hours (10:00 AM - 12:00 PM)  
**Format:** Designed for PowerPoint/Google Slides/Markdown  
**Usage:** Morning lecture session

**Notes for Instructors:**
- Each slide includes presenter notes below
- Timing suggestions provided
- Interactive elements marked with 🎯
- Discussion prompts marked with 💭
- Key concepts marked with ⭐

---

# WELCOME & INTRODUCTION

---

## Slide 1: Title Slide

```
═══════════════════════════════════════
    SOCIAL MEDIA ANALYTICS
    ITX4513
    
    Day 4: Multi-Touch Attribution
    in Multi-Channel Marketing
    
    Assumption University - SIMBA
    [Instructor Name]
    [Date]
═══════════════════════════════════════
```

**Presenter Notes:**
- Display as students arrive
- Welcome students warmly
- This is the culmination of Days 1-3
- **Timing:** 10:00-10:01

---

## Slide 2: Today's Agenda

```
📅 DAY 4 AGENDA

MORNING (10:00 AM - 12:00 PM)
✓ The Marketing Attribution Problem (20 min)
✓ Understanding the Customer Journey (25 min)
✓ Rule-Based Attribution Models (30 min)
  BREAK (10 min)
✓ Data-Driven Attribution (20 min)
✓ Practical Implications & Strategy (15 min)

AFTERNOON (1:30 PM - 4:30 PM)
✓ Python Implementation
✓ Hands-On Exercises
✓ Model Comparison Activities
```

**Presenter Notes:**
- Walk through schedule
- Note: Morning = theory, Afternoon = practice
- **Timing:** 10:01-10:02

---

## Slide 3: Learning Objectives

```
🎯 BY THE END OF TODAY, YOU WILL:

1. Explain the marketing attribution problem and 
   why last-click attribution is misleading

2. Implement 5 rule-based attribution models in Python
   (First-Touch, Last-Touch, Linear, Time-Decay, Position-Based)

3. Compare attribution model outputs and interpret results

4. Calculate attribution weights for multi-channel campaigns

5. Select appropriate attribution models based on 
   business goals and data maturity

6. Understand advanced concepts: Markov chains & Shapley values
```

**Presenter Notes:**
- Aligns with Course Objective #4
- Return to this at end of day
- **Timing:** 10:02-10:03

---

## Slide 4: Connection to Previous Days

```
🔗 BUILDING ON DAYS 1-3

DAY 1: Foundations
→ We learned to measure metrics

DAY 2: Analysis  
→ We learned to analyze data

DAY 3: Application
→ We applied analytics to campaigns

DAY 4: Attribution
→ We answer: "Which channel deserves credit?"

TODAY: The most strategic question in marketing analytics
```

**Presenter Notes:**
- Show progression
- Attribution is the "why" behind the "what"
- **Timing:** 10:03-10:05

---

# SECTION 1: THE MARKETING ATTRIBUTION PROBLEM

---

## Slide 5: Section Title

```
═══════════════════════════════════════

    BLOCK 1
    THE MARKETING 
    ATTRIBUTION PROBLEM

═══════════════════════════════════════
```

**Presenter Notes:**
- Transition to main content
- **Timing:** 10:05

---

## Slide 6: The Modern Marketing Reality

```
📱 THE EXPLOSION OF DIGITAL CHANNELS

2010:
• Website
• Email
• Maybe Facebook

2024:
• Website, Email, Blog
• Facebook, Instagram, Twitter, LinkedIn, TikTok
• Google Ads, Display Ads, YouTube Ads
• Influencer partnerships
• Podcasts, Webinars
• SMS, WhatsApp
• Affiliate marketing
• And more...

PROBLEM: Customer sees 5-10+ touchpoints before buying
```

**Presenter Notes:**
- Show visual timeline
- "Marketing is more complex than ever"
- **Timing:** 10:05-10:07

---

## Slide 7: The Attribution Question

```
❓ THE FUNDAMENTAL QUESTION

Scenario:
A customer sees your brand 5 times before buying:

1. Sees Instagram ad
2. Clicks Facebook post
3. Reads blog article
4. Gets email reminder
5. Searches Google → Buys

WHO GETS CREDIT FOR THE SALE?

🎯 Turn to your neighbor: What do you think?
(2 minutes)
```

**Presenter Notes:**
- This is THE question of attribution
- No obvious answer
- Get students thinking
- **Timing:** 10:07-10:10

---

## Slide 8: Why Last-Click is Misleading

```
⚠️ THE LAST-CLICK PROBLEM

LAST-CLICK ATTRIBUTION:
100% credit goes to the final touchpoint

In our example:
• Google Search gets 100% credit
• Instagram, Facebook, Blog, Email get 0%

WHY THIS IS WRONG:
❌ Ignores awareness-building channels
❌ Undervalues early touchpoints
❌ Leads to poor budget decisions
❌ Kills top-of-funnel marketing

Yet... it's the default in most analytics tools!
```

**Presenter Notes:**
- Most common mistake
- "Google looks like a hero, but is it?"
- **Timing:** 10:10-10:12

---

## Slide 9: The 80/20 Revenue Rule

```
📊 THE 80/20 RULE IN ATTRIBUTION

RESEARCH FINDING:
80% of conversions involve multiple touchpoints
Only 20% are single-touch conversions

WHAT THIS MEANS:
• Most customers don't buy on first visit
• Journey involves multiple interactions
• Attribution matters for 80% of your revenue!

SOURCE: Google Analytics Multi-Channel Funnels Report
```

**Presenter Notes:**
- Cite research
- "This is why we're here today"
- **Timing:** 10:12-10:14

---

## Slide 10: Business Consequences

```
💰 CONSEQUENCES OF WRONG ATTRIBUTION

SCENARIO: E-commerce company

LAST-CLICK SHOWS:
• Google Ads: 70% of conversions
• Social Media: 5% of conversions

DECISION: Cut social media budget

REALITY:
• Social media drives awareness
• Customers discover brand on Instagram
• Later search Google to buy
• Cutting social → fewer Google searches!

RESULT: Revenue drops 30%

Real story from retail client
```

**Presenter Notes:**
- Real-world example
- Attribution affects millions in budget
- **Timing:** 10:14-10:17

---

## Slide 11: The Attribution Challenge

```
🎯 WHY ATTRIBUTION IS HARD

CHALLENGES:

1. MULTIPLE TOUCHPOINTS
   Average: 6-8 touchpoints before purchase

2. CROSS-DEVICE BEHAVIOR
   See ad on phone, buy on laptop

3. TIME LAG
   Days or weeks between first touch and conversion

4. OFFLINE + ONLINE
   See billboard, search online, buy in store

5. DARK SOCIAL
   WhatsApp, private messages (untrackable)

6. PRIVACY CHANGES
   Cookie deprecation, iOS tracking limits
```

**Presenter Notes:**
- These are real technical challenges
- No perfect solution exists
- **Timing:** 10:17-10:20

---

## Slide 12: Discussion Question 💭

```
💭 THINK ABOUT YOUR OWN BEHAVIOR

Raise your hand if you've ever:

✋ Seen an ad, then searched for the product later?

✋ Discovered a brand on social media, 
   bought from their website?

✋ Saw something on your phone, 
   purchased on your computer?

✋ Took days/weeks to decide before buying?

YOU are a multi-touch customer!
```

**Presenter Notes:**
- Make it personal
- Students relate to their own behavior
- **Timing:** 10:20-10:22

---

# SECTION 2: UNDERSTANDING THE CUSTOMER JOURNEY

---

## Slide 13: Section Title

```
═══════════════════════════════════════

    BLOCK 2
    UNDERSTANDING THE
    CUSTOMER JOURNEY

═══════════════════════════════════════
```

**Presenter Notes:**
- Transition to journey concepts
- **Timing:** 10:22

---

## Slide 14: What is a Touchpoint?

```
👆 TOUCHPOINT DEFINITION

TOUCHPOINT = Any interaction between a customer 
             and your brand

EXAMPLES:
• Sees Instagram ad
• Clicks Facebook post
• Visits website
• Opens email
• Watches YouTube video
• Reads blog article
• Clicks Google ad
• Engages with influencer post

EACH TOUCHPOINT = One step in the journey
```

**Presenter Notes:**
- Simple definition
- Can be paid, owned, or earned media
- **Timing:** 10:22-10:24

---

## Slide 15: What is a Conversion?

```
🎯 CONVERSION DEFINITION

CONVERSION = The desired action you want 
             customers to take

EXAMPLES:
• Purchase (e-commerce)
• Sign up (SaaS)
• Download app
• Fill out form (lead generation)
• Book appointment
• Subscribe to newsletter

YOUR GOAL: Understand which touchpoints 
           lead to conversions
```

**Presenter Notes:**
- Conversion varies by business
- Define YOUR conversion first
- **Timing:** 10:24-10:26

---

## Slide 16: The Customer Journey

```
🛤️ CUSTOMER JOURNEY VISUALIZATION

AWARENESS → CONSIDERATION → DECISION → PURCHASE

Example Journey:
┌─────────────────────────────────────────┐
│ Day 1:  Instagram Ad (Awareness)        │
│ Day 3:  Facebook Post (Consideration)   │
│ Day 5:  Blog Article (Consideration)    │
│ Day 7:  Email (Decision)                │
│ Day 10: Google Search → Purchase        │
└─────────────────────────────────────────┘

5 touchpoints across 10 days
```

**Presenter Notes:**
- Draw timeline on board
- Show progression through funnel
- **Timing:** 10:26-10:29

---

## Slide 17: Assisted Conversions

```
🤝 ASSISTED CONVERSIONS

ASSISTED CONVERSION = A touchpoint that helped 
                      but wasn't the last click

In our example:
• Instagram Ad: ASSISTED
• Facebook Post: ASSISTED
• Blog Article: ASSISTED
• Email: ASSISTED
• Google Search: LAST CLICK (gets all credit)

PROBLEM: Assisted conversions are invisible 
         in last-click attribution!
```

**Presenter Notes:**
- This is what we're trying to fix
- "Give credit where credit is due"
- **Timing:** 10:29-10:31

---

## Slide 18: Multi-Session Journeys

```
📅 MULTI-SESSION REALITY

SINGLE SESSION (Rare):
See ad → Click → Buy immediately

MULTI-SESSION (Common):
Session 1: See Instagram ad, visit site, leave
Session 2: Get email, click, browse, leave
Session 3: Search Google, return, add to cart, leave
Session 4: Get retargeting ad, return, purchase

AVERAGE: 3-5 sessions before purchase

TIME SPAN: 1-30+ days
```

**Presenter Notes:**
- Buying is a process, not an event
- Especially for high-value items
- **Timing:** 10:31-10:33

---

## Slide 19: Cross-Device Behavior

```
📱💻 CROSS-DEVICE CHALLENGE

TYPICAL SCENARIO:
Monday (Phone):    See Instagram ad
Tuesday (Tablet):  Read blog article
Wednesday (Laptop): Search Google
Thursday (Laptop):  Purchase

PROBLEM: Tracking across devices is difficult
• Different cookies
• Different sessions
• Looks like 4 different people!

SOLUTION: User login, device graphs (advanced)
```

**Presenter Notes:**
- Major technical challenge
- Privacy regulations make this harder
- **Timing:** 10:33-10:35

---

## Slide 20: Funnel vs. Journey Thinking

```
🔀 FUNNEL VS. JOURNEY

OLD THINKING: LINEAR FUNNEL
Awareness → Interest → Desire → Action
(Everyone follows same path)

NEW THINKING: CUSTOMER JOURNEY
┌─────┐
│Start│→ [Multiple paths, loops, exits]
└─────┘
• Non-linear
• Multiple entry points
• Back-and-forth movement
• Different paths for different people

ATTRIBUTION: Must handle non-linear journeys
```

**Presenter Notes:**
- Shift in marketing thinking
- Journeys are messy
- **Timing:** 10:35-10:38

---

## Slide 21: Real Example Journey

```
📊 REAL CUSTOMER JOURNEY EXAMPLE

Customer: Sarah, buying running shoes

Day 1:  Sees Instagram ad for Nike shoes
Day 2:  Clicks Facebook ad for Adidas
Day 3:  Searches "best running shoes 2024"
Day 5:  Reads blog review comparing brands
Day 7:  Gets email from Nike (abandoned cart)
Day 8:  Sees YouTube ad for Asics
Day 10: Searches "Nike running shoes discount"
Day 12: Clicks Google Shopping ad → Purchases Nike

QUESTION: Which channel deserves credit?
```

**Presenter Notes:**
- Real complexity
- Multiple brands competing
- This is what attribution solves
- **Timing:** 10:38-10:42

---

## Slide 22: Key Takeaways

```
⭐ CUSTOMER JOURNEY KEY POINTS

1. Journeys are MULTI-TOUCH (not single-touch)

2. Journeys are MULTI-SESSION (not one visit)

3. Journeys are CROSS-DEVICE (phone, tablet, laptop)

4. Journeys are NON-LINEAR (not a straight funnel)

5. Journeys take TIME (days to weeks)

6. EVERY touchpoint plays a role

Attribution = Giving credit fairly across the journey
```

**Presenter Notes:**
- Summarize section
- Set up for attribution models
- **Timing:** 10:42-10:45

---

# SECTION 3: RULE-BASED ATTRIBUTION MODELS

---

## Slide 23: Section Title

```
═══════════════════════════════════════

    BLOCK 3
    RULE-BASED
    ATTRIBUTION MODELS

═══════════════════════════════════════
```

**Presenter Notes:**
- Core content section
- 5 models to learn
- **Timing:** 10:45

---

## Slide 24: What are Rule-Based Models?

```
📏 RULE-BASED ATTRIBUTION

DEFINITION:
Pre-defined rules that assign credit to touchpoints

CHARACTERISTICS:
• Simple to understand
• Easy to implement
• Consistent and predictable
• Based on assumptions (not data)
• Same rule applies to all journeys

TODAY WE'LL LEARN 5 MODELS:
1. First-Touch
2. Last-Touch
3. Linear
4. Time-Decay
5. Position-Based (U-Shaped)
```

**Presenter Notes:**
- "Rule-based" = follows a formula
- Start simple, build complexity
- **Timing:** 10:45-10:47

---

## Slide 25: Example Journey for All Models

```
🛤️ EXAMPLE JOURNEY (We'll use this for all models)

Customer Journey:
┌──────────────────────────────────────┐
│ Touchpoint 1: Instagram Ad           │
│ Touchpoint 2: Facebook Post          │
│ Touchpoint 3: Blog Article           │
│ Touchpoint 4: Email                  │
│ Touchpoint 5: Google Search → SALE   │
└──────────────────────────────────────┘

SALE VALUE: $100

QUESTION: How do we split the $100 credit?

Let's see what each model says...
```

**Presenter Notes:**
- Use same example for consistency
- Makes comparison easier
- **Timing:** 10:47-10:49

---

## Slide 26: Model 1 - First-Touch Attribution

```
🥇 FIRST-TOUCH ATTRIBUTION

RULE: 100% credit to the FIRST touchpoint

EXAMPLE:
Instagram Ad:    $100 (100%)
Facebook Post:   $0
Blog Article:    $0
Email:           $0
Google Search:   $0

FORMULA:
Credit = 100% if first touchpoint, else 0%
```

**Presenter Notes:**
- Simplest model
- "First impression matters"
- **Timing:** 10:49-10:51

---

## Slide 27: First-Touch - When It Works

```
✅ WHEN TO USE FIRST-TOUCH

BEST FOR:
• Brand awareness campaigns
• Top-of-funnel focus
• New customer acquisition
• Long sales cycles

STRENGTHS:
✓ Simple to understand
✓ Values awareness channels
✓ Good for measuring reach

WEAKNESSES:
❌ Ignores nurturing touchpoints
❌ Undervalues conversion channels
❌ Biased toward awareness channels

USE CASE: "We want to know which channel 
          brings in NEW customers"
```

**Presenter Notes:**
- Every model has trade-offs
- Choose based on goals
- **Timing:** 10:51-10:53

---

## Slide 28: Model 2 - Last-Touch Attribution

```
🏁 LAST-TOUCH ATTRIBUTION

RULE: 100% credit to the LAST touchpoint

EXAMPLE:
Instagram Ad:    $0
Facebook Post:   $0
Blog Article:    $0
Email:           $0
Google Search:   $100 (100%)

FORMULA:
Credit = 100% if last touchpoint, else 0%

⚠️ This is the DEFAULT in most analytics tools!
```

**Presenter Notes:**
- Most common (unfortunately)
- "Last touch wins"
- **Timing:** 10:53-10:55

---

## Slide 29: Last-Touch - When It Works

```
✅ WHEN TO USE LAST-TOUCH

BEST FOR:
• Short sales cycles
• Single-session purchases
• Conversion optimization focus

STRENGTHS:
✓ Simple to understand
✓ Easy to implement
✓ Values conversion channels

WEAKNESSES:
❌ Ignores awareness touchpoints
❌ Undervalues early channels
❌ Biased toward bottom-of-funnel
❌ Leads to poor budget decisions

USE CASE: "We want to know which channel 
          closes the deal"

REALITY: Usually NOT the best choice!
```

**Presenter Notes:**
- Default ≠ best
- "Question the default"
- **Timing:** 10:55-10:57

---

## Slide 30: Model 3 - Linear Attribution

```
⚖️ LINEAR ATTRIBUTION

RULE: Equal credit to ALL touchpoints

EXAMPLE:
Instagram Ad:    $20 (20%)
Facebook Post:   $20 (20%)
Blog Article:    $20 (20%)
Email:           $20 (20%)
Google Search:   $20 (20%)

FORMULA:
Credit = 100% / Number of Touchpoints
       = 100% / 5 = 20% each
```

**Presenter Notes:**
- "Everyone gets a trophy"
- Democratic approach
- **Timing:** 10:57-10:59

---

## Slide 31: Linear - When It Works

```
✅ WHEN TO USE LINEAR

BEST FOR:
• Full-funnel campaigns
• When all touchpoints matter equally
• Maintaining consistent messaging

STRENGTHS:
✓ Fair to all channels
✓ Simple to calculate
✓ No bias toward any stage

WEAKNESSES:
❌ Assumes all touchpoints equal (rarely true)
❌ Doesn't account for timing
❌ Doesn't account for position

USE CASE: "We want to value the entire journey 
          equally"

REALITY: More fair than first/last-touch, 
         but still oversimplified
```

**Presenter Notes:**
- Better than first/last
- Still makes assumptions
- **Timing:** 10:59-11:01

---

## Slide 32: Model 4 - Time-Decay Attribution

```
⏰ TIME-DECAY ATTRIBUTION

RULE: More credit to RECENT touchpoints

EXAMPLE (7-day half-life):
Instagram Ad (Day 1):    $6.25 (6.25%)
Facebook Post (Day 3):   $12.50 (12.5%)
Blog Article (Day 5):    $18.75 (18.75%)
Email (Day 7):           $25.00 (25%)
Google Search (Day 10):  $37.50 (37.5%)

FORMULA:
Credit = 2^(-days_ago / half_life)
Normalized to 100%

Closer to conversion = More credit
```

**Presenter Notes:**
- Exponential decay
- Recency matters
- **Timing:** 11:01-11:03

---

## Slide 33: Time-Decay - Mathematical Intuition

```
📉 TIME-DECAY VISUALIZATION

Credit
  │
100%│                              ╱
    │                          ╱
 75%│                      ╱
    │                  ╱
 50%│              ╱
    │          ╱
 25%│      ╱
    │  ╱
  0%└──────────────────────────────→ Time
    First                      Last
    Touch                      Touch

Exponential increase toward conversion
```

**Presenter Notes:**
- Draw curve on board
- "Recency bias"
- **Timing:** 11:03-11:05

---

## Slide 34: Time-Decay - When It Works

```
✅ WHEN TO USE TIME-DECAY

BEST FOR:
• Short sales cycles
• Promotional campaigns
• When recent interactions matter most

STRENGTHS:
✓ Values recency
✓ Gives some credit to all touchpoints
✓ Reflects reality (recent = more influential)

WEAKNESSES:
❌ Undervalues awareness touchpoints
❌ Requires choosing half-life parameter
❌ Still somewhat arbitrary

USE CASE: "Recent touchpoints are more 
          influential in our sales"

COMMON IN: E-commerce, retail
```

**Presenter Notes:**
- More sophisticated than linear
- Half-life = tunable parameter
- **Timing:** 11:05-11:07

---

## Slide 35: Model 5 - Position-Based (U-Shaped)

```
🏆 POSITION-BASED ATTRIBUTION

RULE: 40% first, 40% last, 20% middle

EXAMPLE:
Instagram Ad (First):    $40 (40%)
Facebook Post:           $6.67 (6.67%)
Blog Article:            $6.67 (6.67%)
Email:                   $6.67 (6.67%)
Google Search (Last):    $40 (40%)

FORMULA:
First touchpoint: 40%
Last touchpoint: 40%
Middle touchpoints: 20% / (n-2)

Also called "U-Shaped" or "Bathtub"
```

**Presenter Notes:**
- Compromise model
- Values both ends
- **Timing:** 11:07-11:09

---

## Slide 36: Position-Based - Visualization

```
📊 POSITION-BASED VISUALIZATION

Credit
  │
 40%│█                              █
    │█                              █
 30%│█                              █
    │█                              █
 20%│█                              █
    │█                              █
 10%│█      ▄      ▄      ▄         █
    │█      █      █      █         █
  0%└──────────────────────────────────→
    1st    2nd    3rd    4th       5th
    Touch                         Touch

U-Shape: High at ends, low in middle
```

**Presenter Notes:**
- Visual makes it clear
- "Bathtub curve"
- **Timing:** 11:09-11:11

---

## Slide 37: Position-Based - When It Works

```
✅ WHEN TO USE POSITION-BASED

BEST FOR:
• Valuing both awareness AND conversion
• Balanced approach
• When first and last matter most

STRENGTHS:
✓ Values customer acquisition (first)
✓ Values conversion (last)
✓ Gives some credit to middle
✓ More realistic than first/last alone

WEAKNESSES:
❌ 40/20/40 split is arbitrary
❌ Undervalues middle touchpoints
❌ Assumes first and last are equally important

USE CASE: "We want to value both discovery 
          and conversion equally"

POPULAR IN: B2B marketing, SaaS
```

**Presenter Notes:**
- Most balanced rule-based model
- Still makes assumptions
- **Timing:** 11:11-11:13

---

## Slide 38: Comparison Table

```
📊 ALL 5 MODELS COMPARED

Journey: IG → FB → Blog → Email → Google

MODEL           IG    FB    Blog  Email Google
─────────────────────────────────────────────
First-Touch    100%   0%    0%    0%    0%
Last-Touch      0%    0%    0%    0%   100%
Linear         20%   20%   20%   20%   20%
Time-Decay     6%    13%   19%   25%   37%
Position-Based 40%   7%    7%    7%    40%

NOTICE: Wildly different results!
Same journey, different credit allocation
```

**Presenter Notes:**
- Show side-by-side
- "Which is right? Depends on your goals!"
- **Timing:** 11:13-11:15

---

## Slide 39: Break Time!

```
☕ 10-MINUTE BREAK

Stretch break!

Back at 11:25 AM for:
• Data-Driven Attribution
• Practical Strategy

Almost done with theory!
```

**Presenter Notes:**
- Short break
- Prepare for advanced section
- **Timing:** 11:15-11:25

---

# SECTION 4: DATA-DRIVEN ATTRIBUTION

---

## Slide 40: Section Title

```
═══════════════════════════════════════

    BLOCK 4
    DATA-DRIVEN
    ATTRIBUTION

═══════════════════════════════════════
```

**Presenter Notes:**
- Resume from break
- More advanced concepts
- **Timing:** 11:25

---

## Slide 41: Why Rule-Based Models Are Limited

```
⚠️ LIMITATIONS OF RULE-BASED MODELS

PROBLEM: They're ARBITRARY
• Why 40/20/40 and not 50/10/40?
• Why 7-day half-life and not 5-day?
• Why equal credit in linear?

PROBLEM: They're ONE-SIZE-FITS-ALL
• Same rule for all customers
• Same rule for all products
• Doesn't learn from your data

PROBLEM: They're ASSUMPTION-BASED
• Assume first/last matter most
• Assume recency matters
• But do they? In YOUR business?

SOLUTION: Let the DATA decide!
```

**Presenter Notes:**
- Critique rule-based approaches
- Set up data-driven methods
- **Timing:** 11:25-11:27

---

## Slide 42: What is Data-Driven Attribution?

```
🤖 DATA-DRIVEN ATTRIBUTION

DEFINITION:
Use machine learning and statistics to determine 
credit based on ACTUAL customer behavior

HOW IT WORKS:
1. Analyze thousands of customer journeys
2. Compare converting vs. non-converting paths
3. Calculate: "What's the incremental impact 
   of each channel?"
4. Assign credit based on actual contribution

RESULT: Credit allocation based on YOUR data, 
        not arbitrary rules

EXAMPLES: Markov Chains, Shapley Values
```

**Presenter Notes:**
- "Let the data speak"
- More accurate but more complex
- **Timing:** 11:27-11:29

---

## Slide 43: Markov Chain Attribution (Concept)

```
🔗 MARKOV CHAIN ATTRIBUTION

CONCEPT:
Model customer journey as a series of states

STATES:
• Start
• Instagram
• Facebook
• Blog
• Email
• Google
• Conversion
• Null (didn't convert)

QUESTION: What's the probability of conversion 
          if we REMOVE a channel?

CREDIT: Based on how much conversion probability 
        drops without that channel
```

**Presenter Notes:**
- Conceptual only (no math today)
- "Removal effect"
- **Timing:** 11:29-11:32

---

## Slide 44: Markov Chain Example

```
📊 MARKOV CHAIN EXAMPLE

SCENARIO: Remove Facebook from all journeys

WITH Facebook:
Conversion Rate = 10%

WITHOUT Facebook:
Conversion Rate = 7%

IMPACT: Facebook contributes 3% to conversions

CREDIT: Facebook gets credit proportional to 
        its removal effect

Do this for ALL channels → Attribution weights

ADVANTAGE: Based on actual impact, not assumptions
```

**Presenter Notes:**
- Intuitive concept
- "What if we didn't have this channel?"
- **Timing:** 11:32-11:34

---

## Slide 45: Shapley Value Attribution (Concept)

```
🎮 SHAPLEY VALUE ATTRIBUTION

ORIGIN: Game theory (Nobel Prize-winning concept)

QUESTION: How to fairly distribute payoff among 
          players in a cooperative game?

APPLIED TO MARKETING:
• "Players" = Marketing channels
• "Payoff" = Conversion
• "Cooperation" = Channels working together

CALCULATION:
Consider ALL possible orderings of channels
Calculate marginal contribution in each ordering
Average across all orderings = Shapley value

RESULT: Fair credit allocation
```

**Presenter Notes:**
- From economics/game theory
- Very fair but computationally expensive
- **Timing:** 11:34-11:36

---

## Slide 46: Shapley Value Example

```
🧮 SHAPLEY VALUE INTUITION

3 Channels: A, B, C

ALL POSSIBLE ORDERINGS:
A → B → C
A → C → B
B → A → C
B → C → A
C → A → B
C → B → A

For each ordering:
Calculate marginal contribution of each channel

Average contributions = Shapley values

ADVANTAGE: Considers all possible combinations
DISADVANTAGE: Computationally expensive (2^n orderings)
```

**Presenter Notes:**
- Conceptual understanding
- "Fair is complex"
- **Timing:** 11:36-11:38

---

## Slide 47: Data-Driven vs. Rule-Based

```
⚖️ COMPARISON

RULE-BASED:
✓ Simple to understand
✓ Easy to implement
✓ Predictable
✓ No data requirements
❌ Arbitrary assumptions
❌ One-size-fits-all
❌ Doesn't learn

DATA-DRIVEN:
✓ Based on YOUR data
✓ Learns from behavior
✓ More accurate
✓ Adapts over time
❌ Complex to understand
❌ Requires lots of data
❌ "Black box" feeling
❌ Computationally expensive

RECOMMENDATION: Start with rule-based, 
                graduate to data-driven
```

**Presenter Notes:**
- Both have place
- Progression path
- **Timing:** 11:38-11:40

---

## Slide 48: Attribution vs. Prediction

```
🔍 IMPORTANT DISTINCTION

ATTRIBUTION MODELING:
"Which past touchpoints led to this conversion?"
→ Looking backward
→ Assigning credit
→ Understanding what happened

CONVERSION PREDICTION:
"Will this customer convert in the future?"
→ Looking forward
→ Predicting outcomes
→ Understanding what will happen

DIFFERENT QUESTIONS!
Both use ML, but different goals

TODAY: We focus on ATTRIBUTION
```

**Presenter Notes:**
- Common confusion
- Clarify the difference
- **Timing:** 11:40-11:42

---

## Slide 49: Correlation vs. Incrementality

```
📈 CORRELATION VS. INCREMENTALITY

CORRELATION:
"Customers who see Facebook ads convert more"
→ But does Facebook CAUSE conversions?
→ Or do high-intent customers see more ads?

INCREMENTALITY:
"What additional conversions happen BECAUSE 
 of Facebook ads?"
→ Causal question
→ Requires experimentation (A/B tests)

ATTRIBUTION CHALLENGE:
Most models show correlation, not causation

GOLD STANDARD: Incrementality testing
(But expensive and time-consuming)
```

**Presenter Notes:**
- Deep concept
- Attribution ≠ causation
- **Timing:** 11:42-11:45

---

# SECTION 5: PRACTICAL IMPLICATIONS & STRATEGY

---

## Slide 50: Section Title

```
═══════════════════════════════════════

    BLOCK 5
    PRACTICAL IMPLICATIONS
    & STRATEGY

═══════════════════════════════════════
```

**Presenter Notes:**
- Final theory section
- Bring it all together
- **Timing:** 11:45

---

## Slide 51: Budget Reallocation Impact

```
💰 HOW ATTRIBUTION AFFECTS BUDGETS

SCENARIO: $100K monthly marketing budget

LAST-CLICK ATTRIBUTION SHOWS:
• Google Ads: 70% of conversions → $70K budget
• Social Media: 10% of conversions → $10K budget
• Email: 20% of conversions → $20K budget

POSITION-BASED ATTRIBUTION SHOWS:
• Google Ads: 40% of credit → $40K budget
• Social Media: 35% of credit → $35K budget
• Email: 25% of credit → $25K budget

DIFFERENCE: $30K budget shift!

REAL IMPACT: Millions of dollars in large companies
```

**Presenter Notes:**
- Attribution = budget decisions
- Real money at stake
- **Timing:** 11:45-11:47

---

## Slide 52: Channel ROI Distortion

```
📊 ROI DISTORTION EXAMPLE

CHANNEL: Instagram Ads

LAST-CLICK ROI:
• Spend: $10,000
• Last-click conversions: 50
• Revenue: $5,000
• ROI: -50% (LOOKS TERRIBLE!)

POSITION-BASED ROI:
• Spend: $10,000
• Attributed conversions: 200
• Revenue: $20,000
• ROI: +100% (LOOKS GREAT!)

SAME CHANNEL, DIFFERENT STORY!

DANGER: Wrong attribution = killing profitable channels
```

**Presenter Notes:**
- ROI depends on attribution
- "Don't kill your best channels!"
- **Timing:** 11:47-11:49

---

## Slide 53: Privacy Challenges

```
🔒 THE PRIVACY PROBLEM

CHALLENGES:
• Cookie deprecation (Chrome 2024)
• iOS App Tracking Transparency
• GDPR/CCPA restrictions
• Users blocking trackers

IMPACT ON ATTRIBUTION:
❌ Can't track cross-device
❌ Can't track cross-site
❌ Missing touchpoints
❌ Incomplete journeys

SOLUTIONS:
• First-party data (logins)
• Server-side tracking
• Probabilistic matching
• Aggregate reporting
• Marketing Mix Modeling (MMM)

REALITY: Attribution is getting harder
```

**Presenter Notes:**
- Major industry challenge
- Privacy vs. measurement
- **Timing:** 11:49-11:51

---

## Slide 54: Attribution in GA4

```
📊 GOOGLE ANALYTICS 4 ATTRIBUTION

GA4 OFFERS:
• Last Click (default)
• First Click
• Linear
• Position-Based
• Data-Driven (if enough data)

HOW TO ACCESS:
Advertising → Attribution → Model Comparison

REQUIREMENTS FOR DATA-DRIVEN:
• 400+ conversions per month
• 15,000+ clicks per month
• Sufficient data volume

TIP: Compare models side-by-side in GA4!

DEMO: (Show GA4 attribution interface)
```

**Presenter Notes:**
- Practical tool
- Show actual GA4 if possible
- **Timing:** 11:51-11:53

---

## Slide 55: Multi-Touch Attribution vs. MMM

```
🔬 MTA VS. MARKETING MIX MODELING

MULTI-TOUCH ATTRIBUTION (MTA):
• User-level tracking
• Digital channels
• Short-term (days/weeks)
• Requires tracking
• Answers: "Which touchpoints?"

MARKETING MIX MODELING (MMM):
• Aggregate data
• All channels (TV, radio, digital)
• Long-term (months/years)
• No tracking needed
• Answers: "Which channels overall?"

WHEN TO USE EACH:
MTA: Digital-first, user-level optimization
MMM: Multi-channel, privacy-friendly, strategic

TREND: Moving toward MMM due to privacy
```

**Presenter Notes:**
- Two different approaches
- MMM making comeback
- **Timing:** 11:53-11:55

---

## Slide 56: Which Model Should You Use?

```
🤔 CHOOSING AN ATTRIBUTION MODEL

QUESTIONS TO ASK:

1. WHAT'S YOUR GOAL?
   • Awareness → First-Touch
   • Conversion → Last-Touch
   • Full journey → Linear or Position-Based

2. WHAT'S YOUR SALES CYCLE?
   • Short → Last-Touch or Time-Decay
   • Long → Position-Based or Data-Driven

3. HOW MUCH DATA DO YOU HAVE?
   • Limited → Rule-Based
   • Lots → Data-Driven

4. WHAT'S YOUR TECHNICAL CAPABILITY?
   • Basic → Simple models
   • Advanced → Markov/Shapley

5. WHAT'S YOUR INDUSTRY STANDARD?
   • B2C E-commerce → Time-Decay
   • B2B SaaS → Position-Based
```

**Presenter Notes:**
- No one right answer
- Context matters
- **Timing:** 11:55-11:57

---

## Slide 57: Practical Recommendations

```
✅ ATTRIBUTION BEST PRACTICES

1. START SIMPLE
   Begin with Last-Click, then Linear

2. COMPARE MODELS
   Run multiple models side-by-side

3. ALIGN WITH GOALS
   Choose model that matches objectives

4. EDUCATE STAKEHOLDERS
   Explain why attribution matters

5. TEST AND ITERATE
   Try different models, measure impact

6. DON'T OVER-OPTIMIZE
   Attribution is imperfect - use judgment

7. COMBINE WITH OTHER DATA
   Surveys, incrementality tests, qualitative feedback

"All models are wrong, but some are useful"
```

**Presenter Notes:**
- Practical advice
- Iterative approach
- **Timing:** 11:57-11:59

---

## Slide 58: Morning Wrap-Up

```
🎯 MORNING SESSION SUMMARY

WE COVERED:
✅ The attribution problem (last-click is misleading)
✅ Customer journey concepts (touchpoints, conversions)
✅ 5 Rule-Based Models (First, Last, Linear, Time-Decay, Position)
✅ Data-Driven Attribution (Markov, Shapley)
✅ Practical implications (budgets, ROI, privacy)

KEY TAKEAWAY:
Attribution is about fairly distributing credit 
across the customer journey to make better 
marketing decisions

NEXT: Lunch, then Python implementation!
```

**Presenter Notes:**
- Recap morning
- Preview afternoon
- **Timing:** 11:59-12:00

---

## Slide 59: Lunch Break

```
🍽️ LUNCH BREAK

90-MINUTE BREAK

Lunch: 12:00 PM - 1:30 PM

AFTERNOON SESSION:
• Implement attribution models in Python
• Work with real campaign data
• Compare model outputs
• Calculate attribution weights

Bring your laptops charged!
See you at 1:30 PM sharp!
```

**Presenter Notes:**
- Dismiss for lunch
- Remind about afternoon hands-on
- **Timing:** 12:00 PM

---

# AFTERNOON PREVIEW

---

## Slide 60: Afternoon Overview

```
💻 AFTERNOON: PYTHON IMPLEMENTATION

WHAT WE'LL BUILD:

1. LOAD CAMPAIGN DATA
   Multi-channel customer journey data

2. IMPLEMENT 5 ATTRIBUTION MODELS
   • First-Touch
   • Last-Touch
   • Linear
   • Time-Decay
   • Position-Based

3. COMPARE RESULTS
   See how models differ

4. CALCULATE CHANNEL ROI
   Based on different attributions

5. VISUALIZE RESULTS
   Charts and comparisons

GOAL: Working attribution calculator!
```

**Presenter Notes:**
- Exciting hands-on work
- Practical skills
- **Timing:** 1:30 PM (afternoon start)

---

## Slide 61: Key Concepts Review

```
📚 QUICK REVIEW BEFORE CODING

REMEMBER:
• Touchpoint = One interaction
• Journey = Sequence of touchpoints
• Conversion = Desired action
• Attribution = Assigning credit

MODELS:
• First-Touch: 100% to first
• Last-Touch: 100% to last
• Linear: Equal to all
• Time-Decay: More to recent
• Position-Based: 40/20/40

READY TO CODE? Let's go!
```

**Presenter Notes:**
- Quick refresher
- Transition to hands-on
- **Timing:** 1:30-1:32 PM

---

## Slide 62: Discussion Questions

```
💭 FINAL DISCUSSION QUESTIONS

Before we code, discuss with your neighbor:

1. Which attribution model do you think is 
   most fair? Why?

2. If you were a social media manager, which 
   model would you use to report to your boss?

3. How might attribution change your marketing 
   strategy?

4. What questions do you still have about 
   attribution?

(3 minutes, then we'll share)
```

**Presenter Notes:**
- Engage before hands-on
- Surface questions
- **Timing:** 1:32-1:35 PM

---

## Slide 63: Transition to Hands-On

```
🚀 LET'S BUILD!

NEXT STEPS:
1. Open Jupyter Notebook / Python IDE
2. Load the attribution dataset
3. Follow along with exercises
4. Ask questions anytime!

FILES YOU'LL NEED:
• customer_journeys.csv
• attribution_functions.py (starter code)
• exercises.md (instructions)

INSTRUCTOR WILL DEMO FIRST,
THEN YOU'LL PRACTICE!

Ready? Let's code! 💻
```

**Presenter Notes:**
- Transition to practical work
- Check everyone has files
- **Timing:** 1:35 PM

---

## Slide 64: End of Lecture Slides

```
═══════════════════════════════════════

    END OF LECTURE SLIDES
    
    Continue with:
    • Hands-On Exercises
    • Python Implementation
    • Group Activities
    
    (See activity-guide.md and exercises.md)

═══════════════════════════════════════
```

**Presenter Notes:**
- Lecture portion complete
- Switch to hands-on materials
- **Timing:** End of slides

---

## 📝 Instructor Notes Summary

**Total Slides:** 64
**Lecture Duration:** ~2 hours (10:00 AM - 12:00 PM)
**Format:** Theory-heavy morning, practice-heavy afternoon

**Key Teaching Points:**
- Start with the problem (why attribution matters)
- Build from simple to complex (rule-based → data-driven)
- Use consistent examples throughout
- Interactive elements keep engagement high
- Connect to real business decisions

**Materials Needed:**
- These slides (PowerPoint/PDF)
- Whiteboard for drawings
- GA4 demo account (optional)
- Afternoon: Python environment, datasets

**Common Student Questions:**
1. "Which model is best?" → Depends on goals
2. "Is data-driven always better?" → Not always (needs data)
3. "How does this work with privacy?" → Challenging, evolving
4. "Can we combine models?" → Yes, advanced topic

**Timing Tips:**
- Allow flexibility for discussions
- Can skip some examples if running behind
- Break is crucial at 11:15
- Afternoon is separate (hands-on focus)

---

**End of Lecture Slides Document**
