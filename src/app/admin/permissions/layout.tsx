// Force dynamic rendering for admin pages to prevent Clerk build-time errors
export const dynamic = 'force-dynamic';

export default function PermissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
