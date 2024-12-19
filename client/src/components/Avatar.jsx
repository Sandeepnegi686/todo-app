import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

export function AvatarDemo({ name }) {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}
