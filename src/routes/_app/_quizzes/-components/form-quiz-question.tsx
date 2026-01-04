import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  FormQuizQuestionSchema,
  type TFormQuizQuestionSchema,
} from "../-types";
import { FormInput } from "@/components/form";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { TFormType } from "@/types";
import { CardAction, CardContent } from "@/components/ui/card";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TProps = {
  type: TFormType;
  id: string | number;
};

type SortableOptionProps = {
  id: string;
  index: number;
  control: any;
  onRemove: () => void;
};

function SortableOption({ id, index, control, onRemove }: SortableOptionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2 items-start">
      {/* Drag Handle */}
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded mt-1"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>

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
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function FormQuizQuestion({ type, id }: TProps) {
  console.log("👉 ~ FormQuizQuestion ~ type, id:", type, id);
  const form = useForm<TFormQuizQuestionSchema>({
    resolver: zodResolver(FormQuizQuestionSchema),
    defaultValues: {
      name: "",
      options: [{ label: "", points: 0 }],
    },
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "options",
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);

    move(oldIndex, newIndex);
  };

  const onSubmit = (data: TFormQuizQuestionSchema) => {
    // Ensure points are numbers
    const processedData = {
      ...data,
      options: data.options.map((o) => ({
        ...o,
        points: Number(o.points),
      })),
    };
    console.log("👉 ~ onSubmit ~ processedData:", processedData);
  };

  return (
    <CardContent className="flex-1 flex flex-col overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex-1 overflow-y-auto p-1 pr-4"
      >
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
            <DndContext
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
            >
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <SortableOption
                    key={field.id}
                    id={field.id}
                    index={index}
                    control={control}
                    onRemove={() => remove(index)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </form>
      <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
        <Button
          type="button"
          className="min-w-36"
          onClick={handleSubmit(onSubmit)}
          // loading={isPendingCreate || isPendingUpdate}
        >
          {type === "update" ? "Update" : "Create"}
        </Button>
      </CardAction>
    </CardContent>
  );
}
