## 2024-05-24 - Skip Link implementation for Keyboard Accessibility
**Learning:** Skip links are essential for any site with top-level navigation, particularly useful for keyboard and screen reader users to bypass repetitive header elements.
**Action:** When adding skip links to Jekyll sites or generic HTML, ensure it is the first focusable element after `<body>` and links to an `id` directly on the `<main>` content container. Hide it offscreen by default and display it on focus using CSS.
