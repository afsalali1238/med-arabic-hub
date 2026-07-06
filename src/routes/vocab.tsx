import { createFileRoute } from "@tanstack/react-router";
import { VocabBankView } from "@/components/course/VocabBankView";
import { useCourseProgress } from "@/hooks/useCourseProgress";

export const Route = createFileRoute("/vocab")({
  component: VocabRoute,
});

function VocabRoute() {
  const { progress, addVocab, removeVocab, updateVocab, reviewVocab } = useCourseProgress();

  return (
    <VocabBankView
      entries={progress.vocabBank}
      onAdd={addVocab}
      onRemove={removeVocab}
      onUpdate={updateVocab}
      onReview={reviewVocab}
    />
  );
}
