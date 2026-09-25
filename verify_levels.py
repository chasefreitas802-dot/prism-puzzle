#!/usr/bin/env python3
"""Verify Prism levels are solvable and print min-move solutions."""

from collections import deque

REFLECT = {
    "/": {"N": "E", "E": "N", "S": "W", "W": "S"},
    "\\": {"N": "W", "E": "S", "S": "E", "W": "N"},
}
DELTA = {"N": (0, -1), "E": (1, 0), "S": (0, 1), "W": (-1, 0)}


def traces(level, types):
    walls = {(x, y) for x, y in level.get("walls", [])}
    goal = (level["goal"]["x"], level["goal"]["y"])
    mirrors = {(m["x"], m["y"]): types[i] for i, m in enumerate(level["mirrors"])}
    x, y = level["source"]["x"], level["source"]["y"]
    d = level["source"]["dir"]
    seen = set()
    path = [(x, y)]
    while True:
        key = (x, y, d)
        if key in seen:
            return path, False
        seen.add(key)
        dx, dy = DELTA[d]
        nx, ny = x + dx, y + dy
        if not (0 <= nx < level["width"] and 0 <= ny < level["height"]):
            return path, False
        if (nx, ny) in walls:
            return path, False
        path.append((nx, ny))
        if (nx, ny) == goal:
            return path, True
        if (nx, ny) in mirrors:
            d = REFLECT[mirrors[(nx, ny)]][d]
        x, y = nx, ny


def solve(level):
    mirrors = level["mirrors"]
    n = len(mirrors)
    start = tuple(m["type"] for m in mirrors)
    rotatable = [i for i, m in enumerate(mirrors) if m.get("rotatable", True)]
    q = deque([(start, 0, [])])
    seen = {start}
    while q:
        state, dist, moves = q.popleft()
        _, won = traces(level, state)
        if won:
            return dist, moves, state
        for i in rotatable:
            nxt = list(state)
            nxt[i] = "\\" if nxt[i] == "/" else "/"
            nxt = tuple(nxt)
            if nxt not in seen:
                seen.add(nxt)
                q.append((nxt, dist + 1, moves + [i]))
    return None, None, None


LEVELS = [
    {
        "id": 1,
        "name": "First Light",
        "width": 5,
        "height": 3,
        "source": {"x": 0, "y": 0, "dir": "E"},
        "goal": {"x": 4, "y": 2},
        "walls": [],
        "mirrors": [{"x": 4, "y": 0, "type": "/", "rotatable": True}],
        "par": 1,
    },
    {
        "id": 2,
        "name": "Twin Glass",
        "width": 6,
        "height": 4,
        "source": {"x": 0, "y": 0, "dir": "E"},
        "goal": {"x": 0, "y": 2},
        "walls": [],
        "mirrors": [
            {"x": 5, "y": 0, "type": "/", "rotatable": True},
            {"x": 5, "y": 2, "type": "\\", "rotatable": True},
        ],
        "par": 2,
    },
    {
        "id": 3,
        "name": "Stone Vein",
        "width": 6,
        "height": 5,
        "source": {"x": 0, "y": 0, "dir": "E"},
        "goal": {"x": 5, "y": 4},
        "walls": [[3, 0], [3, 1], [0, 3], [1, 3], [2, 3], [3, 3]],
        "mirrors": [
            {"x": 2, "y": 0, "type": "/", "rotatable": True},
            {"x": 2, "y": 2, "type": "\\", "rotatable": True},
            {"x": 5, "y": 2, "type": "/", "rotatable": True},
        ],
        "par": 3,
    },
    {
        "id": 4,
        "name": "Switchback",
        "width": 7,
        "height": 5,
        "source": {"x": 0, "y": 2, "dir": "E"},
        "goal": {"x": 6, "y": 2},
        "walls": [[3, 1], [3, 2], [3, 3]],
        "mirrors": [
            {"x": 2, "y": 2, "type": "/", "rotatable": True},
            {"x": 2, "y": 0, "type": "\\", "rotatable": True},
            {"x": 4, "y": 0, "type": "/", "rotatable": True},
            {"x": 4, "y": 4, "type": "\\", "rotatable": True},
            {"x": 2, "y": 4, "type": "/", "rotatable": True},
            {"x": 6, "y": 4, "type": "/", "rotatable": True},
        ],
        "par": 4,
    },
    {
        "id": 5,
        "name": "Anchored",
        "width": 6,
        "height": 5,
        "source": {"x": 0, "y": 0, "dir": "S"},
        "goal": {"x": 5, "y": 0},
        "walls": [[1, 1], [2, 1], [3, 1], [1, 3], [2, 3], [3, 3]],
        "mirrors": [
            {"x": 0, "y": 4, "type": "\\", "rotatable": False},
            {"x": 5, "y": 4, "type": "\\", "rotatable": True},
            {"x": 2, "y": 2, "type": "/", "rotatable": True},
            {"x": 4, "y": 0, "type": "/", "rotatable": True},
        ],
        "par": 1,
    },
    {
        "id": 6,
        "name": "Foxfire",
        "width": 7,
        "height": 5,
        "source": {"x": 0, "y": 1, "dir": "E"},
        "goal": {"x": 6, "y": 3},
        "walls": [[3, 1], [3, 2], [3, 3]],
        "mirrors": [
            {"x": 2, "y": 1, "type": "/", "rotatable": True},
            {"x": 2, "y": 4, "type": "\\", "rotatable": True},
            {"x": 6, "y": 4, "type": "\\", "rotatable": True},
            {"x": 6, "y": 1, "type": "/", "rotatable": True},
            {"x": 4, "y": 0, "type": "\\", "rotatable": True},
            {"x": 0, "y": 3, "type": "/", "rotatable": True},
        ],
        "par": 3,
    },
    {
        "id": 7,
        "name": "Lattice",
        "width": 7,
        "height": 7,
        "source": {"x": 0, "y": 3, "dir": "E"},
        "goal": {"x": 6, "y": 3},
        "walls": [[2, 2], [2, 3], [2, 4], [4, 2], [4, 3], [4, 4]],
        "mirrors": [
            {"x": 1, "y": 3, "type": "\\", "rotatable": True},
            {"x": 1, "y": 1, "type": "\\", "rotatable": True},
            {"x": 5, "y": 1, "type": "/", "rotatable": True},
            {"x": 5, "y": 5, "type": "/", "rotatable": True},
            {"x": 6, "y": 5, "type": "\\", "rotatable": True},
            {"x": 3, "y": 5, "type": "/", "rotatable": True},
            {"x": 1, "y": 5, "type": "\\", "rotatable": True},
        ],
        "par": 5,
    },
    {
        "id": 8,
        "name": "Crosscut",
        "width": 7,
        "height": 6,
        "source": {"x": 0, "y": 0, "dir": "S"},
        "goal": {"x": 6, "y": 5},
        "walls": [[1, 1], [1, 2], [1, 3], [3, 2], [3, 3], [3, 4], [5, 1], [5, 2], [5, 3]],
        "mirrors": [
            {"x": 0, "y": 5, "type": "/", "rotatable": True},
            {"x": 2, "y": 5, "type": "\\", "rotatable": True},
            {"x": 2, "y": 0, "type": "/", "rotatable": True},
            {"x": 4, "y": 0, "type": "\\", "rotatable": True},
            {"x": 4, "y": 5, "type": "/", "rotatable": True},
            {"x": 6, "y": 0, "type": "/", "rotatable": True},
        ],
        "par": 4,
    },
    {
        "id": 9,
        "name": "Halo",
        "width": 8,
        "height": 6,
        "source": {"x": 3, "y": 0, "dir": "E"},
        "goal": {"x": 0, "y": 2},
        "walls": [[3, 2], [4, 2], [3, 3], [4, 3]],
        "mirrors": [
            {"x": 7, "y": 0, "type": "\\", "rotatable": False},
            {"x": 7, "y": 5, "type": "\\", "rotatable": True},
            {"x": 0, "y": 5, "type": "/", "rotatable": True},
            {"x": 2, "y": 1, "type": "/", "rotatable": True},
            {"x": 5, "y": 1, "type": "\\", "rotatable": True},
            {"x": 1, "y": 4, "type": "/", "rotatable": True},
        ],
        "par": 2,
    },
    {
        "id": 10,
        "name": "Aurora",
        "width": 8,
        "height": 7,
        "source": {"x": 0, "y": 3, "dir": "E"},
        "goal": {"x": 7, "y": 3},
        "walls": [[3, 2], [3, 3], [3, 4], [5, 1], [5, 5]],
        "mirrors": [
            {"x": 2, "y": 3, "type": "/", "rotatable": True},
            {"x": 2, "y": 0, "type": "\\", "rotatable": True},
            {"x": 7, "y": 0, "type": "/", "rotatable": False},
            {"x": 7, "y": 6, "type": "\\", "rotatable": True},
            {"x": 0, "y": 6, "type": "/", "rotatable": True},
            {"x": 0, "y": 0, "type": "\\", "rotatable": True},
            {"x": 4, "y": 6, "type": "/", "rotatable": True},
            {"x": 4, "y": 0, "type": "/", "rotatable": True},
        ],
        "par": 5,
    },
]


def main():
    failed = 0
    for level in LEVELS:
        dist, moves, state = solve(level)
        start = tuple(m["type"] for m in level["mirrors"])
        _, already = traces(level, start)
        if dist is None:
            failed += 1
            print(f"FAIL {level['id']} {level['name']}: unsolvable")
            continue
        print(
            f"OK {level['id']:2} {level['name']:12} min={dist} par={level['par']} "
            f"already={already} sol={state} flips={moves}"
        )
        if already:
            print("  WARN starts solved")
        if dist == 0:
            failed += 1
    if failed:
        raise SystemExit(failed)


if __name__ == "__main__":
    main()
