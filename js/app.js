Vue.createApp({
  data() {
    return {
      name: '',
      title: '',
      location: '',
      jobs: [],
      skills: []
    };
  },
  methods: {
    days_since(start_date) {
      const start = new Date(start_date);
      const today = new Date();

      // Compare calendar dates, ignoring the time of day.
      start.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return Math.floor((today - start) / 86_400_000);
    },
    get_end_date(job) {
      if (job.end_date == "Present") {
        return this.days_since(job.start_date) + ' days';
      }
      return job.end_date;
    },
    get_level_label(level) {
      if (level < 25) return "Beginner";
      if (level < 50) return "Developing";
      if (level < 75) return "Proficient";
      return "Advanced";
    },
    get_skill_level(skill_name) {
      const skill = this.skills.find(
        skill => skill.name === skill_name
      );
      return skill ? skill.level : 0;
    }
  },

  async mounted() {
    try {
      const response = await fetch('./portfolio.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const portfolio = await response.json();
      this.name = portfolio.name;
      this.title = portfolio.title;
      this.location = portfolio.location;
      this.jobs = portfolio.work_experience;
      this.skills = portfolio.skills;
      this.education = portfolio.education;
    } catch (error) {
      console.error('Could not load portfolio data:', error);
    }
  }
}).mount('#app');
