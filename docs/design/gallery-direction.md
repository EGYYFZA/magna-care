# Magna Care — circular product gallery

This direction supersedes the editorial landing-page concept in `research-and-direction.md`.

## Requested result

- One viewport on Home, all products in a circular 3D gallery, minimal copy.
- Match AVEA's white canvas, sparse header, horizontal ring, perspective, drag/wheel inertia, and snapping. Brand becomes an original geometric Magna Care wordmark.
- Clearly visible navigation, including mobile. Selection, product details, and adding to the bag work without leaving Home.
- Existing cart, prices, IDs, and non-Home routes remain functional.

## Reference observations

Reference: [AVEA](https://avea.studio/). Inspected the public rendered interface, motion behavior, styles and DOM; application code was written separately.

| Element | Observation | Magna Care implementation |
| --- | --- | --- |
| Composition | One white viewport; small logo/navigation; artwork at the vertical center. | Original Magna Care wordmark, always-visible menus, centered product ring, small metadata. |
| Geometry | Square planes arranged around a vertical cylinder, with the front plane at the reference depth. | Three.js scene, perspective camera, sine/cosine positions and Y rotations; 270px desktop front panel. |
| Depth | Side panels narrow with perspective; rear panels become smaller and have readable facing images. | True CSS3D matrices and corrected rear-panel X scale. |
| Input | Drag and wheel rotate the ring; drag introduces a small tilt. | Mouse and touch input, small clamped X tilt, release momentum and wheel normalization. |
| Settling | Rotation slows and aligns to a selected card. | Time-based damping and angular snap; successive commands are retained during movement. |
| Selection | An inactive panel moves forward; the selected panel opens its content. | Center a panel, open its native product dialog, or add the selected item directly to the bag. |
| Responsive layout | Ring dimensions and interface spacing change with the viewport. | Separate mobile camera/card/radius sizing; compact landscape controls and same-page product list. |

Inspected AVEA's rendered DOM, public styles and motion behavior on 25 October 2026. The gallery has no canvas: native project links receive perspective/rotateY/translateZ transforms. Observed desktop cards are 270px square, perspective 1600px; radius varies with viewport. The ring translates backwards by its radius so the front card remains at the reference plane. Rear images are corrected to remain readable. Drag permits slight vertical tilt; wheel input is debounced into a snapped position. Selection updates sparse metadata; no constant autoplay was observed. Screenshots: `avea-desktop-motion-reference.png` and `avea-desktop-after-wheel.png`. Public reference code/assets are not copied into the application.

Implementation uses the MIT-licensed Three.js CSS3DRenderer, PerspectiveCamera and scene objects, with original input handling. Native buttons/images remain keyboard accessible. This follows the reference's DOM-based approach and does not require WebGL. Three.js docs: https://threejs.org/docs/pages/CSS3DRenderer.html .

The current catalog has three unique products. Each has two visual panels to close the loop; duplicates are excluded from keyboard/screen-reader navigation. Product totals remain three. No extra products or prices are invented.

## Checkable acceptance

1. Home has no vertical page scroll at 1440×900 and 390×844; no hero/articles/large footer.
2. Three unique products are reachable through the ring and previous/next controls. Repeated panels do not create duplicate cart entries.
3. DOM transforms contain genuine matrix3d perspective and different depths; wheel/drag/arrow inputs change orientation and settle on a product.
4. Motion stops when settled or backgrounded. Reduced motion disables easing/inertial animation while preserving explicit controls.
5. Product detail opens in a native dialog, Escape closes it, focus returns, and add updates the existing persistent cart.
6. Header menus remain visible on mobile. An optional product list stays on the same Home route.
7. Build, lint and regression tests pass; screenshots of default, rotated and mobile states are inspected against the reference.
8. The separate product-name picker and exploration hint are removed. Only the selected product type appears above centered shopping buttons, with centered gallery controls underneath on desktop and mobile.

Verified implementation: `browser-checks.json` records browser checks for emulated touch swipe, pointer holds, rapid repeated arrow commands, native dialog reopen/Escape, storage/image failures, and 844×390 landscape. `accessibility-checks.json` records sampled contrast and direct focus/centering of all three original cards. Existing catalog/cart regression coverage was retained; obsolete editorial-section/menu-toggle assertions were replaced with the requested gallery behavior checks. The Three.js renderer stops scheduling frames when settled and pauses when the document is hidden; it is cleaned up when leaving Home.

Loop Design Check: this is a one-off implementation, so its “do not build a loop for a one-off task” gate applies. No autonomous agent loop, scheduled task or automatic deployment is introduced. These behavior checks assess implementation; visual acceptance remains with the user. No test pass is presented as proof of a pixel-identical clone.
