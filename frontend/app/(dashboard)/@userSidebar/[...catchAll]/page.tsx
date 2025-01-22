import { NavUser } from "@/components/navigation/nav-user";
import { getSession } from "@/lib/auth/session";

export default async function NavUser1() {
  const session = await getSession();

  return <NavUser session={session} />;
}
