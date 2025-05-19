import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

export function TestimonialCard({
  quote,
  name,
  title,
  avatar,
}: TestimonialCardProps) {
  return (
    <Card className="bg-background/50 border-border/50 shadow-lg">
      <CardContent className="pt-6">
        <div className="mb-6 flex justify-center">
          <div className="bg-[#00C2FF]/10 h-10 w-10 rounded-full flex items-center justify-center">
            <Quote className="h-5 w-5 text-[#00C2FF]" />
          </div>
        </div>
        <blockquote className="text-center text-lg italic text-muted-foreground mb-6">
          &quot;{quote}&quot;
        </blockquote>
      </CardContent>
      <CardFooter className="flex flex-col items-center border-t border-border/20 pt-6">
        <Avatar className="h-16 w-16 mb-4 border-2 border-[#00C2FF]/30">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
