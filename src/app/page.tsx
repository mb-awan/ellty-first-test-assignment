import PageSelector from "@/components/ui/PageSelector";

export const metadata = {
  description:
    'ellty-first-test-assignment - assignment for ellty job application',
  title: 'ellty-first-test-assignment',
};

export default function Index() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <PageSelector />
    </main>
  );
}
