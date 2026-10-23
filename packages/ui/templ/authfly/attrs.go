package authfly

import "github.com/a-h/templ"

// A builds templ.Attributes from key/value pairs, skipping empty values (like React drops undefined props).
func A(kv ...string) templ.Attributes {
	a := templ.Attributes{}
	for i := 0; i+1 < len(kv); i += 2 {
		if kv[i+1] != "" {
			a[kv[i]] = kv[i+1]
		}
	}
	return a
}

func landmark(id, landmarkLabel string, kv ...string) templ.Attributes {
	if landmarkLabel != "" {
		return A(append(kv, "aria-label", landmarkLabel)...)
	}
	return A(append(kv, "aria-labelledby", id+"-title")...)
}

func lucideInner(name string) string {
	if s, ok := lucideSVG[name]; ok {
		return s
	}
	return lucideSVG["circle"]
}
