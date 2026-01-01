import { useFieldArray, useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { QuestionSchema, type TQuestionSchema } from "../-types";
import { FormInput } from "@/components/form";
import { Plus, Trash2 } from "lucide-react";

interface FormQuestionProps {
  initialData?: TQuestionSchema;
  onSubmit: (data: TQuestionSchema) => void;
  onCancel: () => void;
}

export const FormQuestion = ({
  initialData,
  onSubmit,
  onCancel,
}: FormQuestionProps) => {
  const form = useForm<TQuestionSchema>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: initialData || {
      name: "",
      options: [{ label: "", points: 0 }],
    },
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const handleFormSubmit = (data: TQuestionSchema) => {
    // Ensure points are numbers
    const processedData = {
      ...data,
      options: data.options.map((o) => ({
        ...o,
        points: Number(o.points),
      })),
    };
    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormInput
        name="name"
        control={control}
        label="Question Name"
        placeholder="Enter question"
      />

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

        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <div className="flex-1">
                <FormInput
                  name={`options.${index}.label`}
                  control={control}
                  placeholder="Option label"
                />
              </div>
              <div className="w-24">
                <FormInput
                  name={`options.${index}.points`}
                  control={control}
                  type="number"
                  placeholder="Pts"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
