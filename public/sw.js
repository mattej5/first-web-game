if (!self.define) {
  let e,
    a = {};
  const s = (s, c) => (
    (s = new URL(s + ".js", c).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          ((e.src = s), (e.onload = a), document.head.appendChild(e));
        } else ((e = s), importScripts(s), a());
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[n]) return;
    let t = {};
    const r = (e) => s(e, n),
      o = { module: { uri: n }, exports: t, require: r };
    a[n] = Promise.all(c.map((e) => o[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(["./workbox-3c9d0171"], function (e) {
  "use strict";
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/1000006244_20231215090339.jpg",
          revision: "1e7e194743357c0a6c90d2efedaf134b",
        },
        {
          url: "/20230805_120352.jpg",
          revision: "5f147c56fcb26c147ba6a8b187660f58",
        },
        {
          url: "/20231014_103403.jpg",
          revision: "5fcaa7e000d423a39e6f3fd7a60cd971",
        },
        {
          url: "/20231206_195628.jpg",
          revision: "db668875072908d7a339cefe03b8add9",
        },
        {
          url: "/20240410_172039.jpg",
          revision: "838e3aedbd691c4c4432bed9385454b4",
        },
        {
          url: "/20250628_205236.jpg",
          revision: "bc221a76c65ebab1bd475922f2936c17",
        },
        { url: "/IMG_1721.jpeg", revision: "9570f4240ff442d1069c3d068fbdc025" },
        {
          url: "/IMG_20230814_170609_01.jpg",
          revision: "a43bf86b5e69fc75c6be7f1766a89fc3",
        },
        {
          url: "/Moab_Wedding-592.jpg",
          revision: "777e62d94ec61e78efc4fc6532abecb1",
        },
        {
          url: "/Palantir Resume.pdf",
          revision: "3b818caff57017b9eceec559e2825448",
        },
        { url: "/VinOS.png", revision: "9017edf50c9a60fed4fae9636815806f" },
        {
          url: "/_next/static/chunks/0b9ec2c9.e7a53c2e35fc3106.js",
          revision: "e7a53c2e35fc3106",
        },
        {
          url: "/_next/static/chunks/2073-b700580a9b664d16.js",
          revision: "b700580a9b664d16",
        },
        {
          url: "/_next/static/chunks/3038.09b054a448f57b6e.js",
          revision: "09b054a448f57b6e",
        },
        {
          url: "/_next/static/chunks/32-a89f9ec07de413da.js",
          revision: "a89f9ec07de413da",
        },
        {
          url: "/_next/static/chunks/474f1956-8c8b449ef6f7eefe.js",
          revision: "8c8b449ef6f7eefe",
        },
        {
          url: "/_next/static/chunks/5663281c-00a5aedc03e02c38.js",
          revision: "00a5aedc03e02c38",
        },
        {
          url: "/_next/static/chunks/5733-28b530be8cea63d3.js",
          revision: "28b530be8cea63d3",
        },
        {
          url: "/_next/static/chunks/5908-20d37d89fa183722.js",
          revision: "20d37d89fa183722",
        },
        {
          url: "/_next/static/chunks/74c6194b-3c747ba96eb2ff1d.js",
          revision: "3c747ba96eb2ff1d",
        },
        {
          url: "/_next/static/chunks/app/(vinos-standalone)/layout-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/(vinos-standalone)/vinos/layout-fb7e33cf2f071727.js",
          revision: "fb7e33cf2f071727",
        },
        {
          url: "/_next/static/chunks/app/(vinos-standalone)/vinos/page-1c640e171ae81dbd.js",
          revision: "1c640e171ae81dbd",
        },
        {
          url: "/_next/static/chunks/app/_global-error/page-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-3d0fdfe284539103.js",
          revision: "3d0fdfe284539103",
        },
        {
          url: "/_next/static/chunks/app/about/page-49a979cbc789fea2.js",
          revision: "49a979cbc789fea2",
        },
        {
          url: "/_next/static/chunks/app/api/ask/route-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/api/events/route-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/api/now/route-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/api/post-clicks/route-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/blog/%5Bslug%5D/page-863bec73d258467d.js",
          revision: "863bec73d258467d",
        },
        {
          url: "/_next/static/chunks/app/blog/page-d266bfef6bdf6a01.js",
          revision: "d266bfef6bdf6a01",
        },
        {
          url: "/_next/static/chunks/app/drive/page-d2d1c9d9143b494d.js",
          revision: "d2d1c9d9143b494d",
        },
        {
          url: "/_next/static/chunks/app/game/page-c96bad89ca444aca.js",
          revision: "c96bad89ca444aca",
        },
        {
          url: "/_next/static/chunks/app/history/page-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/layout-7e46adfe72805188.js",
          revision: "7e46adfe72805188",
        },
        {
          url: "/_next/static/chunks/app/llms-full.txt/route-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/llms.txt/route-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/md/blog/%5Bslug%5D/route-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/page-fe8376bbfb17ae25.js",
          revision: "fe8376bbfb17ae25",
        },
        {
          url: "/_next/static/chunks/app/palantir/page-3fa37d2fb0535bff.js",
          revision: "3fa37d2fb0535bff",
        },
        {
          url: "/_next/static/chunks/app/plan/page-9d4544c9d8e54aad.js",
          revision: "9d4544c9d8e54aad",
        },
        {
          url: "/_next/static/chunks/app/projects/page-4124b245b6bd413f.js",
          revision: "4124b245b6bd413f",
        },
        {
          url: "/_next/static/chunks/app/releases/page-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/robots.txt/route-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/sitemap.xml/route-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/app/template-3266c44da45a461f.js",
          revision: "3266c44da45a461f",
        },
        {
          url: "/_next/static/chunks/cf9287bb-4d1978dc5bf7d95c.js",
          revision: "4d1978dc5bf7d95c",
        },
        {
          url: "/_next/static/chunks/e95ed160-8e253e9e8d3295fc.js",
          revision: "8e253e9e8d3295fc",
        },
        {
          url: "/_next/static/chunks/e9a6067a-a32379d66c457192.js",
          revision: "a32379d66c457192",
        },
        {
          url: "/_next/static/chunks/framework-e37a5153b0163de7.js",
          revision: "e37a5153b0163de7",
        },
        {
          url: "/_next/static/chunks/main-app-06b58b2b7fd704ed.js",
          revision: "06b58b2b7fd704ed",
        },
        {
          url: "/_next/static/chunks/main-f03936a6086e9665.js",
          revision: "f03936a6086e9665",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/app-error-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/forbidden-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/global-error-a501e9a2334b083d.js",
          revision: "a501e9a2334b083d",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/not-found-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/unauthorized-451b8c6cc0a66c7b.js",
          revision: "451b8c6cc0a66c7b",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-4125b1dfb57e3b17.js",
          revision: "4125b1dfb57e3b17",
        },
        {
          url: "/_next/static/css/2d830316ce32d000.css",
          revision: "2d830316ce32d000",
        },
        {
          url: "/_next/static/css/5b8c6768d6b327f9.css",
          revision: "5b8c6768d6b327f9",
        },
        {
          url: "/_next/static/css/b86b23ba84a1894d.css",
          revision: "b86b23ba84a1894d",
        },
        {
          url: "/_next/static/css/ea3530c7c493c841.css",
          revision: "ea3530c7c493c841",
        },
        {
          url: "/_next/static/dCKVR9JFrtDBjTXeQIL9E/_buildManifest.js",
          revision: "26442023427aa51dd202fb65dfa35197",
        },
        {
          url: "/_next/static/dCKVR9JFrtDBjTXeQIL9E/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/ai-writes-a-story/Eliot_and_Zelda_Set_Permissions.png",
          revision: "53c6ad61dbd7e7ca3017ea5272c71f3d",
        },
        {
          url: "/ai-writes-a-story/Eliot_and_Zelda_say_goodbye.png",
          revision: "00a47d07a72b8c743e809915dfe3241b",
        },
        {
          url: "/ai-writes-a-story/Eliot_in_a_newfound_sheikah_world.png",
          revision: "36ebf2463ee1e7b73e52e748671165f9",
        },
        {
          url: "/ai-writes-a-story/Elliot_awakens_to_his_new_creation.png",
          revision: "6fa8c81dce5f97a7fb54ab8dad15506e",
        },
        {
          url: "/ai-writes-a-story/Zelda_appears_in_the_real_world.png",
          revision: "90e65144d37803fb36d680acaa09ab15",
        },
        {
          url: "/ai-writes-a-story/Zelda_meets_the_friends.png",
          revision: "7d92bc24565b2cdbb751a45ada27a56e",
        },
        {
          url: "/ai-writes-a-story/Zelda_reassures_Eliot.png",
          revision: "b8982fba7f63606f7719977def344b38",
        },
        {
          url: "/ai-writes-a-story/chapter_2.png",
          revision: "b8e6ef48db5313c1b60057c6ca02348f",
        },
        {
          url: "/ai-writes-a-story/cover_art.png",
          revision: "65fdec0ad865c77eb9ce0fbfe1d9ce87",
        },
        {
          url: "/badges/aws-is.png",
          revision: "b2184056c3998ab90a2c57441bcef924",
        },
        {
          url: "/badges/byu-data-eng.png",
          revision: "90bb5c6d5760174589c358042a5312a7",
        },
        {
          url: "/badges/dev-track.png",
          revision: "1b146520cc9dbf14c4bf526b39f1f877",
        },
        {
          url: "/badges/intex-i.png",
          revision: "bfa819517900965841e4305c4afca1c7",
        },
        {
          url: "/badges/intex-ii.png",
          revision: "ddc736395dd75337f4d4f9588629ff8b",
        },
        {
          url: "/badges/security-track.png",
          revision: "39299c0b74213e0cb38c9621c01ad0e0",
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        { url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
        {
          url: "/happy_android_no_bg.png",
          revision: "4ab92d17b883c301dbb1a520f370ef79",
        },
        {
          url: "/headshot_IS_square.jpg",
          revision: "05632ab7bf2d854fa3f1d6b7d7577b6a",
        },
        {
          url: "/logos/ey-logo.jpg",
          revision: "76a03f394efe48cf79ecb5057f43dde3",
        },
        {
          url: "/logos/leland.avif",
          revision: "a11aa35d987403042d0a0b0625f0526a",
        },
        {
          url: "/logos/sandbox.avif",
          revision: "b1afe07e1fa8e55c9e8bf76607b45821",
        },
        {
          url: "/logos/sandbox.jpeg",
          revision: "3137428dfc63e842102519fd643c0921",
        },
        {
          url: "/lumen-marketplace-images/bottom_dashboard.png",
          revision: "4f3de1c377d35a89f203a4e8793e7577",
        },
        {
          url: "/lumen-marketplace-images/class_management.png",
          revision: "d89d37d5f8af94269245c00b260596ee",
        },
        {
          url: "/lumen-marketplace-images/goal_management.png",
          revision: "9793a4c703c6499b1bb14a2c1161f5fa",
        },
        {
          url: "/lumen-marketplace-images/goal_submissions.png",
          revision: "fced313c4dd05cb5a443e6683d2c5315",
        },
        {
          url: "/lumen-marketplace-images/prize_management.png",
          revision: "2f41f01757c99180fa13ee1f6dced4a2",
        },
        {
          url: "/lumen-marketplace-images/student_dashboard.png",
          revision: "51d13b878c5722fb1a7124be98b9e0c1",
        },
        {
          url: "/lumen-marketplace-images/student_dashboard_bottom.png",
          revision: "3c7291fa8d4e54bef6c11d1a8aced02d",
        },
        {
          url: "/lumen-marketplace-images/student_management.png",
          revision: "c300848691962355f566e3e0fcda8fbe",
        },
        {
          url: "/lumen-marketplace-images/teacher_dashboard.png",
          revision: "abcbb3315bf5dd1e6d7ec0b8a9b82a4a",
        },
        { url: "/manifest.json", revision: "501522c04f2bfc1ec75ae6d6f1e9739d" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        {
          url: "/seattle_photos/bridge_to_plymouth_vancouver.jpg",
          revision: "d784d56a500f4d9ea0758f8df79a4696",
        },
        {
          url: "/seattle_photos/ey_entrance.jpg",
          revision: "6361f76a608783e5cf499ac31c0e145b",
        },
        {
          url: "/seattle_photos/matt_rachel_cake_donuts.jpg",
          revision: "4d1faa16894259e489cb628fcb8f77a8",
        },
        {
          url: "/seattle_photos/matt_rachel_olympic_park_mountain.jpg",
          revision: "9cdeebcffcc06e4c1ad2e7567f5148b1",
        },
        {
          url: "/seattle_photos/matt_rachel_pioneer_square.jpg",
          revision: "15be18ff47688e4732e8cd27acb6c1d7",
        },
        {
          url: "/seattle_photos/matt_rachel_puget_sunset.jpg",
          revision: "101a4231c2b1f2c0db6f69e35b824db7",
        },
        {
          url: "/seattle_photos/matt_rachel_waterfall_portrait.jpg",
          revision: "44be8f58c081f39ab350244026d65251",
        },
        {
          url: "/seattle_photos/matt_with_pizza_slice.jpg",
          revision: "f9b600d242e5117468514aa57cc4bf41",
        },
        {
          url: "/seattle_photos/rachel_macrophoto_flower.jpg",
          revision: "4411a6d7ae19b4211ce36bdf7ecea90b",
        },
        {
          url: "/seattle_photos/rachel_mountain_thru_trees.jpg",
          revision: "ab359835f6c877d1d2afe8ac3e7725c1",
        },
        {
          url: "/seattle_photos/seattle_temple_backside.jpg",
          revision: "8ee289ef8a49c090fa7efb43bcacec4d",
        },
        {
          url: "/stuV1.0/approve-grad-plans-list.png",
          revision: "722b30f21e6d4290f72e926d649bd124",
        },
        {
          url: "/stuV1.0/approve-grad-plans-single.png",
          revision: "db04719090d71eed511db1b6fadcd650",
        },
        {
          url: "/stuV1.0/create-new-plan.png",
          revision: "b71063042b731a9d6403b3202c113af1",
        },
        {
          url: "/stuV1.0/edit-grad-plan.png",
          revision: "8818ccfae82862897ef52dbc88784c28",
        },
        {
          url: "/stuV1.0/edit-profile.png",
          revision: "1c5bdcab14752756dc984dddf64358ba",
        },
        {
          url: "/stuV1.0/view-active-grad-plan.png",
          revision: "32f66238a499fb3947c6bbc0c715b6b3",
        },
        { url: "/vercel.svg", revision: "c0af2f507b369b085b35ef4bbe3bcf1e" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: a } }) =>
        !(!e || a.startsWith("/api/auth/callback") || !a.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        s &&
        !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") && s && !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: a }) => a && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    ));
});
