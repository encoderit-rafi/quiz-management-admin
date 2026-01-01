import { useFieldArray, useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { QuizQuestionsSchema, type TQuizQuestionsSchema } from "../-types";
import { FormInput } from "@/components/form";
import { CardAction, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface FormQuizQuestionsProps {
  initialData?: any;
  onSubmit: (data: TQuizQuestionsSchema) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const QuestionField = ({
  questionIndex,
  control,
  removeQuestion,
}: {
  questionIndex: number;
  control: Control<TQuizQuestionsSchema>;
  removeQuestion: (index: number) => void;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options` as const,
  });

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-muted/10 relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => removeQuestion(questionIndex)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <div className="grid grid-cols-1 gap-4">
        <FormInput
          name={`questions.${questionIndex}.name`}
          control={control}
          label={`Question ${questionIndex + 1}`}
          placeholder="Enter question name"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Options</label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ label: "", points: 0 })}
          >
            <Plus className="h-3 w-3 mr-1" /> Add Option
          </Button>
        </div>

        <div className="space-y-2">
          {fields.map((field, optionIndex) => (
            <div key={field.id} className="flex gap-2 items-start">
              <div className="flex-1">
                <FormInput
                  name={`questions.${questionIndex}.options.${optionIndex}.label`}
                  control={control}
                  placeholder="Option label"
                />
              </div>
              <div className="w-24">
                <FormInput
                  name={`questions.${questionIndex}.options.${optionIndex}.points`}
                  control={control}
                  type="number"
                  placeholder="Points"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => remove(optionIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FormQuizQuestions = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: FormQuizQuestionsProps) => {
  const form = useForm<TQuizQuestionsSchema>({
    resolver: zodResolver(QuizQuestionsSchema),
    defaultValues: {
      questions: initialData?.questions || [],
    },
  });

  const { control, handleSubmit } = form;

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const handleFormSubmit = (data: TQuizQuestionsSchema) => {
    // Ensure points are numbers
    const processedData = {
      questions: data.questions.map((q) => ({
        ...q,
        options: q.options.map((o) => ({
          ...o,
          points: Number(o.points),
        })),
      })),
    };
    onSubmit(processedData);
  };

  return (
    <>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6 flex-1 overflow-y-auto pr-2"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Build your quiz by adding questions and their options.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendQuestion({
                    name: "",
                    options: [{ label: "", points: 0 }],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" /> Add Question
              </Button>
            </div>

            <div className="space-y-6">
              {questionFields.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                  No questions added yet. Click "Add Question" to start.
                </div>
              )}
              {questionFields.map((field, index) => (
                <QuestionField
                  key={field.id}
                  questionIndex={index}
                  control={control}
                  removeQuestion={removeQuestion}
                />
              ))}
            </div>
          </div>
        </form>
        <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-w-36"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="min-w-36"
            onClick={handleSubmit(handleFormSubmit)}
            loading={isLoading}
          >
            Save Questions
          </Button>
        </CardAction>
      </CardContent>
    </>
  );
};
