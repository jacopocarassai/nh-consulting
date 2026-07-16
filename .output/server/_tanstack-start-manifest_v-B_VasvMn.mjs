//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-B_VasvMn.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/Users/jacopo.carassai/nh-consultancy/nh-consulting/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/project/$id"
		],
		preloads: ["/assets/index-DkXpRsiT.js", "/assets/useRouter-Cox3-v4z.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-DkXpRsiT.js"
		} }]
	},
	"/": {
		filePath: "/Users/jacopo.carassai/nh-consultancy/nh-consulting/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-Ck6SCiQi.js",
			"/assets/useQuery-ux2VJ1J3.js",
			"/assets/case-3-RES7DCl7.js"
		]
	},
	"/_authenticated": {
		filePath: "/Users/jacopo.carassai/nh-consultancy/nh-consulting/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-C02KwEUG.js"]
	},
	"/auth": {
		filePath: "/Users/jacopo.carassai/nh-consultancy/nh-consulting/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-9S6rkQhw.js"]
	},
	"/_authenticated/admin": {
		filePath: "/Users/jacopo.carassai/nh-consultancy/nh-consulting/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: ["/assets/admin-C0VXsCLa.js", "/assets/useQuery-ux2VJ1J3.js"]
	},
	"/project/$id": {
		filePath: "/Users/jacopo.carassai/nh-consultancy/nh-consulting/src/routes/project.$id.tsx",
		children: void 0,
		preloads: [
			"/assets/project._id-B0j7KnFe.js",
			"/assets/project._id-DsVox8fi.js",
			"/assets/useBaseQuery-DHTKFtCZ.js",
			"/assets/case-3-RES7DCl7.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
