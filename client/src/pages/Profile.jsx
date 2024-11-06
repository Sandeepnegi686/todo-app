import { useAppContext } from "../context/appContext";

export default function Profile() {
  const { user } = useAppContext();

  return <h1>Hello {user?.name}</h1>;
}
