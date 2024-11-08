import { useParams } from "next/navigation";

export function ProvisionUserIdPage() {
  const params = useParams();
  const { provisionUserId } = params;
  return <div>signup email resend [provisionUserId] page</div>;
}
