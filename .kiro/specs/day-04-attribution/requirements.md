# Requirements Document: Day 4 Attribution Course Content

## Introduction

This document specifies the requirements for generating comprehensive Day 4 course content on "Multi-Touch Attribution in Multi-Channel Marketing Campaigns" for the Social Media Analytics course (ITX4513) at Assumption University's SIMBA graduate program. The content must align with existing course structure (days 1-3) and deliver both theoretical knowledge and practical Python implementation skills for attribution modeling.

## Glossary

- **Content_Generator**: The system that creates all course materials including instructor and student resources
- **Attribution_Model**: Mathematical framework for assigning credit to marketing touchpoints
- **Course_Structure**: The standardized folder and file organization used across all course days
- **Lecture_Material**: Instructor-facing content including slides, lesson plans, and activity guides
- **Student_Material**: Learner-facing content including exercises, workbooks, and resources
- **Dataset**: Sample data files used for hands-on Python exercises
- **Morning_Session**: 2-hour lecture period (10:00-12:00) covering theoretical concepts
- **Afternoon_Session**: Hands-on Python implementation period covering practical exercises
- **SMART_Goal**: Specific, Measurable, Achievable, Relevant, Time-bound learning objective

## Requirements

### Requirement 1: Course Structure Compliance

**User Story:** As a course administrator, I want Day 4 content to match the existing course structure, so that students and instructors have a consistent experience across all course days.

#### Acceptance Criteria

1. THE Content_Generator SHALL create a day-04-attribution/ folder with the same structure as day-01-foundations/, day-02-analysis/, and day-03-application/
2. THE Content_Generator SHALL create instructor/ subfolder containing activity-guide.md, lecture-slides.md, lesson-plan.md, and solutions.md
3. THE Content_Generator SHALL create student/ subfolder containing exercises.md, resources.md, and workbook.md
4. THE Content_Generator SHALL create data/ subfolder containing sample datasets for attribution modeling
5. THE Content_Generator SHALL create README.md in the day-04-attribution/ root following the same format as existing day READMEs

### Requirement 2: Morning Session Lecture Content

**User Story:** As an instructor, I want comprehensive 2-hour lecture materials on attribution modeling, so that I can effectively teach theoretical concepts to graduate students.

#### Acceptance Criteria

1. THE Content_Generator SHALL create lecture content covering "The Marketing Attribution Problem" for 20 minutes
2. THE Content_Generator SHALL create lecture content covering "Understanding the Customer Journey" for 25 minutes
3. THE Content_Generator SHALL create lecture content covering "Rule-Based Attribution Models" (First-Touch, Last-Touch, Linear, Time-Decay, Position-Based) for 30 minutes
4. THE Content_Generator SHALL create lecture content covering "Data-Driven Attribution" (Markov chains, Shapley value concepts) for 20 minutes
5. THE Content_Generator SHALL create lecture content covering "Practical Implications & Strategy" for 15 minutes
6. WHEN summing all morning session segments, THE total duration SHALL equal 110 minutes (allowing 10 minutes for transitions and questions)

### Requirement 3: Lecture Slides Generation

**User Story:** As an instructor, I want professionally structured lecture slides, so that I can deliver engaging presentations to graduate students.

#### Acceptance Criteria

1. THE Content_Generator SHALL create approximately 40 lecture slides in lecture-slides.md
2. THE Content_Generator SHALL include title slides for each of the 5 morning session topics
3. THE Content_Generator SHALL include visual examples (described in markdown) for each attribution model type
4. THE Content_Generator SHALL include comparison tables showing differences between attribution models
5. THE Content_Generator SHALL include real-world case study examples demonstrating attribution model applications
6. THE Content_Generator SHALL include discussion prompts on slides to encourage student engagement

### Requirement 4: Lesson Plan Creation

**User Story:** As an instructor, I want a detailed lesson plan with timing and activities, so that I can effectively manage the full-day course delivery.

#### Acceptance Criteria

1. THE Content_Generator SHALL create lesson-plan.md following the same format as day-01-foundations/instructor/lesson-plan.md
2. THE Content_Generator SHALL include minute-by-minute timing for all morning session segments
3. THE Content_Generator SHALL include minute-by-minute timing for all afternoon session activities
4. THE Content_Generator SHALL include teaching tips and common student questions for each section
5. THE Content_Generator SHALL include break times at 11:00-11:15 AM and 2:30-2:45 PM
6. THE Content_Generator SHALL include materials checklist for instructor preparation
7. THE Content_Generator SHALL include learning checkpoints for morning and afternoon sessions

### Requirement 5: Activity Guide Development

**User Story:** As an instructor, I want structured activity instructions, so that I can facilitate hands-on learning exercises effectively.

#### Acceptance Criteria

1. THE Content_Generator SHALL create activity-guide.md with detailed instructions for all afternoon Python exercises
2. THE Content_Generator SHALL include group discussion activities for comparing attribution model outputs
3. THE Content_Generator SHALL include step-by-step instructions for implementing each attribution model in Python
4. THE Content_Generator SHALL include expected outcomes and success criteria for each activity
5. THE Content_Generator SHALL include troubleshooting tips for common Python implementation issues
6. THE Content_Generator SHALL include time allocations for each activity totaling approximately 3 hours

### Requirement 6: Solutions Documentation

**User Story:** As an instructor, I want complete solution code and explanations, so that I can provide accurate guidance and grading.

#### Acceptance Criteria

1. THE Content_Generator SHALL create solutions.md containing working Python code for all exercises
2. THE Content_Generator SHALL include commented code explaining the logic of each attribution model implementation
3. THE Content_Generator SHALL include expected output examples for each exercise
4. THE Content_Generator SHALL include alternative solution approaches where applicable
5. THE Content_Generator SHALL include grading rubrics for student submissions

### Requirement 7: Student Exercise Creation

**User Story:** As a student, I want hands-on Python exercises, so that I can practice implementing attribution models with real data.

#### Acceptance Criteria

1. THE Content_Generator SHALL create exercises.md with progressive difficulty levels from basic to advanced
2. THE Content_Generator SHALL include exercises for implementing First-Touch attribution in Python
3. THE Content_Generator SHALL include exercises for implementing Last-Touch attribution in Python
4. THE Content_Generator SHALL include exercises for implementing Linear attribution in Python
5. THE Content_Generator SHALL include exercises for implementing Time-Decay attribution in Python
6. THE Content_Generator SHALL include exercises for implementing Position-Based attribution in Python
7. THE Content_Generator SHALL include exercises for comparing outputs across different attribution models
8. THE Content_Generator SHALL include exercises for calculating attribution weights for multi-channel campaigns
9. THE Content_Generator SHALL include data analysis exercises using provided sample datasets

### Requirement 8: Student Workbook Development

**User Story:** As a student, I want a structured workbook with note-taking space, so that I can actively engage with lecture content and track my learning.

#### Acceptance Criteria

1. THE Content_Generator SHALL create workbook.md following the same format as existing day workbooks
2. THE Content_Generator SHALL include fill-in-the-blank sections for key attribution concepts
3. THE Content_Generator SHALL include space for students to document their Python code implementations
4. THE Content_Generator SHALL include reflection questions about attribution model selection
5. THE Content_Generator SHALL include tables for comparing attribution model results
6. THE Content_Generator SHALL include self-assessment checklists for learning objectives

### Requirement 9: Student Resources Compilation

**User Story:** As a student, I want curated learning resources, so that I can deepen my understanding beyond class time.

#### Acceptance Criteria

1. THE Content_Generator SHALL create resources.md with links to attribution modeling articles and tutorials
2. THE Content_Generator SHALL include Python library documentation references (pandas, numpy, relevant packages)
3. THE Content_Generator SHALL include academic papers on attribution modeling methodologies
4. THE Content_Generator SHALL include video tutorial recommendations for visual learners
5. THE Content_Generator SHALL include industry case studies demonstrating real-world attribution applications
6. THE Content_Generator SHALL include optional homework assignments for extended practice

### Requirement 10: Sample Dataset Creation

**User Story:** As a student, I want realistic sample datasets, so that I can practice attribution modeling with data that resembles real marketing campaigns.

#### Acceptance Criteria

1. THE Content_Generator SHALL create at least one CSV file in the data/ subfolder containing multi-channel campaign data
2. THE Dataset SHALL include columns for user_id, timestamp, channel, touchpoint_type, and conversion_flag
3. THE Dataset SHALL include at least 1000 rows of sample data representing customer journeys
4. THE Dataset SHALL include multiple marketing channels (social media, email, paid search, organic search, direct)
5. THE Dataset SHALL include both converting and non-converting customer journeys
6. THE Dataset SHALL be structured to support all attribution model implementations in the exercises
7. THE Content_Generator SHALL include a data dictionary explaining all dataset columns

### Requirement 11: README Overview Creation

**User Story:** As an instructor or student, I want a comprehensive README, so that I can quickly understand Day 4 objectives, topics, and deliverables.

#### Acceptance Criteria

1. THE Content_Generator SHALL create README.md following the same structure as day-01-foundations/README.md
2. THE README SHALL include Day 4 learning objectives aligned with course objective #4: "Track multi-channel campaigns using attribution models"
3. THE README SHALL include a detailed timeline showing morning and afternoon session breakdowns
4. THE README SHALL include a list of all topics covered with time allocations
5. THE README SHALL include required tools and software (Python, Jupyter, pandas, numpy)
6. THE README SHALL include a materials checklist for both students and instructors
7. THE README SHALL include success criteria for Day 4 completion
8. THE README SHALL include connection points to previous days (1-3) and preview of future applications

### Requirement 12: Python Code Quality Standards

**User Story:** As a student, I want well-documented Python code examples, so that I can understand implementation details and best practices.

#### Acceptance Criteria

1. WHEN Python code is included in any document, THE Content_Generator SHALL include inline comments explaining logic
2. WHEN Python code is included, THE Content_Generator SHALL follow PEP 8 style guidelines
3. WHEN Python code is included, THE Content_Generator SHALL use descriptive variable names
4. WHEN Python code is included, THE Content_Generator SHALL include docstrings for all functions
5. WHEN Python code is included, THE Content_Generator SHALL include example usage demonstrating function calls
6. WHEN Python code is included, THE Content_Generator SHALL handle edge cases (empty data, single touchpoint journeys)

### Requirement 13: Learning Objective Alignment

**User Story:** As a course administrator, I want Day 4 content to align with course objectives, so that students achieve the intended learning outcomes.

#### Acceptance Criteria

1. THE Content_Generator SHALL explicitly reference course objective #4: "Track multi-channel campaigns using attribution models" in the README
2. THE Content_Generator SHALL create content that enables students to explain the marketing attribution problem
3. THE Content_Generator SHALL create content that enables students to implement at least 3 rule-based attribution models in Python
4. THE Content_Generator SHALL create content that enables students to compare attribution model outputs and select appropriate models
5. THE Content_Generator SHALL create content that enables students to calculate attribution weights for real campaign data
6. THE Content_Generator SHALL include assessment criteria that measure achievement of these learning objectives

### Requirement 14: Graduate-Level Rigor

**User Story:** As a graduate program instructor, I want content with appropriate academic depth, so that it meets SIMBA program standards.

#### Acceptance Criteria

1. THE Content_Generator SHALL include academic references and citations for attribution modeling concepts
2. THE Content_Generator SHALL include discussion of advanced topics (Markov chains, Shapley values) beyond basic models
3. THE Content_Generator SHALL include critical thinking questions about attribution model limitations
4. THE Content_Generator SHALL include case studies requiring analytical reasoning beyond simple implementation
5. THE Content_Generator SHALL include connections to broader marketing analytics theory
6. THE Content_Generator SHALL use professional terminology appropriate for graduate-level study

### Requirement 15: Practical Industry Relevance

**User Story:** As a student, I want content that reflects real-world marketing practices, so that I can apply skills in professional settings.

#### Acceptance Criteria

1. THE Content_Generator SHALL include examples from real companies using attribution modeling
2. THE Content_Generator SHALL discuss practical challenges in implementing attribution models (data quality, channel tracking)
3. THE Content_Generator SHALL include discussion of industry tools (Google Analytics, Adobe Analytics) that use attribution
4. THE Content_Generator SHALL include strategic decision-making scenarios based on attribution insights
5. THE Content_Generator SHALL address common business questions answered by attribution analysis

### Requirement 16: Accessibility and Inclusivity

**User Story:** As a diverse student body, we want accessible content, so that all learners can engage with the material effectively.

#### Acceptance Criteria

1. WHEN creating visual examples in markdown, THE Content_Generator SHALL include text descriptions
2. THE Content_Generator SHALL use clear, jargon-free language with definitions for technical terms
3. THE Content_Generator SHALL provide multiple explanation approaches (visual, mathematical, code-based) for key concepts
4. THE Content_Generator SHALL include scaffolded exercises progressing from simple to complex
5. THE Content_Generator SHALL include extension activities for advanced students

### Requirement 17: Assessment and Feedback Mechanisms

**User Story:** As an instructor, I want built-in assessment tools, so that I can evaluate student understanding and provide feedback.

#### Acceptance Criteria

1. THE Content_Generator SHALL include quick quiz questions for morning session knowledge checks
2. THE Content_Generator SHALL include practical assessment criteria for afternoon Python exercises
3. THE Content_Generator SHALL include rubrics for evaluating code quality and correctness
4. THE Content_Generator SHALL include discussion questions that reveal depth of understanding
5. THE Content_Generator SHALL include self-assessment checklists for students to track their progress

### Requirement 18: Time Management and Pacing

**User Story:** As an instructor, I want realistic time allocations, so that I can complete all content within the scheduled 5-hour course day.

#### Acceptance Criteria

1. THE Content_Generator SHALL allocate exactly 2 hours (120 minutes) for morning lecture session
2. THE Content_Generator SHALL allocate exactly 3 hours (180 minutes) for afternoon hands-on session
3. THE Content_Generator SHALL include two 15-minute breaks in the schedule
4. THE Content_Generator SHALL include buffer time for questions and transitions between activities
5. WHEN summing all timed activities and breaks, THE total SHALL equal 5 hours of instruction plus 1.5 hours lunch break

### Requirement 19: Consistency with Existing Course Materials

**User Story:** As a course administrator, I want consistent formatting and style, so that Day 4 integrates seamlessly with Days 1-3.

#### Acceptance Criteria

1. THE Content_Generator SHALL use the same markdown formatting conventions as existing day materials
2. THE Content_Generator SHALL use the same emoji icons and visual markers as existing day materials
3. THE Content_Generator SHALL use the same section headings and organizational structure as existing day materials
4. THE Content_Generator SHALL use the same tone and writing style as existing day materials
5. THE Content_Generator SHALL reference concepts from Days 1-3 where relevant to show progression

### Requirement 20: Technical Prerequisites and Setup

**User Story:** As a student, I want clear technical requirements, so that I can prepare my environment before class.

#### Acceptance Criteria

1. THE Content_Generator SHALL list all required Python libraries (pandas, numpy, matplotlib, etc.) in the README
2. THE Content_Generator SHALL include installation instructions for required libraries
3. THE Content_Generator SHALL specify Python version requirements
4. THE Content_Generator SHALL include instructions for accessing and loading sample datasets
5. THE Content_Generator SHALL include troubleshooting tips for common setup issues
6. THE Content_Generator SHALL provide alternative options (Google Colab, Jupyter, local Python) for different student setups
