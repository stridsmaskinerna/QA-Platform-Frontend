import { LexicalComposer } from "@lexical/react/LexicalComposer";
import styles from "../RichTextShared.module.css";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import exampleTheme from "../exampleTheme";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

const editorConfig = {
    namespace: "MyReader",
    editable: false,
    // nodes: [ParagraphNode, TextNode],
    onError(error: Error) {
        throw error;
    },
    theme: exampleTheme,
};

interface IRichTextReaderProps {
    initialState: string;
}

export function RichTextReader({ initialState }: IRichTextReaderProps) {
    return (
        <LexicalComposer
            initialConfig={{ ...editorConfig, editorState: initialState }}
        >
            <div className={styles.editorContainer}>
                <div className={styles.editorInner}>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className={styles.editorInput} />
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                </div>
            </div>
        </LexicalComposer>
    );
}
