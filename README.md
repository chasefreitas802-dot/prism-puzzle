# Prism

A browser puzzle about bending one beam of light. Rotate mirrors so the lantern reaches the crystal.

## Run

No build step. From this folder:

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

Opening `index.html` directly also works in most browsers.

## Play

- Click or tap a glass mirror to flip it (`/` ↔ `\`)
- Gold-pinned mirrors are locked
- **Z** undo, **R** reset, **Esc** level select
- Arrows move the focus cursor, **Space** / **Enter** flips
- After a win, **N** goes to the next room

Progress (unlocked rooms and clears) is saved in `localStorage`.

## Files

- `index.html` — shell
- `styles.css` — aurora UI
- `game.js` — levels, beam physics, canvas, input
- `verify_levels.py` — solvability check for all ten rooms
