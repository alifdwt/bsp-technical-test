import { Breadcrumbs } from "@/components/layout/PageBreadcrumb";

type Props = {
  params: {
    catchAll: string[];
  };
};
export default function BreadcrumbSlot({ params: { catchAll } }: Props) {
  //   console.log("rendering in @breadcrumbs", catchAll);

  return <Breadcrumbs routes={catchAll} />;
}
