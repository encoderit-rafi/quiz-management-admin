import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FormQuestion } from "./form-question";
import type { TQuestionSchema, TQuizQuestionsSchema } from "../-types";

interface FormQuizQuestionsProps {
  initialData?: { questions: TQuestionSchema[] };
  onSubmit: (data: TQuizQuestionsSchema) => void;
  onCancel: () => void; // Used for "Back" navigation
  isLoading?: boolean;
}

export const FormQuizQuestions = ({
  initialData,
  onSubmit,
  // onCancel, // Keeps the back button functionality
  // isLoading,
}: FormQuizQuestionsProps) => {
  const [questions, setQuestions] = useState<TQuestionSchema[]>(
    initialData?.questions || []
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  // Sync internal state if initialData changes (e.g. refetch)
  // useEffect(() => {
  //   if (initialData?.questions) {
  //     setQuestions(initialData.questions);
  //   }
  // }, [initialData]);

  // Handle Create/Update Question
  const handleSaveQuestion = (data: TQuestionSchema) => {
    let newQuestions = [...questions];
    if (editingIndex !== null) {
      newQuestions[editingIndex] = data;
    } else {
      newQuestions.push(data);
    }
    setQuestions(newQuestions);
    setEditingIndex(null);
    setIsDialogOpen(false);

    // Call API immediately
    onSubmit({ questions: newQuestions });
  };

  const handleDeleteQuestion = () => {
    if (deletingIndex !== null) {
      const newQuestions = questions.filter((_, i) => i !== deletingIndex);
      setQuestions(newQuestions);
      setDeletingIndex(null);

      // Call API immediately
      onSubmit({ questions: newQuestions });
    }
  };

  const openCreateDialog = () => {
    setEditingIndex(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (index: number) => {
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  return (
    <>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-6 gap-6">
        {/* <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Questions List</h3>
            <p className="text-sm text-muted-foreground">
              Manage all questions for this quiz.
            </p>
          </div>
        </div> */}
        <Button onClick={openCreateDialog} className="w-fit">
          <Plus className="mr-2 h-4 w-4" /> Add Question
        </Button>

        <div className="flex-1 overflow-y-auto border rounded-lg">
          {questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-muted-foreground gap-2">
              <p>No questions added yet.</p>
              <Button variant="outline" onClick={openCreateDialog}>
                Add your first question
              </Button>
            </div>
          ) : (
            <Accordion type="multiple" className="w-full">
              {questions.map((question, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="px-4 border-b last:border-0"
                >
                  <div className="flex items-center gap-4 py-4">
                    <AccordionTrigger className="hover:no-underline py-0 flex-1">
                      <span className="flex items-center gap-2 text-left">
                        <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">
                          {index + 1}
                        </span>
                        <span className="font-medium line-clamp-1">
                          {question.name}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="mr-2">
                        {question.options.length} Options
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditDialog(index)}
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeletingIndex(index)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <AccordionContent className="pk-4 pb-4">
                    <div className="pl-8 space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Options
                      </div>
                      <div className="grid gap-2">
                        {question.options.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className="flex items-center justify-between p-2 rounded-md bg-muted/30"
                          >
                            <span className="text-sm">{option.label}</span>
                            <Badge
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {option.points} pts
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? "Edit Question" : "Add Question"}
            </DialogTitle>
          </DialogHeader>
          <FormQuestion
            initialData={
              editingIndex !== null ? questions[editingIndex] : undefined
            }
            onSubmit={handleSaveQuestion}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deletingIndex !== null}
        onOpenChange={(open) => !open && setDeletingIndex(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the question and its options.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteQuestion}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
