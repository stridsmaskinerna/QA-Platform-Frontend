/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
    $getSelection,
    $isRangeSelection,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    REDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../RichTextShared.module.css";

const LowPriority = 1;

function Divider() {
    return <div className="divider" />;
}

export function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
            setIsStrikethrough(selection.hasFormat("strikethrough"));
        }
    }, []);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (_payload, _newEditor) => {
                    $updateToolbar();
                    return false;
                },
                LowPriority,
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                payload => {
                    setCanUndo(payload);
                    return false;
                },
                LowPriority,
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                payload => {
                    setCanRedo(payload);
                    return false;
                },
                LowPriority,
            ),
        );
    }, [editor, $updateToolbar]);

    return (
        <div
            className={styles.toolbar}
            ref={toolbarRef}
        >
            <button
                type="button"
                disabled={!canUndo}
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                className={`${styles.toolbarItem} ${styles.spaced}`}
                aria-label="Undo"
            >
                <i className={`${styles.format} ${styles.undo}`} />
            </button>
            <button
                type="button"
                disabled={!canRedo}
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                className={styles.toolbarItem}
                aria-label="Redo"
            >
                <i className={`${styles.format} ${styles.redo}`} />
            </button>
            <Divider />
            <button
                type="button"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }}
                className={`${styles.toolbarItem} ${styles.spaced} ${isBold ? styles.active : ""}`}
                aria-label="Format Bold"
            >
                <i className={`${styles.format} ${styles.bold}`} />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }}
                className={`${styles.toolbarItem} ${styles.spaced} ${isItalic ? styles.active : ""}`}
                aria-label="Format Italics"
            >
                <i className={`${styles.format} ${styles.italic}`} />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }}
                className={`${styles.toolbarItem} ${styles.spaced} ${isUnderline ? styles.active : ""}`}
                aria-label="Format Underline"
            >
                <i className={`${styles.format} ${styles.underline}`} />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.dispatchCommand(
                        FORMAT_TEXT_COMMAND,
                        "strikethrough",
                    );
                }}
                className={`${styles.toolbarItem} ${styles.spaced} ${isStrikethrough ? styles.active : ""}`}
                aria-label="Format Strikethrough"
            >
                <i className={`${styles.format} ${styles.strikethrough}`} />
            </button>
            <Divider />
            <button
                type="button"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
                }}
                className={`${styles.toolbarItem} ${styles.spaced}`}
                aria-label="Left Align"
            >
                <i className={`${styles.format} ${styles.leftAlign}`} />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
                }}
                className={`${styles.toolbarItem} ${styles.spaced}`}
                aria-label="Center Align"
            >
                <i className={`${styles.format} ${styles.centerAlign}`} />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
                }}
                className={`${styles.toolbarItem} ${styles.spaced}`}
                aria-label="Right Align"
            >
                <i className={`${styles.format} ${styles.rightAlign}`} />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
                }}
                className={`${styles.toolbarItem}`}
                aria-label="Justify Align"
            >
                <i className={`${styles.format} ${styles.justifyAlign}`} />
            </button>
        </div>
    );
}
