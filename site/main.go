// Command site renders the Authfly docs (docs/*.md) and the live widget previews to static HTML with Go templ and the
// generated ui8kit templ primitives. Run from the repo root: `bun run site` (builds the CSS, then `go run ./site`).
// Output: site/dist (open site/dist/index.html, or serve the folder).
package main

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/a-h/templ"
)

type Page struct{ Slug, Title, Blurb, File string }
type Section struct {
	Title string
	Pages []Page
}

var nav = []Section{
	{"Guide", []Page{
		{"architecture", "Architecture", "", "docs/architecture.md"},
		{"widgets", "Widgets", "", "docs/widgets.md"},
		{"contract", "Form contract", "", "docs/contract.md"},
		{"codegen", "Primitives and parity", "", "docs/codegen.md"},
	}},
	{"Runtimes", []Page{
		{"runtime-react", "React", "@authfly/react", "docs/runtimes/react.md"},
		{"runtime-vue", "Vue", "@authfly/vue, single-file components", "docs/runtimes/vue.md"},
		{"runtime-svelte", "Svelte", "@authfly/svelte, Svelte 5", "docs/runtimes/svelte.md"},
		{"runtime-solid", "Solid", "@authfly/solid", "docs/runtimes/solid.md"},
		{"runtime-templ", "templ (Go)", "Go templ components", "docs/runtimes/templ.md"},
		{"runtime-twig", "Twig (PHP)", "Symfony and plain PHP", "docs/runtimes/twig.md"},
		{"runtime-latte", "Latte (PHP)", "Nette and plain PHP", "docs/runtimes/latte.md"},
		{"runtime-jinja2", "Jinja2 (Python)", "Flask, FastAPI, Django", "docs/runtimes/jinja2.md"},
	}},
}

func navClass(on bool) string {
	if on {
		return "text-sm font-medium text-foreground"
	}
	return "text-sm text-muted-foreground hover:text-foreground"
}
func currentAttr(on bool) templ.Attributes {
	if on {
		return templ.Attributes{"aria-current": "page"}
	}
	return nil
}
func listClass(kind string) string {
	return "flex flex-col gap-2 pl-6 text-muted-foreground" // markers in site/app.css (article ul, article ol)
}
func isExternal(h string) bool { return strings.HasPrefix(h, "http://") || strings.HasPrefix(h, "https://") }

// links between docs: foo.md and runtimes/foo.md become the flat site pages
func relink(nodes []Node) {
	fix := func(xs []Inline) {
		for i := range xs {
			h := xs[i].Href
			if xs[i].Kind != "link" || isExternal(h) || !strings.Contains(h, ".md") {
				continue
			}
			file, frag, _ := strings.Cut(h, "#")
			base := strings.TrimSuffix(filepath.Base(file), ".md")
			if strings.Contains(file, "runtimes/") {
				base = "runtime-" + base
			}
			if frag != "" {
				frag = "#" + frag
			}
			xs[i].Href = base + ".html" + frag
		}
	}
	for i := range nodes {
		fix(nodes[i].Spans)
		for _, it := range nodes[i].Items {
			fix(it)
		}
	}
}

func write(out, name string, c templ.Component) {
	var b bytes.Buffer
	if err := c.Render(context.Background(), &b); err != nil {
		panic(err)
	}
	if err := os.WriteFile(filepath.Join(out, name), b.Bytes(), 0o644); err != nil {
		panic(err)
	}
}

func main() {
	out := "site/dist"
	_ = os.MkdirAll(filepath.Join(out, "assets"), 0o755)
	all := Previews()
	previews := map[string]Preview{}
	for _, p := range all {
		previews[p.Slug] = p
	}
	var runtimes []Page
	n := 0
	for _, sec := range nav {
		for _, p := range sec.Pages {
			src, err := os.ReadFile(p.File)
			if err != nil {
				panic(err)
			}
			nodes := parse(string(src))
			relink(nodes)
			if p.Slug == "widgets" {
				write(out, p.Slug+".html", widgetsPage(nav, p, nodes, all))
			} else {
				write(out, p.Slug+".html", docPage(nav, p, nodes, previews))
			}
			if sec.Title == "Runtimes" {
				runtimes = append(runtimes, p)
			}
			n++
		}
	}
	write(out, "index.html", homePage(nav, runtimes, previews["sign-in"]))
	js, _ := os.ReadFile("site/theme.js")
	_ = os.WriteFile(filepath.Join(out, "assets", "theme.js"), js, 0o644)
	fmt.Printf("site: %d pages + index, %d live previews -> %s\n", n, len(all), out)
}
