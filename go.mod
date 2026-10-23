module github.com/authfly/authkit

go 1.26.0

require (
	github.com/a-h/templ v0.3.1070
	github.com/authfly/authkit/widgets/templ v0.0.0
)

replace github.com/authfly/authkit/widgets/templ => ./packages/ui/templ
