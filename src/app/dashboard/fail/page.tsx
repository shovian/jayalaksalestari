import DashboardPage from "./DashboardPage";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <DashboardPage userType={params.slug} />
      {/* Additional components or content specific to the dashboard */}
    </div>
  );
}
