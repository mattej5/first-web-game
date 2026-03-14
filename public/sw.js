if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
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
  self.define = (i, n) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[t]) return;
    let c = {};
    const r = (e) => s(e, t),
      f = { module: { uri: t }, exports: c, require: r };
    a[t] = Promise.all(i.map((e) => f[e] || r(e))).then((e) => (n(...e), c));
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
        { url: "/VinOS.png", revision: "9017edf50c9a60fed4fae9636815806f" },
        {
          url: "/_next/static/C8eEjIBiXep4i1itGiKVA/_buildManifest.js",
          revision: "03439caf0d6f1b40f0571481bca96a69",
        },
        {
          url: "/_next/static/C8eEjIBiXep4i1itGiKVA/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0b9ec2c9.5cf8ccbc07a5ad15.js",
          revision: "5cf8ccbc07a5ad15",
        },
        {
          url: "/_next/static/chunks/0ddaf06c-04f3d4da8a53389f.js",
          revision: "04f3d4da8a53389f",
        },
        {
          url: "/_next/static/chunks/135.88596ddf375f8706.js",
          revision: "88596ddf375f8706",
        },
        {
          url: "/_next/static/chunks/168-f6c0060c8499c098.js",
          revision: "f6c0060c8499c098",
        },
        {
          url: "/_next/static/chunks/224-300ea8a19f6b6394.js",
          revision: "300ea8a19f6b6394",
        },
        {
          url: "/_next/static/chunks/345-e8d6ecb328158bef.js",
          revision: "e8d6ecb328158bef",
        },
        {
          url: "/_next/static/chunks/63-a250af8fbf3a4fcb.js",
          revision: "a250af8fbf3a4fcb",
        },
        {
          url: "/_next/static/chunks/6cf54382-8fdb83ec98be01dd.js",
          revision: "8fdb83ec98be01dd",
        },
        {
          url: "/_next/static/chunks/809-375d9878a9112f8d.js",
          revision: "375d9878a9112f8d",
        },
        {
          url: "/_next/static/chunks/876-d9065fb3a50e403a.js",
          revision: "d9065fb3a50e403a",
        },
        {
          url: "/_next/static/chunks/app/(vinos-standalone)/layout-f437f79a07f71a9e.js",
          revision: "f437f79a07f71a9e",
        },
        {
          url: "/_next/static/chunks/app/(vinos-standalone)/vinos/layout-8a47efa1a53ef6a9.js",
          revision: "8a47efa1a53ef6a9",
        },
        {
          url: "/_next/static/chunks/app/(vinos-standalone)/vinos/page-153a50ff8f4a1ae8.js",
          revision: "153a50ff8f4a1ae8",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-f409621e8b8ffaa6.js",
          revision: "f409621e8b8ffaa6",
        },
        {
          url: "/_next/static/chunks/app/about/page-2b8199ef20b419ee.js",
          revision: "2b8199ef20b419ee",
        },
        {
          url: "/_next/static/chunks/app/api/post-clicks/route-f437f79a07f71a9e.js",
          revision: "f437f79a07f71a9e",
        },
        {
          url: "/_next/static/chunks/app/blog/%5Bslug%5D/page-85b9bb1864ca2f87.js",
          revision: "85b9bb1864ca2f87",
        },
        {
          url: "/_next/static/chunks/app/blog/page-9b2215681dab7b9f.js",
          revision: "9b2215681dab7b9f",
        },
        {
          url: "/_next/static/chunks/app/drive/page-c75383b8b6896abb.js",
          revision: "c75383b8b6896abb",
        },
        {
          url: "/_next/static/chunks/app/game/page-bb84ef2e5994d414.js",
          revision: "bb84ef2e5994d414",
        },
        {
          url: "/_next/static/chunks/app/history/page-f437f79a07f71a9e.js",
          revision: "f437f79a07f71a9e",
        },
        {
          url: "/_next/static/chunks/app/layout-bd8798539473f159.js",
          revision: "bd8798539473f159",
        },
        {
          url: "/_next/static/chunks/app/page-a342a3af654702e1.js",
          revision: "a342a3af654702e1",
        },
        {
          url: "/_next/static/chunks/app/palantir/page-bcb731f15660942e.js",
          revision: "bcb731f15660942e",
        },
        {
          url: "/_next/static/chunks/app/projects/page-44d73a215fd897b8.js",
          revision: "44d73a215fd897b8",
        },
        {
          url: "/_next/static/chunks/app/releases/page-f437f79a07f71a9e.js",
          revision: "f437f79a07f71a9e",
        },
        {
          url: "/_next/static/chunks/app/robots.txt/route-f437f79a07f71a9e.js",
          revision: "f437f79a07f71a9e",
        },
        {
          url: "/_next/static/chunks/app/sitemap.xml/route-f437f79a07f71a9e.js",
          revision: "f437f79a07f71a9e",
        },
        {
          url: "/_next/static/chunks/app/template-a0bef01e6ba19a02.js",
          revision: "a0bef01e6ba19a02",
        },
        {
          url: "/_next/static/chunks/ececdbdf-3eb5234621e49703.js",
          revision: "3eb5234621e49703",
        },
        {
          url: "/_next/static/chunks/fa5fb511-24437fbfbca65e0d.js",
          revision: "24437fbfbca65e0d",
        },
        {
          url: "/_next/static/chunks/framework-f1e861048df000d0.js",
          revision: "f1e861048df000d0",
        },
        {
          url: "/_next/static/chunks/main-app-7a8988ab1583a96c.js",
          revision: "7a8988ab1583a96c",
        },
        {
          url: "/_next/static/chunks/main-c182e42afaa7ccaa.js",
          revision: "c182e42afaa7ccaa",
        },
        {
          url: "/_next/static/chunks/pages/_app-32132487644434fc.js",
          revision: "32132487644434fc",
        },
        {
          url: "/_next/static/chunks/pages/_error-5450fda6d1ece6c1.js",
          revision: "5450fda6d1ece6c1",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-d6731155f1f0655f.js",
          revision: "d6731155f1f0655f",
        },
        {
          url: "/_next/static/css/194e5578b373a451.css",
          revision: "194e5578b373a451",
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
          url: "/_next/static/css/ca3b64a8977f758c.css",
          revision: "ca3b64a8977f758c",
        },
        {
          url: "/_next/static/css/f947e6fefe525823.css",
          revision: "f947e6fefe525823",
        },
        {
          url: "/_next/static/media/0e9d289c6eb42bf7-s.p.woff2",
          revision: "6a68d0af647150cb9701577064f93400",
        },
        {
          url: "/_next/static/media/3131c862d4942660-s.woff2",
          revision: "f228e29cc52b9499570eda6fe998bbbb",
        },
        {
          url: "/_next/static/media/325259dae461ae2a-s.woff2",
          revision: "8433e08f6088d84b9f68a4d17f202123",
        },
        {
          url: "/_next/static/media/6a9c36ea9dc9b36b-s.woff2",
          revision: "2ff2e1d51f89a9391b6ee71296a62a79",
        },
        {
          url: "/_next/static/media/abfec168c8990f67-s.woff2",
          revision: "f83a932e4390acc2339567f36b215614",
        },
        {
          url: "/_next/static/media/d8f3713f2c4f699b-s.woff2",
          revision: "e75b4852893cecbe4dbe49f188875755",
        },
        {
          url: "/_next/static/media/e1694c6cb47c173f-s.woff2",
          revision: "cd5cabf5b80f62cb7b59dd200d84a9d7",
        },
        {
          url: "/_next/static/media/ee40bb094c99a29a-s.p.woff2",
          revision: "acfce21e9f6eaf62a1058b502b920e06",
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
            cacheWillUpdate: function (e) {
              var a = e.response;
              return _async_to_generator(function () {
                return _ts_generator(this, function (e) {
                  return [
                    2,
                    a && "opaqueredirect" === a.type
                      ? new Response(a.body, {
                          status: 200,
                          statusText: "OK",
                          headers: a.headers,
                        })
                      : a,
                  ];
                });
              })();
            },
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
      function (e) {
        var a = e.sameOrigin,
          s = e.url.pathname;
        return !(
          !a ||
          s.startsWith("/api/auth/callback") ||
          !s.startsWith("/api/")
        );
      },
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
      function (e) {
        var a = e.request,
          s = e.url.pathname,
          i = e.sameOrigin;
        return (
          "1" === a.headers.get("RSC") &&
          "1" === a.headers.get("Next-Router-Prefetch") &&
          i &&
          !s.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var a = e.request,
          s = e.url.pathname,
          i = e.sameOrigin;
        return "1" === a.headers.get("RSC") && i && !s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var a = e.url.pathname;
        return e.sameOrigin && !a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        return !e.sameOrigin;
      },
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
