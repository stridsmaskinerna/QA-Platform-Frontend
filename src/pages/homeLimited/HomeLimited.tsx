import { ReactElement } from "react";
import { Tabs } from "../../components";

const DummyContent1 = (): ReactElement => (
    <div style={{ height: "30vh", width: "35vw", backgroundColor: "green" }} />
);
const DummyContent2 = (): ReactElement => (
    <div style={{ height: "40vh", width: "15vw", backgroundColor: "red" }} />
);
const DummyContent3 = (): ReactElement => (
    <div style={{ height: "20vh", width: "45vw", backgroundColor: "yellow" }} />
);

const tabs = [
    { content: <DummyContent1 />, title: "Tab1", index: 1 },
    { content: <DummyContent2 />, title: "Tabö  aösldf öalsd", index: 2 },
    { content: <DummyContent3 />, title: "Tab öl,as l", index: 3 }
];

export function HomeLimited() {
    return (
        <div
            style={{
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Tabs
                tabs={tabs}
                collapseWidth={1000}
            />
        </div>
    );
}
