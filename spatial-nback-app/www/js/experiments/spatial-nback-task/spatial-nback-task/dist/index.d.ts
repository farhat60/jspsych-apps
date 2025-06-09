import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';

declare const task_instructions: {
    type: typeof jsPsychHtmlButtonResponse;
    stimulus: string;
    choices: string[];
};
declare function generateNBackSequence(total_trials: number, n_back_level: number, target_percentage: number, rows: number, cols: number): {
    positions: {
        row: number;
        col: number;
    }[];
    is_target: boolean[];
};
declare function createSpatialNBackTimeline({ rows, cols, n_back_level, total_trials, target_percentage, stimulus_duration, isi_duration, feedback_duration, show_feedback, show_feedback_border, showFeedbackNoResponse, feedbackWaitNoResponse, cell_size, instructions_template, button_text, stimulus_color, correct_color, incorrect_color, include_instructions, randomize_trials, }?: {
    rows?: number;
    cols?: number;
    n_back_level?: number;
    total_trials?: number;
    target_percentage?: number;
    stimulus_duration?: number;
    isi_duration?: number;
    feedback_duration?: number;
    show_feedback?: boolean;
    show_feedback_border?: boolean;
    showFeedbackNoResponse?: boolean;
    feedbackWaitNoResponse?: boolean;
    cell_size?: number;
    instructions_template?: string;
    button_text?: string;
    stimulus_color?: string;
    correct_color?: string;
    incorrect_color?: string;
    include_instructions?: boolean;
    randomize_trials?: boolean;
}): {
    timeline: any[];
    randomize_order: boolean;
} | {
    timeline: ({
        timeline: any[];
        randomize_order: boolean;
    } | {
        stimulus: string;
        type: typeof jsPsychHtmlButtonResponse;
        choices: string[];
    })[];
};
declare function createPracticeTimeline(options?: Parameters<typeof createSpatialNBackTimeline>[0]): {
    timeline: any[];
    randomize_order: boolean;
} | {
    timeline: ({
        timeline: any[];
        randomize_order: boolean;
    } | {
        stimulus: string;
        type: typeof jsPsychHtmlButtonResponse;
        choices: string[];
    })[];
};
declare function createMultiLevelNBackTimeline({ n_back_levels, trials_per_level, randomize_levels, ...sharedOptions }?: {
    n_back_levels?: number[];
    trials_per_level?: number;
    randomize_levels?: boolean;
} & Parameters<typeof createSpatialNBackTimeline>[0]): {
    timeline: ({
        timeline: any[];
        randomize_order: boolean;
    } | {
        timeline: ({
            timeline: any[];
            randomize_order: boolean;
        } | {
            stimulus: string;
            type: typeof jsPsychHtmlButtonResponse;
            choices: string[];
        })[];
    })[];
    randomize_order: boolean;
};
declare const presetConfigurations: {
    easy: () => {
        timeline: any[];
        randomize_order: boolean;
    } | {
        timeline: ({
            timeline: any[];
            randomize_order: boolean;
        } | {
            stimulus: string;
            type: typeof jsPsychHtmlButtonResponse;
            choices: string[];
        })[];
    };
    medium: () => {
        timeline: any[];
        randomize_order: boolean;
    } | {
        timeline: ({
            timeline: any[];
            randomize_order: boolean;
        } | {
            stimulus: string;
            type: typeof jsPsychHtmlButtonResponse;
            choices: string[];
        })[];
    };
    hard: () => {
        timeline: any[];
        randomize_order: boolean;
    } | {
        timeline: ({
            timeline: any[];
            randomize_order: boolean;
        } | {
            stimulus: string;
            type: typeof jsPsychHtmlButtonResponse;
            choices: string[];
        })[];
    };
    research: () => {
        timeline: ({
            timeline: any[];
            randomize_order: boolean;
        } | {
            timeline: ({
                timeline: any[];
                randomize_order: boolean;
            } | {
                stimulus: string;
                type: typeof jsPsychHtmlButtonResponse;
                choices: string[];
            })[];
        })[];
        randomize_order: boolean;
    };
};

declare const timelineUnits: {
    createPracticeTimeline: typeof createPracticeTimeline;
    createSpatialNBackTimeline: typeof createSpatialNBackTimeline;
    createMultiLevelNBackTimeline: typeof createMultiLevelNBackTimeline;
};
declare const utils: {
    presetConfigurations: {
        easy: () => {
            timeline: any[];
            randomize_order: boolean;
        } | {
            timeline: ({
                timeline: any[];
                randomize_order: boolean;
            } | {
                stimulus: string;
                type: typeof jsPsychHtmlButtonResponse;
                choices: string[];
            })[];
        };
        medium: () => {
            timeline: any[];
            randomize_order: boolean;
        } | {
            timeline: ({
                timeline: any[];
                randomize_order: boolean;
            } | {
                stimulus: string;
                type: typeof jsPsychHtmlButtonResponse;
                choices: string[];
            })[];
        };
        hard: () => {
            timeline: any[];
            randomize_order: boolean;
        } | {
            timeline: ({
                timeline: any[];
                randomize_order: boolean;
            } | {
                stimulus: string;
                type: typeof jsPsychHtmlButtonResponse;
                choices: string[];
            })[];
        };
        research: () => {
            timeline: ({
                timeline: any[];
                randomize_order: boolean;
            } | {
                timeline: ({
                    timeline: any[];
                    randomize_order: boolean;
                } | {
                    stimulus: string;
                    type: typeof jsPsychHtmlButtonResponse;
                    choices: string[];
                })[];
            })[];
            randomize_order: boolean;
        };
    };
    generateNBackSequence: typeof generateNBackSequence;
    task_instructions: {
        type: typeof jsPsychHtmlButtonResponse;
        stimulus: string;
        choices: string[];
    };
};

export { createMultiLevelNBackTimeline, createPracticeTimeline, createSpatialNBackTimeline, createSpatialNBackTimeline as default, generateNBackSequence, presetConfigurations, task_instructions, timelineUnits, utils };
