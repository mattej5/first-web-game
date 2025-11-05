import pathlib
path = pathlib.Path("app/blog/posts/ai_writes_a_story/chapter-3-tears-of-the-cloud.mdx")
for idx, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
    if "Zelda" in line:
        print(f"{idx}: {line}")
