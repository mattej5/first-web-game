import pathlib
path = pathlib.Path("app/blog/posts/ai_writes_a_story/chapter-1-tears-of-the-kernel.mdx")
for idx, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
    if "Zelda" in line or "Link" in line:
        print(f"{idx}: {line}")
