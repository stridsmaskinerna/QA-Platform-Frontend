import { Tabs } from "../../components";

export function QuestionDetailsLimited() {
    return (
        <div
            style={{
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Tabs titles={["Tab1", "Tab2", "Tab3"]} />
        </div>
    );
}
