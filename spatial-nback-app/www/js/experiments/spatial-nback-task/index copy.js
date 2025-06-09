// Sample experiment - self-registering version
(function() {

    function run(jsPsych) {
        const timeline = [];

        const welcome = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<h2>Sample Experiment</h2><p>Click the button to continue.</p>',
            choices: ['Continue']
        };
        timeline.push(welcome);

        // N-back task parameters
        const n_back_level = 1;
        const total_trials = 6;
        const target_percentage = 25;
        const rows = 3;
        const cols = 3;

        // Generate stimulus sequence
        function generateNBackSequence(total_trials, n_back_level, target_percentage, rows, cols) {
        const positions = [];
        const is_target = [];
        
        // Generate first n trials (cannot be targets)
        for (let i = 0; i < n_back_level; i++) {
            positions.push({
            row: Math.floor(Math.random() * rows),
            col: Math.floor(Math.random() * cols)
            });
            is_target.push(false);
        }
        
        // Generate remaining trials with targets
        const n_targets = Math.round((target_percentage / 100) * total_trials);
        let targets_placed = 0;
        
        for (let i = n_back_level; i < total_trials; i++) {
            if (targets_placed < n_targets && Math.random() < 0.5) {
            // Make this a target trial
            positions.push({
                row: positions[i - n_back_level].row,
                col: positions[i - n_back_level].col
            });
            is_target.push(true);
            targets_placed++;
            } else {
            // Generate non-target position
            let new_position;
            do {
                new_position = {
                row: Math.floor(Math.random() * rows),
                col: Math.floor(Math.random() * cols)
                };
            } while (
                new_position.row === positions[i - n_back_level].row &&
                new_position.col === positions[i - n_back_level].col
            );
            positions.push(new_position);
            is_target.push(false);
            }
        }
        
        return { positions, is_target };
        }

        const sequence = generateNBackSequence(total_trials, n_back_level, target_percentage, rows, cols);

        // Add trials to the timeline
        for (let i = 0; i < total_trials; i++) {
        timeline.push({
            type: jsPsychPluginSpatialNbackTs,
            rows: rows,
            cols: cols,
            stimulus_row: sequence.positions[i].row,
            stimulus_col: sequence.positions[i].col,
            is_target: sequence.is_target[i],
            stimulus_duration: 750,
            isi_duration: 1000,
            feedback_duration: 1000,
            show_feedback: false,
            show_feedback_border: true,
            showFeedbackNoResponse: false,
            feedbackWaitNoResponse: false,
            cell_size: 150,
            instructions: `Click MATCH when the position matches the one from ${n_back_level} trial(s) ago (Trial ${i + 1} of ${total_trials})`,
            button_text: "MATCH",
            stimulus_color: "#2196F3",
            correct_color: "#4CAF50",
            incorrect_color: "#F44336",
        });
        }

        return timeline;
    }

    // Register this experiment
    if (window.ExperimentLoader) {
        window.ExperimentLoader.register('sample-experiment', {
            run: run
        });
    }

})();