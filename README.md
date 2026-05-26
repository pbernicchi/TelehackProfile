# TelehackProfile

Assets for [pbernicc's Telehack profile](https://telehack.com/u/pbernicc), rendered as a NeXT N4000A MegaPixel Display.

## How it works

`loader.js` is loaded via a `<script src>` in the Telehack profile (set with the `refer` command in-game). It:

1. Injects `pbernicc.css` into the page head
2. Clones the existing `<pre>` profile content
3. Rebuilds the page body as a NeXT N4000A monitor — real studio photo with transparent background and CRT screen hole cut out
4. Wraps the content in a NeXTSTEP Terminal.app window (dark titlebar, square beveled buttons, scrollable body)
5. Adds a draggable brightness knob mapped to the physical knob area in the photo

## Assets

| File | Purpose |
|---|---|
| `loader.js` | Entry point — injected into telehack.com/u/pbernicc |
| `pbernicc.css` | All layout and styling |
| `next_monitor.png` | NeXT N4000A photo (1440×1569), background + screen hole removed |
| `WumpusMonoDemo-Regular.woff2` | Wumpus Mono Demo, self-hosted (WOFF2, 19KB) |
| `WumpusMonoDemo-Regular.ttf` | Wumpus Mono Demo, TTF fallback |

## Monitor photo

Source: studio shot of a real NeXT N4000A MegaPixel Display. Processed with `rembg` (u2net model) to remove the white background, then a rounded-rectangle alpha mask applied at the CRT screen bounds `(575, 433, 1577, 1253)` of the original 2160×2160 frame. Cropped to content bounds and resized to 1440×1569 for web delivery.

Screen hole CSS coordinates (% of cropped PNG):
- `left: 16.324%` `top: 12.850%` `width: 66.490%` `height: 49.939%`

## Brightness knob

Drag up/down on the bottom bezel controls area to adjust screen brightness. Double-click to reset to 90%.

## Font

[Wumpus Mono](https://vaughantype.com/wumpus-mono-pro/) by Vaughan Type — Demo weight, self-hosted. Telehack itself also ships this font, so it's available as a fallback via the page's own `<head>`.

## Deploy

Served via GitHub Pages from this repo (`pbernicchi/TelehackProfile`, public). Changes go live ~30s after push to `master`.
