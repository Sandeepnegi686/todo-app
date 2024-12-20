import { useAppContext } from "@/context/appContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

export function AvatarDemo({ name }) {
  const { user } = useAppContext();

  // console.log(user);

  return (
    <Avatar>
      <AvatarImage src={user?.profileImg} alt="icon" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}
