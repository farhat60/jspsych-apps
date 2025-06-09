import { JsPsychPlugin, ParameterType, JsPsych, TrialType } from 'jspsych';

declare const info: {
    readonly name: "plugin-spatial-nback-ts";
    readonly version: string;
    readonly parameters: {
        /** Number of rows in the spatial grid */
        readonly rows: {
            readonly type: ParameterType.INT;
            readonly default: 3;
        };
        /** Number of columns in the spatial grid */
        readonly cols: {
            readonly type: ParameterType.INT;
            readonly default: 3;
        };
        /** Size of each cell in pixels, this will affect size of whole grid also */
        readonly cell_size: {
            readonly type: ParameterType.INT;
            readonly default: 100;
        };
        /** Row position of the stimulus (0-indexed) */
        readonly stimulus_row: {
            readonly type: ParameterType.INT;
            readonly default: 0;
        };
        /** Column position of the stimulus (0-indexed) */
        readonly stimulus_col: {
            readonly type: ParameterType.INT;
            readonly default: 0;
        };
        /** Whether this trial is a target trial */
        readonly is_target: {
            readonly type: ParameterType.BOOL;
            readonly default: false;
        };
        /** Duration the stimulus is displayed (ms) */
        readonly stimulus_duration: {
            readonly type: ParameterType.INT;
            readonly default: 500;
        };
        /** Inter-stimulus interval (ms) */
        readonly isi_duration: {
            readonly type: ParameterType.INT;
            readonly default: 1000;
        };
        /** Duration of feedback display (ms) */
        readonly feedback_duration: {
            readonly type: ParameterType.INT;
            readonly default: 500;
        };
        /** Whether to show feedback "Incorrect! (231ms)" after response */
        readonly show_feedback_time: {
            readonly type: ParameterType.BOOL;
            readonly default: true;
        };
        /** Whether to show feedback border around the grid */
        readonly show_feedback_border: {
            readonly type: ParameterType.BOOL;
            readonly default: true;
        };
        /** Whether to show feedback when there is no response */
        readonly showFeedbackNoResponse: {
            readonly type: ParameterType.BOOL;
            readonly default: true;
        };
        /** Whether to wait for feedback duration before ending trial when no response */
        /** if using feedback_duration as interstimulus response, keep this true */
        readonly feedbackWaitNoResponse: {
            readonly type: ParameterType.BOOL;
            readonly default: true;
        };
        /** Text for the response button */
        readonly button_text: {
            readonly type: ParameterType.STRING;
            readonly default: "";
        };
        /** Color of the stimulus square */
        readonly stimulus_color: {
            readonly type: ParameterType.STRING;
            readonly default: "#0066cc";
        };
        /** Color of correct feedback border */
        readonly correct_color: {
            readonly type: ParameterType.STRING;
            readonly default: "#00cc00";
        };
        /** Color of incorrect feedback border */
        readonly incorrect_color: {
            readonly type: ParameterType.STRING;
            readonly default: "#cc0000";
        };
        /** Instructions to display above the grid */
        readonly instructions: {
            readonly type: ParameterType.STRING;
            readonly default: "Click MATCH when this is a target trial.";
        };
    };
    readonly data: {
        /** Row position of the stimulus */
        readonly stimulus_row: {
            readonly type: ParameterType.INT;
        };
        /** Column position of the stimulus */
        readonly stimulus_col: {
            readonly type: ParameterType.INT;
        };
        /** Whether this trial was a target */
        readonly is_target: {
            readonly type: ParameterType.BOOL;
        };
        /** Whether participant responded */
        readonly response: {
            readonly type: ParameterType.BOOL;
        };
        /** Response time in milliseconds */
        readonly response_time: {
            readonly type: ParameterType.INT;
        };
        /** Whether the response was correct */
        readonly correct: {
            readonly type: ParameterType.BOOL;
        };
    };
    readonly citations: "__CITATIONS__";
};
type Info = typeof info;
/**
 * **plugin-spatial-nback-ts**
 *
 * Single trial spatial grid stimulus with response collection
 *
 * @author A. Hunter Farhat
 * @version 1.0.0
 * @see {@link https://github.com/farhat60/JsPsychTemplates/blob/main/plugin-spatial-nback-ts}
 */
declare class SpatialNbackTsPlugin implements JsPsychPlugin<Info> {
    private jsPsych;
    static info: {
        readonly name: "plugin-spatial-nback-ts";
        readonly version: string;
        readonly parameters: {
            /** Number of rows in the spatial grid */
            readonly rows: {
                readonly type: ParameterType.INT;
                readonly default: 3;
            };
            /** Number of columns in the spatial grid */
            readonly cols: {
                readonly type: ParameterType.INT;
                readonly default: 3;
            };
            /** Size of each cell in pixels, this will affect size of whole grid also */
            readonly cell_size: {
                readonly type: ParameterType.INT;
                readonly default: 100;
            };
            /** Row position of the stimulus (0-indexed) */
            readonly stimulus_row: {
                readonly type: ParameterType.INT;
                readonly default: 0;
            };
            /** Column position of the stimulus (0-indexed) */
            readonly stimulus_col: {
                readonly type: ParameterType.INT;
                readonly default: 0;
            };
            /** Whether this trial is a target trial */
            readonly is_target: {
                readonly type: ParameterType.BOOL;
                readonly default: false;
            };
            /** Duration the stimulus is displayed (ms) */
            readonly stimulus_duration: {
                readonly type: ParameterType.INT;
                readonly default: 500;
            };
            /** Inter-stimulus interval (ms) */
            readonly isi_duration: {
                readonly type: ParameterType.INT;
                readonly default: 1000;
            };
            /** Duration of feedback display (ms) */
            readonly feedback_duration: {
                readonly type: ParameterType.INT;
                readonly default: 500;
            };
            /** Whether to show feedback "Incorrect! (231ms)" after response */
            readonly show_feedback_time: {
                readonly type: ParameterType.BOOL;
                readonly default: true;
            };
            /** Whether to show feedback border around the grid */
            readonly show_feedback_border: {
                readonly type: ParameterType.BOOL;
                readonly default: true;
            };
            /** Whether to show feedback when there is no response */
            readonly showFeedbackNoResponse: {
                readonly type: ParameterType.BOOL;
                readonly default: true;
            };
            /** Whether to wait for feedback duration before ending trial when no response */
            /** if using feedback_duration as interstimulus response, keep this true */
            readonly feedbackWaitNoResponse: {
                readonly type: ParameterType.BOOL;
                readonly default: true;
            };
            /** Text for the response button */
            readonly button_text: {
                readonly type: ParameterType.STRING;
                readonly default: "";
            };
            /** Color of the stimulus square */
            readonly stimulus_color: {
                readonly type: ParameterType.STRING;
                readonly default: "#0066cc";
            };
            /** Color of correct feedback border */
            readonly correct_color: {
                readonly type: ParameterType.STRING;
                readonly default: "#00cc00";
            };
            /** Color of incorrect feedback border */
            readonly incorrect_color: {
                readonly type: ParameterType.STRING;
                readonly default: "#cc0000";
            };
            /** Instructions to display above the grid */
            readonly instructions: {
                readonly type: ParameterType.STRING;
                readonly default: "Click MATCH when this is a target trial.";
            };
        };
        readonly data: {
            /** Row position of the stimulus */
            readonly stimulus_row: {
                readonly type: ParameterType.INT;
            };
            /** Column position of the stimulus */
            readonly stimulus_col: {
                readonly type: ParameterType.INT;
            };
            /** Whether this trial was a target */
            readonly is_target: {
                readonly type: ParameterType.BOOL;
            };
            /** Whether participant responded */
            readonly response: {
                readonly type: ParameterType.BOOL;
            };
            /** Response time in milliseconds */
            readonly response_time: {
                readonly type: ParameterType.INT;
            };
            /** Whether the response was correct */
            readonly correct: {
                readonly type: ParameterType.BOOL;
            };
        };
        readonly citations: "__CITATIONS__";
    };
    constructor(jsPsych: JsPsych);
    trial(display_element: HTMLElement, trial: TrialType<Info>): void;
}

export { SpatialNbackTsPlugin as default };
