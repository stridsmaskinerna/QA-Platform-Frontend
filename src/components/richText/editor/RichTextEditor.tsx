import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ToolbarPlugin } from "../plugins";
import { EditorState, ParagraphNode, TextNode } from "lexical";
import styles from "../RichTextShared.module.css";
import utils from "./EditorUtils";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import exampleTheme from "../exampleTheme";

const editorConfig = {
    html: {
        export: utils.exportMap,
        import: utils.constructImportMap(),
    },
    namespace: "MyEditor",
    nodes: [ParagraphNode, TextNode],
    onError(error: Error) {
        throw error;
    },
    theme: exampleTheme,
};

interface IRichTextEditorProps {
    setEditorState: Dispatch<SetStateAction<string>>;
    placeholder: string;
    containerStyle?: CSSProperties;
    initialState?: string;
}

export function RichTextEditor({
    setEditorState,
    placeholder,
    containerStyle,
    initialState,
}: IRichTextEditorProps) {
    const onChange = (editorState: EditorState) => {
        // Call toJSON on the EditorState object, which produces a serialization safe string
        const editorStateJSON = editorState.toJSON();
        // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
        setEditorState(JSON.stringify(editorStateJSON));
    };

    return (
        <LexicalComposer
            initialConfig={{ ...editorConfig, editorState: initialState }}
        >
            <div
                className={styles.editorContainer}
                style={containerStyle}
            >
                <ToolbarPlugin />
                <div className={styles.editorInner}>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                className={styles.editorInput}
                                aria-placeholder={placeholder}
                                placeholder={
                                    <div className={styles.editorPlaceholder}>
                                        {placeholder}
                                    </div>
                                }
                            />
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <OnChangePlugin onChange={onChange} />
                </div>
            </div>
        </LexicalComposer>
    );
}
