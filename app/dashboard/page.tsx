import { useRequireUser } from "../lib/hooks";

export default async function DashboardPage() {
  const session = await useRequireUser();
  return <h1>Hello from dashboard</h1>;
}
