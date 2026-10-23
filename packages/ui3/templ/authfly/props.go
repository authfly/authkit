package authfly

import (
	"encoding/json"
	"fmt"
	"strings"
)

// Widget props keep the xgen templ API (fields typed any, json tags = the react prop names) so the docs site, the
// stalwart console and authfly-cli keep passing strings, bools, map[string]any labels and []map[string]any items.

type AuthflySignInProps struct {
	Id, Title, Text, Action, Csrf, Error, Labels, Providers, Method, Identifier, Social, LandmarkLabel any
}
type AuthflySignUpProps struct {
	Id, Title, Text, Action, Csrf, Error, Info, Labels, Terms, LandmarkLabel any
}
type AuthflyRequestProps struct {
	Id, Title, Text, Action, Csrf, Error, Info, Labels, Token, Kind, LandmarkLabel any
}
type AuthflyNoticeProps struct {
	Id, Title, Text, Detail, Icon, Labels, ActionUrl, Csrf, Tone, Action, LandmarkLabel any
}
type AuthflyConsentProps struct {
	Id, Title, Text, Action, Csrf, Error, Info, Client, Account, Scopes, Labels, LandmarkLabel any
}
type AuthflyAccountProps struct {
	Id, Title, Text, Name, Email, Verified, Methods, Labels, SignoutUrl, Csrf, LandmarkLabel any
}

// Str renders any scalar prop as a string ("" for nil).
func Str(v any) string {
	switch t := v.(type) {
	case nil:
		return ""
	case string:
		return t
	case fmt.Stringer:
		return t.String()
	default:
		return fmt.Sprint(t)
	}
}

// Bool: true, "true", non-zero numbers.
func Bool(v any) bool {
	switch t := v.(type) {
	case bool:
		return t
	case string:
		return t == "true"
	case float64:
		return t != 0
	case int:
		return t != 0
	}
	return false
}

// Lab reads one label from a labels map (map[string]any, map[string]string or a struct via JSON).
func Lab(labels any, key string) string {
	switch m := labels.(type) {
	case map[string]any:
		return Str(m[key])
	case map[string]string:
		return m[key]
	case nil:
		return ""
	}
	var mm map[string]any
	if b, err := json.Marshal(labels); err == nil && json.Unmarshal(b, &mm) == nil {
		return Str(mm[key])
	}
	return ""
}

// Item is one Feature (id, title, text, icon, href).
type Item struct{ ID, Title, Text, Icon, Href string }

// Items accepts []map[string]any, []any of maps, or any JSON-shaped slice of {id,title,text,icon,href}.
func Items(v any) []Item {
	var raw []map[string]any
	switch t := v.(type) {
	case nil:
		return nil
	case []map[string]any:
		raw = t
	case []any:
		for _, e := range t {
			if m, ok := e.(map[string]any); ok {
				raw = append(raw, m)
			}
		}
	default:
		if b, err := json.Marshal(v); err == nil {
			_ = json.Unmarshal(b, &raw)
		}
	}
	out := make([]Item, 0, len(raw))
	for _, m := range raw {
		out = append(out, Item{Str(m["id"]), Str(m["title"]), Str(m["text"]), Str(m["icon"]), Str(m["href"])})
	}
	return out
}

func describe(ids ...string) string {
	var parts []string
	for _, s := range ids {
		if s != "" {
			parts = append(parts, s)
		}
	}
	return strings.Join(parts, " ")
}

func errorID(id string, err string) string {
	if err == "" {
		return ""
	}
	return id + "-error"
}
