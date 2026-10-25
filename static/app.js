/**
 * TechZone AI Career Navigator - Modern SaaS Frontend Architecture
 * Pure vanilla JavaScript with zero external dependencies
 */

(function () {
  'use strict';

  // ==========================================
  // 1. OFFICIAL CATALOGUE DATA (from courses.csv)
  // ==========================================
  const COURSE_CATALOGUE = [
    {
      course_id: "COURSE-01",
      course_name: "Data Analytics with Gen AI",
      category: "data",
      description: "Turn raw data into clear business insights with analytics workflows and generative AI support.",
      skills_taught: ["SQL", "Python", "Data Analysis", "Data Visualization", "Generative AI"],
      related_careers: ["CA-01", "CA-02", "CA-14"],
      prerequisites: ["Basic Excel", "Curiosity about data"],
      duration: "6-8 weeks",
      url: "https://www.techzoneacademy.in/course/data-analytics-gen-ai"
    },
    {
      course_id: "COURSE-02",
      course_name: "Data Science with Gen AI",
      category: "data",
      description: "Build a practical foundation in statistics, experimentation, and modern AI-assisted data science.",
      skills_taught: ["Python", "Statistics", "Machine Learning", "Data Analysis", "Generative AI"],
      related_careers: ["CA-03", "CA-04", "CA-01"],
      prerequisites: ["Python basics", "Analytical mindset"],
      duration: "8-10 weeks",
      url: "https://www.techzoneacademy.in/course/data-science-gen-ai"
    },
    {
      course_id: "COURSE-03",
      course_name: "AIML Engineering with Gen AI",
      category: "ai",
      description: "Design, train, and deploy AI systems using ML workflows, evaluation, and iterative model improvement.",
      skills_taught: ["Python", "Machine Learning", "Deep Learning", "Model Evaluation", "Generative AI"],
      related_careers: ["CA-04", "CA-05", "CA-12"],
      prerequisites: ["Python proficiency", "Linear algebra basics"],
      duration: "10-12 weeks",
      url: "https://www.techzoneacademy.in/course/aiml-engineering"
    },
    {
      course_id: "COURSE-04",
      course_name: "Gen AI Engineering",
      category: "ai",
      description: "Prototype, optimize, and productize generative AI applications with prompts, RAG, and evaluation loops.",
      skills_taught: ["Generative AI", "Prompt Design", "Python", "AI Product Thinking", "LLM Evaluation"],
      related_careers: ["CA-05", "CA-06", "CA-14"],
      prerequisites: ["Python basics", "AI curiosity"],
      duration: "8-10 weeks",
      url: "https://www.techzoneacademy.in/course/gen-ai-engineering"
    },
    {
      course_id: "COURSE-05",
      course_name: "Data Engineering with Gen AI",
      category: "data",
      description: "Build pipelines, data models, and reliable data systems that power insights and AI use cases.",
      skills_taught: ["Python", "SQL", "Data Engineering", "Cloud Platforms", "Generative AI"],
      related_careers: ["CA-07", "CA-12", "CA-03"],
      prerequisites: ["SQL basics", "Python basics"],
      duration: "8-10 weeks",
      url: "https://www.techzoneacademy.in/courses#ai-integrated"
    },
    {
      course_id: "COURSE-06",
      course_name: "Full Stack Vibe Coding",
      category: "web",
      description: "Create user-facing products and internal tools with modern frontend and backend engineering practices.",
      skills_taught: ["Full-Stack Development", "Python", "JavaScript", "Problem Solving", "Product Thinking"],
      related_careers: ["CA-08", "CA-09", "CA-14"],
      prerequisites: ["Comfort with logic and web basics"],
      duration: "10-12 weeks",
      url: "https://www.techzoneacademy.in/courses#ai-integrated"
    },
    {
      course_id: "COURSE-07",
      course_name: "Digital Marketing with AI",
      category: "growth",
      description: "Use data, automation, and AI to understand growth channels, optimize campaigns, and analyze customer journeys.",
      skills_taught: ["Digital Marketing", "Communication", "Data Analysis", "Business Analysis", "AI workflows"],
      related_careers: ["CA-15", "CA-02", "CA-14"],
      prerequisites: ["Basic marketing interest", "Comfort with spreadsheets"],
      duration: "6-8 weeks",
      url: "https://www.techzoneacademy.in/courses#ai-integrated"
    },
    {
      course_id: "COURSE-08",
      course_name: "Cloud Computing & DevOps (AWS & Azure)",
      category: "cloud",
      description: "Learn cloud services, deployment pipelines, and operational reliability for modern product teams.",
      skills_taught: ["Cloud Platforms", "DevOps", "Linux", "Automation", "Problem Solving"],
      related_careers: ["CA-10", "CA-11", "CA-12"],
      prerequisites: ["Basic networking", "Comfort with command line"],
      duration: "10-12 weeks",
      url: "https://www.techzoneacademy.in/courses#ai-integrated"
    },
    {
      course_id: "COURSE-09",
      course_name: "Cyber Security with AI",
      category: "cloud",
      description: "Understand cyber threats, secure systems, and apply AI-supported detection workflows in practice.",
      skills_taught: ["Cybersecurity", "Problem Solving", "Networking", "Threat Analysis", "Generative AI"],
      related_careers: ["CA-12", "CA-11", "CA-15"],
      prerequisites: ["Basic networking", "Curiosity about security"],
      duration: "8-10 weeks",
      url: "https://www.techzoneacademy.in/courses#ai-integrated"
    },
    {
      course_id: "COURSE-10",
      course_name: "AI-Product Management",
      category: "growth",
      description: "Bridge product strategy, user insight, and AI execution for impactful roadmap decisions.",
      skills_taught: ["Product Management", "Communication", "Business Analysis", "AI Product Thinking", "Stakeholder Alignment"],
      related_careers: ["CA-14", "CA-02", "CA-08"],
      prerequisites: ["Communication and planning interest"],
      duration: "6-8 weeks",
      url: "https://www.techzoneacademy.in/courses#ai-integrated"
    },
    {
      course_id: "COURSE-11",
      course_name: "AI Essentials",
      category: "ai",
      description: "Get a practical introduction to AI concepts, workflows, and responsible use across business and technical roles.",
      skills_taught: ["Generative AI", "Problem Solving", "Communication", "Python", "AI Product Thinking"],
      related_careers: ["CA-14", "CA-03", "CA-05"],
      prerequisites: ["No formal prerequisites"],
      duration: "4-6 weeks",
      url: "https://www.techzoneacademy.in/courses#ai-integrated"
    },
    {
      course_id: "COURSE-12",
      course_name: "Python Developer with Django",
      category: "web",
      description: "Build backend systems, APIs, and web applications using Python and Django best practices.",
      skills_taught: ["Python", "Full-Stack Development", "API Design", "Problem Solving", "Product Thinking"],
      related_careers: ["CA-08", "CA-09", "CA-03"],
      prerequisites: ["Basic Python", "Web fundamentals"],
      duration: "8-10 weeks",
      url: "https://www.techzoneacademy.in/courses#ai-integrated"
    },
    {
      course_id: "COURSE-13",
      course_name: "MLOPS",
      category: "ai",
      description: "Operationalize machine learning pipelines, deployment, monitoring, and governance in production settings.",
      skills_taught: ["Machine Learning", "Cloud Platforms", "DevOps", "Model Monitoring", "Python"],
      related_careers: ["CA-12", "CA-04", "CA-05"],
      prerequisites: ["Machine learning basics", "Python comfort"],
      duration: "8-10 weeks",
      url: "https://www.techzoneacademy.in/courses#ai-integrated"
    }
  ];

  const LEVEL_LABELS = ["Unset", "Novice", "Familiar", "Competent", "Advanced", "Expert"];

  const STEP_TITLES = {
    1: "Step 1 of 4: Profile & Career Aspiration",
    2: "Step 2 of 4: Technical & Core Competencies",
    3: "Step 3 of 4: Industry Interests & Topics",
    4: "Step 4 of 4: Profile Review & Confirmation"
  };

  // Cached recommendation data for print/download
  let lastRecommendationData = null;

  // ==========================================
  // 2. POINTER-FOLLOWING GLOW
  // ==========================================
  function initPointerGlow() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouch) return;

    const cards = document.querySelectorAll('.glow-card, .career-card-primary, .hero-visual-card');

    cards.forEach((card) => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.setProperty('--mouse-x', '-500px');
        card.style.setProperty('--mouse-y', '-500px');
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        window.requestAnimationFrame(() => {
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
      });
    });
  }

  // ==========================================
  // 3. NAVIGATION & MOBILE DRAWER
  // ==========================================
  function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const backToTopBtn = document.getElementById('back-to-top');

    function closeDrawer() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.remove('open');
      if (mobileBackdrop) mobileBackdrop.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function openDrawer() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.add('open');
      if (mobileBackdrop) mobileBackdrop.classList.add('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    if (menuToggle && mobileDrawer) {
      menuToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeDrawer);
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close on clicking mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    // Back to top button
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ==========================================
  // 4. ASSESSMENT STEPPER WIZARD (4 STEPS)
  // ==========================================
  let currentStep = 1;
  const totalSteps = 4;

  function initWizard() {
    const stepNodes = document.querySelectorAll('.step-node');
    const formSteps = document.querySelectorAll('.form-step');
    const stepperFill = document.getElementById('stepper-fill');
    const stepIndicator = document.getElementById('stepper-step-indicator');
    const nextBtn = document.getElementById('wizard-next-btn');
    const backBtn = document.getElementById('wizard-back-btn');
    const submitBtn = document.getElementById('wizard-submit-btn');
    const errorPanel = document.getElementById('form-error-panel');

    function showError(msg) {
      if (!errorPanel) return;
      errorPanel.textContent = msg;
      errorPanel.classList.add('visible');
    }

    function clearError() {
      if (!errorPanel) return;
      errorPanel.textContent = '';
      errorPanel.classList.remove('visible');
    }

    function validateStep(step) {
      clearError();
      if (step === 1) {
        const goal = document.getElementById('career_goal');
        if (!goal || !goal.value) {
          showError('Please choose a target career aspiration before proceeding.');
          return false;
        }
      } else if (step === 3) {
        const checkedInterests = document.querySelectorAll('.interest-checkbox:checked');
        const checkedTopics = document.querySelectorAll('.topic-checkbox:checked');
        if (checkedInterests.length === 0 && checkedTopics.length === 0) {
          showError('Please select at least one domain interest or learning topic before proceeding to review.');
          return false;
        }
      }
      return true;
    }

    function populateStep4Review() {
      // 1. Candidate Info
      const nameInput = document.getElementById('student_name');
      const reviewName = document.getElementById('review-name');
      if (reviewName) {
        reviewName.textContent = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Candidate (Self-Evaluation)';
      }

      const levelRadio = document.querySelector('.level-radio-input:checked');
      const reviewLevel = document.getElementById('review-level');
      if (reviewLevel) {
        reviewLevel.textContent = levelRadio ? levelRadio.value : 'Intermediate';
      }

      const goalSelect = document.getElementById('career_goal');
      const reviewGoal = document.getElementById('review-goal');
      if (reviewGoal) {
        reviewGoal.textContent = goalSelect ? goalSelect.value : 'AI & ML';
      }

      // 2. Strengths and Emerging Skills
      const strengthsWrap = document.getElementById('review-strengths-pills');
      const emergingText = document.getElementById('review-emerging-count');
      const sliders = document.querySelectorAll('.range-input[data-skill]');
      const strengths = [];
      let emergingCount = 0;

      sliders.forEach((slider) => {
        const val = Number(slider.value);
        const skill = slider.dataset.skill;
        if (val >= 3) {
          strengths.push({ skill, val });
        } else if (val > 0) {
          emergingCount++;
        }
      });

      if (strengthsWrap) {
        if (strengths.length > 0) {
          strengthsWrap.innerHTML = strengths.map((s) => `
            <span class="review-pill strength">${s.skill} (${s.val}/5)</span>
          `).join('');
        } else {
          strengthsWrap.innerHTML = '<span class="review-meta-muted">No competencies &ge; 3.0 set (all paths open)</span>';
        }
      }

      if (emergingText) {
        emergingText.textContent = `${emergingCount} competencies rated 1-2 / 5 (growth areas)`;
      }

      // 3. Interests & Topics
      const interestsWrap = document.getElementById('review-interests-pills');
      const chosenInterests = [];
      document.querySelectorAll('.interest-checkbox:checked').forEach((box) => {
        chosenInterests.push(box.value);
      });
      document.querySelectorAll('.topic-checkbox:checked').forEach((box) => {
        chosenInterests.push(box.value);
      });

      if (interestsWrap) {
        if (chosenInterests.length > 0) {
          interestsWrap.innerHTML = chosenInterests.map((item) => `
            <span class="review-pill">${item}</span>
          `).join('');
        } else {
          interestsWrap.innerHTML = '<span class="review-meta-muted">None selected</span>';
        }
      }

      // 4. Hook up review jump buttons
      document.querySelectorAll('.review-jump-btn').forEach((btn) => {
        btn.onclick = () => {
          const jumpStep = Number(btn.dataset.jump);
          if (jumpStep >= 1 && jumpStep <= 3) {
            updateStep(jumpStep);
          }
        };
      });
    }

    function updateStep(step) {
      currentStep = step;
      clearError();

      // If entering review step, build live summary
      if (step === 4) {
        populateStep4Review();
      }

      // Update progress fill
      if (stepperFill) {
        const pct = ((step - 1) / (totalSteps - 1)) * 100;
        stepperFill.style.width = `${pct}%`;
      }

      // Update text indicator
      if (stepIndicator && STEP_TITLES[step]) {
        stepIndicator.textContent = STEP_TITLES[step];
      }

      // Update stepper tab nodes
      stepNodes.forEach((node) => {
        const nodeStep = Number(node.dataset.step);
        node.classList.remove('active', 'completed');
        if (nodeStep === step) {
          node.classList.add('active');
          node.setAttribute('aria-selected', 'true');
        } else if (nodeStep < step) {
          node.classList.add('completed');
          node.setAttribute('aria-selected', 'false');
        } else {
          node.setAttribute('aria-selected', 'false');
        }
      });

      // Update form step panels
      formSteps.forEach((fs) => {
        const fsStep = Number(fs.dataset.step);
        if (fsStep === step) {
          fs.classList.add('active');
        } else {
          fs.classList.remove('active');
        }
      });

      // Update button visibility and states
      if (backBtn) {
        backBtn.disabled = step === 1;
      }
      if (nextBtn && submitBtn) {
        if (step === totalSteps) {
          nextBtn.style.display = 'none';
          submitBtn.style.display = 'inline-flex';
        } else {
          nextBtn.style.display = 'inline-flex';
          submitBtn.style.display = 'none';
        }
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!validateStep(currentStep)) return;
        if (currentStep < totalSteps) {
          updateStep(currentStep + 1);
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          updateStep(currentStep - 1);
        }
      });
    }

    // Direct click on step nodes with validation safeguard
    stepNodes.forEach((node) => {
      node.addEventListener('click', () => {
        const targetStep = Number(node.dataset.step);
        if (targetStep > currentStep) {
          if (!validateStep(currentStep)) return;
        }
        updateStep(targetStep);
      });
    });

    // Initialize step 1
    updateStep(1);
  }

  // ==========================================
  // 5. SLIDERS & SKILL PRESETS
  // ==========================================
  function initSliders() {
    const sliders = document.querySelectorAll('.range-input');

    function updateSliderVisual(slider) {
      const val = Number(slider.value);
      const min = Number(slider.min) || 0;
      const max = Number(slider.max) || 5;
      const pct = ((val - min) / (max - min)) * 100;
      slider.style.setProperty('--fill-pct', `${pct}%`);

      const card = slider.closest('.slider-card');
      if (card) {
        const numBadge = card.querySelector('.slider-num-badge');
        const levelText = card.querySelector('.slider-level-text');
        if (numBadge) numBadge.textContent = String(val);
        if (levelText) levelText.textContent = LEVEL_LABELS[val] || '';
      }
    }

    sliders.forEach((slider) => {
      slider.addEventListener('input', () => updateSliderVisual(slider));
      updateSliderVisual(slider);
    });

    // Skill category filtering
    const filterBtns = document.querySelectorAll('.filter-tab-btn');
    const sliderCards = document.querySelectorAll('.slider-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.skillCat;
        sliderCards.forEach((card) => {
          if (cat === 'all' || card.dataset.skillCat === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Skill Presets
    const presets = {
      ai: {
        Python: 4,
        "Machine Learning": 4,
        "Deep Learning": 3,
        "Generative AI": 4,
        "Data Analysis": 3,
        SQL: 3,
        "Problem Solving": 4,
        Communication: 3
      },
      data: {
        SQL: 5,
        "Data Analysis": 5,
        Python: 4,
        "Business Analysis": 4,
        "Data Engineering": 3,
        "Problem Solving": 4,
        Communication: 4
      },
      fullstack: {
        "Full-Stack Development": 4,
        Python: 4,
        "Cloud Platforms": 3,
        DevOps: 3,
        "Problem Solving": 4,
        Cybersecurity: 2
      },
      reset: {}
    };

    document.querySelectorAll('.preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const presetKey = btn.dataset.preset;
        const targetMap = presets[presetKey] || {};

        sliders.forEach((slider) => {
          const skillName = slider.dataset.skill;
          const assignedVal = targetMap[skillName] !== undefined ? targetMap[skillName] : 0;
          slider.value = String(assignedVal);
          updateSliderVisual(slider);
        });
      });
    });
  }

  // ==========================================
  // 6. FORM SUBMISSION & RECOMMENDATION ENGINE
  // ==========================================
  function initAssessmentForm() {
    const form = document.getElementById('career-form');
    const submitBtn = document.getElementById('wizard-submit-btn');
    const errorPanel = document.getElementById('form-error-panel');
    const resultsSection = document.getElementById('results-section');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (errorPanel) {
        errorPanel.classList.remove('visible');
        errorPanel.textContent = '';
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        const submitText = submitBtn.querySelector('.btn-text');
        if (submitText) submitText.textContent = 'Calculating Compatible Tracks...';
      }

      // Collect skills
      const skills = {};
      document.querySelectorAll('.range-input[data-skill]').forEach((slider) => {
        skills[slider.dataset.skill] = Number(slider.value);
      });

      // Collect interests
      const interests = [];
      document.querySelectorAll('.interest-checkbox:checked').forEach((box) => {
        interests.push(box.value);
      });

      // Collect learning topics
      const topics = [];
      document.querySelectorAll('.topic-checkbox:checked').forEach((box) => {
        topics.push(box.value);
      });

      // Learning level
      const levelRadio = document.querySelector('.level-radio-input:checked');
      const learningLevel = levelRadio ? levelRadio.value : 'Intermediate';

      // Career goal
      const goalSelect = document.getElementById('career_goal');
      const careerGoal = goalSelect ? goalSelect.value : 'AI & ML';

      // Student name
      const nameInput = document.getElementById('student_name');
      const studentName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Student';

      const payload = {
        student_name: studentName,
        current_learning_level: learningLevel,
        career_goals: [careerGoal],
        skills: skills,
        interests: interests,
        learning_topics: topics
      };

      try {
        const response = await fetch('/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate recommendations. Please try again.');
        }

        lastRecommendationData = data;
        renderRecommendations(data);

        if (resultsSection) {
          resultsSection.classList.remove('hidden');
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (err) {
        if (errorPanel) {
          errorPanel.textContent = err.message;
          errorPanel.classList.add('visible');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
          const submitText = submitBtn.querySelector('.btn-text');
          if (submitText) submitText.textContent = 'Generate Verified Career Matches';
        }
      }
    });
  }

  function getCourseUrl(courseId, courseName) {
    const found = COURSE_CATALOGUE.find((c) => c.course_id === courseId || c.course_name.toLowerCase() === (courseName || '').toLowerCase());
    return found ? found.url : 'https://www.techzoneacademy.in/courses#ai-integrated';
  }

  function renderRecommendations(data) {
    const studentSummary = document.getElementById('results-student-name');
    const levelBadge = document.getElementById('results-level-badge');
    const primaryContainer = document.getElementById('primary-career-container');
    const comparisonTableWrap = document.getElementById('comparison-table-wrap');
    const secondaryContainer = document.getElementById('secondary-careers-container');
    const roadmapContainer = document.getElementById('roadmap-steps-container');
    const roadmapRoleName = document.getElementById('roadmap-role-name');

    if (studentSummary) {
      studentSummary.textContent = `${data.student_name || 'Student'}'s Career Recommendations`;
    }
    if (levelBadge) {
      levelBadge.textContent = data.learning_level || 'Intermediate';
    }

    const recs = data.recommendations || [];
    if (recs.length === 0) return;

    // #1 Top Career (Primary Tier)
    const top = recs[0];

    const topMatchedSkillsHtml = (top.skills_match || []).map((s) => `
      <span class="skill-tag matched">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        ${s}
      </span>
    `).join('') || '<span class="skill-tag matched">Foundation Ready</span>';

    const topMissingSkillsHtml = (top.missing_skills || []).map((s, idx) => `
      <span class="skill-tag gap">
        <span class="priority-pill">${idx === 0 ? 'High Priority' : 'Recommended'}</span>
        ${s}
      </span>
    `).join('') || '<span class="skill-tag matched">No Major Gaps</span>';

    const topWhyListHtml = (top.why_it_matches || []).map((item) => `
      <li class="explain-item">${item}</li>
    `).join('');

    const topCoursesHtml = (top.recommended_courses || []).map((c) => {
      const url = getCourseUrl(c.course_id, c.course_name);
      return `
        <a href="${url}" target="_blank" rel="noopener" class="btn-course-link" style="width: auto; padding: 0.4rem 0.85rem; font-size: 0.8rem;">
          ${c.course_name}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      `;
    }).join('') || '<span class="detail-hint">Explore core TechZone curriculum</span>';

    // Circular score calculation
    const scoreVal = top.match_score || 0;
    const dashLength = (scoreVal / 100) * 100;

    if (primaryContainer) {
      primaryContainer.innerHTML = `
        <article class="career-card-primary glow-card" id="top-career-card">
          <div class="card-top-bar">
            <div class="rank-title-block">
              <span class="badge-featured">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Rank #1 &bull; Highest Compatibility
              </span>
              <h3 class="career-heading">${top.career_name}</h3>
              <p class="career-desc">${top.description}</p>
            </div>

            <div class="score-gauge-wrap">
              <div class="circle-chart">
                <svg class="circle-chart-svg" viewBox="0 0 36 36">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="circle-fill" stroke-dasharray="${dashLength}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
                <div class="circle-text">${scoreVal}%</div>
              </div>
              <div class="score-meta">
                <span class="score-title">Match Score</span>
                <span class="score-tier-label">${scoreVal >= 75 ? 'Exceptional Fit' : 'Strong Alignment'}</span>
              </div>
            </div>
          </div>

          <div class="card-details-grid">
            <div class="detail-block">
              <h4 class="detail-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Matching Strengths
              </h4>
              <div class="detail-pill-row">${topMatchedSkillsHtml}</div>
            </div>

            <div class="detail-block">
              <h4 class="detail-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" stroke-width="2.5"><polygon points="12 2 2 22 22 22 12 2"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Skills to Strengthen
              </h4>
              <div class="detail-pill-row">${topMissingSkillsHtml}</div>
            </div>

            <div class="detail-block full-col">
              <h4 class="detail-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                Why this matches your profile
              </h4>
              <ul class="explain-list">${topWhyListHtml}</ul>
            </div>

            <div class="detail-block full-col">
              <h4 class="detail-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                Recommended TechZone Academy Courses
              </h4>
              <div class="detail-pill-row">${topCoursesHtml}</div>
            </div>
          </div>
        </article>
      `;
    }

    // ==========================================
    // TOP 3 CAREER COMPARISON MATRIX
    // ==========================================
    if (comparisonTableWrap) {
      const top3 = recs.slice(0, 3);
      const rowsHtml = top3.map((career, idx) => {
        const rank = idx + 1;
        const rankBadgeClass = `comp-rank-${rank}`;
        const score = career.match_score || 0;
        const tier = score >= 75 ? 'Exceptional Fit' : (score >= 50 ? 'Strong Alignment' : 'Emerging Path');

        const strengthsPills = (career.skills_match || []).slice(0, 3).map((s) => `
          <span class="skill-tag matched" style="font-size: 0.725rem; padding: 0.15rem 0.45rem;">${s}</span>
        `).join('') || '<span class="review-meta-muted">Core Foundation</span>';

        const gapsPills = (career.missing_skills || []).slice(0, 2).map((s) => `
          <span class="skill-tag gap" style="font-size: 0.725rem; padding: 0.15rem 0.45rem;">${s}</span>
        `).join('') || '<span class="review-meta-muted">Zero Gaps</span>';

        const firstCourse = (career.recommended_courses && career.recommended_courses[0]) ? career.recommended_courses[0] : null;
        const courseLink = firstCourse ? `
          <a href="${getCourseUrl(firstCourse.course_id, firstCourse.course_name)}" target="_blank" rel="noopener" class="comp-course-pill">
            ${firstCourse.course_name}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        ` : '<span class="review-meta-muted">Consult Advisor</span>';

        return `
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="comp-rank-badge ${rankBadgeClass}">Rank #${rank}</span>
                <div>
                  <strong style="color: var(--text); font-size: 0.95rem; display: block;">${career.career_name}</strong>
                  <span style="font-size: 0.775rem; color: var(--muted);">${tier}</span>
                </div>
              </div>
            </td>
            <td>
              <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 800; font-size: 1.05rem; color: ${rank === 1 ? 'var(--cyan)' : 'var(--text)'};">${score}%</span>
                <div class="comp-score-bar">
                  <div class="comp-score-fill" style="width: ${score}%;"></div>
                </div>
              </div>
            </td>
            <td>
              <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                ${strengthsPills}
              </div>
            </td>
            <td>
              <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                ${gapsPills}
              </div>
            </td>
            <td>
              ${courseLink}
            </td>
          </tr>
        `;
      }).join('');

      comparisonTableWrap.innerHTML = `
        <table class="comparison-table" aria-label="Comparison of top 3 career recommendations">
          <thead>
            <tr>
              <th scope="col">Career Pathway</th>
              <th scope="col">Match Score</th>
              <th scope="col">Aligned Strengths</th>
              <th scope="col">Bridgeable Gaps</th>
              <th scope="col">Recommended Fast-Track Course</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      `;
    }

    // Secondary Cards (Ranks #4 - #5)
    if (secondaryContainer) {
      const secondaries = recs.slice(3, 5);
      secondaryContainer.innerHTML = secondaries.map((career, idx) => {
        const rankNum = idx + 4;
        const matched = (career.skills_match || []).slice(0, 3).map((s) => `
          <span class="skill-tag matched" style="font-size: 0.75rem;">${s}</span>
        `).join('');

        const gaps = (career.missing_skills || []).slice(0, 2).map((s) => `
          <span class="skill-tag gap" style="font-size: 0.75rem;">${s}</span>
        `).join('');

        const courses = (career.recommended_courses || []).slice(0, 2).map((c) => {
          const url = getCourseUrl(c.course_id, c.course_name);
          return `
            <a href="${url}" target="_blank" rel="noopener" class="footer-link" style="display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; color: var(--cyan);">
              &bull; ${c.course_name}
            </a>
          `;
        }).join('');

        return `
          <article class="career-card-secondary glow-card">
            <div class="card-sec-head">
              <div class="sec-title-group">
                <span class="sec-rank-badge">Rank #${rankNum}</span>
                <h3>${career.career_name}</h3>
              </div>
              <div class="sec-score-badge">
                ${career.match_score}%
              </div>
            </div>

            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${career.description}</p>

            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--muted); text-transform: uppercase;">Key Strengths</span>
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                ${matched || '<span style="font-size: 0.75rem; color: var(--muted);">Profile Alignment</span>'}
              </div>
            </div>

            ${gaps ? `
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="font-size: 0.75rem; font-weight: 700; color: var(--muted); text-transform: uppercase;">Skill Gaps</span>
                <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">${gaps}</div>
              </div>
            ` : ''}

            <div style="margin-top: auto; padding-top: 0.85rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.35rem;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--muted); text-transform: uppercase;">Direct Course Path</span>
              <div style="display: flex; flex-direction: column; gap: 0.25rem;">${courses}</div>
            </div>
          </article>
        `;
      }).join('');
    }

    // Personalized Roadmap
    if (roadmapContainer) {
      if (roadmapRoleName) {
        roadmapRoleName.textContent = top.career_name;
      }

      const steps = [];
      const courses = top.recommended_courses || [];
      const missing = top.missing_skills || [];

      if (courses.length > 0) {
        steps.push({
          phase: "Phase 1: Foundational Core",
          title: courses[0].course_name,
          desc: courses[0].description,
          url: getCourseUrl(courses[0].course_id, courses[0].course_name),
          focus: missing[0] ? `Bridge gap in ${missing[0]}` : "Core architecture mastery"
        });
      }

      if (courses.length > 1) {
        steps.push({
          phase: "Phase 2: Applied Engineering",
          title: courses[1].course_name,
          desc: courses[1].description,
          url: getCourseUrl(courses[1].course_id, courses[1].course_name),
          focus: missing[1] ? `Deep dive into ${missing[1]}` : "Specialized domain workflows"
        });
      }

      if (courses.length > 2) {
        steps.push({
          phase: "Phase 3: Advanced Capstone",
          title: courses[2].course_name,
          desc: courses[2].description,
          url: getCourseUrl(courses[2].course_id, courses[2].course_name),
          focus: "Production deployment, portfolio capstone and real-world system readiness"
        });
      }

      roadmapContainer.innerHTML = steps.map((st, i) => `
        <div class="roadmap-step-item">
          <div class="roadmap-step-marker">${i + 1}</div>
          <span class="step-phase-tag">${st.phase}</span>
          <div class="step-card">
            <h4 class="step-course-name">${st.title}</h4>
            <p class="step-course-desc">${st.desc}</p>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-top: 0.25rem;">
              <span style="font-size: 0.8rem; color: var(--cyan); font-weight: 600;">Focus: ${st.focus}</span>
              <a href="${st.url}" target="_blank" rel="noopener" class="btn-primary" style="padding: 0.45rem 1rem; font-size: 0.8125rem;">
                View Course
              </a>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Results Action Toolbar Handlers
    const printBtn = document.getElementById('btn-print-report');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
      };
    }

    const downloadBtn = document.getElementById('btn-download-report');
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        exportSummaryReport(data);
      };
    }

    // Re-init pointer glow on new cards
    initPointerGlow();
  }

  // ==========================================
  // 7. EXPORT SUMMARY REPORT (DOWNLOADABLE TXT)
  // ==========================================
  function exportSummaryReport(data) {
    if (!data || !data.recommendations) return;
    const recs = data.recommendations;
    const top = recs[0] || {};
    const candidateName = data.student_name || 'Candidate';
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    let report = `========================================================================\n`;
    report += `TECHZONE ACADEMY - AI CAREER NAVIGATOR REPORT\n`;
    report += `Official Executive Assessment Summary\n`;
    report += `========================================================================\n\n`;
    report += `Candidate Name  : ${candidateName}\n`;
    report += `Learning Level  : ${data.learning_level || 'Intermediate'}\n`;
    report += `Evaluation Date : ${dateStr}\n`;
    report += `Status          : Verified Recommendation Report\n\n`;
    report += `------------------------------------------------------------------------\n`;
    report += `PRIMARY TOP-RANKED CAREER PATHWAY\n`;
    report += `------------------------------------------------------------------------\n`;
    report += `Role Title       : ${top.career_name || 'N/A'}\n`;
    report += `Match Score      : ${top.match_score || 0}% Compatibility\n`;
    report += `Description      : ${top.description || 'N/A'}\n\n`;

    report += `Matching Strengths:\n`;
    (top.skills_match || []).forEach((s) => {
      report += `  + ${s}\n`;
    });

    report += `\nSkills to Strengthen:\n`;
    (top.missing_skills || []).forEach((s) => {
      report += `  - ${s}\n`;
    });

    report += `\nWhy This Matches Your Profile:\n`;
    (top.why_it_matches || []).forEach((why) => {
      report += `  * ${why}\n`;
    });

    report += `\nRecommended TechZone Academy Courses:\n`;
    (top.recommended_courses || []).forEach((c) => {
      report += `  > [${c.course_id}] ${c.course_name} - ${c.description}\n`;
    });

    report += `\n------------------------------------------------------------------------\n`;
    report += `TOP 3 CAREER BENCHMARK COMPARISON\n`;
    report += `------------------------------------------------------------------------\n`;
    recs.slice(0, 3).forEach((r, idx) => {
      report += `Rank #${idx + 1}: ${r.career_name} (${r.match_score}% Match)\n`;
      report += `  Key Strengths : ${(r.skills_match || []).slice(0, 3).join(', ')}\n`;
      report += `  Bridgeable Gap: ${(r.missing_skills || []).slice(0, 2).join(', ')}\n\n`;
    });

    report += `========================================================================\n`;
    report += `Contact TechZone Academy for Batch Advising:\n`;
    report += `Website : https://www.techzoneacademy.in/\n`;
    report += `WhatsApp: +91 63048 72757\n`;
    report += `Location: Lakdikapul, Hyderabad, Telangana\n`;
    report += `========================================================================\n`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TechZone_Career_Plan_${candidateName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ==========================================
  // 8. COURSE CATALOGUE SHOWCASE & FILTER
  // ==========================================
  function initCourseCatalogue() {
    const grid = document.getElementById('courses-grid');
    const searchInput = document.getElementById('course-search');
    const catButtons = document.querySelectorAll('.course-cat-btn');

    if (!grid) return;

    let activeCat = 'all';
    let searchQuery = '';

    function renderCourses() {
      const filtered = COURSE_CATALOGUE.filter((c) => {
        const matchesCat = activeCat === 'all' || c.category === activeCat;
        const matchesSearch = !searchQuery || 
          c.course_name.toLowerCase().includes(searchQuery) ||
          c.description.toLowerCase().includes(searchQuery) ||
          c.skills_taught.some((s) => s.toLowerCase().includes(searchQuery));
        return matchesCat && matchesSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--muted);">
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No courses match your query.</p>
            <button id="reset-course-filter" class="btn-secondary" style="font-size: 0.875rem; padding: 0.5rem 1.25rem;">Clear Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('reset-course-filter');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            activeCat = 'all';
            searchQuery = '';
            if (searchInput) searchInput.value = '';
            catButtons.forEach((b) => b.classList.toggle('active', b.dataset.courseCat === 'all'));
            renderCourses();
          });
        }
        return;
      }

      grid.innerHTML = filtered.map((course) => {
        const skills = course.skills_taught.map((s) => `<span class="course-skill-pill">${s}</span>`).join('');
        const whatsappUrl = `https://api.whatsapp.com/send?phone=916304872757&text=${encodeURIComponent(`Hi TechZone Academy, I am interested in enrolling in the "${course.course_name}" course. Could you please share the upcoming batch schedule and curriculum details?`)}`;

        return `
          <article class="course-card-item glow-card">
            <div class="course-card-body">
              <div class="course-meta-top">
                <div class="course-meta-badges">
                  <span class="course-id-badge">${course.course_id}</span>
                  <span class="verified-tag">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Verified Syllabus
                  </span>
                </div>
                <span class="course-duration-badge">${course.duration}</span>
              </div>
              <h3 class="course-card-title">${course.course_name}</h3>
              <p class="course-card-desc">${course.description}</p>
              <div style="margin-top: 0.5rem;">
                <span style="font-size: 0.725rem; font-weight: 700; color: var(--muted); text-transform: uppercase;">Skills Taught:</span>
                <div class="course-skills-list">${skills}</div>
              </div>
            </div>
            <div class="course-card-footer">
              <div class="course-card-actions">
                <a href="${course.url}" target="_blank" rel="noopener" class="btn-course-link">
                  View Syllabus &amp; Enroll
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
                <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn-whatsapp-enquire" title="Quick WhatsApp Enquiry">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  Enquire
                </a>
              </div>
            </div>
          </article>
        `;
      }).join('');

      initPointerGlow();
    }

    catButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        catButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.dataset.courseCat;
        renderCourses();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderCourses();
      });
    }

    // Initial render
    renderCourses();
  }

  // ==========================================
  // INITIALIZATION ON DOM READY
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initWizard();
    initSliders();
    initAssessmentForm();
    initCourseCatalogue();
    initPointerGlow();
  });
})();
