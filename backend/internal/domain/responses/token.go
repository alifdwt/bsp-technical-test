package responses

type Token struct {
	AccessToken  string `json:"access_token" example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwdXRyYWRld2FudGFyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFsaWZkd3QiLCJhZ2UiOjI0LCJpc3MiOiIxNzEwODY5NTgzIiwic3ViIjoiMiIsImV4cCI6MTcxMDg3MTM4MywiaWF0IjoxNzEwODY5NTgzLCJqdGkiOiI3OTQzZDc0Ny04Mzk1LTRlMzktYmZmYS1iM2RiODM0ZGZjNmEifQ.Ngh-kJiAh3_nEmaWP5emX2iZSTF-4IAykH6VC9szyxY"`
	RefreshToken string `json:"refresh_token" example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwdXRyYWRld2FudGFyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFsaWZkd3QiLCJhZ2UiOjI0LCJpc3MiOiIxNzEwODY5NTgzIiwic3ViIjoiMiIsImV4cCI6MTcxMDg3MTM4MywiaWF0IjoxNzEwODY5NTgzLCJqdGkiOiI3OTQzZDc0Ny04Mzk1LTRlMzktYmZmYS1iM2RiODM0ZGZjNmEifQ.Ngh-kJiAh3_nEmaWP5emX2iZSTF-4IAykH6VC9szyxY"`
}
