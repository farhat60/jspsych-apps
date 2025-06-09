// Sample experiment - self-registering version
(function() {

    function run(jsPsych) {
        const timeline = [];

        const instructions_template = jsPsychTimelineSpatialNbackTask.utils.task_instructions;

        // Create a custom timeline
        const spatial1Back = jsPsychTimelineSpatialNbackTask.createSpatialNBackTimeline({
            rows: 3,
            cols: 3,
            n_back_level: 1,
            total_trials: 7,
            target_percentage: 50,
            stimulus_duration: 750,
            isi_duration: 250,
            feedback_duration: 1000,
            show_feedback: true,
            show_feedback_border: true,
            showFeedbackNoResponse: true,
            feedbackWaitNoResponse: true,
            cell_size: 150,
            instructions_template: "Click the button when the position matches the one from {n} trial(s) ago",
            button_text: "MATCH",
            stimulus_color: "#2196F3",
            correct_color: "#4CAF50",
            incorrect_color: "#F44336",
            include_instructions: false,
            randomize_trials: false,
        });

        // Or use a preset
        // const timeline = presetConfigurations.medium();

        // Or create a multi-level experiment
        // const timeline = createMultiLevelNBackTimeline({
        //     n_back_levels: [1, 2, 3],
        //     trials_per_level: 20
        // });
        timeline.push(instructions_template);
        timeline.push(spatial1Back);

        return timeline;
    }

    // Register this experiment
    if (window.ExperimentLoader) {
        window.ExperimentLoader.register('sample-experiment', {
            run: run
        });
    }

})();