import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project._id-BhHyP2UE.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-4xl italic",
		children: "Case not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: "text-[11px] uppercase tracking-[0.3em] underline",
		children: "Back to home"
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
