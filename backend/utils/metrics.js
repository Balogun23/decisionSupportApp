const metrics = {
  "Data Extraction & Access": {
    FILTERING: {
      Python: { runtime: 0.175, cpu: 0.139, total_loc: 21, core_loc: 6, memory: 11.052 },
      SQL:    { runtime: 2.104, cpu: 0.641, total_loc: 37, core_loc: 7, memory: 23.238 },
      R:      { runtime: 1.823, cpu: 1.63,  total_loc: 35, core_loc: 6, memory: 3.21 }
    },
    INDEXING: {
      Python: { runtime: 0.185, cpu: 0.156, total_loc: 21, core_loc: 6, memory: 6.502 },
      SQL:    { runtime: 2.170, cpu: 1.422, total_loc: 35, core_loc: 3, memory: 37.984 },
      R:      { runtime: 1.823, cpu: 1.63,  total_loc: 35, core_loc: 6, memory: 3.21 }
    },
    JOINING: {
      Python: { runtime: 0.845, cpu: 0.750, total_loc: 22, core_loc: 5, memory: 15.641 },
      SQL:    { runtime: 2.214, cpu: 1.59,  total_loc: 42, core_loc: 3, memory: 41.809 },
      R:      { runtime: 3.598, cpu: 2.94,  total_loc: 37, core_loc: 8, memory: 0.001 }
    },
    "PARTIAL READ": {
      Python: { runtime: 0.062, cpu: 0.065, total_loc: 16, core_loc: 3, memory: 2.523 },
      SQL:    { runtime: 0.857, cpu: 0.438, total_loc: 34, core_loc: 1, memory: 23.895 },
      R:      { runtime: 0.349, cpu: 0.47,  total_loc: 28, core_loc: 3, memory: 0 }
    },
    SELECTING: {
      Python: { runtime: 0.342, cpu: 0.260, total_loc: 17, core_loc: 6, memory: 15.245 },
      SQL:    { runtime: 1.081, cpu: 0.547, total_loc: 36, core_loc: 2, memory: 23.043 },
      R:      { runtime: 2.123, cpu: 0.98,  total_loc: 31, core_loc: 4, memory: 0 }
    }
  },

  "Data Cleaning & Wrangling": {
    "HORIZONTAL MERGE": {
      Python: { runtime: 0.608, cpu: 0.531, total_loc: 27, core_loc: 6, memory: 14.257 },
      SQL:    { runtime: 2.266, cpu: 1.391, total_loc: 43, core_loc: 4, memory: 50.34 },
      R:      { runtime: 2.143, cpu: 2.012, total_loc: 36, core_loc: 8, memory: 0 }
    },
    "MISSING DATA": {
      Python: { runtime: 0.186, cpu: 0.166, total_loc: 26, core_loc: 5, memory: 9.716 },
      SQL:    { runtime: 0.725, cpu: 0.312, total_loc: 36, core_loc: 4, memory: 23.082 },
      R:      { runtime: 0.352, cpu: 0.354, total_loc: 30, core_loc: 3, memory: 0.523 }
    },
    "RENAMING COLUMNS": {
      Python: { runtime: 0.752, cpu: 0.937, total_loc: 34, core_loc: 7, memory: 14.834 },
      SQL:    { runtime: 2.687, cpu: 0.953, total_loc: 45, core_loc: 13, memory: 40.738 },
      R:      { runtime: 1.672, cpu: 1.42,  total_loc: null, core_loc: 5, memory: 0 }
    },
    "TYPE CONVERSION": {
      Python: { runtime: 1.295, cpu: 0.682, total_loc: 30, core_loc: 5, memory: 13.427 },
      SQL:    { runtime: 1.536, cpu: 0.922, total_loc: 34, core_loc: 7, memory: 24.125 },
      R:      { runtime: 1.447, cpu: 1.270, total_loc: null, core_loc: 4, memory: 0.178 }
    }
  },

  "Exploratory Data Analysis": {
    "CROSS TAB": {
      Python: { runtime: 0.489, cpu: 0.167, total_loc: 26, core_loc: 5, memory: 14.786 },
      SQL:    { runtime: 1.651, cpu: 0.531, total_loc: 39, core_loc: 8, memory: 23.176 },
      R:      { runtime: 0.233, cpu: 0.15,  total_loc: null, core_loc: 3, memory: 0 }
    },
    DESCRIPTIVE: {
      Python: { runtime: 0.185, cpu: 0.438, total_loc: 26, core_loc: 5, memory: 12.703 },
      SQL:    { runtime: 2.345, cpu: 0.375, total_loc: 45, core_loc: 14, memory: 23.233 },
      R:      { runtime: 0.652, cpu: 0.18,  total_loc: null, core_loc: 4, memory: 0.237 }
    },
    FREQUENCY: {
      Python: { runtime: 0.574, cpu: 0.211, total_loc: 27, core_loc: 8, memory: 12.933 },
      SQL:    { runtime: 1.244, cpu: 0.438, total_loc: 45, core_loc: 9, memory: 23.141 },
      R:      { runtime: 0.189, cpu: 0.18,  total_loc: null, core_loc: 6, memory: 0 }
    },
    "GROUP BY": {
      Python: { runtime: 0.134, cpu: 0.124, total_loc: 25, core_loc: 4, memory: 7.928 },
      SQL:    { runtime: 3.576, cpu: 0.484, total_loc: 37, core_loc: 7, memory: 23.836 },
      R:      { runtime: 0.271, cpu: 0.21,  total_loc: null, core_loc: 9, memory: 0.341 }
    }
  },

  "Statistical Modeling & Inference": {
    ANOVA: {
      Python: { runtime: 0.271, cpu: 0.130, total_loc: 34, core_loc: 14, memory: 3.021 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.219, cpu: 0.22,  total_loc: null, core_loc: 12, memory: 1.095 }
    },
    CORRELATION: {
      Python: { runtime: 0.115, cpu: 0.117, total_loc: 27, core_loc: 7, memory: 3.107 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.219, cpu: 0.22,  total_loc: null, core_loc: 17, memory: 0.501 }
    },
    REGRESSION: {
      Python: { runtime: 0.392, cpu: 0.167, total_loc: 31, core_loc: 11, memory: 11.488 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.221, cpu: 0.19,  total_loc: null, core_loc: 8, memory: 1.45 }
    },
    TTEST: {
      Python: { runtime: 0.101, cpu: 0.094, total_loc: 34, core_loc: 16, memory: 0.905 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.266, cpu: 0.21,  total_loc: null, core_loc: 13, memory: 0.543 }
    }
  },

  "Machine Learning": {
    "BINARY REGRESSION": {
      Python: { runtime: 0.146, cpu: 0.109, total_loc: 35, core_loc: 18, memory: 3.502 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 1.61,  cpu: 0.61,  total_loc: null, core_loc: 22, memory: 0 }
    },
    CLUSTERING: {
      Python: { runtime: 1.905, cpu: 0.245, total_loc: 28, core_loc: 11, memory: 4.985 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.983, cpu: 0.49,  total_loc: null, core_loc: 12, memory: 0.011 }
    },
    HYPERPARAMETER: {
      Python: { runtime: 0.502, cpu: 0.350, total_loc: 31, core_loc: 15, memory: 3.865 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 2.082, cpu: 1.56,  total_loc: null, core_loc: 26, memory: 0 }
    },
    "MODEL SAVING": {
      Python: { runtime: 0.001, cpu: 0,     total_loc: 21, core_loc: 8, memory: 0.053 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.682, cpu: 0.46,  total_loc: 27, core_loc: 8, memory: 0.003 }
    }
  },

  "Data Visualisation": {
    "BAR CHART": {
      Python: { runtime: 0.956, cpu: 0.850, total_loc: 31, core_loc: 15, memory: 19.102 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 2.093, cpu: 1.65,  total_loc: 31, core_loc: 11, memory: 0.525 }
    },
    "BOX PLOT": {
      Python: { runtime: 0.645, cpu: 0.840, total_loc: 26, core_loc: 13, memory: 19.512 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null }
    },
    HISTOGRAM: {
      Python: { runtime: 0.610, cpu: 0.608, total_loc: 28, core_loc: 14, memory: 19.336 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 2.545, cpu: 1.562, total_loc: 33, core_loc: 14, memory: 0.064 }
    },
    "SCATTER PLOT": {
      Python: { runtime: 1.005, cpu: 0.965, total_loc: 30, core_loc: 15, memory: 20.609 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 6.54,  cpu: 1.97,  total_loc: 41, core_loc: 22, memory: 0.857 }
    }
  },

  "Reporting & Reproductibility": {
    "EMBED CHARTS": {
      Python: { runtime: 0.535, cpu: 0.600, total_loc: 35, core_loc: 16, memory: 18.450 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.986, cpu: 0.83,  total_loc: 37, core_loc: 12, memory: 0.063 }
    },
    "EXPORT RESULT": {
      Python: { runtime: 0.844, cpu: 0.601, total_loc: 22, core_loc: 8, memory: 16.184 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.062, cpu: 0.61,  total_loc: 28, core_loc: 9, memory: 0.062 }
    },
    "SAVE MODEL": {
      Python: { runtime: 0.003, cpu: 0.001, total_loc: 26, core_loc: 11, memory: 0.067 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.679, cpu: 0.58,  total_loc: 21, core_loc: 4, memory: 0 }
    }
  },

  "Automation and Workflow Orchestration": {
    "ERROR HANDLE": {
      Python: { runtime: 0.168, cpu: 0.094, total_loc: 23, core_loc: 7, memory: 9.580 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.744, cpu: 0.61,  total_loc: 35, core_loc: 12, memory: 0.013 }
    },
    "LOG TASK": {
      Python: { runtime: 0.087, cpu: 0.094, total_loc: 32, core_loc: 11, memory: 0.699 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.533, cpu: 0.35,  total_loc: 33, core_loc: 10, memory: 0.014 }
    },
    "FULL PIPELINE": {
      Python: { runtime: 0.238, cpu: 0.188, total_loc: 28, core_loc: 11, memory: 17.457 },
      SQL:    { runtime: null, cpu: null,   total_loc: null, core_loc: null, memory: null },
      R:      { runtime: 0.412, cpu: 0.28,  total_loc: 27, core_loc: 9, memory: 0 }
    }
  },

  "Deployment & Integration": {

  }
};

module.exports = metrics;
