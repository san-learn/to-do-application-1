import { cn } from "@/lib/utils";

type NotificationProps = {
  isError?: boolean;
  message: string;
};

export function Notification({ message, isError = false }: NotificationProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={cn(
          "px-4 py-3 rounded-lg shadow-md",
          isError
            ? "bg-red-100 border border-red-400 text-red-700"
            : "bg-green-100 border border-green-400 text-green-700"
        )}
      >
        {message}
      </div>
    </div>
  );
}
