import styles from "./RichTextShared.module.css";

export default {
    code: styles.editorCode,
    heading: {
        h1: styles.editorHeadingH1,
        h2: styles.editorHeadingH2,
        h3: styles.editorHeadingH3,
        h4: styles.editorHeadingH4,
        h5: styles.editorHeadingH5,
    },
    image: styles.editorImage,
    link: styles.editorLink,
    list: {
        listitem: styles.editorListitem,
        nested: {
            listitem: styles.editorNestedNistitem,
        },
        ol: styles.editorListOl,
        ul: styles.editorListUl,
    },
    ltr: styles.ltr,
    paragraph: styles.editorParagraph,
    placeholder: styles.editorPlaceholder,
    quote: styles.editorQuote,
    rtl: styles.rtl,
    text: {
        bold: styles.editorTextBold,
        code: styles.editorTextCode,
        hashtag: styles.editorTextHashtag,
        italic: styles.editorTextItalic,
        overflowed: styles.editorTextOverflowed,
        strikethrough: styles.editorTextStrikethrough,
        underline: styles.editorTextUnderline,
        underlineStrikethrough: styles.editorTextUnderlineStrikethrough,
    },
};
