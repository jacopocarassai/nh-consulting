import { t as supabase } from "./client-DVjYtJQd.mjs";
import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { M as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project._id-DnlFTd4I.js
function projectQuery(id) {
	return queryOptions({
		queryKey: ["case_study", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("case_studies").select("id,title,sector,summary,image_url,external_url,context,role,content,results,client_list,year,sort_order").eq("id", id).eq("published", true).maybeSingle();
			if (error) throw error;
			if (!data) throw notFound();
			return data;
		}
	});
}
var $$splitNotFoundComponentImporter = () => import("./project._id-BhHyP2UE.mjs");
var $$splitComponentImporter = () => import("./project._id-BwqQsabt.mjs");
var Route = createFileRoute("/project/$id")({
	loader: ({ params, context }) => context.queryClient.ensureQueryData(projectQuery(params.id)),
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.title} — Case · NH Consulting` : "Case · NH Consulting" }, loaderData?.summary ? {
		name: "description",
		content: loaderData.summary
	} : {
		name: "description",
		content: "Case study from NH Consulting."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { projectQuery as n, Route as t };
