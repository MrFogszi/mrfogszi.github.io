const app = Vue.createApp({
  data() {
    return {
      fancy: true,
      name: '',
      title: '',
      location: '',
      date_of_birth: '',
      linkedin_url: '',
      email: '',
      about: '',
      traits: [],
      languages: [],
      jobs: [],
      skills: [],
      certifications: []
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
    get_date_level(start_date, end_date) {
      start = new Date(start_date);
      if (end_date == "Present") {
        end = new Date();
      }
      else {
        end = new Date(end_date)
      }

      // Compare calendar dates, ignoring the time of day.
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return (end - start) / (86_400_000 * 365.25);
    },
    get_exp_level(start_date, end_date) {
      return Math.floor(this.get_date_level(start_date, end_date));
    },
    get_progress_on_date_level(start_date, end_date) {
      return (this.get_date_level(start_date, end_date) % 1) * 100;
    },
    get_end_date(job) {
      if (job.end_date == "Present" && this.fancy) {
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
    },
    setFancyMode() {
      this.fancy = true;
    },
    setPrintMode() {
      this.fancy = false;
    }
  },
  beforeUnmount() {
    window.removeEventListener("beforeprint", this.setPrintMode);
    window.removeEventListener("afterprint", this.setFancyMode);
  },

  async mounted() {
    window.addEventListener("beforeprint", this.setPrintMode);
    window.addEventListener("afterprint", this.setFancyMode);
    try {
      const response = await fetch('./portfolio.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const portfolio = await response.json();
      this.name = portfolio.name;
      this.title = portfolio.title;
      this.date_of_birth = portfolio.date_of_birth;
      this.location = portfolio.location;
      this.linkedin_url = portfolio.linkedin_url;
      this.email = portfolio.email;
      this.about = portfolio.about;
      this.traits = portfolio.traits;
      this.languages = portfolio.languages;
      this.jobs = portfolio.work_experience;
      this.skills = portfolio.skills;
      this.education = portfolio.education;
      this.certifications = portfolio.certifications;
    } catch (error) {
      console.error('Could not load portfolio data:', error);
    }
  }
});

app.component("progress-bar", VueProgressbar);
app.mount('#app');
