import answerCard from "./answerCard.json";
import answerCardComments from "./answerCardComments.json";
import answerCreator from "./answerCreator.json";
import forms from "./forms.json";
import header from "./header.json";
import shared from "./shared.json";
import teacherDashboard from "./teacherDashboard.json";
import adminDashboard from "./adminDashboard.json";
import userGuide from "./userGuide.json";
import utilities from "./utilities.json";
import questionDetailsViewer from "./questionDetailsViewer.json";

export default {
    translation: {
        ...answerCard,
        ...answerCardComments,
        ...answerCreator,
        ...forms,
        ...header,
        ...shared,
        ...questionDetailsViewer,
        ...teacherDashboard,
        ...userGuide,
        ...utilities,
        ...adminDashboard,
    },
};
