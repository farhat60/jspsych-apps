var jsPsychPluginSpatialNbackTs = (function (jspsych) {
  'use strict';

  var version = "0.0.1";

  const info = {
    name: "plugin-spatial-nback-ts",
    version,
    parameters: {
      /** Number of rows in the spatial grid */
      rows: {
        type: jspsych.ParameterType.INT,
        default: 3
      },
      /** Number of columns in the spatial grid */
      cols: {
        type: jspsych.ParameterType.INT,
        default: 3
      },
      /** Size of each cell in pixels, this will affect size of whole grid also */
      cell_size: {
        type: jspsych.ParameterType.INT,
        default: 100
      },
      /** Row position of the stimulus (0-indexed) */
      stimulus_row: {
        type: jspsych.ParameterType.INT,
        default: 0
      },
      /** Column position of the stimulus (0-indexed) */
      stimulus_col: {
        type: jspsych.ParameterType.INT,
        default: 0
      },
      /** Whether this trial is a target trial */
      is_target: {
        type: jspsych.ParameterType.BOOL,
        default: false
      },
      /** Duration the stimulus is displayed (ms) */
      stimulus_duration: {
        type: jspsych.ParameterType.INT,
        default: 500
      },
      /** Inter-stimulus interval (ms) */
      // I recommend using feedback_duration as ISI if you have any type of feedback showing
      isi_duration: {
        type: jspsych.ParameterType.INT,
        default: 1e3
      },
      /** Duration of feedback display (ms) */
      feedback_duration: {
        type: jspsych.ParameterType.INT,
        default: 500
      },
      /** Whether to show feedback "Incorrect! (231ms)" after response */
      show_feedback_time: {
        type: jspsych.ParameterType.BOOL,
        default: true
      },
      /** Whether to show feedback border around the grid */
      show_feedback_border: {
        type: jspsych.ParameterType.BOOL,
        default: true
      },
      /** Whether to show feedback when there is no response */
      showFeedbackNoResponse: {
        type: jspsych.ParameterType.BOOL,
        default: true
      },
      /** Whether to wait for feedback duration before ending trial when no response */
      /** if using feedback_duration as interstimulus response, keep this true */
      feedbackWaitNoResponse: {
        type: jspsych.ParameterType.BOOL,
        default: true
      },
      /** Text for the response button */
      button_text: {
        type: jspsych.ParameterType.STRING,
        default: ""
      },
      /** Color of the stimulus square */
      stimulus_color: {
        type: jspsych.ParameterType.STRING,
        default: "#0066cc"
      },
      /** Color of correct feedback border */
      correct_color: {
        type: jspsych.ParameterType.STRING,
        default: "#00cc00"
      },
      /** Color of incorrect feedback border */
      incorrect_color: {
        type: jspsych.ParameterType.STRING,
        default: "#cc0000"
      },
      /** Instructions to display above the grid */
      instructions: {
        type: jspsych.ParameterType.STRING,
        default: "Click MATCH when this is a target trial."
      }
    },
    data: {
      /** Row position of the stimulus */
      stimulus_row: {
        type: jspsych.ParameterType.INT
      },
      /** Column position of the stimulus */
      stimulus_col: {
        type: jspsych.ParameterType.INT
      },
      /** Whether this trial was a target */
      is_target: {
        type: jspsych.ParameterType.BOOL
      },
      /** Whether participant responded */
      response: {
        type: jspsych.ParameterType.BOOL
      },
      /** Response time in milliseconds */
      response_time: {
        type: jspsych.ParameterType.INT
      },
      /** Whether the response was correct */
      correct: {
        type: jspsych.ParameterType.BOOL
      }
    },
    citations: {
      "apa": "A. Hunter Farhat A. Hunter Farhat, A. H. F. (2023). {title}. Journal for Open Source Software, 1(1), 1. https://doi.org/10.21105/joss.12345 ",
      "bibtex": "@article{Hunter2023title, 	author = {A. Hunter Farhat A. Hunter Farhat, A. Hunter Farhat}, 	journal = {Journal for Open Source Software}, 	doi = {10.21105/joss.12345}, 	issn = {1234-5678}, 	number = {1}, 	year = {2023}, 	month = {may 11}, 	pages = {1}, 	publisher = {Open Journals}, 	title = {\\textbraceleft{}title\\textbraceright{}}, 	url = {{linkToPublicationInJournal}}, 	volume = {1}, }  "
    }
  };
  class SpatialNbackTsPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    static {
      this.info = info;
    }
    trial(display_element, trial) {
      let trial_start_time;
      let response_allowed = false;
      let response_given = false;
      let stimulus_timeout;
      let isi_timeout;
      let stimulus_hidden = false;
      const stimulus_row = trial.stimulus_row ?? Math.floor(Math.random() * trial.rows);
      const stimulus_col = trial.stimulus_col ?? Math.floor(Math.random() * trial.cols);
      const createDisplay = () => {
        let html = `
        <div id="nback-container" style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
          padding: 20px;
        ">`;
        html += `<div id="nback-instructions" style="
        position: absolute;
        top: 15vh;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        max-width: 520px;
        text-align: center;
        font-size: clamp(14px, 2vmin, 18px);
        z-index: 10;
      ">${trial.instructions}</div>`;
        const grid_size = Math.min(50, 80 / Math.max(trial.rows, trial.cols));
        const cell_size = `${grid_size / Math.max(trial.rows, trial.cols)}vmin`;
        html += `<div id="nback-grid" style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid #000;
        box-sizing: border-box;
        display: inline-block;
        z-index: 5;
      ">`;
        for (let row = 0; row < trial.rows; row++) {
          html += '<div style="display: flex;">';
          for (let col = 0; col < trial.cols; col++) {
            html += `<div id="cell-${row}-${col}" style="
            width: ${cell_size};
            height: ${cell_size};
            border: 1px solid #ccc;
            background-color: white;
            box-sizing: border-box;
            min-width: ${Math.max(40, trial.cell_size * 0.5)}px;
            min-height: ${Math.max(40, trial.cell_size * 0.5)}px;
          "></div>`;
          }
          html += "</div>";
        }
        html += "</div>";
        html += `<div id="nback-button-container" style="
        position: absolute;
        bottom: 15vh;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
      ">`;
        html += `<button id="nback-response-btn" style="
        font-size: clamp(18px, 3vmin, 26px);
        padding: clamp(18px, 2.5vmin, 30px) clamp(35px, 5vmin, 60px);
        background-color: #2196F3;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: all 0.2s;
      " disabled>${trial.button_text}</button>`;
        html += "</div>";
        html += `<div id="nback-feedback" style="
        position: absolute;
        bottom: 8vh;
        left: 50%;
        transform: translateX(-50%);
        height: 40px;
        font-size: clamp(14px, 2vmin, 20px);
        font-weight: bold;
        text-align: center;
        z-index: 10;
        width: 80%;
      "></div>`;
        html += "</div>";
        display_element.innerHTML = html;
        const button = document.getElementById("nback-response-btn");
        button.addEventListener("mouseenter", () => {
          if (!button.disabled) {
            button.style.backgroundColor = "#1976D2";
            button.style.transform = "translateY(-2px)";
          }
        });
        button.addEventListener("mouseleave", () => {
          button.style.backgroundColor = "#2196F3";
          button.style.transform = "translateY(0)";
        });
        button.addEventListener("click", handleResponse);
      };
      const startTrial = () => {
        const cell = document.getElementById(`cell-${stimulus_row}-${stimulus_col}`);
        cell.style.backgroundColor = trial.stimulus_color;
        response_allowed = true;
        trial_start_time = performance.now();
        stimulus_hidden = false;
        const responseButton = document.getElementById("nback-response-btn");
        responseButton.disabled = false;
        stimulus_timeout = window.setTimeout(() => {
          cell.style.backgroundColor = "white";
          stimulus_hidden = true;
          isi_timeout = window.setTimeout(() => {
            if (response_allowed && !response_given) {
              handleNoResponse();
            }
          }, trial.isi_duration);
        }, trial.stimulus_duration);
      };
      const handleResponse = () => {
        if (!response_allowed || response_given) return;
        response_allowed = false;
        response_given = true;
        const response_time = performance.now() - trial_start_time;
        const is_correct = trial.is_target;
        clearTimeout(stimulus_timeout);
        clearTimeout(isi_timeout);
        showFeedback(is_correct, response_time, true);
      };
      const handleNoResponse = () => {
        if (!response_allowed || response_given) return;
        response_allowed = false;
        response_given = true;
        const is_correct = !trial.is_target;
        showFeedback(is_correct, null, false);
      };
      const showFeedback = (is_correct, response_time, made_response) => {
        if (!trial.show_feedback_time && !trial.show_feedback_border) {
          if (made_response && !stimulus_hidden) {
            const elapsed_time = performance.now() - trial_start_time;
            const remaining_stimulus_time = Math.max(0, trial.stimulus_duration - elapsed_time);
            const feedback_wait_time = remaining_stimulus_time + trial.feedback_duration;
            setTimeout(() => {
              const cell = document.getElementById(`cell-${stimulus_row}-${stimulus_col}`);
              cell.style.backgroundColor = "white";
              setTimeout(() => {
                endTrial(is_correct, response_time, made_response);
              }, trial.isi_duration);
            }, feedback_wait_time);
          } else {
            endTrial(is_correct, response_time, made_response);
          }
          return;
        }
        const button = document.getElementById("nback-response-btn");
        button.disabled = true;
        button.style.opacity = "0.6";
        let total_feedback_duration;
        if (made_response && !stimulus_hidden) {
          const elapsed_time = performance.now() - trial_start_time;
          const remaining_stimulus_time = Math.max(0, trial.stimulus_duration - elapsed_time);
          total_feedback_duration = remaining_stimulus_time + trial.feedback_duration;
        } else if (made_response && stimulus_hidden) {
          const elapsed_time = performance.now() - trial_start_time;
          const isi_start_time = trial.stimulus_duration;
          const elapsed_isi_time = elapsed_time - isi_start_time;
          const remaining_isi_time = Math.max(0, trial.isi_duration - elapsed_isi_time);
          total_feedback_duration = remaining_isi_time + trial.feedback_duration;
        } else {
          if (trial.feedbackWaitNoResponse) {
            total_feedback_duration = trial.feedback_duration;
          } else {
            endTrial(is_correct, response_time, made_response);
            return;
          }
        }
        if (response_time === null && !trial.showFeedbackNoResponse) {
          if (trial.feedbackWaitNoResponse) {
            setTimeout(() => {
              endTrial(is_correct, response_time, made_response);
            }, total_feedback_duration);
          } else {
            endTrial(is_correct, response_time, made_response);
          }
          return;
        }
        const grid = document.getElementById("nback-grid");
        const feedback_div = document.getElementById("nback-feedback");
        const stimulus_cell = document.getElementById(`cell-${stimulus_row}-${stimulus_col}`);
        if (trial.show_feedback_border) {
          grid.style.border = `6px solid ${is_correct ? trial.correct_color : trial.incorrect_color}`;
        }
        if (trial.show_feedback_time) {
          let feedback_text = is_correct ? "Correct!" : "Incorrect!";
          if (response_time !== null) {
            feedback_text += ` (${Math.round(response_time)}ms)`;
          }
          feedback_div.textContent = feedback_text;
          feedback_div.style.color = is_correct ? trial.correct_color : trial.incorrect_color;
        }
        if (made_response && !stimulus_hidden) {
          const elapsed_time = performance.now() - trial_start_time;
          const remaining_stimulus_time = Math.max(0, trial.stimulus_duration - elapsed_time);
          setTimeout(() => {
            stimulus_cell.style.backgroundColor = "white";
            setTimeout(() => {
              endTrial(is_correct, response_time, made_response);
            }, trial.feedback_duration + trial.isi_duration);
          }, remaining_stimulus_time);
        } else if (made_response && stimulus_hidden) {
          const elapsed_time = performance.now() - trial_start_time;
          const isi_start_time = trial.stimulus_duration;
          const elapsed_isi_time = elapsed_time - isi_start_time;
          const remaining_isi_time = Math.max(0, trial.isi_duration - elapsed_isi_time);
          setTimeout(() => {
            endTrial(is_correct, response_time, made_response);
          }, remaining_isi_time + trial.feedback_duration);
        } else {
          setTimeout(() => {
            endTrial(is_correct, response_time, made_response);
          }, total_feedback_duration);
        }
      };
      const endTrial = (is_correct, response_time, made_response) => {
        const trial_data = {
          stimulus_row,
          stimulus_col,
          is_target: trial.is_target,
          response: made_response,
          response_time,
          correct: is_correct
        };
        display_element.innerHTML = "";
        this.jsPsych.finishTrial(trial_data);
      };
      createDisplay();
      startTrial();
    }
  }

  return SpatialNbackTsPlugin;

})(jsPsychModule);
//# sourceMappingURL=index.browser.js.map
