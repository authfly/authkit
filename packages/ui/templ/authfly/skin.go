// Authfly skin for templ: the class recipes of packages/shared/src/skin/recipes.ts (tables generated into
// skin_recipes_gen.go by tools/gen-shared.ts), composed with the CLI-installed utils.Cn.
package authfly

import uiutils "github.com/authfly/authkit/packages/ui/templ/utils"

func cn(parts ...string) string { return uiutils.Cn(parts...) }

func when(c bool, s string) string {
	if c {
		return s
	}
	return ""
}

// skin composes recipe name + variant (unknown variant: the recipe's fallback, else none) + consumer classes.
func skin(name, variant string, class []string) string {
	r := skinRecipes[name]
	parts := append([]string{}, r.base...)
	if v, ok := r.variants[variant]; ok {
		parts = append(parts, v)
	} else if r.fallback != "" {
		parts = append(parts, r.variants[r.fallback])
	}
	return cn(append(parts, class...)...)
}

// ButtonSkin: variant default | outline | ghost ("" = default).
func ButtonSkin(variant string, class ...string) string {
	return skin("button", or(variant, "default"), class)
}

func LinkSkin(class ...string) string     { return skin("link", "", class) }
func InputSkin(class ...string) string    { return skin("input", "", class) }
func LabelSkin(class ...string) string    { return skin("label", "", class) }
func CheckboxSkin(class ...string) string { return skin("checkbox", "", class) }

// BadgeSkin: variant default | secondary | outline ("" = default).
func BadgeSkin(variant string, class ...string) string {
	return skin("badge", or(variant, "default"), class)
}

// AlertSkin: tone default | success | warning | destructive (unknown = default).
func AlertSkin(tone string, class ...string) string { return skin("alert", tone, class) }

// IconBadgeSkin: tone default | destructive (unknown = default).
func IconBadgeSkin(tone string, class ...string) string { return skin("iconBadge", tone, class) }

// CardSkin: the card surface only (no width, no centring): consumers place it in their own layout.
func CardSkin(class ...string) string { return skin("card", "", class) }

// WidgetCardSkin: width + centring of the six Authfly widgets (account: max-w-lg).
func WidgetCardSkin(class ...string) string { return skin("widgetCard", "", class) }

func or(v, d string) string {
	if v == "" {
		return d
	}
	return v
}
