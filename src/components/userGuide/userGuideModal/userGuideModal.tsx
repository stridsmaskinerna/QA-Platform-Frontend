import { Modal } from "../../modal";
import { UserGuide } from "../userGuide";
import { useQuestionCards } from "../hooks";

interface IInfoModalProps {
    open: boolean;
    onToggle: () => void;
}

export function UserGuideModal({ open, onToggle }: IInfoModalProps) {
    const questionCards = useQuestionCards();

    return (
        <>
            {open && (
                <Modal
                    title={""}
                    message={<UserGuide questionCards={questionCards.all} />}
                    okClick={() => {
                        onToggle();
                    }}
                    onBackdropClick={() => {
                        onToggle();
                    }}
                />
            )}
        </>
    );
}
