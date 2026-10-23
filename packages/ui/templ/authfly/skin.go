// Authfly skin for templ: the same class recipes as ../react/src/skin/skin.ts (tokens only, 8px layout step,
// 4px only inside controls), composed with the CLI-installed utils.Cn.
package authfly

import uiutils "github.com/authfly/authkit/widgets/templ/utils"

func cn(parts ...string) string { return uiutils.Cn(parts...) }

func when(c bool, s string) string {
	if c {
		return s
	}
	return ""
}

const control = "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded inset-ring font-medium transition-colors"

// ButtonSkin: variant default | outline | ghost.
func ButtonSkin(variant string, class ...string) string {
	return cn(append([]string{control,
		"h-10 px-4 text-sm disabled:pointer-events-none disabled:opacity-50",
		"focus-visible:inset-ring-ring",
		when(variant == "default" || variant == "", "bg-primary text-primary-foreground inset-ring-primary"),
		when(variant == "outline", "bg-card text-foreground inset-ring-border hover:bg-accent hover:text-accent-foreground"),
		when(variant == "ghost", "bg-transparent text-foreground inset-ring-transparent hover:bg-accent hover:text-accent-foreground"),
	}, class...)...)
}

func LinkSkin(class ...string) string {
	return cn(append([]string{"inline-flex items-center gap-2 font-semibold text-foreground underline-offset-4 hover:underline focus-visible:underline"}, class...)...)
}

func InputSkin(class ...string) string {
	return cn(append([]string{
		"h-10 w-full min-w-0 rounded bg-background px-3 text-base text-foreground inset-ring inset-ring-input outline-none md:text-sm",
		"placeholder:text-muted-foreground focus-visible:inset-ring-ring disabled:cursor-not-allowed disabled:opacity-50",
	}, class...)...)
}

func LabelSkin(class ...string) string {
	return cn(append([]string{"text-sm font-semibold text-foreground"}, class...)...)
}

func CheckboxSkin(class ...string) string {
	return cn(append([]string{"size-4 shrink-0 accent-primary disabled:cursor-not-allowed disabled:opacity-50"}, class...)...)
}

// BadgeSkin: variant default | secondary | outline.
func BadgeSkin(variant string, class ...string) string {
	return cn(append([]string{
		"inline-flex h-6 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2 text-xs font-medium inset-ring",
		when(variant == "default" || variant == "", "bg-primary text-primary-foreground inset-ring-primary"),
		when(variant == "secondary", "bg-muted text-foreground inset-ring-transparent"),
		when(variant == "outline", "bg-transparent text-foreground inset-ring-border"),
	}, class...)...)
}

// AlertSkin: tone default | success | destructive.
func AlertSkin(tone string, class ...string) string {
	t := "text-foreground inset-ring-border"
	if tone == "destructive" {
		t = "text-destructive inset-ring-destructive"
	}
	return cn(append([]string{"flex min-h-8 items-center gap-2 rounded bg-muted px-2 text-xs font-semibold inset-ring", t}, class...)...)
}

func IconBadgeSkin(tone string, class ...string) string {
	t := "bg-muted text-muted-foreground inset-ring-transparent"
	if tone == "destructive" {
		t = "bg-muted text-destructive inset-ring-destructive"
	}
	return cn(append([]string{"inline-flex size-12 shrink-0 items-center justify-center rounded inset-ring", t}, class...)...)
}

func CardSkin(class ...string) string {
	return cn(append([]string{"mx-auto flex w-full max-w-sm flex-col gap-6 rounded bg-card p-6 text-card-foreground inset-ring inset-ring-border"}, class...)...)
}

const (
	TextTitle    = "text-2xl font-bold text-foreground"
	TextSubtitle = "text-sm font-semibold text-foreground"
	TextMuted    = "text-sm text-muted-foreground"
	TextHint     = "text-xs text-muted-foreground"
)

var gapCls = map[string]string{"0": "gap-0", "2": "gap-2", "4": "gap-4", "6": "gap-6", "8": "gap-8"}
var alignCls = map[string]string{"start": "items-start", "center": "items-center", "end": "items-end", "stretch": "items-stretch"}
var justifyCls = map[string]string{"start": "justify-start", "center": "justify-center", "end": "justify-end", "between": "justify-between"}

func or(v, d string) string {
	if v == "" {
		return d
	}
	return v
}
