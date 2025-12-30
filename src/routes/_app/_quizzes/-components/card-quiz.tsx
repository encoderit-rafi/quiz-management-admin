import { CardContent } from "@/components/ui/card";

type TProps = {
  form_data: { id: string | number; type: string };
};

export default function CardQuiz({ form_data }: TProps) {
  console.log("👉 ~ CardQuiz ~ form_data:", form_data);
  // In a real implementation, you would fetch the quiz data here
  // For now, this is a placeholder component

  return (
    <CardContent className="space-y-4 overflow-y-auto">
      <div className="grid gap-4">
        <div>
          <div className="text-sm font-medium">Title</div>
          <div className="text-sm text-muted-foreground">Quiz Title</div>
        </div>
        <div>
          <div className="text-sm font-medium">Description</div>
          <div className="text-sm text-muted-foreground">
            Quiz description will appear here
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-2">Logo</div>
            <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Logo</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Background</div>
            <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Background</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-2">Primary Color</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md border bg-blue-500"></div>
              <span className="text-sm">#3b82f6</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Secondary Color</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md border bg-purple-500"></div>
              <span className="text-sm">#8b5cf6</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <div className="text-sm font-medium">Title</div>
          <div className="text-sm text-muted-foreground">Quiz Title</div>
        </div>
        <div>
          <div className="text-sm font-medium">Description</div>
          <div className="text-sm text-muted-foreground">
            Quiz description will appear here
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-2">Logo</div>
            <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Logo</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Background</div>
            <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Background</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-2">Primary Color</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md border bg-blue-500"></div>
              <span className="text-sm">#3b82f6</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Secondary Color</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md border bg-purple-500"></div>
              <span className="text-sm">#8b5cf6</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <div className="text-sm font-medium">Title</div>
          <div className="text-sm text-muted-foreground">Quiz Title</div>
        </div>
        <div>
          <div className="text-sm font-medium">Description</div>
          <div className="text-sm text-muted-foreground">
            Quiz description will appear here
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-2">Logo</div>
            <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Logo</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Background</div>
            <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Background</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-2">Primary Color</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md border bg-blue-500"></div>
              <span className="text-sm">#3b82f6</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Secondary Color</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md border bg-purple-500"></div>
              <span className="text-sm">#8b5cf6</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
